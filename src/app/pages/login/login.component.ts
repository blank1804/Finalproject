import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AppComponent } from 'src/app/app.component';
import { LoadingService } from 'src/app/core/loading/loading.service';


export interface login {
  userName: any;
  password: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private loading: LoadingService,
    private notification: NzNotificationService,
    private ac: AppComponent,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  validateForm!: FormGroup;
  loginin: any;
  isLoading = false;
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
  submitForm(): void {
    let warning: number = 0;
    if (this.validateForm.invalid) {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      this.notification.error('ผิดพลาด', 'กรุณากรอกข้อมูลให้ครบถ้วน');
      warning++;
      if (warning > 0) {
        return;
      }
    }
    if (this.validateForm.controls.userName.value == 'admin$' && this.validateForm.controls.password.value == 'admin$')
    {
      this.loading.show();
      this.isLoading = true;
      setTimeout(() => {
        this.ac.loginin = 'O';
        this.loading.hide();
      }, 1000);
      this.router.navigate(['']);
      setTimeout(() => {
        this.message.success('คุณได้เข้าสู่ระบบในถานะ Admin');
      }, 1000);
    } else if (this.validateForm.controls.userName.value == '6313014004' && this.validateForm.controls.password.value == '1720900255074')
    {
      this.loading.show();
      this.isLoading = true;
      setTimeout(() => {
        this.ac.loginin = 'S';
        this.loading.hide();
      }, 1000);
      this.router.navigate(['']);
      setTimeout(() => {
        this.message.success('คุณได้เข้าสู่ระบบในถานะ นักนักศึกษา');
      }, 1000);

    }

    else {
      this.notification.error('ผิดพลาด','ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      return
    }

  }

  logout(): void {

    setTimeout(() => {
      this.loading.show();
    }, 1000);
    this.ac.loginin = 'P'
    this.loading.hide();
  }

}
