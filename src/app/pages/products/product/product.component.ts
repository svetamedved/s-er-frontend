import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { NbToastrService } from '@nebular/theme';

import { ProductsService } from '@core/backend/common/services/products.service';
import { Products } from '@core/interfaces/common/products';

export enum ProductsFormMode {
    VIEW = 'View',
    EDIT = 'Edit',
    ADD = 'Add',
}

@Component({
    selector: 'ngx-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
    productForm: FormGroup;

    protected readonly unsubscribe$ = new Subject<void>();

    get productName() {
        return this.productForm.get('productName');
    }

    get caseGTIN() {
        return this.productForm.get('caseGTIN');
    }

    get productGTIN() {
        return this.productForm.get('productGTIN');
    }

    get amountPerCase() {
        return this.productForm.get('amountPerCase');
    }

    get lot() {
        return this.productForm.get('lot');
    }

    get expDate() {
        return this.productForm.get('expDate');
    }

    get manufacturer() {
        return this.productForm.get('manufacturer');
    }

    get dosageFormType() {
        return this.productForm.get('dosageFormType');
    }

    get strengthDescription() {
        return this.productForm.get('strengthDescription');
    }

    mode: ProductsFormMode;

    setViewMode(viewMode: ProductsFormMode) {
        this.mode = viewMode;
    }

    constructor(private productsService: ProductsService,
                private router: Router,
                private route: ActivatedRoute,
                private toasterService: NbToastrService,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.initProductForm();
        this.loadProductData();
    }

    initProductForm() {
        this.productForm = this.fb.group({
            _id: this.fb.control(''),
            productName: this.fb.control(''),
            productGTIN: this.fb.control(''),
            manufacturer: this.fb.control(''),
            dosageFormType: this.fb.control(''),
            strengthDescription: this.fb.control(''),
            amountPerCase: this.fb.control(''),
            netContentDescription: this.fb.control(''),
        });
    }

    get canEdit(): boolean {
        return this.mode !== ProductsFormMode.VIEW;
    }


    loadProductData() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.setViewMode(ProductsFormMode.EDIT);
            this.loadProduct(id);
        } else {
            this.setViewMode(ProductsFormMode.ADD);
        }
    }

    loadProduct(id?) {
        const loadProduct = this.productsService.get(id);
        loadProduct
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((product) => {
                this.productForm.setValue({
                    _id: product._id ? product._id : '',
                    productName: product.productName ? product.productName : '',
                    productGTIN: product.productGTIN ? product.productGTIN : '',
                    manufacturer: product.manufacturer ? product.manufacturer : '',
                    dosageFormType: product.dosageFormType ? product.dosageFormType : '',
                    strengthDescription: product.strengthDescription ? product.strengthDescription : '',
                    amountPerCase: product.amountPerCase ? product.amountPerCase : '',
                    netContentDescription: product.netContentDescription ? product.netContentDescription : '',
                });

                // this is a place for value changes handling
                // this.userForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {   });
            });
    }


    convertToProducts(value: any): Products {
        const products: Products = value;
        return products;
    }

    save() {
        const products: Products = this.convertToProducts(this.productForm.value);

        let observable = new Observable<Products>();
        observable = products._id
            ? this.productsService.update(products)
            : this.productsService.create(products);

        observable
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                    this.handleSuccessResponse();
                },
                err => {
                    this.handleWrongResponse();
                });
    }

    handleSuccessResponse() {
        this.toasterService.success('', `Item ${this.mode === ProductsFormMode.ADD ? 'created' : 'updated'}!`);
        this.router.navigate(['/pages/products/view']);
    }

    handleWrongResponse() {
        this.toasterService.danger('', `Error adding product`);
    }

    back() {
        this.router.navigate(['/pages/products/view']);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
