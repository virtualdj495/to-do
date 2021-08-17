import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Objective } from '../objectives';
import { ObjectivesService } from '../objectives.service';
import { findIndex } from 'lodash';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { of } from 'rxjs';
import { MyGuard } from '../my.guard';
import { Router} from '@angular/router';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  listOfTasks: Array<Objective> = [];
  currentTask !: Objective;
  loggedUser !: string;
  dataSource = new MatTableDataSource(this.listOfTasks);
  displayedColumns: string[] = ['name' , 'date', 'edit' , 'checkbox' ,'delete'];

  @ViewChild(MatSort) sort !:MatSort;

  constructor(
    private objectivesService: ObjectivesService,
    private dialog: MatDialog,
    private http: HttpClient,
    private guard : MyGuard,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loggedUser =<string> localStorage.getItem('token');
    this.currentTask = {userId: this.loggedUser, id: -2, name: '', task: '', endDate: '', email: '', state: true };
    this.http.get(`http://localhost:3000/${this.loggedUser}`).pipe(catchError(error =>{
      window.alert(error.message);
      this.objectivesService.setStateFalse();
      this.guard.forbbidenAcces();
      return of([]);
    })).subscribe((data: any) =>{
      for (let task of <Array<Objective>>data) {
        this.listOfTasks.push(task);
      }
      this.objectivesService.setList(this.listOfTasks)
      this.dataSource = new MatTableDataSource(this.listOfTasks);
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'date': return item.endDate;
          default: return property;
        }
      };
      this.dataSource.sort = this.sort;
    });

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
      this.currentTask.endDate =moment(this.currentTask.endDate, "YYYY-MM-DD h:mm:ss").format("YYYY-MM-DD h:mm:ss").toString();
      this.listOfTasks.splice(this.currentTask.id,1,this.currentTask);
    }
    else {
      this.currentTask = this.objectivesService.addTasktoList(this.currentTask);
      this.listOfTasks.push(this.currentTask );
    }
    this.listOfTasks = [... this.listOfTasks];
    this.dataSource = new MatTableDataSource(this.listOfTasks);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'date': return item.endDate;
        default: return property;
      }
    };
    this.dataSource.sort = this.sort;
    this.sendDataToServer(this.currentTask);
    this.currentTask = {userId: this.loggedUser, id: -2, name: '', task: '', endDate: '', email: '', state: true };

  }

  switchTask(task: Objective): void {

    task = this.objectivesService.switchState(task);
    this.listOfTasks = this.objectivesService.getList()
    this.dataSource = new MatTableDataSource(this.listOfTasks);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'date': return item.endDate;
        default: return property;
      }
    };
    this.dataSource.sort = this.sort;
    this.sendDataToServer(task);
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
    this.sendDataToServer(task);
  }

  editTask( id: number): void {
    this.currentTask =this.objectivesService.getTask(id);
    this.openDialog();
  }

  sendDataToServer(sendTask: Objective) {
    this.http.post(`http://localhost:3000`,sendTask).subscribe();
  }

  showDetails(id: number): void {
    this.router.navigateByUrl(`/tasks-list/${id}`);
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl(`/login`);
  }
}

