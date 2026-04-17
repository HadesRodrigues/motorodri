import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#2A2A2A] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Coluna 1: Sobre */}
          <div>
            <h3 className="text-2xl font-bold mb-4 tracking-wider text-[#FF6B35]">MOTORODRI</h3>
            <p className="text-[#B8B8B8] text-sm leading-relaxed">
              Motos e viaturas exclusivas selecionadas com paixão e rigor para os verdadeiros entusiastas. O seu próximo destino premium no Estoril.
            </p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#B8B8B8] hover:text-[#FF6B35] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/stock" className="text-[#B8B8B8] hover:text-[#FF6B35] transition-colors text-sm">
                  Stock
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-[#B8B8B8] hover:text-[#FF6B35] transition-colors text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contactos" className="text-[#B8B8B8] hover:text-[#FF6B35] transition-colors text-sm">
                  Contactos
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contactos */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contactos</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-[#B8B8B8] text-sm">
                <Phone size={16} className="text-[#FF6B35]" />
                <a href="tel:+351912345678" className="hover:text-white transition-colors">+351 917 589 195</a>
              </li>
              <li className="flex items-center space-x-3 text-[#B8B8B8] text-sm">
                <Mail size={16} className="text-[#FF6B35]" />
                <a href="mailto:info@motorodri.pt" className="hover:text-white transition-colors">info@motorodri.pt</a>
              </li>
              <li className="flex items-start space-x-3 text-[#B8B8B8] text-sm">
                <MapPin size={16} className="text-[#FF6B35] mt-1 flex-shrink-0" />
                <span>R. do Campo Santo, 599<br />2765-307 Estoril, Portugal</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Redes e Horário */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Siga-nos</h4>
            <div className="flex space-x-4">
              <a
                href="https://motorodri.standvirtual.com/inventory" // Substitui pelo teu link de perfil
                target="_blank"
                rel="noopener noreferrer"
                title="Ver Stock no Standvirtual"
                className="w-10 h-10 flex items-center justify-center bg-white border border-[#2A2A2A] rounded hover:scale-110 transition-all overflow-hidden"
              >
                <img 
                  src="https://statics.standvirtual.com/optimus-storage/a/carspt/images/fb-image200x200.png" 
                  alt="Standvirtual" 
                  className="w-full h-full object-contain p-1.5" 
                />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-[#B8B8B8] text-sm leading-relaxed">
                <strong className="text-white">Horário:</strong><br />
                Seg - Sex: 09h - 19h<br />
                Sáb: Sob marcação
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#2A2A2A] text-center text-[#B8B8B8] text-sm">
          <p>&copy; {new Date().getFullYear()} MOTORODRI. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}