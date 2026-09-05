import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);

  show(type: 'success' | 'error' | 'info', message: string, title?: string, duration = 3500): void {
    const id = Math.random().toString(36).substring(2, 9);
    const defaultTitle = title || (type === 'success' ? 'Mensaje Enviado' : type === 'error' ? 'Atención' : 'Notificación');
    const newToast: Toast = { id, type, title: defaultTitle, message, duration };

    this.toasts.update((current) => [...current, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }
  }

  success(message: string, title?: string): void {
    this.show('success', message, title, 3500);
  }

  error(message: string, title?: string): void {
    this.show('error', message, title, 3500);
  }

  info(message: string, title?: string): void {
    this.show('info', message, title, 3500);
  }

  dismiss(id: string): void {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }
}
