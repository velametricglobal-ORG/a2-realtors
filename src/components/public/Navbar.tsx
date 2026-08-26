import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Menu, X, LayoutDashboard, Scale, Plus } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Logo } from '../common/Logo';

interface NavbarProps {
  onSwitchToCRM?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSwitchToCRM }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { compareList } = useStore();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'All Listings', path: '/search' },
    { name: 'Service', path: '/construction' },
    { name: 'Blog', path: '/insights' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#FFFFFF', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      
      {/* 1. Micro Top Bar — DESKTOP ONLY */}
      <div className="top-bar-desktop" style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #EEEEEE', fontSize: '0.78rem', color: '#666666', padding: '0.35rem 0' }}>
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="mailto:info@a2realtors.in" className="flex items-center gap-1" style={{ color: '#386635', fontWeight: 600 }}>
              <Mail size={12} /> info@a2realtors.in
            </a>
            <span style={{ color: '#DDDDDD' }}>|</span>
            <a href="tel:+918445190135" className="flex items-center gap-1" style={{ color: '#386635', fontWeight: 600 }}>
              <Phone size={12} /> +91 84451 90135
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a href="#" style={{ color: '#666666' }} title="Facebook">
                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" style={{ color: '#666666' }} title="Twitter">
                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/></svg>
              </a>
              <a href="#" style={{ color: '#666666' }} title="Instagram">
                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
            <span style={{ color: '#DDDDDD' }}>|</span>
            <button 
              onClick={onSwitchToCRM}
              style={{ backgroundColor: '#111827', color: '#FFFFFF', border: 'none', padding: '0.2rem 0.65rem', fontSize: '0.72rem', borderRadius: 4, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 600 }}
            >
              <LayoutDashboard size={12} /> Staff CRM
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="container flex items-center justify-between navbar-container">
        
        {/* Official Brand Logo */}
        <Link to="/">
          <Logo size="md" />
        </Link>

        {/* Center Nav Links (Desktop Only) */}
        <nav className="desktop-nav-links items-center gap-7">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontSize: '0.92rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#386635' : '#374151',
                  transition: 'color 0.15s ease'
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Utilities */}
        <div className="flex items-center gap-2.5">
          {compareList.length > 0 && (
            <Link to="/compare" className="btn-outline-gray flex items-center gap-1 desktop-only">
              <Scale size={14} /> Compare ({compareList.length})
            </Link>
          )}

          {/* Green List Property Button */}
          <Link to="/sell" className="btn-green btn-green-pill list-property-btn" style={{ backgroundColor: '#386635' }}>
            <Plus size={14} className="mobile-only-icon" />
            <span>List Property</span>
          </Link>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{ 
              width: 42, 
              height: 42, 
              borderRadius: '50%', 
              backgroundColor: mobileMenuOpen ? '#EBF4EC' : '#F3F4F6', 
              color: mobileMenuOpen ? '#386635' : '#111827',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* 3. Mobile Slide-Down Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E5E7EB', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', boxShadow: '0 20px 30px rgba(0,0,0,0.1)' }}>
          
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            Navigation Menu
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.05rem',
                fontWeight: location.pathname === link.path ? 800 : 600,
                color: location.pathname === link.path ? '#386635' : '#111827',
                padding: '0.6rem 0.75rem',
                borderRadius: 8,
                backgroundColor: location.pathname === link.path ? '#EBF4EC' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{link.name}</span>
              {location.pathname === link.path && <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#386635' }}></span>}
            </Link>
          ))}

          {/* Quick Contact & Staff CRM Action Block */}
          <div style={{ marginTop: '1rem', paddingTop: '1.25rem', borderTop: '1px solid #F3F4F6', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="flex gap-2">
              <a href="tel:+918445190135" className="btn-outline-gray flex-1 flex items-center justify-center gap-1" style={{ padding: '0.65rem', fontSize: '0.85rem' }}>
                <Phone size={14} style={{ color: '#386635' }} /> Call Us
              </a>
              <a href="mailto:info@a2realtors.in" className="btn-outline-gray flex-1 flex items-center justify-center gap-1" style={{ padding: '0.65rem', fontSize: '0.85rem' }}>
                <Mail size={14} style={{ color: '#386635' }} /> Email
              </a>
            </div>

            <button 
              onClick={() => { setMobileMenuOpen(false); onSwitchToCRM && onSwitchToCRM(); }} 
              className="btn-green w-full flex items-center justify-center gap-2" 
              style={{ backgroundColor: '#111827', padding: '0.75rem', borderRadius: 10, fontSize: '0.9rem' }}
            >
              <LayoutDashboard size={16} /> Open Staff CRM Portal
            </button>
          </div>

        </div>
      )}

      {/* Inline Scoped Styles */}
      <style>{`
        .top-bar-desktop {
          display: block;
        }

        .navbar-container {
          height: 76px;
        }

        .desktop-nav-links {
          display: none;
        }

        .list-property-btn {
          padding: 0.55rem 1.25rem;
          font-size: 0.85rem;
          white-space: nowrap;
        }

        .mobile-only-icon {
          display: none;
        }

        .desktop-only {
          display: none;
        }

        @media (min-width: 1024px) {
          .desktop-nav-links {
            display: flex !important;
          }
          .desktop-only {
            display: inline-flex !important;
          }
        }

        @media (max-width: 1023px) {
          .top-bar-desktop {
            display: none !important;
          }
          .navbar-container {
            height: 64px;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .list-property-btn {
            padding: 0.45rem 0.85rem;
            font-size: 0.78rem;
          }
        }
      `}</style>

    </header>
  );
};
