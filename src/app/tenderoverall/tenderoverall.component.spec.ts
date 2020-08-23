/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TenderoverallComponent } from './tenderoverall.component';

describe('TenderoverallComponent', () => {
  let component: TenderoverallComponent;
  let fixture: ComponentFixture<TenderoverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderoverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderoverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
