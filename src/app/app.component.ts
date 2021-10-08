import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoadingService } from './core/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isCollapsed = false;
  constructor(
    private fb: FormBuilder,
    private loading: LoadingService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NzModalService
  ) { }
  validateForm!: FormGroup;
  // loginin='P';
  loginin = 'O';
  nzOffsetBottom = 10;
  ngOnInit(): void {
  }


  logout(): void {
    this.modal.confirm({
      nzTitle: '<i>ออกจากระบบ</i>',
      nzContent: '<b>ต้องการที่จะออกจากระบบหรือไม่?</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.loginin = 'P',
      nzCancelText: 'No',
      nzOnCancel: () => { this.router.navigate(['/student']);
                         }

    });
  }

}

