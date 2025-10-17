import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private readonly taskRepo;
    constructor(taskRepo: Repository<Task>);
    create(user_id: string, created_by: string, dto: CreateTaskDto): Promise<Task>;
    findAllForUser(user_id: string, status?: string, sortByDeadline?: 'asc' | 'desc', startDate?: string, endDate?: string): Promise<Task[]>;
    findOneForUser(user_id: string, task_id: string): Promise<Task>;
    update(user_id: string, task_id: string, dto: UpdateTaskDto): Promise<Task>;
    remove(user_id: string, task_id: string): Promise<{
        deleted: boolean;
    }>;
}
