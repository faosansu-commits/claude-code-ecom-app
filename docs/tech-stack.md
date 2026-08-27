# Tech Stack

- เฟรมเวิร์ก: Next.js 16.3.3 (App Router, ใช้ Turbopack)
- UI: React 19.2.8 + React DOM 19.2.8
- สไตล์: Tailwind CSS v4 (ผ่าน `@tailwindcss/postcss`, ไม่มี `tailwind.config.*`)
- ภาษา: TypeScript ^5 (path alias `@/*` → `./src/*`)
- Lint: ESLint ^9 (flat config `eslint.config.mjs`)
- Test: ยังไม่มีการตั้งค่า
- โครงสร้าง: เป็น scaffold เริ่มต้นจาก create-next-app มีแค่ `src/app/` (layout.tsx, page.tsx, globals.css)
