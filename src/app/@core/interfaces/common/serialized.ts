import {DataSource} from 'ng2-smart-table/lib/lib/data-source/data-source';
import {Observable} from 'rxjs';

export interface SerializedItem {
  _id: number;
}

export abstract class SerializedData {
  abstract get gridDataSource(): DataSource;
  abstract list(pageNumber: number, pageSize: number): Observable<SerializedItem[]>;
  abstract get(id: number): Observable<SerializedItem>;
  abstract update(company: SerializedItem): Observable<SerializedItem>;
  abstract create(company: SerializedItem): Observable<SerializedItem>;
  abstract delete(id: number): Observable<boolean>;
}
