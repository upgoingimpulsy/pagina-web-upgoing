import React, { useState, useEffect, useRef } from 'react';

const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: 'Bienvenido a **UP GOING**. Soy tu consultor de expansión internacional. ¿Buscas agendar una llamada de diagnóstico gratuita o conocer nuestros planes corporativos?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showBeam, setShowBeam] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowWelcomePopup(true);
        // Step 2: Trigger beam after popup shows
        setTimeout(() => setShowBeam(true), 2500);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const KNOWLEDGE_BASE = {
    general: {
      who: "UP GOING es una firma de Consultoría de Negocios Internacionales con sede principal en Miami y operaciones en Colombia, especializada en la expansión de empresas latinas al mercado estadounidense.",
      promesa: "Diseñamos y ejecutamos la hoja de ruta integral para que empresarios e inversionistas lleven su operación a EE.UU. con éxito, protegiendo su patrimonio y generando ingresos en la moneda más estable del mundo (Dólares).",
      metodologia: "Nuestra metodología exclusiva combina el **PLEEX** (Plan Estratégico de Expansión) para la fase de estructuración, y el **BTS** (Business To Success) para la fase de tracción y escalabilidad en suelo americano.",
      alianza: "Nuestra red de aliados es un ecosistema completo que incluye expertos en Marketing e IA, Abogados de Inmigración y Corporativos, Planeación Tributaria, Real Estate y Logística Internacional. No solo te damos una visa, te damos un negocio que funciona."
    },
    proceso: {
      paso1: "Diagnóstico Inicial: Analizamos la viabilidad de tu modelo de negocio para el mercado USA.",
      paso2: "Estructuración PLEEX: Diseño de la arquitectura legal, tributaria y operativa.",
      paso3: "Fase BTS: Aterrizaje operativo (Landing) y búsqueda de rentabilidad (Success)."
    },
    servicios: {
      estandar: "**Plan Estándar**: Enfocado en la formalización básica. Registro de LLC, EIN y estructura inicial para operar.",
      premium: "**Plan Premium**: Acompañamiento corporativo completo. Incluye dirección física en USA, Operating Agreement profesional y apertura de cuentas bancarias corporativas.",
      elite: "**Plan Empresario Elite**: El estándar de oro. Implementación PLEEX completa + Diagnóstico de mercado, Construcción de crédito comercial y Planeación tributaria avanzada.",
      visa: "**Programa Visa Inversionista**: Solución integral llave en mano. Estructuramos el negocio para cumplir con los requisitos de la Visa E-2 o EB-5, incluyendo el plan de negocios migratorio y acompañamiento legal prioritario."
    },
    requisitos: "Trabajamos con empresarios decididos. Aunque evaluamos cada caso, el perfil ideal tiene un modelo de negocio probado en su país de origen y capacidad de inversión estratégica para el mercado americano."
  };

  const getAIResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('agendar') || q.includes('sesion') || q.includes('llamada') || q.includes('contacto') || q.includes('whatsapp')) {
      setShowLeadForm(true);
      return "¡Excelente! Puedes agendar directamente en nuestro calendario arriba, o si prefieres, déjanos tus datos aquí mismo y un asesor de ventas te escribirá por WhatsApp de inmediato.";
    }

    if (q.includes('quienes') || q.includes('empresa') || q.includes('quiénes')) return `${KNOWLEDGE_BASE.general.who} ${KNOWLEDGE_BASE.general.promesa}`;
    if (q.includes('estandar') || q.includes('estándar') || q.includes('basico')) return KNOWLEDGE_BASE.servicios.estandar;
    if (q.includes('premium') || q.includes('plus')) return KNOWLEDGE_BASE.servicios.premium;
    if (q.includes('elite') || q.includes('empresario') || q.includes('pleex')) return `${KNOWLEDGE_BASE.servicios.elite} Mediante nuestra metodología ${KNOWLEDGE_BASE.general.metodologia}`;
    if (q.includes('visa')) return KNOWLEDGE_BASE.servicios.visa;
    if (q.includes('requisito') || q.includes('factura') || q.includes('reto')) return KNOWLEDGE_BASE.requisitos;
    if (q.includes('paso') || q.includes('proceso') || q.includes('diagnostico')) return `Nuestro proceso consta de: 1. ${KNOWLEDGE_BASE.proceso.paso1} 2. ${KNOWLEDGE_BASE.proceso.paso2} 3. ${KNOWLEDGE_BASE.proceso.paso3}`;

    return "Como impulsadora internacional, mi prioridad es tu expansión. ¿Te gustaría conocer los detalles de un plan específico o agendar una llamada gratuita?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      // Llamada al agente de IA en n8n
      const response = await fetch('https://santiagon8nmejia.dominadoresia.com/webhook/upgoing-web', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMsg,
          sessionId: 'ug-web-session-001',
          source: 'upgoing-web-v5',
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      console.log('Respuesta de n8n:', data);
      
      // Manejamos la respuesta (buscamos 'output', 'response' o 'message' según n8n)
      let aiResponse = '';
      if (Array.isArray(data)) {
        aiResponse = data[0]?.output || data[0]?.response || data[0]?.message;
      } else {
        aiResponse = data.output || data.response || data.message || 
                     (typeof data === 'string' ? data : null);
      }

      if (!aiResponse) {
        console.warn('n8n no devolvió un mensaje claro, usando fallback.');
        aiResponse = getAIResponse(userMsg);
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error('Error detallado de conexión:', error);
      // Fallback a respuesta local si el webhook falla
      const fallbackResponse = getAIResponse(userMsg);
      setMessages(prev => [...prev, { role: 'ai', content: fallbackResponse }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    setMessages(prev => [...prev, { role: 'ai', content: `Gracias **${data.name}**. Solicitud recibida. Un asesor de UP GOING te contactará al **${data.phone}** vía WhatsApp en breve para coordinar tu sesión.` }]);
    setShowLeadForm(false);

    // Simulate Trigger (Triggering WhatsApp Follow-up via n8n)
    console.log("Automation Triggered: WhatsApp follow-up for", data.phone);
  };

  return (
    <div className={`assistant-wrapper ${isOpen ? 'active' : ''}`}>
      {!isOpen && (
        <>
          {showWelcomePopup && (
            <div className="welcome-popup-center fade-in-scale">
              <button className="close-popup" onClick={() => setShowWelcomePopup(false)}>×</button>
              <div className="popup-badge">EXPERT AI ONSITE</div>
              <h3>¿LISTO PARA ESCALAR A USA?</h3>
              <p>Detectamos un perfil con alto potencial de expansión. ¿Hablamos sobre tu hoja de ruta?</p>
              <button className="popup-btn-large" onClick={() => { setIsOpen(true); setShowWelcomePopup(false); setShowBeam(false); }}>INICIAR CONSULTORÍA</button>
            </div>
          )}

          {showBeam && (
            <div className="light-beam-directional"></div>
          )}

          <button className={`trigger-pill ${showBeam ? 'highlight-flash' : ''}`} onClick={() => { setIsOpen(true); setShowWelcomePopup(false); setShowBeam(false); }}>
            <div className="trigger-avatar">UG</div>
            <span className="trigger-text">Consultoría Senior</span>
            <div className="shimmer-sweep"></div>
          </button>
        </>
      )}

      {isOpen && (
        <div className="chat-window-v5 fade-in">
          <div className="chat-nav">
            <div className="firm-info">
              <div className="active-dot"></div>
              <span>UP GOING EXPERT <span className="v-tag">[V5]</span></span>
            </div>
            <button className="close-x" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chat-scroller" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role}`}>
                <div className="bubble-content">{m.content}</div>
              </div>
            ))}

            {showLeadForm && (
              <div className="chat-bubble ai">
                <form className="lead-form-v5" onSubmit={handleLeadSubmit}>
                  <h4>Captura de Lead Prioritario</h4>
                  <input name="name" placeholder="Tu nombre" required />
                  <input name="phone" placeholder="WhatsApp" required />
                  <button type="submit" className="btn-yellow">Contactarme ahora</button>
                </form>
              </div>
            )}

            {isTyping && (
              <div className="chat-bubble ai typing">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            )}
          </div>

          <div className="chat-action">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Enviar</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .assistant-wrapper { position: fixed; bottom: 3rem; right: 3rem; z-index: 10000; font-family: var(--font-body); }
        
        .welcome-popup-center {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          background: rgba(1, 4, 9, 0.95);
          backdrop-filter: blur(80px);
          border: 2px solid var(--accent-sky);
          border-left: 8px solid var(--accent-yellow);
          padding: 3rem;
          color: white;
          box-shadow: 0 0 100px rgba(0, 194, 255, 0.3);
          z-index: 10002;
          text-align: center;
        }

        .welcome-popup-center h3 { font-size: 1.5rem; font-weight: 950; margin-bottom: 1rem; color: var(--accent-yellow); letter-spacing: 0.1em; }
        .welcome-popup-center p { font-size: 1rem; color: rgba(255,255,255,0.7); margin-bottom: 2rem; line-height: 1.6; }
        .popup-badge { font-size: 0.7rem; font-weight: 900; color: var(--accent-sky); letter-spacing: 0.3em; margin-bottom: 1.5rem; }
        
        .popup-btn-large {
          background: var(--accent-yellow);
          color: black;
          border: none;
          padding: 1rem 2rem;
          font-weight: 950;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 30px rgba(255, 210, 0, 0.3);
        }
        .popup-btn-large:hover { background: white; transform: translateY(-5px); box-shadow: 0 10px 40px rgba(255, 210, 0, 0.5); }

        .light-beam-directional {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 2px;
          height: 100vh;
          background: linear-gradient(to bottom, var(--accent-yellow), transparent);
          transform-origin: top left;
          transform: rotate(135deg); /* Points towards bottom-right */
          animation: beam-strike 1.5s forwards cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 10001;
          pointer-events: none;
          opacity: 0;
        }

        @keyframes beam-strike {
          0% { height: 0; opacity: 1; width: 2px; filter: blur(0px); }
          50% { opacity: 1; width: 10px; filter: blur(5px); }
          100% { height: 150vh; opacity: 0; width: 0px; filter: blur(20px); }
        }

        .trigger-pill { 
          background: rgba(0, 194, 255, 0.1); 
          backdrop-filter: blur(20px); 
          border: 2px solid var(--accent-sky); 
          color: white; 
          padding: 1rem 2rem; 
          border-radius: 4px; 
          display: flex; 
          align-items: center; 
          gap: 1.2rem; 
          cursor: pointer; 
          font-weight: 900; 
          text-transform: uppercase; 
          letter-spacing: 0.2em; 
          transition: var(--transition);
          position: relative;
          overflow: hidden;
        }

        .highlight-flash {
          animation: pill-flash-intense 1s infinite alternate;
          border-color: var(--accent-yellow) !important;
          box-shadow: 0 0 50px rgba(255, 210, 0, 0.6);
        }

        @keyframes pill-flash-intense {
          from { transform: scale(1); filter: brightness(1); }
          to { transform: scale(1.1); filter: brightness(1.5); }
        }

        .fade-in-scale { animation: fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        @keyframes fadeInScale { from { opacity: 0; transform: translate(-50%, -40%) scale(0.8); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }

        .shimmer-sweep {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 194, 255, 0.4), transparent);
          animation: sweep 3s infinite;
        }
        @keyframes sweep { 0% { left: -100%; } 100% { left: 100%; } }
        .trigger-avatar { width: 24px; height: 24px; border: 1px solid var(--accent-yellow); color: var(--accent-yellow); display: flex; align-items: center; justify-content: center; font-size: 0.6rem; }
        .trigger-text { color: var(--accent-yellow); }
        .chat-window-v5 { width: 450px; height: 750px; background: rgba(1, 4, 9, 0.95); backdrop-filter: blur(60px); border: 1px solid var(--glass-border); border-radius: 4px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 50px 150px rgba(0,0,0,1); position: relative; }
        .chat-nav { padding: 1.5rem; background: rgba(0, 194, 255, 0.05); border-bottom: 4px solid var(--primary); display: flex; justify-content: space-between; align-items: center; }
        .firm-info { display: flex; align-items: center; gap: 1rem; font-weight: 900; font-size: 0.8rem; letter-spacing: 0.3em; color: var(--accent-sky); }
        .active-dot { width: 6px; height: 6px; background: var(--accent-yellow); border-radius: 50%; box-shadow: 0 0 15px var(--accent-yellow); animation: blink 1s infinite alternate; }
        .chat-scroller { flex: 1; padding: 2.5rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1.5rem; }
        .chat-bubble { max-width: 85%; line-height: 1.5; }
        .bubble-content { padding: 1.2rem; border-radius: 0; border: 1px solid var(--glass-border); font-size: 0.95rem; background: rgba(255,255,255,0.02); }
        .ai .bubble-content { border-left: 3px solid var(--accent-yellow); color: white; }
        .user .bubble-content { background: var(--accent-sky); color: black; font-weight: 700; border-color: transparent; }
        .chat-action { padding: 2rem; background: rgba(0, 194, 255, 0.02); display: flex; gap: 1rem; border-top: 1px solid var(--glass-border); }
        .chat-action input { flex: 1; background: transparent; border-bottom: 1px solid var(--glass-border); border-left: none; border-right: none; border-top: none; padding: 1rem 0; color: white; outline: none; }
        .chat-action button { background: var(--accent-yellow); color: black; border: none; padding: 0 2rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; transition: var(--transition); }
        .close-x, .close-popup { background: transparent; border: none; color: white; cursor: pointer; }
        .close-popup { position: absolute; top: 1rem; right: 1rem; font-size: 1.5rem; opacity: 0.5; }
        .close-popup:hover { opacity: 1; }
        @keyframes blink { from { opacity: 0.3; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default Assistant;
