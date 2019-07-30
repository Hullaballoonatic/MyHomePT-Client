import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexdotComponent } from './flexdot.component';

describe('FlexdotComponent', () => {
  let component: FlexdotComponent;
  let fixture: ComponentFixture<FlexdotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexdotComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexdotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
