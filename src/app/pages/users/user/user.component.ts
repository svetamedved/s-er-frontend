import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { NbToastrService } from '@nebular/theme';

import { User } from '@core/interfaces/common/users';
import { EMAIL_PATTERN, NUMBERS_PATTERN } from '../../../@auth/components';
import { NbAuthOAuth2JWTToken, NbTokenService } from '@nebular/auth';
import { UserStore } from '@core/stores/user.store';
import { UsersService } from '@core/backend/common/services/users.service';
import { CompaniesService } from '@core/backend/common/services/companies.service';

export enum UserFormMode {
    VIEW = 'View',
    EDIT = 'Edit',
    ADD = 'Add',
    EDIT_SELF = 'EditSelf',
}

@Component({
    selector: 'ngx-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
    userForm: FormGroup;
    companies: any;
    selectedCompany: any;

    protected readonly unsubscribe$ = new Subject<void>();

    get firstName() {
        return this.userForm.get('firstName');
    }

    get lastName() {
        return this.userForm.get('lastName');
    }

    get login() {
        return this.userForm.get('login');
    }

    get email() {
        return this.userForm.get('email');
    }

    get age() {
        return this.userForm.get('age');
    }

    mode: UserFormMode;

    setViewMode(viewMode: UserFormMode) {
        this.mode = viewMode;
    }

    constructor(private usersService: UsersService,
                private companiesService: CompaniesService,
                private router: Router,
                private route: ActivatedRoute,
                private tokenService: NbTokenService,
                private userStore: UserStore,
                private toasterService: NbToastrService,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.initUserForm();
        this.loadUserData();
    }

    initUserForm() {
        const id = this.route.snapshot.paramMap.get('id');
        this.userForm = this.fb.group({
            id: this.fb.control(''),
            company: id !== 'undefined'
                ? this.fb.group({
                    companyName: this.fb.control(''),
                    _id: this.fb.control(''),
                })
                : this.fb.control(''),
            role: this.fb.control('user'),
            firstName: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20)]),
            lastName: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20)]),
            login: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
            age: this.fb.control('', [Validators.required, Validators.min(1),
                Validators.max(120), Validators.pattern(NUMBERS_PATTERN)]),
            email: this.fb.control('', [
                Validators.required,
                Validators.pattern(EMAIL_PATTERN),
            ]),
        });
    }

    get canEdit(): boolean {
        return this.mode !== UserFormMode.VIEW;
    }


    loadUserData() {
        const id = this.route.snapshot.paramMap.get('id');
        const isProfile = this.route.snapshot.queryParamMap.get('profile');
        if (isProfile) {
            this.setViewMode(UserFormMode.EDIT_SELF);
            this.loadUser();
        } else {
            if (id) {
                const currentUserId = this.userStore.getUser().id;
                this.setViewMode(currentUserId.toString() === id ? UserFormMode.EDIT_SELF : UserFormMode.EDIT);
                this.loadUser(id);
            } else {
                this.setViewMode(UserFormMode.ADD);
                this.loadCompanies();
            }
        }
    }

    loadCompanies() {
        this.companiesService.list().subscribe(companies => {
            this.companies = companies;
        });
    }

    loadUser(id?) {
        const loadUser = this.mode === UserFormMode.EDIT_SELF
            ? this.usersService.getCurrentUser() : this.usersService.get(id);
        loadUser
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((user) => {
                this.userForm.setValue({
                    id: user.id ? user.id : '',
                    role: user.role ? user.role : '',
                    company: {
                        _id: user.company && user.company._id ? user.company._id : '',
                        companyName: user.company && user.company.companyName ? user.company.companyName : '',
                    },
                    firstName: user.firstName ? user.firstName : '',
                    lastName: user.lastName ? user.lastName : '',
                    login: user.login ? user.login : '',
                    age: user.age ? user.age : '',
                    email: user.email,
                });

                // this is a place for value changes handling
                // this.userForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {   });
            });
    }


    convertToUser(value: any): User {
        const user: User = value;
        return user;
    }

    save() {
        const user: User = this.convertToUser(this.userForm.value);
        let observable = new Observable<User>();
        if (this.mode === UserFormMode.EDIT_SELF) {
            this.usersService.updateCurrent(user).subscribe((result: any) => {
                    this.tokenService.set(new NbAuthOAuth2JWTToken(result, 'email', new Date()));
                    this.handleSuccessResponse();
                },
                err => {
                    this.handleWrongResponse(err);
                });
        } else {
            observable = user.id
                ? this.usersService.update(user)
                : this.usersService.create(user);
        }

        observable
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                    this.handleSuccessResponse();
                },
                err => {
                    this.handleWrongResponse(err);
                });
    }

    handleSuccessResponse() {
        this.toasterService.success('', `Item ${this.mode === UserFormMode.ADD ? 'created' : 'updated'}!`);
    }

    handleWrongResponse(err) {
        this.toasterService.danger('', `${JSON.stringify(err)}`);
    }

    back() {
        this.router.navigate(['/pages/users/viewAll']);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
