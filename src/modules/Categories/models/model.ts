import { z } from 'zod'
import { ModelStatus } from '../../../shared/models/base-model'


export const CategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3, 'Name is must be at least 3 characters long'),
    image: z.string().optional(),
    description: z.string().optional(),
    position: z.number().min(0, "invalid position").default(0),
    parentId: z.string().uuid().nullable().optional(),
    status: z.nativeEnum(ModelStatus),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type Category = z.infer<typeof CategorySchema>

