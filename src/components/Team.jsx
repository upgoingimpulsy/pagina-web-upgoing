import React from 'react';

const Team = () => {
  return (
    <section id="nosotros" className="about-v5 container reveal">
      <div className="section-head">
        <span className="hud-tag">The Visionaries</span>
        <h2 className="title-v5">Los que hacen <br /><span className="accent">posible</span> tu expansión</h2>
      </div>
      
      <div className="team-grid-v6">
        {/* Felipe - CEO */}
        <div className="team-item reveal">
          <div className="team-photo-v6 felipe">
            <div className="card-accent-v6"></div>
            <span className="card-num-v6">01</span>
            <div className="team-info-v6">
              <p className="team-role-v6">CEO & Founder</p>
              <h3 className="team-name-v6">Felipe<br/>Hernández</h3>
            </div>
          </div>
        </div>

        {/* Carla - Operaciones */}
        <div className="team-item reveal" style={{ transitionDelay: '0.1s' }}>
          <div className="team-photo-v6 carla">
            <div className="card-accent-v6"></div>
            <span className="card-num-v6">02</span>
            <div className="team-info-v6">
              <p className="team-role-v6">Directora de Operaciones</p>
              <h3 className="team-name-v6">Carla<br/>Zapata</h3>
            </div>
          </div>
        </div>

        {/* Paulina */}
        <div className="team-item reveal" style={{ transitionDelay: '0.2s' }}>
          <div className="team-photo-v6 paulina">
            <div className="card-accent-v6"></div>
            <span className="card-num-v6">03</span>
            <div className="team-info-v6">
              <p className="team-role-v6">Socia Fundadora</p>
              <h3 className="team-name-v6">Paulina<br/>Hernández</h3>
            </div>
          </div>
        </div>

        {/* Juliana */}
        <div className="team-item reveal" style={{ transitionDelay: '0.3s' }}>
          <div className="team-photo-v6 juliana">
            <div className="card-accent-v6"></div>
            <span className="card-num-v6">04</span>
            <div className="team-info-v6">
              <p className="team-role-v6">Abogada Senior</p>
              <h3 className="team-name-v6">Juliana<br/>Nieto</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="team-footer-v6">
        <div className="brand-v6">
           <div className="badge-v6">U</div>
           <span>UP GOING TEAM</span>
        </div>
      </div>
    </section>
  );
};

export default Team;
