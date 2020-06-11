import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskservice : TaskService, private router : Router) { }

  ngOnInit() {
  }

  createNewList(title : string){
    this.taskservice.createList(title).subscribe((list : List)=>{
      console.log(list);
      // Now we navigate to /lists/respose._id
      this.router.navigate(['/lists',list._id]);
    });
  }
}
