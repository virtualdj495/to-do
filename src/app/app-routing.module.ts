import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToDoComponent } from './to-do/to-do.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { MyGuardGuard } from './my-guard.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent},
  { path: 'tasks-list', component:ToDoComponent, canActivate: [MyGuardGuard] },
  { path: 'tasks-list/:id', component: TaskDetailsComponent}
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
