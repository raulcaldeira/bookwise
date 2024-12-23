import Sidebar from "@/app/_components/sidebar"
import TitlePage from "@/app/_components/title-page"
import { authOptions } from "@/app/_lib/auth"
import { User } from "lucide-react"
import { getServerSession } from "next-auth"
import Searchbar from "./components/searchbar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar"
import { db } from "@/app/_lib/prisma"
import { getYear } from "date-fns"
import { notFound } from "next/navigation"

interface ProfileProps {
  params: {
    userId: string
  }
}

export default async function Profile({ params }: ProfileProps) {
  const session = await getServerSession(authOptions)

  const profileId = params.userId

  const userData = await db.user.findUnique({ where: { id: profileId } })

  if (!userData) {
    // Redireciona para a página de 404 se o usuário não for encontrado
    notFound()
  }

  return (
    <section className="flex h-full">
      <div className="p-5">
        <Sidebar session={session} />
      </div>
      <div className="flex h-full flex-1 flex-col px-24 pt-16">
        <TitlePage
          icon={<User size={30} className="text-green-100" />}
          text="Perfil"
        />
        <div className="mt-10 flex gap-16">
          <section className="flex-1">
            <Searchbar />
          </section>
          <section className="h-[555px] w-[308px] border-l border-gray-700">
            <div className="bg-vertical-gradient mx-auto flex w-fit items-center justify-center rounded-full p-[1px]">
              <Avatar className="h-[72px] w-[72px]">
                <AvatarImage
                  alt="user profile image"
                  src={session?.user?.image ? session.user.image : ""}
                />
                <AvatarFallback className="bg-gray-500 font-bold">
                  {session?.user?.name?.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="mt-5">
              <h3 className="text-center text-xl font-bold text-gray-100">
                {userData?.name}
              </h3>
              <p className="text-center text-gray-400 opacity-75">
                membro desde {getYear(new Date(userData?.createdAt!))}
              </p>
            </div>

            <div className="bg-horizontal-gradient mx-auto my-8 h-[4px] w-[32px]"></div>
          </section>
        </div>
      </div>
    </section>
  )
}
