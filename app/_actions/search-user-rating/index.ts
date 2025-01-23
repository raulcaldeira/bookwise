"use server"

import { db } from "@/app/_lib/prisma"
import { searchUserRatingSchema } from "./schema"

interface UpsertTransactionParams {
  profileId: string
  search: string
}

export const searchUserRating = async (params: UpsertTransactionParams) => {
  searchUserRatingSchema.parse(params)

  if (!params.profileId) {
    throw new Error("Unauthorized")
  }

  const userBookRatings = await db.rating.findMany({
    where: {
      user_id: params.profileId,
      book: {
        name: {
          contains: params.search,
          mode: "insensitive",
        },
      },
    },
    include: {
      book: true,
    },
    orderBy: {
      created_at: "desc",
    },
  })

  return userBookRatings
}
