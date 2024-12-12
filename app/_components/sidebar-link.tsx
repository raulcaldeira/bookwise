"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

interface SidebarLinkProps {
  text: string
  url: string
  icon: ReactNode
}

const SidebarLink = ({ text, url, icon }: SidebarLinkProps) => {
  const pathname = usePathname()

  return (
    <div className="relative flex px-5">
      <div
        className={`absolute left-0 top-0 h-full w-1 rounded-b-full rounded-t-full ${pathname !== url ? "bg-transparent" : "bg-vertical-gradient"}`}
      ></div>
      <Link href={url} className="flex items-center gap-3">
        <div
          className={`flex items-center gap-3 ${pathname !== url ? "opacity-60" : "font-bold"}`}
        >
          {icon}
          <span className="text-lg capitalize text-gray-100">{text}</span>
        </div>
      </Link>
    </div>
  )
}

export default SidebarLink
