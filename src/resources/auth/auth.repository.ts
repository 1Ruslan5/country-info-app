import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SignUpRequestDto } from './dto';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create(signUpDto: SignUpRequestDto): Promise<User> {
    return await this.userRepository.save(signUpDto);
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } })
  }
}
