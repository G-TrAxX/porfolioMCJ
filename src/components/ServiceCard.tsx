import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Clock, Euro, Info } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'hammer': ({ className }) => <div className={`${className} text-xl`}>🔨</div>,
  'cube': ({ className }) => <div className={`${className} text-xl`}>🎯</div>,
  'search': ({ className }) => <div className={`${className} text-xl`}>🔍</div>,
  'image': ({ className }) => <div className={`${className} text-xl`}>📸</div>,
  'shield': ({ className }) => <div className={`${className} text-xl`}>🛡️</div>,
  'users': ({ className }) => <div className={`${className} text-xl`}>👥</div>,
  'handshake': ({ className }) => <div className={`${className} text-xl`}>🤝</div>,
  'coins': ({ className }) => <div className={`${className} text-xl`}>💰</div>,
};

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = iconMap[service.icon] || iconMap['cube'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <div className="bg-transparent border border-yellow-500/50 rounded-2xl p-6 h-full transition-all duration-300 hover:border-yellow-400/70 hover:shadow-2xl hover:shadow-yellow-400/10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="w-16 h-16 bg-transparent border border-yellow-500/50 rounded-xl flex items-center justify-center"
            >
              <IconComponent className="text-yellow-400" />
            </motion.div>
            
            <div>
              <h3 className="text-xl font-bold text-yellow-100 mb-1 group-hover:text-yellow-400 transition-colors duration-300">
                {service.title}
              </h3>
              {service.price_range && (
                <div className="flex items-center text-yellow-400 text-sm">
                  <Euro className="h-3 w-3 mr-1" />
                  <span>{service.price_range}</span>
                </div>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 bg-transparent border border-yellow-500/50 rounded-full hover:bg-yellow-500/10 hover:border-yellow-400/70 transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="h-4 w-4 text-yellow-300 group-hover:text-yellow-400" />
            </motion.div>
          </motion.button>
        </div>

        {/* Description */}
        <p className="text-yellow-100 mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-yellow-300/70">
          {service.duration && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{service.duration}</span>
            </div>
          )}
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-1 cursor-pointer hover:text-yellow-400 transition-colors duration-300"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Info className="h-4 w-4" />
            <span>Plus d'infos</span>
          </motion.div>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-yellow-500/50 pt-4 mt-4"
            >
              <h4 className="text-yellow-400 font-semibold mb-2">Détails du service</h4>
              <div className="prose prose-invert prose-sm">
                <p className="text-yellow-100 leading-relaxed whitespace-pre-line">
                  {service.details}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mt-6"
        >
          <button className="w-full bg-transparent border border-yellow-500 text-yellow-400 px-4 py-3 rounded-lg font-medium hover:bg-yellow-500/10 hover:border-yellow-400 transition-all duration-300">
            Demander un devis
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}