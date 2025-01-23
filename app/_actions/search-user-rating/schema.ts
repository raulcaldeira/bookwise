import { z } from "zod"

export const searchUserRatingSchema = z.object({
  profileId: z.string().uuid(),
  search: z.string().trim().min(1),
})
