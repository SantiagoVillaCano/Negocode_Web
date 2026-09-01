export const environment = {
  production: true,

  /**
   * CONFIGURACIÓN DE ENTORNO PARA RESEND (PRODUCCIÓN)
   * 
   * 1. resendEndpoint: URL de tu API o función serverless que envía los correos.
   * 2. destinationEmail: Tu correo personal donde deseas recibir las peticiones.
   */
  resendEndpoint: '/api/send-email',
  destinationEmail: 'tu-correo-personal@gmail.com',
};
