import { PostComment } from "../../post-comments/entities/post-comment.entity";
import { Interest } from "../../interests/entities/interest.entity";
import { Post } from "../../posts/entities/post.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MediaUser } from "src/media-user/entities/media-user.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    idUser: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    imageUrl: string;

    @Column()
    bio: string;

    @Column()
    birthdate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    idRole: number;

    @Column()
    gender: string;

    @ManyToMany(type => Interest, interest => interest.users)
    @JoinTable({
        name: 'user_interest',
        joinColumn: { name: 'idUser', referencedColumnName: 'idUser' },
        inverseJoinColumn: { name: 'idInterest', referencedColumnName: 'idInterest' }
    })
    interests: Interest[];

    @OneToMany(type => Post, post => post.user)
    @JoinTable({
        name: 'post',
        joinColumn: { name: 'idUser', referencedColumnName: 'idUser' },
        inverseJoinColumn: { name: 'idPost', referencedColumnName: 'idPost' }
    })
    posts: Post[];

    @OneToMany(type => PostComment, postComment => postComment.user)
    @JoinTable({
        name: 'post_comment',
        joinColumn: { name: 'idUser', referencedColumnName: 'idUser' },
        inverseJoinColumn: { name: 'idPostComment', referencedColumnName: 'idPostComment' }
    })
    comments: PostComment[];

    @ManyToMany(type => Post, post => post.likes)
    @JoinTable({
        name: 'post_like',
        joinColumn: { name: 'idUser', referencedColumnName: 'idUser' },
        inverseJoinColumn: { name: 'idPost', referencedColumnName: 'idPost' }
    })
    likes: Post[];

    @OneToMany(type => MediaUser, mediaUser => mediaUser.user)
    media: MediaUser[];
}
