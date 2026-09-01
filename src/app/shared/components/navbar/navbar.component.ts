import { Component, inject, signal, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavItem, NAVIGATION_ITEMS } from '../../../core/constants/navigation.constants';
import { BRAND_CONFIG } from '../../../core/config/brand.config';
import { ScrollService } from '../../../core/services/scroll.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, ThemeToggleComponent],
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
    let targetRoute: string | undefined;
    let targetSectionId: string | undefined;

    if (typeof itemOrString === 'string') {
      const stringMap: Record<string, { route?: string; sectionId?: string }> = {
        hero: { route: '/', sectionId: 'hero' },
        inicio: { route: '/' },
        home: { route: '/' },
        services: { route: '/servicios' },
        servicios: { route: '/servicios' },
        technology: { route: '/tecnologia' },
        tecnologia: { route: '/tecnologia' },
        contact: { route: '/contacto' },
        contacto: { route: '/contacto' },
      };

      const mapped = stringMap[itemOrString.toLowerCase()];
      if (mapped) {
        targetRoute = mapped.route;
        targetSectionId = mapped.sectionId;
      } else {
        targetSectionId = itemOrString;
      }
    } else {
      targetRoute = itemOrString.route;
      targetSectionId = itemOrString.sectionId;
    }

    if (targetRoute) {
      this.router.navigate([targetRoute]).then(() => {
        if (targetSectionId && targetRoute === '/') {
          setTimeout(() => this.scrollService.scrollToSection(targetSectionId!), 100);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    } else if (targetSectionId) {
      if (this.router.url !== '/') {
        this.router.navigate(['/']).then(() => {
          setTimeout(() => this.scrollService.scrollToSection(targetSectionId!), 100);
        });
      } else {
        this.scrollService.scrollToSection(targetSectionId);
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

