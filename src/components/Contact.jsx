import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone, MdWhatsapp } from 'react-icons/md';
import ContactForm from './ContactForm.jsx';
import Map from './Map.jsx';

/**
 * @typedef {Object} ContactProps
 * @property {string} [location] - Location information
 * @property {string} [email] - Email address
 * @property {string} [phone] - Phone number
 * @property {string} [whatsappNumber] - WhatsApp number
 * @property {string} [whatsappMessage] - Default WhatsApp message
 * @property {string} [userName] - User's name
 */

/**
 * Contact component that displays contact information and a contact form
 * @param {ContactProps} props - Component props
 */
export default function Contact({
  location = 'Cascavel - PR',
  email = 'gustavolnomelini@gmail.com',
  phone = '(45) 99850-8634',
  whatsappNumber = '5545998508634',
  whatsappMessage = 'Olá! Peguei seu contato no seu BLOG, tenho interesse em conversar contigo a respeito dos seus serviços.',
  userName = 'Gustavo Lopes Nomelini',
}) {
  const encodedMessage = encodeURIComponent(whatsappMessage);

  const contactInfo = [
    {
      icon: MdLocationOn,
      title: 'Localização',
      content: location,
      link: null,
    },
    {
      icon: MdEmail,
      title: 'Email',
      content: email,
      link: `mailto:${email}`,
    },
    {
      icon: MdPhone,
      title: 'Telefone',
      content: phone,
      link: `tel:+${whatsappNumber}`,
    },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      href: 'https://github.com/prodbygus',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      href: 'https://linkedin.com/in/prodbygus',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      href: 'https://instagram.com/prodbygus',
    },
  ];

  return (
    <div className="space-y-16">
      <div className="flex flex-col gap-12 md:flex-row">
        <div className="w-full md:w-1/2">
          <p className="text-[var(--text-muted)] mb-8">
            Preencha o formulário ao lado ou entre em contato diretamente com{' '}
            <span className="font-medium text-[var(--text)]">{userName}</span> pelos canais de
            comunicação abaixo.
          </p>

          <motion.div className="mb-8" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodedMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[var(--background)] bg-[var(--primary)] hover:bg-[var(--accent)] transition-colors px-6 py-3 rounded-lg shadow-lg hover:shadow-[var(--primary)]/20"
            >
              <MdWhatsapp className="w-5 h-5" />
              <span>Fale pelo WhatsApp</span>
            </a>
          </motion.div>

          <div className="space-y-6 text-[var(--text-muted)]">
            {contactInfo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 hover:text-[var(--text)] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--surface)]/20 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text)]">{item.title}</p>
                    {item.link ? (
                      <a href={item.link} className="hover:text-[var(--primary)]">
                        {item.content}
                      </a>
                    ) : (
                      <span>{item.content}</span>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Social links */}
            <div className="pt-4">
              <p className="font-medium text-[var(--text)] mb-3">Me siga nas redes sociais</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <motion.div
            className="bg-[var(--surface)]/5 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg border border-[var(--surface)]/20"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-[var(--text)] mb-6">Envie uma mensagem</h3>
            <ContactForm />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="h-[400px] rounded-lg overflow-hidden shadow-lg border border-[var(--surface)]/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Map location={location} />
      </motion.div>
    </div>
  );
}
