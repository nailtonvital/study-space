import { User } from 'src/users/entities/user.entity';
import { Media } from '../../medias/entities/media.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class Interest {
    @PrimaryGeneratedColumn()
    idInterest: number;

    @Column()
    text: string;

    @ManyToMany(()=> Media)
    medias: Media[];

    @ManyToMany(()=> User)
    users: User[];

    @ManyToMany(()=> Post)
    posts: Post[];
}
