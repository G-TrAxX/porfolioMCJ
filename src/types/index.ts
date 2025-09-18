export interface Service {
  id: string;
  title: string;
  description: string;
  details: string;
  category: 'professionals' | 'individuals';
  icon: string;
  price_range?: string;
  duration?: string;
  created_at: string;
  updated_at: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  category: 'professional' | 'individual';
  service: string;
  message: string;
}

export interface Profile {
  id: string;
  name: string;
  title: string;
  description: string;
  photo_url: string;
  email: string;
  phone: string;
  address: string;
  social_links: {
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
  created_at: string;
  updated_at: string;
}