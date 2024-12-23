"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

interface SidebarLinkProps {
  text: string
  url: string
  icon: ReactNode
  hide?: boolean
}

const SidebarLink = ({ text, url, icon, hide = false }: SidebarLinkProps) => {
  const pathname = usePathname()

  const linkIsActive = pathname.split("/")[1] === url.split("/")[1]

  return (
    <div className={`relative flex px-5 ${hide && "hidden"}`}>
      <div
        className={`absolute left-0 top-0 h-full w-1 rounded-b-full rounded-t-full ${linkIsActive ? "bg-vertical-gradient" : "bg-transparent"}`}
      ></div>
      <Link href={url} className="flex items-center gap-3">
        <div
          className={`flex items-center gap-3 ${linkIsActive ? "font-bold" : "opacity-60"}`}
        >
          {icon}
          <span className="text-lg capitalize text-gray-100">{text}</span>
        </div>
      </Link>
    </div>
  )
}

export default SidebarLink
