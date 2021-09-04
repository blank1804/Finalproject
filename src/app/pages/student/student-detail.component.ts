import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { SaveModel, StudentService } from './student.service';
import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-student',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private sv: StudentService,
    private loading: LoadingService,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) { }
  ngOnInit(): void {
  }


  isLoadingOne = false;
  saveModel: SaveModel = {} as SaveModel;
  detail = true;
  saveForm = this.formBuilder.group({
    stdId: [null, [Validators.maxLength(10),Validators.required]],
    stdPrename: [null, [Validators.required]],
    stdName: [null, [Validators.required]],
    stdLastname: [null, [Validators.required]],
    branch: [null],
    idCard: [null, [Validators.required]],

  });

  save(): void {
    let warning: number = 0;
    if (this.saveForm.invalid) {
      for (const i in this.saveForm.controls) {
        this.saveForm.controls[i].markAsDirty();
        this.saveForm.controls[i].updateValueAndValidity();
      }
      this.notification.error('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบถ้วน');
      warning++;
    }
    if (warning > 0) {
      return;
    }
    this.saveForm.disable();
    this.modal.confirm({
      nzTitle: 'บันทึก',
      nzContent: 'ต้องการที่จะเพิ่มนักศึกษาคนนี้ใช่หรือไม่',
      nzOnOk: () => this.saveConfirm()
    });
    this.detail = true;
  }


  saveConfirm() {
    this.isLoadingOne = true;
    // this.loading.show();
    Object.assign(this.saveModel, this.saveForm.value);
    this.sv.save(this.saveModel).pipe(
      finalize(() => {
        // this.loading.hide();
        this.notification.success('สำเร็จ', 'บันทึกสำเร็จแล้ว');
        this.saveForm.enable();
        this.saveForm.reset();
        this.isLoadingOne = false;

      }))
      .subscribe((res: any) => {
        if (res.success) {

          this.notification.success('สำเร็จ', 'บันทึกสำเร็จแล้ว');

        }
      },
        error => {
          this.notification.error('Error', error.error.message);
        });
  }
clear(){
  this.saveForm.reset();
}

}