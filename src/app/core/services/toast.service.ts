import { Injectable, inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly toast = inject(HotToastService);

  success(message: string): void {
    this.toast.success(message, {
      duration: 4000,
      style: {
        border: '1px solid var(--success)',
        padding: '12px 16px',
        color: 'var(--text-primary)',
        background: 'var(--card-bg)',
      },
    });
  }

  error(message: string): void {
    this.toast.error(message, {
      duration: 5000,
      style: {
        border: '1px solid var(--error)',
        padding: '12px 16px',
        color: 'var(--text-primary)',
        background: 'var(--card-bg)',
      },
    });
  }

  info(message: string): void {
    this.toast.info(message, {
      duration: 3000,
      style: {
        border: '1px solid var(--primary)',
        padding: '12px 16px',
        color: 'var(--text-primary)',
        background: 'var(--card-bg)',
      },
    });
  }
}
