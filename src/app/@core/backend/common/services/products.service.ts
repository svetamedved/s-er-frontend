import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { ProductsData, Products } from '@core/interfaces/common/products';
import { ProductsApi } from '../api/products.api';

@Injectable()
export class ProductsService extends ProductsData {
    constructor(private api: ProductsApi) {
        super();
    }

    get gridDataSource(): DataSource {
        return this.api.productsDataSource;
    }

    list(pageNumber: number = 1, pageSize: number = 10): Observable<Products[]> {
        return this.api.list(pageNumber, pageSize);
    }

    get(id: number): Observable<Products> {
        return this.api.get(id);
    }

    create(products: any): Observable<Products> {
        delete products._id;
        return this.api.add(products);
    }

    update(products): Observable<Products> {
        return this.api.update(products);
    }

    delete(id: number): Observable<boolean> {
        return this.api.delete(id);
    }
}
