import { Sequelize } from "sequelize";
import { IRepository } from "../interfaces";
import { PagingDto } from "../models/paging";
import { Op } from "sequelize";
import { ModelStatus } from "../models/base-model";

export class BaseRepositorySequelize<Entity, Cond, UpdateDTO> implements IRepository<Entity, Cond, UpdateDTO> {
    constructor(private readonly sequelize: Sequelize, private readonly modelName: string) { }
    async findByCond(cond: UpdateDTO): Promise<Entity | null> {
        const data = await (this.sequelize.models as any)[this.modelName].findOne({ where: cond })

        if (!data) return null
        const persistenceData = data.get({ plain: true })
        return {
            ...persistenceData,
            createdAt: persistenceData.created_at,
            updatedAt: persistenceData.updated_at
        } as Entity
    }


    async get(id: string): Promise<Entity | null> {
        const data = await (this.sequelize.models as any)[this.modelName].findByPk(id)

        if (!data) {
            return null
        }

        const persistenceData = data.get({ plain: true })

        return {
            ...persistenceData,
            createdAt: persistenceData.created_at,
            updatedAt: persistenceData.updated_at
        } as Entity
    }
    async list(cond: UpdateDTO, paging: PagingDto): Promise<Array<Entity>> {
        const { page, limit } = paging

        const condSQL = { ...cond, status: { [Op.ne]: ModelStatus.DELETED } }

        const total = await (this.sequelize.models as any)[this.modelName].count({ where: condSQL })

        paging.total = total

        const rows = await (this.sequelize.models as any)[this.modelName].findAll({ where: condSQL, limit: limit ?? 10, offset: ((page ?? 1) - 1) * (limit ?? 10) })

        return rows.map((row: any) => row.get({ plain: true }))
    }

    async insert(data: Entity): Promise<boolean> {
        await (this.sequelize.models as any)[this.modelName].create(data)
        return true
    }
    async update(id: string, data: Cond): Promise<boolean> {
        await (this.sequelize.models as any)[this.modelName].update(data, {
            where: {
                id
            }
        })
        return true;
    }
    async delete(id: string, isHard: boolean): Promise<boolean> {
        if (isHard) {
            await (this.sequelize.models as any)[this.modelName].destroy({ where: { id } })
        }
        else {
            await (this.sequelize.models as any)[this.modelName].update({ status: ModelStatus.DELETED }, { where: { id } })
        }
        return true;
    }

}