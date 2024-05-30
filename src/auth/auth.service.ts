import { Injectable, UnauthorizedException, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Email ou Senha Inválidos');
    }
    if (user.password === password) {
      const token = await this.generateToken(user);
      return { token, user };
    }
    throw new UnauthorizedException('Email ou Senha Inválidos');
  }

  async generateToken(payload: User) {
    return {
      access_token: this.jwtService.sign(
        { email: payload.email },
        {
          secret: 'topSecret512',
          expiresIn: '2d',
        },
      ),
    };
  }
}
