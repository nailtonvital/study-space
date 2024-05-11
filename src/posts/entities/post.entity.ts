import { PostComment } from "../../post-comments/entities/post-comment.entity";
import { Interest } from "../../interests/entities/interest.entity";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    idPost: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    imageUrl: string;

    @Column()
    commentsCount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => User, user => user.posts)
    @JoinTable({
        name: 'post',
        joinColumn: { name: 'idUser', referencedColumnName: 'idUser' },
        inverseJoinColumn: { name: 'idPost', referencedColumnName: 'idPost' }
    })
    user: User;

    @ManyToMany(type => Interest, interest => interest.posts)
    @JoinTable({
        name: 'post_interest',
        joinColumn: { name: 'idPost', referencedColumnName: 'idPost' },
        inverseJoinColumn: { name: 'idInterest', referencedColumnName: 'idInterest' }
    })
    interests: Interest[];

    @OneToMany(type => PostComment, postComment => postComment.post)
    @JoinTable({
        name: 'post_comment',
        joinColumn: { name: 'idPost', referencedColumnName: 'idPost' },
        inverseJoinColumn: { name: 'idPostComment', referencedColumnName: 'idPostComment' }
    })
    comments: PostComment[];

    @ManyToMany(type => User, user => user.likes)
    @JoinTable({
        name: 'post_like',
        joinColumn: { name: 'idPost', referencedColumnName: 'idPost' },
        inverseJoinColumn: { name: 'idUser', referencedColumnName: 'idUser' }
    })
    likes: User[];
}
