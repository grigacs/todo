import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  @Input() todo: TodoModel;

  form: FormGroup;
  updateTodo = true;
  text = null;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.form = new FormGroup({
      text: new FormControl(this.todo.text,
        {
          validators: [Validators.required]
        })
    });
  }

  onUpdateTodo() {
    if (this.form.invalid) {
      return;
    }

    const todo: TodoModel = {
      id: this.todo.id,
      text: this.form.value.text,
      date: new Date()
    };

    this.todoService.updateTodo(todo);
  }

  changeState() {
    this.updateTodo = !this.updateTodo;
  }
}
