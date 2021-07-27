import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from '../validators';
import { Objective } from '../objectives';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  taskdetails = new FormArray([]);
  taskForm1 = this.fb.group({
    name: ['',Validators.required],
    endDate: ['',Validators.required]
  });
  taskForm2 = this.fb.group({
    email: ['',[
      Validators.required,
      emailValidator()
    ]],
    task:['']
  });

  description !: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) data : any) {
      this.taskForm1.setValue({
        name: data.name,
        endDate: new Date(data.endDate)
      });
      this.taskdetails.push(this.taskForm1);
      this.taskForm2.setValue({
        email: data.email,
        task: data.task
      });
      this.taskdetails.push(this.taskForm2);
  }

  ngOnInit(): void {

  }

  save() {
      this.dialogRef.close(this.taskdetails.value);
  }

  close() {
      this.dialogRef.close();
  }
}
