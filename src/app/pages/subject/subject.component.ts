import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { SearchModel, SubjectModel, SubjectService } from './subject.service';
import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Page } from 'src/shared/interface/interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';


interface DataItem {
  id: number;
}

interface ColumnItem {
  name:string
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}






@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private sv: SubjectService,
    private loading: LoadingService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private subjectService: SubjectService,
    private nzMessageService: NzMessageService,
  ) { }

  ngOnInit() {
     this.search(true);
  }

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




  subjectForm = this.formBuilder.group({
    subjectId: [null, [Validators.maxLength(10),Validators.required]],
    subjectName: [null, [Validators.required]],
    subjectCredit: [null, [Validators.required]],
  });


  searchForm = this.formBuilder.group({
    id: null,
    subjectId: null,
    subjectName: null,
    subjectCredit: null,

  });


clear(){
  this.subjectForm.reset();
}


search(flag: any): void {
  if (flag) {
    this.keyword = this.searchForm.value;
    this.page = new Page();
  }
  this.loadingTable = true;
  Object.assign(this.searchModel, this.keyword);
  this.page.sorts = [{ colId: this.sortName || 'id', sort: this.sortValue || 'asc' }];
  this.subjectService.search(this.searchModel, this.page).pipe(
    finalize(() => {
    }))
    .subscribe((res: any) => {
      this.loadingTable = false;
      this.total = res.total;
      this.listOfData = res;
      console.log(this.listOfData);
    },
      error => {
        this.notification.error('Error', error.error.message);
      });
}


cancel(): void {
  this.nzMessageService.info('ยกเลิกแย้ว');
}

confirm(): void {
  this.nzMessageService.info('ลบแย้ว');
}

sort(sort: { key: string; value: string }): void {
  this.sortName = sort.key;
  this.sortValue = sort.value === 'ascend' ? 'asc' : 'desc';
  this.search(false);
}

delete(id: number){
  this.subjectService.deleteStudent(id).subscribe( data => {
    console.log(id);
    this.search(true);
    this.notification.success('ลบเสร็จสิ้น','ทำกการลบข้อนักมูลวิชาเสร็จสิ้น')
  })

}





















listOfColumns: ColumnItem[] = [

  {
    name: 'id',
    sortOrder: null,
    sortFn: (a: DataItem, b: DataItem) => a.id - b.id,
    sortDirections: ['ascend', 'descend', null],
    listOfFilter: [],
    filterFn: null,
    filterMultiple: true
  }
];

}
