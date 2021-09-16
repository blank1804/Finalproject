import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Page } from 'src/shared/interface/interface';
import { SearchModel, StudentInfoService } from '../student-info/student-info.service';
import { GradeService, subjectSelect } from './grade.service';

@Component({
  selector: 'app-grade-detail',
  templateUrl: './grade-detail.component.html',
  styleUrls: ['./grade-detail.component.css']
})


export class GradeDetailComponent implements OnInit {
  id: any;
  searchModel: SearchModel = {} as SearchModel;
  i = 0;
  editId: string | null = null;
  listOfData: subjectSelect = {} as subjectSelect;
  page = new Page();
  constructor(
    private route: ActivatedRoute,
    private gradeService: GradeService,
    private studentinfoService: StudentInfoService,
    private gradeservice:GradeService)

   { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.studentinfoService.search(this.id).subscribe( data => {
      this.searchModel = data;
    });
  }

}
