import { Button } from "@/app/_components/ui/button"
import Image from "next/image"

interface LoginButtonProps {
  text: string
  imagePath: string
  loginType: string
}

const LoginButton = ({ text, imagePath, loginType }: LoginButtonProps) => {
  return (
    <Button className="flex items-center justify-start gap-5 bg-[#252D4A] px-6 py-8 text-xl text-white hover:bg-[#181d30]">
      <Image src={imagePath} alt={loginType} height={26} width={26} />
      {text}
    </Button>
  )
}

export default LoginButton
