import { Injectable } from '@angular/core';
import { Products } from '../interfaces/common/products';

@Injectable({
    providedIn: 'root',
})
export class ProductsStore {
    private product: Products;

    constructor() {
    }

    getProduct(): Products {
        return this.product;
    }

    setUser(paramProduct: Products) {
        this.product = paramProduct;
    }
}
