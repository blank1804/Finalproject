import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface SearchModel {
  id: number,
  stdId: string,
  stdPrename: string,
  stdName: string,
  stdLastname: string,
  branch: string,
  idCard: string,
}

@Injectable({ providedIn: 'root' })
export class StudentInfoService {

  private resourceUrl = `${environment.apiUrl}blank`;

  constructor(private http: HttpClient) { }

  search(id: number): Observable<SearchModel>{
    return this.http.get<SearchModel>(`${this.resourceUrl}/students/${75}`);

  }
}
