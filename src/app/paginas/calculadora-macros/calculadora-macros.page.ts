import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora-macros',
  templateUrl: './calculadora-macros.page.html',
  styleUrls: ['./calculadora-macros.page.scss'],
})
export class CalculadoraMacrosPage {
  edad: number | null = null;
  altura: number | null = null;
  selectedOption: string | null = "";
  selectedSex: string | null = "";
  selectedActivityLevel: string | null = "";

  onEdadChange(event: any) {
    this.edad = event.target.value ? parseInt(event.target.value, 10) : null;
  }

  onAlturaChange(event: any) {
    this.altura = event.target.value ? parseInt(event.target.value, 10) : null;
  }

  onOptionChange(event: any) {
    this.selectedOption = event;
  }

  onSexChange(event: any) {
    this.selectedSex = event;
  }

  onActivityLevelChange(event: any) {
    this.selectedActivityLevel = event;
  }
}
