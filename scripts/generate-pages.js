#!/usr/bin/env node
/**
 * SEO Comparison Pages Generator for Verifly.email
 * Generates static HTML pages targeting long-tail keywords
 */

const fs = require('fs');
const path = require('path');

// Competitor data (update regularly)
const competitors = {
  zerobounce: {
    name: 'ZeroBounce',
    pricePerTenK: 75,
    pricePerHundredK: 390,
    pricePerMillion: 2250,
    accuracy: '99.3%',
    speed: 'Fast',
    freeCredits: 100,
    strengths: ['Enterprise features', 'Data enrichment', 'AI scoring'],
    weaknesses: ['Expensive for small teams', 'Complex pricing tiers']
  },
  neverbounce: {
    name: 'NeverBounce',
    pricePerTenK: 50,
    pricePerHundredK: 400,
    pricePerMillion: null,
    accuracy: '99.2%',
    speed: 'Very Fast',
    freeCredits: 10,
    strengths: ['Fast processing', 'Many integrations', 'Trusted brand'],
    weaknesses: ['Limited free tier', 'Higher cost than budget options']
  },
  bouncify: {
    name: 'Bouncify',
    pricePerTenK: 19,
    pricePerHundredK: 99,
    pricePerMillion: 479,
    accuracy: '98.2%',
    speed: 'Good',
    freeCredits: 100,
    strengths: ['Budget-friendly', 'Simple pricing'],
    weaknesses: ['Fewer features', 'Smaller brand']
  },
  emaillistverify: {
    name: 'EmailListVerify',
    pricePerTenK: 24,
    pricePerHundredK: 169,
    pricePerMillion: 599,
    accuracy: '97.8%',
    speed: 'Moderate',
    freeCredits: 100,
    strengths: ['Pay-as-you-go', 'No expiration'],
    weaknesses: ['Dated interface', 'Lower accuracy']
  },
  clearout: {
    name: 'Clearout',
    pricePerTenK: 58,
    pricePerHundredK: 350,
    pricePerMillion: 1100,
    accuracy: '98.7%',
    speed: 'Good',
    freeCredits: 100,
    strengths: ['Real-time API', 'Bulk processing'],
    weaknesses: ['Mid-range pricing']
  },
  bouncer: {
    name: 'Bouncer',
    pricePerTenK: 60,
    pricePerHundredK: 400,
    pricePerMillion: 2000,
    accuracy: '99.0%',
    speed: 'Fast',
    freeCredits: 100,
    strengths: ['GDPR compliant', 'Deliverability toolkit'],
    weaknesses: ['Premium pricing', 'Complex for basic needs']
  },
  vitamail: {
    name: 'VitaMail',
    pricePerTenK: 10,
    pricePerHundredK: 80,
    pricePerMillion: 450,
    accuracy: '98.5%',
    speed: 'Good',
    freeCredits: 100,
    strengths: ['AI features', 'Subject line generator'],
    weaknesses: ['Newer brand']
  }
};

// Verifly data (our product)
const verifly = {
  name: 'Verifly',
  pricePerTenK: 5,
  pricePerHundredK: 40,
  pricePerMillion: 200,
  accuracy: '99.1%',
  speed: 'Fast',
  freeCredits: 1000,
  strengths: ['Cheapest reliable option', 'Generous free tier', 'Developer-first API'],
  url: 'https://verifly.email'
};

// Page templates
const pages = [
  {
    slug: 'cheapest-email-verification-api',
    title: 'Cheapest Email Verification API in 2026 | Verifly',
    h1: 'The Cheapest Email Verification API That Actually Works',
    description: 'Compare prices of all major email verification APIs. Verifly offers the lowest price at $5/10k with 99%+ accuracy.',
    keywords: ['cheap email verification', 'email verification api pricing', 'budget email validator']
  },
  {
    slug: 'zerobounce-alternative',
    title: 'ZeroBounce Alternative - Save 93% | Verifly',
    h1: 'Looking for a Cheaper ZeroBounce Alternative?',
    description: 'Verifly offers the same 99%+ accuracy as ZeroBounce at $5/10k vs $75/10k. Save 93% on email verification.',
    competitor: 'zerobounce',
    keywords: ['zerobounce alternative', 'zerobounce cheaper', 'zerobounce vs']
  },
  {
    slug: 'neverbounce-alternative',
    title: 'NeverBounce Alternative - Save 90% | Verifly',
    h1: 'NeverBounce Too Expensive? Try Verifly',
    description: 'Switch from NeverBounce ($50/10k) to Verifly ($5/10k) and save 90%. Same accuracy, fraction of the cost.',
    competitor: 'neverbounce',
    keywords: ['neverbounce alternative', 'neverbounce cheaper', 'neverbounce pricing']
  },
  {
    slug: 'bouncify-alternative',
    title: 'Bouncify Alternative - Even Cheaper | Verifly',
    h1: 'Cheaper Than Bouncify - Yes, It Exists',
    description: 'Bouncify is $19/10k. Verifly is $5/10k. Same job, 74% less cost.',
    competitor: 'bouncify',
    keywords: ['bouncify alternative', 'bouncify cheaper']
  },
  {
    slug: 'email-verification-api-comparison-2026',
    title: 'Email Verification API Comparison 2026 - All Prices',
    h1: 'Email Verification API Comparison: Complete 2026 Guide',
    description: 'Side-by-side comparison of all major email verification APIs. Prices, accuracy, speed, and features.',
    keywords: ['email verification comparison', 'email api comparison', 'best email verification']
  },
  {
    slug: 'email-verification-under-10-dollars',
    title: 'Email Verification Under $10 for 10k Emails | Verifly',
    h1: 'Email Verification for Under $10 (10,000 Emails)',
    description: 'Only 2 services offer email verification under $10/10k: Verifly ($5) and VitaMail ($10). Compare them here.',
    keywords: ['cheap email verification', 'email verification under 10', 'budget email api']
  },
  {
    slug: 'free-email-verification-api',
    title: 'Free Email Verification API - 1000 Free Verifications | Verifly',
    h1: 'Free Email Verification API with 1000 Monthly Credits',
    description: 'Verifly offers 1000 free email verifications per month. Most generous free tier in the market.',
    keywords: ['free email verification', 'email verification free api', 'free email validator']
  },
  {
    slug: 'email-verification-for-startups',
    title: 'Email Verification for Startups - Budget-Friendly | Verifly',
    h1: 'Email Verification Built for Bootstrapped Startups',
    description: 'Stop overpaying for email verification. Verifly offers startup-friendly pricing at $5/10k.',
    keywords: ['email verification startups', 'startup email validation', 'indie hacker email']
  },
  {
    slug: 'email-verification-for-ai-agents',
    title: 'Email Verification API for AI Agents | Verifly',
    h1: 'Email Verification API Designed for AI Agents',
    description: 'Simple, fast, cheap email verification API perfect for AI agents and automation workflows.',
    keywords: ['ai agent email verification', 'automation email validation', 'bot email verification']
  },
  {
    slug: 'bulk-email-verification-cheap',
    title: 'Cheap Bulk Email Verification - $200 for 1 Million | Verifly',
    h1: 'Bulk Email Verification at Scale (Without the Enterprise Price)',
    description: 'Verify 1 million emails for just $200. Cheapest bulk email verification in the market.',
    keywords: ['bulk email verification', 'cheap bulk email validation', 'mass email verification']
  }
];

// Generate HTML page
function generatePage(pageConfig) {
  const comp = pageConfig.competitor ? competitors[pageConfig.competitor] : null;
  
  const savingsPercent = comp 
    ? Math.round((1 - verifly.pricePerTenK / comp.pricePerTenK) * 100)
    : null;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageConfig.title}</title>
  <meta name="description" content="${pageConfig.description}">
  <meta name="keywords" content="${pageConfig.keywords.join(', ')}">
  <link rel="canonical" href="https://verifly.email/${pageConfig.slug}">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { font-size: 2rem; margin-bottom: 1rem; color: #1a1a1a; }
    h2 { font-size: 1.5rem; margin: 2rem 0 1rem; color: #2a2a2a; }
    p { margin-bottom: 1rem; }
    .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 3rem 2rem; border-radius: 12px; margin-bottom: 2rem; }
    .hero h1 { color: white; }
    .price-highlight { font-size: 3rem; font-weight: bold; }
    .savings { background: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 6px; display: inline-block; margin: 1rem 0; }
    table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f9fafb; font-weight: 600; }
    tr:hover { background: #f3f4f6; }
    .winner { background: #dcfce7 !important; }
    .cta { background: #667eea; color: white; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; display: inline-block; margin: 1rem 0; font-weight: 600; }
    .cta:hover { background: #5a67d8; }
    code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
    pre { background: #1a1a1a; color: #e5e7eb; padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 1rem 0; }
    pre code { background: none; padding: 0; }
    footer { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 0.875rem; }
  </style>
</head>
<body>
  <div class="hero">
    <h1>${pageConfig.h1}</h1>
    <p>${pageConfig.description}</p>
    ${savingsPercent ? `<div class="savings">Save ${savingsPercent}% vs ${comp.name}</div>` : ''}
    <p class="price-highlight">$${verifly.pricePerTenK}/10k emails</p>
  </div>

  ${comp ? `
  <h2>${comp.name} vs Verifly: Head-to-Head</h2>
  <table>
    <tr>
      <th>Feature</th>
      <th>${comp.name}</th>
      <th>Verifly ✓</th>
    </tr>
    <tr>
      <td>Price (10k emails)</td>
      <td>$${comp.pricePerTenK}</td>
      <td class="winner">$${verifly.pricePerTenK}</td>
    </tr>
    <tr>
      <td>Price (100k emails)</td>
      <td>$${comp.pricePerHundredK}</td>
      <td class="winner">$${verifly.pricePerHundredK}</td>
    </tr>
    <tr>
      <td>Accuracy</td>
      <td>${comp.accuracy}</td>
      <td>${verifly.accuracy}</td>
    </tr>
    <tr>
      <td>Free Credits</td>
      <td>${comp.freeCredits}</td>
      <td class="winner">${verifly.freeCredits}</td>
    </tr>
    <tr>
      <td>Speed</td>
      <td>${comp.speed}</td>
      <td>${verifly.speed}</td>
    </tr>
  </table>
  ` : ''}

  <h2>All Providers Compared</h2>
  <table>
    <tr>
      <th>Provider</th>
      <th>10k Price</th>
      <th>100k Price</th>
      <th>Accuracy</th>
      <th>Free Tier</th>
    </tr>
    <tr class="winner">
      <td><strong>Verifly</strong></td>
      <td><strong>$${verifly.pricePerTenK}</strong></td>
      <td><strong>$${verifly.pricePerHundredK}</strong></td>
      <td>${verifly.accuracy}</td>
      <td>${verifly.freeCredits}</td>
    </tr>
    ${Object.values(competitors).map(c => `
    <tr>
      <td>${c.name}</td>
      <td>$${c.pricePerTenK}</td>
      <td>$${c.pricePerHundredK || 'N/A'}</td>
      <td>${c.accuracy}</td>
      <td>${c.freeCredits}</td>
    </tr>
    `).join('')}
  </table>

  <h2>Quick API Example</h2>
  <pre><code>curl "https://api.verifly.email/v1/verify?email=test@example.com" \\
  -H "Authorization: Bearer YOUR_API_KEY"</code></pre>

  <a href="${verifly.url}/signup" class="cta">Start Free → 1000 verifications/month</a>

  <h2>Why Developers Choose Verifly</h2>
  <ul>
    <li><strong>Cheapest reliable option</strong> — $5/10k vs $50-75 for competitors</li>
    <li><strong>Generous free tier</strong> — 1000 free verifications monthly</li>
    <li><strong>Simple API</strong> — One endpoint, clear responses</li>
    <li><strong>No BS pricing</strong> — Pay for what you use, no hidden fees</li>
  </ul>

  <footer>
    <p>© 2026 Verifly.email — The cheapest email verification API that doesn't suck.</p>
    <p>Last updated: ${new Date().toISOString().split('T')[0]}</p>
  </footer>
</body>
</html>`;
}

// Generate all pages
function generateAllPages() {
  const outputDir = path.join(__dirname, '../pages');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  for (const page of pages) {
    const html = generatePage(page);
    const filePath = path.join(outputDir, `${page.slug}.html`);
    fs.writeFileSync(filePath, html);
    console.log(`Generated: ${page.slug}.html`);
  }
  
  // Generate index
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Verifly - Email Verification Comparison Pages</title>
</head>
<body>
  <h1>Verifly SEO Pages</h1>
  <ul>
    ${pages.map(p => `<li><a href="${p.slug}.html">${p.title}</a></li>`).join('\n    ')}
  </ul>
</body>
</html>`;
  
  fs.writeFileSync(path.join(outputDir, 'index.html'), indexHtml);
  console.log('Generated: index.html');
  
  console.log(`\nTotal pages generated: ${pages.length + 1}`);
}

generateAllPages();
