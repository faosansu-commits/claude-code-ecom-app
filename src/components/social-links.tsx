import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Facebook01Icon, InstagramIcon, TwitterIcon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

export const SOCIAL_LINKS = [
  { icon: Facebook01Icon, label: "Facebook", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: TwitterIcon, label: "Twitter", href: "#" },
] as const

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {SOCIAL_LINKS.map((social) => (
        <Link
          key={social.label}
          href={social.href}
          aria-label={social.label}
          className="flex size-9 items-center justify-center rounded-full bg-background text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground"
        >
          <HugeiconsIcon icon={social.icon} strokeWidth={2} className="size-4" />
        </Link>
      ))}
    </div>
  )
}
