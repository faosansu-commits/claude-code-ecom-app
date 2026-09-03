import { HugeiconsIcon } from "@hugeicons/react"
import { SparkleIcon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

/**
 * Gradient "bubble letter" wordmark styled after the JHOOWA launch poster —
 * warm orange-to-gold gradient fill with a dark navy contour outline.
 */
export function Logo({
  className,
  wordmarkClassName,
  showSparkle = true,
}: {
  className?: string
  wordmarkClassName?: string
  showSparkle?: boolean
}) {
  return (
    <span className={cn("relative inline-flex items-center", className)}>
      <span
        className={cn(
          "bg-gradient-to-b from-[#FFD666] via-[#F2740A] to-[#C2570A] bg-clip-text font-heading text-xl font-extrabold tracking-tight text-transparent",
          wordmarkClassName
        )}
        style={{
          textShadow:
            "-2px -2px 0 #4A1000, 2px -2px 0 #4A1000, -2px 2px 0 #4A1000, 2px 2px 0 #4A1000, 0 3px 0 #4A1000, 0 6px 10px rgba(74,16,0,0.4)",
          WebkitTextStroke: "1px #4A1000",
        }}
      >
        JHOOWA
      </span>
      {showSparkle && (
        <HugeiconsIcon
          icon={SparkleIcon}
          strokeWidth={0}
          fill="#FFC145"
          className="absolute -top-1.5 -right-2.5 size-3"
        />
      )}
    </span>
  )
}
