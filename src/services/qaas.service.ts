import { response } from "express";
import { getConnection } from "typeorm";
import { QaasEntity } from "../database/entities/qaas.entity";
import { QaasRepository } from "./../repository/qaas.repository";

export class QaasService {
    private qaasRepository: QaasRepository;

    constructor() {
        this.qaasRepository = getConnection("postgres").getCustomRepository(QaasRepository);
    }

    public index = async () => {
        const qaass = await this.qaasRepository.find();
        return qaass;
    };

    public create = async (qaas: QaasEntity) => {
        const newQaas = await this.qaasRepository.save(qaas);
        return newQaas;
    };

    public update = async (qaas: QaasEntity, id: number) => {
        qaas.id = id;
        const updatedQaas = await this.qaasRepository.save(qaas);
        return updatedQaas;
    };

    public delete = async (id: number) => {
        const deletedQaas = await this.qaasRepository.delete(id);
        return deletedQaas;
    };

    public findById = async (id: number) => {
        const foundQaas = await this.qaasRepository.findOne(id);
        return foundQaas;
    };
}
