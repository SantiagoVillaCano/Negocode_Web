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
  readonly submitSuccessMessage = signal<string | null>(null);
  readonly submitErrorMessage = signal<string | null>(null);

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
      // COPIA/PEGA TU CORREO O ENLACE AQUÍ:
      url: 'mailto:contacto@negocode.com',
      icon: 'gmail',
      badge: 'Email Oficial',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Página oficial de NegoCode',
      actionText: 'Visitar Página',
      // COPIA/PEGA LA URL DE TU FACEBOOK AQUÍ:
      url: 'https://facebook.com/negocode',
      icon: 'facebook',
      badge: 'Comunidad',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: '@negocode_official',
      actionText: 'Seguir en Instagram',
      // COPIA/PEGA LA URL DE TU INSTAGRAM AQUÍ:
      url: 'https://instagram.com/negocode',
      icon: 'instagram',
      badge: 'Red Social',
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Servidor de desarrollo NegoCode',
      actionText: 'Unirse al Servidor',
      // COPIA/PEGA EL ENLACE DE TU DISCORD AQUÍ:
      url: 'https://discord.gg/negocode',
      icon: 'discord',
      badge: 'Chat en Vivo',
    },
  ];

  onSubmit(): void {
    this.submitSuccessMessage.set(null);
    this.submitErrorMessage.set(null);

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.toast.error('Por favor completa todos los campos del formulario correctamente.');
      return;
    }

    this.isSubmitting.set(true);

    const formValues = this.contactForm.value;

    this.emailService.sendContactEmail(formValues).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        if (response.success) {
          this.submitSuccessMessage.set(response.message);
          this.toast.success(response.message);
          this.contactForm.reset();
        } else {
          this.submitErrorMessage.set(response.message);
          this.toast.error(response.message);
        }
      },
      error: (err) => {
        this.isSubmitting.set(false);
        const errMsg = 'Error inesperado al conectar con el servicio de correo.';
        this.submitErrorMessage.set(errMsg);
        this.toast.error(errMsg);
        console.error('Error submitting contact form:', err);
      },
    });
  }

  get f() {
    return this.contactForm.controls;
  }
}
