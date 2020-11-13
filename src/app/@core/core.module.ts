/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule } from '@nebular/auth';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
    AnalyticsService,
    LayoutService,
    PlayerService,
    StateService,
} from './utils';

import { CommonBackendModule } from './backend/common/common-backend.module';
import { CommonMockModule } from './mock/common/common-mock.module';
import { EcommerceMockModule } from './mock/ecommerce/ecommerce-mock.module';
import { IotMockModule } from './mock/iot/iot-mock.module';
import { UserStore } from './stores/user.store';
import { UsersService } from './backend/common/services/users.service';
import { SettingsService } from './backend/common/services/settings.service';
import { InitUserService } from '../@theme/services/init-user.service';
import { ProductsService } from './backend/common/services/products.service';
import { ProductsStore } from './stores/products.store';
import { CompaniesService } from './backend/common/services/companies.service';
import { SerializedService } from './backend/common/services/serialized.service';
import { BatchesService } from './backend/common/services/batches.service';
import { PrintLabelsModalComponent } from './components/print-labels-modal/print-labels-modal.component';
import { NbButtonModule, NbCardModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

const COMPONENTS = [PrintLabelsModalComponent];

export const NB_CORE_PROVIDERS = [
    ...CommonMockModule.forRoot().providers,
    ...CommonBackendModule.forRoot().providers,

    ...EcommerceMockModule.forRoot().providers,
    ...IotMockModule.forRoot().providers,

    AnalyticsService,
    LayoutService,
    PlayerService,
    StateService,
];

@NgModule({
    imports: [
        CommonModule,
        NbCardModule,
        ReactiveFormsModule,
        NbSelectModule,
        NbButtonModule,
        NbInputModule,
        NgxMaskModule.forRoot(),
    ],
    exports: [
        NbAuthModule,
    ],
    declarations: [...COMPONENTS],
    entryComponents: [PrintLabelsModalComponent],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: CoreModule,
            providers: [
                ...NB_CORE_PROVIDERS,
                UserStore,
                UsersService,
                InitUserService,
                SettingsService,
                ProductsStore,
                ProductsService,
                CompaniesService,
                SerializedService,
                BatchesService,
            ],
        };
    }
}
