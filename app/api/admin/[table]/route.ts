import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

const ALLOWED_TABLES = [
  'visa_requests',
  'vehicle_reservations',
  'domain_orders',
  'advertising_bookings',
];

const ALLOWED_STATUSES = ['pending', 'processing', 'completed', 'rejected'];

export async function GET(
  _req: Request,
  { params }: { params: { table: string } }
) {
  const { table } = params;
  if (!ALLOWED_TABLES.includes(table)) {
    return NextResponse.json({ error: 'Table introuvable' }, { status: 404 });
  }

  const { data, error } = await supabaseAdmin
    .from(table)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(
  req: Request,
  { params }: { params: { table: string } }
) {
  const { table } = params;
  if (!ALLOWED_TABLES.includes(table)) {
    return NextResponse.json({ error: 'Table introuvable' }, { status: 404 });
  }

  const { id, status } = await req.json();
  if (!id || !ALLOWED_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from(table).update({ status }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
