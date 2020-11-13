/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NbMenuItem } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {UserStore} from '@core/stores/user.store';
import {ROLES} from '../@auth/roles';

@Injectable()
export class PagesMenu {
  constructor(private userStrore: UserStore) {
  }


  getMenu(): Observable<NbMenuItem[]> {
    const currentUser = this.userStrore.getUser();
    let menu: NbMenuItem[];

    if (currentUser.role === ROLES.ADMIN) {
       menu = [
         {
           title: 'Dashboard',
           icon: 'pie-chart-outline',
           link: '/pages/dashboard',
           home: true,
           children: undefined,
         },
         {
           title: 'Users',
           icon: 'person-outline',
           link: '/pages/users/viewAll',
           children: undefined,
         },
         {
           title: 'Companies',
           icon: 'briefcase-outline',
           link: '/pages/companies/view',
           children: undefined,
         },
       ];
    } else if (currentUser.role === ROLES.USER) {
       menu = [
        {
          title: 'Dashboard',
          icon: 'pie-chart-outline',
          link: '/pages/dashboard',
          home: true,
          children: undefined,
        },
        {
          title: 'Products',
          icon: 'layers-outline',
          link: '/pages/products/view',
          children: undefined,
        },
        {
          title: 'Batches',
          icon: 'keypad-outline',
          link: '/pages/batches/view',
          children: undefined,
        },
        {
          title: 'Reports',
          icon: 'link-outline',
          link: '/pages/products/view',
          children: [
            {
              title: 'EPCIS - XLS to Tracelink',
              link: '/pages/epcis/export',
              children: undefined,
            },
          ],
        },
      ];
    } else {
      menu = [
        {
          title: 'Dashboard',
          icon: 'pie-chart-outline',
          link: '/pages/dashboard',
          home: true,
          children: undefined,
        },
      ];
    }

    return of([...menu]);
  }
}
