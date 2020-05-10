import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceModel } from './service.component';

describe('ServiceModel', () => {
  let component: ServiceModel;
  let fixture: ComponentFixture<ServiceModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceModel ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
