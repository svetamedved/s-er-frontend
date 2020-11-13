/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import {UsersViewAllComponent} from './users-view-all/users-view-all.component';

import {AdminGuard, UserGuard} from '../../@auth/admin.guard';

const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [
    {
      path: 'edit/:id',
      canActivate: [AdminGuard],
      component: UserComponent,
    },
    {
      path: 'current',
      canActivate: [UserGuard],
      component: UserComponent,
    },
    {
      path: 'add',
      canActivate: [AdminGuard],
      component: UserComponent,
    },
    {
      path: 'viewAll',
      canActivate: [AdminGuard],
      component: UsersViewAllComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {

}
