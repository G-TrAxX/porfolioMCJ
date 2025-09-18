/*
  # MCJ Art Portfolio Database Schema

  1. New Tables
    - `profile`
      - `id` (uuid, primary key)
      - `name` (text) - Nom du joaillier
      - `title` (text) - Titre professionnel
      - `description` (text) - Description complète
      - `photo_url` (text) - URL de la photo de profil
      - `email` (text) - Email de contact
      - `phone` (text) - Téléphone de contact
      - `address` (text) - Adresse
      - `social_links` (jsonb) - Liens réseaux sociaux
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `services`
      - `id` (uuid, primary key)
      - `title` (text) - Titre du service
      - `description` (text) - Description courte
      - `details` (text) - Description détaillée
      - `category` (text) - professionals ou individuals
      - `icon` (text) - Nom de l'icône
      - `price_range` (text) - Fourchette de prix (optionnel)
      - `duration` (text) - Durée estimée (optionnel)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `contact_requests`
      - `id` (uuid, primary key)
      - `name` (text) - Nom du contact
      - `email` (text) - Email du contact
      - `phone` (text) - Téléphone (optionnel)
      - `company` (text) - Entreprise (optionnel)
      - `category` (text) - professional ou individual
      - `service` (text) - Service demandé
      - `message` (text) - Message
      - `status` (text) - Statut de la demande
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to profile and services
    - Add policies for contact form submission
*/

-- Create profile table
CREATE TABLE IF NOT EXISTS profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  photo_url text DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  social_links jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  details text NOT NULL DEFAULT '',
  category text NOT NULL CHECK (category IN ('professionals', 'individuals')),
  icon text NOT NULL DEFAULT 'cube',
  price_range text,
  duration text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_requests table
CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  category text NOT NULL CHECK (category IN ('professional', 'individual')),
  service text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for profile table (public read access)
CREATE POLICY "Allow public read access to profile"
  ON profile
  FOR SELECT
  TO public
  USING (true);

-- Create policies for services table (public read access)
CREATE POLICY "Allow public read access to services"
  ON services
  FOR SELECT
  TO public
  USING (true);

-- Create policies for contact_requests table (public insert access)
CREATE POLICY "Allow public insert to contact_requests"
  ON contact_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert sample data for profile
INSERT INTO profile (
  name,
  title,
  description,
  email,
  phone,
  address,
  social_links
) VALUES (
  'Maître Joaillier MCJ',
  'Designer & Concepteur 3D',
  'Créateur de bijoux d''exception, j''allie tradition artisanale et innovation technologique pour donner vie à vos projets les plus précieux. De la conception 3D à la réalisation finale, chaque création reflète un savoir-faire unique développé au cours de 15 années d''expérience.

Mon approche combine l''excellence de l''artisanat français avec les dernières technologies de conception assistée par ordinateur. Que vous soyez professionnel de la joaillerie ou particulier en quête d''une pièce unique, je vous accompagne dans la réalisation de vos rêves les plus précieux.',
  'contact@mcj-art.com',
  '+33 1 23 45 67 89',
  'Paris, France',
  '{"linkedin": "https://linkedin.com/in/mcj-art", "instagram": "https://instagram.com/mcj_art", "website": "https://mcj-art.com"}'
) ON CONFLICT DO NOTHING;

-- Insert sample services for professionals
INSERT INTO services (title, description, details, category, icon, price_range, duration) VALUES 
(
  'Maîtrise d''œuvre',
  'Gestion complète de vos projets de joaillerie, de la conception à la livraison.',
  'Service complet de gestion de projets joailliers incluant :
  
• Analyse des besoins et cahier des charges
• Coordination des différents corps de métier
• Suivi de la qualité et des délais
• Contrôle budgétaire et reporting
• Livraison et service après-vente

Expertise reconnue dans la gestion de projets complexes, collections haute joaillerie, et pièces d''exception. Accompagnement personnalisé avec un interlocuteur unique pour optimiser vos processus de production.',
  'professionals',
  'hammer',
  'Sur devis',
  'Variable selon projet'
),
(
  'Conception 3D',
  'Modélisation 3D professionnelle et rendu photoréaliste pour vos créations.',
  'Services de conception 3D avancés comprenant :

• Modélisation 3D haute précision avec Rhino et Matrix
• Rendu photoréaliste et visualisation 3D
• Prototypage rapide et impression 3D
• Fichiers techniques pour production
• Modifications et ajustements illimités
• Formation à l''utilisation des outils 3D

Maîtrise complète des logiciels professionnels et des techniques de modélisation paramétrique. Collaboration étroite avec vos équipes techniques.',
  'professionals',
  'cube',
  '150-500€/jour',
  '2-10 jours'
),
(
  'Recherche & Développement',
  'Innovation et développement de nouvelles techniques et créations.',
  'Accompagnement R&D spécialisé incluant :

• Recherche de nouvelles techniques d''assemblage
• Développement de solutions innovantes
• Tests et validation de concepts
• Études de faisabilité technique
• Veille technologique et concurrentielle
• Documentation technique et brevets

Expertise unique combinant tradition joaillière et technologies émergentes. Approche collaborative pour développer votre avantage concurrentiel.',
  'professionals',
  'search',
  'Sur devis',
  'Projet long terme'
),
(
  'Retouche Photo Bijoux',
  'Retouche professionnelle et mise en valeur de vos créations joailières.',
  'Services de retouche photo spécialisés :

• Retouche professionnelle haute définition
• Correction colorimétrique et lumière
• Détourage et fond personnalisé
• Effets de brillance et reflets
• Composition et mise en scène
• Formats optimisés web et print

Maîtrise parfaite de Photoshop et techniques spécifiques à la joaillerie. Rendu sublime qui révèle toute la beauté de vos créations.',
  'professionals',
  'image',
  '50-200€/photo',
  '1-3 jours'
);

-- Insert sample services for individuals
INSERT INTO services (title, description, details, category, icon, price_range, duration) VALUES 
(
  'Maîtrise d''œuvre',
  'Accompagnement complet pour la création de votre bijou unique sur mesure.',
  'Service personnalisé de création sur mesure :

• Consultation et analyse de vos désirs
• Conception et esquises personnalisées  
• Sélection des matériaux et pierres
• Suivi de la réalisation artisanale
• Contrôle qualité et finitions
• Livraison et garantie

Processus transparent avec validation à chaque étape. Création unique qui vous ressemble, alliant vos goûts personnels et notre expertise technique.',
  'individuals',
  'hammer',
  'À partir de 1500€',
  '4-8 semaines'
),
(
  'Conception 3D',
  'Visualisation 3D de votre futur bijou avant réalisation.',
  'Service de visualisation 3D personnalisé :

• Modélisation 3D de votre projet
• Rendus photoréalistes haute qualité
• Possibilité de modifications illimitées
• Visualisation sous tous les angles
• Essayage virtuel possible
• Fichiers 3D pour impression

Technologie de pointe pour visualiser parfaitement votre bijou avant production. Évite les mauvaises surprises et assure une satisfaction optimale.',
  'individuals',
  'cube',
  '200-800€',
  '1-2 semaines'
),
(
  'Expertise',
  'Évaluation professionnelle et certification de vos bijoux et pierres précieuses.',
  'Services d''expertise complets :

• Authentification et identification
• Estimation de valeur marchande
• Certificats d''authenticité
• Évaluation assurance et succession
• Conseil en investissement
• Détection contrefaçons

Expertise reconnue et certifiée. Rapports détaillés acceptés par les assurances et institutions. Confidentialité absolue garantie.',
  'individuals',
  'shield',
  '100-500€',
  '1-3 jours'
),
(
  'Conseil',
  'Conseil personnalisé pour tous vos projets joailliers.',
  'Accompagnement conseil sur mesure :

• Conseil en achat et investissement
• Aide au choix pierres et matériaux
• Tendances et style personnel
• Entretien et conservation
• Transmission et héritage
• Optimisation collection personnelle

Expertise bienveillante pour vous guider dans tous vos choix. Approche pédagogique pour développer votre connaissance du monde joaillier.',
  'individuals',
  'users',
  '80-150€/h',
  'Sur rendez-vous'
),
(
  'Accompagnement',
  'Accompagnement personnalisé pour vos achats et projets spéciaux.',
  'Services d''accompagnement privilégiés :

• Accompagnement achats prestige
• Recherche pièces rares et d''exception
• Négociation et transaction sécurisée
• Organisation événements privés
• Conseil en protocole et étiquette
• Service conciergerie joaillerie

Accompagnement discret et professionnel pour vos moments d''exception. Réseau privilégié d''artisans et maisons prestigieuses.',
  'individuals',
  'handshake',
  'Sur devis',
  'Variable'
),
(
  'Achat & Rachat d''Or',
  'Service professionnel d''achat et rachat de métaux précieux.',
  'Services métaux précieux :

• Rachat or, argent, platine au cours du jour
• Évaluation gratuite et sans engagement  
• Transaction sécurisée et transparente
• Paiement immédiat
• Achat lingots et pièces d''investissement
• Conseil en placement métaux précieux

Cours actualisés en temps réel. Transactions en toute confiance avec expert certifié. Service discret et professionnel.',
  'individuals',
  'coins',
  'Cours du jour',
  'Immédiat'
);