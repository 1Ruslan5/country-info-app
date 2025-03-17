import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { User } from "../../entities/user.entity";

export class AuthResponseDto {
  @ApiProperty({ description: 'Token', example: 'token_example' })
  @IsString()
  token: string;

  @ApiProperty()
  @Type(() => User)
  user: User;
}
