import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { StudentDetailComponent } from './student-detail.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from 'src/app/ng-zorro-antd.module';

import { StudentInfoComponent } from '../student-info/student-info.component';
import { GradeComponent} from '../grade/grade.component'
@NgModule({
  imports: [StudentRoutingModule,
            DemoNgZorroAntdModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule],
  declarations: [StudentComponent,
                StudentDetailComponent,
                GradeComponent,
                StudentInfoComponent,],
  exports: [StudentComponent]
})
export class StudentModule { }
