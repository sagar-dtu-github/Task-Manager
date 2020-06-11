import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './Pages/task-view/task-view.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewListComponent } from './Pages/new-list/new-list.component';
import { NewTaskComponent } from './Pages/new-task/new-task.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { WebReqInterceptor } from './web-request.interceptor';
import { SignupComponent } from './Pages/signup/signup.component';
import { EditListComponent } from './Pages/edit-list/edit-list.component';
import { EditTaskComponent } from './Pages/edit-task/edit-task.component';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    NewTaskComponent,
    LoginPageComponent,
    SignupComponent,
    EditListComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide : HTTP_INTERCEPTORS, useClass : WebReqInterceptor, multi : true}, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
