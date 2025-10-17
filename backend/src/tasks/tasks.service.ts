import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly taskRepo: Repository<Task>) {}

  async create(user_id: string, created_by: string, dto: CreateTaskDto): Promise<Task> {
    const entity = this.taskRepo.create({
      ...dto,
      deadline: dto.deadline ? new Date(dto.deadline) : undefined,
      created_by,
      user: { user_id } as any,
    });
    return this.taskRepo.save(entity);
  }

  async findAllForUser(
    user_id: string,
    status?: string,
    sortByDeadline?: 'asc' | 'desc',
    startDate?: string,
    endDate?: string,
  ): Promise<Task[]> {
    const qb = this.taskRepo
      .createQueryBuilder('task')
      .where('task.user_id = :user_id', { user_id });

    if (status) {
      qb.andWhere('task.status = :status', { status });
    }

    if (startDate && endDate) {
      qb.andWhere('task.deadline BETWEEN :startDate AND :endDate', { startDate, endDate });
    }

    if (sortByDeadline) {
      qb.orderBy('task.deadline', sortByDeadline.toUpperCase() as 'ASC' | 'DESC');
    }

    return qb.getMany();
  }

  async findOneForUser(user_id: string, task_id: string): Promise<Task> {
    const task = await this.taskRepo.findOne({ where: { task_id, user: { user_id } } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(user_id: string, task_id: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOneForUser(user_id, task_id);
    
    // TypeORM merge adalah cara yang lebih aman untuk update
    this.taskRepo.merge(task, dto as DeepPartial<Task>);
    
    return this.taskRepo.save(task);
  }

  async remove(user_id: string, task_id: string): Promise<{ deleted: boolean }> {
    const task = await this.findOneForUser(user_id, task_id);
    await this.taskRepo.remove(task);
    return { deleted: true };
  }
}