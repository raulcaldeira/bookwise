import RatingStars from "@/app/_components/rating-stars"
import formatDate from "@/app/_utils/format-date"
import { Prisma } from "@prisma/client"
import Image from "next/image"

interface RatingCardProps {
  bookRating: Prisma.RatingGetPayload<{
    include: { book: true }
  }>
}

const RatingCard = ({ bookRating }: RatingCardProps) => {
  return (
    <div>
      <header>
        <p className="text-gray-300 opacity-75">
          {formatDate(bookRating.created_at)}
        </p>
      </header>
      <div className="mt-2 rounded-lg bg-gray-700 p-6">
        <div className="flex gap-6">
          <Image
            src={bookRating.book.cover_image}
            alt={`${bookRating.book.name} cover image`}
            width={98}
            height={134}
            style={{
              width: "auto",
              height: "100%",
              minHeight: "94px",
              objectFit: "contain",
            }}
            className="my-auto"
          />
          <div className="flex flex-col justify-between gap-3">
            <div className="flex flex-col">
              <h4 className="line-clamp-2 overflow-hidden text-xl font-bold">
                {bookRating.book.name}
              </h4>
              <span className="text-lg text-gray-400">
                {bookRating.book.author}
              </span>
            </div>
            <RatingStars rating={bookRating.rating} starSize="large" />
          </div>
        </div>
        <div>
          <p className="mt-6 text-justify text-lg text-gray-300">
            {bookRating.comment}
          </p>
        </div>
      </div>
    </div>
  )
}

export default RatingCard
