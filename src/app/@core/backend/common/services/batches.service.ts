import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { BatchesData, Batches } from '@core/interfaces/common/batches';
import { BatchesApi } from '../api/batches.api';

@Injectable()
export class BatchesService extends BatchesData {
    constructor(private api: BatchesApi) {
        super();
    }

    get gridDataSource(): DataSource {
        return this.api.batchesDataSource;
    }

    list(pageNumber: number = 1, pageSize: number = 10): Observable<Batches[]> {
        return this.api.list(pageNumber, pageSize);
    }

    listItems(id: number): Observable<any> {
        return this.api.listItems(id);
    }

    get(id: number): Observable<Batches> {
        return this.api.get(id);
    }

    create(batches: any): Observable<Batches> {
        delete batches._id;
        return this.api.add(batches);
    }

    update(batches): Observable<Batches> {
        return this.api.update(batches);
    }

    delete(id: number): Observable<boolean> {
        return this.api.delete(id);
    }

    exportToPrintPalette(id) {
        return this.api.exportToPrintPalette(id);
    }

    exportToPrintCase(id) {
        return this.api.exportToPrintCase(id);
    }

    exportToPrintItem(id, total: number) {
        return this.api.exportToPrintItem(id, total);
    }
}
