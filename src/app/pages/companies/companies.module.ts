/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { CompaniesRoutingModule } from './companies-routing.module';
import { AuthModule } from '../../@auth/auth.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

// components
import { CompaniesComponent } from './companies.component';
import { CompanyComponent } from './company/company.component';
import { ComponentsModule } from '../../@components/components.module';
import { CompaniesViewAllComponent } from './companies-view-all/companies-view-all.component';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbSpinnerModule,
  NbDatepickerModule,
} from '@nebular/theme';

const  NB_MODULES = [
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbSpinnerModule,
  NbDatepickerModule,
  NbInputModule,
  AutocompleteLibModule,
];

@NgModule({
  imports: [
    ThemeModule,
    AuthModule,
    Ng2SmartTableModule,
    CompaniesRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    ...NB_MODULES,
  ],
  declarations: [
    CompaniesComponent,
    CompanyComponent,
    CompaniesViewAllComponent,
  ],
  entryComponents: [
  ],
  providers: [],
})
export class CompaniesModule { }
