import { Code2, Smartphone, ShoppingCart, HeartPulse, Cpu, Cloud, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { COMPANY } from '@/lib/constants';

const services = [
  {
    icon: Code2,
    title: 'ERP & CRM',
    description: "Solutions de gestion d'entreprise et de relation client sur mesure, adaptées aux besoins spécifiques des PME et grandes entreprises du marché congolais.",
    image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800&q=75',
    tags: ['ERP', 'CRM', 'SAAS'],
  },
  {
    icon: Smartphone,
    title: 'Applications Mobiles',
    description: 'Développement iOS et Android natif ou cross-platform. De la fintech aux apps de livraison, nous construisons des applications performantes et scalables.',
    image: 'https://images.pexels.com/photos/907489/pexels-photo-907489.jpeg?auto=compress&cs=tinysrgb&w=800&q=75',
    tags: ['iOS', 'Android', 'Flutter'],
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce',
    description: "Boutiques en ligne adaptées au marché africain : intégration des paiements mobile money, ETM, VISA/MC et logistique locale.",
    image: 'https://images.pexels.com/photos/5632379/pexels-photo-5632379.jpeg?auto=compress&cs=tinysrgb&w=800&q=75',
    tags: ['Shopify', 'WooCommerce', 'Custom'],
  },
  {
    icon: HeartPulse,
    title: 'HealthTech',
    description: "Systèmes de dossiers patients électroniques, télémédecine et plateformes de santé numérique pour hôpitaux et cliniques.",
    image: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=800&q=75',
    tags: ['EMR', 'Télémédecine', 'API Santé'],
  },
  {
    icon: Cpu,
    title: 'Intelligence Artificielle',
    description: "Développement de modèles IA sur mesure : chatbots intelligents, analyse prédictive, traitement du langage naturel et vision par ordinateur.",
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&q=75',
    tags: ['Machine Learning', 'NLP', 'Chatbot'],
  },
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    description: "Migration cloud, architecture AWS/GCP/Azure, DevOps et sécurité informatique. Hébergement haute disponibilité et résilience pour vos données sensibles.",
    image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800&q=75',
    tags: ['AWS', 'Azure', 'DevOps'],
  },
];

const steps = [
  { step: '01', title: 'Analyse des besoins', desc: "Cadrage technique et fonctionnel, cartographie des processus et audit de l'existant." },
  { step: '02', title: 'Conception & Design', desc: 'Architecture système, maquettes UX/UI et prototypage validé avec vos équipes.' },
  { step: '03', title: 'Développement Agile', desc: 'Sprints bi-hebdomadaires, tests continus et livraisons progressives avec votre feedback.' },
  { step: '04', title: 'Déploiement & Support', desc: 'Mise en production, formation des utilisateurs et support technique dédié 24/7.' },
];

export default function ServicesITPage() {
  return (
    <div className="min-h-screen bg-[hsl(220_18%_8%)]">
      <div className="page-hero relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220_18%_8%)] via-[hsl(220_18%_6%)] to-[hsl(220_18%_8%)]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(48 100% 50%) 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex p-4 rounded-2xl bg-[hsl(48_100%_50%)]/10 border border-[hsl(48_100%_50%)]/30 mb-6">
            <Code2 className="w-10 h-10 text-[hsl(48_100%_50%)]" />
          </div>
          <span className="section-tag mb-4">JDFP — Pôle Technologique</span>
          <h1 className="font-display text-5xl md:text-7xl text-white mb-6 leading-none">
            SERVICES IT SUR MESURE
          </h1>
          <div className="divider-gold mx-auto mb-6" />
          <p className="text-[hsl(220_8%_55%)] text-xl max-w-2xl mx-auto mb-10">
            Nous concevons et déployons des solutions IT performantes et adaptées aux réalités du marché
            Grand-Congo, de l&apos;ERP cloud au système de paiement mobile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${COMPANY.whatsapp}?text=Bonjour%2C%20je%20souhaite%20un%20devis%20pour%20un%20projet%20IT.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2"
            >
              Demander un devis
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <section className="py-24 bg-[hsl(220_16%_12%)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-tag mb-4">Nos spécialités</span>
            <h2 className="font-display text-5xl text-white mb-4">NOS SOLUTIONS</h2>
            <div className="divider-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="card-dark transition-all hover:-translate-y-1 hover:border-[hsl(48_100%_50%)]/40 overflow-hidden group">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_16%_12%)] to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <div className="inline-flex p-2.5 rounded-xl bg-[hsl(48_100%_50%)]/10 border border-[hsl(48_100%_50%)]/30 backdrop-blur-sm">
                        <Icon className="w-5 h-5 text-[hsl(48_100%_50%)]" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-[hsl(220_8%_55%)] text-sm leading-relaxed mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className="bg-[hsl(220_18%_8%)] text-[hsl(220_8%_55%)] text-xs px-3 py-1 rounded-full border border-[hsl(220_12%_20%)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[hsl(220_18%_8%)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-tag mb-4">Notre méthode</span>
            <h2 className="font-display text-5xl text-white mb-4">NOTRE PROCESSUS</h2>
            <div className="divider-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.step} className="card-dark p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-[hsl(48_100%_50%)]/10 border-2 border-[hsl(48_100%_50%)]/40 flex items-center justify-center mx-auto mb-4 text-[hsl(48_100%_50%)] font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="text-white font-bold mb-2">{step.title}</h3>
                <p className="text-[hsl(220_8%_55%)] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        <img
          src="/images/office-premium.jpg"
          alt="Office"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-[hsl(220_18%_8%)]/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="section-tag mb-4">Démarrez maintenant</span>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
            UN PROJET EN TÊTE ?
          </h2>
          <p className="text-[hsl(220_8%_55%)] text-xl mb-10 max-w-2xl mx-auto">
            Discutons de vos besoins en toute confidentialité. Notre équipe technique vous répond dans les 24h.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
            {['Devis gratuit', 'NDA disponible', 'Expertise locale', 'Support 24/7'].map((item) => (
              <div key={item} className="flex items-center gap-2 justify-center">
                <CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] flex-shrink-0" />
                <span className="text-white text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2"
            >
              Contacter notre équipe IT
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link href="/" className="btn-outline-gold">
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
