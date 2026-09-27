import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Phone, Mail, Menu, X, LayoutDashboard, Scale, Plus, 
  Shield, MapPin, Sparkles, MessageSquare, ChevronRight, Lock, Building, Home, Landmark
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Logo } from '../common/Logo';

interface NavbarProps {
  onSwitchToCRM?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSwitchToCRM }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { compareList } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  // Exact Requested Essential Menu Links Only
  const navLinks = [
    { name: 'Properties', path: '/search' },
    { name: 'Plots & Land', path: '/search?category=PLOT' },
    { name: 'Villas & Flats', path: '/search?category=VILLAS_FLATS' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <header 
      style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 100, 
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : '#FFFFFF', 
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: scrolled ? '0 10px 30px rgba(11, 17, 32, 0.08)' : '0 1px 4px rgba(0, 0, 0, 0.04)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.85)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      
      {/* 1. Micro Top Bar — DESKTOP ONLY */}
      <div 
        className="top-bar-desktop" 
        style={{ 
          backgroundColor: '#0B1120', 
          color: '#CBD5E1', 
          fontSize: '0.78rem', 
          padding: '0.45rem 0',
          borderBottom: '1px solid #1E2E4F'
        }}
      >
        <div className="container flex items-center justify-between">
          
          {/* Left: Live Status & RERA Credentials */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5" style={{ color: '#A7F3D0', fontWeight: 700 }}>
              <span className="pulse-dot"></span> 🌲 Dehradun Valley Market Live
            </span>
            <span style={{ color: '#334155' }}>•</span>
            <span className="flex items-center gap-1" style={{ color: '#DFB76C', fontWeight: 600 }}>
              <Shield size={13} /> Certified Real Estate Advisory
            </span>
          </div>

          {/* Right: Hotline & WhatsApp & Staff Login */}
          <div className="flex items-center gap-4">
            <a 
              href="tel:+918445190135" 
              className="flex items-center gap-1.5" 
              style={{ color: '#FFFFFF', fontWeight: 700 }}
            >
              <Phone size={13} style={{ color: '#DFB76C' }} /> +91 84451 90135
            </a>
            
            <span style={{ color: '#334155' }}>|</span>

            <a
              href="https://wa.me/918445190135?text=Hello%20A2%20Realtors%2C%20I%20am%20looking%20for%20property%20in%20Dehradun"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
              style={{ color: '#25D366', fontWeight: 700 }}
            >
              <MessageSquare size={13} /> WhatsApp Advisory
            </a>

            <span style={{ color: '#334155' }}>|</span>

            <button 
              onClick={onSwitchToCRM}
              style={{ 
                backgroundColor: 'rgba(223, 183, 108, 0.15)', 
                color: '#DFB76C', 
                border: '1px solid rgba(223, 183, 108, 0.35)', 
                padding: '0.2rem 0.65rem', 
                fontSize: '0.72rem', 
                borderRadius: 20, 
                cursor: 'pointer', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 5, 
                fontWeight: 700,
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#DFB76C';
                e.currentTarget.style.color = '#0B1120';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(223, 183, 108, 0.15)';
                e.currentTarget.style.color = '#DFB76C';
              }}
            >
              <Lock size={11} /> Staff CRM
            </button>
          </div>

        </div>
      </div>

      {/* 2. Main Navigation Bar Header */}
      <div className="container flex items-center justify-between navbar-container">
        
        {/* Recreated Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Logo size="md" />
        </Link>

        {/* Center Nav Links (ONLY REQUESTED 5 ITEMS, Desktop PC) */}
        <nav className="desktop-nav-links items-center gap-7">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path.includes('?') && location.search === link.path.split('?')[1]);
            return (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? '#386635' : '#1E293B',
                  padding: '0.5rem 0.95rem',
                  borderRadius: 10,
                  backgroundColor: isActive ? '#EBF4EC' : 'transparent',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#386635';
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#1E293B';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Suite (PC & Mobile) */}
        <div className="flex items-center gap-2.5">
          
          {/* Compare Counter (Desktop) */}
          {compareList.length > 0 && (
            <Link 
              to="/compare" 
              className="btn-outline-gray flex items-center gap-1.5 desktop-only"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem', borderRadius: 20 }}
            >
              <Scale size={14} style={{ color: '#386635' }} />
              <span>Compare</span>
              <span style={{ backgroundColor: '#386635', color: '#FFFFFF', fontSize: '0.68rem', fontWeight: 800, padding: '0.1rem 0.45rem', borderRadius: 10 }}>
                {compareList.length}
              </span>
            </Link>
          )}

          {/* Quick Call Icon (Mobile Only) */}
          <a
            href="tel:+918445190135"
            className="mobile-only-icon-btn"
            title="Call Hotline"
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              backgroundColor: '#EBF4EC',
              color: '#386635',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(56, 102, 53, 0.2)'
            }}
          >
            <Phone size={17} />
          </a>

          {/* Quick WhatsApp Icon (Mobile Only) */}
          <a
            href="https://wa.me/918445190135"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-only-icon-btn"
            title="WhatsApp Advisory"
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MessageSquare size={17} />
          </a>

          {/* Green List Property Button */}
          <Link 
            to="/sell" 
            className="btn-green btn-pill list-property-btn"
          >
            <Plus size={15} />
            <span className="list-property-label">List Property</span>
          </Link>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{ 
              width: 40, 
              height: 40, 
              borderRadius: 12, 
              backgroundColor: mobileMenuOpen ? '#EBF4EC' : '#F1F5F9', 
              color: mobileMenuOpen ? '#386635' : '#0F172A',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer',
              border: '1px solid',
              borderColor: mobileMenuOpen ? 'rgba(56, 102, 53, 0.3)' : '#E2E8F0'
            }}
            className="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* 3. Mobile Slide-In Essential Menu Drawer */}
      {mobileMenuOpen && (
        <div 
          className="mobile-drawer"
          style={{ 
            backgroundColor: '#FFFFFF', 
            borderTop: '1px solid #E2E8F0', 
            padding: '1.25rem 1.5rem 2rem 1.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.25rem', 
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2)',
            maxHeight: 'calc(100vh - 70px)',
            overflowY: 'auto'
          }}
        >
          

          {/* Requested 5 Menu Items Only */}
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94A3B8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Navigation Menu
            </div>

            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: '0.75rem 0.95rem',
                    borderRadius: 10,
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    color: location.pathname === link.path || (link.path.includes('?') && location.search === link.path.split('?')[1]) ? '#386635' : '#1E293B',
                    backgroundColor: location.pathname === link.path || (link.path.includes('?') && location.search === link.path.split('?')[1]) ? '#EBF4EC' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{link.name}</span>
                  <ChevronRight size={16} style={{ color: '#94A3B8' }} />
                </Link>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="flex gap-2">
              <a 
                href="tel:+918445190135" 
                className="btn-outline-gray flex-1 flex items-center justify-center gap-1.5" 
                style={{ padding: '0.75rem', borderRadius: 12, fontSize: '0.88rem', fontWeight: 700 }}
              >
                <Phone size={15} style={{ color: '#386635' }} /> Call Hotline
              </a>
              <a 
                href="https://wa.me/918445190135" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-whatsapp flex-1 flex items-center justify-center gap-1.5" 
                style={{ padding: '0.75rem', borderRadius: 12, fontSize: '0.88rem', fontWeight: 700 }}
              >
                <MessageSquare size={15} /> WhatsApp
              </a>
            </div>

            {/* Staff CRM Portal Login Access */}
            <button 
              onClick={() => { setMobileMenuOpen(false); onSwitchToCRM && onSwitchToCRM(); }} 
              className="btn-dark w-full flex items-center justify-center gap-2" 
              style={{ padding: '0.85rem', borderRadius: 12, fontSize: '0.92rem', width: '100%' }}
            >
              <Lock size={16} style={{ color: '#DFB76C' }} />
              <span>Staff CRM Portal</span>
            </button>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#94A3B8' }}>
            © {new Date().getFullYear()} A2 Realtors • Premium Real Estate Advisory
          </div>

        </div>
      )}

      {/* Scoped CSS for Header Alignment in Mobile & PC */}
      <style>{`
        .top-bar-desktop {
          display: block;
        }
        .navbar-container {
          height: 74px;
        }
        .desktop-nav-links {
          display: none;
        }
        .desktop-only {
          display: none;
        }
        .mobile-only-icon-btn {
          display: flex;
        }
        .list-property-btn {
          padding: 0.55rem 1.3rem;
          font-size: 0.86rem;
          white-space: nowrap;
        }
        .mobile-menu-trigger {
          display: flex;
        }

        /* Large Screens (PC / Desktop >= 1024px) */
        @media (min-width: 1024px) {
          .desktop-nav-links {
            display: flex !important;
          }
          .desktop-only {
            display: flex !important;
          }
          .mobile-only-icon-btn {
            display: none !important;
          }
          .mobile-menu-trigger {
            display: none !important;
          }
          .list-property-btn {
            padding: 0.55rem 1.4rem;
            font-size: 0.88rem;
          }
        }

        /* Small Screens (Mobile < 1024px) */
        @media (max-width: 1023px) {
          .top-bar-desktop {
            display: none !important;
          }
          .navbar-container {
            height: 64px;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .list-property-label {
            display: none;
          }
          .list-property-btn {
            padding: 0.5rem 0.75rem;
            font-size: 0.8rem;
            border-radius: 50px !important;
          }
        }

        @media (min-width: 480px) and (max-width: 1023px) {
          .list-property-label {
            display: inline;
          }
        }
      `}</style>

    </header>
  );
};
