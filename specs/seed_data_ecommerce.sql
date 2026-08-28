-- =============================================
-- Seed Data — E-commerce Database
-- อ้างอิงสเปกจาก specs/db-spec.md (schema: categories, products, product_images,
-- customers, orders, order_items + auth.users)
--
-- หมายเหตุ: ตอนเขียนไฟล์นี้ ทุกตาราง (รวม auth.users) ว่างเปล่า จึงสร้าง
-- auth user 2 คนไว้ให้ก่อน (admin + ลูกค้าทั่วไป) แล้วค่อย seed ข้อมูลตาม
-- ความสัมพันธ์จริง — รันบน Supabase Postgres เท่านั้น (ต้องมี extensions.pgcrypto)
--
--   admin@example.com    / Admin123!     -> app_metadata.role = 'admin' (private.is_admin() = true)
--   customer@example.com / Customer123!  -> ลูกค้าทั่วไป ผูกกับแถวใน public.customers
--
-- คำเตือน: รหัสผ่านนี้เป็นค่า default สำหรับ dev/demo เท่านั้น ห้ามใช้จริงบน production
-- =============================================

-- 0. Auth users (admin + ลูกค้าทั่วไป)
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at,
  confirmation_token, recovery_token, email_change_token_new, email_change
) values
  (
    '00000000-0000-0000-0000-000000000000',
    '398f9448-73b1-48de-9c64-b67924bb48a8',
    'authenticated', 'authenticated',
    'admin@example.com',
    extensions.crypt('Admin123!', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"],"role":"admin"}'::jsonb,
    '{}'::jsonb,
    now(), now(),
    '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '486acf01-7dc6-46c6-82d7-85127a63727a',
    'authenticated', 'authenticated',
    'customer@example.com',
    extensions.crypt('Customer123!', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now(), now(),
    '', '', '', ''
  );

insert into auth.identities (
  id, user_id, provider_id, provider, identity_data, last_sign_in_at, created_at, updated_at
) values
  (
    '5f667a26-efae-4b07-b921-a98beff5b38f',
    '398f9448-73b1-48de-9c64-b67924bb48a8',
    '398f9448-73b1-48de-9c64-b67924bb48a8',
    'email',
    '{"sub":"398f9448-73b1-48de-9c64-b67924bb48a8","email":"admin@example.com","email_verified":true,"phone_verified":false}'::jsonb,
    now(), now(), now()
  ),
  (
    'f9981ad8-6fbc-44c6-bd43-ee839618fed2',
    '486acf01-7dc6-46c6-82d7-85127a63727a',
    '486acf01-7dc6-46c6-82d7-85127a63727a',
    'email',
    '{"sub":"486acf01-7dc6-46c6-82d7-85127a63727a","email":"customer@example.com","email_verified":true,"phone_verified":false}'::jsonb,
    now(), now(), now()
  );

-- 1. categories
insert into public.categories (name) values
('สมาร์ทโฟน'),
('แล็ปท็อป'),
('หูฟัง'),
('แท็บเล็ต'),
('อุปกรณ์เสริม');

-- 2. products
insert into public.products (name, description, price, category_id) values
('iPhone 16 Pro', 'สมาร์ทโฟน Apple จอ 6.3 นิ้ว ชิป A18 Pro', 45900.00, 1),
('Samsung Galaxy S25', 'สมาร์ทโฟน Samsung จอ 6.2 นิ้ว ชิป Snapdragon 8 Elite', 32900.00, 1),
('MacBook Air M3', 'แล็ปท็อป Apple จอ 15 นิ้ว RAM 16GB SSD 512GB', 44900.00, 2),
('AirPods Pro 2', 'หูฟังไร้สาย Apple ตัดเสียงรบกวน USB-C', 8990.00, 3),
('iPad Air M2', 'แท็บเล็ต Apple จอ 13 นิ้ว ชิป M2', 33900.00, 4);

-- 3. product_images
insert into public.product_images (product_id, image_name) values
(1, 'iphone16pro-front.jpg'),
(1, 'iphone16pro-back.jpg'),
(2, 'galaxy-s25-front.jpg'),
(3, 'macbook-air-m3-silver.jpg'),
(4, 'airpods-pro2-case.jpg');

-- 4. customers
-- ผูกกับ auth user "customer@example.com" ที่สร้างไว้ด้านบน (ลูกค้าทั่วไป)
-- admin ไม่มีแถวใน customers เพราะสิทธิ์แอดมินมาจาก app_metadata.role เท่านั้น (ดู db-spec.md ข้อ 5.1)
insert into public.customers (user_id, name, address, phone) values
('486acf01-7dc6-46c6-82d7-85127a63727a', 'สมชาย ใจดี', '123 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110', '081-234-5678');

-- 5. orders
-- customer_id ทั้งหมดอ้างถึงลูกค้ารายเดียวข้างต้น (id = 1)
-- status ต้องเป็นค่าใน enum order_status จริง: pending, paid, shipped, delivered, cancelled
insert into public.orders (ordered_at, customer_id, status, total_amount) values
('2026-06-01 09:30:00', 1, 'delivered', 100790.00),
('2026-06-01 14:15:00', 1, 'delivered', 53890.00),
('2026-06-02 10:00:00', 1, 'paid', 41890.00),
('2026-06-02 16:45:00', 1, 'shipped', 78800.00),
('2026-06-03 08:20:00', 1, 'paid', 79800.00);

-- 6. order_items (10 rows)
insert into public.order_items (order_id, product_id, quantity, price) values
-- Order #1: iPhone 16 Pro x2 + AirPods Pro 2 x1 = 100,790
(1, 1, 2, 45900.00),
(1, 4, 1, 8990.00),
-- Order #2: MacBook Air M3 x1 + AirPods Pro 2 x1 = 53,890
(2, 3, 1, 44900.00),
(2, 4, 1, 8990.00),
-- Order #3: Galaxy S25 x1 + AirPods Pro 2 x1 = 41,890
(3, 2, 1, 32900.00),
(3, 4, 1, 8990.00),
-- Order #4: MacBook Air M3 x1 + iPad Air M2 x1 = 78,800
(4, 3, 1, 44900.00),
(4, 5, 1, 33900.00),
-- Order #5: iPhone 16 Pro x1 + iPad Air M2 x1 = 79,800
(5, 1, 1, 45900.00),
(5, 5, 1, 33900.00);
