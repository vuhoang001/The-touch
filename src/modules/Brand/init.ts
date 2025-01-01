import { Sequelize, Dialect } from "sequelize";
import { MSSQLBrandRepository } from "./infras/repository/sequelize";
import { BrandUseCase } from "./usecase";
import { BrandHttpService } from "./infras/transport";
import { Router } from "express";
import { init } from "./infras/repository/sequelize/dto";
import { CreateNewBrandCmdHandler } from "./usecase/create-new-brand";
import { GetBrandDetailQuery } from "./usecase/get-detail";

export const setupBrandHexagon = async (sequelize: Sequelize) => {
    init(sequelize)
    const repos = new MSSQLBrandRepository(sequelize)
    const useCase = new BrandUseCase(repos);

    const createCmdHandler = new CreateNewBrandCmdHandler(repos)

    const getDetailQueryHandler = new GetBrandDetailQuery(repos)

    const httpService = new BrandHttpService(useCase, createCmdHandler, getDetailQueryHandler)

    const route = Router()

    route.get('/', httpService.listAPI.bind(httpService));
    route.get('/:id', httpService.getAPI.bind(httpService))
    route.patch('/:id', httpService.updateAPI.bind(httpService))
    route.post('', httpService.createAPI.bind(httpService))
    route.delete('/:id', httpService.updateAPI.bind(httpService))

    return route
}