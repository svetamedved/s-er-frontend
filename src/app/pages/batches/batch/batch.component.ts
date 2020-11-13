import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { NbDateService, NbDialogService, NbToastrService, NbWindowService } from '@nebular/theme';

import { Batches } from '@core/interfaces/common/batches';
import { BatchesService } from '@core/backend/common/services/batches.service';
import { Products } from '@core/interfaces/common/products';
import { ProductsService } from '@core/backend/common/services/products.service';
import { PrintLabelsModalComponent } from '@core/components/print-labels-modal/print-labels-modal.component';

export enum BatchFormMode {
    VIEW = 'View',
    EDIT = 'Edit',
    ADD = 'Add',
}

@Component({
    selector: 'ngx-batch',
    templateUrl: './batch.component.html',
    styleUrls: ['./batch.component.scss'],
})
export class BatchComponent implements OnInit, OnDestroy {
    batch: any = null;
    batchForm: FormGroup;
    products: Products[];
    min: Date;
    batchItems: any;
    fileLinks: any;

    protected readonly unsubscribe$ = new Subject<void>();

    get expDate() {
        return this.batchForm.get('expDate');
    }

    get lot() {
        return this.batchForm.get('lot');
    }

    get productId() {
        return this.batchForm.get('productId');
    }

    mode: BatchFormMode;

    setViewMode(viewMode: BatchFormMode) {
        this.mode = viewMode;
    }

    constructor(private batchesService: BatchesService,
                private productsService: ProductsService,
                protected dateService: NbDateService<Date>,
                private router: Router,
                private route: ActivatedRoute,
                private toasterService: NbToastrService,
                private fb: FormBuilder,
                private dialogService: NbDialogService) {
        this.min = this.dateService.addDay(this.dateService.today(), -1);
    }

    ngOnInit(): void {
        this.initBatchForm();
        this.loadProducts();
    }

    loadProducts() {
        this.productsService.list().subscribe(products => {
            this.products = products;
            this.loadBatchData();
        });
    }

    initBatchForm() {
        this.batchForm = this.fb.group({
            _id: this.fb.control(''),
            lot: this.fb.control(''),
            expDate: this.fb.control(''),
            productId: this.fb.control(''),
        });
    }

    get canEdit(): boolean {
        return this.mode !== BatchFormMode.VIEW;
    }

    loadBatchData() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.setViewMode(BatchFormMode.VIEW);
            this.loadBatch(id);
            this.loadItems(id);
            return;
        }
        this.setViewMode(BatchFormMode.ADD);
    }

    loadItems(id) {
        this.batchesService.listItems(id).subscribe(items => {
            this.batchItems = items;
        });
    }

    loadBatch(id?) {
        const loadProduct = this.batchesService.get(id);
        loadProduct
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((product) => {
                this.batch = product;
                this.batchForm.patchValue({
                    _id: product._id ? product._id : '',
                    lot: product.lot ? product.lot : '',
                    expDate: product.expDate ? product.expDate : '',
                    productId: product.productId ? product.productId : '',
                });

                // this is a place for value changes handling
                // this.userForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {   });
            });
    }

    openPrintBatchModal() {
        const modal = this.dialogService.open(PrintLabelsModalComponent);
        let type = null;
        modal.onClose
            .pipe(
                takeUntil(this.unsubscribe$),
                filter((formValue: any) => {
                    return formValue && formValue.hasOwnProperty('total') && formValue.hasOwnProperty('type');
                }),
                switchMap((formValue: { total: any, type: any }) => {
                    type = formValue.type;
                    const id = this.route.snapshot.paramMap.get('id');
                    return this.batchesService.exportToPrintItem(id, formValue.total);
                }),
            )
            .subscribe((link: Array<any>) => {

                window.open(link[type === 'case' ? 0 : 1].Location, '_blank');
            });
    }

    convertToBatches(value: any): Batches {
        const batches: Batches = value;
        return batches;
    }

    save() {
        const batches: Batches = this.convertToBatches(this.batchForm.value);
        let observable = new Observable<Batches>();
        observable = batches._id
            ? this.batchesService.update(batches)
            : this.batchesService.create(batches);

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
        this.toasterService.success('', `Item ${this.mode === BatchFormMode.ADD ? 'created' : 'updated'}!`);
        // this.router.navigate(['/pages/batches/view']);
    }

    handleWrongResponse() {
        this.toasterService.danger('', `Error adding batch`);
    }

    back() {
        this.router.navigate(['/pages/batches/view']);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
