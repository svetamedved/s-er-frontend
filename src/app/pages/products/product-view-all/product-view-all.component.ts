/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnInit } from '@angular/core';

import { ProductsService } from '@core/backend/common/services/products.service';
import { Router } from '@angular/router';


@Component({
    selector: 'ngx-product-view',
    templateUrl: './product-view-all.component.html',
    styleUrls: ['./product-view-all.component.scss'],
})
export class ProductViewAllComponent implements OnInit {
    productList: any;

    settings = {
        mode: 'external',
        hideSubHeader: true,
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            _id: {
                title: 'Id',
                type: 'string',
            },
            productName: {
                title: 'Product Name',
                type: 'string',
            },
            amountPerCase: {
                title: 'Amount per case',
                type: 'string',
            },
        },
    };

    constructor(private productsService: ProductsService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.productsService.list().subscribe(products => {
            this.productList = products;
        });
    }

    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

    onEditClick(event): void {
        this.router.navigate([`/pages/products/edit/${event.data._id}`]);
    }

    onRowSelect(event): void {
        this.router.navigate([`/pages/products/view/${event.data._id}`]);
    }
}
