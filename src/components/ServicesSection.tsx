import React from 'react';
import { motion } from 'framer-motion';
import { Users, User, ArrowRight } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { useServices } from '../hooks/useServices';

interface ServicesSectionProps {
  category: 'professionals' | 'individuals';
  onNavigate: (section: string) => void;
}

export default function ServicesSection({ category, onNavigate }: ServicesSectionProps) {
  const { services, loading, error } = useServices(category);
  
  const isProfessional = category === 'professionals';
  const title = isProfessional ? 'Services Professionnels' : 'Services Particuliers';
  const subtitle = isProfessional 
    ? 'Solutions sur-mesure pour les professionnels de la joaillerie'
    : 'Accompagnement personnalisé pour vos projets précieux';
  
  const Icon = isProfessional ? Users : User;

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full"
            />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-red-400">Une erreur est survenue: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: isProfessional
              ? ['radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)',
                 'radial-gradient(circle at 30% 70%, rgba(184, 134, 11, 0.06) 0%, transparent 50%)']
              : ['radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)',
                 'radial-gradient(circle at 70% 70%, rgba(184, 134, 11, 0.06) 0%, transparent 50%)']
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-3 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-6 py-3 mb-6"
          >
            <Icon className="h-6 w-6 text-amber-400" />
            <span className="text-sm text-amber-200">{category === 'professionals' ? 'B2B' : 'B2C'}</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>

          <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate(isProfessional ? 'individuals' : 'professionals')}
            className="flex items-center space-x-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 bg-amber-400/20 text-amber-400 border border-amber-400/30 hover:bg-amber-400/30"
          >
            <span>{isProfessional ? 'Services Particuliers' : 'Services Professionnels'}</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-gray-900 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Demander un devis
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}