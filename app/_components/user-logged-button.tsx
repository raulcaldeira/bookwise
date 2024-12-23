"use client"

import { Session } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { LogIn, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"

interface UserLoggedButtonProps {
  session: Session | null
}
const UserLoggedButton = ({ session }: UserLoggedButtonProps) => {
  const nameInitial = session?.user?.name?.split(" ")[0].substring(0, 1)

  const handleLogoutClick = () => {
    signOut({ callbackUrl: "/login" })
  }
  return (
    <>
      {session?.user ? (
        <div className="flex items-center justify-center gap-4">
          <div className="bg-vertical-gradient rounded-full p-[2px]">
            <Link href={`/profile/${(session?.user as any).id}`}>
              <Avatar className="border-vertical-gradient h-9 w-9">
                <AvatarImage
                  alt="user profile image"
                  src={session.user.image ? session.user.image : ""}
                />
                <AvatarFallback className="bg-gray-500 font-bold">
                  {nameInitial}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>

          <span className="font-bold text-gray-200">
            {session.user.name?.split(" ")[0]}
          </span>

          <Button
            className="p-0"
            variant="ghost"
            onClick={() => handleLogoutClick()}
          >
            <LogOut className="text-red-400" />
          </Button>
        </div>
      ) : (
        <Link
          href={"/login"}
          className="flex items-center justify-center gap-3 text-lg text-gray-200"
        >
          Fazer login <LogIn size={20} className="text-green-100" />
        </Link>
      )}
    </>
  )
}

export default UserLoggedButton
