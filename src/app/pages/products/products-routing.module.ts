/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import {UserGuard} from '../../@auth/admin.guard';
import {ProductViewAllComponent} from './product-view-all/product-view-all.component';

const routes: Routes = [{
  path: '',
  component: ProductsComponent,
  children: [
    {
      path: 'view',
      canActivate: [UserGuard],
      component: ProductViewAllComponent,
    },
    {
      path: 'view/:id',
      canActivate: [UserGuard],
      component: ProductComponent,
    },
    {
      path: 'edit/:id',
      canActivate: [UserGuard],
      component: ProductComponent,
    },
    {
      path: 'add',
      canActivate: [UserGuard],
      component: ProductComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {

}
