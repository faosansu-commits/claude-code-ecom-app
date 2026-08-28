-- Fix "multiple permissive policies" performance warnings from get_advisors.
-- Cause: `<table>_admin_all` (for all) overlapped with the select/insert-own
-- policies on the same role+action, so Postgres evaluated two permissive
-- policies per row instead of one. This merges admin access into the
-- existing policies (or splits admin_all to skip the overlapping action)
-- with identical effective permissions.
-- Note: Postgres RLS policies take exactly one action keyword each
-- (no `for insert, update, delete` shorthand), so admin write access is
-- split into one policy per action.

-- categories / products / product_images:
-- select is already public (using true), so admin doesn't need a separate
-- select grant. Narrow admin_all to the write actions only.

drop policy categories_admin_all on public.categories;
create policy categories_admin_insert on public.categories
  for insert to authenticated
  with check ((select private.is_admin()));
create policy categories_admin_update on public.categories
  for update to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));
create policy categories_admin_delete on public.categories
  for delete to authenticated
  using ((select private.is_admin()));

drop policy products_admin_all on public.products;
create policy products_admin_insert on public.products
  for insert to authenticated
  with check ((select private.is_admin()));
create policy products_admin_update on public.products
  for update to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));
create policy products_admin_delete on public.products
  for delete to authenticated
  using ((select private.is_admin()));

drop policy product_images_admin_all on public.product_images;
create policy product_images_admin_insert on public.product_images
  for insert to authenticated
  with check ((select private.is_admin()));
create policy product_images_admin_update on public.product_images
  for update to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));
create policy product_images_admin_delete on public.product_images
  for delete to authenticated
  using ((select private.is_admin()));

-- customers: select_own/update_own already OR in is_admin(); merge admin
-- into insert as well, then keep a delete-only admin policy (spec: rows
-- can't be deleted by their owner, only admins retain that ability).

drop policy customers_insert_own on public.customers;
create policy customers_insert on public.customers
  for insert to authenticated
  with check (user_id = (select auth.uid()) or (select private.is_admin()));

drop policy customers_admin_all on public.customers;
create policy customers_admin_delete on public.customers
  for delete to authenticated
  using ((select private.is_admin()));

-- orders: select_own already ORs in is_admin(); merge admin into insert,
-- keep update/delete as admin-only (customers can never edit/delete orders).

drop policy orders_insert_own on public.orders;
create policy orders_insert on public.orders
  for insert to authenticated
  with check (customer_id = (select private.current_customer_id()) or (select private.is_admin()));

drop policy orders_admin_all on public.orders;
create policy orders_admin_update on public.orders
  for update to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));
create policy orders_admin_delete on public.orders
  for delete to authenticated
  using ((select private.is_admin()));

-- order_items: same pattern as orders.

drop policy order_items_insert_own on public.order_items;
create policy order_items_insert on public.order_items
  for insert to authenticated
  with check (
    exists (
      select 1 from public.orders o
      where o.id = order_id
        and o.customer_id = (select private.current_customer_id())
    )
    or (select private.is_admin())
  );

drop policy order_items_admin_all on public.order_items;
create policy order_items_admin_update on public.order_items
  for update to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));
create policy order_items_admin_delete on public.order_items
  for delete to authenticated
  using ((select private.is_admin()));
