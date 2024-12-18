import Image from "next/image"
import RatingStars from "./rating-stars"
import { BooksWithRating } from "../(home)/page"
import { Book } from "lucide-react"

interface BookCardProps {
  book: BooksWithRating
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="flex gap-5 bg-gray-700 p-5 hover:border hover:border-gray-600">
      <Image
        src={book.cover_image}
        alt={` ${book.name} cover image`}
        width={64}
        height={94}
        style={{
          width: "auto",
          height: "100%",
          minHeight: "94px",
          objectFit: "contain", // Mantém a proporção da imagem
        }}
        className="my-auto"
      />

      <div className="flex flex-col justify-between gap-3">
        <div className="flex flex-col">
          <h4 className="line-clamp-2 overflow-hidden text-lg font-bold">
            {book.name}
          </h4>
          <span className="text-gray-400">{book.author}</span>
        </div>
        <RatingStars rating={book.avg_rating} />
      </div>
    </div>
  )
}

export default BookCard
