import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Film } from './film.entity.js';

@Entity()
export class Abbildung {
    // https://typeorm.io/entities#primary-columns
    // CAVEAT: zuerst @Column() und erst dann @PrimaryGeneratedColumn()
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    readonly beschriftung!: string;

    @Column('varchar')
    readonly contentType: string | undefined;

    @ManyToOne(() => Film, (film) => film.abbildungen)
    @JoinColumn({ name: 'film_id' })
    film: Film | undefined;

    public toString = (): string =>
        JSON.stringify({
            id: this.id,
            beschriftung: this.beschriftung,
            contentType: this.contentType,
        });
}
