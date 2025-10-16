import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  createTask: any;
  constructor(@InjectRepository(Task) private readonly taskRepo: Repository<Task>) {}

  async create(user_id: string, created_by: string, dto: CreateTaskDto) {
    const entity = this.taskRepo.create({
      title: dto.title,
      description: dto.description,
      status: dto.status || 'To Do',
      deadline: dto.deadline ? new Date(dto.deadline) : undefined,
      created_by,
      user: { user_id } as any,
    });
    return this.taskRepo.save(entity);
  }

  async findAllForUser(user_id: string, status?: string, sortByDeadline?: 'asc' | 'desc') {
    const qb = this.taskRepo.createQueryBuilder('task').where('task.user_id = :user_id', { user_id });
    if (status) qb.andWhere('task.status = :status', { status });
    if (sortByDeadline) qb.orderBy('task.deadline', sortByDeadline.toUpperCase() as any);
    return qb.getMany();
  }

  async findOneForUser(user_id: string, task_id: string) {
    const task = await this.taskRepo.findOne({ where: { task_id, user_id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(user_id: string, task_id: string, dto: UpdateTaskDto) {
    const task = await this.findOneForUser(user_id, task_id);
    Object.assign(task, {
      title: dto.title ?? task.title,
      description: dto.description ?? task.description,
      status: dto.status ?? task.status,
      deadline: dto.deadline ? new Date(dto.deadline) : task.deadline,
    });
    return this.taskRepo.save(task);
  }

  async remove(user_id: string, task_id: string) {
    const task = await this.findOneForUser(user_id, task_id);
    await this.taskRepo.remove(task);
    return { deleted: true };
  }
}
