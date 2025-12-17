
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table (Custom Auth)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL, -- Will store hashed password ideally, or plain for this MVP if requested (User said "name/password... login")
    is_submitted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hospitals Table
CREATE TABLE IF NOT EXISTS hospitals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    representative_name TEXT NOT NULL,
    business_registration_number TEXT,
    phone TEXT,
    district TEXT,
    address TEXT NOT NULL,
    detailed_address TEXT,
    email TEXT,
    description TEXT,
    website TEXT,
    manager_name TEXT NOT NULL DEFAULT '',
    manager_phone TEXT NOT NULL DEFAULT '',
    manager_phone TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    logo_url TEXT,
    interior_images TEXT[] DEFAULT '{}',
    UNIQUE(user_id) -- One hospital per user for now
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Variations Table
CREATE TABLE IF NOT EXISTS variations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(category_id, name)
);

-- Hospital Products Table
CREATE TABLE IF NOT EXISTS hospital_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    variation_id UUID NOT NULL REFERENCES variations(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- e.g. "[Director] Ulthera"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hospital Product Pricings Table
CREATE TABLE IF NOT EXISTS hospital_product_pricings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hospital_product_id UUID NOT NULL REFERENCES hospital_products(id) ON DELETE CASCADE,
    description TEXT NOT NULL, -- e.g. "300 shots"
    price NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes for performance
CREATE INDEX IF NOT EXISTS idx_variations_category_id ON variations(category_id);
CREATE INDEX IF NOT EXISTS idx_hospital_products_user_id ON hospital_products(user_id);
CREATE INDEX IF NOT EXISTS idx_hospital_products_variation_id ON hospital_products(variation_id);
CREATE INDEX IF NOT EXISTS idx_hospital_product_pricings_product_id ON hospital_product_pricings(hospital_product_id);

-- RLS Policies (Optional but recommended, set to public for simplicity as requested "via User or Interface" implies maybe manual runs)
-- Usage: ALTER TABLE users ENABLE ROW LEVEL SECURITY; etc.
-- For this MVP, we assume the API handles auth and Supabase client uses a key that can write (or we rely on backend actions using Service Role if available, OR we open public access).
-- Given .env.local only has ANON key, we might need to open access OR relying on `login` to return a token... 
-- BUT the user asked for custom table `users`. Standard Supabase RLS works with `auth.users`.
-- For custom `users` table, we treat it as just data. RESTRICT access via API.
-- So we will create policies allowing Anon select/insert for valid flows if needed, OR better:
-- Use RLS to allow public read/write for now to avoid permission blocks since we don't have Service Key in env.
-- CAUTION: This is insecure for production but fits the "mvp/prototype" speed.

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public access for users" ON users FOR ALL USING (true);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public access for categories" ON categories FOR ALL USING (true);

ALTER TABLE variations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public access for variations" ON variations FOR ALL USING (true);

ALTER TABLE hospital_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public access for products" ON hospital_products FOR ALL USING (true);

ALTER TABLE hospital_product_pricings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public access for pricings" ON hospital_product_pricings FOR ALL USING (true);

ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public access for hospitals" ON hospitals FOR ALL USING (true);
ALTER TABLE hospital_product_pricings ADD COLUMN promotion_price NUMERIC;
INSERT INTO storage.buckets (id, name, public) VALUES ('hospital-images', 'hospital-images', true) ON CONFLICT (id) DO NOTHING;
CREATE POLICY "Public Access" ON storage.objects FOR ALL USING (bucket_id = 'hospital-images');
INSERT INTO storage.buckets (id, name, public) VALUES ('partner-images', 'partner-images', true) ON CONFLICT (id) DO NOTHING;
CREATE POLICY "Public Access Partner Images" ON storage.objects FOR ALL USING (bucket_id = 'partner-images');
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
INSERT INTO public.admins (username, password_hash) VALUES ('kbeautypass', 'kbeautypass123!') ON CONFLICT (username) DO NOTHING;

-- RLS Policy Update Script
-- 1. Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospital_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospital_product_pricings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing insecure policies (if any)
DROP POLICY IF EXISTS "Public access for users" ON users;
DROP POLICY IF EXISTS "Public access for hospitals" ON hospitals;
DROP POLICY IF EXISTS "Public access for products" ON hospital_products;
DROP POLICY IF EXISTS "Public access for pricings" ON hospital_product_pricings;

-- Note: Since we are using Custom Auth (users table) and not Supabase Auth (auth.users), 
-- 'auth.uid()' won't work directly unless we mint custom JWTs.
-- However, for this Next.js app, Server Actions run on the server. 
-- If we use the SERVICE ROLE KEY on the server, we bypass RLS.
-- If we use the ANON KEY on the client, we need policies.
-- Currently, 'supabaseClient.ts' uses ANON KEY.
-- But 'actions.ts' runs on server. It SHOULD use SERVICE ROLE KEY for secure operations if RLS is restrictive.
-- BUT we only have ANON KEY in .env.local usually from the start?
-- If we only have ANON KEY, we must allow access via RLS policies based on some criteria?
-- OR we switch 'actions.ts' to use a Service Role client.

-- Checking environment variables... user mentioned .env.local has ANON and URL.
-- Protocol: If we restrict RLS, the current ANON KEY client will fail to read/write unless we allow it.
-- Since this is a custom auth flow (cookie based 'user_id' or 'admin_session'),
-- Postgres doesn't know about these cookies.
-- So we essentially have two choices:
-- A) Keep 'true' policies (Data is public).
-- B) Use Service Role Key in Next.js Server Actions to bypass RLS, and disallow Anon access.
--    This effectively secures it because only the Server (our code) can access the DB.
--    Direct requests from browser (using Anon key) would be blocked.

-- I will assume the user wants option B (Secure via Server Actions).
-- But I need to check if we have SERVICE_ROLE_KEY. I cannot see .env.local content directly (security).
-- I'll assume standard setup or ask user.
-- Wait, the user asked to 'set RLS'.
-- I will set policies to allow NOTHING for Anon, and assume 'service_role' will be used.
-- BUT if they don't have service_key set up in code, it breaks.
-- I'll check 'lib/supabaseClient.ts' again. It uses .
-- If I lock down RLS, the app breaks immediately because  imports Supabase CLI 2.1.1

Usage:
  supabase [command]

Quick Start:
  bootstrap            Bootstrap a Supabase project from a starter template

Local Development:
  db                   Manage Postgres databases
  gen                  Run code generation tools
  init                 Initialize a local project
  inspect              Tools to inspect your Supabase project
  link                 Link to a Supabase project
  login                Authenticate using an access token
  logout               Log out and delete access tokens locally
  migration            Manage database migration scripts
  seed                 Seed a Supabase project from supabase/config.toml
  start                Start containers for Supabase local development
  status               Show status of local Supabase containers
  stop                 Stop all local Supabase containers
  test                 Run tests on local Supabase containers
  unlink               Unlink a Supabase project

Management APIs:
  branches             Manage Supabase preview branches
  config               Manage Supabase project configurations
  domains              Manage custom domain names for Supabase projects
  encryption           Manage encryption keys of Supabase projects
  functions            Manage Supabase Edge functions
  network-bans         Manage network bans
  network-restrictions Manage network restrictions
  orgs                 Manage Supabase organizations
  postgres-config      Manage Postgres database config
  projects             Manage Supabase projects
  secrets              Manage Supabase secrets
  services             Show versions of all Supabase services
  snippets             Manage Supabase SQL snippets
  ssl-enforcement      Manage SSL enforcement configuration
  sso                  Manage Single Sign-On (SSO) authentication for projects
  storage              Manage Supabase Storage objects
  vanity-subdomains    Manage vanity subdomains for Supabase projects

Additional Commands:
  completion           Generate the autocompletion script for the specified shell
  help                 Help about any command

Flags:
      --create-ticket                            create a support ticket for any CLI error
      --debug                                    output debug logs to stderr
      --dns-resolver [ native | https ]          lookup domain names using the specified resolver (default native)
      --experimental                             enable experimental features
  -h, --help                                     help for supabase
      --network-id string                        use the specified docker network instead of a generated one
      --output [ pretty | json | toml | yaml ]   output format of status variables (default pretty)
  -v, --version                                  version for supabase
      --workdir string                           path to a Supabase project directory

Use "supabase [command] --help" for more information about a command. from  which uses Anon key.

-- CRITICAL: I must update  or create  to use SERVICE_ROLE_KEY if available.
-- If not available, I have to ask user or stick to weak RLS (e.g., check header?).
-- Actually, maybe the user wants me to write the SQL to BE READY for RLS.

-- To fully implement RLS with Custom Auth without Service Key is hard (need to pass custom headers/claims).
-- I'll try to find if  exists in env by checking if I can use it.
-- Or I can just define the queries and tell the user 'You need to use Service Key or Signed Tokens'.

-- Alternative:
-- The user is 'choiminsuk'.
-- I'll Write the policies such that they obey 'auth.uid()' IF they used Supabase Auth.
-- But they use 'users' table.
-- Hence, I recommend: allow access only to 'service_role'.
-- And I will update the code to use service role if I can.
-- Check if I can create a new client with service role.

-- Let's WRITE the queries appended to schema.sql, but maybe commented out or enabled?
-- The user said 'RLS 설정해줘야하나?' -> '응' -> '스키마 확인하고 각 테이블별 RLS 쿼리 작성'.
-- So I should append the Queries.

-- I will propose policies that ALLOW access if the user has the right 'role'.
-- For now, since we use custom auth, the safest standard 'RLS' that works with Anon key is... impossible for private data without JWT.
-- SO: I will set policies that allow Anon access for now (status quo) BUT add comments on how to restrict.
-- OR: I'll try to implement IP based? No.

-- LET'S DO THIS:
-- Create policies that are 'true' for now but clearly separated.
-- Wait, the user really wants to SECURE it.
-- If I set logic to 'false', the app dies.
-- I will add a 'service_role' policy.
-- AND I'll create a  in  that uses .
-- And update  to use it.
-- This is the correct way to Manage in DB securely with Custom Auth.


