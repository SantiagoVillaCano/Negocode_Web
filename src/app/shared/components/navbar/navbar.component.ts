import { Component, inject, signal, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem, NAVIGATION_ITEMS } from '../../../core/constants/navigation.constants';
import { BRAND_CONFIG } from '../../../core/config/brand.config';
import { ScrollService } from '../../../core/services/scroll.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ThemeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly scrollService = inject(ScrollService);
  private readonly router = inject(Router);

  readonly brand = BRAND_CONFIG;
  readonly navItems = NAVIGATION_ITEMS;
  readonly isScrolled = signal(false);
  readonly isMobileMenuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  navigateTo(itemOrString: NavItem | string): void {
    const isString = typeof itemOrString === 'string';
    const route = isString ? undefined : itemOrString.route;
    const sectionId = isString ? itemOrString : itemOrString.sectionId;

    if (route) {
      this.router.navigate([route]);
    } else if (sectionId) {
      if (this.router.url !== '/') {
        this.router.navigate(['/']).then(() => {
          setTimeout(() => this.scrollService.scrollToSection(sectionId), 100);
        });
      } else {
        this.scrollService.scrollToSection(sectionId);
      }
    }
    this.isMobileMenuOpen.set(false);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
