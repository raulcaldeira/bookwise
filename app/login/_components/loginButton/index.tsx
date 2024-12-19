"use client"

import { Button } from "@/app/_components/ui/button"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

interface LoginButtonProps {
  text: string
  imagePath: string
  loginType: string
  url?: string
}

const LoginButton = ({ text, imagePath, loginType, url }: LoginButtonProps) => {
  return (
    <>
      {url ? (
        <Link href={url} className="w-full">
          <Button className="flex w-full items-center justify-start gap-5 bg-[#252D4A] px-6 py-8 text-xl text-white hover:bg-[#181d30]">
            <Image src={imagePath} alt={loginType} height={26} width={26} />
            {text}
          </Button>
        </Link>
      ) : (
        <Button
          onClick={() => signIn(loginType)}
          className="flex items-center justify-start gap-5 bg-[#252D4A] px-6 py-8 text-xl text-white hover:bg-[#181d30]"
        >
          <Image src={imagePath} alt={loginType} height={26} width={26} />
          {text}
        </Button>
      )}
    </>
  )
}

export default LoginButton
