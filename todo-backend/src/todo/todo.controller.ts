import { Controller, Get, Post, Body } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.findAll(1);
  }

  @Post()
  createTodo(@Body('title') title: string) {
    return this.todoService.create(1, title);
  }
}
