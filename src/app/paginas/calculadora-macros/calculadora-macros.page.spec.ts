import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculadoraMacrosPage } from './calculadora-macros.page';

describe('CalculadoraMacrosPage', () => {
  let component: CalculadoraMacrosPage;
  let fixture: ComponentFixture<CalculadoraMacrosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculadoraMacrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
