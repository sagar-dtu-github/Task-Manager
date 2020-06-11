import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {


  lists : List[];
  tasks : Task[];
  selectedListId : string;
  
  constructor(private taskService : TaskService, private route : ActivatedRoute,private router : Router
    ,private authService : AuthService) { }

  ngOnInit() {
    //accessing data from url after creating a list
    this.route.params.subscribe(
      (params : Params)=>{
        if(params.listId){
          this.selectedListId = params.listId;
          this.taskService.getTasks(params.listId).subscribe((tasks : Task[])=>{
            this.tasks = tasks;
          })
        }else{
          this.tasks = undefined;
        }

    });

    // accessing all lists from db
    this.taskService.getLists().subscribe((lists : List[])=>{
      this.lists = lists;
    })

  }


  onTaskClick(task : Task){
    // we want to set the task to completed
    this.taskService.complete(task).subscribe(()=>{
      // the task has been set to completed successfully
        console.log("Completed Successfully!!");
        task.completed = !task.completed;
      }
    )
  }

  onDeleteListClick(){
    this.taskService.deleteList(this.selectedListId).subscribe((res : any)=>{
      this.router.navigate(['/lists']);
    })
  }

  onDeleteTaskClick(id : string){
    this.taskService.deleteTask(this.selectedListId,id).subscribe((res : any)=>{
      console.log(res);
      this.tasks = this.tasks.filter(val=> val._id !== id);
    })
  }

  onLogoutClick(){
    this.authService.logout();
  }
  

}
