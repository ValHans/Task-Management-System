import { Controller, Post, Body, UseGuards, Request, Get, Query, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateTaskDto) {
    const user_id = req.user.user_id;
    const created_by = req.user.email;
    return this.tasksService.create(user_id, created_by, dto);
  }

  @Get()
  findAll(@Request() req: any, @Query('status') status?: string, @Query('sort') sort?: 'asc' | 'desc') {
    const user_id = req.user.user_id;
    return this.tasksService.findAllForUser(user_id, status, sort);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    const user_id = req.user.user_id;
    return this.tasksService.findOneForUser(user_id, id);
  }

  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() dto: UpdateTaskDto) {
    const user_id = req.user.user_id;
    return this.tasksService.update(user_id, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    const user_id = req.user.user_id;
    return this.tasksService.remove(user_id, id);
  }
}
