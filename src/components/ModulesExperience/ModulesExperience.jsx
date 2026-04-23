import { useScrollExperience } from './useScrollExperience';
import './modules-experience.css';

export default function ModulesExperience() {
  useScrollExperience();

  return (
    <div className="experience-wrap">

      {/* STAGE: PLEEX sale a la derecha, BTS entra desde la izquierda, luego scroll normal */}
      <div className="stage" data-stage>
        <div className="stage-pin">
          {/* Fondos con crossfade */}
          <div className="stage-bg pleex-bg" data-bg="pleex"></div>
          <div className="stage-bg bts-bg" data-bg="bts"></div>

          {/* ── PANEL 01: PLEEX ── */}
          <div className="stage-panel" data-panel="pleex">
            <div className="container module-content" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="method-box glass-v6 pleex-style" style={{ margin: '0 auto', textAlign: 'center' }}>
                <div className="method-header">
                  <span className="method-tag stagger">METODOLOGÍA EXCLUSIVA</span>
                  <h2 className="method-title stagger">PLEEX: PLAN ESTRATÉGICO DE EXPANSIÓN</h2>
                </div>
                <p className="method-desc stagger">
                  No solo estructuramos acuerdos legales, implementamos su hoja de ruta
                  personalizada de expansión y asistimos en la operación y desarrollo
                  de sus proyectos en EEUU.
                </p>
                <div className="steps-row" style={{ justifyContent: 'center' }}>
                  <div className="step-item stagger"><span>01</span> Diagnóstico</div>
                  <div className="step-item stagger"><span>02</span> Contrato</div>
                  <div className="step-item stagger"><span>03</span> Sesión 1-1</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── PANEL 02: BTS ── */}
          <div className="stage-panel" data-panel="bts">
            <div className="container module-content" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="method-box glass-v6 bts-style" style={{ margin: '0 auto', textAlign: 'center' }}>
                <div className="method-header">
                  <span className="method-tag stagger-bts" style={{ color: 'var(--accent-gold)' }}>
                    FASE DE TRACCIÓN
                  </span>
                  <h2 className="method-title stagger-bts">BTS: Business To Success</h2>
                </div>
                <p className="method-desc stagger-bts">
                  La fase de aterrizaje y escalabilidad real. Nos aseguramos de que
                  su negocio no solo exista, sino que prospere con tracción comercial
                  y operativa en el mercado americano.
                </p>
                <div className="steps-row" style={{ justifyContent: 'center' }}>
                  <div className="step-item stagger-bts">
                    <span style={{ color: 'var(--accent-gold)' }}>04</span> Landing
                  </div>
                  <div className="step-item stagger-bts">
                    <span style={{ color: 'var(--accent-gold)' }}>05</span> Operation
                  </div>
                  <div className="step-item stagger-bts">
                    <span style={{ color: 'var(--accent-gold)' }}>06</span> Success
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
