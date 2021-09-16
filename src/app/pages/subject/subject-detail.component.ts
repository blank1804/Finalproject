import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { Page } from 'src/shared/interface/interface';
import { SearchModel, SubjectModel, SubjectService } from './subject.service';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css']
})
export class SubjectDetailComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private sv: SubjectService,
    private loading: LoadingService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private subjectService: SubjectService,
    private nzMessageService: NzMessageService,
  ) { }

  ngOnInit(): void {
  }
  subjectForm = this.formBuilder.group({
    subjectId: [null, [Validators.maxLength(10),Validators.required]],
    subjectName: [null, [Validators.required]],
    subjectCredit: [null, [Validators.required]],
  });

  isLoadingOne = false;
  detail = true;
  sortName: string | null = null;
  sortValue: string | null = null;
  keyword: string = '';
  page = new Page();
  loadingTable = false;
  total = 1;
  listOfData: any = [];
  searchModel: SearchModel = {} as SearchModel;
  scollTable: any;
  subjectModel: SubjectModel = {} as SubjectModel;
  subjectId:any;
  id:any;
  subjectName:any;
  subjectCredit:any;
  tabs = [1, 2, 3];

  save(): void {
    let warning: number = 0;
    if (this.subjectForm.invalid) {
      for (const i in this.subjectForm.controls) {
        this.subjectForm.controls[i].markAsDirty();
        this.subjectForm.controls[i].updateValueAndValidity();
      }
      this.notification.error('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบถ้วน');
      warning++;
    }
    if (warning > 0) {
      return;
    }
    this.subjectForm.disable();
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
    Object.assign(this.subjectModel, this.subjectForm.value);
    this.sv.save(this.subjectModel).pipe(
      finalize(() => {
        // this.loading.hide();
        this.notification.success('สำเร็จ', 'บันทึกสำเร็จแล้ว');
        this.subjectForm.enable();
        this.subjectForm.reset();
        this.isLoadingOne = false;

      }))
      .subscribe((res: any) => {
        if (res.success) {

          this.notification.success('สำเร็จ', 'บันทึกสำเร็จแล้ว');

        }
      },
        error => {
          this.notification.error('Error', error.error.message);
        }
        );
  }
}