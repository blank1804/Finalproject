import { NgModule } from '@angular/core';

import { StudentRoutingModule } from './student-routing.module';

import { StudentComponent } from './student.component';
import { StudentDetailComponent } from './student-detail.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
@NgModule({
  imports: [StudentRoutingModule,DemoNgZorroAntdModule,FormsModule,ReactiveFormsModule],
  declarations: [StudentComponent,StudentDetailComponent],
  exports: [StudentComponent]
})
export class StudentModule { }
