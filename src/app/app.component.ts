import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoadingService } from './core/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit   {

  isCollapsed = false;
  constructor(
    private fb: FormBuilder,
    private loading: LoadingService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  validateForm!: FormGroup;
  // loginin='P';
  loginin='P';

  ngOnInit(): void {
  }

  logout() :void{
    this.loginin = 'P'
  }

}

