import React from 'react';
import * as Icons from '@phosphor-icons/react';

const partners = [
  { name: 'Marketing e IA', desc: 'Estrategias avanzadas y automatización para empresas.', icon: 'Robot' },
  { name: 'Estructuración y Negocios USA', desc: 'Desarrollo y aterrizaje corporativo en el mercado americano.', icon: 'Buildings' },
  { name: 'Abogados de Inmigración', desc: 'Servicios legales especializados en visas y procesos migratorios.', icon: 'IdentificationCard' },
  { name: 'Abogados Corporativos', desc: 'Respaldo legal integral para operaciones y contratos corporativos.', icon: 'Scales' },
  { name: 'Protección Patrimonial', desc: 'Blindaje y resguardo de activos e inversiones internacionales.', icon: 'ShieldCheck' },
  { name: 'Planeación Tributaria', desc: 'Estrategia fiscal eficiente para operaciones en EE.UU.', icon: 'ChartLineUp' },
  { name: 'Desarrollo Inmobiliario USA', desc: 'Identificación y ejecución de proyectos de real estate.', icon: 'MapPin' },
  { name: 'Proyectos de Inversión USA', desc: 'Portafolios diversificados en los sectores más rentables.', icon: 'HandCoin' },
  { name: 'Inversión Autos y Transporte', desc: 'Oportunidades únicas en el sector automotriz y logístico.', icon: 'Car' },
  { name: 'Seguros', desc: 'Cobertura integral para activos estratégicos y empresas.', icon: 'FileText' },
  { name: 'Logística Internacional', desc: 'Gestión eficiente de cadena de suministro global.', icon: 'Globe' },
  { name: 'Traducciones Oficiales', desc: 'Servicios certificados para documentación legal y técnica.', icon: 'Translate' },
  { name: 'Comercio Internacional', desc: 'Facilitación de importaciones y exportaciones.', icon: 'Truck' },
  { name: 'Personal Shopper USA', desc: 'Asistencia personalizada para adquisiciones en EE.UU.', icon: 'ShoppingCart' },
];

const Allies = () => {
  const renderIcon = (iconName, size = "1em") => {
    const IconComponent = Icons[iconName] || Icons.CaretRight; // Fallback to avoid crash
    return <IconComponent size={size} weight="duotone" />;
  };

  return (
    <section id="aliados" className="allies-v5 container reveal">
      <style>{`
        .flip-card {
          perspective: 1000px;
          height: 160px;
          cursor: pointer;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-front, .flip-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.2rem;
          text-align: center;
          gap: 0.6rem;
        }
        .flip-front {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .flip-back {
          background: #041E41;
          border: 1px solid rgba(247,229,157,0.3);
          transform: rotateY(180deg);
        }
        .flip-icon {
          font-size: 2.2rem;
          color: var(--accent-yellow);
          filter: drop-shadow(0 0 12px rgba(247, 229, 157, 0.2));
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .flip-name {
          font-size: 0.85rem;
          font-weight: 900;
          color: white;
          letter-spacing: 0.03em;
          line-height: 1.2;
          margin: 0;
        }
        .flip-desc {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.4;
          margin: 0;
        }
      `}</style>

      <div className="allies-layout">
        <div className="allies-info">
          <span className="hud-tag">Red Estratégica</span>
          <h2 className="title-v5">Alianzas de <br /><span className="accent">Alto Nivel</span></h2>
          <p>Nuestra infraestructura incluye a los mejores expertos en estructuras legales, tributarias, marketing e inversión inmobiliaria en los Estados Unidos.</p>
        </div>

        <div className="allies-grid">
          {partners.map((partner, i) => (
            <div key={i} className="flip-card reveal" style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="flip-card-inner">
                <div className="flip-front">
                  <div className="flip-icon">{renderIcon(partner.icon)}</div>
                  <h3 className="flip-name">{partner.name}</h3>
                </div>
                <div className="flip-back">
                  <div className="flip-icon" style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>{renderIcon(partner.icon)}</div>
                  <p className="flip-desc">{partner.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Allies;
