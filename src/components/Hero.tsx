import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Award, Zap } from 'lucide-react';
import { Profile } from '../types';

interface HeroProps {
  profile: Profile | null;
  onNavigate: (section: string) => void;
}

export default function Hero({ profile, onNavigate }: HeroProps) {
  const achievements = [
    { icon: Award, label: 'Excellence', value: '15+ ans' },
    { icon: Sparkles, label: 'Créations', value: '500+' },
    { icon: Zap, label: 'Innovation', value: '3D & CAO' },
  ];

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(255, 215, 0, 0.08) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0"
        />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-transparent border border-yellow-500/50 rounded-full px-4 py-2"
            >
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-yellow-200">Maison Concepts et Joaillerie d'Art</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-7xl font-bold"
              >
                <span className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                  {profile?.name || 'Artisan Joaillier'}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-yellow-400 font-medium"
              >
                {profile?.title || 'Designer & Concepteur 3D'}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-yellow-100 leading-relaxed max-w-2xl"
              >
                {profile?.description || 
                "Créateur de bijoux d'exception, j'allie tradition artisanale et innovation technologique pour donner vie à vos projets les plus précieux. De la conception 3D à la réalisation finale, chaque création reflète un savoir-faire unique."}
              </motion.p>
            </div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-transparent border border-yellow-500/50 rounded-xl p-4 text-center"
                >
                  <achievement.icon className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-100">{achievement.value}</div>
                  <div className="text-sm text-yellow-300/70">{achievement.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('professionals')}
                className="bg-transparent border-2 border-yellow-500 text-yellow-400 px-8 py-4 rounded-full font-semibold hover:bg-yellow-500/10 transition-all duration-300"
              >
                Services Professionnels
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('individuals')}
                className="bg-transparent border-2 border-yellow-500 text-yellow-400 px-8 py-4 rounded-full font-semibold hover:bg-yellow-500/10 transition-all duration-300"
              >
                Services Particuliers
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-3xl opacity-20"
              />
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative bg-transparent border border-yellow-500/50 rounded-3xl p-8 overflow-hidden"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                  {profile?.photo_url ? (
                    <img
                      src={profile.photo_url}
                      alt={profile.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl font-bold text-yellow-400">
                        <span className="font-butler">MCJ</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-4 right-4 bg-yellow-400/20 rounded-full p-3"
                >
                  <Sparkles className="h-6 w-6 text-yellow-400" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => onNavigate('professionals')}
            className="flex flex-col items-center space-y-2 text-yellow-300/70 hover:text-yellow-200 transition-colors duration-300"
          >
            <span className="text-sm">Découvrir mes services</span>
            <ArrowDown className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}