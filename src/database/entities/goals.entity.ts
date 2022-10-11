import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("goals")
export class GoalsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    isReached: boolean;
}
