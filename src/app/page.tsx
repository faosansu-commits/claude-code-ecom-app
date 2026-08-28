import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-pink-100 font-sans dark:bg-pink-950">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-pink-50 dark:bg-pink-900 sm:items-start">
        <Image
          className="dark:invert h-5 w-25"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-pink-950 dark:text-pink-50">
            เริ่มต้นใช้งานโดยแก้ไขไฟล์{" "}
            <code className="rounded bg-pink-200/60 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-pink-800/60">
              page.tsx
            </code>
          </h1>
          <p className="max-w-md text-lg leading-8 text-pink-700 dark:text-pink-300">
            กำลังมองหาจุดเริ่มต้นหรือคำแนะนำเพิ่มเติมอยู่ใช่ไหม ลองดูที่{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-pink-900 dark:text-pink-100"
            >
              เทมเพลต
            </a>{" "}
            หรือศูนย์{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-pink-900 dark:text-pink-100"
            >
              การเรียนรู้
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-pink-500 px-5 text-white transition-colors hover:bg-pink-600 dark:bg-pink-400 dark:hover:bg-pink-300 md:w-39.5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="invert h-3.5 w-4"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            ดีพลอยตอนนี้
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-pink-300 px-5 transition-colors hover:border-transparent hover:bg-pink-200 dark:border-pink-700 dark:hover:bg-pink-800 md:w-39.5"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            เอกสารประกอบ
          </a>
        </div>
      </main>
    </div>
  );
}
