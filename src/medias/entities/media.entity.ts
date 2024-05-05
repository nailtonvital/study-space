import { Interest } from "../../interests/entities/interest.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    idMedia: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    imageUrl: string;

    @ManyToMany(() => Interest)
    interests: Interest[];
}
