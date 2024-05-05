import { Interest } from "../../interests/entities/interest.entity";
import { Post } from "../../posts/entities/post.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column()
    idRole: number;

    @Column()
    gender: string;

    @ManyToMany(() => Interest)
    interests: Interest[];

    @OneToMany(() => Post, post => post.user)
    posts: Post[];
}
