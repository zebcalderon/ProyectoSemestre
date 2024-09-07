import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora-macros',
  templateUrl: './calculadora-macros.page.html',
  styleUrls: ['./calculadora-macros.page.scss'],
})
export class CalculadoraMacrosPage implements OnInit {
  selectedOption: string | null = null;

  constructor() { }

  ngOnInit() { }

  // Maneja el cambio de opción
  onOptionChange(value: string) {
    this.selectedOption = value;
    // Aquí puedes agregar lógica adicional si es necesario
  }
}
