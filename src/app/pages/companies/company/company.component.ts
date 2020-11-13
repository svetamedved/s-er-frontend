import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {
    catchError,
    debounceTime,
    distinctUntilChanged,
    filter,
    switchMap,
    takeUntil,
} from 'rxjs/operators';

import { NbToastrService } from '@nebular/theme';

import { CompaniesService } from '@core/backend/common/services/companies.service';
import { Companies } from '@core/interfaces/common/companies';

export enum CompanyFormMode {
    VIEW = 'View',
    EDIT = 'Edit',
    ADD = 'Add',
}

@Component({
    selector: 'ngx-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit, OnDestroy {
    companyForm: FormGroup;

    protected readonly unsubscribe$ = new Subject<void>();
    public filteredSenderOptions$: Observable<any> = of([]);
    public filteredReceiverOptions$: Observable<any> = of([]);

    get companyName() {
        return this.companyForm.get('companyName');
    }

    get gln() {
        return this.companyForm.get('gln');
    }

    get addressLine() {
        return this.companyForm.get('addressLine');
    }

    get addressLine2() {
        return this.companyForm.get('addressLine2');
    }

    get city() {
        return this.companyForm.get('city');
    }

    get state() {
        return this.companyForm.get('state');
    }

    get zip() {
        return this.companyForm.get('zip');
    }

    get country() {
        return this.companyForm.get('country');
    }

    get sender() {
        return this.companyForm.get('sender');
    }

    get receiver() {
        return this.companyForm.get('receiver');
    }

    mode: CompanyFormMode;

    setViewMode(viewMode: CompanyFormMode) {
        this.mode = viewMode;
    }

    constructor(private companyService: CompaniesService,
                private router: Router,
                private route: ActivatedRoute,
                private toasterService: NbToastrService,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.initCompaniesForm();
        this.loadCompaniesData();
        this.filteredReceiverOptions$ = this.getCompanyFilterFunc('receiver');
        this.filteredSenderOptions$ = this.getCompanyFilterFunc('sender');
    }

    initCompaniesForm() {
        this.companyForm = this.fb.group({
            _id: [null],
            companyName: [null],
            gln: [null],
            address: this.fb.group({
                addressLine: [null],
                addressLine2: [null],
                city: [null],
                state: [null],
                zip: [null],
                country: [null],
            }),
            sender: [null],
            receiver: [null],
        });
    }

    get canEdit(): boolean {
        return this.mode !== CompanyFormMode.VIEW;
    }


    loadCompaniesData() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.setViewMode(CompanyFormMode.EDIT);
            this.loadCompany(id);
            return;
        }
        this.setViewMode(CompanyFormMode.ADD);
    }

    loadCompany(id?) {
        this.companyService.get(id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((company) => {
                const sender = company.attached.sender || {};
                const receiver = company.attached.receiver || {};
                sender.toString = receiver.toString = function (): string {
                    return this.companyName || '';
                };

                this.companyForm.setValue({
                    _id: company._id ? company._id : '',
                    companyName: company.companyName ? company.companyName : '',
                    gln: company.gln ? company.gln : '',
                    address: {
                        addressLine: company.address.addressLine ? company.address.addressLine : '',
                        addressLine2: company.address.addressLine2 ? company.address.addressLine2 : '',
                        city: company.address.city ? company.address.city : '',
                        state: company.address.state ? company.address.state : '',
                        zip: company.address.zip ? company.address.zip : '',
                        country: company.address.country ? company.address.country : '',
                    },
                    sender: sender,
                    receiver: receiver,
                });
                this.companyForm.get('sender').patchValue(company.attached.sender);
                // this is a place for value changes handling
                // this.userForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {   });
            });
    }


    convertToCompany(value: any): Companies {
        const companies: Companies = value;
        return companies;
    }

    save() {
        const companies: Companies = this.convertToCompany(this.getPayload());

        let observable = new Observable<Companies>();
        observable = companies._id
            ? this.companyService.update(companies)
            : this.companyService.create(companies);

        observable
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                    this.handleSuccessResponse();
                },
                err => {
                    this.handleWrongResponse();
                });
    }

    private getPayload(): any {
        const payload: any = ['_id', 'companyName', 'gln', 'address']
            .reduce((obj, key) => ({ ...obj, [key]: this.companyForm.value[key] }), {});

        payload.attached = {
            sender: (this.companyForm.get('sender').value || {})['_id'] || null,
            receiver: (this.companyForm.get('receiver').value || {})['_id'] || null,
        };

        return payload;
    }

    handleSuccessResponse() {
        this.toasterService.success('', `Item ${this.mode === CompanyFormMode.ADD ? 'created' : 'updated'}!`);
        this.router.navigate(['/pages/companies/view']);
    }

    handleWrongResponse() {
        this.toasterService.danger('', `Error adding product`);
    }

    back() {
        this.router.navigate(['/pages/companies/view']);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    private filterCompanies(value): Observable<any> {
        return this.companyService.list({ companyName: value, pageSize: 5 });
    }

    private getCompanyFilterFunc(formControlName) {
        return this.companyForm.get(formControlName).valueChanges
            .pipe(
                debounceTime(1000),
                distinctUntilChanged(),
                filter(value => typeof value === 'string' && value.trim().length > 2),
                switchMap(filterString => this.filterCompanies(filterString).pipe(catchError(error => of([])))),
            );
    }
}
