import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TodoService} from '../todo.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  todos: TodoModel[] = [];
  todosSub: Subscription;
  form: FormGroup;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.form = new FormGroup({});
    this.todosSub = this.todoService.getTodosUpdateListener()
      .subscribe(todos => {
        this.todos = todos;
      });
  }

  ngOnDestroy(): void {
    this.todosSub.unsubscribe();
  }

  onCheckFinished(todo: TodoModel) {
    todo.finished = true;

    this.todoService.updateTodo(todo);
  }
}
