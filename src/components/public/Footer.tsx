import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Building2, ShieldCheck, Award, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  return (
    <footer style={{ backgroundColor: '#0B1120', color: '#94A3B8', paddingTop: '5rem', paddingBottom: '2.5rem', borderTop: '1px solid #1E2E4F' }}>
      <div className="container">
        
        {/* Newsletter & Brand CTA Strip */}
        <div 
          className="flex flex-wrap items-center justify-between gap-6"
          style={{
            backgroundColor: '#111A2E',
            border: '1px solid #1E2E4F',
            borderRadius: 20,
            padding: '2rem 2.5rem',
            marginBottom: '4rem'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF' }}>
              Stay Ahead of Dehradun Property Trends
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#94A3B8', marginTop: 4 }}>
              Receive off-market luxury listings, legal updates, and new project launch invites directly in your inbox.
            </p>
          </div>

          <div style={{ maxWidth: 420, width: '100%' }}>
            {newsletterSuccess ? (
              <div className="flex items-center gap-2" style={{ color: '#A7F3D0', backgroundColor: 'rgba(16,185,129,0.15)', padding: '0.75rem 1.25rem', borderRadius: 12, border: '1px solid rgba(16,185,129,0.3)' }}>
                <CheckCircle2 size={18} />
                <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>Thank you for subscribing to A2 Intelligence!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    flexGrow: 1,
                    backgroundColor: '#0B1120',
                    border: '1px solid #1E2E4F',
                    borderRadius: 12,
                    padding: '0.75rem 1rem',
                    color: '#FFFFFF',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="btn-green"
                  style={{ borderRadius: 12, padding: '0.75rem 1.25rem', whiteSpace: 'nowrap' }}
                >
                  <span>Subscribe</span>
                  <ArrowRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 5 Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10" style={{ paddingBottom: '3.5rem', borderBottom: '1px solid #1E2E4F' }}>
          
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-2">
            <div style={{ marginBottom: '1.25rem' }}>
              <Logo size="md" lightMode={true} />
            </div>

            <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: 360 }}>
              Dehradun’s premier real estate advisory firm specializing in verified luxury residential bungalows, mountain-facing apartments, freehold land plots, and turnkey architectural construction.
            </p>

            <div className="flex flex-col gap-3" style={{ fontSize: '0.88rem' }}>
              <div className="flex items-center gap-2.5">
                <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(56,102,53,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A7F3D0' }}>
                  <Phone size={15} />
                </div>
                <a href="tel:+918445190135" style={{ color: '#FFFFFF', fontWeight: 700 }}>+91 84451 90135</a>
              </div>

              <div className="flex items-center gap-2.5">
                <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(56,102,53,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A7F3D0' }}>
                  <Mail size={15} />
                </div>
                <a href="mailto:info@a2realtors.in" style={{ color: '#E2E8F0' }}>info@a2realtors.in</a>
              </div>

              <div className="flex items-start gap-2.5" style={{ lineHeight: 1.5 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(56,102,53,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A7F3D0', flexShrink: 0, marginTop: 2 }}>
                  <MapPin size={15} />
                </div>
                <span style={{ color: '#E2E8F0' }}>25 B, Inder Road, Dalanwala, Dehradun, Uttarakhand 248001</span>
              </div>
            </div>
          </div>

          {/* Column 2: Properties */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              Properties
            </h4>
            <ul className="flex flex-col gap-2.5" style={{ fontSize: '0.88rem', listStyle: 'none' }}>
              <li><Link to="/search?category=INDEPENDENT_HOUSE" style={{ color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#DFB76C'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Luxury Villas & Kothis</Link></li>
              <li><Link to="/search?category=APARTMENT" style={{ color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#DFB76C'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Flats & Penthouses</Link></li>
              <li><Link to="/search?category=PLOT" style={{ color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#DFB76C'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Residential Plots</Link></li>
              <li><Link to="/search?category=COMMERCIAL" style={{ color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#DFB76C'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Commercial Spaces</Link></li>
              <li><Link to="/search?category=FARMHOUSE" style={{ color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#DFB76C'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Hill-View Farmhouses</Link></li>
              <li><Link to="/sell" style={{ color: '#A7F3D0', fontWeight: 700 }}>+ List Your Property</Link></li>
            </ul>
          </div>

          {/* Column 3: Prime Localities */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              Prime Localities
            </h4>
            <ul className="flex flex-col gap-2.5" style={{ fontSize: '0.88rem', listStyle: 'none' }}>
              <li><Link to="/search?locality=Rajpur%20Road" style={{ color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#DFB76C'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Rajpur Road</Link></li>
              <li><Link to="/search?locality=Dalanwala" style={{ color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#DFB76C'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Dalanwala Corridor</Link></li>
              <li><Link to="/search?locality=Sahastradhara%20Road" style={{ color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#DFB76C'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Sahastradhara Road</Link></li>
              <li><Link to="/search?locality=Mussoorie%20Road" style={{ color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#DFB76C'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Mussoorie Foothills</Link></li>
              <li><Link to="/search?locality=GMS%20Road" style={{ color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#DFB76C'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>GMS Road & Ballupur</Link></li>
              <li><Link to="/search?locality=Chakrata%20Road" style={{ color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#DFB76C'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Chakrata Road Corridor</Link></li>
            </ul>
          </div>

          {/* Column 4: Office Location & Credentials */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              Head Office
            </h4>
            
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid #1E2E4F', height: 120, position: 'relative', marginBottom: '0.75rem' }}>
              <iframe
                title="Office Location"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(60%) contrast(1.2)' }}
                loading="lazy"
                src="https://maps.google.com/maps?q=Dalanwala,Dehradun&t=&z=14&ie=UTF8&iwloc=&output=embed"
              />
            </div>

            <div style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Award size={14} style={{ color: '#DFB76C' }} /> Verified <strong>Uttarakhand Property Partner</strong>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Compliance Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4" style={{ paddingTop: '2rem', fontSize: '0.82rem' }}>
          <div>
            © {new Date().getFullYear()} A2 Realtors. All rights reserved. Registered Real Estate Advisory under Real Estate (Regulation and Development) Act, Uttarakhand.
          </div>
          <div className="flex gap-4" style={{ color: '#64748B' }}>
            <Link to="/about" style={{ color: '#94A3B8' }}>Privacy Policy</Link>
            <span>•</span>
            <Link to="/about" style={{ color: '#94A3B8' }}>Terms of Advisory</Link>
            <span>•</span>
            <Link to="/about" style={{ color: '#94A3B8' }}>RERA Disclaimer</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
