import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    task_id: string;
    
    @Column()
    user_id: string;
    
    @Column()
    title: string;
    
    @Column({ type: 'text', nullable: true })
    description: string;
    
    @Column({ type: 'varchar', default: 'To Do' })
    status: TaskStatus;
    
    @Column({ type: 'timestamptz', nullable: true })
    deadline: Date | null;
    
    @Column()
    created_by: string;
    
    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;
    
    @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
    
}
