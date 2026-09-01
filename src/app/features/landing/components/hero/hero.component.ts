import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  private readonly router = inject(Router);

  navigateTo(target: string): void {
    const routeMap: Record<string, string> = {
      services: '/servicios',
      servicios: '/servicios',
      contact: '/contacto',
      contacto: '/contacto',
      technology: '/tecnologia',
      tecnologia: '/tecnologia',
    };

    const dest = routeMap[target.toLowerCase()] || target;
    this.router.navigate([dest]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

