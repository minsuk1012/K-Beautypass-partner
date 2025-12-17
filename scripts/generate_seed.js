
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mappingPath = path.join(__dirname, '../public/standard_procedure_mapping.json');
const outputPath = path.join(__dirname, '../supabase/seed.sql');

const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));

let sql = `-- Seed Data for Categories and Variations\n\n`;

// 1. Insert Categories
sql += `-- Insert Categories\n`;
Object.keys(mapping).forEach(category => {
    sql += `INSERT INTO categories (name) VALUES ('${category}') ON CONFLICT (name) DO NOTHING;\n`;
});
sql += `\n`;

// 2. Insert Variations
sql += `-- Insert Variations\n`;
Object.keys(mapping).forEach(category => {
    const variations = mapping[category];
    variations.forEach(variation => {
        // Escape single quotes in variation names if any
        const safeVariation = variation.replace(/'/g, "''");
        sql += `INSERT INTO variations (category_id, name) 
SELECT id, '${safeVariation}' 
FROM categories 
WHERE name = '${category}' 
ON CONFLICT (category_id, name) DO NOTHING;\n`;
    });
});

fs.writeFileSync(outputPath, sql);
console.log(`Seed SQL generated at ${outputPath}`);
