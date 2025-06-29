import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { StaffDTO } from '../../../models';

@Entity()
export class Staff implements StaffDTO{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    isActive: boolean;

}