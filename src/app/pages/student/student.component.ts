import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AbstractPageComponent } from 'src/app/abstract-page.component';
import { Page } from 'src/shared/interface/interface';
import { GetDetail, SearchModel, StudentService } from './student.service';
import { RouterModule } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { StudentRoutingModule } from './student-routing.module';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<SearchModel> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<SearchModel> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent extends AbstractPageComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private sv: StudentService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private studentServicev: StudentService,
    private loadingService: LoadingService,
    private router: Router,
    private loading:LoadingService

  ) {
    super();
  }

  searchModel: SearchModel = {} as SearchModel;
  getDetail: GetDetail = {} as GetDetail;
  sortName: string | null = null;
  sortValue: string | null = null;
  keyword: string = '';
  page = new Page();
  loadingTable = false;
  total = 1;
  listOfData: any = [];
  scollTable: any;
  id: any;
  stdId: any;
  stdPrename: any;
  stdName: any;
  stdLastname: any;
  branch: any;
  idCard: any;
  confirmModal?: NzModalRef;



  checked: any;

  searchForm = this.formBuilder.group({
    stdId: null,
    stdPrename: null,
    stdName: null,
    stdLastname: null,
    branch: null,
    idCard: null,
    year: null
  });

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scollTable = super.scollTable();
    }, 10);
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value === 'ascend' ? 'asc' : 'desc';
    this.search(false);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.data.subscribe((data) => {
      // this.id = data.student.year;
      // this.branch = data.student.branch;
    });
    this.search(true);
  }

  clear(flag: any): void {
    if (flag) {
      this.searchForm.reset();
    }
    this.listOfData = [];
    this.searchForm.controls.id.setValue(this.listOfData);
    this.searchForm.controls.branch.setValue(this.listOfData);
    this.search(true);
  }


  search(flag: any): void {
    if (flag) {
      this.keyword = this.searchForm.value;
      this.page = new Page();
    }
    this.loadingTable = true;
    Object.assign(this.searchModel, this.keyword);
    this.page.sorts = [{ colId: this.sortName || 'id', sort: this.sortValue || 'asc' }];
    this.studentService.search(this.searchModel, this.page).pipe(
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

  cancel(id: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'ลบ',
      nzContent: 'ต้องการที่จะลบนักศึกษาคนนี้ออกจากฐานข้อมูลใช่หรือไม่?',
      nzOnOk: () =>
          this.studentService.delete(id).subscribe(data => {
            console.log(this.studentService.delete(id));
            new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            this.search(true);
            this.notification.success('ลบเสร็จสิ้น','ทำกการลบข้อนักมูลศึกษาเสร็จสิ้น')
          })
        })

    });
  }


  grade(id: number) {
    this.router.navigate(['student/grade', id],{skipLocationChange: true});
    console.log("grade"+id);
  }


  studentDetails(id: number) {
    this.router.navigate(['student/detail', id],{skipLocationChange: true});
    console.log("studentDetails"+id);
  }

  rout(is:number) {
    this.router, this.route, '/student/detail', { id: this.id }, null;
  }









  listOfColumns: ColumnItem[] = [
    {
      name: 'ชั้นปี',
      sortOrder: null,
      sortFn: (a: SearchModel, b: SearchModel) => a.year.localeCompare(b.year),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'ปวช.1', value: 'ปวช.1' },
        { text: 'ปวช.2', value: 'ปวช.2' },
        { text: 'ปวช.3', value: 'ปวช.3' },
        { text: 'ปวส.1', value: 'ปวส.1' },
        { text: 'ปวส.2', value: 'ปวส.2' },
      ],
      filterFn: (list: string[], item: SearchModel) => list.some(year => item.year.indexOf(year) !== -1)
    },
    {
      name: 'สาขา',
      sortOrder: null,
      sortFn: (a: SearchModel, b: SearchModel) => a.branch.localeCompare(b.branch),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'การบัญชี', value: 'การบัญชี' },
        { text: 'การตลาด', value: 'การตลาด' },
        { text: 'คอมพิวเตอร์กราฟิก', value: 'การตลาด' },
        { text: 'การโรงแรมและบริการ', value: 'การโรงแรมและบริการ' },
        { text: 'ธุรกิจร้านอาหารและภัตตาคาร', value: 'ธุรกิจร้านอาหารและภัตตาคาร' },
        { text: 'การจัดการธุรกิจค้าปลีก', value: 'การจัดการธุรกิจค้าปลีก' },
        { text: 'สปาและความงาม', value: 'สปาและความงาม' },
      ],
      filterFn: (list: string[], item: SearchModel) => list.some(branch => item.branch.indexOf(branch) !== -1)
    }
  ];
}



