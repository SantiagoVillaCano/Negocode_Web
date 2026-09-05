import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../../../core/services/email.service';
import { ToastService } from '../../../../core/services/toast.service';

interface SocialLink {
  id: string;
  name: string;
  description: string;
  actionText: string;
  url: string;
  icon: string;
  badge?: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly emailService = inject(EmailService);
  private readonly toast = inject(ToastService);

  readonly contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly isSubmitting = signal(false);

  /**
   * REDES SOCIALES E INTERACCIONES DE CONTACTO
   * Sustituye los enlaces 'url' con tus enlaces reales de perfil/comunidad.
   */
  readonly socialLinks: SocialLink[] = [
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'contacto@negocode.com',
      actionText: 'Enviar Correo Directo',
      url: 'mailto:contacto@negocode.com',
      icon: 'gmail',
      badge: 'Email Oficial',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Página oficial de NegoCode',
      actionText: 'Visitar Página',
      url: 'https://facebook.com/negocode',
      icon: 'facebook',
      badge: 'Comunidad',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: '@negocode_official',
      actionText: 'Seguir en Instagram',
      url: 'https://instagram.com/negocode',
      icon: 'instagram',
      badge: 'Red Social',
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Servidor de desarrollo NegoCode',
      actionText: 'Unirse al Servidor',
      url: 'https://discord.gg/negocode',
      icon: 'discord',
      badge: 'Chat en Vivo',
    },
  ];

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.toast.error('Por favor completa todos los campos del formulario correctamente.');
      return;
    }

    this.isSubmitting.set(true);

    this.emailService.sendContactEmail(this.contactForm.value).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.toast.success('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
        this.contactForm.reset();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        console.error('Error enviando correo:', err);
        this.toast.error('Error al enviar el mensaje. Intenta de nuevo.');
      },
    });
  }

  get f() {
    return this.contactForm.controls;
  }
}
