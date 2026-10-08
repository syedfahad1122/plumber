/**
 * CLOUDFLARE WORKER DEPLOYMENT SCRIPT (worker.js)
 * Florida Water Damage & Emergency Plumbing Restoration
 * 
 * Supports Clean URL Routing for Subpages:
 * / -> index.html
 * /services -> services.html
 * /services/burst-pipe-repair -> burst-pipe-repair.html
 * /services/water-damage-restoration -> water-damage-restoration.html
 * /service-areas -> service-areas.html
 * /calculator -> calculator.html
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  let path = url.pathname;

  // Clean Route Mapping
  const routeMap = {
    '/': '/index.html',
    '/services': '/services.html',
    '/services/burst-pipe-repair': '/burst-pipe-repair.html',
    '/services/water-damage-restoration': '/water-damage-restoration.html',
    '/service-areas': '/service-areas.html',
    '/calculator': '/calculator.html'
  };

  if (routeMap[path]) {
    url.pathname = routeMap[path];
  }

  // Security & Performance Headers
  const securityHeaders = {
    'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https:;",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Cache-Control': 'public, max-age=3600, s-maxage=86400'
  };

  try {
    // Cloudflare Assets Fetcher
    if (typeof env !== 'undefined' && env.ASSETS) {
      return await env.ASSETS.fetch(new Request(url.toString(), request));
    }

    const response = await fetch(url.toString(), request);
    const newHeaders = new Headers(response.headers);

    Object.keys(securityHeaders).forEach(header => {
      newHeaders.set(header, securityHeaders[header]);
    });

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });

  } catch (err) {
    return new Response(`Cloudflare Worker Edge Error: ${err.message}`, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
