/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserData } from '@core/interfaces/common/users';
import { UsersService } from './services/users.service';
import { UsersApi } from './api/users.api';
import { HttpService } from './api/http.service';
import { CountryData } from '@core/interfaces/common/countries';
import { CountriesService } from './services/countries.service';
import { CountriesApi } from './api/countries.api';
import { SettingsApi } from './api/settings.api';
import { NbAuthModule } from '@nebular/auth';
import { SettingsData } from '@core/interfaces/common/settings';
import { SettingsService } from './services/settings.service';
import { ProductsData } from '@core/interfaces/common/products';
import { ProductsService } from './services/products.service';
import { ProductsApi } from './api/products.api';
import { CompaniesData } from '../../interfaces/common/companies';
import { CompaniesService } from './services/companies.service';
import { CompaniesApi } from './api/companies.api';
import { SerializedService } from './services/serialized.service';
import { SerializedApi } from './api/serialized.api';
import { SerializedData } from '@core/interfaces/common/serialized';
import { BatchesData } from '@core/interfaces/common/batches';
import { BatchesService } from './services/batches.service';
import { BatchesApi } from './api/batches.api';

const API = [UsersApi, CountriesApi, SettingsApi, ProductsApi, CompaniesApi, HttpService, SerializedApi, BatchesApi];

const SERVICES = [
    { provide: UserData, useClass: UsersService },
    { provide: CountryData, useClass: CountriesService },
    { provide: SettingsData, useClass: SettingsService },
    { provide: ProductsData, useClass: ProductsService },
    { provide: CompaniesData, useClass: CompaniesService },
    { provide: SerializedData, useClass: SerializedService },
    { provide: BatchesData, useClass: BatchesService },
];

@NgModule({
    imports: [CommonModule, NbAuthModule],
})
export class CommonBackendModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: CommonBackendModule,
            providers: [
                ...API,
                ...SERVICES,
            ],
        };
    }
}
