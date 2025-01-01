import { ICommandHandler } from "../../../shared/interfaces";
import { ErrDataNotFound } from "../../../shared/models/base-error";
import { ModelStatus } from "../../../shared/models/base-model";
import { IBrandRepository, UpdateCommand } from "../interfaces";
import { BrandUpdateDTOSchema } from "../models/dto";



export class UpdateCmdHandler implements ICommandHandler<UpdateCommand, void> {

    constructor(private readonly repos: IBrandRepository) {
    }

    async execute(command: UpdateCommand): Promise<void> {

        const { success, error, data } = BrandUpdateDTOSchema.safeParse(command.cmd)

        if (!success) {
            throw new Error(error.message)
        }

        const isExisted = await this.repos.get(command.id)
        if (!isExisted || isExisted.status == ModelStatus.DELETED)
            throw ErrDataNotFound

        await this.repos.update(command.id, data)
        return

    }

}