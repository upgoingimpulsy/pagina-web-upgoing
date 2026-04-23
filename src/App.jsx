import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Assistant from './components/Assistant';
import ServicesPage from './pages/ServicesPage';
import Diagnostic from './pages/Diagnostic';
import ModulesExperience from './components/ModulesExperience/ModulesExperience';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ServicesSlider from './components/ServicesSlider';
import Strategy from './components/Strategy';
import Allies from './components/Allies';
import Team from './components/Team';
import Footer from './components/Footer';

import './global.css';

const Home = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const services = [
    {
      id: "01",
      title: "Servicio Estándar",
      video: "/IMG_5689.mp4",
      desc: "Estructuración legal y apertura de empresa en los Estados Unidos."
    },
    {
      id: "02",
      title: "Servicio Premium",
      video: "/IMG_5687.mp4",
      desc: "Estructuración legal y tributaria integral para empresarios extranjeros."
    },
    {
      id: "03",
      title: "Plan Empresario Elite",
      video: "/IMG_5685.mp4",
      desc: "Expansión estratégica avanzada a través de la implementación del PLEEX."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navigation />
      <Hero />
      <ServicesSlider 
        services={services} 
        activeVideo={activeVideo} 
        setActiveVideo={setActiveVideo} 
      />
      <ModulesExperience />
      <Strategy />
      <Allies />
      <Team />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app-root">
        <div className="mesh-bg"></div>
        <div className="motion-blob blob-1"></div>
        <div className="motion-blob blob-2"></div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/diagnostico" element={<Diagnostic />} />
        </Routes>

        <Assistant />
      </div>
    </Router>
  );
};

export default App;
