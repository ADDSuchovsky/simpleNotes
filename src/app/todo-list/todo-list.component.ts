import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos = this.todoService.getTodos();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todos = this.todoService.getTodos();
  }

  addTodoClick(todoInput: HTMLInputElement, fileInput: HTMLInputElement) {
    const file = fileInput.files?.[0];
    if (todoInput.value.trim()) {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result as string;
          this.todoService.addTodo({
            text: todoInput.value,
            image: base64Image
          });
          this.todos = this.todoService.getTodos();
          todoInput.value = '';
          fileInput.value = '';
        };
        reader.readAsDataURL(file);
      } else {
        this.todoService.addTodo({
          text: todoInput.value
        });
        this.todos = this.todoService.getTodos();
        todoInput.value = '';
        fileInput.value = '';
      }
    }
  }

  addTodoEnter(todoInput: HTMLInputElement, fileInput: HTMLInputElement) {
    this.addTodoClick(todoInput, fileInput);
  }

  deleteTodo(index: number) {
    this.todoService.deleteTodo(index);
    this.todos = this.todoService.getTodos();
  }
}
