import { Task } from '../tasks/task.entity';
export declare class User {
    user_id: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    tasks: Task[];
}
