export const COMPANY = {
  name: 'JDFP-Communication',
  tagline: "L'épanouissement de votre investissement est notre responsabilité",
  rccm: '14-A-5902',
  idNational: '01-93-N8017F',
  nif: 'A1404113M',
  address: 'Av. Tombalbaye n° A19 local 03, Kinshasa/Gombe, RDC',
  phone: '+243 898 108 447',
  whatsapp: '243898108447',
  email: 'contact@jdfp-communication.com',
  banks: {
    tmb: { name: 'TMB', account: '1201-5902743-00-03' },
    equity: { name: 'EQUITY BCDC', account: '00011-05001-12000218859-10' },
  },
} as const;

export const NAV_LINKS = [
  { label: 'Services IT', href: '/services-it' },
  {
    label: 'Intelligence IA',
    href: '#',
    children: [
      { label: 'IA Santé', href: '/ia/sante' },
      { label: 'IA Juridique', href: '/ia/droit' },
      { label: 'IA Sécurité', href: '/ia/securite' },
    ],
  },
  { label: 'Publicité', href: '/publicite' },
  { label: 'Visas & Voyage', href: '/visas' },
  { label: 'Véhicules', href: '/vehicules' },
  { label: 'Domaines & Hosting', href: '/domaines' },
];
