import nodemailer from 'nodemailer';

// Obter credenciais das variáveis de ambiente
const SMTP_HOST = import.meta.env.SMTP_HOST;
const SMTP_PORT = parseInt(import.meta.env.SMTP_PORT || '587');
const SMTP_SECURE = import.meta.env.SMTP_SECURE === 'true';
const SMTP_USER = import.meta.env.SMTP_USER;
const SMTP_PASSWORD = import.meta.env.SMTP_PASSWORD;
const MAIL_FROM = import.meta.env.MAIL_FROM;
const MAIL_TO = import.meta.env.MAIL_TO;

export async function POST({ request }) {
  try {
    // Verificar se as credenciais estão configuradas
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
      console.error('Credenciais de SMTP não configuradas');
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Serviço de email não configurado. Entre em contato pelo WhatsApp.',
        }),
        { status: 500 }
      );
    }

    // Obter dados do corpo da requisição
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    // Validar dados obrigatórios
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Por favor, preencha todos os campos obrigatórios',
        }),
        { status: 400 }
      );
    }

    // Configurar transportador de email
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });

    // Configurar email
    const mailOptions = {
      from: MAIL_FROM || SMTP_USER,
      to: MAIL_TO || 'contato@prodbygus.com', // Fallback para seu email
      replyTo: email,
      subject: `Nova mensagem do portfólio: ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n${
        phone ? `Telefone: ${phone}\n` : ''
      }Mensagem:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Nova mensagem de contato</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Telefone:</strong> ${phone}</p>` : ''}
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <p><strong>Mensagem:</strong></p>
            <p>${message.toString().replace(/\n/g, '<br>')}</p>
          </div>
          <p style="margin-top: 20px; color: #666;">Esta mensagem foi enviada pelo formulário de contato do seu portfólio.</p>
        </div>
      `,
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    // Retornar resposta de sucesso
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email enviado com sucesso',
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao enviar email:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Erro ao enviar o email. Tente novamente mais tarde.',
      }),
      { status: 500 }
    );
  }
}
