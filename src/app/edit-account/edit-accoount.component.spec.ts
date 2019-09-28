import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccoountComponent } from './edit-accoount.component';

describe('EditAccoountComponent', () => {
  let component: EditAccoountComponent;
  let fixture: ComponentFixture<EditAccoountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAccoountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccoountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
