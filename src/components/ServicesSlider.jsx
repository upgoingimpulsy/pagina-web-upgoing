import React, { useState } from 'react';

const getVideoType = (url) => {
  if (!url) return "video/mp4";
  const extension = url.split('.').pop().toLowerCase();
  if (extension === 'mov') return "video/quicktime";
  return "video/mp4";
};

const ServicesSlider = ({ services, activeVideo, setActiveVideo }) => {
  const [activeCard, setActiveCard] = useState(1);

  const handleCardClick = (index) => {
    if (index === activeCard) {
      setActiveVideo(services[index].video);
    } else {
      setActiveCard(index);
    }
  };

  return (
    <section className="services-rotation-module">
      <style>{`
        .services-rotation-module {
          padding: 120px 0;
          background: #000;
          overflow: hidden;
          perspective: 2000px;
        }

        .slider-title-center {
          text-align: center;
          margin-bottom: 80px;
        }

        .slider-title-center .hud-tag {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.4em;
          color: #ffd200;
          border: 1px solid rgba(255,210,0,0.3);
          padding: 0.5rem 1.5rem;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
        }

        .slider-title-center h2 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 950;
          color: white;
          text-transform: uppercase;
          line-height: 1;
        }

        .rotation-container {
          position: relative;
          height: 600px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 40px;
        }

        .rotation-card {
          position: absolute;
          width: 400px;
          height: 550px;
          background: #111;
          border-radius: 40px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
          transform-style: preserve-3d;
          border: 1px solid rgba(255,255,255,0.1);
        }

        /* 3D States */
        .rotation-card.prev {
          transform: translateX(-55%) rotateY(35deg) translateZ(-100px) scale(0.9);
          opacity: 0.6;
          z-index: 1;
        }

        .rotation-card.active {
          transform: translateX(0) rotateY(0) translateZ(150px) scale(1.1);
          opacity: 1;
          z-index: 10;
          border-color: rgba(255, 210, 0, 0.5);
          box-shadow: 0 50px 100px rgba(0,0,0,0.8), 0 0 50px rgba(255, 210, 0, 0.1);
        }

        .rotation-card.next {
          transform: translateX(55%) rotateY(-35deg) translateZ(-100px) scale(0.9);
          opacity: 0.6;
          z-index: 1;
        }

        .rotation-card.hidden {
          opacity: 0;
          pointer-events: none;
          transform: scale(0.5) translateZ(-1000px);
        }

        .card-video-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .card-video-wrap video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          filter: brightness(0.6);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent 60%);
          z-index: 2;
        }

        .card-id {
          font-size: 0.8rem;
          font-weight: 900;
          color: #ffd200;
          margin-bottom: 0.5rem;
          display: block;
        }

        .card-title {
          font-size: 2rem;
          font-weight: 900;
          color: white;
          text-transform: uppercase;
          line-height: 1.1;
          margin-bottom: 1rem;
        }

        .card-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.1);
          padding: 0.5rem 1rem;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 700;
          color: white;
          width: fit-content;
          backdrop-filter: blur(10px);
        }

        @media (max-width: 768px) {
          .rotation-card { width: 280px; height: 400px; }
          .rotation-container { height: 450px; }
          .rotation-card.prev { transform: translateX(-50%) rotateY(35deg) translateZ(-200px) scale(0.8); }
          .rotation-card.next { transform: translateX(50%) rotateY(-35deg) translateZ(-200px) scale(0.8); }
        }
      `}</style>

      <div className="container">
        <div className="slider-title-center reveal">
          <span className="hud-tag">Portfolio</span>
          <h2>Modelos de <br/> <span style={{ color: '#ffd200' }}>Inversión</span></h2>
        </div>

        <div className="rotation-container reveal">
          {services.map((s, i) => {
            let state = "hidden";
            if (i === activeCard) state = "active";
            else if (i === activeCard - 1 || (activeCard === 0 && i === services.length - 1)) state = "prev";
            else if (i === activeCard + 1 || (activeCard === services.length - 1 && i === 0)) state = "next";

            return (
              <div 
                key={i} 
                className={`rotation-card ${state}`}
                onClick={() => handleCardClick(i)}
              >
                <div className="card-video-wrap">
                  <video autoPlay loop muted playsInline>
                    <source src={s.video} type={getVideoType(s.video)} />
                  </video>
                </div>
                <div className="card-overlay">
                  <span className="card-id">S-0{i+1}</span>
                  <h3 className="card-title">{s.title}</h3>
                  <div className="card-badge">
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffd200' }}></span>
                    {activeCard === i ? 'HACER CLICK PARA AMPLIAR' : 'VER MÓDULO'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal - Same as before but consistent */}
      {activeVideo && (
        <div className="video-modal-overlay" onClick={() => setActiveVideo(null)} style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.95)',
          backdropFilter: 'blur(25px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()} style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1200px',
            background: '#080808',
            borderRadius: '40px',
            overflow: 'hidden',
            boxShadow: '0 50px 100px rgba(0,0,0,0.9)'
          }}>
            <button className="modal-close" onClick={() => setActiveVideo(null)} style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'white',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              fontSize: '1.5rem',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>&times;</button>
            <video autoPlay controls style={{ width: '100%', maxHeight: '80vh', background: '#000' }}>
              <source src={activeVideo} type={getVideoType(activeVideo)} />
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesSlider;
