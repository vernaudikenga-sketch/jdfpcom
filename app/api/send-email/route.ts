import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = 'JDFP Communication <noreply@jdfp-communication.com>';
const JDFP_EMAIL = 'contact@jdfp-communication.com';

function baseTemplate(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f1117;font-family:Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px">
    <div style="text-align:center;margin-bottom:32px">
      <div style="display:inline-block;background:#1a1f2e;border:1px solid #2a3040;border-radius:12px;padding:16px 24px">
        <span style="font-size:22px;font-weight:900;color:#fff;letter-spacing:2px">JDFP</span>
        <span style="display:block;font-size:10px;color:#fbbf24;font-weight:700;letter-spacing:4px;text-transform:uppercase">Communication</span>
      </div>
    </div>
    <div style="background:#141820;border:1px solid #1e2535;border-radius:16px;overflow:hidden">
      <div style="height:4px;background:linear-gradient(90deg,#fbbf24,#f59e0b)"></div>
      <div style="padding:32px">
        <h1 style="color:#fff;font-size:20px;margin:0 0 24px 0">${title}</h1>
        ${body}
      </div>
    </div>
    <p style="text-align:center;color:#4a5568;font-size:12px;margin-top:24px">
      JDFP-Communication · Av. Tombalbaye n° A19, Kinshasa/Gombe, RDC<br>
      +243 898 108 447 · contact@jdfp-communication.com
    </p>
  </div>
</body>
</html>`;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 12px;color:#9ca3af;font-size:13px;width:40%;border-bottom:1px solid #1e2535">${label}</td>
    <td style="padding:8px 12px;color:#fff;font-size:13px;border-bottom:1px solid #1e2535">${value}</td>
  </tr>`;
}

function table(rows: string) {
  return `<table style="width:100%;border-collapse:collapse;background:#0f1117;border-radius:8px;overflow:hidden;margin-bottom:20px">${rows}</table>`;
}

// ── VISA ──────────────────────────────────────────────────────────────────────

function visaClientHtml(d: Record<string, string>) {
  return baseTemplate(
    '✅ Votre demande de visa a bien été reçue',
    `<p style="color:#9ca3af;margin:0 0 20px 0">Bonjour <strong style="color:#fff">${d.full_name}</strong>,</p>
    <p style="color:#9ca3af;margin:0 0 20px 0">Nous avons bien reçu votre demande. Notre équipe vous contactera dans les <strong style="color:#fbbf24">48h ouvrables</strong>.</p>
    ${table(
      row('Nom complet', d.full_name) +
      row('N° Passeport', d.passport_number) +
      row('Type de visa', d.visa_type) +
      row('Destination', d.destination_country) +
      row('Date de voyage', d.travel_date)
    )}
    <p style="color:#9ca3af;font-size:13px">Pour toute question : <a href="https://wa.me/243898108447" style="color:#fbbf24">WhatsApp</a> ou répondez à cet email.</p>`
  );
}

function visaAlertHtml(d: Record<string, string>) {
  return baseTemplate(
    '🆕 Nouvelle demande de visa',
    table(
      row('Nom', d.full_name) +
      row('Passeport', d.passport_number) +
      row('Email', d.email) +
      row('Téléphone', d.phone) +
      row('Nationalité', d.nationality) +
      row('Type visa', d.visa_type) +
      row('Destination', d.destination_country) +
      row('Date voyage', d.travel_date) +
      row('Notes', d.notes || '—')
    )
  );
}

// ── VÉHICULE ──────────────────────────────────────────────────────────────────

function vehicleClientHtml(d: Record<string, string>) {
  return baseTemplate(
    '✅ Votre réservation véhicule est confirmée',
    `<p style="color:#9ca3af;margin:0 0 20px 0">Bonjour <strong style="color:#fff">${d.client_name}</strong>,</p>
    <p style="color:#9ca3af;margin:0 0 20px 0">Votre demande de location est enregistrée. Notre équipe vous confirmera la disponibilité sous <strong style="color:#fbbf24">24h</strong>.</p>
    ${table(
      row('Véhicule', d.vehicle_name || '—') +
      row('Prise en charge', d.pickup_date) +
      row('Retour', d.return_date) +
      row('Lieu de départ', d.pickup_location) +
      row('Lieu de retour', d.dropoff_location) +
      row('Transfert aéroport', d.airport_pickup === 'true' ? 'Oui' : 'Non')
    )}
    <p style="color:#9ca3af;font-size:13px">Pour toute question : <a href="https://wa.me/243898108447" style="color:#fbbf24">WhatsApp</a></p>`
  );
}

function vehicleAlertHtml(d: Record<string, string>) {
  return baseTemplate(
    '🚗 Nouvelle demande de location',
    table(
      row('Client', d.client_name) +
      row('Email', d.client_email) +
      row('Téléphone', d.client_phone) +
      row('Véhicule', d.vehicle_name || '—') +
      row('Prise en charge', d.pickup_date) +
      row('Retour', d.return_date) +
      row('Départ', d.pickup_location) +
      row('Retour lieu', d.dropoff_location) +
      row('Vol', d.flight_number || '—') +
      row('Aéroport', d.airport_pickup === 'true' ? 'Oui' : 'Non') +
      row('Notes', d.notes || '—')
    )
  );
}

// ── DOMAINE ───────────────────────────────────────────────────────────────────

function domainClientHtml(d: Record<string, string>) {
  return baseTemplate(
    '✅ Votre commande a bien été reçue',
    `<p style="color:#9ca3af;margin:0 0 20px 0">Bonjour <strong style="color:#fff">${d.client_name}</strong>,</p>
    <p style="color:#9ca3af;margin:0 0 20px 0">Votre commande est enregistrée. Nous la traiterons dans les <strong style="color:#fbbf24">24h ouvrables</strong> après vérification du paiement.</p>
    ${table(
      row('Produit', d.product_name) +
      row('Domaine', d.domain_name || '—') +
      row('Paiement', d.payment_method) +
      row('Référence', d.payment_reference || '—')
    )}
    <p style="color:#9ca3af;font-size:13px">Pour toute question : <a href="https://wa.me/243898108447" style="color:#fbbf24">WhatsApp</a></p>`
  );
}

function domainAlertHtml(d: Record<string, string>) {
  return baseTemplate(
    '🌐 Nouvelle commande domaine/hosting',
    table(
      row('Client', d.client_name) +
      row('Email', d.client_email) +
      row('Téléphone', d.client_phone) +
      row('Produit', d.product_name) +
      row('Domaine', d.domain_name || '—') +
      row('Paiement', d.payment_method) +
      row('Référence', d.payment_reference || '—')
    )
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────

function contactClientHtml(d: Record<string, string>) {
  return baseTemplate(
    '✅ Votre message a bien été reçu',
    `<p style="color:#9ca3af;margin:0 0 20px 0">Bonjour <strong style="color:#fff">${d.full_name}</strong>,</p>
    <p style="color:#9ca3af;margin:0 0 20px 0">Nous avons bien reçu votre message et vous répondrons dans les <strong style="color:#fbbf24">48 heures ouvrables</strong>.</p>
    ${table(
      row('Sujet', d.subject || '—') +
      row('Message', d.message)
    )}
    <p style="color:#9ca3af;font-size:13px">Pour une réponse immédiate : <a href="https://wa.me/243898108447" style="color:#fbbf24">WhatsApp</a></p>`
  );
}

function contactAlertHtml(d: Record<string, string>) {
  return baseTemplate(
    '📩 Nouveau message de contact',
    table(
      row('Nom', d.full_name) +
      row('Email', d.email) +
      row('Téléphone', d.phone || '—') +
      row('Sujet', d.subject || '—') +
      row('Message', d.message)
    )
  );
}

// ── HANDLER ───────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  const { type, data } = await req.json();
  const d = data as Record<string, string>;

  let clientEmail: string;
  let clientSubject: string;
  let clientHtml: string;
  let alertSubject: string;
  let alertHtml: string;

  if (type === 'visa') {
    clientEmail = d.email;
    clientSubject = 'JDFP – Votre demande de visa est enregistrée';
    clientHtml = visaClientHtml(d);
    alertSubject = `[VISA] Nouvelle demande – ${d.full_name}`;
    alertHtml = visaAlertHtml(d);
  } else if (type === 'vehicle') {
    clientEmail = d.client_email;
    clientSubject = 'JDFP – Réservation véhicule confirmée';
    clientHtml = vehicleClientHtml(d);
    alertSubject = `[VÉHICULE] Nouvelle réservation – ${d.client_name}`;
    alertHtml = vehicleAlertHtml(d);
  } else if (type === 'domain') {
    clientEmail = d.client_email;
    clientSubject = 'JDFP – Votre commande domaine est enregistrée';
    clientHtml = domainClientHtml(d);
    alertSubject = `[DOMAINE] Nouvelle commande – ${d.client_name}`;
    alertHtml = domainAlertHtml(d);
  } else if (type === 'contact') {
    clientEmail = d.email;
    clientSubject = 'JDFP – Votre message a bien été reçu';
    clientHtml = contactClientHtml(d);
    alertSubject = `[CONTACT] ${d.subject || 'Nouveau message'} – ${d.full_name}`;
    alertHtml = contactAlertHtml(d);
  } else {
    return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
  }

  await Promise.all([
    resend.emails.send({ from: FROM, to: clientEmail, subject: clientSubject, html: clientHtml }),
    resend.emails.send({ from: FROM, to: JDFP_EMAIL, subject: alertSubject, html: alertHtml }),
  ]);

  return NextResponse.json({ ok: true });
}
