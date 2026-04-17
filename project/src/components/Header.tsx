import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string, mobile = false) =>
    isActive(path)
      ? 'text-sm font-medium tracking-wide text-[#FF6B35]'
      : `text-sm font-medium tracking-wide ${mobile ? 'text-white' : 'text-white hover:text-[#FF6B35]'}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">

        <Link to="/" className="flex items-center">
          <img
            src="https://i.postimg.cc/90fP5H6S/motorodri-sembackground.png"
            alt="MOTORODRI Logo"
            className="h-16 md:h-20 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={linkClass('/')}>HOME</Link>
          <Link to="/stock" className={linkClass('/stock')}>STOCK</Link>
          <Link to="/vendidos" className={linkClass('/vendidos')}>VENDIDOS</Link>
          <Link to="/sobre" className={linkClass('/sobre')}>SOBRE NÓS</Link>
          <Link to="/contactos" className={linkClass('/contactos')}>CONTACTOS</Link>
        </nav>

        {/* Botão de Telefone Desktop - Corrigido aqui */}
        <a 
          href="tel:+351917589195"
          className="hidden md:flex items-center space-x-2 px-6 py-2 bg-[#FF6B35] text-white font-medium rounded hover:bg-[#FF8555] transition-colors"
        >
          <Phone size={18} />
          <span>+351 917 589 195</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-[#2A2A2A] px-6 py-4 flex flex-col space-y-4">
          <Link to="/" className={linkClass('/', true)} onClick={() => setMenuOpen(false)}>HOME</Link>
          <Link to="/stock" className={linkClass('/stock', true)} onClick={() => setMenuOpen(false)}>STOCK</Link>
          <Link to="/vendidos" className={linkClass('/vendidos', true)} onClick={() => setMenuOpen(false)}>VENDIDOS</Link>
          <Link to="/sobre" className={linkClass('/sobre', true)} onClick={() => setMenuOpen(false)}>SOBRE NÓS</Link>
          <Link to="/contactos" className={linkClass('/contactos', true)} onClick={() => setMenuOpen(false)}>CONTACTOS</Link>
          
          {/* Botão de Telefone Mobile - Corrigido aqui */}
          <a
            href="tel:+351917589195"
            className="flex items-center space-x-2 px-4 py-2 bg-[#FF6B35] text-white font-medium rounded hover:bg-[#FF8555] transition-colors w-fit"
            onClick={() => setMenuOpen(false)}
          >
            <Phone size={18} />
            <span>+351 917 589 195</span>
          </a>
        </div>
      )}
    </header>
  );
}