import { useState, useEffect } from 'react';

const teamMembers = [
  {
    id: '01',
    slug: 'felipe',
    name: 'Felipe Hernández',
    role: 'CEO & Founder',
    photo: '/kling_20260425_作品_pon_el_fon_1418_1.png',
    tagline: 'Arquitecto de la expansión internacional.',
    bio: [
      'Empresario, experto en estrategia de expansión empresarial, con más de 5 años de experiencia asesorando holdings familiares, estructuracion y desarrollo de negocios con enfoque en proyectos de inversión en USA  y Colombia.',
    ],
    skills: ['Estrategia Internacional', 'Estructuración Corporativa', 'Expansión a EE.UU.'],
  },
  {
    id: '02',
    slug: 'carla',
    name: 'Carla Zapata',
    role: 'Director of Operations',
    photo: '/carla-ops.jpg',
    tagline: 'Implementación y estrategia de ejecución.',
    bio: [
      'Empresaria, con más de 15 años de experiencia como abogada, especialista en derecho administrativo (Colombia), experta en derecho corporativo y estrategia de expansión. Ha impactado más de 270 empresarios a través de su acompañamiento en procesos de expansión empresarial y visas de inversión, con éxito impecable.',
    ],
    skills: ['Gestión de Proyectos', 'Operaciones Transfronterizas', 'Client Experience'],
  },
  {
    id: '03',
    slug: 'paulina',
    name: 'Paulina Hernández',
    role: 'Directora de Estrategia Comercial y Marketing Digital',
    photo: '/kling_20260425_作品_Replace_pe_1893_1.png',
    tagline: 'Visión estratégica y liderazgo fundacional.',
    bio: [
      'Paulina lidera la estrategia comercial y de marketing digital de la empresa, diseñando e implementando acciones orientadas al crecimiento, posicionamiento y generación de oportunidades de negocio. Su rol integra la planificación comercial, la comunicación estratégica y la gestión de la presencia digital, asegurando que cada iniciativa esté alineada con los objetivos de la organización.',
    ],
    skills: ['Dirección Estratégica', 'Alianzas', 'Desarrollo de Marca'],
  },
  {
    id: '04',
    slug: 'juliana',
    name: 'Juliana Nieto',
    role: 'Comunicación Publicitaria',
    photo: '/kling_20260425_作品_Image1_bac_1928_1.png',
    tagline: 'Conectando con clientes de forma clara y efectiva.',
    bio: [
      'Profesional en comunicación publicitaria responsable de la gestión de redes sociales, y la producción y edición de contenido audiovisual.',
      'Su labor fortalece la comunicación y presencia digital de la empresa, conectándola con sus clientes y mejorando la confianza, el conocimiento y la experiencia en el proceso.'
    ],
    skills: ['Comunicación', 'Redes Sociales', 'Contenido Audiovisual'],
  },
];

const Team = () => {
  const [activeMember, setActiveMember] = useState(null);

  useEffect(() => {
    if (activeMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeMember]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveMember(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="nosotros" className="about-v5 container reveal team-editorial">
      <style>{`
        .team-editorial .section-head { margin-bottom: 4rem; }

        .team-editorial-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }

        .editorial-card {
          position: relative;
          background: transparent;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
          border: none;
          padding: 0;
          text-align: left;
          font: inherit;
          color: inherit;
          width: 100%;
        }

        .editorial-card:hover {
          transform: translateY(-8px);
        }

        .editorial-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: #0a0a0a;
          border-radius: 4px;
        }

        .editorial-photo {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center 20%;
          filter: contrast(1.05) brightness(0.95);
          transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1), filter 0.6s ease;
        }

        .editorial-card:hover .editorial-photo {
          transform: scale(1.06);
          filter: contrast(1.1) brightness(1);
        }

        .editorial-photo::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 40%);
        }

        .editorial-number {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 3;
          font-family: var(--font-title-primary);
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.3em;
          color: rgba(255, 255, 255, 0.85);
          padding: 0.4rem 0.7rem;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(8px);
          border-left: 2px solid var(--accent-yellow);
        }

        .editorial-plus {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          z-index: 3;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--accent-yellow);
          color: #000;
          font-size: 1.4rem;
          font-weight: 300;
          line-height: 1;
          border-radius: 50%;
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          box-shadow: 0 10px 30px rgba(247, 229, 157, 0.25);
        }

        .editorial-card:hover .editorial-plus {
          transform: scale(1.1) rotate(90deg);
        }

        .editorial-info {
          padding: 1.5rem 0 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 1.25rem;
          position: relative;
        }

        .editorial-info::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 0;
          width: 40px;
          height: 2px;
          background: var(--accent-yellow);
        }

        .editorial-role {
          font-family: var(--font-body-clean);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent-yellow);
          margin-bottom: 0.75rem;
          display: block;
        }

        .editorial-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
        }

        .editorial-tagline {
          font-family: var(--font-body-premium);
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.5;
          margin-bottom: 1.25rem;
        }

        .editorial-readmore {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-body-clean);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
          transition: color 0.3s ease, gap 0.3s ease;
        }

        .editorial-card:hover .editorial-readmore {
          color: var(--accent-yellow);
          gap: 0.9rem;
        }

        .editorial-readmore .arrow {
          transition: transform 0.3s ease;
        }

        .editorial-card:hover .editorial-readmore .arrow {
          transform: translateX(4px);
        }

        /* Modal */
        .member-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(25px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.4s ease forwards;
        }

        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .member-modal {
          position: relative;
          width: 100%;
          max-width: 1100px;
          max-height: 90vh;
          background: #0a0a0a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 5fr 7fr;
          animation: slideUp 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }

        .member-modal-photo {
          position: relative;
          background: radial-gradient(circle at 50% 40%, #1a1a1a 0%, #050505 100%);
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .member-modal-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          padding: 1.5rem;
        }

        .member-modal-number {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          font-family: var(--font-title-primary);
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.3em;
          color: #fff;
          padding: 0.5rem 0.9rem;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(8px);
          border-left: 2px solid var(--accent-yellow);
          z-index: 2;
        }

        .member-modal-body {
          padding: 3.5rem 3rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .member-modal-role {
          font-family: var(--font-body-clean);
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--accent-yellow);
          margin-bottom: 1rem;
          position: relative;
          padding-left: 2.5rem;
        }

        .member-modal-role::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 30px;
          height: 1px;
          background: var(--accent-yellow);
        }

        .member-modal-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 700;
          color: #fff;
          line-height: 1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .member-modal-tagline {
          font-family: var(--font-body-premium);
          font-size: 1.05rem;
          font-style: italic;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          line-height: 1.5;
        }

        .member-modal-bio p {
          font-family: var(--font-body-clean);
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.75;
          margin-bottom: 1rem;
        }

        .member-modal-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .member-modal-skill {
          font-family: var(--font-body-clean);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
          padding: 0.45rem 0.9rem;
          border: 1px solid rgba(247, 229, 157, 0.3);
          background: rgba(247, 229, 157, 0.05);
          border-radius: 999px;
        }

        .member-modal-close {
          position: fixed;
          top: 1.25rem;
          right: 1.25rem;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #fff;
          font-size: 1.2rem;
          cursor: pointer;
          border-radius: 50%;
          z-index: 999999;
          transition: all 0.3s ease;
        }

        .member-modal-close:hover {
          background: var(--accent-yellow);
          color: #000;
          border-color: transparent;
          transform: rotate(90deg);
        }

        /* Tablet */
        @media (max-width: 992px) {
          .team-editorial-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          .member-modal {
            grid-template-columns: 1fr;
            max-height: 92vh; overflow-y: auto;
          }
          .member-modal-photo {
            min-height: 420px;
            aspect-ratio: auto;
          }
          .member-modal-img {
            padding: 1rem;
          }
          .member-modal-body {
            padding: 2.5rem 2rem;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .team-editorial-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem;
          }
          .editorial-name { font-size: 1.2rem; }
          .editorial-tagline { font-size: 0.78rem; margin-bottom: 0.9rem; }
          .editorial-readmore { font-size: 0.6rem; }
          .editorial-plus { width: 36px; height: 36px; font-size: 1.2rem; }
          .editorial-info { padding-top: 1rem; margin-top: 1rem; }
          .member-modal-overlay { padding: 0; }
          .member-modal { max-height: 100vh; height: 100vh; border-radius: 0; overflow-y: auto; }
          .member-modal-body { padding: 2rem 1.5rem; }
          .member-modal-photo { min-height: 380px; }
          .member-modal-img { padding: 0.75rem; }
          .member-modal-name { font-size: 2rem; }
        }
      `}</style>

      <div className="section-head">
        <span className="hud-tag">The Visionaries</span>
        <h2 className="title-v5">
          Los que hacen <br />
          <span className="accent">posible</span> tu expansión
        </h2>
      </div>

      <div className="team-editorial-grid">
        {teamMembers.map((m, i) => (
          <button
            key={m.slug}
            type="button"
            className="editorial-card reveal"
            style={{ transitionDelay: `${i * 0.1}s` }}
            onClick={() => setActiveMember(m)}
            aria-label={`Ver biografía de ${m.name}`}
          >
            <div className="editorial-photo-wrap">
              <div
                className="editorial-photo"
                style={{ backgroundImage: `url(${m.photo})` }}
              />
              <span className="editorial-number">N° {m.id}</span>
              <span className="editorial-plus" aria-hidden>+</span>
            </div>
            <div className="editorial-info">
              <span className="editorial-role">{m.role}</span>
              <h3 className="editorial-name">{m.name}</h3>
              <p className="editorial-tagline">{m.tagline}</p>
              <span className="editorial-readmore">
                Leer más <span className="arrow">→</span>
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="team-footer-v6">
        <div className="brand-v6">
          <div className="badge-v6">U</div>
          <span>UP GOING TEAM</span>
        </div>
      </div>

      {activeMember && (
        <div
          className="member-modal-overlay"
          onClick={() => setActiveMember(null)}
        >
          <div
            className="member-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-modal-name"
          >
            <button
              type="button"
              className="member-modal-close"
              onClick={() => setActiveMember(null)}
              aria-label="Cerrar"
            >
              ×
            </button>

            <div className="member-modal-photo">
              <img
                className="member-modal-img"
                src={activeMember.photo}
                alt={activeMember.name}
                loading="lazy"
              />
              <span className="member-modal-number">N° {activeMember.id}</span>
            </div>

            <div className="member-modal-body">
              <span className="member-modal-role">{activeMember.role}</span>
              <h2 id="member-modal-name" className="member-modal-name">
                {activeMember.name}
              </h2>
              <p className="member-modal-tagline">{activeMember.tagline}</p>
              <div className="member-modal-bio">
                {activeMember.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              {activeMember.skills && activeMember.skills.length > 0 && (
                <div className="member-modal-skills">
                  {activeMember.skills.map((skill) => (
                    <span key={skill} className="member-modal-skill">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Team;
