import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentDetailComponent } from './student-detail.component';
const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    resolve: {
      //student: StudentResolverService
    },
    data: { title: 'Student', pageId: 'student', backShow: true },
    //canActivate: [AuthGuard],
  }
  , {
    path: 'detail',
    component: StudentDetailComponent,
    resolve: {
      //student: StudentResolverService
    },
    //canActivate: [AuthGuard],
    //canDeactivate: [CanDeactivateGuard],
    data: { title: 'StudentDetail', pageId: 'studentDetail', backShow: true },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
