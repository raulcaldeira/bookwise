"use client"

import { ScrollArea } from "@/app/_components/ui/scroll-area"
import Searchbar from "./searchbar"
import { Prisma } from "@prisma/client"
import RatingCard from "./rating-card"
import { useState } from "react"
import { searchUserRating } from "@/app/_actions/search-user-rating"

type userBookRatings = Prisma.RatingGetPayload<{
  include: { book: true }
}>[]

interface UserRatingsProps {
  profileId: string
  allUserBookRatings: userBookRatings
}

const UserRatings = ({ profileId, allUserBookRatings }: UserRatingsProps) => {
  const [userBookRatings, setUserBookRatings] =
    useState<userBookRatings>(allUserBookRatings)

  const searchUserBookRatings = async (search: string) => {
    if (search.length === 0) {
      setUserBookRatings(allUserBookRatings)
      return
    }

    const booksRated = await searchUserRating({ profileId, search })

    setUserBookRatings(booksRated)
  }
  return (
    <>
      <Searchbar searchBookRating={searchUserBookRatings} />

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-6">
          {userBookRatings.map((bookRating) => (
            <RatingCard key={bookRating.book_id} bookRating={bookRating} />
          ))}
        </div>
      </ScrollArea>
    </>
  )
}

export default UserRatings
