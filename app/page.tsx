import Link from 'next/link';
import { Code2, HeartPulse, Scale, ShieldCheck, MonitorPlay, Plane, Car, Globe, ArrowRight, CheckCircle, Award, MapPin } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import PartnerShowcase from '@/components/home/PartnerShowcase';

const services = [
  {
    icon: Code2,
    title: 'Services IT',
    description: 'ERP, CRM, Fintech, E-commerce, HealthTech et applications mobiles sur mesure pour votre croissance.',
    href: '/services-it',
    color: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: HeartPulse,
    title: 'IA Médicale',
    description: 'Diagnostic assisté par IA, dossiers patients intelligents et solutions de santé numérique avancées.',
    href: '/ia/sante',
    color: 'bg-rose-500/20',
    iconColor: 'text-rose-400',
  },
  {
    icon: Scale,
    title: 'IA Juridique',
    description: 'Analyse contractuelle automatisée, veille légale et assistance juridique intelligente en droit congolais.',
    href: '/ia/droit',
    color: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
  },
  {
    icon: ShieldCheck,
    title: 'IA Sécurité',
    description: 'Surveillance intelligente, détection des menaces et protection des infrastructures critiques par IA.',
    href: '/ia/securite',
    color: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    icon: MonitorPlay,
    title: 'Régie Publicitaire',
    description: 'Campagnes digitales, affichage LED, production audiovisuelle et stratégie média à Kinshasa et Brazzaville.',
    href: '/publicite',
    color: 'bg-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: Plane,
    title: 'Visas & Voyage',
    description: 'Assistance visa Schengen, entrée RDC/Congo, suivi de dossiers en ligne et accompagnement complet.',
    href: '/visas',
    color: 'bg-sky-500/20',
    iconColor: 'text-sky-400',
  },
  {
    icon: Car,
    title: 'Location Véhicules',
    description: "Flotte premium SUV, berlines de luxe et minivans avec chauffeur, Meet & Greet aéroport N'Djili.",
    href: '/vehicules',
    color: 'bg-orange-500/20',
    iconColor: 'text-orange-400',
  },
  {
    icon: Globe,
    title: 'Domaines & Hosting',
    description: 'Enregistrement de domaines .cd, hébergement haute disponibilité et certificats SSL pour vos projets.',
    href: '/domaines',
    color: 'bg-teal-500/20',
    iconColor: 'text-teal-400',
  },
];

const stats = [
  { value: '8', label: 'Pôles de Services' },
  { value: '2', label: 'Capitales (KIN/BZV)' },
  { value: '+500', label: 'Clients' },
  { value: '5 ans', label: "d'Expertise" },
];

const teamMembers = [
  { name: 'Jean-Daniel F.', role: 'Directeur Général', img: 'https://build-my-site-now-890.lovable.app/assets/team-patou-HuLE9MzT.jpg' },
  { name: 'Marie K.', role: 'Responsable IT', img: 'https://build-my-site-now-890.lovable.app/assets/team-member2-BRPD_obl.jpg' },
  { name: 'Patrick M.', role: 'Chef de Projet IA', img: 'https://build-my-site-now-890.lovable.app/assets/team-member3-bq5uoIX1.jpg' },
  { name: 'Sophie N.', role: 'Directrice Comm.', img: 'https://build-my-site-now-890.lovable.app/assets/team-member4-BLi1DsDK.jpg' },
];

const whyItems = [
  {
    icon: MapPin,
    title: 'Expertise RDC',
    description: 'Ancrés à Kinshasa et Brazzaville, nous maîtrisons les réalités du marché Grand-Congo : connectivité, réglementation et usages locaux.',
    points: ['Équipes sur le terrain à Kinshasa/Gombe', 'Réseau de partenaires en Congo-Brazzaville', 'Support en français, lingala et swahili'],
  },
  {
    icon: Award,
    title: 'Conformité Légale',
    description: 'Société légalement constituée sous le droit congolais, enregistrée au RCCM et à jour de toutes obligations fiscales.',
    points: [`RCCM : ${COMPANY.rccm}`, `N° National : ${COMPANY.idNational}`, `NIF : ${COMPANY.nif}`],
  },
  {
    icon: CheckCircle,
    title: 'Solutions Premium',
    description: 'Nous intégrons les dernières innovations en intelligence artificielle pour automatiser, analyser et optimiser vos opérations.',
    points: ['IA Métier sectorielle (Santé, Droit, Sécurité)', 'Modèles entraînés sur données africaines', 'Déploiement cloud et on-premise'],
  },
];

export default function HomePage() {
  return (
    <div className="w-full bg-[hsl(220_18%_8%)]">
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <img
          src="https://build-my-site-now-890.lovable.app/assets/hero-car-BegUkEvH.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_18%_8%)]/80 via-[hsl(220_18%_8%)]/60 to-[hsl(220_18%_8%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center py-24">
          <span className="section-tag mb-8 inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-[hsl(48_100%_50%)] rounded-full animate-pulse" />
            Transformation Numérique Grand-Congo
          </span>

          <h1 className="font-display text-6xl md:text-8xl text-white mb-6 leading-none tracking-wide">
            JDFP COMMUNICATION
          </h1>

          <p className="text-[hsl(48_100%_50%)] text-xl md:text-2xl font-semibold mb-4 italic max-w-3xl mx-auto">
            "{COMPANY.tagline}"
          </p>

          <p className="text-[hsl(220_8%_55%)] text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            L'agence de référence pour la digitalisation des entreprises à Kinshasa et Brazzaville.
            IT sur mesure, Intelligence Artificielle et services à valeur ajoutée pour le Grand-Congo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services-it" className="btn-gold inline-flex items-center gap-2">
              Découvrir nos services
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contact WhatsApp
            </a>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="card-dark p-6 text-center hover:border-[hsl(48_100%_50%)]/40 transition-all">
                <div className="text-3xl md:text-4xl font-extrabold text-[hsl(48_100%_50%)] mb-1">
                  {stat.value}
                </div>
                <div className="text-[hsl(220_8%_55%)] text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-[hsl(48_100%_50%)] to-transparent" />
          <div className="w-2 h-2 rounded-full bg-[hsl(48_100%_50%)]" />
        </div>
      </section>

      <PartnerShowcase />

      <section className="py-24 bg-[hsl(220_16%_12%)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-tag mb-4">Nos Pôles d'Expertise</span>
            <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
              8 SERVICES, 1 PARTENAIRE
            </h2>
            <div className="divider-gold mx-auto mb-6" />
            <p className="text-[hsl(220_8%_55%)] text-lg max-w-2xl mx-auto">
              De la conception technique à la visibilité médiatique, couvrez tous vos besoins numériques avec JDFP-Communication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="card-dark transition-all group p-6 hover:border-[hsl(48_100%_50%)]/40 hover:-translate-y-1"
                >
                  <div className={`inline-flex p-3 rounded-xl ${service.color} mb-4`}>
                    <Icon className={`w-6 h-6 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-[hsl(220_8%_55%)] text-sm leading-relaxed mb-4">{service.description}</p>
                  <div className="flex items-center gap-1 text-[hsl(48_100%_50%)] text-sm font-semibold">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[hsl(220_18%_8%)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://build-my-site-now-890.lovable.app/assets/jdfp-branding-UZL4Avtx.jpeg"
                alt="JDFP Branding"
                className="w-full h-[600px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_18%_8%)]/40 to-transparent rounded-2xl" />
              <div className="absolute bottom-6 left-6">
                <img
                  src="https://build-my-site-now-890.lovable.app/assets/logo-jdfp-QVc2ccJJ.jpeg"
                  alt="JDFP Logo"
                  className="w-20 h-20 object-cover rounded-xl border-2 border-[hsl(48_100%_50%)]"
                />
              </div>
            </div>

            <div>
              <span className="section-tag mb-6">Notre Histoire</span>
              <h2 className="font-display text-5xl md:text-6xl text-white mb-6 leading-none">
                L'AGENCE DE RÉFÉRENCE GRAND-CONGO
              </h2>
              <div className="divider-gold mb-8" />
              <p className="text-[hsl(220_8%_55%)] text-lg leading-relaxed mb-8">
                JDFP-Communication est née d'une vision : bâtir le pont technologique entre le Grand-Congo et le monde numérique.
                Depuis notre fondation à Kinshasa/Gombe, nous accompagnons les entreprises congolaises et internationales
                dans leur transformation digitale, avec rigueur, innovation et ancrage local.
              </p>
              <p className="text-[hsl(220_8%_55%)] leading-relaxed mb-10">
                De l'intelligence artificielle sectorielle aux solutions IT sur mesure, en passant par notre régie publicitaire
                premium et nos services de mobilité VIP, JDFP offre un écosystème complet pour votre croissance dans la région.
              </p>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '+500', label: 'Clients servis' },
                  { value: '8', label: 'Services actifs' },
                  { value: '5 ans', label: "d'Expertise" },
                ].map((s) => (
                  <div key={s.label} className="card-dark p-4 text-center">
                    <div className="text-2xl font-extrabold text-[hsl(48_100%_50%)]">{s.value}</div>
                    <div className="text-[hsl(220_8%_55%)] text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[hsl(220_16%_12%)] relative overflow-hidden">
        <img
          src="https://build-my-site-now-890.lovable.app/assets/office-premium-D-UgUq69.jpg"
          alt="Office Premium"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-tag mb-4">Notre Valeur Ajoutée</span>
            <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
              POURQUOI CHOISIR JDFP ?
            </h2>
            <div className="divider-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card-dark transition-all p-8 hover:border-[hsl(48_100%_50%)]/40">
                  <div className="inline-flex p-3 rounded-xl bg-[hsl(48_100%_50%)]/10 border border-[hsl(48_100%_50%)]/30 mb-6">
                    <Icon className="w-6 h-6 text-[hsl(48_100%_50%)]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-[hsl(220_8%_55%)] text-sm leading-relaxed mb-6">{item.description}</p>
                  <ul className="space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-[hsl(0_0%_85%)]">
                        <CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[hsl(220_18%_8%)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-tag mb-4">Notre Équipe</span>
            <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
              LES VISAGES DE JDFP
            </h2>
            <div className="divider-gold mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="card-dark transition-all group overflow-hidden hover:border-[hsl(48_100%_50%)]/40">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_18%_8%)] via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <p className="text-white font-bold">{member.name}</p>
                  <p className="text-[hsl(48_100%_50%)] text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[hsl(220_16%_12%)] border-t border-[hsl(220_12%_20%)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
            PRÊT À TRANSFORMER VOTRE BUSINESS ?
          </h2>
          <p className="text-[hsl(220_8%_55%)] text-lg mb-10 max-w-xl mx-auto">
            Contactez notre équipe dès maintenant via WhatsApp pour un devis gratuit et personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${COMPANY.whatsapp}?text=Bonjour%20JDFP-Communication%2C%20je%20souhaite%20un%20devis.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp : {COMPANY.phone}
            </a>
            <Link href="/services-it" className="btn-outline-gold inline-flex items-center gap-2">
              Voir tous nos services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
