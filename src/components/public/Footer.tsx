import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Building2, ShieldCheck, Award, MessageSquare, 
  ArrowRight, CheckCircle2, Star, Calculator, Hammer, Scale
} from 'lucide-react';
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
            padding: '2.25rem 2.5rem',
            marginBottom: '4rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#DFB76C', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
              <Star size={13} fill="#DFB76C" /> A2 Private Intelligence Briefing
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
              Stay Ahead of Dehradun Property Trends
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#94A3B8', marginTop: 4, maxWidth: 580 }}>
              Receive off-market luxury listings, MDDA zoning updates, and new project launch invites directly in your inbox.
            </p>
          </div>

          <div style={{ maxWidth: 440, width: '100%' }}>
            {newsletterSuccess ? (
              <div className="flex items-center gap-2" style={{ color: '#A7F3D0', backgroundColor: 'rgba(16,185,129,0.15)', padding: '0.85rem 1.25rem', borderRadius: 12, border: '1px solid rgba(16,185,129,0.3)' }}>
                <CheckCircle2 size={18} />
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Thank you for subscribing to A2 Intelligence!</span>
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
                  style={{ borderRadius: 12, padding: '0.75rem 1.4rem', whiteSpace: 'nowrap', fontWeight: 700 }}
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

            <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.65, marginBottom: '1.5rem', maxWidth: 360 }}>
              Dehradun’s premier real estate advisory firm specializing in verified luxury residential bungalows, mountain-facing apartments, freehold land plots, and turnkey architectural construction.
            </p>

            {/* Google Rating Trust Badge */}
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 10, 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                padding: '0.5rem 1rem', 
                borderRadius: 12, 
                marginBottom: '1.5rem' 
              }}
            >
              <div className="flex gap-0.5" style={{ color: '#DFB76C' }}>
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={13} fill="#DFB76C" />)}
              </div>
              <span style={{ fontSize: '0.82rem', color: '#FFFFFF', fontWeight: 700 }}>
                4.9 / 5.0 Rating (450+ Dehradun Clients)
              </span>
            </div>

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

          {/* Column 3: Prime Corridors */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              Prime Corridors
            </h4>
            <ul className="flex flex-col gap-2.5" style={{ fontSize: '0.88rem', listStyle: 'none' }}>
              <li><Link to="/search?locality=Rajpur%20Road" style={{ color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#DFB76C'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Rajpur Road Corridor</Link></li>
              <li><Link to="/search?locality=Dalanwala" style={{ color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#DFB76C'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Dalanwala Colonial Sector</Link></li>
              <li><Link to="/search?locality=Sahastradhara%20Road" style={{ color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#DFB76C'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Sahastradhara IT Highway</Link></li>
              <li><Link to="/search?locality=Mussoorie%20Road" style={{ color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#DFB76C'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Mussoorie Foothills</Link></li>
              <li><Link to="/search?locality=GMS%20Road" style={{ color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#DFB76C'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>GMS Road & Ballupur</Link></li>
              <li><Link to="/search?locality=Chakrata%20Road" style={{ color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#DFB76C'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Chakrata Road</Link></li>
            </ul>
          </div>

          {/* Column 4: Architectural Services & Tools */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              Services & Tools
            </h4>
            <ul className="flex flex-col gap-2.5" style={{ fontSize: '0.88rem', listStyle: 'none', marginBottom: '1.25rem' }}>
              <li><Link to="/construction" style={{ color: '#DFB76C', fontWeight: 600 }}>Turnkey Villa Construction</Link></li>
              <li><Link to="/compare" style={{ color: '#94A3B8' }}>Property Comparison Matrix</Link></li>
              <li><Link to="/about" style={{ color: '#94A3B8' }}>Legal Verification Desk</Link></li>
              <li><Link to="/insights" style={{ color: '#94A3B8' }}>Market Intelligence Reports</Link></li>
              <li><Link to="/contact" style={{ color: '#94A3B8' }}>Book Chauffeured Visit</Link></li>
            </ul>

            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid #1E2E4F', height: 100, position: 'relative' }}>
              <iframe
                title="Office Location"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(60%) contrast(1.2)' }}
                loading="lazy"
                src="https://maps.google.com/maps?q=25+B+Inder+Road+Dalanwala+Dehradun&t=&z=14&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Compliance Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4" style={{ paddingTop: '2rem', fontSize: '0.82rem' }}>
          <div>
            © {new Date().getFullYear()} A2 Realtors. All rights reserved. Uttarakhand RERA Certified Advisory Firm • 25 B, Inder Road, Dalanwala, Dehradun.
          </div>
          <div className="flex gap-4" style={{ color: '#64748B' }}>
            <Link to="/about" style={{ color: '#94A3B8' }}>Privacy Policy</Link>
            <span>•</span>
            <Link to="/about" style={{ color: '#94A3B8' }}>Terms of Advisory</Link>
            <span>•</span>
            <Link to="/about" style={{ color: '#94A3B8' }}>100% Legal Title Clearance Guarantee</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
