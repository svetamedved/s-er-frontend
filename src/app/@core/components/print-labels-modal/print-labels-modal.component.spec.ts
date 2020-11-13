import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintLabelsModalComponent } from './print-labels-modal.component';

describe('PrintLabelsModalComponent', () => {
  let component: PrintLabelsModalComponent;
  let fixture: ComponentFixture<PrintLabelsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintLabelsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintLabelsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
