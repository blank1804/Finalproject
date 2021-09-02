import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AbstractPageComponent } from 'src/app/abstract-page.component';
import { Page } from 'src/shared/interface/interface';
import { GetDetail, SearchModel, StudentService } from './student.service';
import { RouterModule } from '@angular/router';
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
  listOfData = [];
  stdId: any;
  stdPrename: any;
  stdName: any;
  stdLastname: any;
  branch: any;
  idCard: any;

  searchForm = this.formBuilder.group({
    stdId: null,
    stdPrename: null,
    stdName: null,
    stdLastname: null,
    branch: null,
    idCard: null,
    year:null

  });

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value === 'ascend' ? 'asc' : 'desc';
    this.search(false);
  }

  ngOnInit() {
    super.ngOnInit();

  }

  clear(flag: any): void {
    if (flag) {
      this.searchForm.reset();
    }
    this.listOfData = [];
    // this.search(true);
  }


  search(flag: any): void {
    if (flag) {
      this.keyword = this.searchForm.value;
      this.page = new Page();
    }
    this.loadingTable = true;
    Object.assign(this.searchModel, this.keyword);
    this.page.sorts = [{ colId: this.sortName || 'rowNum', sort: this.sortValue || 'asc' }];
    this.studentService.search(this.searchModel, this.page).pipe(
      finalize(() => {
      }))
      .subscribe((res: any) => {
        this.loadingTable = false;
        this.total = res.total;
        this.listOfData = res.records;
      }
      );
  }

  // cancel(stdId) {
  //  .pipe()
  //     .subscribe((res: any) => {
  //       if (res) {
  //         this.getDetail.stdId = stdId;
  //         this.selectCancelstdId();
  //       }
  //     },
  //      );
  // }

  // selectCancelstdId() {
  //   this.page.sorts = [{ colId: this.sortName || 'rowNum', sort: this.sortValue || 'asc' }];
  //   this.sv.cancel(this.getDetail).pipe()
  //     .subscribe(() => {

  //       this.search(true);
  //     },
  //      );
  // }
}



