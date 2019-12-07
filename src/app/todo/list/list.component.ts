import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  todos: TodoModel[] = [];
  todosSub: Subscription;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todosSub = this.todoService.getTodosUpdateListener()
      .subscribe(todos => {
        this.todos = todos;
      });
  }

  ngOnDestroy(): void {
    this.todosSub.unsubscribe();
  }
}
