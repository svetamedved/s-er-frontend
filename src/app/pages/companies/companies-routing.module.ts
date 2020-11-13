/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompaniesComponent } from './companies.component';
import { AdminGuard } from '../../@auth/admin.guard';
import {CompaniesViewAllComponent} from './companies-view-all/companies-view-all.component';
import {CompanyComponent} from './company/company.component';

const routes: Routes = [{
  path: '',
  component: CompaniesComponent,
  children: [
    {
      path: 'view',
      canActivate: [AdminGuard],
      component: CompaniesViewAllComponent,
    },
    {
      path: 'edit/:id',
      canActivate: [AdminGuard],
      component: CompanyComponent,
    },
    {
      path: 'add',
      canActivate: [AdminGuard],
      component: CompanyComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesRoutingModule {

}
