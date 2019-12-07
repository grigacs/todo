import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  @Input() id: number;
  form: FormGroup;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.form = new FormGroup({});
  }

  onDelete() {
      this.todoService.deleteTodo(this.id);
  }
}
