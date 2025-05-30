import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { AdminDTO } from '../../../models';

@Entity("admin")
export class Admin implements AdminDTO{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string; //this will be a hashed

    @Column()
    code: string;

    @Column({ default: true })
    isActive: boolean;

}