import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypedConfigModule } from 'nest-typed-config';
import { AppConfig } from 'src/common/config/schemas';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guards';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [TypedConfigModule],
      useFactory: async (appConfig: AppConfig) => {
        return {
          secret: appConfig.jwtSecret,
        };
      },
      inject: [AppConfig],
    }),

  ],
  providers: [
    AuthService,
    AuthRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, AuthRepository],
})
export class AuthModule { }