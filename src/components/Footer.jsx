import React, { useEffect, useRef } from 'react';
import { Trophy, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 150;

    const balls = [];
    const ballCount = 30;

    for (let i = 0; i < ballCount; i++) {
      balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * 60 + 60,
        radius: 20 + Math.random() * 15,
        speed: 0.2 + Math.random() * 0.5,
        direction: Math.random() > 0.5 ? 1 : -1
      });
    }

    function drawBall(ball) {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#cdff00';
      ctx.fill();
      
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(ball.x - ball.radius * 0.3, ball.y - ball.radius * 0.3, ball.radius * 0.8, 0, Math.PI);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(ball.x + ball.radius * 0.3, ball.y - ball.radius * 0.3, ball.radius * 0.8, 0, Math.PI);
      ctx.stroke();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      balls.forEach(ball => {
        ball.x += ball.speed * ball.direction;
        
        if (ball.x > canvas.width + ball.radius) {
          ball.x = -ball.radius;
        } else if (ball.x < -ball.radius) {
          ball.x = canvas.width + ball.radius;
        }
        
        drawBall(ball);
      });
      
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <footer className="relative bg-forest-dark overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{ height: '150px' }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-32">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-lime-neon rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-dark-deepest" />
              </div>
              <span className="text-xl font-display font-bold text-cream-50">TennisScout AI</span>
            </div>
            <p className="text-cream-300 text-sm">
              Empowering the next generation of champions with AI-driven insights.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-cream-50 mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-cream-300 hover:text-lime-neon transition-colors">AI Analysis</a></li>
              <li><a href="#" className="text-cream-300 hover:text-lime-neon transition-colors">Scout Portal</a></li>
              <li><a href="#" className="text-cream-300 hover:text-lime-neon transition-colors">Match Tracking</a></li>
              <li><a href="#" className="text-cream-300 hover:text-lime-neon transition-colors">Pro Comparison</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-cream-50 mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-cream-300 hover:text-lime-neon transition-colors">About Us</a></li>
              <li><a href="#" className="text-cream-300 hover:text-lime-neon transition-colors">Partnerships</a></li>
              <li><a href="#" className="text-cream-300 hover:text-lime-neon transition-colors">Careers</a></li>
              <li><a href="#" className="text-cream-300 hover:text-lime-neon transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-cream-50 mb-4">Newsletter</h3>
            <p className="text-cream-300 text-sm mb-4">
              Stay updated on merch and events from TennisScout AI
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email"
                className="flex-1 px-4 py-2 bg-forest-light border border-lime-neon/30 rounded-lg text-cream-50 placeholder-cream-300 focus:outline-none focus:border-lime-neon"
              />
              <button className="btn-neon px-4 py-2 rounded-lg">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-lime-neon/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-cream-300 text-sm">
            © 2026 TennisScout AI. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 bg-lime-neon rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <Instagram className="w-5 h-5 text-dark-deepest" />
            </a>
            <a href="#" className="w-10 h-10 bg-lime-neon rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <Twitter className="w-5 h-5 text-dark-deepest" />
            </a>
            <a href="#" className="w-10 h-10 bg-lime-neon rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <Youtube className="w-5 h-5 text-dark-deepest" />
            </a>
          </div>

          <div className="flex gap-6 text-sm">
            <a href="#" className="text-cream-300 hover:text-lime-neon transition-colors">Privacy</a>
            <a href="#" className="text-cream-300 hover:text-lime-neon transition-colors">Terms</a>
            <a href="#" className="text-cream-300 hover:text-lime-neon transition-colors">Support</a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full text-center pb-4">
        <div className="text-6xl font-display font-bold text-forest-light/30" style={{ letterSpacing: '0.2em' }}>
          PLAY • BEAT • THRIVE
        </div>
      </div>
    </footer>
  );
};

export default Footer;