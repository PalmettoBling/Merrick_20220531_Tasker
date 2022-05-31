import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task';

const api = '/api';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<Array<Task>>(`${api}/tasks`);
  }

  deleteTask(task: Task) {
    return this.http.delete<Array<Task>>(`${api}/task/${task.id}`);
  }

  addTask(task: Task) {
    return this.http.post<Task>(`${api}/task`, task);
  }

  updateTask(task: Task) {
    return this.http.put<Task>(`${api}/task/${task.id}`, task);
  }
}
