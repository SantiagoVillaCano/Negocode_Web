export const environment = {
  production: true,
  // En producción (Vercel), el correo se envía desde /api/send-email
  // La RESEND_KEY vive SOLO en las variables de entorno de Vercel (nunca en el frontend)
  apiEndpoint: '/api/send-email',
};
