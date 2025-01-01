import { Sequelize} from "sequelize";
import { BaseRepositorySequelize } from "../../../../../shared/repository/base-repos";
import { Brand } from "../../../models/brand";
import { BrandCondDTO, BrandUpdateDTO } from "../../../models/dto";
import { modelName } from "./dto";

export class MSSQLBrandRepository extends BaseRepositorySequelize<Brand, BrandCondDTO, BrandUpdateDTO> {
    constructor(sequelize: Sequelize) {
        super(sequelize, modelName)
    }

}