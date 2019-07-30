import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevPage } from './dev.page';

describe('DevPage', () => {
  let component: DevPage;
  let fixture: ComponentFixture<DevPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
