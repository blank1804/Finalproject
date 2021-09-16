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
      yearOfgrade: 2562,
      semesterOfgrade: 1,
      pointOfyou: 3.99
    },
    {
      yearOfgrade: 2562,
      semesterOfgrade: 2,
      pointOfyou: 3.76
    },
    {
      yearOfgrade: 2563,
      semesterOfgrade: 1,
      pointOfyou: 4.00
    },    {
      yearOfgrade: 2563,
      semesterOfgrade: 2,
      pointOfyou: 3.90
    }
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
