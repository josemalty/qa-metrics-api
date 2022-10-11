import { EntityRepository, Repository } from "typeorm";
import { QaasEntity } from "../database/entities/qaas.entity";

@EntityRepository(QaasEntity)
export class QaasRepository extends Repository<QaasEntity> {}
