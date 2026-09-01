export const environment = {
  production: false,

  /**
   * CONFIGURACIÓN DE ENTORNO PARA RESEND (DESARROLLO)
   * 
   * En desarrollo local, señala a tu servidor local de pruebas o endpoint simulado.
   */
  resendEndpoint: 'http://localhost:3000/api/send-email',
  destinationEmail: 'tu-correo-personal@gmail.com',
};
