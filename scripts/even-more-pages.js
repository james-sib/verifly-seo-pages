#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const evenMorePages = [
  { slug: 'email-verification-api-free-tier', title: 'Email Verification API with Free Tier - 1000 Free/Month', description: 'Get 1000 free email verifications every month. No credit card required.' },
  { slug: 'clearout-alternative', title: 'Clearout Alternative - Save 91% | Verifly', description: 'Switch from Clearout ($58/10k) to Verifly ($5/10k). Same features, 91% cheaper.' },
  { slug: 'kickbox-alternative', title: 'Kickbox Alternative - Save 94% | Verifly', description: 'Kickbox charges $80/10k. Verifly is $5/10k. Same accuracy, fraction of the cost.' },
  { slug: 'bouncer-alternative', title: 'Bouncer Alternative - Save 92% | Verifly', description: 'Looking for a cheaper Bouncer alternative? Verifly offers $5/10k vs $60/10k.' },
  { slug: 'email-validation-api-for-developers', title: 'Email Validation API for Developers - Simple REST API', description: 'Developer-friendly email validation API. Clean docs, simple endpoints, affordable pricing.' },
  { slug: 'react-email-verification', title: 'React Email Verification - API Integration Guide', description: 'How to add email verification to your React app. Simple API integration with code examples.' },
  { slug: 'email-verification-webhook', title: 'Email Verification Webhook API | Verifly', description: 'Real-time email verification with webhooks. Get instant results delivered to your endpoint.' },
  { slug: 'email-bounce-checker-api', title: 'Email Bounce Checker API - Prevent Bounces', description: 'Check emails before sending to prevent bounces. Simple API, affordable pricing.' },
  { slug: 'role-email-detection-api', title: 'Role Email Detection API - Filter info@ admin@ emails', description: 'Detect role-based emails like info@, admin@, support@. Improve your list quality.' },
  { slug: 'catch-all-email-detection', title: 'Catch-All Email Detection API | Verifly', description: 'Identify catch-all domains that accept all emails. Protect your sender reputation.' }
];

function generatePage(p) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.title}</title>
  <meta name="description" content="${p.description}">
  <link rel="canonical" href="https://verifly.email/${p.slug}">
  <style>body{font-family:-apple-system,sans-serif;line-height:1.6;max-width:800px;margin:0 auto;padding:20px}h1{color:#1a1a1a}.price{font-size:2.5rem;color:#667eea;font-weight:bold}.cta{background:#667eea;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin:1rem 0}table{width:100%;border-collapse:collapse}th,td{padding:10px;border-bottom:1px solid #e5e7eb}th{background:#f9fafb}code{background:#f3f4f6;padding:2px 6px;border-radius:4px}</style>
</head>
<body>
  <h1>${p.title.split(' | ')[0]}</h1>
  <p>${p.description}</p>
  <p class="price">$5/10k emails</p>
  <a href="https://verifly.email/signup" class="cta">Start Free → 1000/month</a>
  
  <h2>Quick Example</h2>
  <pre><code>curl "https://api.verifly.email/v1/verify?email=test@example.com"</code></pre>
  
  <h2>Pricing Comparison</h2>
  <table>
    <tr><th>Provider</th><th>10k Price</th></tr>
    <tr style="background:#dcfce7"><td><strong>Verifly</strong></td><td><strong>$5</strong></td></tr>
    <tr><td>VitaMail</td><td>$10</td></tr>
    <tr><td>Bouncify</td><td>$19</td></tr>
    <tr><td>NeverBounce</td><td>$50</td></tr>
    <tr><td>ZeroBounce</td><td>$75</td></tr>
  </table>
  
  <p><a href="https://verifly.email">← Back to Verifly.email</a></p>
</body>
</html>`;
}

const outputDir = __dirname.replace('/scripts', '');
evenMorePages.forEach(p => {
  fs.writeFileSync(path.join(outputDir, p.slug + '.html'), generatePage(p));
  console.log('Generated:', p.slug + '.html');
});
console.log('\nGenerated', evenMorePages.length, 'more pages');
