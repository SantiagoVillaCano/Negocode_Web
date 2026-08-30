import { Component, inject } from '@angular/core';
import { BRAND_CONFIG } from '../../../core/config/brand.config';
import { NAVIGATION_ITEMS } from '../../../core/constants/navigation.constants';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  private readonly scrollService = inject(ScrollService);

  readonly brand = BRAND_CONFIG;
  readonly navItems = NAVIGATION_ITEMS;
  readonly currentYear = new Date().getFullYear();

  navigateTo(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
  }
}
