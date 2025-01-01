import { z } from "zod"
import { ModelStatus } from "../../../shared/models/base-model"


export const CategoryCreateSchema = z.object({
    name: z.string().min(2, "name must be at least 3 characters long"),
    image: z.string().optional(),
    description: z.string().optional(),
    parentId: z.string().uuid().nullable().optional(),
})

export const CategoryUpdateSchema = z.object({
    name: z.string().min(2, "name must be at least 3 characters long").optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    parent_id: z.string().uuid().nullable().optional(),
    status: z.nativeEnum(ModelStatus).optional(),

})

export const CategoryCondSchema = z.object({
    name: z.string().min(2, "name must be at least 3 characters long").optional(),
    parentId: z.string().uuid().optional(),
    status: z.nativeEnum(ModelStatus).optional()

})
export type CategoryCreateDto = z.infer<typeof CategoryCreateSchema>
export type CategoryUpdateDto = z.infer<typeof CategoryUpdateSchema>
export type CategoryCondDto = z.infer<typeof CategoryCondSchema>