import { v7 } from "uuid";
import { IRepository } from "../../../shared/interfaces";
import { PagingDto } from "../../../shared/models/paging";
import { IBrandUserCase } from "../interfaces";
import { Brand } from "../models/brand";
import { BrandCondDTO, BrandCreateDTO, BrandCreateDTOSchema, BrandUpdateDTO } from "../models/dto";
import { ModelStatus } from "../../../shared/models/base-model";
import { ErrBrandNameDuplicate } from "../models/error";


export class BrandUseCase implements IBrandUserCase {

    constructor(private readonly repos: IRepository<Brand, BrandCondDTO, BrandUpdateDTO>) { }

    async create(data: BrandCreateDTO): Promise<string> {
        throw new Error("Method not implemented.");

    }
    getDetail(id: string): Promise<Brand | null> {
        throw new Error("Method not implemented.");
    }
    list(cond: BrandCondDTO, paging: PagingDto): Promise<Array<Brand>> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: BrandUpdateDTO): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


}