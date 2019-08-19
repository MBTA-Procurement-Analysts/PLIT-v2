import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqPrintingComponent } from './req-printing.component';

describe('ReqPrintingComponent', () => {
  let component: ReqPrintingComponent;
  let fixture: ComponentFixture<ReqPrintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqPrintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
