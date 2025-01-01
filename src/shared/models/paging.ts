import { z } from "zod"

export const PagingSchema = z.object({
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).optional(),
    total: z.coerce.number().int().default(0).optional()
})

export type PagingDto = z.infer<typeof PagingSchema>

