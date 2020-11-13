import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface Batches {
  _id: number;
  amount: number;
  expDate: string;
  productId: string;
  lot: string;
}

export abstract class BatchesData {
  abstract get gridDataSource(): DataSource;
  abstract list(pageNumber: number, pageSize: number): Observable<Batches[]>;
  abstract get(id: number): Observable<Batches>;
  abstract update(user: Batches): Observable<Batches>;
  abstract create(user: Batches): Observable<Batches>;
  abstract delete(id: number): Observable<boolean>;
}
