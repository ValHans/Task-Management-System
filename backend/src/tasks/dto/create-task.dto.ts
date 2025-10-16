import { IsString, IsOptional, IsIn, IsISO8601 } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['To Do', 'In Progress', 'Done'])
  status?: 'To Do' | 'In Progress' | 'Done';

  @IsOptional()
  @IsISO8601()
  deadline?: string;
}
