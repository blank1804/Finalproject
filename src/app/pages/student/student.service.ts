import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Page } from '../../../shared/interface/interface'
import { Observable } from 'rxjs';
// import { ComboBox} from '@shared/interface/interface';
import { environment } from 'src/environments/environment';
export interface SearchModel extends Page {
  stdId: number,
  stdPrename: string,
  stdName: string,
  stdLastname: string,
  branch: string,
  idCard: string,
}
export interface SaveModel {
  stdId: number,
  stdPrename: string,
  stdName: string,
  stdLastname: string,
  branch: string,
  idCard: string,

}
export interface GetDetail {
  stdId: number;

}

@Injectable({ providedIn: 'root' })
export class StudentService {

  private resourceUrl = `${environment.apiUrl}blank`;
  // private UrlDdl = `${environment.apiUrl}core/combobox`;

  constructor(private http: HttpClient) { }

  search(model: SearchModel, page: Page) {
    model.pageNumber = page.pageNumber;
    model.pageSize = page.pageSize;
    model.sorts = page.sorts;
    return this.http.post<any>(`${this.resourceUrl}/search`, model);
  }

  detail(model: GetDetail) {
    return this.http.post<any>(`${this.resourceUrl}/getDetail`, model);
  }

  cancel(model: GetDetail) {
    return this.http.post<any>(`${this.resourceUrl}/cancel`, model);
  }
  save(model: SaveModel) {
    console.log(model)
      return this.http.post<any>(`${this.resourceUrl}/save`, model);
    }


}
