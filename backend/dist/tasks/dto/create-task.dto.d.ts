export declare class CreateTaskDto {
    title: string;
    description?: string;
    status?: 'To Do' | 'In Progress' | 'Done';
    deadline?: string;
}
