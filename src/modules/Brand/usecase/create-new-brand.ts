import { v7 } from "uuid";
import { CreateCommand, IBrandRepository } from "../interfaces";
import { BrandCreateDTOSchema } from "../models/dto";
import { ErrBrandNameDuplicate } from "../models/error";
import { ModelStatus } from "../../../shared/models/base-model";
import { ICommandHandler } from "../../../shared/interfaces";

export class CreateNewBrandCmdHandler implements ICommandHandler<CreateCommand, string> {

    constructor(private readonly repos: IBrandRepository) {
    }
    async execute(command: CreateCommand): Promise<string> {
        const { success, data: parsedData, error } = BrandCreateDTOSchema.safeParse(command.cmd)

        if (!success) {
            throw new Error(error.message)
        }

        const isExisted = await this.repos.findByCond({ name: parsedData.name })

        if (isExisted) {
            throw ErrBrandNameDuplicate
        }

        const newId = v7()
        const newBrand = {
            ...parsedData,
            id: newId,
            status: ModelStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await this.repos.insert(newBrand)

        return newId
    }
}