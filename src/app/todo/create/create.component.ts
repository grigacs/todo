import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  createTodo = true;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.form = new FormGroup({
      text: new FormControl(
        null,
        {validators : [Validators.required]
        })
    });
  }

  onAddTodo() {
    if (this.form.invalid) {
      return;
    }

    this.changeState();

    const todo: TodoModel = {
      text: this.form.value.text,
      date: new Date()
    };

    this.form.reset();

    this.todoService.addTodo(todo);
  }

  changeState() {
    this.createTodo = !this.createTodo;
  }

}
