import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Todo {
  text: string;
  image?: string;
}

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
}
