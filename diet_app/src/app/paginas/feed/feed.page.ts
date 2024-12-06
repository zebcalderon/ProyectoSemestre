import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  uploadReceta() {
    // Aquí iría la lógica para subir una receta
    console.log('Botón de subir receta presionado');
  }

  uploadEntrenamiento() {
    // Aquí iría la lógica para subir un entrenamiento
    console.log('Botón de subir entrenamiento presionado');
  }

}
