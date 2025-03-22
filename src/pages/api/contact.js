import * as emailjs from '@emailjs/nodejs';

// Obter credenciais das variáveis de ambiente
const EMAILJS_SERVICE_ID = import.meta.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.EMAILJS_PUBLIC_KEY;
const EMAILJS_PRIVATE_KEY = import.meta.env.EMAILJS_PRIVATE_KEY;
const YOUR_EMAIL = import.meta.env.YOUR_EMAIL;

export async function POST({ request }) {
  try {
    // Verificar se as credenciais estão configuradas
    if (
      !EMAILJS_SERVICE_ID ||
      !EMAILJS_TEMPLATE_ID ||
      !EMAILJS_PUBLIC_KEY ||
      !EMAILJS_PRIVATE_KEY
    ) {
      console.error('Credenciais do EmailJS não configuradas');
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Serviço de email não configurado. Entre em contato pelo WhatsApp.',
        }),
        { status: 500 }
      );
    }

    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const phone = data.get('phone');
    const message = data.get('message');

    // Validação básica
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Nome, email e mensagem são obrigatórios',
        }),
        { status: 400 }
      );
    }

    // Preparar o template com as informações do formulário
    const templateParams = {
      from_name: name,
      from_email: email,
      from_phone: phone || 'Não informado',
      message: message,
      to_email: YOUR_EMAIL || 'contato@prodbygus.com', // Fallback para seu email
    };

    // Enviar email usando EmailJS
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
      publicKey: EMAILJS_PUBLIC_KEY,
      privateKey: EMAILJS_PRIVATE_KEY,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao processar o formulário:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message:
          'Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato pelo WhatsApp.',
      }),
      { status: 500 }
    );
  }
}
