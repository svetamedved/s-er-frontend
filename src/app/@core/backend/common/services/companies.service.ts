import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Companies, CompaniesData } from '@core/interfaces/common/companies';
import { CompaniesApi } from '../api/companies.api';

@Injectable()
export class CompaniesService extends CompaniesData {
    constructor(private api: CompaniesApi) {
        super();
    }

    get gridDataSource(): DataSource {
        return this.api.companiesDataSource;
    }

    list(params: any = {}): Observable<Companies[]> {
        return this.api.list({ ...{ pageNumber: 1, pageSize: 10 }, ...params });
    }

    listAttached(): Observable<Companies[]> {
        return this.api.listAttached();
    }

    get(id: number): Observable<Companies> {
        return this.api.get(id);
    }

    create(companies: any): Observable<Companies> {
        return this.api.add(companies);
    }

    update(companies): Observable<Companies> {
        return this.api.update(companies);
    }

    delete(id: number): Observable<boolean> {
        return this.api.delete(id);
    }
}
