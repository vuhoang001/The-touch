import { BrandCondDTO } from './../models/dto';
import { IQueryHandler, IQueryRepository } from "../../../shared/interfaces";
import { GetDetailQuery } from "../interfaces";
import { Brand } from "../models/brand";
import { ErrDataNotFound } from '../../../shared/models/base-error';

export class GetBrandDetailQuery implements IQueryHandler<GetDetailQuery, Brand> {
    constructor(private readonly repository: IQueryRepository<Brand, BrandCondDTO>) {

    }
    async execute(query: GetDetailQuery): Promise<Brand> {
        const result = await this.repository.get(query.id)
        if (!result) throw ErrDataNotFound
        return result
    }

}