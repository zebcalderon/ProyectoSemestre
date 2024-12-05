import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  constructor() { }
  GuardarReceta(recetaData: any): Promise<any> {
    // Aquí iría la lógica para guardar la receta, ya sea en un backend o en almacenamiento local
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Receta guardada:', recetaData);
        resolve('Receta guardada');
      }, 1000);
    });
  }
}
