import { z } from 'zod'
import { ErrBrandNameTooShort } from './error'
// import { ModelStatus } from '../../../shared/components/models/base-model'


export const BrandCreateDTOSchema = z.object({
    name: z.string().min(3, ErrBrandNameTooShort),
    image: z.string().optional(),
    description: z.string().optional(),
    tag_line: z.string().optional(),
})

export const BrandUpdateDTOSchema = z.object({
    name: z.string().min(3, ErrBrandNameTooShort),
    image: z.string().optional(),
    description: z.string().optional(),
    tag_line: z.string().optional(),
})




export type BrandCreateDTO = z.infer<typeof BrandCreateDTOSchema>
export type BrandUpdateDTO = z.infer<typeof BrandUpdateDTOSchema>
export type BrandCondDTO = {}