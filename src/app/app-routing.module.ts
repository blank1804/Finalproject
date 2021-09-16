import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectDetailComponent } from './pages/subject/subject-detail.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { UserComponent } from './pages/user/user.component';
const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/student' },
  { path: 'student', loadChildren: () => import('./pages/student/student.module').then(m => m.StudentModule) },
  { path: 'subject', component:SubjectComponent},
  { path: 'subject/subjectdetail', component:SubjectDetailComponent},

  { path: 'user', component:UserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
