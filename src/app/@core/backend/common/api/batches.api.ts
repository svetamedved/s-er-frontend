import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

@Injectable()
export class BatchesApi {
  private readonly apiController: string = 'batches';

  constructor(private api: HttpService) {}

  get batchesDataSource(): DataSource {
    return this.api.getServerDataSource(`${this.api.apiUrl}/${this.apiController}`);
  }

  list(pageNumber: number = 0, pageSize: number = 0): Observable<any[]> {
    const params = new HttpParams()
      .set('pageNumber', `${pageNumber}`)
      .set('pageSize', `${pageSize}`);

    return this.api.get(this.apiController, { params })
      .pipe(map(data => data.items.map(item => {
        return { ...item };
      })));
  }

  listItems(id: number): Observable<any> {
    return this.api.get(`${this.apiController}/${id}/items`)
      .pipe(map(data => data.items.map(item => {
        return { ...item };
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

  exportToPrintPalette(id: any): Observable<any> {
    return this.api.get(`${this.apiController}/${id}/exportToPrintPalette`);
  }

  exportToPrintCase(id: any): Observable<any> {
    return this.api.get(`${this.apiController}/${id}/exportToPrintCase`);
  }

  exportToPrintItem(id: any, total: number): Observable<any> {
    return this.api.get(`${this.apiController}/${id}/exportToPrint`, {query: {total: total}});
  }
}
