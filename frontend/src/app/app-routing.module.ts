import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './Pages/task-view/task-view.component';
import { NewListComponent } from './Pages/new-list/new-list.component';
import { NewTaskComponent } from './Pages/new-task/new-task.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { EditListComponent } from './Pages/edit-list/edit-list.component';
import { EditTaskComponent } from './Pages/edit-task/edit-task.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path : '', redirectTo : 'lists' , pathMatch: 'full',  canActivate : [AuthGuard]},
  { path : 'new-list', component : NewListComponent, canActivate : [AuthGuard] },
  { path : 'edit-list/:listId', component : EditListComponent,  canActivate : [AuthGuard] },
  { path : 'login', component : LoginPageComponent },
  { path : 'signup', component : SignupComponent },
  { path : 'lists', component : TaskViewComponent,  canActivate : [AuthGuard] },
  { path : 'lists/:listId', component : TaskViewComponent,  canActivate : [AuthGuard] },
  { path : 'lists/:listId/new-task', component : NewTaskComponent,  canActivate : [AuthGuard] },
  { path : 'lists/:listId/edit-task/:taskId', component : EditTaskComponent,  canActivate : [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
