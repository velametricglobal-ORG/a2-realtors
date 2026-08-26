import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Building2 } from 'lucide-react';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#0B0F19', color: '#9CA3AF', paddingTop: '4rem', paddingBottom: '2rem', borderTop: '1px solid #1F2937' }}>
      <div className="container">
        
        {/* 5 Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8" style={{ paddingBottom: '3rem', borderBottom: '1px solid #1F2937' }}>
          
          {/* Column 1: Brand & Contact Info */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <Logo size="md" lightMode={true} />
            </div>

            <div className="flex flex-col gap-3.5" style={{ fontSize: '0.85rem' }}>
              <div className="flex items-center gap-2">
                <Phone size={15} style={{ color: '#457B43' }} />
                <a href="tel:+918445190135" style={{ color: '#E5E7EB', fontWeight: 600 }}>+91 84451 90135</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} style={{ color: '#457B43' }} />
                <a href="mailto:info@a2realtors.in" style={{ color: '#E5E7EB' }}>info@a2realtors.in</a>
              </div>
              <div className="flex items-start gap-2" style={{ lineHeight: 1.5 }}>
                <MapPin size={16} style={{ color: '#457B43', marginTop: 2, flexShrink: 0 }} />
                <span>25 B, Inder Road, Dalanwala, Dehradun, Uttarakhand 248001</span>
              </div>
            </div>
          </div>

          {/* Column 2: Featured Houses */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Featured Houses</h4>
            <ul className="flex flex-col gap-2.5" style={{ fontSize: '0.85rem', listStyle: 'none' }}>
              <li><Link to="/search?category=INDEPENDENT_HOUSE">Villas</Link></li>
              <li><Link to="/commercial">Commercial</Link></li>
              <li><Link to="/search?category=FARMHOUSE">Farm Houses</Link></li>
              <li><Link to="/search?category=APARTMENT">Apartments</Link></li>
              <li><Link to="/search?category=APARTMENT">Penthouses</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Quick Links</h4>
            <ul className="flex flex-col gap-2.5" style={{ fontSize: '0.85rem', listStyle: 'none' }}>
              <li><Link to="/about">Strategy Services</Link></li>
              <li><Link to="/about">Management</Link></li>
              <li><Link to="/about">Privacy & Policy</Link></li>
              <li><Link to="/about">Sitemap</Link></li>
              <li><Link to="/about">Term & Conditions</Link></li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Support</h4>
            <ul className="flex flex-col gap-2.5" style={{ fontSize: '0.85rem', listStyle: 'none' }}>
              <li><Link to="/contact">Help Center</Link></li>
              <li><Link to="/contact">FAQs</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/contact">Ticket Support</Link></li>
              <li><Link to="/contact">Live Chat</Link></li>
            </ul>
          </div>

          {/* Column 5: Location Map Widget */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Location</h4>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #374151', height: 110, position: 'relative' }}>
              <iframe
                title="Office Location"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(60%) contrast(1.2)' }}
                loading="lazy"
                src="https://maps.google.com/maps?q=Dalanwala,Dehradun&t=&z=14&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4" style={{ paddingTop: '1.5rem', fontSize: '0.8rem' }}>
          <div>
            © {new Date().getFullYear()} A2 Realtors. All Rights Reserved. RERA Uttarakhand Registered Agency.
          </div>
          <div className="flex gap-4">
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Service</a>
            <span>•</span>
            <a href="#">Disclaimer</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
