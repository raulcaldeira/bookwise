import RatingStars from "@/app/_components/rating-stars"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar"
import formatDate from "@/app/utils/format-date"
import { Prisma } from "@prisma/client"
import Image from "next/image"

type RatingWithIncludes = Prisma.RatingGetPayload<{
  include: { book: true; user: true }
}>

interface BookRatingCardProps {
  rating: RatingWithIncludes
}

const BookRatingCard = ({ rating }: BookRatingCardProps) => {
  return (
    <div className="bg-gray-700 p-6">
      <header className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-vertical-gradient flex items-center justify-center rounded-full p-[1px]">
            <Avatar className="h-[40px] w-[40px]">
              <AvatarImage
                alt="user profile image"
                // src={session.user.image ? session.user.image : ""}
                src={rating.user.image ? rating.user.image : ""}
              />
              <AvatarFallback className="bg-gray-500 font-bold">
                {rating.user?.name?.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col">
            <p>{rating.user.name}</p>
            <span className="text-gray-400">
              {" "}
              {formatDate(rating.created_at)}{" "}
            </span>
          </div>
        </div>
        <div>
          <RatingStars rating={rating.rating} />
        </div>
      </header>

      <div className="mt-8 flex gap-5">
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
        <div className="flex flex-1 flex-col justify-between gap-3">
          <div className="flex flex-col">
            <h4 className="text-lg font-bold">{rating.book.name}</h4>
            <span className="text-gray-400">{rating.book.author}</span>
          </div>
          <p className="line-clamp-4 overflow-hidden text-justify text-gray-300">
            {rating.comment}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BookRatingCard
