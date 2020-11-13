import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from '@core/backend/common/services/products.service';
import { NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs/Subject';
import { Companies } from '@core/interfaces/common/companies';
import { Products } from '@core/interfaces/common/products';
import { UserStore } from '@core/stores/user.store';
import { SerializedService } from '@core/backend/common/services/serialized.service';

@Component({
    selector: 'ngx-epcis-export',
    styleUrls: ['./epcis-export.component.scss'],
    templateUrl: './epcis-export.component.html',
})
export class EpcisExportComponent implements OnInit, OnDestroy {
    epcisForm: FormGroup;
    productSelected: string;
    products: Products[];
    receiverSelected: string;
    receivingCompanies: Companies[];
    selectedFile: any;
    fileLinks: any;

    protected readonly unsubscribe$ = new Subject<void>();

    constructor(private productsService: ProductsService,
                private serializedService: SerializedService,
                private toasterService: NbToastrService,
                private userStore: UserStore,
                private fb: FormBuilder) {
    }

    uploadFile() {
        if (typeof this.selectedFile === 'undefined') return;
        const formData: FormData = new FormData();
        formData.append('files', this.selectedFile, this.selectedFile.name);
        formData.append('receiver', this.receiverSelected);
        formData.append('product', this.productSelected);
        formData.append('po', this.epcisForm.get('po').value);

        this.serializedService.uploadxls(formData).subscribe(data => {
            this.toasterService.success('Files Created!');
            this.fileLinks = data;
        }, error => {
            this.toasterService.danger(error);
        });
    }

    setFile(files: FileList) {
        this.selectedFile = files.item(0);
    }

    ngOnInit(): void {
        this.productsService.list().subscribe(products => {
            this.products = products;
        });
        this.receivingCompanies = this.userStore.getUser().company.attached;
        this.epcisForm = this.fb.group({
            _id: this.fb.control(''),
            po: this.fb.control(''),
            productName: this.fb.control(''),
            receiver: this.fb.control(''),
            file: this.fb.control(''),
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
