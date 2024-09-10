import { Component } from '@angular/core';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.page.html',
  styleUrls: ['./comunidad.page.scss'],
})
export class ComunidadPage {

  constructor() { }

  uploadReceta() {
    // Aquí iría la lógica para subir una receta
    console.log('Botón de subir receta presionado');
  }

  uploadEntrenamiento() {
    // Aquí iría la lógica para subir un entrenamiento
    console.log('Botón de subir entrenamiento presionado');
  }
}
