import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoadingService } from './core/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit  {

  isCollapsed = false;
  validateForm!: FormGroup;
  loginin:any;

  logout() :void{
    this.loginin = 'P'
  }








  submitForm(): void {
    let warning: number = 0;
    if (this.validateForm.invalid) {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      this.notification.error('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบถ้วน');
      warning++;
      if (warning > 0) {
        return;
      }
    }
    this.loading.show(),10000;
    this.loginin='O';
    this.loading.hide();
  }

  constructor(
    private fb: FormBuilder,
    private loading: LoadingService,
    private notification: NzNotificationService,
    ) {}

  ngOnInit(): void {
    this.loginin = 'P',
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}



