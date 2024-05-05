import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreatePostCommentDto {
    @ApiProperty()
    @IsString()
    readonly text: string;

    @ApiProperty({ type: Date })
    readonly createdAt: Date;

    @ApiProperty({ type: Date })
    readonly updatedAt: Date;

    @ApiProperty()
    @IsNumber()
    readonly postId: number;

    @ApiProperty()
    @IsNumber()
    readonly userId: number;
}
