/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EpcisComponent } from './epcis.component';
import { EpcisExportComponent } from './epcis-export/epcis-export.component';

const routes: Routes = [
  {
    path: '',
    component: EpcisComponent,
    children: [
      {
        path: 'export',
        component: EpcisExportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class EpcisRoutingModule {
}

