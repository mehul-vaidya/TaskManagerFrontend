import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks :Task[] = [];
  constructor(private taskSerivce :TaskService) { }

  ngOnInit(): void {
    this.taskSerivce.getTasks().subscribe((tasks)=>this.tasks=tasks);
  }
  deleteTask(task: Task) {
    this.taskSerivce
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }
  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskSerivce.updateTaskReminder(task).subscribe();
  }
  addTask(task:Task){
    this.taskSerivce.addTask(task).subscribe((task)=>this.tasks.push(task));
  }


}
