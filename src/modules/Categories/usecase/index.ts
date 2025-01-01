import { PagingDto, PagingSchema } from '../../../shared/models/paging';
import { v7 } from 'uuid';
import { ModelStatus } from '../../../shared/models/base-model';
import { CategoryCondDto, CategoryCreateDto, CategoryUpdateDto } from '../models/dto';
import { Category } from '../models/model';
import { ICategoryUseCase, IRepository } from '../interface/index';
import { ErrDataNotFound } from '../../../shared/models/base-error';

export class CategoryUseCase implements ICategoryUseCase {
    constructor(private readonly repos: IRepository) {
    }

    async createANewCategory(data: CategoryCreateDto): Promise<string> {
        const newId = v7()
        const category: Category = {
            id: newId,
            name: data.name,
            position: 0,
            image: data.image,
            description: data.description,
            parentId: data.parentId,
            status: ModelStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await this.repos.insert(category)


        return newId;
    }
    async getDetailCategory(id: string): Promise<Category | null> {
        const result = await this.repos.get(id);
        if (!result || result.status == ModelStatus.DELETED) {
            throw ErrDataNotFound;
        }

        return result;
    }
    async listDetailCategory(cond: CategoryCondDto, paging: PagingDto): Promise<Array<Category>> {
        const data = await this.repos.list(cond, paging)
        return data
    }
    async updateCategory(id: string, data: CategoryUpdateDto): Promise<boolean> {
        const holder = await this.repos.get(id)

        if (!holder || holder.status == ModelStatus.DELETED) {
            throw ErrDataNotFound
        }

        return await this.repos.udpate(id, data);

    }
    async deleteCategory(id: string, isHard: boolean): Promise<boolean> {
        const holder = await this.repos.get(id)

        if (!holder || holder.status == ModelStatus.DELETED) {
            throw ErrDataNotFound
        }

        return await this.repos.delete(id, isHard);
    }
}