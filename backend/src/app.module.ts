import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { dataSourceOptions } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions,
    }),
    AuthModule,
    UsersModule,
    TasksModule,
  ],
})
export class AppModule {}
