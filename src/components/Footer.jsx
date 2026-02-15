import React from 'react';
import { Twitter, Instagram, Youtube, ArrowRight, Globe, Shield, Trophy } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand & Description Block */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-lime-neon w-8 h-8 rounded-lg flex items-center justify-center text-black">
                <Trophy className="w-5 h-5 font-bold" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">TennisScout</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              TennisScout conecta talento emergente con academias de élite mediante tecnología de análisis avanzado. Impulsamos la próxima generación de campeones.
            </p>
            <div className="flex gap-4 mt-2">
              <a 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-lime-neon hover:border-lime-neon transition-all duration-300" 
                href="#"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-lime-neon hover:border-lime-neon transition-all duration-300" 
                href="#"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-lime-neon hover:border-lime-neon transition-all duration-300" 
                href="#"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Plataforma</h4>
              <ul className="flex flex-col gap-3">
                <li><a className="text-gray-400 hover:text-lime-neon text-sm transition-colors duration-200" href="#">Jugadores</a></li>
                <li><a className="text-gray-400 hover:text-lime-neon text-sm transition-colors duration-200" href="#">Academias</a></li>
                <li><a className="text-gray-400 hover:text-lime-neon text-sm transition-colors duration-200" href="#">Análisis IA</a></li>
                <li><a className="text-gray-400 hover:text-lime-neon text-sm transition-colors duration-200" href="#">Precios</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Empresa</h4>
              <ul className="flex flex-col gap-3">
                <li><a className="text-gray-400 hover:text-lime-neon text-sm transition-colors duration-200" href="#">Nosotros</a></li>
                <li><a className="text-gray-400 hover:text-lime-neon text-sm transition-colors duration-200" href="#">Blog</a></li>
                <li><a className="text-gray-400 hover:text-lime-neon text-sm transition-colors duration-200" href="#">Soporte</a></li>
                <li><a className="text-gray-400 hover:text-lime-neon text-sm transition-colors duration-200" href="#">Contacto</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Legal</h4>
              <ul className="flex flex-col gap-3">
                <li><a className="text-gray-400 hover:text-lime-neon text-sm transition-colors duration-200" href="#">Privacidad</a></li>
                <li><a className="text-gray-400 hover:text-lime-neon text-sm transition-colors duration-200" href="#">Términos</a></li>
                <li><a className="text-gray-400 hover:text-lime-neon text-sm transition-colors duration-200" href="#">Cookies</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Mantente actualizado</h4>
            <p className="text-gray-400 text-sm">Recibe consejos y actualizaciones de la plataforma en tu email.</p>
            <div className="relative group">
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-lime-neon focus:ring-1 focus:ring-lime-neon transition-all duration-300" 
                placeholder="Tu email" 
                type="email"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-lime-neon text-black px-3 rounded-md hover:brightness-110 transition-all duration-300 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 font-bold" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © 2024 TennisScout AI. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <span className="text-gray-500 text-xs flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              Cobertura Global
            </span>
            <span className="text-gray-500 text-xs flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              SSL Seguro
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;