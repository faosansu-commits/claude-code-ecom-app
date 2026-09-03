import type { Metadata } from "next";
import { Chakra_Petch, IBM_Plex_Sans_Thai, Space_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/lib/cart-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const chakraPetchHeading = Chakra_Petch({
  subsets: ["thai", "latin"],
  weight: ["300", "500", "600", "700"],
  variable: "--font-heading",
});

const plexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "JHOOWA — มาร์เก็ตเพลสออนไลน์ ซื้อง่าย ขายได้ทุกอย่าง",
  description:
    "ช้อปสินค้ากว่า 50 หมวดหมู่จากร้านค้าทั่วประเทศ ไอที แฟชั่น ความงาม บ้านและสวน แม่และเด็ก และอีกมากมาย ส่งไว ของแท้ 100%",
  openGraph: {
    title: "JHOOWA — มาร์เก็ตเพลสออนไลน์ ซื้อง่าย ขายได้ทุกอย่าง",
    description: "แพลตฟอร์มที่รวมร้านค้าและสินค้ากว่า 50 หมวดหมู่ไว้ในที่เดียว",
    locale: "th_TH",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        plexSansThai.variable,
        chakraPetchHeading.variable,
        spaceMono.variable
      )}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <SiteHeader />
          <main className="flex flex-1 flex-col">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
