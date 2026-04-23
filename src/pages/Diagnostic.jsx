import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Diagnostic = () => {
    const [screen, setScreen] = useState('intro'); // intro, questions, loading, results
    const [currentStep, setCurrentStep] = useState(0);
    const [trm, setTrm] = useState(4200);
    const [country, setCountry] = useState('CO'); // CO, MX
    const [values, setValues] = useState({
        ticket: '',
        conv: '',
        lost: '',
        noshow: '',
        hours: ''
    });
    const [results, setResults] = useState(null);

    const questions = [
        {
            title: '¿Cuánto paga una clienta en promedio por visita?',
            sub: 'El valor promedio de un servicio en tu centro estético.',
            key: 'ticket',
            prefix: '$',
            placeholder: '80.000'
        },
        {
            title: '¿Cuántas conversaciones recibes al día?',
            sub: 'WhatsApp, DMs, llamadas — todas las personas que contactan.',
            key: 'conv',
            prefix: '',
            placeholder: '30'
        },
        {
            title: '¿Cuántas no cierran o dejan de responder?',
            sub: 'De esas conversaciones, cuántas se enfrían o no agendan.',
            key: 'lost',
            prefix: '',
            placeholder: '5'
        },
        {
            title: '¿Cuántas citas agendadas no se presentan al día?',
            sub: 'Clientas que confirmaron pero no llegaron.',
            key: 'noshow',
            prefix: '',
            placeholder: '3'
        },
        {
            title: '¿Cuántas horas al día gestiónas mensajes?',
            sub: 'Tiempo respondiendo WhatsApp y enviando recordatorios.',
            key: 'hours',
            prefix: '',
            placeholder: '3'
        }
    ];

    const calculate = () => {
        const v = {
            ticket: parseFloat(values.ticket.replace(/\./g, '').replace(/,/g, '')) || 0,
            conv: parseFloat(values.conv) || 0,
            lost: parseFloat(values.lost) || 0,
            noshow: parseFloat(values.noshow) || 0,
            hours: parseFloat(values.hours) || 0
        };

        const dailyLoss = (v.ticket * v.lost) + (v.ticket * v.noshow);
        const monthlyLoss = dailyLoss * 6 * 4.33; // 6 days/week, 4.33 weeks/month
        const yearlyLoss = monthlyLoss * 12;

        setResults({
            daily: dailyLoss,
            monthly: monthlyLoss,
            yearly: yearlyLoss,
            hoursMonthly: v.hours * 6 * 4.33
        });

        setScreen('loading');
        setTimeout(() => setScreen('results'), 2500);
    };

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            calculate();
        }
    };

    const formatMoney = (val) => {
        return new Intl.NumberFormat(country === 'CO' ? 'es-CO' : 'es-MX', {
            style: 'currency',
            currency: country === 'CO' ? 'COP' : 'MXN',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="diag-container">
            <Link to="/" className="back-home">← VOLVER AL INICIO</Link>
            
            <div className="mesh-bg"></div>

            <div className="diag-content">
                {screen === 'intro' && (
                    <div className="glass-v6 diag-card reveal active">
                        <div className="hud-tag">UP GOING DIAGNOSTIC 1.0</div>
                        <h1 className="brutal-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                            DIAGNÓSTICO DE <br /><span className="text-gradient">COSTO DE OPORTUNIDAD</span>
                        </h1>
                        <p className="hero-p-v6" style={{ fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                            Descubre cuánto dinero estás dejando de ganar por falta de un sistema automatizado de ventas y recordatorios.
                        </p>
                        
                        <div className="country-selector">
                            <button className={`country-btn ${country === 'CO' ? 'active' : ''}`} onClick={() => setCountry('CO')}>🇨🇴 COLOMBIA</button>
                            <button className={`country-btn ${country === 'MX' ? 'active' : ''}`} onClick={() => setCountry('MX')}>🇲🇽 MÉXICO</button>
                        </div>

                        <div className="trm-box">
                            <label>TRM / TIPO DE CAMBIO (USD hoy)</label>
                            <input 
                                type="number" 
                                value={trm} 
                                onChange={(e) => setTrm(e.target.value)}
                                className="diag-input" 
                            />
                        </div>

                        <button className="btn-yellow" style={{ width: '100%' }} onClick={() => setScreen('questions')}>
                            INICIAR DIAGNÓSTICO →
                        </button>
                    </div>
                )}

                {screen === 'questions' && (
                    <div className="glass-v6 diag-card active">
                        <div className="step-indicator">PASO {currentStep + 1} DE {questions.length}</div>
                        <h2 className="brutal-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{questions[currentStep].title}</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>{questions[currentStep].sub}</p>
                        
                        <div className="input-group">
                            {questions[currentStep].prefix && <span className="input-prefix">{questions[currentStep].prefix}</span>}
                            <input 
                                type="text"
                                placeholder={questions[currentStep].placeholder}
                                value={values[questions[currentStep].key]}
                                onChange={(e) => setValues({...values, [questions[currentStep].key]: e.target.value})}
                                className="diag-input-large"
                                autoFocus
                            />
                        </div>

                        <div className="diag-actions">
                            {currentStep > 0 && <button className="btn-outline-v6" onClick={() => setCurrentStep(currentStep - 1)}>ATRÁS</button>}
                            <button className="btn-yellow" onClick={handleNext}>
                                {currentStep === questions.length - 1 ? 'VER RESULTADOS' : 'SIGUIENTE'}
                            </button>
                        </div>
                    </div>
                )}

                {screen === 'loading' && (
                    <div className="loading-screen">
                        <div className="loader-ring"></div>
                        <h2 className="brutal-title" style={{ fontSize: '2rem' }}>ANALIZANDO TU NEGOCIO...</h2>
                        <p>Calculando impacto financiero y operativo.</p>
                    </div>
                )}

                {screen === 'results' && results && (
                    <div className="glass-v6 diag-card results-card active">
                        <div className="hud-tag" style={{ color: 'var(--accent-yellow)' }}>RESULTADO DEL DIAGNÓSTICO</div>
                        <h2 className="brutal-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
                            ESTÁS PERDIENDO <br />
                            <span className="text-gradient">{formatMoney(results.yearly)}</span> AL AÑO
                        </h2>

                        <div className="results-grid">
                            <div className="res-item">
                                <label>PÉRDIDA MENSUAL</label>
                                <div className="res-val">{formatMoney(results.monthly)}</div>
                            </div>
                            <div className="res-item">
                                <label>TIEMPO GASTADO / MES</label>
                                <div className="res-val">{Math.round(results.hoursMonthly)} HORAS</div>
                            </div>
                        </div>

                        <div className="res-advice glass-v6" style={{ marginTop: '2rem', padding: '1.5rem', borderColor: 'var(--accent-yellow)' }}>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>
                                💡 <strong>Aviso:</strong> Con solo recuperar <strong>2 citas al mes</strong>, tu sistema UP GOING se paga solo y empieza a generar utilidad neta.
                            </p>
                        </div>

                        <button className="btn-yellow" style={{ width: '100%', marginTop: '2rem' }}>
                            AGENDAR MI ESTRATEGIA DE RECUPERACIÓN →
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                .diag-container {
                    min-height: 100vh;
                    padding: 4rem 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                .back-home {
                    position: absolute;
                    top: 2rem;
                    left: 2rem;
                    color: var(--accent-yellow);
                    text-decoration: none;
                    font-weight: 900;
                    font-size: 0.8rem;
                    letter-spacing: 0.1em;
                    z-index: 100;
                }
                .diag-content {
                    width: 100%;
                    max-width: 600px;
                    z-index: 10;
                }
                .diag-card {
                    padding: 3rem;
                    border-radius: 32px;
                }
                .country-selector {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }
                .country-btn {
                    flex: 1;
                    padding: 1rem;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: white;
                    border-radius: 12px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: all 0.3s;
                }
                .country-btn.active {
                    background: var(--accent-yellow);
                    color: black;
                    border-color: var(--accent-yellow);
                }
                .trm-box {
                    margin-bottom: 2rem;
                }
                .trm-box label {
                    display: block;
                    font-size: 0.7rem;
                    letter-spacing: 0.1em;
                    margin-bottom: 0.5rem;
                    opacity: 0.6;
                }
                .diag-input {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: white;
                    padding: 0.8rem;
                    border-radius: 8px;
                    width: 100%;
                    font-size: 1rem;
                }
                .diag-input-large {
                    background: transparent;
                    border: none;
                    border-bottom: 2px solid var(--accent-yellow);
                    color: white;
                    font-size: 3rem;
                    width: 100%;
                    font-weight: 950;
                    outline: none;
                    padding: 0.5rem 0;
                }
                .input-group {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .input-prefix {
                    font-size: 3rem;
                    font-weight: 950;
                    margin-right: 0.5rem;
                    color: var(--accent-yellow);
                }
                .step-indicator {
                    font-size: 0.7rem;
                    letter-spacing: 0.2em;
                    color: var(--accent-yellow);
                    margin-bottom: 1rem;
                }
                .diag-actions {
                    display: flex;
                    gap: 2rem;
                    margin-top: 3rem;
                    align-items: center;
                }
                .results-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                    margin-top: 2rem;
                }
                .res-item {
                    background: rgba(255,255,255,0.03);
                    padding: 1.5rem;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .res-item label {
                    display: block;
                    font-size: 0.6rem;
                    letter-spacing: 0.1em;
                    margin-bottom: 0.5rem;
                    opacity: 0.5;
                }
                .res-val {
                    font-size: 1.2rem;
                    font-weight: 900;
                    color: white;
                }
                .loading-screen {
                    text-align: center;
                    padding: 4rem;
                }
                .loader-ring {
                    width: 80px;
                    height: 80px;
                    border: 4px solid rgba(255, 194, 50, 0.1);
                    border-top: 4px solid var(--accent-yellow);
                    border-radius: 50%;
                    margin: 0 auto 2rem;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default Diagnostic;
