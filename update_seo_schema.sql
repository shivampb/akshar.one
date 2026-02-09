-- Add SEO columns to blogs table
alter table public.blogs
add column meta_title text,
add column meta_description text,
add column keywords text;

-- Optional: Update existing rows to have default values (based on existing content) if needed
-- update public.blogs set meta_title = title, meta_description = excerpt;
