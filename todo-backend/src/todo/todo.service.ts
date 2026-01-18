import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  create(userId: number, title: string) {
    const todo = this.todoRepo.create({ title, userId });
    return this.todoRepo.save(todo);
  }

  findAll(userId: number) {
    return this.todoRepo.find({ where: { userId } });
  }

  update(id: number, data: Partial<Todo>) {
    return this.todoRepo.update(id, data);
  }

  delete(id: number) {
    return this.todoRepo.delete(id);
  }
}
