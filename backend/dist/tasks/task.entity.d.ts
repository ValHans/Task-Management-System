import { User } from '../users/user.entity';
export type TaskStatus = 'To Do' | 'In Progress' | 'Done';
export declare class Task {
    task_id: string;
    user_id: string;
    title: string;
    description: string;
    status: TaskStatus;
    deadline: Date | null;
    created_by: string;
    created_at: Date;
    user: User;
}
