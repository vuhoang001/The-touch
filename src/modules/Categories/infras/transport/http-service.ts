import { PagingSchema } from '../../../../shared/models/paging';
import { Response, Request } from 'express';
import { CategoryCondSchema, CategoryCreateSchema, CategoryUpdateSchema } from '../../models/dto';
import { ICategoryUseCase } from '../../interface';

export class CategoryHttpService {
    constructor(private readonly useCase: ICategoryUseCase) {
    }

    async createANewCategoryAPI(req: Request, res: Response) {


        const { success, data, error } = CategoryCreateSchema.safeParse(req.body)

        if (!success) {
            res.status(401).json({
                message: "error",
                data: error.message
            })
            return;
        }

        const result = await this.useCase.createANewCategory(req.body)
        res.status(201).json({
            data: result
        })
    }

    async getCategoryAPI(req: Request, res: Response) {
        const { id } = req.params

        const result = await this.useCase.getDetailCategory(id);

        res.status(200).json({ data: result })
    }

    async updateCategoryAPI(req: Request, res: Response) {
        const { id } = req.params

        const { success, error, data } = CategoryUpdateSchema.safeParse(req.body)
        if (!success) {
            res.status(400).json({
                message: 'error',
                data: error.message
            })
            return
        }

        const result = await this.useCase.updateCategory(id, data);
        res.status(200).json({ data: result })
    }

    async listCategoryAPI(req: Request, res: Response) {
        const { success, data, error } = PagingSchema.safeParse(req.query)
        if (!success) {
            res.status(200).json({
                message: "error",
                data: error.message
            })
            return
        }

        // const { success, data, error } = CategoryCondSchema.safeParse(req.query);



        const result = await this.useCase.listDetailCategory({}, data)
        res.status(200).json({ data: result })
    }

    async deleteCagoryAPI(req: Request, res: Response) {
        const { id } = req.params
        const { isHard } = req.body

        const result = await this.useCase.deleteCategory(id, isHard)
        res.status(200).json({ data: result })
    }
}