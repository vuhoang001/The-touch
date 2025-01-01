import { IRepository } from "../../../shared/interfaces";
import { PagingDto } from "../../../shared/models/paging";
import { Brand } from "../models/brand";
import { BrandCondDTO, BrandCreateDTO, BrandUpdateDTO } from "../models/dto";

export interface IBrandUserCase {
    create(data: BrandCreateDTO): Promise<string>
    getDetail(id: string): Promise<Brand | null>
    list(cond: BrandCondDTO, paging: PagingDto): Promise<Array<Brand>>
    update(id: string, data: BrandUpdateDTO): Promise<boolean>
    delete(id: string): Promise<boolean>
}

export interface CreateCommand {
    cmd: BrandCreateDTO
}

export interface GetDetailQuery {
    id: string;
}

export interface UpdateCommand {
    id: string,
    cmd: BrandUpdateDTO
}





export interface IBrandRepository extends IRepository<Brand, BrandCondDTO, BrandUpdateDTO> { }


// export interface ICommandRepository {
//     insert(data: Brand): Promise<boolean>;
//     udpate(id: string, data: BrandCreateDTO): Promise<boolean>;
//     delete(id: string, isHard: boolean): Promise<boolean>;
// }

// export interface IQueryRepository {
//     get(id: string): Promise<Brand | null>;
//     list(cond: BrandCondDTO, paging: PagingDto): Promise<Array<Brand>>;
// }

// export interface IRepository extends ICommandRepository, IQueryRepository { }

