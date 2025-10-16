import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    findById(user_id: string): Promise<User | null>;
    create(user: Partial<User>): Promise<User>;
}
