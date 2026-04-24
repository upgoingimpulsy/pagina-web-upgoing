import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="inicio" className="hero-v6">
      {/* Massive Background Branding */}
      <div className="brutal-brand-bg">
        <div className="brutal-text-stroke glow-shimmer">UP GOING</div>
        <div className="brutal-text-fill glow-pulse">UP GOING</div>
      </div>

      <div className="hero-bg">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" alt="Corporate" />
        <div className="overlay-v6"></div>
      </div>

      <div className="felipe-layer-v6 reveal">
        <img src="/kling_20260425_作品_pon_el_fon_1418_1.png" alt="Felipe CEO" className="felipe-video-v6" />
        <div className="video-scanline"></div>
      </div>

      {/* HUD Elements */}
      <div className="hud-frame">
        <div className="hud-corner tl"></div>
        <div className="hud-corner tr"></div>
        <div className="hud-corner bl"></div>
        <div className="hud-corner br"></div>
        <div className="hud-coords reveal">25.7723° N, 80.1916° W // MIAMI TOWER HQ</div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 20 }}>
        <div className="hero-content-v6">
          <div className="hero-badge reveal">
            <span className="badge-dot"></span>
            ESTRATEGIA CORPORATIVA DE ÉLITE
          </div>
          <h1 className="brutal-title reveal">
            EXPANSIÓN <br />
            <span className="text-gradient">EMPRESARIAL A EE.UU</span>
          </h1>
          <p className="hero-p-v6 reveal" style={{ transitionDelay: '0.3s' }}>
            Ayudamos a inversionistas y empresarios a internacionalizar sus empresas y expandir sus operaciones a Estados Unidos, protegiendo su patrimonio y generando ingresos en dólares.
          </p>
          <div className="hero-actions-v6 reveal" style={{ transitionDelay: '0.5s' }}>
            <Link to="/diagnostico" className="btn-yellow">INICIAR DIAGNÓSTICO</Link>
            <Link to="/servicios" className="btn-outline-v6">VER PLANES</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
