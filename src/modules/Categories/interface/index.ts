import { CategoryCondDto, CategoryCreateDto, CategoryUpdateDto } from './../models/dto';
import { PagingDto } from "../../../shared/models/paging";
import { Category } from "../models/model";

export interface ICategoryUseCase {
    createANewCategory(data: CategoryCreateDto): Promise<string>
    getDetailCategory(id: string): Promise<Category | null>
    listDetailCategory(cond: CategoryCondDto, paging: PagingDto): Promise<Array<Category>>
    updateCategory(id: string, data: CategoryUpdateDto): Promise<boolean>
    deleteCategory(id: string, isHard: boolean): Promise<boolean>
}

export interface ICommandRepository {
    insert(data: Category): Promise<boolean>;
    udpate(id: string, data: CategoryUpdateDto): Promise<boolean>;
    delete(id: string, isHard: boolean): Promise<boolean>;
}

export interface IQueryRepository {
    get(id: string): Promise<Category | null>;
    list(cond: CategoryCondDto, paging: PagingDto): Promise<Array<Category>>;
}

export interface IRepository extends ICommandRepository, IQueryRepository { }
