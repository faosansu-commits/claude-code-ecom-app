-- Initial schema for ecommerce app
-- Source: specs/db-spec.md (confirmed 2026-08-28)
-- order_status: pending/paid/shipped/delivered/cancelled as proposed
-- product_images.image_name: filename in Supabase Storage bucket "product-images"
-- orders.total_amount: written by the app at order-creation time (no RPC/trigger)

-- 1. Enum -----------------------------------------------------------------

create type public.order_status as enum (
  'pending',
  'paid',
  'shipped',
  'delivered',
  'cancelled'
);

-- 2. Tables -----------------------------------------------------------------

create table public.categories (
  id integer generated always as identity primary key,
  name varchar(120) not null,
  constraint categories_name_key unique (name)
);

create table public.products (
  id integer generated always as identity primary key,
  name varchar(200) not null,
  description text,
  price numeric(10, 2) not null,
  category_id integer references public.categories (id) on delete set null,
  constraint products_price_check check (price >= 0)
);

create index products_category_id_idx on public.products (category_id);

create table public.product_images (
  id integer generated always as identity primary key,
  product_id integer not null references public.products (id) on delete cascade,
  image_name text not null,
  created_at timestamptz not null default now()
);

create index product_images_product_id_idx on public.product_images (product_id);

create table public.customers (
  id integer generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  name varchar(120),
  address varchar(500),
  phone varchar(30),
  constraint customers_user_id_key unique (user_id)
);

create table public.orders (
  id integer generated always as identity primary key,
  ordered_at timestamptz not null default now(),
  customer_id integer not null references public.customers (id) on delete restrict,
  status public.order_status not null default 'pending',
  total_amount numeric(12, 2),
  constraint orders_total_amount_check check (total_amount >= 0)
);

create index orders_customer_id_idx on public.orders (customer_id);
create index orders_status_idx on public.orders (status);

create table public.order_items (
  id integer generated always as identity primary key,
  order_id integer not null references public.orders (id) on delete cascade,
  product_id integer not null references public.products (id) on delete restrict,
  quantity integer not null,
  price numeric(10, 2) not null,
  constraint order_items_quantity_check check (quantity > 0),
  constraint order_items_price_check check (price >= 0),
  constraint order_items_order_product_key unique (order_id, product_id)
);

create index order_items_order_id_idx on public.order_items (order_id);
create index order_items_product_id_idx on public.order_items (product_id);

-- 3. Helper functions (private schema, not exposed via PostgREST) -----------

create schema if not exists private;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

create or replace function private.current_customer_id()
returns int
language sql
stable
security definer
set search_path = ''
as $$
  select c.id
  from public.customers c
  where c.user_id = (select auth.uid());
$$;

revoke execute on function private.is_admin() from public, anon, authenticated;
revoke execute on function private.current_customer_id() from public, anon, authenticated;

-- 4. Row Level Security -------------------------------------------------

alter table public.categories     enable row level security;
alter table public.products       enable row level security;
alter table public.product_images enable row level security;
alter table public.customers      enable row level security;
alter table public.orders         enable row level security;
alter table public.order_items    enable row level security;

-- categories

create policy categories_select_public on public.categories
  for select to anon, authenticated
  using (true);

create policy categories_admin_all on public.categories
  for all to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- products

create policy products_select_public on public.products
  for select to anon, authenticated
  using (true);

create policy products_admin_all on public.products
  for all to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- product_images

create policy product_images_select_public on public.product_images
  for select to anon, authenticated
  using (true);

create policy product_images_admin_all on public.product_images
  for all to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- customers

create policy customers_select_own on public.customers
  for select to authenticated
  using (user_id = (select auth.uid()) or (select private.is_admin()));

create policy customers_insert_own on public.customers
  for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy customers_update_own on public.customers
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy customers_admin_all on public.customers
  for all to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- orders

create policy orders_select_own on public.orders
  for select to authenticated
  using (customer_id = (select private.current_customer_id()) or (select private.is_admin()));

create policy orders_insert_own on public.orders
  for insert to authenticated
  with check (customer_id = (select private.current_customer_id()));

create policy orders_admin_all on public.orders
  for all to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- order_items

create policy order_items_select_own on public.order_items
  for select to authenticated
  using (
    (select private.is_admin())
    or exists (
      select 1 from public.orders o
      where o.id = order_id
        and o.customer_id = (select private.current_customer_id())
    )
  );

create policy order_items_insert_own on public.order_items
  for insert to authenticated
  with check (
    exists (
      select 1 from public.orders o
      where o.id = order_id
        and o.customer_id = (select private.current_customer_id())
    )
  );

create policy order_items_admin_all on public.order_items
  for all to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- 5. Storage bucket for product images -----------------------------------

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy product_images_storage_read on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'product-images');

create policy product_images_storage_admin_write on storage.objects
  for all to authenticated
  using (bucket_id = 'product-images' and (select private.is_admin()))
  with check (bucket_id = 'product-images' and (select private.is_admin()));
