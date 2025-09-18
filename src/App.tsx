import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import { useProfile } from './hooks/useProfile';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const { profile } = useProfile();

  useEffect(() => {
    document.title = 'MCJ Art - Joaillier & Designer 3D';
  }, []);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero profile={profile} onNavigate={handleNavigate} />;
      case 'professionals':
        return <ServicesSection category="professionals" onNavigate={handleNavigate} />;
      case 'individuals':
        return <ServicesSection category="individuals" onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactSection onNavigate={handleNavigate} />;
      default:
        return <Hero profile={profile} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-black/90 backdrop-blur-md border-t border-white/10 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="text-2xl font-bold text-yellow-500">
                <span className="font-butler">MCJ</span>
                <span className="font-parlare ml-1">Art</span>
              </div>
              <span className="text-gray-400">- Maison Concepts et Joaillerie d'Art</span>
            </div>
            
            <div className="text-gray-400 text-sm">
              © 2024 MCJ Art. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;