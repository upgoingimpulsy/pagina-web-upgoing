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
      <div className="container nav-container">
        <Link to="/" className="logo-container">
          <img src="/upgoing.png" alt="Up Going" />
        </Link>
        <div className="nav-links">
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

          <a href="#contacto" className="btn-yellow nav-cta">AGENDAR SESIÓN</a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
