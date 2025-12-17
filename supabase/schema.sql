
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



