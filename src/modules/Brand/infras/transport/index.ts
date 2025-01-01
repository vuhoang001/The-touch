import { PagingSchema } from './../../../../shared/models/paging';
import { Request, Response } from "express";
import { CreateCommand, GetDetailQuery, IBrandUserCase } from "../../interfaces";
import { BrandUpdateDTO, BrandUpdateDTOSchema } from "../../models/dto";
import { Brand } from '../../models/brand';
import { ICommandHandler, IQueryHandler } from '../../../../shared/interfaces';

export class BrandHttpService {
    constructor(
        private readonly useCase: IBrandUserCase,
        private readonly createCmdHandler: ICommandHandler<CreateCommand, string>,
        private readonly getDetailCmdHandler: IQueryHandler<GetDetailQuery, Brand>
    ) { }

    async createAPI(req: Request, res: Response) {
        try {
            const cmd: CreateCommand = { cmd: req.body }
            const result = await this.createCmdHandler.execute(cmd)
            res.status(200).json({ data: result })
        } catch (error) {

            res.status(400).json({
                message: (error as Error).message
            })
            return;
        }
    }

    async getAPI(req: Request, res: Response) {

        const { id } = req.params
        try {
            const response = await this.getDetailCmdHandler.execute({ id })
            res.status(200).json({
                message: response
            })
        } catch (error) {
            res.status(400).json({
                message: (error as Error).message
            })
        }
    }

    async updateAPI(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { success, data, error } = BrandUpdateDTOSchema.safeParse(req.body)
            if (!success) {
                res.status(400).json({
                    message: error
                })
                return
            }
            const response = await this.useCase.update(id, data as BrandUpdateDTO)

            res.status(200).json({
                message: response
            })
        } catch (error) {
            res.status(400).json({
                message: (error as Error).message
            })
        }
    }

    async listAPI(req: Request, res: Response) {
        try {
            const { success, data: paging, error } = PagingSchema.safeParse(req.query)

            if (!success) {
                res.status(400).json({
                    message: error
                })
                return
            }

            const result = await this.useCase.list({}, paging)

            res.status(200).json({
                message: result,
                paging
            })

        } catch (error) {
            res.status(400).json({
                message: (error as Error).message
            })
        }
    }

    async deleteAPI(req: Request, res: Response) {
        try {
            const { id } = req.params
            const result = await this.useCase.delete(id)

            return res.status(200).json({
                message: result
            })
        } catch (error) {
            res.status(400).json({
                message: (error as Error).message
            })
        }
    }

}