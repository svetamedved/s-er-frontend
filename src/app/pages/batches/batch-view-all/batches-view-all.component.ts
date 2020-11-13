import { Component, OnInit } from '@angular/core';

import { BatchesService } from '@core/backend/common/services/batches.service';
import { Router } from '@angular/router';


@Component({
    selector: 'ngx-product-view',
    templateUrl: './batches-view-all.component.html',
    styleUrls: ['./batches-view-all.component.scss'],
})
export class BatchesViewAllComponent implements OnInit {
    batchList: any;

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
            lot: {
                title: 'Lot',
                type: 'string',
            },
        },
    };

    constructor(private batchService: BatchesService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.batchService.list().subscribe(batches => {
            this.batchList = batches;
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
        this.router.navigate([`/pages/batches/edit/${event.data._id}`]);
    }

    onRowSelect(event): void {
        this.router.navigate([`/pages/batches/view/${event.data._id}`]);
    }
}
