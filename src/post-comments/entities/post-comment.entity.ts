import { Post } from "../../posts/entities/post.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostComment {
    @PrimaryGeneratedColumn()
    idPostComment: number;

    @Column()
    text: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @ManyToOne(() => Post)
    post: Post;

    @ManyToOne(() => User)
    user: User;
}
