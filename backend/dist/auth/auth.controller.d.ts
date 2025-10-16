import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
        user: {
            user_id: string;
            name: string;
            email: string;
            created_at: Date;
        };
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        expires_in: string;
    }>;
    getProfile(req: any): any;
}
