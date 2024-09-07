import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora-macros',
  templateUrl: './calculadora-macros.page.html',
  styleUrls: ['./calculadora-macros.page.scss'],
})
export class CalculadoraMacrosPage implements OnInit {
  selectedOption: string | null = null;
  selectedSex: string | null = null;
  selectedActivityLevel: string | null = null;

  constructor() { }

  ngOnInit() { }

  // Maneja el cambio de opción en el acordeón "Selecciona tu objetivo"
  onOptionChange(value: string) {
    this.selectedOption = value;
    // Aquí puedes agregar lógica adicional si es necesario
  }

  // Maneja el cambio de opción en el acordeón "Sexo"
  onSexChange(value: string) {
    this.selectedSex = value;
    // Aquí puedes agregar lógica adicional si es necesario
  }

  // Maneja el cambio de opción en el acordeón "Nivel de Actividad Física"
  onActivityLevelChange(value: string) {
    this.selectedActivityLevel = value;
    // Aquí puedes agregar lógica adicional si es necesario
  }
}
