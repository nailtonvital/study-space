import { PostComment } from "../../post-comments/entities/post-comment.entity";
import { Interest } from "../../interests/entities/interest.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    likesCount: number;

    @Column()
    commentsCount: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(type => User, user => user.posts)
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
}
