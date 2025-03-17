import { Controller, Post, Body, HttpCode, HttpStatus, Get, Req, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { AuthResponseDto, SignUpRequestDto } from './dto';
import { SignInRequestDto } from './dto/request/sign-in.request.dto';
import { Public } from 'src/common/decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'User registration' })
  @ApiCreatedResponse({
    description: 'Registered User',
    type: AuthResponseDto,
  })
  async signUp(@Body() signUpDto: SignUpRequestDto): Promise<AuthResponseDto> {
    return plainToInstance(AuthResponseDto, await this.authService.signUp(signUpDto));
  }

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'Signed in',
    type: AuthResponseDto,
  })
  async signIn(@Body() signInDto: SignInRequestDto): Promise<AuthResponseDto> {
    return plainToInstance(AuthResponseDto, await this.authService.signIn(signInDto));
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiSecurity('bearer')
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Current user object',
    type: User,
  })
  async me(@Req() request: Request): Promise<User> {
    const user = request['user'];
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToInstance(User, user);
  }
}
