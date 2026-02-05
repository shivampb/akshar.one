
-- 1. Create the properties table
create table if not exists properties (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  slug text,
  type text not null,
  location text not null,
  address text not null,
  price numeric not null,
  "priceLabel" text,
  "shortDescription" text,
  "fullDescription" text,
  "isFeatured" boolean default false,
  features jsonb default '{}'::jsonb,
  images text[] default array[]::text[],
  amenities text[] default array[]::text[],
  coordinates jsonb default '{"lat": 0, "lng": 0}'::jsonb
);

-- 2. Enable Row Level Security (RLS)
alter table properties enable row level security;

-- 3. Create RLS Policies
-- Allow everyone to read properties
create policy "Public properties are viewable by everyone"
  on properties for select
  using ( true );

-- Allow everyone to insert/update/delete (Since app uses hardcoded admin without Supabase Auth)
-- WARNING: This is for development/demo purposes. 
-- For production, you should implement Supabase Auth and restrict these policies.
create policy "Allow public write access"
  on properties for insert
  with check ( true );

create policy "Allow public update access"
  on properties for update
  using ( true );

create policy "Allow public delete access"
  on properties for delete
  using ( true );

-- 4. Create the storage bucket for images
-- Note: 'storage' schema might be protected. You usually create buckets in the UI.
-- However, if you have permissions, this works:
insert into storage.buckets (id, name, public) 
values ('properties', 'properties', true)
on conflict (id) do nothing;

-- 5. Storage Policies
-- Allow public read access
create policy "Values are public"
  on storage.objects for select
  using ( bucket_id = 'properties' );

-- Allow public upload/write access (For development/demo)
create policy "Allow public uploads"
  on storage.objects for insert
  with check ( bucket_id = 'properties' );
  
create policy "Allow public updates"
  on storage.objects for update
  using ( bucket_id = 'properties' );

create policy "Allow public deletes"
  on storage.objects for delete
  using ( bucket_id = 'properties' );
