import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { omit, toLower } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto, SignUpRequestDto } from './dto';
import { SignInRequestDto } from './dto/request/sign-in.request.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async signUp({ firstName, lastName, email, password }: SignUpRequestDto): Promise<AuthResponseDto> {
    const existingUser = await this.authRepository.findByEmail(toLower(email));
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const createdUser = await this.authRepository.create({
      ...omit(SignUpRequestDto, 'passwordConfirm'),
      email: toLower(email),
      password: await argon2.hash(password),
      firstName,
      lastName,
    });

    return { 
      user : {
        ...createdUser
      }, 
      token: await this.jwtService.signAsync({
        sub: createdUser.id,
        email: toLower(createdUser.email),
      }), 
    };
  }

  async signIn({ email, password }: SignInRequestDto): Promise<AuthResponseDto> {
    const user = await this.authRepository.findByEmail(toLower(email));
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    if (!(await argon2.verify(user.password, password))) {
      throw new UnauthorizedException('Password invalid');
    }

    return { 
      user: {
        ...user
      },
      token: await this.jwtService.signAsync({
        sub: user.id,
        email: toLower(user.email),
      }),
    };
  }
}
