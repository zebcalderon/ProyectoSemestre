import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'


@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.scss'],
})
export class BarraComponent {

  constructor(private router: Router) { }

  navigate(route: string) {
    this.router.navigateByUrl(route);

  }

}
