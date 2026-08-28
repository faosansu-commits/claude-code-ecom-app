# Database Spec — ระบบ E-commerce (Supabase)

เอกสารนี้แปลง ER diagram ที่ `specs/ER-Diagram-ecommerce.png` ให้เป็นสเปกฐานข้อมูลสำหรับ Supabase Postgres
ใช้เป็นข้อตกลงร่วมกันก่อนเขียน migration จริง

- **เป้าหมาย:** Supabase Postgres — schema `public` (ตารางแอป) + `auth.users` (Supabase Auth) + schema `private` (helper function)
- **ขอบเขต:** ยึดตาม ER diagram เป๊ะ — 6 ตาราง + enum `order_status` เท่านั้น ยังไม่มีตะกร้า / การชำระเงิน / รีวิว / คูปอง / สต็อก
- **สถานะปัจจุบัน:** schema `public` ของโปรเจกต์ (`cfaeexypojkddbkyldpm`) ยังว่างเปล่า ทุกอย่างในเอกสารนี้คือของที่ต้องสร้างใหม่
- **โมเดลสิทธิ์:** ลูกค้า (customer) + แอดมิน (admin)

---

## 1. ภาพรวมความสัมพันธ์

```
auth.users ──1:1──> customers ──1:N──> orders ──1:N──> order_items
                                                            │
                                                            └──N:1──> products
categories ──1:N──> products ──1:N──> product_images
```

| ความสัมพันธ์ | ชนิด | คอลัมน์ที่เชื่อม | หมายเหตุ |
|---|---|---|---|
| `auth.users` → `customers` | 1:1 | `customers.user_id` | บังคับ unique เพื่อให้เป็น 1:1 จริง |
| `categories` → `products` | 1:N | `products.category_id` | สินค้าอาจยังไม่มีหมวดหมู่ได้ (nullable) |
| `products` → `product_images` | 1:N | `product_images.product_id` | สินค้า 1 ชิ้นมีได้หลายรูป |
| `customers` → `orders` | 1:N | `orders.customer_id` | |
| `orders` → `order_items` | 1:N | `order_items.order_id` | |
| `products` → `order_items` | 1:N | `order_items.product_id` | ห้ามลบสินค้าที่เคยถูกสั่ง |

---

## 2. รายละเอียดตาราง

หมายเหตุการอ่าน: คอลัมน์ `id` ทุกตารางเป็น `integer generated always as identity primary key`
(ตรงกับ `int4` ใน ER diagram) หากคาดว่าข้อมูลจะเกิน ~2.1 พันล้านแถว ให้เปลี่ยนเป็น `bigint` ตั้งแต่ต้น

### 2.1 `categories` — หมวดหมู่สินค้า

| คอลัมน์ | ชนิด | Null | Default | คำอธิบาย |
|---|---|---|---|---|
| `id` | `int identity` | NO | auto | PK |
| `name` | `varchar(120)` | NO | — | ชื่อหมวดหมู่ |

- **PK:** `id`
- **Unique:** `categories_name_key (name)` — กันหมวดหมู่ซ้ำ
- **Index:** จาก PK และ unique เท่านั้น (ตารางเล็ก)

### 2.2 `products` — สินค้า

| คอลัมน์ | ชนิด | Null | Default | คำอธิบาย |
|---|---|---|---|---|
| `id` | `int identity` | NO | auto | PK |
| `name` | `varchar(200)` | NO | — | ชื่อสินค้า |
| `description` | `text` | YES | — | รายละเอียดสินค้า |
| `price` | `numeric(10,2)` | NO | — | ราคาขายปัจจุบัน (บาท) |
| `category_id` | `int` | YES | — | FK → `categories(id)` |

- **PK:** `id`
- **FK:** `category_id → categories(id) on delete set null` — ลบหมวดหมู่แล้วสินค้าไม่หาย แค่ไม่มีหมวด
- **Check:** `products_price_check: price >= 0`
- **Index:** `products_category_id_idx (category_id)`

### 2.3 `product_images` — รูปสินค้า

| คอลัมน์ | ชนิด | Null | Default | คำอธิบาย |
|---|---|---|---|---|
| `id` | `int identity` | NO | auto | PK |
| `product_id` | `int` | NO | — | FK → `products(id)` |
| `image_name` | `text` | NO | — | ชื่อไฟล์ใน Storage bucket (ดูข้อ 6) |
| `created_at` | `timestamptz` | NO | `now()` | เวลาอัปโหลด |

- **PK:** `id`
- **FK:** `product_id → products(id) on delete cascade` — ลบสินค้า รูปหายตาม
- **Index:** `product_images_product_id_idx (product_id)`
- ยังไม่มีคอลัมน์ `is_primary` / `sort_order` ตาม ER diagram — ถ้าจะเลือกรูปหลัก ให้ใช้รูปที่ `created_at` เก่าสุด หรือเพิ่มคอลัมน์ภายหลัง

### 2.4 `customers` — โปรไฟล์ลูกค้า

| คอลัมน์ | ชนิด | Null | Default | คำอธิบาย |
|---|---|---|---|---|
| `id` | `int identity` | NO | auto | PK ที่ใช้ภายในระบบ |
| `user_id` | `uuid` | NO | — | FK → `auth.users(id)` |
| `name` | `varchar(120)` | YES | — | ชื่อผู้รับ |
| `address` | `varchar(500)` | YES | — | ที่อยู่จัดส่ง (ที่อยู่เดียวต่อลูกค้า) |
| `phone` | `varchar(30)` | YES | — | เบอร์ติดต่อ |

- **PK:** `id`
- **FK:** `user_id → auth.users(id) on delete cascade` — ลบบัญชี auth แล้วโปรไฟล์หายตาม
- **Unique:** `customers_user_id_key (user_id)` — บังคับ 1 บัญชี = 1 ลูกค้า และเป็น index ให้ RLS ใช้ด้วย
- อีเมลไม่เก็บซ้ำที่นี่ — อ่านจาก `auth.users.email`
- แถวใน `customers` ควรถูกสร้างตอนสมัคร ด้วย trigger `after insert on auth.users` หรือให้ฝั่งแอปสร้างครั้งแรกที่ผู้ใช้กรอกโปรไฟล์ (ดูข้อ 7.7)

### 2.5 `orders` — คำสั่งซื้อ

| คอลัมน์ | ชนิด | Null | Default | คำอธิบาย |
|---|---|---|---|---|
| `id` | `int identity` | NO | auto | PK |
| `ordered_at` | `timestamptz` | NO | `now()` | เวลาที่สั่ง |
| `customer_id` | `int` | NO | — | FK → `customers(id)` |
| `status` | `order_status` | NO | `'pending'` | สถานะคำสั่งซื้อ (ดูข้อ 3) |
| `total_amount` | `numeric(12,2)` | YES | — | ยอดรวม (ดูข้อ 7.1) |

- **PK:** `id`
- **FK:** `customer_id → customers(id) on delete restrict` — ห้ามลบลูกค้าที่มีประวัติสั่งซื้อ
- **Check:** `orders_total_amount_check: total_amount >= 0`
- **Index:** `orders_customer_id_idx (customer_id)`, `orders_status_idx (status)` (หน้าจัดการฝั่งแอดมินกรองด้วยสถานะ)

### 2.6 `order_items` — รายการสินค้าในคำสั่งซื้อ

| คอลัมน์ | ชนิด | Null | Default | คำอธิบาย |
|---|---|---|---|---|
| `id` | `int identity` | NO | auto | PK |
| `order_id` | `int` | NO | — | FK → `orders(id)` |
| `product_id` | `int` | NO | — | FK → `products(id)` |
| `quantity` | `int` | NO | — | จำนวนที่สั่ง |
| `price` | `numeric(10,2)` | NO | — | **ราคาต่อหน่วย ณ เวลาที่สั่ง** |

- **PK:** `id`
- **FK:** `order_id → orders(id) on delete cascade`, `product_id → products(id) on delete restrict`
- **Check:** `order_items_quantity_check: quantity > 0`, `order_items_price_check: price >= 0`
- **Unique:** `order_items_order_product_key (order_id, product_id)` — สินค้าเดิมในออเดอร์เดียวให้รวมเป็นแถวเดียวแล้วเพิ่ม `quantity`
- **Index:** `order_items_order_id_idx (order_id)`, `order_items_product_id_idx (product_id)`
- `price` เป็น snapshot: **ห้าม** join ไปอ่าน `products.price` ตอนแสดงใบเสร็จย้อนหลัง เพราะราคาสินค้าเปลี่ยนได้

---

## 3. Enum `order_status`

```sql
create type public.order_status as enum (
  'pending',    -- สร้างออเดอร์แล้ว รอชำระเงิน
  'paid',       -- ชำระเงินแล้ว รอจัดส่ง
  'shipped',    -- ส่งของแล้ว อยู่ระหว่างขนส่ง
  'delivered',  -- ลูกค้าได้รับของแล้ว (สถานะปลายทาง)
  'cancelled'   -- ยกเลิก (สถานะปลายทาง)
);
```

การเปลี่ยนสถานะที่อนุญาต:

```
pending ──> paid ──> shipped ──> delivered
   │          │
   └──────────┴──> cancelled
```

- `delivered` และ `cancelled` เป็นสถานะปลายทาง เปลี่ยนต่อไม่ได้
- ข้อจำกัดนี้บังคับที่ชั้นแอป/ฟังก์ชัน ไม่ได้บังคับด้วย constraint ในสเปกนี้
- **ต้องยืนยัน:** ชุดค่านี้เป็นข้อเสนอ ถ้าธุรกิจมีสถานะเพิ่ม (เช่น `refunded`, `returned`) ให้แก้ที่นี่ก่อนเขียน migration — เพิ่มค่า enum ทีหลังทำได้ (`alter type ... add value`) แต่ลบค่าทำไม่ได้

---

## 4. สรุป Index ทั้งหมด

| Index | ตาราง / คอลัมน์ | เหตุผล |
|---|---|---|
| PK ทุกตาราง | `id` | — |
| `categories_name_key` | `categories(name)` unique | กันชื่อซ้ำ |
| `products_category_id_idx` | `products(category_id)` | FK + กรองสินค้าตามหมวด |
| `product_images_product_id_idx` | `product_images(product_id)` | FK + ดึงรูปของสินค้า |
| `customers_user_id_key` | `customers(user_id)` unique | FK + ถูกใช้ทุกครั้งใน RLS |
| `orders_customer_id_idx` | `orders(customer_id)` | FK + ใช้ใน RLS และหน้าประวัติสั่งซื้อ |
| `orders_status_idx` | `orders(status)` | หน้าแอดมินกรองตามสถานะ |
| `order_items_order_id_idx` | `order_items(order_id)` | FK + ดึงรายการในออเดอร์ |
| `order_items_product_id_idx` | `order_items(product_id)` | FK — จำเป็น ไม่งั้นลบ/อัปเดต `products` จะช้า |

หลักการ: **ทุก foreign key ต้องมี index ฝั่งลูก** ไม่งั้น `delete`/`update` ฝั่งแม่จะ scan ทั้งตาราง
และคอลัมน์ที่ RLS policy ใช้ต้องมี index เสมอ

---

## 5. สิทธิ์การเข้าถึงและ RLS

### 5.1 บทบาท

| บทบาท | Postgres role | นิยาม |
|---|---|---|
| ผู้เยี่ยมชม | `anon` | ยังไม่ล็อกอิน — ดูสินค้าได้อย่างเดียว |
| ลูกค้า | `authenticated` | ล็อกอินแล้ว มีแถวใน `customers` |
| แอดมิน | `authenticated` + claim | JWT มี `app_metadata.role = 'admin'` |

การกำหนดแอดมินทำผ่าน `app_metadata` (ผู้ใช้แก้เองไม่ได้ ต่างจาก `user_metadata` ที่แก้เองได้ — **ห้าม** ใช้ `user_metadata` ตัดสินสิทธิ์)
ตั้งค่าจากฝั่งเซิร์ฟเวอร์ด้วย Admin API: `supabase.auth.admin.updateUserById(id, { app_metadata: { role: 'admin' } })`

### 5.2 Helper functions

วางไว้ใน schema `private` ที่ไม่ถูก expose ผ่าน PostgREST และ revoke สิทธิ์เรียกตรงออกจากทุก role

```sql
create schema if not exists private;

-- true เมื่อผู้เรียกเป็นแอดมิน
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

-- customers.id ของผู้เรียก (คืน null ถ้ายังไม่มีโปรไฟล์)
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
```

**หลักสำคัญด้านประสิทธิภาพ:** ใน policy ต้องห่อฟังก์ชัน auth ด้วย `(select ...)` เสมอ
เช่น `(select private.is_admin())` เพื่อให้ Postgres เรียกครั้งเดียวแล้ว cache ไว้ ไม่ใช่เรียกซ้ำทุกแถว

### 5.3 ตารางสรุป policy

| ตาราง | anon | ลูกค้า (เจ้าของ) | แอดมิน |
|---|---|---|---|
| `categories` | อ่าน | อ่าน | อ่าน/เขียนทั้งหมด |
| `products` | อ่าน | อ่าน | อ่าน/เขียนทั้งหมด |
| `product_images` | อ่าน | อ่าน | อ่าน/เขียนทั้งหมด |
| `customers` | — | อ่าน/แก้ไข/สร้างเฉพาะแถวของตัวเอง (ลบไม่ได้) | อ่าน/เขียนทั้งหมด |
| `orders` | — | อ่าน + สร้างเฉพาะของตัวเอง (แก้/ลบไม่ได้) | อ่าน/เขียนทั้งหมด |
| `order_items` | — | อ่าน + สร้างเฉพาะในออเดอร์ของตัวเอง (แก้/ลบไม่ได้) | อ่าน/เขียนทั้งหมด |

ข้อสังเกต:

- ลูกค้า **แก้ไข `orders` เองไม่ได้เลย** — การเปลี่ยนสถานะ (รวมถึงการยกเลิก) ต้องผ่านแอดมิน หรือผ่าน RPC / Edge Function ที่ตรวจเงื่อนไขเอง
- ลูกค้าเปลี่ยน `customers.user_id` ของตัวเองไม่ได้ (คุมด้วย `with check` ในนโยบาย update)
- `total_amount` ลูกค้าเขียนได้ตอนสร้างออเดอร์ตามสเปกนี้ ถ้าไม่ต้องการไว้ใจฝั่ง client ให้ดูข้อ 7.1

### 5.4 ตัวอย่าง policy

เปิด RLS ทุกตารางก่อน:

```sql
alter table public.categories     enable row level security;
alter table public.products       enable row level security;
alter table public.product_images enable row level security;
alter table public.customers      enable row level security;
alter table public.orders         enable row level security;
alter table public.order_items    enable row level security;
```

**แคตตาล็อก (`categories` / `products` / `product_images`)** — รูปแบบเดียวกันทั้งสามตาราง:

```sql
create policy products_select_public on public.products
  for select to anon, authenticated
  using (true);

create policy products_admin_all on public.products
  for all to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));
```

**`customers`:**

```sql
create policy customers_select_own on public.customers
  for select to authenticated
  using (user_id = (select auth.uid()) or (select private.is_admin()));

create policy customers_insert_own on public.customers
  for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy customers_update_own on public.customers
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));  -- ย้ายแถวไปเป็นของคนอื่นไม่ได้

create policy customers_admin_all on public.customers
  for all to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));
```

**`orders`:**

```sql
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
```

**`order_items`** — สิทธิ์อิงจากออเดอร์แม่:

```sql
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
```

> `service_role` ข้าม RLS ทั้งหมดโดยธรรมชาติ — key นี้ต้องอยู่ฝั่งเซิร์ฟเวอร์เท่านั้น ห้ามหลุดไปฝั่ง client

---

## 6. Supabase Storage สำหรับรูปสินค้า

> **สมมติฐาน (ยังไม่ยืนยัน):** `product_images.image_name` เก็บ *ชื่อไฟล์ / path ใน bucket* ไม่ใช่ URL เต็ม
> ถ้าตัดสินใจเก็บ URL จาก CDN ภายนอกแทน ให้ข้ามหัวข้อนี้ทั้งหมด และเปลี่ยนคำอธิบายคอลัมน์เป็น "URL เต็มของรูป"

- **Bucket:** `product-images`, public read
- **Path convention:** `products/{product_id}/{uuid}.{ext}` และเก็บ path นี้ทั้งเส้นลงใน `image_name`
- **URL ที่ใช้แสดง:** `supabase.storage.from('product-images').getPublicUrl(image_name)`
- **Policy:** อ่านได้ทุกคน อัปโหลด/ลบได้เฉพาะแอดมิน

```sql
create policy product_images_read on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'product-images');

create policy product_images_admin_write on storage.objects
  for all to authenticated
  using (bucket_id = 'product-images' and (select private.is_admin()))
  with check (bucket_id = 'product-images' and (select private.is_admin()));
```

- ลบแถว `product_images` **ไม่ได้** ลบไฟล์ใน Storage ให้อัตโนมัติ — ต้องลบไฟล์จากฝั่งแอป (หรือทำ trigger เรียก Edge Function ภายหลัง)

---

## 7. ประเด็นที่ยังไม่ตัดสิน / ข้อควรระวัง

1. **ใครคำนวณ `total_amount`** — ปัจจุบันเป็น nullable และไม่มี trigger ทางเลือก:
   (ก) ให้ฝั่งแอปคำนวณแล้วเขียนลงไป — ง่ายสุด แต่ client ปลอมยอดได้
   (ข) เขียน RPC `create_order(items)` แบบ `security definer` สร้างทั้งออเดอร์ + รายการ + ยอดรวมในทรานแซกชันเดียว — **แนะนำเมื่อขึ้น production**
   (ค) trigger บน `order_items` คอยอัปเดตยอดรวมของ `orders`
2. **ยังไม่มีสต็อกสินค้า** — สั่งซื้อเกินจำนวนที่มีจริงได้ ถ้าต้องการต้องเพิ่มคอลัมน์ `stock` และล็อกแถวตอนตัดสต็อก (นอกขอบเขต ER diagram ปัจจุบัน)
3. **ยังไม่มีตะกร้าสินค้า** — ต้องเก็บฝั่ง client (localStorage) หรือเพิ่มตาราง `carts` ภายหลัง
4. **ยังไม่มีข้อมูลการชำระเงิน** — `status = 'paid'` เป็นเพียงธง ไม่มีเลขอ้างอิงการชำระเงิน
5. **`varchar(n)` vs `text`** — ER diagram ระบุ `varchar` จึงคงไว้ แต่ใน Postgres `text` เร็วเท่ากันและยืดหยุ่นกว่า ถ้าไม่ต้องการจำกัดความยาวจริง ๆ ใช้ `text` + check constraint แทนได้
6. **ที่อยู่มีได้ที่เดียวต่อลูกค้า** — `customers.address` เป็นคอลัมน์เดียว และออเดอร์ไม่ได้ snapshot ที่อยู่ไว้ ถ้าลูกค้าแก้ที่อยู่ ประวัติออเดอร์เก่าจะอ้างที่อยู่ใหม่ ต้องเพิ่ม `shipping_address` ใน `orders` ถ้าต้องการความถูกต้องย้อนหลัง
7. **การสร้างแถว `customers` ตอนสมัคร** — ต้องเลือกระหว่าง trigger `after insert on auth.users` (อัตโนมัติ แต่ยังไม่มีชื่อ/ที่อยู่) กับให้แอปสร้างตอนกรอกโปรไฟล์ครั้งแรก
8. **ยังไม่มี `created_at` / `updated_at`** ใน `products`, `categories`, `customers`, `order_items` ตาม ER diagram — ถ้าต้องการ audit trail ควรเพิ่มตั้งแต่ migration แรก

---

## 8. ขั้นตอนถัดไป

1. ยืนยัน 3 เรื่อง: ค่า enum `order_status` (ข้อ 3), สมมติฐาน Storage (ข้อ 6), และวิธีคำนวณ `total_amount` (ข้อ 7.1)
2. เขียน migration ตามลำดับการพึ่งพา: `order_status` → `categories` → `products` → `product_images` → `customers` → `orders` → `order_items` → helper functions → RLS policies → Storage bucket/policies
3. Supabase MCP ในโปรเจกต์นี้ตั้งเป็น **read-only** (`.mcp.json`) — จะรัน migration ต้องเอา `read_only=true` ออก หรือใช้ Supabase CLI (`supabase db push`) ซึ่งแนะนำมากกว่าเพราะได้ไฟล์ migration เก็บใน git
4. หลังรัน ให้เช็คด้วย `get_advisors` (security + performance) ว่าไม่มีตารางที่ลืมเปิด RLS หรือ FK ที่ไม่มี index
5. สร้าง TypeScript types ด้วย `supabase gen types typescript` แล้ววางไว้ที่ `src/lib/database.types.ts`
