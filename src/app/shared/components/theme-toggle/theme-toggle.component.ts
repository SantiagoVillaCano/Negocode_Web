import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button
      class="theme-toggle"
      (click)="themeService.toggle()"
      [attr.aria-label]="themeService.theme() === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'"
      type="button"
    >
      @if (themeService.theme() === 'light') {
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
      } @else {
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
      }
    </button>
  `,
  styles: [`
    .theme-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: var(--radius-lg);
      color: var(--text-secondary);
      transition: all var(--transition-base);
      cursor: pointer;
    }

    .theme-toggle:hover {
      background: var(--surface);
      color: var(--text-primary);
    }
  `],
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);
}
