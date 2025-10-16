// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(private usersService: UsersService, private jwtService: JwtService) {}

//   async register(name: string, email: string, password: string) {
//     const existing = await this.usersService.findByEmail(email);
//     if (existing) {
//       throw new UnauthorizedException('Email already exists');
//     }
//     const hashed = await bcrypt.hash(password, 10);
//     const user = await this.usersService.create({ name, email, password: hashed });
//     return {
//       user_id: user.user_id,
//       name: user.name,
//       email: user.email,
//       created_at: user.created_at,
//     };
//   }

//   async validateUser(email: string, password: string) {
//     const user = await this.usersService.findByEmail(email);
//     if (!user) return null;
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return null;
//     return user;
//   }

//   async login(email: string, password: string) {
//     const user = await this.validateUser(email, password);
//     if (!user) {
//       throw new UnauthorizedException('Invalid credentials');
//     }
//     const payload = { sub: user.user_id, email: user.email };
//     const token = this.jwtService.sign(payload);
//     return { access_token: token, expires_in: process.env.JWT_EXPIRES_IN || '3d' };
//   }
// }


import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  // Register dan langsung mengembalikan access token + user summary
  async register(name: string, email: string, password: string) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new UnauthorizedException('Email sudah digunakan');
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({ name, email, password: hashed });

    const payload = { sub: user.user_id, email: user.email };
    try {
      const token = this.jwtService.sign(payload);
      return {
        access_token: token,
        user: {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
        },
      };
    } catch (err) {
      // Jika terjadi kesalahan saat sign token
      throw new InternalServerErrorException('Gagal membuat token');
    }
  }

  // Login menggunakan email + password
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email tidak ditemukan');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Password salah');
    }

    const payload = { sub: user.user_id, email: user.email };
    try {
      const token = this.jwtService.sign(payload);
      return {
        access_token: token,
        expires_in: process.env.JWT_EXPIRES_IN || '3d',
      };
    } catch (err) {
      throw new InternalServerErrorException('Gagal membuat token');
    }
  }
}