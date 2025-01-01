// export interface IRepository extends I

import { PagingDto } from "../models/paging";

export interface IRepository<Entity, Cond, UpdateDTO> extends ICommandRepository<Entity, Cond>, IQueryRepository<Entity, UpdateDTO> { }

export interface IQueryRepository<Entity, Cond> {
    get(id: string): Promise<Entity | null>;
    findByCond(cond: Cond): Promise<Entity | null>
    list(cond: Cond, paging: PagingDto): Promise<Array<Entity>>
}

export interface ICommandRepository<Entity, UpdateDTO> {
    insert(data: Entity): Promise<boolean>
    update(id: string, data: UpdateDTO): Promise<boolean>
    delete(id: string, isHard: boolean): Promise<boolean>
}

export interface ICommandHandler<Cmd, Result> {
    execute(command: Cmd): Promise<Result>
}

export interface IQueryHandler<Query, Result> {
    execute(query: Query): Promise<Result>
}