import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentDetailComponent } from './student-detail.component';
const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    data: { title: 'Student', pageId: 'student', backShow: true },
  }
  , {
    path: 'detail',
    component: StudentDetailComponent,

    data: { title: 'StudentDetail', pageId: 'studentDetail', backShow: true },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
