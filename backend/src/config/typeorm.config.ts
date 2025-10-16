import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../users/user.entity';
import { Task } from '../tasks/task.entity';

config(); // Memuat variabel dari file .env

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Task],
  // migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
