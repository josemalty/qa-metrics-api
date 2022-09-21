import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("qaas")
export class QaasEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;
}
