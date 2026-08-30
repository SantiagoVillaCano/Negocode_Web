import { Component, inject } from '@angular/core';
import { ScrollService } from '../../../../core/services/scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  private readonly scrollService = inject(ScrollService);

  navigateTo(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
  }
}
