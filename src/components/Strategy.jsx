import React from 'react';

const Strategy = () => {
  return (
    <section className="strategy-section container reveal">
      <div className="strategy-grid">
        <div className="strategy-card glass-v6">
          <h2 className="section-title-v6" style={{ fontSize: '2rem', fontWeight: 950, marginBottom: '2rem' }}>CLIENTE IDEAL</h2>
          <p className="strategy-text">
            Empresarios, emprendedores e inversionistas visionarios decididos a dar el paso de internacionalizar su empresa y dolarizar sus ingresos. Buscamos individuos comprometidos con su transformación empresarial.
          </p>
        </div>
        <div className="strategy-card glass-v6 highlighted">
          <h2 className="section-title-v6" style={{ fontSize: '2rem', fontWeight: 950, marginBottom: '2rem' }}>ESTE RETO NO ES PARA TODOS</h2>
          <ul className="reto-list">
            <li>✦ Empresarios con capacidad de inversión en su expansión.</li>
            <li>✦ Modelos de negocio con base sólida listos para escalar.</li>
            <li>✦ Inversionistas buscando optimizar rentabilidad y resguardar patrimonio en EEUU.</li>
            <li>✦ Personas decididas a dar el paso de internacionalizar su empresa.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Strategy;
