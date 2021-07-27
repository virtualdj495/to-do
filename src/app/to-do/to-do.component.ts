import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Objective } from '../objectives';
import { ObjectivesService } from '../objectives.service';
import { findIndex } from 'lodash';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  listOfTasks: Array<Objective> = [];
  currentTask : Objective = { id: -2, name: '', task: '', endDate: '', email: '', state: true };
  dataSource = new MatTableDataSource(this.listOfTasks);
  displayedColumns: string[] = ['name' , 'date', 'edit' , 'checkbox' ,'delete'];

  @ViewChild(MatSort) sort !:MatSort;

  constructor(
    private objectivesService: ObjectivesService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {

    if (String(localStorage.getItem('list')) !== 'null'){
      this.listOfTasks = JSON.parse(String(localStorage.getItem('list')));
      this.listOfTasks = [...this.listOfTasks];
    }
    this.dataSource = new MatTableDataSource(this.listOfTasks);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'date': return item.endDate;
        default: return property;
      }
    };
    this.dataSource.sort = this.sort;
    localStorage.setItem('list',JSON.stringify(this.listOfTasks));
  }

  ngAfterViewInit (){
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      name: this.currentTask.name,
      endDate: this.currentTask.endDate,
      email: this.currentTask.email,
      task: this.currentTask.task
    };
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === undefined) {
          return;
        }
        this.currentTask.name = data[0].name;
        this.currentTask.endDate = data[0].endDate;
        this.currentTask.email = data[1].email;
        this.currentTask.task = data[1].task;
        this.addTask();
      }
  );
  }

  addTask(): void {
    if (findIndex(this.listOfTasks, task => task.id === this.currentTask.id) !== -1) {
      this.listOfTasks.splice(this.currentTask.id,1,this.currentTask);
      this.currentTask.endDate =moment(this.currentTask.endDate, "YYYY-MM-DD h:mm:ss").format("YYYY-MM-DD h:mm:ss").toString();
      localStorage.setItem('list',JSON.stringify(this.listOfTasks));
    }
    else {
      this.objectivesService.addTasktoList(this.currentTask);
    }
    this.listOfTasks = this.objectivesService.getList();
    this.listOfTasks = [...this.listOfTasks];
    this.dataSource = new MatTableDataSource(this.listOfTasks);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'date': return item.endDate;
        default: return property;
      }
    };
    this.dataSource.sort = this.sort;
    this.currentTask = { id: -2, name: '', task: '', endDate: '', email: '', state: true };
  }

  switchTask(task: Objective): void {

    this.objectivesService.switchState(task);
    this.listOfTasks = JSON.parse(String(localStorage.getItem('list')));
    this.dataSource = new MatTableDataSource(this.listOfTasks);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'date': return item.endDate;
        default: return property;
      }
    };
    this.dataSource.sort = this.sort;
  }

  clearMemory(){
    localStorage.clear();
    this.listOfTasks= JSON.parse(String(localStorage.getItem('list')));
    this.objectivesService.clearMemory();
  }

  addColor(task: Objective): string {

    let currentDate =moment(Date());
    let taskDate = moment(task.endDate);
    if ( task.state === false) {
      return '#8e8e8e';
    }
    if  (taskDate.diff(currentDate,'hours') < 0) {
      return 'red';
    }
    if (taskDate.diff(currentDate,'hours') < 24 ) {
      return 'orange';
    }
    if (taskDate.diff(currentDate,'hours') < 48) {
      return 'yellow';
    }
    if (taskDate.diff(currentDate,'hours') < 72) {
      return 'green';
    }
    return '#37a5f5';
  }

  deleteTask(task: Objective): void {
    this.listOfTasks. splice(findIndex(this.listOfTasks,task) , 1);
    this.listOfTasks = [... this.listOfTasks];
    this.dataSource = new MatTableDataSource(this.listOfTasks);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'date': return item.endDate;
        default: return property;
      }
    };
    this.dataSource.sort = this.sort;
    localStorage.setItem('list',JSON.stringify(this.listOfTasks));
  }

  editTask( id: number): void {
    this.currentTask =this.objectivesService.getTask(id);
    this.openDialog();

  }
}
