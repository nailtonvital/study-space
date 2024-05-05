import { Interest } from "../../interests/entities/interest.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @ManyToOne(() => User)
    user: User;

    @ManyToMany(() => Interest)
    interest: Interest;
}
