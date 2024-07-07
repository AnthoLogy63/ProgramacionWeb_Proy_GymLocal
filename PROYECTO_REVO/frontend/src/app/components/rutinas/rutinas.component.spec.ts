/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RutinasComponent } from './rutinas.component';

describe('RutinasComponent', () => {
  let component: RutinasComponent;
  let fixture: ComponentFixture<RutinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
