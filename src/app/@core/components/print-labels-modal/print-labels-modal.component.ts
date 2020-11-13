import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'ngx-print-batch-modal',
    templateUrl: './print-labels-modal.component.html',
    styleUrls: ['./print-labels-modal.component.scss'],
})
export class PrintLabelsModalComponent implements OnInit {

    public form: FormGroup;

    constructor(private fb: FormBuilder, protected ref: NbDialogRef<PrintLabelsModalComponent>) {
        this.form = this.fb.group({
            total: [null, Validators.required],
            type: [null, Validators.required],
        });
    }

    ngOnInit() {
    }

    cancel() {
        this.ref.close(null);
    }

    submit() {
        if (!this.form.valid) {
            return;
        }
        this.ref.close(this.form.value);
    }

}
