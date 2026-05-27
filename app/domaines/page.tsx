'use client';

import { useState, useEffect, useRef } from 'react';
import { Globe, CheckCircle, Star, XCircle, Clock, Building2, CreditCard, Search, AlertCircle, Loader2, ChevronRight } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { supabase } from '@/lib/supabase';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface Product {
  id: string;
  name: string;
  description: string;
  price_usd: number;
  price_period: string;
  features: string[];
  is_featured: boolean;
  category: string;
}

interface OrderForm {
  client_name: string;
  client_email: string;
  client_phone: string;
  domain_name: string;
  payment_method: string;
  payment_reference: string;
  product_id: string;
  product_name: string;
}

interface DomainResult {
  tld: string;
  domain: string;
  available: boolean | null;
  price: number;
  sale: number | null;
  popular: boolean;
}

type TabKey = 'domain' | 'hosting' | 'bundle';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'domain', label: 'Domaines' },
  { key: 'hosting', label: 'Hébergements' },
  { key: 'bundle', label: 'Bundles' },
];

const TLD_INFO: Record<string, string> = {
  '.cd': 'Congo · Identité locale',
  '.com': 'International · Crédibilité',
  '.net': 'Réseaux · Technologie',
  '.org': 'Organisations · ONG',
  '.africa': 'Continent africain',
  '.io': 'Startups · Tech',
  '.tech': 'Innovation · Digital',
  '.online': 'Présence en ligne',
};

export default function DomainesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>('domain');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    client_name: '',
    client_email: '',
    client_phone: '',
    domain_name: '',
    payment_method: 'TMB',
    payment_reference: '',
    product_id: '',
    product_name: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<DomainResult[] | null>(null);
  const [searchError, setSearchError] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('domain_products')
        .select('*')
        .eq('is_active', true)
        .order('category');
      if (!error && data) setProducts(data as Product[]);
      setLoadingProducts(false);
    }
    fetchProducts();
  }, []);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setSearching(true);
    setSearchResults(null);
    setSearchError('');
    try {
      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/domain-check?name=${encodeURIComponent(q)}`,
        { headers: { Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSearchResults(data.results as DomainResult[]);
    } catch (err) {
      setSearchError("La vérification a échoué. Veuillez réessayer.");
    } finally {
      setSearching(false);
    }
  }

  const filtered = products.filter((p) => p.category === activeTab);

  function openOrderModal(domainName?: string, price?: number) {
    setSelectedProduct(null);
    setOrderForm({
      client_name: '',
      client_email: '',
      client_phone: '',
      domain_name: domainName ?? '',
      payment_method: 'TMB',
      payment_reference: '',
      product_id: 'domain-registration',
      product_name: domainName ? `Enregistrement ${domainName}` : 'Enregistrement de domaine',
    });
    setSuccess(false);
    setError('');
    setModalOpen(true);
  }

  function openProductModal(product: Product) {
    setSelectedProduct(product);
    setOrderForm((prev) => ({ ...prev, product_id: product.id, product_name: product.name, domain_name: '' }));
    setSuccess(false);
    setError('');
    setModalOpen(true);
  }

  async function handleOrderSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const { error: insertError } = await supabase.from('domain_orders').insert([
      {
        client_name: orderForm.client_name,
        client_email: orderForm.client_email,
        client_phone: orderForm.client_phone,
        domain_name: orderForm.domain_name || null,
        payment_method: orderForm.payment_method,
        payment_reference: orderForm.payment_reference,
        product_id: orderForm.product_id,
        product_name: orderForm.product_name,
        status: 'pending',
      },
    ]);
    if (insertError) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } else {
      setSuccess(true);
    }
    setSubmitting(false);
  }

  const needsDomain = !selectedProduct || selectedProduct.category === 'domain' || selectedProduct.category === 'bundle';

  const availableCount = searchResults?.filter((r) => r.available === true).length ?? 0;

  return (
    <div className="min-h-screen bg-[hsl(220_18%_8%)]">
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, hsl(220 18% 10%), hsl(220 18% 6%))' }}>
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, hsl(48 100% 50%) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center mb-12">
            <span className="section-tag mb-4 inline-flex">
              <Globe className="w-3.5 h-3.5" />
              Domaines & Hébergement
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-white mb-4">
              VOTRE <span style={{ color: 'hsl(48 100% 50%)' }}>PRÉSENCE</span> EN LIGNE
            </h1>
            <p className="text-[hsl(220_8%_55%)] text-lg max-w-xl mx-auto">
              Trouvez et enregistrez le nom de domaine parfait pour votre entreprise en RDC et à l&apos;international.
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex gap-0 rounded-2xl overflow-hidden shadow-[0_0_60px_-10px_hsl(48_100%_50%_/0.25)] border border-[hsl(48_100%_50%_/0.2)]">
              <div className="flex items-center pl-5 bg-[hsl(220_16%_14%)]">
                <Globe className="w-5 h-5 text-[hsl(48_100%_50%)]" />
              </div>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tapez votre nom de domaine... ex: monentreprise"
                className="flex-1 px-4 py-5 bg-[hsl(220_16%_14%)] text-white placeholder-[hsl(220_8%_40%)] text-lg focus:outline-none"
              />
              <button
                type="submit"
                disabled={searching || !searchQuery.trim()}
                className="px-8 py-5 font-bold text-[hsl(220_18%_8%)] flex items-center gap-2 transition-opacity disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, hsl(48 100% 50%), hsl(42 85% 58%))' }}
              >
                {searching ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span className="hidden sm:inline">{searching ? 'Recherche...' : 'Rechercher'}</span>
              </button>
            </div>
            <p className="text-center text-[hsl(220_8%_40%)] text-xs mt-3">
              Essayez : monentreprise · jdfp · congo-tech · kinshasa
            </p>
          </form>
        </div>
      </div>

      {(searching || searchResults || searchError) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {searchError && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl p-4 mb-6">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {searchError}
            </div>
          )}

          {searching && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card-dark p-5 animate-pulse h-28" />
              ))}
            </div>
          )}

          {searchResults && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white font-bold text-xl">
                    Résultats pour <span style={{ color: 'hsl(48 100% 50%)' }}>&quot;{searchQuery}&quot;</span>
                  </h2>
                  <p className="text-[hsl(220_8%_55%)] text-sm mt-1">
                    {availableCount} extension{availableCount !== 1 ? 's' : ''} disponible{availableCount !== 1 ? 's' : ''} trouvée{availableCount !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={() => { setSearchResults(null); setSearchQuery(''); searchRef.current?.focus(); }}
                  className="text-[hsl(220_8%_55%)] hover:text-white text-sm transition-colors"
                >
                  Nouvelle recherche
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {searchResults.map((r) => (
                  <div
                    key={r.tld}
                    className={`rounded-2xl p-5 border transition-all ${
                      r.available === true
                        ? 'bg-[hsl(220_16%_12%)] border-[hsl(48_100%_50%_/0.3)] hover:border-[hsl(48_100%_50%_/0.6)] hover:shadow-gold'
                        : r.available === false
                        ? 'bg-[hsl(220_16%_10%)] border-[hsl(220_12%_18%)] opacity-60'
                        : 'bg-[hsl(220_16%_12%)] border-[hsl(220_12%_20%)]'
                    }`}
                  >
                    {r.popular && r.available === true && (
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-3 h-3 fill-[hsl(48_100%_50%)] text-[hsl(48_100%_50%)]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'hsl(48 100% 50%)' }}>Populaire</span>
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-white font-bold text-lg truncate">{r.domain}</p>
                      {r.available === true && (
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {r.available === false && (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      )}
                      {r.available === null && (
                        <AlertCircle className="w-5 h-5 text-[hsl(220_8%_40%)] shrink-0 mt-0.5" />
                      )}
                    </div>

                    <p className="text-[hsl(220_8%_45%)] text-xs mb-3">{TLD_INFO[r.tld] ?? ''}</p>

                    {r.available === true ? (
                      <>
                        <div className="flex items-baseline gap-1 mb-3">
                          {r.sale ? (
                            <>
                              <span className="text-xl font-extrabold" style={{ color: 'hsl(48 100% 50%)' }}>${r.sale}</span>
                              <span className="text-[hsl(220_8%_45%)] text-xs line-through">${r.price}</span>
                              <span className="text-[hsl(220_8%_45%)] text-xs">/an</span>
                            </>
                          ) : (
                            <>
                              <span className="text-xl font-extrabold" style={{ color: 'hsl(48 100% 50%)' }}>${r.price}</span>
                              <span className="text-[hsl(220_8%_45%)] text-xs">/an</span>
                            </>
                          )}
                        </div>
                        <button
                          onClick={() => openOrderModal(r.domain, r.sale ?? r.price)}
                          className="w-full py-2 rounded-xl text-xs font-bold text-[hsl(220_18%_8%)] transition-opacity hover:opacity-90 flex items-center justify-center gap-1"
                          style={{ background: 'linear-gradient(135deg, hsl(48 100% 50%), hsl(42 85% 58%))' }}
                        >
                          Commander
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : r.available === false ? (
                      <p className="text-red-400 text-xs font-semibold">Déjà enregistré</p>
                    ) : (
                      <p className="text-[hsl(220_8%_40%)] text-xs">Statut inconnu</p>
                    )}
                  </div>
                ))}
              </div>

              {availableCount > 0 && (
                <div className="rounded-2xl p-5 border border-[hsl(48_100%_50%_/0.15)] flex items-center justify-between gap-4" style={{ background: 'hsl(48 100% 50% / 0.05)' }}>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    <p className="text-white text-sm">
                      <strong>{availableCount} domaine{availableCount > 1 ? 's' : ''}</strong> disponible{availableCount > 1 ? 's' : ''} — Notre équipe vous accompagne dans l&apos;enregistrement.
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp}?text=Bonjour%2C%20je%20souhaite%20enregistrer%20le%20domaine%20${encodeURIComponent(searchQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold text-sm whitespace-nowrap"
                  >
                    Contacter WhatsApp
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <span className="section-tag mb-4">Nos Offres</span>
          <h2 className="font-display text-4xl text-white mt-2">PLANS & TARIFS</h2>
        </div>

        <div className="flex gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-[hsl(48_100%_50%)] text-[hsl(220_18%_8%)]'
                  : 'card-dark text-[hsl(220_8%_55%)] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loadingProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card-dark p-8 animate-pulse">
                <div className="h-5 bg-[hsl(220_12%_20%)] rounded w-1/2 mb-4" />
                <div className="h-8 bg-[hsl(220_12%_20%)] rounded w-1/3 mb-6" />
                <div className="space-y-2">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-3 bg-[hsl(220_12%_20%)] rounded w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card-dark p-12 text-center">
            <Globe className="w-12 h-12 text-[hsl(220_8%_55%)] mx-auto mb-4" />
            <p className="text-[hsl(220_8%_55%)] mb-2">Aucun produit disponible dans cette catégorie.</p>
            <p className="text-[hsl(220_8%_40%)] text-sm">Contactez-nous pour un devis personnalisé.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className={`card-dark overflow-hidden flex flex-col transition-transform hover:-translate-y-1 ${
                  product.is_featured ? 'border-[hsl(48_100%_50%)] ring-1 ring-[hsl(48_100%_50%)]/20' : ''
                }`}
              >
                {product.is_featured ? (
                  <div className="bg-[hsl(48_100%_50%)] px-6 py-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-[hsl(220_18%_8%)] fill-[hsl(220_18%_8%)]" />
                    <span className="text-[hsl(220_18%_8%)] font-bold text-sm">Populaire</span>
                  </div>
                ) : (
                  <div className="bg-[hsl(220_16%_12%)] px-6 py-3 border-b border-[hsl(220_12%_20%)]">
                    <span className="text-[hsl(220_8%_55%)] text-sm">Standard</span>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                  <p className="text-[hsl(220_8%_55%)] text-sm mb-4">{product.description}</p>
                  <div className="mb-6">
                    <span className="text-3xl font-extrabold text-[hsl(48_100%_50%)]">${product.price_usd}</span>
                    <span className="text-[hsl(220_8%_55%)] text-sm ml-1">/ {product.price_period}</span>
                  </div>
                  {product.features && product.features.length > 0 && (
                    <ul className="space-y-2 mb-6 flex-1">
                      {product.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[hsl(0_0%_85%)]">
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  )}
                  <button
                    onClick={() => openProductModal(product)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      product.is_featured ? 'btn-gold' : 'btn-outline-gold'
                    }`}
                  >
                    Commander
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 mb-10">
          <span className="section-tag mb-4">Extensions Disponibles</span>
          <h2 className="font-display text-4xl text-white mt-2">TARIFS PAR EXTENSION</h2>
        </div>

        <div className="card-dark overflow-hidden mb-12">
          <div className="grid grid-cols-4 px-6 py-3 border-b border-[hsl(220_12%_20%)] text-[hsl(220_8%_45%)] text-xs font-semibold uppercase tracking-wider">
            <div>Extension</div>
            <div>Description</div>
            <div>Prix / an</div>
            <div></div>
          </div>
          {Object.entries(TLD_INFO).map(([tld, desc], i) => {
            const prices: Record<string, { price: number; sale?: number }> = {
              '.cd': { price: 35 }, '.com': { price: 15, sale: 12 }, '.net': { price: 14 },
              '.org': { price: 12, sale: 9 }, '.africa': { price: 28 }, '.io': { price: 45 },
              '.tech': { price: 20, sale: 8 }, '.online': { price: 10, sale: 3 },
            };
            const p = prices[tld];
            return (
              <div
                key={tld}
                className={`grid grid-cols-4 px-6 py-4 items-center transition-colors hover:bg-[hsl(220_14%_15%)] ${
                  i < Object.keys(TLD_INFO).length - 1 ? 'border-b border-[hsl(220_12%_18%)]' : ''
                }`}
              >
                <div className="font-bold text-white text-lg font-mono">{tld}</div>
                <div className="text-[hsl(220_8%_55%)] text-sm">{desc}</div>
                <div className="flex items-baseline gap-1.5">
                  {p.sale ? (
                    <>
                      <span className="font-bold" style={{ color: 'hsl(48 100% 50%)' }}>${p.sale}</span>
                      <span className="text-[hsl(220_8%_40%)] text-xs line-through">${p.price}</span>
                    </>
                  ) : (
                    <span className="font-bold" style={{ color: 'hsl(48 100% 50%)' }}>${p.price}</span>
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => { setSearchQuery(''); searchRef.current?.focus(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-[hsl(48_100%_50%)] hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    Vérifier <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-dark p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-[hsl(48_100%_50%)]" />
              <h3 className="text-lg font-bold text-white">Informations de paiement</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-[hsl(220_18%_8%)] rounded-xl p-4 border border-[hsl(220_12%_20%)]">
                <p className="text-xs font-semibold text-[hsl(48_100%_50%)] uppercase tracking-wide mb-1">{COMPANY.banks.tmb.name}</p>
                <p className="text-white font-mono font-semibold">{COMPANY.banks.tmb.account}</p>
                <p className="text-[hsl(220_8%_55%)] text-sm">{COMPANY.name}</p>
              </div>
              <div className="bg-[hsl(220_18%_8%)] rounded-xl p-4 border border-[hsl(220_12%_20%)]">
                <p className="text-xs font-semibold text-[hsl(48_100%_50%)] uppercase tracking-wide mb-1">{COMPANY.banks.equity.name}</p>
                <p className="text-white font-mono font-semibold">{COMPANY.banks.equity.account}</p>
                <p className="text-[hsl(220_8%_55%)] text-sm">{COMPANY.name}</p>
              </div>
            </div>
          </div>
          <div className="card-dark p-6 flex flex-col justify-between">
            <div>
              <CreditCard className="w-8 h-8 text-[hsl(48_100%_50%)] mb-4" />
              <h3 className="text-white text-xl font-bold mb-2">Besoin d&apos;aide ?</h3>
              <p className="text-[hsl(220_8%_55%)] text-sm">
                Notre équipe est disponible pour vous aider dans le choix de votre nom de domaine et de votre formule d&apos;hébergement.
              </p>
            </div>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 btn-gold inline-block text-center"
            >
              Contacter via WhatsApp
            </a>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[hsl(220_16%_12%)] border border-[hsl(220_12%_20%)] rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="bg-[hsl(220_18%_8%)] p-6 rounded-t-3xl border-b border-[hsl(220_12%_20%)]">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Commander</h2>
                  <p className="text-[hsl(48_100%_50%)] font-semibold mt-1">
                    {selectedProduct?.name ?? orderForm.product_name}
                  </p>
                </div>
                <button onClick={() => setModalOpen(false)} className="text-[hsl(220_8%_55%)] hover:text-white transition-colors p-1">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Commande reçue !</h3>
                  <p className="text-[hsl(220_8%_55%)] text-sm mb-4">
                    Votre commande a été enregistrée. Veuillez effectuer votre virement sur l&apos;un de ces comptes :
                  </p>
                  <div className="space-y-3 text-left mb-6">
                    <div className="bg-[hsl(220_18%_8%)] rounded-xl p-3 border border-[hsl(220_12%_20%)]">
                      <p className="text-xs font-semibold text-[hsl(48_100%_50%)] uppercase">{COMPANY.banks.tmb.name}</p>
                      <p className="text-white font-mono text-sm font-semibold">{COMPANY.banks.tmb.account}</p>
                    </div>
                    <div className="bg-[hsl(220_18%_8%)] rounded-xl p-3 border border-[hsl(220_12%_20%)]">
                      <p className="text-xs font-semibold text-[hsl(48_100%_50%)] uppercase">{COMPANY.banks.equity.name}</p>
                      <p className="text-white font-mono text-sm font-semibold">{COMPANY.banks.equity.account}</p>
                    </div>
                  </div>
                  <button onClick={() => setModalOpen(false)} className="btn-outline-gold">
                    Fermer
                  </button>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  {[
                    { name: 'client_name', label: 'Nom complet', type: 'text', placeholder: 'Jean Dupont' },
                    { name: 'client_email', label: 'Email', type: 'email', placeholder: 'jean@exemple.com' },
                    { name: 'client_phone', label: 'Téléphone', type: 'tel', placeholder: '+243 8XX XXX XXX' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-white mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={orderForm[field.name as keyof OrderForm]}
                        onChange={(e) => setOrderForm((prev) => ({ ...prev, [field.name]: e.target.value }))}
                        required
                        className="input-dark w-full"
                      />
                    </div>
                  ))}
                  {needsDomain && (
                    <div>
                      <label className="block text-sm font-medium text-white mb-1.5">Nom de domaine souhaité</label>
                      <input
                        type="text"
                        placeholder="monentreprise.cd"
                        value={orderForm.domain_name}
                        onChange={(e) => setOrderForm((prev) => ({ ...prev, domain_name: e.target.value }))}
                        required
                        className="input-dark w-full"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-white mb-1.5">Mode de paiement</label>
                    <select
                      value={orderForm.payment_method}
                      onChange={(e) => setOrderForm((prev) => ({ ...prev, payment_method: e.target.value }))}
                      required
                      className="input-dark w-full"
                    >
                      <option value="TMB">TMB</option>
                      <option value="EQUITY BCDC">EQUITY BCDC</option>
                      <option value="Mobile Money">Mobile Money</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>
                  {(orderForm.payment_method === 'TMB' || orderForm.payment_method === 'EQUITY BCDC') && (
                    <div className="bg-[hsl(220_18%_8%)] rounded-xl p-4 border border-[hsl(220_12%_20%)]">
                      <p className="text-xs font-semibold text-[hsl(48_100%_50%)] uppercase mb-2">Coordonnées bancaires</p>
                      {orderForm.payment_method === 'TMB' && (
                        <p className="text-white font-mono text-sm">{COMPANY.banks.tmb.account}</p>
                      )}
                      {orderForm.payment_method === 'EQUITY BCDC' && (
                        <p className="text-white font-mono text-sm">{COMPANY.banks.equity.account}</p>
                      )}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-white mb-1.5">Référence de paiement</label>
                    <input
                      type="text"
                      placeholder="Numéro de transaction ou reçu"
                      value={orderForm.payment_reference}
                      onChange={(e) => setOrderForm((prev) => ({ ...prev, payment_reference: e.target.value }))}
                      className="input-dark w-full"
                    />
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-xl text-sm">
                      <XCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold w-full inline-flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Clock className="w-5 h-5 animate-spin" />
                        Traitement…
                      </>
                    ) : (
                      'Confirmer la commande'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
