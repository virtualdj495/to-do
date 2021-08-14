import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToDoComponent } from './to-do/to-do.component';
import { TaskDetailsComponent } from './task-details/task-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'tasks-list', pathMatch: 'full' },
  {path: 'tasks-list', component:ToDoComponent },
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
