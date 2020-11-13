import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SerializedApi } from '../api/serialized.api';

@Injectable()
export class SerializedService {
    constructor(private api: SerializedApi) {
    }

    uploadxls(form): Observable<any> {
        return this.api.uploadxls(form);
    }
}
