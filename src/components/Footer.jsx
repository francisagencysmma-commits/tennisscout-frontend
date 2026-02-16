import React from 'react';
import { Twitter, Instagram, Youtube, ArrowRight, Globe, Shield, Trophy } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-lime-neon text-black pt-16 pb-8 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand & Description Block */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-black w-8 h-8 rounded-lg flex items-center justify-center text-lime-neon">
                <Trophy className="w-5 h-5 font-bold" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-black">TennisScout</span>
            </div>
            <p className="text-black/70 leading-relaxed max-w-sm">
              TennisScout conecta talento emergente con academias de élite mediante tecnología de análisis avanzado. Impulsamos la próxima generación de campeones.
            </p>
            <div className="flex gap-4 mt-2">
              <a 
                className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center text-black hover:text-white hover:bg-black hover:border-black transition-all duration-300" 
                href="#"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center text-black hover:text-white hover:bg-black hover:border-black transition-all duration-300" 
                href="#"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center text-black hover:text-white hover:bg-black hover:border-black transition-all duration-300" 
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
              <h4 className="text-black font-bold text-sm tracking-wider uppercase">Plataforma</h4>
              <ul className="flex flex-col gap-3">
                <li><a className="text-black/70 hover:text-black hover:underline text-sm transition-colors duration-200" href="#">Jugadores</a></li>
                <li><a className="text-black/70 hover:text-black hover:underline text-sm transition-colors duration-200" href="#">Academias</a></li>
                <li><a className="text-black/70 hover:text-black hover:underline text-sm transition-colors duration-200" href="#">Análisis IA</a></li>
                <li><a className="text-black/70 hover:text-black hover:underline text-sm transition-colors duration-200" href="#">Precios</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-black font-bold text-sm tracking-wider uppercase">Empresa</h4>
              <ul className="flex flex-col gap-3">
                <li><a className="text-black/70 hover:text-black hover:underline text-sm transition-colors duration-200" href="#">Nosotros</a></li>
                <li><a className="text-black/70 hover:text-black hover:underline text-sm transition-colors duration-200" href="#">Blog</a></li>
                <li><a className="text-black/70 hover:text-black hover:underline text-sm transition-colors duration-200" href="#">Soporte</a></li>
                <li><a className="text-black/70 hover:text-black hover:underline text-sm transition-colors duration-200" href="#">Contacto</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-black font-bold text-sm tracking-wider uppercase">Legal</h4>
              <ul className="flex flex-col gap-3">
                <li><a className="text-black/70 hover:text-black hover:underline text-sm transition-colors duration-200" href="#">Privacidad</a></li>
                <li><a className="text-black/70 hover:text-black hover:underline text-sm transition-colors duration-200" href="#">Términos</a></li>
                <li><a className="text-black/70 hover:text-black hover:underline text-sm transition-colors duration-200" href="#">Cookies</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="text-black font-bold text-sm tracking-wider uppercase">Mantente actualizado</h4>
            <p className="text-black/70 text-sm">Recibe consejos y actualizaciones de la plataforma en tu email.</p>
            <div className="relative group">
              <input 
                className="w-full bg-black/5 border border-black/20 rounded-lg py-3 px-4 text-black text-sm placeholder:text-black/50 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all duration-300" 
                placeholder="Tu email" 
                type="email"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-black text-lime-neon px-3 rounded-md hover:opacity-90 transition-all duration-300 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 font-bold" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-black/60 text-xs">
            © 2024 TennisScout AI. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <span className="text-black/60 text-xs flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              Cobertura Global
            </span>
            <span className="text-black/60 text-xs flex items-center gap-1">
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