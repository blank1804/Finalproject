import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { StudentService } from '../student/student.service';
import {  SearchModel, StudentInfoService } from './student-info.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {

  searchModel: SearchModel = {} as SearchModel;
  id: any;
  constructor(
    private sv: StudentInfoService,
    private route: ActivatedRoute,
    private studentinfoService: StudentInfoService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log("oninit info"+this.id);
    this.studentinfoService.search(this.id).subscribe( data => {
      this.searchModel = data;
      console.log(this.searchModel);
    });
  }
}
