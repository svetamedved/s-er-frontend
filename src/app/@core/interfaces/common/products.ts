import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface  Products {
  _id: number;
  productName: string;
  productGTIN: number;
  manufacturer: string;
  dosageFormType: string;
  strengthDescription: string;
  netContentDescription: string;
  amountPerCase: string;
}

export abstract class ProductsData {
  abstract get gridDataSource(): DataSource;
  abstract list(pageNumber: number, pageSize: number): Observable<Products[]>;
  abstract get(id: number): Observable<Products>;
  abstract update(user: Products): Observable<Products>;
  abstract create(user: Products): Observable<Products>;
  abstract delete(id: number): Observable<boolean>;
}
