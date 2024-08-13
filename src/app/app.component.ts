import { Component } from '@angular/core';
import {PrimeNGConfig} from "primeng/api"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'stock-app';

  constructor (private primeNgConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primeNgConfig.ripple = true
  }
}
