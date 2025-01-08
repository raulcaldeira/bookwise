import { Star } from "lucide-react"

interface RatingStarsProps {
  rating: number
  starSize?: "default" | "large"
}

const RatingStars = ({ rating, starSize = "default" }: RatingStarsProps) => {
  const stars = Array.from({ length: 5 }, (_, index) => index < rating)

  const starSizeNumber = { default: 16, large: 20 }

  return (
    <div className="flex gap-1">
      {stars.map((isFilled, index) => (
        <Star
          size={starSizeNumber[starSize]}
          className={`${isFilled && "fill-current"} text-purple-100`}
        />
      ))}
    </div>
  )
}

export default RatingStars
