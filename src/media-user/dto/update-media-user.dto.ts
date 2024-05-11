import { PartialType } from '@nestjs/swagger';
import { CreateMediaUserDto } from './create-media-user.dto';

export class UpdateMediaUserDto extends PartialType(CreateMediaUserDto) {}
