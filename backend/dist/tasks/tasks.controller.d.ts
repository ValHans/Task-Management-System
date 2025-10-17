import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/user.entity';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    create(req: any, dto: CreateTaskDto): Promise<import("./task.entity").Task>;
    findAll(req: any, status?: string, sort?: 'asc' | 'desc', start?: string, end?: string): Promise<import("./task.entity").Task[]>;
    findOne(req: any, id: string): Promise<import("./task.entity").Task>;
    update(user: User, id: string, dto: UpdateTaskDto): Promise<import("./task.entity").Task>;
    remove(user: User, id: string): Promise<{
        deleted: boolean;
    }>;
}
