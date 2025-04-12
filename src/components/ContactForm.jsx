import { useState } from 'react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setShowSuccess(false);
    setShowError(false);
    setErrorMessage('');

    // Set submitting state
    setIsSubmitting(true);

    // Get form data
    const formData = new FormData(e.target);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocorreu um erro ao enviar a mensagem');
      }

      // Show success message
      setShowSuccess(true);

      // Reset form
      e.target.reset();

      // Hide success message after 10 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 10000);
    } catch (error) {
      // Show error message
      setErrorMessage(
        error instanceof Error ? error.message : 'Ocorreu um erro ao enviar a mensagem'
      );
      setShowError(true);
    } finally {
      // Reset submitting state
      setIsSubmitting(false);
    }
  };

  return (
    <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--text-muted)] mb-2">
          Nome<span className="text-[var(--primary)] ml-1">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text)]"
          placeholder="Seu nome completo"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--text-muted)] mb-2">
          Email<span className="text-[var(--primary)] ml-1">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text)]"
          placeholder="seu.email@exemplo.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[var(--text-muted)] mb-2">
          Telefone <span className="text-[var(--text-muted)] text-xs">(opcional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text)]"
          placeholder="(XX) XXXXX-XXXX"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-[var(--text-muted)] mb-2"
        >
          Mensagem<span className="text-[var(--primary)] ml-1">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text)] resize-none"
          placeholder="Digite sua mensagem aqui..."
        ></textarea>
      </div>

      {/* Feedback de status */}
      {showSuccess && (
        <div className="p-4 rounded-md bg-green-50 text-green-800 border border-green-200">
          Mensagem enviada com sucesso! Entrarei em contato em breve.
          <div className="w-full bg-gray-200 h-1 mt-2 rounded overflow-hidden">
            <div
              className="bg-green-500 h-1 animate-shrink-width"
              style={{ animation: 'shrink-width 10s linear forwards' }}
            ></div>
          </div>
        </div>
      )}

      {showError && (
        <div className="p-4 rounded-md bg-red-50 text-red-800 border border-red-200">
          {errorMessage}
        </div>
      )}

      <div>
        <button
          type="submit"
          id="submit-button"
          disabled={isSubmitting}
          className={`w-full px-6 py-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--surface)] ${
            isSubmitting
              ? 'bg-[var(--secondary)] text-[var(--text-muted)] cursor-not-allowed'
              : 'bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--accent)]'
          }`}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </div>

      <div className="text-xs text-[var(--text-muted)] text-center">
        Campos com <span className="text-[var(--primary)] ml-1">*</span> são obrigatórios
      </div>
    </form>
  );
}
