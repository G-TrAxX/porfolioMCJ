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
      <div className="bg-gradient-to-br from-amber-500/5 to-amber-500/[0.02] backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6 h-full transition-all duration-300 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-400/10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="w-16 h-16 bg-gradient-to-br from-amber-400/20 to-amber-600/20 backdrop-blur-sm border border-amber-500/20 rounded-xl flex items-center justify-center"
            >
              <IconComponent className="text-amber-400" />
            </motion.div>
            
            <div>
              <h3 className="text-xl font-bold text-amber-100 mb-1 group-hover:text-amber-400 transition-colors duration-300">
                {service.title}
              </h3>
              {service.price_range && (
                <div className="flex items-center text-amber-400 text-sm">
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
            className="p-2 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full hover:bg-amber-400/20 hover:border-amber-400/30 transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="h-4 w-4 text-amber-300 group-hover:text-amber-400" />
            </motion.div>
          </motion.button>
        </div>

        {/* Description */}
        <p className="text-amber-100 mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-amber-300/70">
          {service.duration && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{service.duration}</span>
            </div>
          )}
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-1 cursor-pointer hover:text-amber-400 transition-colors duration-300"
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
              className="border-t border-amber-500/20 pt-4 mt-4"
            >
              <h4 className="text-amber-400 font-semibold mb-2">Détails du service</h4>
              <div className="prose prose-invert prose-sm">
                <p className="text-amber-100 leading-relaxed whitespace-pre-line">
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
          <button className="w-full bg-gradient-to-r from-amber-600/20 to-amber-500/20 backdrop-blur-sm border border-amber-400/30 text-amber-400 px-4 py-3 rounded-lg font-medium hover:from-amber-600/30 hover:to-amber-500/30 hover:border-amber-400/50 transition-all duration-300">
            Demander un devis
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}