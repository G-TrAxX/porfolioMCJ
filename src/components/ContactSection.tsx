import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ContactForm } from '../types';
import { useProfile } from '../hooks/useProfile';

interface ContactSectionProps {
  onNavigate: (section: string) => void;
}

export default function ContactSection({ onNavigate }: ContactSectionProps) {
  const { profile } = useProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { error } = await supabase.from('contact_requests').insert([
        {
          ...data,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: profile?.email || 'contact@mcj-art.com',
      href: `mailto:${profile?.email || 'contact@mcj-art.com'}`,
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: profile?.phone || '+33 1 23 45 67 89',
      href: `tel:${profile?.phone || '+33123456789'}`,
    },
    {
      icon: MapPin,
      label: 'Adresse',
      value: profile?.address || 'Paris, France',
      href: '#',
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(184, 134, 11, 0.06) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-3 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-6 py-3 mb-6"
          >
            <Mail className="h-6 w-6 text-amber-400" />
            <span className="text-sm text-amber-200">Contact</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              Parlons de votre projet
            </span>
          </h2>

          <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
            Que vous soyez professionnel ou particulier, je suis là pour donner vie à vos créations les plus précieuses.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center space-x-4 p-6 bg-amber-500/5 backdrop-blur-sm border border-amber-500/20 rounded-xl hover:border-amber-400/40 hover:bg-amber-500/10 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400/20 to-amber-600/20 backdrop-blur-sm border border-amber-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="h-6 w-6 text-amber-400" />
                  </div>
                  
                  <div>
                    <div className="text-sm text-amber-300/70 mb-1">{info.label}</div>
                    <div className="text-amber-100 font-medium group-hover:text-amber-400 transition-colors duration-300">
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-amber-100 mb-4">Navigation rapide</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Professionnels', section: 'professionals' },
                  { label: 'Particuliers', section: 'individuals' },
                  { label: 'Accueil', section: 'home' },
                ].map((item) => (
                  <motion.button
                    key={item.section}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate(item.section)}
                    className="px-4 py-2 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 text-amber-200 rounded-lg hover:bg-amber-400/20 hover:border-amber-400/30 hover:text-amber-400 transition-all duration-300"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-amber-500/5 to-amber-500/[0.02] backdrop-blur-sm border border-amber-500/20 rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-amber-200 mb-2">
                  Nom complet *
                </label>
                <input
                  {...register('name', { required: 'Le nom est requis' })}
                  className="w-full px-4 py-3 bg-amber-500/5 backdrop-blur-sm border border-amber-500/20 rounded-lg text-amber-100 placeholder-amber-300/50 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 focus:outline-none transition-all duration-300"
                  placeholder="Votre nom complet"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-amber-200 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'L\'email est requis',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email invalide'
                    }
                  })}
                  className="w-full px-4 py-3 bg-amber-500/5 backdrop-blur-sm border border-amber-500/20 rounded-lg text-amber-100 placeholder-amber-300/50 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 focus:outline-none transition-all duration-300"
                  placeholder="votre@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-amber-200 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full px-4 py-3 bg-amber-500/5 backdrop-blur-sm border border-amber-500/20 rounded-lg text-amber-100 placeholder-amber-300/50 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 focus:outline-none transition-all duration-300"
                  placeholder="+33 1 23 45 67 89"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-amber-200 mb-2">
                  Entreprise
                </label>
                <input
                  {...register('company')}
                  className="w-full px-4 py-3 bg-amber-500/5 backdrop-blur-sm border border-amber-500/20 rounded-lg text-amber-100 placeholder-amber-300/50 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 focus:outline-none transition-all duration-300"
                  placeholder="Nom de votre entreprise (optionnel)"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-amber-200 mb-2">
                  Type de client *
                </label>
                <select
                  {...register('category', { required: 'Veuillez sélectionner un type' })}
                  className="w-full px-4 py-3 bg-amber-500/5 backdrop-blur-sm border border-amber-500/20 rounded-lg text-amber-100 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 focus:outline-none transition-all duration-300"
                >
                  <option value="">Sélectionner...</option>
                  <option value="professional">Professionnel</option>
                  <option value="individual">Particulier</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-400">{errors.category.message}</p>
                )}
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-medium text-amber-200 mb-2">
                  Service souhaité *
                </label>
                <input
                  {...register('service', { required: 'Veuillez préciser le service' })}
                  className="w-full px-4 py-3 bg-amber-500/5 backdrop-blur-sm border border-amber-500/20 rounded-lg text-amber-100 placeholder-amber-300/50 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 focus:outline-none transition-all duration-300"
                  placeholder="Ex: Conception 3D, Maîtrise d'œuvre..."
                />
                {errors.service && (
                  <p className="mt-1 text-sm text-red-400">{errors.service.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-amber-200 mb-2">
                  Message *
                </label>
                <textarea
                  rows={5}
                  {...register('message', { required: 'Le message est requis' })}
                  className="w-full px-4 py-3 bg-amber-500/5 backdrop-blur-sm border border-amber-500/20 rounded-lg text-amber-100 placeholder-amber-300/50 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Décrivez votre projet, vos besoins et vos attentes..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-gray-900 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full"
                    />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Envoyer le message</span>
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg p-3"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3"
                >
                  <AlertCircle className="h-5 w-5" />
                  <span>Une erreur est survenue. Veuillez réessayer ou me contacter directement.</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}