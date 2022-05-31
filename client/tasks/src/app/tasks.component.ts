import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: `./tasks.component.html`,
  styles: [
  ]
})
export class TasksComponent implements OnInit {
  addingTask = false;
  tasks: any = [];
  selectedTask: Task | undefined; 

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  cancel() {
    this.addingTask = false;
    this.selectedTask = undefined;
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(res => {
      this.tasks = this.tasks.filter(t => t !== task);
      if (this.selectedTask === task) {
        this.selectedTask = undefined;
      }
    });
  }

  getTasks() {
    return this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  enableAddMode() {
    this.addingTask = true;
    this.selectedTask = new Task();
  }

  onSelect(task: Task) {
    this.addingTask = false;
    this.selectedTask = task;
  }

  save() {
    if (this.addingTask) {
      this.taskService.addTask(this.selectedTask).subscribe(task => {
        this.addingTask = false;
        this.selectedTask = undefined;
        this.tasks.push(task);
      });
    } else {
      this.taskService.updateTask(this.selectedTask).subscribe(task => {
        this.addingTask = false;
        this.selectedTask = undefined;
      });
    }
  }
}
