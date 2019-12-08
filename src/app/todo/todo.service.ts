import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: TodoModel[] = [];
  private todosUpdated = new Subject<TodoModel[]>();

  constructor() { }

  getTodosUpdateListener() {
    return this.todosUpdated.asObservable();
  }

  getTodos() {
    this.todosUpdated.next(this.todos.slice());
  }

  addTodo(todo: TodoModel) {
      todo.id = this.todos.length - 1;
      this.todos.push(todo);

      this.getTodos();
  }

  updateTodo(todo: TodoModel) {
      const index = this.getCurrentTodoIndex(todo.id);

      if (index < 0) {
        return this.todos;
      }

      this.todos[index] = {id: todo.id, text: todo.text, date: todo.date, finished: todo.finished};

      this.getTodos();
  }

  deleteTodo(id: number) {
      const index = this.getCurrentTodoIndex(id);

      if (index < 0) {
        return this.todos;
      }

      this.todos.splice(index, 1);

      this.getTodos();
  }

  getCurrentTodoIndex(id): number {
     return this.todos.map(todo => todo.id).indexOf(id);
  }
}
