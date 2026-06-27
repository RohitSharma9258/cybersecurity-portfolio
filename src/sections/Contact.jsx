import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaSkullCrossbones, FaLock, FaSpinner } from 'react-icons/fa';
import { trackEvent } from '../utils/analytics';

// EmailJS configuration
// To activate real email sending, replace these with your EmailJS credentials:
// 1. Sign up at https://www.emailjs.com/
// 2. Create a service and template
// 3. Replace the values below or store in .env as VITE_EMAILJS_SERVICE_ID etc.
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_portfolio';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

const contactChannels = [
  {
    icon: <FaEnvelope className="text-cyan-400 text-xl" aria-hidden="true" />,
    label: 'EMAIL_SECURE',
    value: 'rohitsharma40421@gmail.com',
    href: 'mailto:rohitsharma40421@gmail.com',
    hoverColor: 'hover:text-cyan-400',
  },
  {
    icon: <FaPhoneAlt className="text-blue-400 text-xl" aria-hidden="true" />,
    label: 'GSM_PHONE',
    value: '+91 93684 13352',
    href: 'tel:+919368413352',
    hoverColor: 'hover:text-blue-400',
  },
  {
    icon: <FaMapMarkerAlt className="text-emerald-400 text-xl" aria-hidden="true" />,
    label: 'GPS_COORDINATES',
    value: 'Mathura, Uttar Pradesh, India',
    href: null,
    hoverColor: '',
  },
  {
    icon: <FaGithub className="text-white text-xl" aria-hidden="true" />,
    label: 'GITHUB',
    value: 'github.com/RohitSharma9258',
    href: 'https://github.com/RohitSharma9258',
    hoverColor: 'hover:text-white',
  },
  {
    icon: <FaLinkedin className="text-blue-500 text-xl" aria-hidden="true" />,
    label: 'LINKEDIN',
    value: 'linkedin.com/in/rohit-sharma-404306310',
    href: 'https://linkedin.com/in/rohit-sharma-404306310',
    hoverColor: 'hover:text-blue-400',
  },
];

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sanitizeInput = (str) => {
    return str.replace(/<[^>]*>?/gm, '').trim();
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSecureSubmit = async (e) => {
    e.preventDefault();
    
    const cleanName = sanitizeInput(formData.name);
    const cleanEmail = sanitizeInput(formData.email);
    const cleanSubject = sanitizeInput(formData.subject);
    const cleanMessage = sanitizeInput(formData.message);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setStatus('error');
      setErrorMsg('Input payload error: All required fields must be populated.');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setStatus('error');
      setErrorMsg('Input payload error: INVALID_SOCKET_IP format (please provide a valid email address).');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setStatus('success');
      trackEvent('contact_form_submit', { subject: cleanSubject });
      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#00f0ff', '#3b82f6', '#10b981', '#a855f7'],
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMsg('Email service unavailable. Please contact directly at rohitsharma40421@gmail.com');
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-black/90 cyber-grid-dense" aria-label="Contact section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FaLock className="text-cyan-400 text-sm animate-pulse" aria-hidden="true" />
            <span className="font-code text-xs text-cyan-400/70 uppercase tracking-widest">Encrypted Handshake Protocol</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-cyber text-white uppercase tracking-wider">
            &gt; Secure_Contact_Handshake
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-2" />
          <p className="text-gray-500 font-code text-xs mt-3 uppercase tracking-widest">
            Establish encrypted sockets with the researcher
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">

          {/* Left: Direct Channels */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-cyber font-semibold text-cyan-400 select-none mb-5">
                // CHANNEL_DIRECTIVES
              </h3>
              {contactChannels.map((ch) => (
                <div key={ch.label} className="flex items-center space-x-4 bg-neutral-950/60 border border-neutral-900 hover:border-cyan-500/20 p-4 rounded-sm transition-all duration-300">
                  {ch.icon}
                  <div>
                    <h5 className="font-code text-[10px] text-neutral-500 uppercase">{ch.label}</h5>
                    {ch.href ? (
                      <a
                        href={ch.href}
                        target={ch.href.startsWith('http') ? '_blank' : undefined}
                        rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        onClick={() => trackEvent('contact_channel_click', { channel: ch.label })}
                        className={`text-sm font-code text-white ${ch.hoverColor} transition-colors`}
                      >
                        {ch.value}
                      </a>
                    ) : (
                      <span className="text-sm font-code text-white">{ch.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Warning Box */}
            <div className="glass-panel border-red-500/20 bg-red-950/5 p-4 rounded-sm mt-6 text-xs text-red-400/90 font-code flex items-start space-x-3 select-none" role="note">
              <FaSkullCrossbones className="text-xl flex-shrink-0 mt-0.5 animate-bounce" aria-hidden="true" />
              <div>
                <span className="font-cyber font-bold block mb-1">DECRYPT_WARNING:</span>
                Portals are actively scanned for intrusion attempts. Send messages over valid protocol paths only.
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel border-cyan-500/10 p-6 md:p-8 rounded-lg shadow-2xl relative">
              <h3 className="text-lg font-cyber font-semibold text-cyan-400 mb-6 select-none">
                // EXECUTE_HANDSHAKE_FORM
              </h3>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                  role="alert"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-2xl animate-pulse">
                    ✓
                  </div>
                  <h4 className="font-cyber text-lg font-bold text-white uppercase">SOCKET_ESTABLISHED</h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto font-code">
                    Secure transmission complete. Package decrypted and queued for buffer reading.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 font-code text-xs text-cyan-400 hover:text-cyan-300 underline"
                  >
                    -- send_another_message --
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSecureSubmit} className="space-y-5" noValidate>
                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="block text-[11px] font-code text-neutral-500 uppercase">
                      IDENTIFIER (NAME) <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-cyan-400 rounded-sm py-2.5 px-3.5 text-sm font-code text-white outline-none focus:ring-1 focus:ring-cyan-400 transition-all placeholder-neutral-700 disabled:opacity-50"
                      placeholder="e.g. Alice"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="block text-[11px] font-code text-neutral-500 uppercase">
                      SOCKET_IP (EMAIL) <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-cyan-400 rounded-sm py-2.5 px-3.5 text-sm font-code text-white outline-none focus:ring-1 focus:ring-cyan-400 transition-all placeholder-neutral-700 disabled:opacity-50"
                      placeholder="e.g. alice@domain.com"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label htmlFor="contact-subject" className="block text-[11px] font-code text-neutral-500 uppercase">
                      HEADER (SUBJECT)
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-cyan-400 rounded-sm py-2.5 px-3.5 text-sm font-code text-white outline-none focus:ring-1 focus:ring-cyan-400 transition-all placeholder-neutral-700 disabled:opacity-50"
                      placeholder="e.g. Collaboration Opportunity"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label htmlFor="contact-message" className="block text-[11px] font-code text-neutral-500 uppercase">
                      PAYLOAD (MESSAGE) <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-cyan-400 rounded-sm py-2.5 px-3.5 text-sm font-code text-white outline-none focus:ring-1 focus:ring-cyan-400 transition-all placeholder-neutral-700 resize-none disabled:opacity-50"
                      placeholder="Enter secure message packet content..."
                    />
                  </div>

                  {/* Error message */}
                  {status === 'error' && (
                    <p className="font-code text-xs text-red-400 border border-red-500/30 bg-red-950/10 p-3 rounded-sm" role="alert">
                      {errorMsg}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-cyber font-bold py-3 rounded-sm flex items-center justify-center space-x-2 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-busy={status === 'sending'}
                  >
                    {status === 'sending'
                      ? <><FaSpinner className="animate-spin" aria-hidden="true" /><span>ENCRYPTING...</span></>
                      : <><FaPaperPlane aria-hidden="true" /><span>SEND_MESSAGE</span></>
                    }
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
