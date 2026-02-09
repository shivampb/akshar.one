-- Add SEO columns to properties table
alter table public.properties
add column meta_title text,
add column meta_description text,
add column keywords text;
