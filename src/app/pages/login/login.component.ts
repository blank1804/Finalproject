import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AppComponent } from 'src/app/app.component';
import { LoadingService } from 'src/app/core/loading/loading.service';

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
    private ac:AppComponent,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  validateForm!: FormGroup;
  loginin:any;
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
      this.notification.error('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบถ้วน');
      warning++;
      if (warning > 0) {
        return;
      }
    }
    this.isLoading = true;
    setTimeout(() => {
      this.ac.loginin='O';
    }, 1000);
    this.message.success('คุณได้เข้าสู่ระบบในถานะadmin');
    this.router.navigate(['']);
    // this.loading.show();

    // this.loading.hide();
  }

  logout() :void{
    this.ac.loginin = 'P'
  }

}
