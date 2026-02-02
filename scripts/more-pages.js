#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const morePages = [
  {
    slug: 'email-list-cleaning-service',
    title: 'Email List Cleaning Service - Cheapest Option | Verifly',
    h1: 'Clean Your Email List Without Breaking the Bank',
    description: 'Professional email list cleaning starting at $5/10k emails. Remove bounces, disposables, and invalid addresses.',
    keywords: ['email list cleaning', 'clean email list', 'email list cleaner']
  },
  {
    slug: 'verify-email-address-api',
    title: 'Verify Email Address API - Simple & Cheap | Verifly',
    h1: 'Simple API to Verify Email Addresses',
    description: 'REST API to verify email addresses in real-time. $5/10k verifications. 1000 free monthly.',
    keywords: ['verify email api', 'email address verification api', 'check email api']
  },
  {
    slug: 'email-validation-service-comparison',
    title: 'Email Validation Service Comparison 2026 - Full Pricing',
    h1: 'Email Validation Services: Complete Price Comparison',
    description: 'Compare all major email validation services by price, accuracy, and features. Updated for 2026.',
    keywords: ['email validation comparison', 'email validation service', 'best email validator']
  },
  {
    slug: 'disposable-email-checker-api',
    title: 'Disposable Email Checker API - Detect Temp Emails | Verifly',
    h1: 'Detect Disposable & Temporary Emails',
    description: 'API to detect disposable email addresses like Mailinator, Guerrilla Mail, etc. Protect your signups.',
    keywords: ['disposable email checker', 'temp email detector', 'fake email detection']
  },
  {
    slug: 'smtp-email-verification',
    title: 'SMTP Email Verification API - Real-Time Validation',
    h1: 'Real-Time SMTP Email Verification',
    description: 'Verify emails via SMTP handshake in real-time. Know if an email exists before you send.',
    keywords: ['smtp verification', 'smtp email check', 'real-time email verification']
  },
  {
    slug: 'mailchimp-list-cleaning-alternative',
    title: 'Mailchimp List Cleaning - Cheaper Alternative | Verifly',
    h1: 'Clean Your Mailchimp List for Less',
    description: 'Export your Mailchimp list, clean it with Verifly ($5/10k), re-import. Save money on email credits.',
    keywords: ['mailchimp list cleaning', 'clean mailchimp list', 'mailchimp email verification']
  },
  {
    slug: 'sendgrid-email-verification-alternative',
    title: 'SendGrid Email Validation Alternative - 80% Cheaper',
    h1: 'Cheaper Alternative to SendGrid Email Validation',
    description: 'SendGrid charges $0.01/email for validation. Verifly is $0.0005/email. Same accuracy, 95% savings.',
    keywords: ['sendgrid validation alternative', 'sendgrid email verification', 'cheaper than sendgrid']
  },
  {
    slug: 'python-email-verification-api',
    title: 'Python Email Verification API - Simple Integration',
    h1: 'Email Verification API for Python Developers',
    description: 'Easy Python integration for email verification. pip install requests and go. Code examples included.',
    keywords: ['python email verification', 'email verification python', 'verify email python']
  },
  {
    slug: 'nodejs-email-verification',
    title: 'Node.js Email Verification API - npm Package Available',
    h1: 'Email Verification for Node.js Applications',
    description: 'Verify emails in your Node.js app. Simple REST API or use our CLI tool. npm install verifly-cli.',
    keywords: ['nodejs email verification', 'node email validation', 'javascript email verify']
  },
  {
    slug: 'bulk-email-checker',
    title: 'Bulk Email Checker - Verify Millions for $200',
    h1: 'Bulk Email Checker for Large Lists',
    description: 'Check millions of emails at scale. Upload CSV, get results. $200/million emails.',
    keywords: ['bulk email checker', 'mass email verification', 'large list email validation']
  }
];

function generateSimplePage(page) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="keywords" content="${page.keywords.join(', ')}">
  <link rel="canonical" href="https://verifly.email/${page.slug}">
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;max-width:800px;margin:0 auto;padding:20px;color:#333}
    h1{color:#1a1a1a;margin-bottom:1rem}
    .price{font-size:2.5rem;color:#667eea;font-weight:bold}
    .cta{background:#667eea;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin:1rem 0}
    table{width:100%;border-collapse:collapse;margin:1.5rem 0}
    th,td{padding:10px;text-align:left;border-bottom:1px solid #e5e7eb}
    th{background:#f9fafb}
    code{background:#f3f4f6;padding:2px 6px;border-radius:4px}
    pre{background:#1a1a1a;color:#e5e7eb;padding:1rem;border-radius:8px;overflow-x:auto}
  </style>
</head>
<body>
  <h1>${page.h1}</h1>
  <p>${page.description}</p>
  <p class="price">$5/10k emails</p>
  <p>1000 free verifications every month. No credit card required.</p>
  
  <a href="https://verifly.email/signup" class="cta">Start Free →</a>
  
  <h2>Quick API Example</h2>
  <pre><code>curl "https://api.verifly.email/v1/verify?email=test@example.com" \\
  -H "Authorization: Bearer YOUR_API_KEY"</code></pre>
  
  <h2>Pricing Comparison</h2>
  <table>
    <tr><th>Provider</th><th>10k Price</th><th>Free Tier</th></tr>
    <tr style="background:#dcfce7"><td><strong>Verifly</strong></td><td><strong>$5</strong></td><td>1000/mo</td></tr>
    <tr><td>VitaMail</td><td>$10</td><td>100</td></tr>
    <tr><td>Bouncify</td><td>$19</td><td>100</td></tr>
    <tr><td>NeverBounce</td><td>$50</td><td>10</td></tr>
    <tr><td>ZeroBounce</td><td>$75</td><td>100</td></tr>
  </table>
  
  <p><a href="https://verifly.email">← Back to Verifly.email</a></p>
</body>
</html>`;
}

const outputDir = path.join(__dirname, '../pages');
for (const page of morePages) {
  const html = generateSimplePage(page);
  fs.writeFileSync(path.join(outputDir, `${page.slug}.html`), html);
  console.log(`Generated: ${page.slug}.html`);
}
console.log(`\nGenerated ${morePages.length} additional pages`);
