import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})



export class UserComponent implements OnInit {
  visible = false;
  listOfData = [
    {
      key: '1',
      id: '3000–1501',
      name: "ชีวิตกับสังคมไทย",
      point: '2'
    },
    {
      key: '2',
      id: '3000–1502',
      name: "เศรษฐกิจพอเพียง",
      point: '3'
    },
    {
      key: '1',
      id: '3000–1503',
      name: "มนุษยสัมพันธ์กับปรัชญาของเศรษฐกิจพอเพียง",
      point: '2'
    },

  ];


  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  constructor(
    private ac: AppComponent,
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.ac.loginin = 'P'
  }
}
