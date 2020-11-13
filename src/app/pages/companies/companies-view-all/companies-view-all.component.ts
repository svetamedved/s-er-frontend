import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompaniesService } from '@core/backend/common/services/companies.service';


@Component({
    selector: 'ngx-companies-view',
    templateUrl: './companies-view-all.component.html',
    styleUrls: ['./companies-view-all.component.scss'],
})
export class CompaniesViewAllComponent implements OnInit {
    companyList: any;

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
            companyName: {
                title: 'Company Name',
                type: 'string',
            },
        },
    };

    constructor(private companiesService: CompaniesService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.companiesService.list().subscribe(companies => {
            this.companyList = companies;
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
        this.router.navigate([`/pages/companies/edit/${event.data._id}`]);
    }

    onRowSelect(event): void {
        this.router.navigate([`/pages/companies/edit/${event.data._id}`]);
    }

    navigateToAddNewCompany(): void {
        this.router.navigate(['/pages/companies/add']);
    }

}
