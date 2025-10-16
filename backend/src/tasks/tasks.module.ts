import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), 
    UsersModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, JwtService],
})
export class TasksModule {}
