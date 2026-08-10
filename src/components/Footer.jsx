import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InstagramLogo, WhatsappLogo, LinkedinLogo } from '@phosphor-icons/react';

const Footer = () => {
  const [modalContent, setModalContent] = useState(null);

  const renderModal = () => {
    if (!modalContent) return null;

    const contentMap = {
      legal: {
        title: "Aviso Legal y Descargo de Responsabilidad / Legal Notice and Disclaimer",
        body: (
          <>
            <h5>Español</h5>
            <p>UpGoing es una firma especializada en expansión empresarial, experta en estructuración y desarrollo de negocios en EEUU. Somos un equipo interdisciplinario que, a partir de nuestra experiencia y conocimientos, ayudamos a empresarios e inversionistas latinoamericanos, a expandir su negocios y operaciones a EEUU. Brindamos un acompañamiento integral y personalizado, estructuramos su plan de expansión estratégico y ponemos a su disposición una amplia red de aliados profesionales expertos en diferentes áreas, verificados y licenciados en EEUU, que facilitarán su proceso y les permitirán avanzar de forma ágil y segura, evitando errores, optimizando tiempo y recursos.</p>
            <p>La información suministrada en nuestros canales y durante nuestra consultoría y acompañamiento tiene un carácter exclusivamente informativo y educativo. No constituye asesoría ni consejo legal, tributario o migratorio en los Estados Unidos, ni sustituye el concepto profesional de un abogado, contador, u otro profesional debidamente licenciado en la jurisdicción correspondiente. Cuando el proyecto del cliente lo requiera, UpGoing coordinará la asesoría y acompañamiento con profesionales especializados y licenciados para la prestación de dichos servicios.</p>
            
            <h5 style={{marginTop: '2rem'}}>English</h5>
            <p>UpGoing is a firm specializing in business expansion, with expertise in structuring and developing businesses in the United States. As an interdisciplinary team, we leverage our experience and knowledge, to help Latin American entrepreneurs and investors to expand their businesses and operations into the US. Market. We provide comprehensive and personalized support by structuring strategic expansion plans and connecting clients with a vast network of vetted, licensed professional partners across various fields; these experts facilitate the process, enabling clients to move forward swiftly and securely while avoiding errors and optimizing time and resources.</p>
            <p>The information provided through our channels and during our consultancy and support services is strictly for informational and educational purposes. It does not constitute legal, tax or immigration advice or guidance in the United States, nor does it replace professional guidance from an attorney, accountant or other professional duly licensed in the relevant jurisdiction. When the client’s project requires it, UpGoing will coordinate advisory and support services with specialized, licensed professionals qualified to provide such services.</p>
          </>
        )
      },
      terms: {
        title: "Términos y condiciones / Terms and Conditions",
        body: (
          <>
            <h5>Español</h5>
            <p>En UpGoing nos comprometemos a proporcionar el mejor servicio posible con información precisa, orientación experta y personalizada, a través de nuestros planes estratégicos de Expansión; sin embargo, dada la naturaleza consultiva de nuestros servicios, es importante destacar que, nuestra obligación es de medio y no de resultado, por lo tanto, no podemos garantizar resultados específicos.</p>
            <p>Nuestras acciones están encaminadas a la estructuración de un plan estratégico ajustado al perfil de cada empresario o inversionista. El éxito de este proceso depende en gran medida de las decisiones, acciones desplegadas, compromiso, capacidad de inversión y responsabilidad directa de cada empresario.</p>
            <p>Por lo tanto, UpGoing no asume ninguna responsabilidad por resultados que no cumplan con las expectativas individuales o que se vean afectados por circunstancias o decisiones ajenas a nuestro control, como aprobación de créditos, licencias, visas, cuentas, contratos, rentabilidad, resultados comerciales específicos, entre otros. Excepto la garantía de estructuración corporativa, por la cual si respondemos (si no obtienes tu empresa legalmente registrada, te devolvemos tu dinero).</p>
            <p>UPGOING presta servicios de consultoría, acompañamiento, estructuración y desarrollo de negocios, planificación y estructura de expansión empresarial; no actúa como broker, CPA, firma de abogados, autoridad gubernamental, contratista general ni aseguradora. Las recomendaciones se basan en la información disponible y no sustituyen asesoría profesional regulada.</p>
            <p>Agradecemos su comprensión y confianza en nuestro equipo. Estamos a su disposición para acompañarlos en cada paso del proceso, no obstante el resultado exitoso, dependerá en última instancia de sus propias decisiones y nivel de compromiso.</p>

            <h5 style={{marginTop: '2rem'}}>English</h5>
            <p>At UpGoing, we are committed to providing the best possible service —offering accurate information and personalized, expert guidance—through our strategic expansion plans; however, given the advisory nature of our services, it is important to note that our obligation is one of means rather than results, and therefore we cannot guarantee specific outcomes.</p>
            <p>Our actions are focused on structuring a strategic plan tailored to the specific profile of each entrepreneur or investor. The success of this process depends largely on the decisions made, actions taken, level of commitment, investment capacity and the direct responsibility of each entrepreneur.</p>
            <p>Consequently, UpGoing assumes no liability for results that fail to meet individual expectations or that are affected by circumstances or decisions beyond our control, such as the approval of loans, licenses, visas, accounts, or contracts, as well as profitability or specific commercial outcomes, amongst others. The sole exception is our corporate structuring guarantee, under which we do accept liability (if your company is not successfully registered, we will refund your money).</p>
            <p>UPGOING provides consultancy, guidance, business structuring and development, and business expansion planning services; it does not act as a broker, CPA, law firm, government authority, general contractor or insurance provider. Our recommendations are based on available information and do not replace regulated professional advice.</p>
            <p>We appreciate your understanding and trust in our team. We are here to support you every step of the way; however, a successful outcome will ultimately depend on your own decisions and level of commitment.</p>
          </>
        )
      }
    };

    return (
      <div className="legal-modal-overlay" onClick={() => setModalContent(null)}>
        <div className="legal-modal-content" onClick={e => e.stopPropagation()}>
          <button className="legal-modal-close" onClick={() => setModalContent(null)}>×</button>
          <h3 style={{marginBottom: '2rem', color: 'var(--accent-yellow)', fontSize: '1.5rem'}}>{contentMap[modalContent].title}</h3>
          <div className="legal-text-scroll">
            {contentMap[modalContent].body}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
    <style jsx>{`
      .legal-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px); z-index: 99999; display: flex; justify-content: center; align-items: center; padding: 2rem; }
      .legal-modal-content { font-family: system-ui, -apple-system, sans-serif; text-transform: none; text-align: left; background: #050505; border: 1px solid rgba(255,255,255,0.1); border-top: 3px solid var(--accent-yellow); width: 100%; max-width: 800px; max-height: 85vh; border-radius: 8px; padding: 3rem; position: relative; box-shadow: 0 20px 50px rgba(0,0,0,0.5); display: flex; flex-direction: column; }
      .legal-modal-close { position: absolute; top: 1.5rem; right: 1.5rem; background: transparent; border: none; color: white; font-size: 2rem; cursor: pointer; opacity: 0.5; transition: 0.3s; line-height: 1; }
      .legal-modal-close:hover { opacity: 1; color: var(--accent-yellow); }
      .legal-text-scroll { overflow-y: auto; padding-right: 1rem; flex: 1; }
      .legal-text-scroll p { font-family: system-ui, -apple-system, sans-serif; font-weight: normal; letter-spacing: normal; text-transform: none; font-size: 0.95rem; line-height: 1.6; color: rgba(255,255,255,0.8); margin-bottom: 1.2rem; }
      .legal-text-scroll h5 { font-family: system-ui, -apple-system, sans-serif; font-weight: bold; letter-spacing: normal; text-transform: uppercase; color: white; font-size: 1.1rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; }
      
      .legal-link-btn { background: transparent; border: none; color: rgba(255,255,255,0.6); font-family: var(--font-body); font-size: 0.8rem; cursor: pointer; text-align: left; padding: 0; transition: color 0.3s; margin-bottom: 0.8rem; }
      .legal-link-btn:hover { color: var(--accent-yellow); }
    `}</style>
    {renderModal()}
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
              <button className="legal-link-btn" onClick={() => setModalContent('terms')}>Términos y Condiciones</button>
              <button className="legal-link-btn" onClick={() => setModalContent('legal')}>Aviso Legal</button>
            </div>
            <div className="footer-col">
              <h4>Contacto</h4>
              <p className="footer-info">upgoing@upgoingus.com</p>
              <p className="footer-info">100SE 2nd Street suite 2000<br/>Miami FL 33131</p>
              <a href="#contacto" className="btn-yellow" style={{ marginTop: '1rem', padding: '0.6rem 1.2rem', fontSize: '0.7rem' }}>AGENDAR</a>
            </div>
          </div>
        </div>

        <div className="footer-copy">
          <div className="footer-legal-disclaimer" style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.4)', marginTop: '2rem', lineHeight: '1.5', textAlign: 'center', maxWidth: '800px', margin: '2rem auto 0' }}>
            <p style={{ marginBottom: '0.5rem' }}></p>
            <p style={{ marginBottom: '0.5rem' }}>UpGoing International LLC — Sociedad de Responsabilidad Limitada registrada en el Estado de Florida, EE.UU. N.º de registro L25000496410</p>
            <p>upgoing@upgoingus.com</p>
          </div>
          <p style={{ marginTop: '2rem' }}>&copy; 2026 UP GOING. International Business Booster. All rights reserved.</p>
          <div className="footer-line"></div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;

