import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreInicioPage } from './pre-inicio.page';

describe('PreInicioPage', () => {
  let component: PreInicioPage;
  let fixture: ComponentFixture<PreInicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
