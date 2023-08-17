import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSuperSelectComponent } from './ngx-super-select.component';

describe('NgxSuperSelectComponent', () => {
  let component: NgxSuperSelectComponent;
  let fixture: ComponentFixture<NgxSuperSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxSuperSelectComponent]
    });
    fixture = TestBed.createComponent(NgxSuperSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
