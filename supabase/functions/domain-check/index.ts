import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const TLD_PRICES: Record<string, { price: number; sale?: number; popular?: boolean }> = {
  ".cd": { price: 35, popular: true },
  ".com": { price: 15, sale: 12 },
  ".net": { price: 14 },
  ".org": { price: 12, sale: 9 },
  ".africa": { price: 28, popular: true },
  ".io": { price: 45 },
  ".tech": { price: 20, sale: 8 },
  ".online": { price: 10, sale: 3 },
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const name = url.searchParams.get("name")?.toLowerCase().trim();

    if (!name) {
      return new Response(JSON.stringify({ error: "name parameter required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const cleanName = name.replace(/\.[^.]+$/, "").replace(/[^a-z0-9-]/g, "-").replace(/^-+|-+$/g, "");

    if (!cleanName || cleanName.length < 2) {
      return new Response(JSON.stringify({ error: "Invalid domain name" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const tlds = Object.keys(TLD_PRICES);

    const results = await Promise.all(
      tlds.map(async (tld) => {
        const domain = `${cleanName}${tld}`;
        try {
          const res = await fetch(
            `https://dns.google/resolve?name=${domain}&type=NS`,
            {
              headers: { Accept: "application/dns-json" },
              signal: AbortSignal.timeout(4000),
            }
          );
          const data = await res.json();
          const nxdomain = data.Status === 3;
          const hasRecords = data.Answer && data.Answer.length > 0;
          const available = nxdomain || (!hasRecords && data.Status === 0);
          return {
            tld,
            domain,
            available,
            price: TLD_PRICES[tld].price,
            sale: TLD_PRICES[tld].sale ?? null,
            popular: TLD_PRICES[tld].popular ?? false,
          };
        } catch {
          return {
            tld,
            domain,
            available: null,
            price: TLD_PRICES[tld].price,
            sale: TLD_PRICES[tld].sale ?? null,
            popular: TLD_PRICES[tld].popular ?? false,
          };
        }
      })
    );

    return new Response(JSON.stringify({ name: cleanName, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
