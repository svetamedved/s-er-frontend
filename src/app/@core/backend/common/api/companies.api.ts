import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

@Injectable()
export class CompaniesApi {
  private readonly apiController: string = 'companies';

  constructor(private api: HttpService) {}

  get companiesDataSource(): DataSource {
    return this.api.getServerDataSource(`${this.api.apiUrl}/${this.apiController}`);
  }

  list(params: any = {}): Observable<any[]> {
    return this.api.get(this.apiController, { params: params })
      .pipe(map(data => data.items.map(item => {
        return { ...item };
      })));
  }

  listAttached(): Observable<any> {
    return this.api.get(`${this.apiController}/attached`)
      .pipe(map(data => data.items.map(item => {
        return { ...item};
      })));
  }

  get(id: number): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`)
      .pipe(map(data => {
        return { ...data };
      }));
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(`${this.apiController}/${id}`);
  }

  add(item: any): Observable<any> {
    return this.api.post(this.apiController, item);
  }

  update(item: any): Observable<any> {
    return this.api.put(`${this.apiController}/${item._id}`, item);
  }
}
