"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./task.entity");
let TasksService = class TasksService {
    taskRepo;
    constructor(taskRepo) {
        this.taskRepo = taskRepo;
    }
    async create(user_id, created_by, dto) {
        const entity = this.taskRepo.create({
            ...dto,
            deadline: dto.deadline ? new Date(dto.deadline) : undefined,
            created_by,
            user: { user_id },
        });
        return this.taskRepo.save(entity);
    }
    async findAllForUser(user_id, status, sortByDeadline, startDate, endDate) {
        const qb = this.taskRepo
            .createQueryBuilder('task')
            .where('task.user_id = :user_id', { user_id });
        if (status) {
            qb.andWhere('task.status = :status', { status });
        }
        if (startDate && endDate) {
            qb.andWhere('task.deadline BETWEEN :startDate AND :endDate', { startDate, endDate });
        }
        if (sortByDeadline) {
            qb.orderBy('task.deadline', sortByDeadline.toUpperCase());
        }
        return qb.getMany();
    }
    async findOneForUser(user_id, task_id) {
        const task = await this.taskRepo.findOne({ where: { task_id, user: { user_id } } });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        return task;
    }
    async update(user_id, task_id, dto) {
        const task = await this.findOneForUser(user_id, task_id);
        this.taskRepo.merge(task, dto);
        return this.taskRepo.save(task);
    }
    async remove(user_id, task_id) {
        const task = await this.findOneForUser(user_id, task_id);
        await this.taskRepo.remove(task);
        return { deleted: true };
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map