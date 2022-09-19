import { Component, OnInit , Output , EventEmitter} from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask:EventEmitter<Task> = new EventEmitter();

  text:string;
  day:string;
  reminder:boolean ;
  showAddTask :boolean = false;
  subscription:Subscription
  corrected_reminder:boolean= false;
   
  constructor(private uiService : UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value=>this.showAddTask = value)
   }

  ngOnInit(): void {
  }
  onSubmit():void{
    if(!this.text){
      alert('please add a task');
      return;
    }
    
    //added this condition 
    if(this.reminder===undefined){
      this.corrected_reminder = false;
    }else{
      this.corrected_reminder = true;
    }

    const newTask= {
      text : this.text,
      day : this.day,
      reminder : this.corrected_reminder
    }
    console.log(newTask);
    
    this.onAddTask.emit(newTask);

    this.text =''
    this.day =''
    this.reminder=false
  }

}
