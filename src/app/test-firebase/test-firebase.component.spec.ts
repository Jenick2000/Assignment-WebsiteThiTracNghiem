import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFirebaseComponent } from './test-firebase.component';

describe('TestFirebaseComponent', () => {
  let component: TestFirebaseComponent;
  let fixture: ComponentFixture<TestFirebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFirebaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
