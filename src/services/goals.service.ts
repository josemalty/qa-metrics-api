import { response } from "express";
import { getConnection } from "typeorm";
import { GoalsEntity } from "../database/entities/goals.entity";
import { GoalsRepository } from "../repository/goals.repository";

export class GoalsService {
    private goalsRepository: GoalsRepository;

    constructor() {
        this.goalsRepository = getConnection("postgres").getCustomRepository(GoalsRepository);
    }

    public index = async () => {
        const goals = await this.goalsRepository.find();
        return goals;
    };

    public create = async (goals: GoalsEntity) => {
        const newGoals = await this.goalsRepository.save(goals);
        return newGoals;
    };

    public update = async (goals: GoalsEntity, id: number) => {
        goals.id = id;
        const updatedGoals = await this.goalsRepository.save(goals);
        return updatedGoals;
    };

    public delete = async (id: number) => {
        const deletedGoals = await this.goalsRepository.delete(id);
        return deletedGoals;
    };

    public findById = async (id: number) => {
        const foundGoals = await this.goalsRepository.findOne(id);
        return foundGoals;
    };
}
