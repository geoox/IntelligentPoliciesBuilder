import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstUsePage } from './first-use.page';

describe('FirstUsePage', () => {
  let component: FirstUsePage;
  let fixture: ComponentFixture<FirstUsePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstUsePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstUsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
