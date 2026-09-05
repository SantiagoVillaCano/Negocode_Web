import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

@Injectable({ providedIn: 'root' })
export class EmailService {
  private readonly http = inject(HttpClient);

  // Llama a la Serverless Function de Vercel (sin CORS, sin exponer API key)
  sendContactEmail(payload: ContactFormPayload): Observable<EmailResponse> {
    return this.http.post<EmailResponse>(environment.apiEndpoint, payload);
  }

  // Prueba de conexión
  testConnection(): Observable<EmailResponse> {
    return this.sendContactEmail({
      name: 'Test NegoCode',
      email: 'test@negocode.com',
      message: '✅ Prueba de conexión exitosa con Resend desde NegoCode.',
    });
  }
}
