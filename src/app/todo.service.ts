import { Injectable } from '@angular/core';

interface Todo {
  text: string;
  image?: string; // Base64 string
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosKey = 'todos';

  constructor() {
    this.loadTodos();
  }

  private todos: Todo[] = [];

  private loadTodos() {
    const savedTodos = localStorage.getItem(this.todosKey);
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  private saveTodos() {
    localStorage.setItem(this.todosKey, JSON.stringify(this.todos));
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.saveTodos();
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.saveTodos();
  }
}
