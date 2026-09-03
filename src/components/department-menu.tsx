"use client"

import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, ChevronDownIcon } from "@hugeicons/core-free-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getDepartmentMeta } from "@/lib/department-meta"
import { categories } from "@/lib/mock-data"

export function DepartmentMenu({ name, slug }: { name: string; slug: string }) {
  const meta = getDepartmentMeta(slug)
  const deptCategories = categories.filter((c) => c.department === name)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="group flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary data-[popup-open]:text-primary"
          />
        }
      >
        {meta && (
          <span
            className="flex size-6 shrink-0 items-center justify-center rounded-md"
            style={{ backgroundColor: `${meta.color}1A`, color: meta.color }}
          >
            <HugeiconsIcon icon={meta.icon} strokeWidth={1.75} className="size-3.5" />
          </span>
        )}
        <span className="tracking-wide whitespace-nowrap">{meta?.label ?? name}</span>
        <HugeiconsIcon
          icon={ChevronDownIcon}
          strokeWidth={2.5}
          className="size-3 text-muted-foreground/70 transition-transform duration-150 group-data-[popup-open]:rotate-180"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={12} className="w-64 p-2">
        {meta && (
          <div className="mb-1.5 flex items-center gap-2 border-b border-border px-2 pb-2">
            <span
              className="flex size-7 shrink-0 items-center justify-center rounded-md"
              style={{ backgroundColor: `${meta.color}1A`, color: meta.color }}
            >
              <HugeiconsIcon icon={meta.icon} strokeWidth={1.75} className="size-4" />
            </span>
            <p className="text-sm font-semibold text-foreground">{name}</p>
          </div>
        )}
        <div className="flex flex-col gap-0.5">
          {deptCategories.map((category) => (
            <DropdownMenuItem
              key={category.id}
              render={<Link href={`/category/${category.slug}`} />}
            >
              {category.name}
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuItem
          render={<Link href={`/categories#${slug}`} />}
          className="mt-1 justify-between border-t border-border pt-2.5 font-medium text-primary"
        >
          ดูทั้งหมดใน{name}
          <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={1.75} className="size-3.5" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
