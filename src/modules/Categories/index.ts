import { Router } from "express"
import { init, modelName } from "./infras/repository/dto";
import { Sequelize } from "sequelize";
import { CategoryHttpService } from "./infras/transport/http-service";
import { CategoryUseCase } from "./usecase";
import { MSSQLCategoryRepository } from "./infras/repository/repos";

export const setupCategoryHexagon = async (sequelize: Sequelize) => {
    init(sequelize)
    const repos = new MSSQLCategoryRepository(sequelize, modelName);
    const useCase = new CategoryUseCase(repos);
    const httpService = new CategoryHttpService(useCase)

    const route = Router()


    route.get('/categories', httpService.listCategoryAPI.bind(httpService));
    route.get('/categories/:id', httpService.getCategoryAPI.bind(httpService))
    route.patch('/categories/:id', httpService.updateCategoryAPI.bind(httpService))
    route.post('/categories', httpService.createANewCategoryAPI.bind(httpService))
    route.delete('/categories/:id', httpService.deleteCagoryAPI.bind(httpService))

    return route
}