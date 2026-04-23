import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollToSection = (e, id) => {
    if (isHome) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="nav">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        <Link to="/" className="logo-container" style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
          <img src="/upgoing.png" alt="Up Going" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
        </Link>
        <div className="nav-links" style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
          {isHome ? (
            <a href="#inicio" className="nav-item" onClick={(e) => scrollToSection(e, 'inicio')}>Inicio</a>
          ) : (
            <Link to="/" className="nav-item">Inicio</Link>
          )}
          
          <Link to="/servicios" className="nav-item">Servicios</Link>
          
          {isHome ? (
            <a href="#aliados" className="nav-item" onClick={(e) => scrollToSection(e, 'aliados')}>Alianzas</a>
          ) : (
            <Link to="/#aliados" className="nav-item">Alianzas</Link>
          )}

          {isHome ? (
            <a href="#nosotros" className="nav-item" onClick={(e) => scrollToSection(e, 'nosotros')}>Nosotros</a>
          ) : (
            <Link to="/#nosotros" className="nav-item">Nosotros</Link>
          )}

          <a href="#contacto" className="btn-yellow" style={{ padding: '0.8rem 1.5rem', fontSize: '0.75rem' }}>AGENDAR SESIÓN</a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
