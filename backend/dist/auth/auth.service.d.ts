import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(name: string, email: string, password: string): Promise<{
        access_token: string;
        user: {
            user_id: string;
            name: string;
            email: string;
            created_at: Date;
        };
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        expires_in: string;
    }>;
}
