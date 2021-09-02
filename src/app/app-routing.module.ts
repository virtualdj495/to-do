import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToDoComponent } from './to-do/to-do.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ActivateChild, Forbbiden, MyGuard} from './my.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent},
  { path: 'tasks-list', component: ToDoComponent,
   canActivate: [MyGuard, Forbbiden], canActivateChild: [ActivateChild], children:[
     { path:':id', component: TaskDetailsComponent}
   ]}, 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
