import { Sequelize, Op } from "sequelize";
import { PagingDto, PagingSchema } from "../../../../shared/models/paging";
import { IRepository } from "../../interface";
import { CategoryUpdateDto, CategoryCondDto } from "../../models/dto";
import { Category } from "../../models/model";
import { ModelStatus } from "../../../../shared/models/base-model";


// Implement ORM here (Sequelize)
export class MSSQLCategoryRepository implements IRepository {
    constructor(private readonly db: Sequelize, private readonly modelName: string) {

    }

    async insert(data: Category): Promise<boolean> {
        await this.db.models[this.modelName].create(data);
        return true
    }

    async udpate(id: string, data: CategoryUpdateDto): Promise<boolean> {
        await this.db.models[this.modelName].update(data, {
            where: {
                id
            }
        })
        return true;
    }

    async delete(id: string, isHard: boolean = false): Promise<boolean> {
        if (isHard) {
            await this.db.models[this.modelName].destroy({ where: { id } })
        }
        else {
            await this.db.models[this.modelName].update({ status: ModelStatus.DELETED }, { where: { id } })
        }
        return true;
    }

    async get(id: string): Promise<Category | null> {
        const data = await this.db.models[this.modelName].findByPk(id);
        if (!data) {
            return null;
        }

        const persistenceData = data.get({ plain: true })

        // return CategorySchema.parse(data.get({ plain: true }));
        return { ...persistenceData, children: [] }
    }
    async list(cond: CategoryCondDto, paging: PagingDto): Promise<Array<Category>> {
        const { page = 1, limit = 10 } = paging

        const conditions = {
            ...cond,
            status: {
                [Op.ne]: ModelStatus.DELETED
            }
        }

        const total = await this.db.models[this.modelName].findAll({ where: conditions, limit, offset: (page - 1) * limit })

        return total.map((row) => row.get({ plain: true }))
    }

}