import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import Sidebar from "../_components/sidebar"
import TitlePage from "../_components/title-page"
import { ChartLine, ChevronRight } from "lucide-react"
import BookRatingCard from "./_components/book-rating-card"
import { db } from "../_lib/prisma"
import { ScrollArea } from "../_components/ui/scroll-area"
import Link from "next/link"
import BookCard from "../_components/book-card"
import { Book } from "@prisma/client"
import LastRatingCard from "./_components/last-rating-card"

export interface BooksWithRating extends Book {
  avg_rating: number
  weighted_popularity: number
}

export default async function Home() {
  const session = await getServerSession(authOptions)

  const lastReading =
    session &&
    (await db.rating.findFirst({
      where: {
        user_id: (session?.user as any).id,
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        book: true,
      },
    }))

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

  const popularBooks: BooksWithRating[] = await db.$queryRaw`
  SELECT
      b.*,
      ROUND(AVG(r.rating)) AS avg_rating,
      -- Fórmula de popularidade ponderada
      (AVG(r.rating) * LOG(COUNT(r.book_id) + 1)) AS weighted_popularity
  FROM
      books b
  JOIN
      ratings r ON b.id = r.book_id
  GROUP BY
      b.id, b.name 
  ORDER BY
      weighted_popularity DESC  
  LIMIT 4
`

  return (
    <section className="flex h-full">
      <div className="p-5">
        <Sidebar session={session} />
      </div>
      <div className="flex flex-1 flex-col px-24 pt-16">
        <TitlePage
          icon={<ChartLine size={30} className="text-green-100" />}
          text="Início "
        />

        <div className="mt-10 flex gap-16 overflow-hidden">
          <ScrollArea className="h-full flex-1 pr-4">
            <div>
              {session && lastReading && (
                <section className="mb-10">
                  <h3 className="opacity-70">Sua última leitura </h3>
                  <div className="mt-5">
                    <LastRatingCard rating={lastReading} />
                  </div>
                </section>
              )}
              <section className="flex-1">
                <h3 className="opacity-70">Avaliações mais recentes </h3>

                <div className="mt-5 space-y-4 pb-20">
                  {recentRatings.map((rating) => (
                    <BookRatingCard
                      key={rating.user.id + rating.book.id}
                      rating={rating}
                    />
                  ))}
                </div>
              </section>
            </div>
          </ScrollArea>
          <section className="max-w-[350px]">
            <div className="flex justify-between">
              <h3 className="opacity-70">Livros populares</h3>
              <Link
                href="/explore"
                className="flex items-center gap-1 font-bold text-purple-100 hover:underline"
              >
                Ver todos
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {popularBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
