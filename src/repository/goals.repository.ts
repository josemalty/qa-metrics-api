import { EntityRepository, Repository } from "typeorm";
import { GoalsEntity } from "../database/entities/goals.entity";

@EntityRepository(GoalsEntity)
export class GoalsRepository extends Repository<GoalsEntity> {}
