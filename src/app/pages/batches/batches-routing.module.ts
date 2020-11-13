/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BatchesComponent } from './batches.component';
import { BatchComponent } from './batch/batch.component';
import {UserGuard} from '../../@auth/admin.guard';
import {BatchesViewAllComponent} from './batch-view-all/batches-view-all.component';

const routes: Routes = [{
  path: '',
  component: BatchesComponent,
  children: [
    {
      path: 'view',
      canActivate: [UserGuard],
      component: BatchesViewAllComponent,
    },
    {
      path: 'view/:id',
      canActivate: [UserGuard],
      component: BatchComponent,
    },
    {
      path: 'edit/:id',
      canActivate: [UserGuard],
      component: BatchComponent,
    },
    {
      path: 'add',
      canActivate: [UserGuard],
      component: BatchComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatchesRoutingModule {

}
