import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Page } from '../../../shared/interface/interface'
import { Observable } from 'rxjs';
// import { ComboBox} from '@shared/interface/interface';
import { environment } from 'src/environments/environment';

export interface SubjectModel {
  sjId:number
  subjectId: string,
  subjectName: string,
  subjectCredit: number,
}
export interface SearchModel {
  sjId:number
  subjectId: string,
  subjectName: string,
  subjectCredit: number,
}


@Injectable({ providedIn: 'root' })
export class SubjectService {
  private resourceUrl = `${environment.apiUrl}subject`;
  constructor(private http: HttpClient) { }


save(model: SubjectModel) {
    console.log(model)
      return this.http.post<any>(`${this.resourceUrl}/save`, model);
    }

search(model: SearchModel, page: Page): Observable<SearchModel[]>{
   return this.http.get<SearchModel[]>(`${this.resourceUrl}/search`);
}



deleteStudent(id: number): Observable<Object>{
  return this.http.delete(`${this.resourceUrl}/delete/${id}`);
}


}











