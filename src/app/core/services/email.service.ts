import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly http = inject(HttpClient);

  /**
   * Obtiene la URL de la API de las variables de entorno (environment.ts / environment.development.ts)
   */
  private get endpointUrl(): string {
    return environment.resendEndpoint;
  }

  sendContactEmail(payload: ContactFormPayload): Observable<EmailResponse> {
    const fullPayload = {
      ...payload,
      to: environment.destinationEmail,
    };

    console.log('📬 [Resend Email Service] Enviando datos a:', this.endpointUrl, fullPayload);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<EmailResponse>(this.endpointUrl, fullPayload, { headers }).pipe(
      map((res) => ({
        success: true,
        message: res.message || '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.',
      })),
      catchError((error) => {
        console.warn('⚠️ Nota de desarrollo/servidor:', error);

        // Si estamos en desarrollo o el endpoint no ha sido desplegado aún, simulamos respuesta exitosa para pruebas de UI
        if (!environment.production) {
          return of({
            success: true,
            message: '¡Mensaje registrado correctamente en modo de desarrollo! (Configura tu API Key de Resend en las variables de entorno del servidor).',
          });
        }

        return of({
          success: false,
          message: 'Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo o escríbenos a través de nuestras redes.',
        });
      })
    );
  }
}

