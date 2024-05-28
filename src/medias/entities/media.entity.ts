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

    @ManyToMany(type => Interest, interest => interest.medias)
    @JoinTable({
        name: 'interest_media',
        joinColumn: { name: 'idMedia', referencedColumnName: 'idMedia' },
        inverseJoinColumn: { name: 'idInterest', referencedColumnName: 'idInterest' }
    })
    interests: Interest[];

    @OneToMany(type => MediaUser, mediaUser => mediaUser.media)
    @JoinTable({
        name: 'media_user',
        joinColumn: { name: 'idMedia', referencedColumnName: 'idMedia' },
        inverseJoinColumn: { name: 'idUser', referencedColumnName: 'idUser' }
    })
    users: MediaUser[];
}
