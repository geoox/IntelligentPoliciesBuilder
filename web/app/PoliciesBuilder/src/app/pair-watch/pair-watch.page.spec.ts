import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairWatchPage } from './pair-watch.page';

describe('PairWatchPage', () => {
  let component: PairWatchPage;
  let fixture: ComponentFixture<PairWatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairWatchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairWatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
