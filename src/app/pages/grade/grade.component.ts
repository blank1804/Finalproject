import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchModel, StudentInfoService } from '../student-info/student-info.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {

  dataSet = [
    {
      yearOfgrade: "1/2563",
      gps: 3.78,
      gpa: 3.78
    },
    {
      yearOfgrade: "2/2563",
      gps: 3.95,
      gpa: 3.86
    },
  ];
  id!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
console.log("grade"+this.id);
  }

  addgrade(id:number) {
    this.router.navigate(['gradedetail',this.id]);

  }
}
