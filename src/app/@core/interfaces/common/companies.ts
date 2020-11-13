import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface  Companies {
  _id: number;
  companyName: string;
  gln: number;
  address: Address;
  attached: { sender: Companies | string, receiver: Companies | string };
}

export interface Address {
  addressLine: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  country: string;

}

export abstract class CompaniesData {
  abstract get gridDataSource(): DataSource;
  abstract list(pageNumber: number, pageSize: number): Observable<Companies[]>;
  abstract get(id: number): Observable<Companies>;
  abstract update(company: Companies): Observable<Companies>;
  abstract create(company: Companies): Observable<Companies>;
  abstract delete(id: number): Observable<boolean>;
}
