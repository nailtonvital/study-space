import { User } from 'src/users/entities/user.entity';
import { Media } from '../../medias/entities/media.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class Interest {
    @PrimaryGeneratedColumn()
    idInterest: number;

    @Column()
    text: string;

    @ManyToMany(type=> Media, media => media.interests)
    @JoinTable({
        name: 'interest_media',
        joinColumn: { name: 'idInterest', referencedColumnName: 'idInterest' },
        inverseJoinColumn: { name: 'idMedia', referencedColumnName: 'idMedia' }
    })
    medias: Media[];

    @ManyToMany(type=> User, user => user.interests)
    @JoinTable({
        name: 'user_interest',
        joinColumn: { name: 'idInterest', referencedColumnName: 'idInterest' },
        inverseJoinColumn: { name: 'idUser', referencedColumnName: 'idUser' }
    })
    users: User[];

    @ManyToMany(type=> Post, post => post.interests)
    @JoinTable({
        name: 'post_interest',
        joinColumn: { name: 'idInterest', referencedColumnName: 'idInterest' },
        inverseJoinColumn: { name: 'idPost', referencedColumnName: 'idPost' }
    })
    posts: Post[];
}
