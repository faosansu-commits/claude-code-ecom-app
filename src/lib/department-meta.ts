import {
  BabyBottleIcon,
  Book02Icon,
  Car01Icon,
  Dress01Icon,
  Dumbbell01Icon,
  HammerIcon,
  HealthIcon,
  Luggage01Icon,
  PawPrintIcon,
  PerfumeIcon,
  RestaurantIcon,
  SmartPhone01Icon,
  Sofa01Icon,
  TShirtIcon,
} from "@hugeicons/core-free-icons"

export type DepartmentMeta = {
  slug: string
  /** Short label for tight nav bars — full department name lives in mock-data.ts. */
  label: string
  icon: typeof SmartPhone01Icon
  color: string
}

export const departmentMeta: DepartmentMeta[] = [
  { slug: "electronics", label: "ไอที", icon: SmartPhone01Icon, color: "#2563EB" },
  { slug: "womens-fashion", label: "แฟชั่นหญิง", icon: Dress01Icon, color: "#DB2777" },
  { slug: "mens-fashion", label: "แฟชั่นชาย", icon: TShirtIcon, color: "#4F46E5" },
  { slug: "beauty", label: "ความงาม", icon: PerfumeIcon, color: "#E11D48" },
  { slug: "home-garden", label: "บ้าน-สวน", icon: Sofa01Icon, color: "#D97706" },
  { slug: "moms-kids", label: "แม่-เด็ก", icon: BabyBottleIcon, color: "#0EA5E9" },
  { slug: "food-beverage", label: "อาหาร", icon: RestaurantIcon, color: "#EA580C" },
  { slug: "health", label: "สุขภาพ", icon: HealthIcon, color: "#059669" },
  { slug: "sports-outdoor", label: "กีฬา", icon: Dumbbell01Icon, color: "#65A30D" },
  { slug: "automotive", label: "ยานยนต์", icon: Car01Icon, color: "#475569" },
  { slug: "pets", label: "สัตว์เลี้ยง", icon: PawPrintIcon, color: "#CA8A04" },
  { slug: "books-stationery", label: "หนังสือ", icon: Book02Icon, color: "#7C3AED" },
  { slug: "tools-hardware", label: "เครื่องมือช่าง", icon: HammerIcon, color: "#78716C" },
  { slug: "travel-music", label: "กระเป๋า-ดนตรี", icon: Luggage01Icon, color: "#0D9488" },
]

export function getDepartmentMeta(slug: string) {
  return departmentMeta.find((d) => d.slug === slug)
}
