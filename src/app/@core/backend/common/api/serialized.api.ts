import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class SerializedApi {
    private readonly apiControlelr: string = 'serialized';

    constructor(private api: HttpService) {
    }

    uploadxls(form: any): Observable<any> {
        return this.api.post(`${this.apiControlelr}/xls`, form);
    }
}
