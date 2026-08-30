import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  scrollToSection(sectionId: string): void {
    if (!this.isBrowser) return;

    const element = document.getElementById(sectionId);
    if (!element) return;

    const navbarHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '72',
      10,
    );

    const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({ top, behavior: 'smooth' });
  }

  scrollToTop(): void {
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
