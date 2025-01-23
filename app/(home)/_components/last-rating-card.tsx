import RatingStars from "@/app/_components/rating-stars"
import { db } from "@/app/_lib/prisma"
import formatDate from "@/app/_utils/format-date"
import { Book, Rating } from "@prisma/client"
import { Session } from "next-auth"
import Image from "next/image"

interface RatingWithBook extends Rating {
  book: Book
}

interface LastRatingCardProps {
  rating: RatingWithBook
}

const LastRatingCard = ({ rating }: LastRatingCardProps) => {
  return (
    <div className="flex gap-5 bg-gray-600 p-6">
      <div>
        <Image
          src={rating.book.cover_image}
          alt={`${rating.book.name} cover image`}
          width={108}
          height={152}
          style={{
            width: "auto",
            height: "100%",
            minHeight: "152px",
            objectFit: "contain", // Mantém a proporção da imagem
          }}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between">
          <span className="text-gray-400">
            {" "}
            {formatDate(rating.created_at)}{" "}
          </span>
          <RatingStars rating={rating.rating} />
        </header>
        <div className="mt-4 flex h-full flex-col justify-between">
          <div className="flex flex-col">
            <h4 className="text-lg font-bold">{rating.book.name}</h4>
            <span className="text-gray-400">{rating.book.author}</span>
          </div>
          <p className="line-clamp-2 overflow-hidden text-justify text-gray-300">
            {rating.comment}
          </p>
        </div>
      </div>
    </div>
  )
}

export default LastRatingCard
