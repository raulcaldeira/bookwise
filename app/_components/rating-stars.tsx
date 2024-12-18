import { Star } from "lucide-react"

interface RatingStarsProps {
  rating: number
}

const RatingStars = ({ rating }: RatingStarsProps) => {
  const stars = Array.from({ length: 5 }, (_, index) => index < rating)

  return (
    <div className="flex gap-1">
      {stars.map((isFilled, index) => (
        <Star
          size={16}
          className={`${isFilled && "fill-current"} text-purple-100`}
        />
      ))}
    </div>
  )
}

export default RatingStars
