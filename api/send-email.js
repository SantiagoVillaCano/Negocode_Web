import { Resend } from 'resend';

const resend = new Resend(process.env['RESEND_KEY']);

export default async function handler(req, res) {
  // Solo acepta POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' });
  }

  try {
    await resend.emails.send({
      from: 'NegoCode <onboarding@resend.dev>',
      to: ['negocode01@gmail.com'],
      subject: `Nuevo mensaje de: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <h2 style="color: #6366f1; margin-top: 0;">Nuevo mensaje desde NegoCode</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Mensaje:</strong></p>
          <div style="background: #f8fafc; padding: 16px; border-left: 4px solid #6366f1; border-radius: 6px; white-space: pre-wrap;">${message}</div>
          <hr style="margin-top: 24px; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="font-size: 12px; color: #94a3b8; text-align: center;">Enviado desde negocode.com</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: '¡Mensaje enviado con éxito!' });
  } catch (error) {
    console.error('Error Resend:', error);
    return res.status(500).json({ success: false, message: 'Error al enviar el mensaje.' });
  }
}
