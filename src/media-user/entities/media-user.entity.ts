import { Media } from "src/medias/entities/media.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class MediaUser {
    @PrimaryGeneratedColumn()
    idMediaUser: number;

    @Column()
    description: string;

    @Column()
    type: string;

    @CreateDateColumn()
    date: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @ManyToOne(() => User, user => user.media)
    user: User;

    @ManyToOne(() => Media, media => media.users)
    media: Media;
 }
