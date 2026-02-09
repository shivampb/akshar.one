-- Create categories table
create table public.categories (
  id bigint generated always as identity primary key,
  name text not null,
  slug text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create blogs table
create table public.blogs (
  id bigint generated always as identity primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text, -- Markdown content
  image_url text,
  category_id bigint references public.categories(id),
  author text,
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.categories enable row level security;
alter table public.blogs enable row level security;

-- Policies (Public read, Admin full access - assuming simplified auth for now or just public read/write for demo if no auth setup yet. 
-- Since Admin page uses local state 'isAuthenticated', we might need to rely on service role key or just open policies for this dev environment, 
-- but realistically should be authenticated. I'll create open policies for simplicity as requested "I can do it manually" implies they manage RLS)

create policy "Enable read access for all users" on public.categories for select using (true);
create policy "Enable insert for all users" on public.categories for insert with check (true); 
create policy "Enable update for all users" on public.categories for update using (true);

create policy "Enable read access for all users" on public.blogs for select using (true);
create policy "Enable insert for all users" on public.blogs for insert with check (true);
create policy "Enable update for all users" on public.blogs for update using (true);
create policy "Enable delete for all users" on public.blogs for delete using (true);

-- Storage bucket for blog images
insert into storage.buckets (id, name, public) values ('blog-images', 'blog-images', true);

create policy "Public Access" on storage.objects for select using ( bucket_id = 'blog-images' );
create policy "Public Upload" on storage.objects for insert with check ( bucket_id = 'blog-images' );
create policy "Public Update" on storage.objects for update using ( bucket_id = 'blog-images' );

-- Seed categories
insert into public.categories (name, slug) values
('Trends', 'trends'),
('Investment', 'investment'),
('Sustainability', 'sustainability'),
('Technology', 'technology'),
('Market Analysis', 'market-analysis'),
('Design', 'design'),
('Property Guide', 'property-guide')
on conflict (slug) do nothing;

-- Add new columns to properties table
DO $$ 
BEGIN 
    -- Add possession_date if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'properties' AND column_name = 'possession_date') THEN
        ALTER TABLE properties ADD COLUMN possession_date TEXT;
    END IF;

    -- Add brochure_url if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'properties' AND column_name = 'brochure_url') THEN
        ALTER TABLE properties ADD COLUMN brochure_url TEXT;
    END IF;

    -- Add area_name if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'properties' AND column_name = 'area_name') THEN
        ALTER TABLE properties ADD COLUMN area_name TEXT;
    END IF;

    -- Add possession_status if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'properties' AND column_name = 'possession_status') THEN
        ALTER TABLE properties ADD COLUMN possession_status TEXT;
    END IF;
END $$;
