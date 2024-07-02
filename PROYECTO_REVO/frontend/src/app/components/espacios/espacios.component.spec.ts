import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaciosComponent } from './espacios.component';

describe('EspaciosComponent', () => {
  let component: EspaciosComponent;
  let fixture: ComponentFixture<EspaciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspaciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
