import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { SaveModel, StudentService } from './student.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-student',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private sv: StudentService,
  ) { }
  ngOnInit(): void {
  }
  saveModel: SaveModel = {} as SaveModel;

  saveForm = this.formBuilder.group({
    stdId: null,
    stdPrename: null,
    stdName: null,
    stdLastname: null,
    branch: null,
    idCard: null,

  });

  // save(): void {
  //   let warning: number = 0;
  //   for (const i in this.saveForm.controls) {
  //     this.saveForm.controls[i].markAsDirty();
  //     this.saveForm.controls[i].updateValueAndValidity();
  //   }
  //   if (this.saveForm.invalid) {

  //     return;
  //   }
  //   this.confirmInfo('Message.IS00109', '', 'Message.IS00044', 'Message.IS00045').pipe()
  //     .subscribe((res: any) => {
  //       if (res) {
  //         this.saveForm.disable();
  //         this.saveConfirm();
  //         // this.detail = true;
  //       }
  //     }
  //     );
  // }
  save() {
    Object.assign(this.saveModel, this.saveForm.value);
    this.sv.save(this.saveModel).pipe(
      finalize(() => {
      }))
      .subscribe((res: any) => {
        if (res.success) {
        }
      });
  }


}
