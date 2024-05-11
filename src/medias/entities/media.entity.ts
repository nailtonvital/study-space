import { MediaUser } from "src/media-user/entities/media-user.entity";
import { Interest } from "../../interests/entities/interest.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(type => Interest)
    @JoinTable({
        name: 'interest_media',
        joinColumn: { name: 'idMedia', referencedColumnName: 'idMedia' },
        inverseJoinColumn: { name: 'idInterest', referencedColumnName: 'idInterest' }
    })
    interests: Interest[];

    @OneToMany(type => MediaUser, mediaUser => mediaUser.media)
    users: MediaUser[];
}
