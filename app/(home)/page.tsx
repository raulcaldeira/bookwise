import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import Sidebar from "../_components/sidebar"
import TitlePage from "../_components/title-page"
import { ChartLine } from "lucide-react"
import BookRatingCard from "./_components/book-rating-card"
import { db } from "../_lib/prisma"
import { ScrollArea } from "../_components/ui/scroll-area"

export default async function Home() {
  const session = await getServerSession(authOptions)

  const recentRatings = await db.rating.findMany({
    include: {
      book: true,
      user: true,
    },
    orderBy: {
      created_at: "desc",
    },
    take: 5,
  })

  return (
    <section className="flex h-full">
      <div className="p-5">
        <Sidebar session={session} />
      </div>
      <div className="flex flex-1 flex-col px-24 pt-16">
        <TitlePage
          icon={<ChartLine size={30} className="text-green-100" />}
          text="Início"
        />
        <div className="mt-10 flex gap-16 overflow-hidden">
          <section className="flex-1">
            <h3 className="opacity-70">Avaliações mais recentes</h3>
            <ScrollArea className="mt-4 h-full pr-4">
              <div className="space-y-4 pb-20">
                {recentRatings.map((rating) => (
                  <BookRatingCard
                    key={rating.user.id + rating.book.id}
                    rating={rating}
                  />
                ))}
              </div>
            </ScrollArea>
          </section>
          <section className="h-full"></section>
        </div>
      </div>
    </section>
  )
}
