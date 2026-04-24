import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import ModulesExperience from '../components/ModulesExperience/ModulesExperience';
import Footer from '../components/Footer';

const ServicesPage = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const servicesData = [
    {
      id: "01",
      tag: "EMPRENDEDORES",
      title: "Servicio Estándar",
      price: "$650",
      priceNote: "Texas y Florida",
      description: "Este plan, dirigido a emprendedores y empresarios locales (que ya están en EEUU) o extranjeros en etapa inicial que solo requieren constituir una LLC que les permita alcanzar un objetivo o propósito especifico.",
      video: "/IMG_5689.mp4",
      scopeTitle: "ALCANCE:",
      scope: [
        "Apertura LLC constitución o registro estatal",
        "Artículos de incorporación del Estado",
        "Solicitud de EIN (número de identificación tributaria para el negocio)",
        "Certificado de impuestos sobre las ventas (si aplicara)"
      ]
    },
    {
      id: "02",
      tag: "EMPRESARIOS",
      title: "Servicio Premium",
      price: "$1.350",
      priceNote: "USD - Incluye State Fee Florida",
      description: "Dirigido empresarios y emprendedores extranjeros que buscan expandir la operación de su empresa a Estados Unidos o establecer un negocio desde cero, protegiendo su patrimonio y generando ingresos en dólares.",
      video: "/IMG_5687.mp4",
      scopeTitle: "ESTRUCTURACIÓN LEGAL Y TRIBUTARIA:",
      scope: [
        "Verificación de disponibilidad de nombre y Registro Estatal (LLC, C-Corp o S-corp)",
        "Solicitud de EIN (Número de identificación Tributario)",
        "Operating Agreement (Acuerdo operativo)",
        "Servicio de agente registrado por 1 año (En Florida)",
        "Primer mes de dirección Comercial en USA (Miami FL 33131)",
        "Aplicación cuenta bancaria empresarial",
        "Guía de permisos y licencias"
      ]
    },
    {
      id: "03",
      tag: "INVERSIONISTAS",
      title: "Plan Empresario Elite",
      price: "$6.500",
      priceNote: "PLEEX Implementation",
      description: "Dirigido a empresarios y emprendedores que buscan expandir la operación de sus negocios a través de la implementación del PLEEX (Plan Estratégico de Expansión) personalizado según sus objetivos específicos.",
      video: "/IMG_5685.mp4",
      scopeTitle: "SERVICIOS PREMIUM + SIGUIENTE ALCANCE:",
      scope: [
        "Solicitud de ITIN (número de identificación tributario personal)",
        "Registro de Código DUNS",
        "Proceso de construcción del crédito comercial",
        "Directorio y Acceso a red de profesionales aliados",
        "Guía de planeación Tributaria",
        "Asesoría desarrollo de proyectos de inversión inmobiliaria en USA",
        "Business Plan (Estudio de viabilidad y Proyección financiera)"
      ]
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="services-page-v7">
      <style>{`
        .services-page-v7 {
          background: #000;
          color: #fff;
          min-height: 100vh;
        }

        .services-hero-section {
          padding: 180px 0 100px;
          text-align: center;
          background: radial-gradient(circle at 50% 0%, rgba(255, 210, 0, 0.1), transparent 70%);
        }

        .services-hero-section h1 {
          font-family: var(--font-title-primary);
          font-size: clamp(3rem, 10vw, 7rem);
          text-transform: uppercase;
          line-height: 0.9;
          margin-bottom: 2rem;
          letter-spacing: -0.05em;
        }

        .services-hero-section .accent {
          font-family: var(--font-title-secondary);
          color: #ffd200;
          -webkit-text-stroke: 1px #ffd200;
          -webkit-text-fill-color: transparent;
        }

        /* ── Split Layout Sections ── */
        .service-detail-block {
          padding: 100px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }

        .detail-grid.reverse {
          direction: rtl;
        }
        
        .detail-grid.reverse .detail-text {
          direction: ltr;
        }

        .detail-text {
          max-width: 550px;
        }

        .service-num {
          font-size: 0.8rem;
          font-weight: 900;
          color: #ffd200;
          letter-spacing: 0.4em;
          margin-bottom: 1.5rem;
          display: block;
        }

        .service-name {
          font-family: var(--font-title-primary);
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          text-transform: uppercase;
          line-height: 1;
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
        }

        .service-para {
          font-family: var(--font-body-premium);
          font-size: 1.1rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          margin-bottom: 3rem;
        }

        .feature-bullets {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .feature-bullets li {
          font-family: var(--font-body-clean);
          font-size: 0.9rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: rgba(255,255,255,0.8);
        }

        .feature-bullets li::before {
          content: '';
          width: 6px;
          height: 6px;
          background: #ffd200;
          border-radius: 50%;
        }

        .detail-visual {
          position: relative;
          width: 100%;
          max-width: 450px;
          margin: 0 auto;
          aspect-ratio: 400 / 550;
          border-radius: 40px;
          overflow: hidden;
          background: #111;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }

        .detail-visual video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%; /* Centra mejor las cabezas en videos verticales */
          transition: transform 0.8s ease;
        }

        .detail-visual:hover video {
          transform: scale(1.05);
        }

        .play-trigger {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.2);
          opacity: 0;
          transition: all 0.3s ease;
          cursor: pointer;
          z-index: 5;
        }

        .detail-visual:hover .play-trigger {
          opacity: 1;
        }

        .play-btn {
          width: 80px;
          height: 80px;
          background: #ffd200;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
          font-size: 1.5rem;
          transform: scale(0.8);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .detail-visual:hover .play-btn {
          transform: scale(1);
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 992px) {
          .detail-grid { grid-template-columns: 1fr; gap: 4rem; }
          .detail-grid.reverse { direction: ltr; }
          .detail-text { max-width: 100%; order: 2; }
          .detail-visual { order: 1; margin-bottom: 2rem; }
          .feature-bullets { grid-template-columns: 1fr; }
          .services-hero-section { padding: 120px 0 60px; }
          .price-tag-v6 span[style*="font-size: 2.5rem"] { font-size: 1.8rem !important; }
        }
      `}</style>

      <Navigation />

      <section className="services-hero-section reveal">
        <div className="container">
          <span className="hud-tag" style={{
            fontSize: '0.7rem',
            fontWeight: 900,
            letterSpacing: '0.3em',
            color: '#ffd200',
            border: '1px solid rgba(255,210,0,0.3)',
            padding: '0.5rem 1rem',
            display: 'inline-block',
            marginBottom: '2rem'
          }}>Service Portfolio</span>
          <h1>Especialistas en <br/> <span className="accent">EE.UU.</span></h1>
        </div>
      </section>

      <main>
        {servicesData.map((s, i) => (
          <section key={i} className="service-detail-block">
            <div className={`container detail-grid ${i % 2 !== 0 ? 'reverse' : ''}`}>
              <div className="detail-text reveal">
                <span className="service-num">MÓDULO {s.id}</span>
                <span className="hud-tag" style={{ marginLeft: '1rem', fontSize: '0.6rem' }}>{s.tag}</span>
                <h2 className="service-name">{s.title}</h2>
                <p className="service-para">{s.description}</p>
                
                <div className="price-tag-v6" style={{ 
                  margin: '2rem 0', 
                  padding: '1.5rem', 
                  background: 'rgba(255,210,0,0.05)', 
                  borderLeft: '4px solid #ffd200',
                  borderRadius: '0 20px 20px 0'
                }}>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: '#ffd200', fontWeight: 900, marginBottom: '0.5rem' }}>INVERSIÓN</span>
                  <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', fontFamily: 'var(--font-title-primary)' }}>{s.price}</span>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginLeft: '1rem' }}>{s.priceNote}</span>
                </div>

                <div className="scope-list-v6">
                  <h4 style={{ 
                    fontSize: '0.8rem', 
                    color: '#ffd200', 
                    marginBottom: '1.5rem', 
                    letterSpacing: '0.1em',
                    fontFamily: 'var(--font-body-premium)'
                  }}>{s.scopeTitle}</h4>
                  <ul className="feature-bullets">
                    {s.scope.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="detail-visual reveal" onClick={() => setActiveVideo(s.video)}>
                <video autoPlay loop muted playsInline style={{ width: '100%', borderRadius: '30px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                  <source src={s.video} type="video/mp4" />
                </video>
                <div className="play-trigger">
                  <div className="play-btn">▶</div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>

      <ModulesExperience />
      <Footer />

      {/* Video Modal */}
      {activeVideo && (
        <div className="video-modal-overlay" onClick={() => setActiveVideo(null)} style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.95)',
          backdropFilter: 'blur(30px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()} style={{
            position: 'relative',
            width: 'auto',
            maxWidth: '95vw',
            maxHeight: '92vh',
            background: 'transparent',
            borderRadius: '20px',
            overflow: 'hidden',
            display: 'inline-block',
            lineHeight: 0
          }}>
            <button className="modal-close" onClick={() => setActiveVideo(null)} style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              fontSize: '1.5rem',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}>&times;</button>
            <video autoPlay controls style={{ maxHeight: '92vh', maxWidth: '95vw', width: 'auto', height: 'auto', display: 'block' }}>
              <source src={activeVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
