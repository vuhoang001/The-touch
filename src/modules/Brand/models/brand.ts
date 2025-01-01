import { z } from 'zod'
import { ModelStatus } from '../../../shared/models/base-model'
import { ErrBrandNameTooShort } from './error'

export const ModelName = "brand"

export const BrandSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3, ErrBrandNameTooShort),
    image: z.string().optional(),
    description: z.string().optional(),
    tag_line: z.string().optional(),
    status: z.nativeEnum(ModelStatus),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type Brand = z.infer<typeof BrandSchema>

