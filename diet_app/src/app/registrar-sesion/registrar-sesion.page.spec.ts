import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarSesionPage } from './registrar-sesion.page';

describe('RegistrarSesionPage', () => {
  let component: RegistrarSesionPage;
  let fixture: ComponentFixture<RegistrarSesionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarSesionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
