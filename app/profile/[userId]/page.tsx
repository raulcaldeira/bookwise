import Sidebar from "@/app/_components/sidebar"
import TitlePage from "@/app/_components/title-page"
import { authOptions } from "@/app/_lib/auth"
import { User } from "lucide-react"
import { getServerSession } from "next-auth"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar"
import { db } from "@/app/_lib/prisma"
import { getYear } from "date-fns"
import { notFound } from "next/navigation"
import Metrics from "./components/metrics"
import UserRatings from "./components/userRatings"

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
    notFound()
  }

  const [totalPagesRead, totalBooksRated, totalAuthorRead, mostReadCategory] =
    await Promise.all([
      // TOTAL PAGES READ
      db.book.aggregate({
        _sum: {
          total_pages: true,
        },
        where: {
          Rating: {
            some: {
              user_id: profileId,
            },
          },
        },
      }),

      // TOTAL BOOKS RATED
      db.rating.aggregate({
        _count: {
          _all: true,
        },
        where: {
          user_id: profileId,
        },
      }),

      // TOTAL AUTHORS READ
      db.book.findMany({
        select: {
          author: true, // Selecionando apenas os campos necessários
        },
        where: {
          Rating: {
            some: {
              user_id: profileId,
            },
          },
        },
        distinct: ["author"], // Distinct ensures that we only get unique authors
      }),

      // MOST READ CATEGORY
      db.book.groupBy({
        by: ["category"],
        where: {
          Rating: {
            some: {
              user_id: profileId,
            },
          },
        },
        _count: {
          category: true,
        },
        orderBy: {
          _count: {
            category: "desc",
          },
        },
        take: 1,
      }),
    ])

  const userBookRatings = await db.rating.findMany({
    where: {
      user_id: profileId,
    },
    include: {
      book: true,
    },
    orderBy: {
      created_at: "desc",
    },
  })

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
        <div className="mt-10 flex h-full gap-16 overflow-hidden pb-5">
          <section className="flex h-full flex-1 flex-col gap-8">
            <UserRatings
              profileId={profileId}
              allUserBookRatings={userBookRatings}
            />
          </section>
          <section className="h-[555px] w-[308px] border-l border-gray-700">
            <div className="bg-vertical-gradient mx-auto flex w-fit items-center justify-center rounded-full p-[1px]">
              <Avatar className="h-[72px] w-[72px]">
                <AvatarImage
                  alt="user profile image"
                  src={userData.image ? userData.image : ""}
                />
                <AvatarFallback className="bg-gray-500 font-bold">
                  {userData.name?.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="mt-5">
              <h3 className="text-center text-xl font-bold text-gray-100">
                {userData?.name}
              </h3>
              <p className="text-center text-gray-400 opacity-75">
                membro desde {getYear(new Date(userData?.createdAt ?? ""))}
              </p>
            </div>

            <div className="bg-horizontal-gradient mx-auto my-8 h-[4px] w-[32px]"></div>

            <div className="py-5">
              <Metrics
                totalPagesRead={Number(totalPagesRead._sum.total_pages || 0)}
                totalBooksRated={totalBooksRated._count._all || 0}
                totalAuthorRead={totalAuthorRead.length}
                mostReadCategory={mostReadCategory[0].category[0] || ""}
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
