import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    // Próximamente se añadirán las demás secciones aquí: About, Process, Technology, CTA, Contact
  ],
  template: `
    <app-hero />
  `,
})
export class HomePage {}
