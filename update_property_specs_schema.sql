-- Add Project Specification columns to properties table
alter table public.properties
add column project_units text,
add column project_area text,
add column size_range text,
add column project_size text,
add column launch_date text,
add column possession_date text,
add column avg_price text,
add column configuration text,
add column rera_id text;
