import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { GameDTO } from '../../../models';
import { JatekKategoria } from '../enums/game-category.enum';
import { Platform } from '../enums/platform.enum';

@Entity()
export class Game implements GameDTO{

    @PrimaryGeneratedColumn()
    sorszam: number;

    @Column()
    cim: string;
    
    @Column({ type: 'date', nullable: false })
    beszerzes_datuma: Date;

    @Column({
        type: 'enum',
        enum: JatekKategoria
      })
      kategoria: JatekKategoria;

    @Column({
        type: 'enum',
        enum: ['szabad', 'kikölcsönzött', 'selejtezett'],
        default: 'szabad'
    })
    statusz: 'szabad' | 'kikölcsönzött' | 'selejtezett';

    @Column({
        type: 'enum',
        enum: Platform
      })
      platform: Platform;

}