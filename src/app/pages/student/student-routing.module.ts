import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentDetailComponent } from './student-detail.component';
import { GradeComponent } from '../grade/grade.component';
import { GradeDetailComponent } from '../grade/grade-detail.component';
const routes: Routes = [
  { path: '', component: StudentComponent, },
  { path: 'detail', component: StudentDetailComponent, },
  {path: 'grade', loadChildren: () => import('../grade/grade.module').then(m => m.GradeModule) },
  // { path: 'detail/:id', component: StudentDetailComponent, },
  //{ path: 'grade/:id', component: GradeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
