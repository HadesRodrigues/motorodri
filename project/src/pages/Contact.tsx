import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await emailjs.send(
        'service_osg7cp2',
        'template_3j89k4j',
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Não fornecido',
          message: formData.message,
        },
        '8Zu5q-E0FOkUHOuQ4'
      );
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Erro ao enviar mensagem. Por favor tente novamente ou contacte-nos diretamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">CONTACTOS</h1>
          <p className="text-[#B8B8B8] text-lg font-light">Entre em contacto connosco. Estamos aqui para ajudar.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6 hover:border-[#FF6B35]/50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-[#FF6B35]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Telefone</h3>
                  <a href="tel:+351912345678" className="text-[#B8B8B8] hover:text-[#FF6B35] transition-colors">
                    +351 912 345 678
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6 hover:border-[#FF6B35]/50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-[#FF6B35]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email</h3>
                  <a href="mailto:info@motorodri.pt" className="text-[#B8B8B8] hover:text-[#FF6B35] transition-colors">
                    info@motorodri.pt
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6 hover:border-[#FF6B35]/50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-[#FF6B35]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Morada</h3>
                  <p className="text-[#B8B8B8] leading-relaxed">
                    R. do Campo Santo, 599<br />
                    2765-307 Estoril<br />
                    Portugal
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-[#FF6B35]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Horário</h3>
                  <div className="text-[#B8B8B8] space-y-1 text-sm">
                    <p>Segunda - Sexta: 09h00 - 19h00</p>
                    <p>Sábado: Sob marcação</p>
                    <p>Domingo: Encerrado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Envie-nos uma Mensagem</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-900/30 border border-green-500 rounded-lg">
                  <p className="text-green-400 font-semibold">
                    ✅ Mensagem enviada com sucesso! Entraremos em contacto em breve.
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg">
                  <p className="text-red-400 font-semibold">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#B8B8B8] mb-2">Nome *</label>
                    <input type="text" id="name" name="name" value={formData.name}
                      onChange={handleChange} required
                      className="w-full bg-[#0B0B0B] border border-[#2A2A2A] text-white px-4 py-3 rounded focus:border-[#FF6B35] focus:outline-none transition-colors"
                      placeholder="O seu nome" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#B8B8B8] mb-2">Email *</label>
                    <input type="email" id="email" name="email" value={formData.email}
                      onChange={handleChange} required
                      className="w-full bg-[#0B0B0B] border border-[#2A2A2A] text-white px-4 py-3 rounded focus:border-[#FF6B35] focus:outline-none transition-colors"
                      placeholder="seuemail@exemplo.com" />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#B8B8B8] mb-2">Telefone</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#0B0B0B] border border-[#2A2A2A] text-white px-4 py-3 rounded focus:border-[#FF6B35] focus:outline-none transition-colors"
                    placeholder="+351 912 345 678" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#B8B8B8] mb-2">Mensagem *</label>
                  <textarea id="message" name="message" value={formData.message}
                    onChange={handleChange} required rows={5}
                    className="w-full bg-[#0B0B0B] border border-[#2A2A2A] text-white px-4 py-3 rounded focus:border-[#FF6B35] focus:outline-none transition-colors resize-none"
                    placeholder="Em que o podemos ajudar?"></textarea>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-[#FF6B35] text-white px-8 py-4 font-bold text-lg rounded hover:bg-[#FF8555] transition-all shadow-lg shadow-[#FF6B35]/10 disabled:opacity-50">
                  {loading ? 'A enviar...' : 'ENVIAR MENSAGEM'}
                </button>
              </form>
            </div>

            <div className="rounded-lg overflow-hidden border border-[#2A2A2A] h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3114.162758252203!2d-9.387214723438453!3d38.713214557997635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1ec5950f558519%3A0x72244b5e8f23a5d9!2sR.%20do%20Campo%20Santo%20599%2C%202765-307%20Estoril!5e0!3m2!1spt-PT!2spt!4v1710000000000!5m2!1spt-PT!2spt"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Localização MOTORODRI" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}