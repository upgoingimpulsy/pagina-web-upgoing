import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramLogo, WhatsappLogo, LinkedinLogo } from '@phosphor-icons/react';

const Footer = () => {
  return (
    <footer id="contacto" className="footer-v6">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-v6">
            <img src="/upgoing.png" alt="UP GOING Logo" className="footer-logo" />
            <p className="footer-tagline">Tu futuro corporativo empieza aquí.</p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/upgoing.usa?igsh=eDNzcnk3OWZzazNm" target="_blank" rel="noopener noreferrer" className="social-icon">
                <InstagramLogo size={20} weight="bold" />
              </a>
              <a href="https://wa.me/17542994505" target="_blank" rel="noopener noreferrer" className="social-icon">
                <WhatsappLogo size={20} weight="bold" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon">
                <LinkedinLogo size={20} weight="bold" />
              </a>
            </div>
          </div>

          <div className="footer-nav-group">
            <div className="footer-col">
              <h4>Navegación</h4>
              <a href="#inicio">Inicio</a>
              <Link to="/servicios">Servicios</Link>
              <a href="#aliados">Alianzas</a>
              <a href="#nosotros">Nosotros</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Términos</a>
              <a href="#">Privacidad</a>
            </div>
            <div className="footer-col">
              <h4>Contacto</h4>
              <p className="footer-info">info@pulsingomega.com</p>
              <p className="footer-info">100SE 2nd Street suite 2000<br/>Miami FL 33131</p>
              <a href="#contacto" className="btn-yellow" style={{ marginTop: '1rem', padding: '0.6rem 1.2rem', fontSize: '0.7rem' }}>AGENDAR</a>
            </div>
          </div>
        </div>

        <div className="footer-copy">
          <p>&copy; 2026 UP GOING. International Business Booster. All rights reserved.</p>
          <div className="footer-line"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
