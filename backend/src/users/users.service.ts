import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  findById(user_id: string) {
    return this.userRepo.findOne({ where: { user_id } });
  }

  create(user: Partial<User>) {
    const entity = this.userRepo.create(user);
    return this.userRepo.save(entity);
  }
}
