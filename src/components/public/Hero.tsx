import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, MapPin, Sparkles, Shield, Building, Home, Landmark, Trees } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { locations, homepageSettings } = useStore();

  const [activeTab, setActiveTab] = useState<'BUY' | 'RENT' | 'VILLA' | 'PLOT' | 'COMMERCIAL'>('BUY');
  const [locality, setLocality] = useState('ALL');
  const [propertyType, setPropertyType] = useState('ALL');
  const [budget, setBudget] = useState('ALL');
  const [bedrooms, setBedrooms] = useState('ALL');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let query = `/search?type=${activeTab === 'RENT' ? 'RENT' : 'BUY'}`;
    
    if (activeTab === 'VILLA') query += `&category=INDEPENDENT_HOUSE`;
    else if (activeTab === 'PLOT') query += `&category=PLOT`;
    else if (activeTab === 'COMMERCIAL') query += `&category=COMMERCIAL`;
    else if (propertyType !== 'ALL') query += `&category=${propertyType}`;

    if (locality !== 'ALL') query += `&locality=${encodeURIComponent(locality)}`;
    if (budget !== 'ALL') query += `&budget=${budget}`;
    if (bedrooms !== 'ALL') query += `&beds=${bedrooms}`;

    navigate(query);
  };

  const quickLocalityPills = ['Rajpur Road', 'Dalanwala', 'Sahastradhara', 'Mussoorie Road', 'Chakrata Road'];

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        minHeight: '88vh', 
        backgroundColor: '#0B1120', 
        color: '#FFFFFF', 
        display: 'flex', 
        alignItems: 'center', 
        overflow: 'hidden',
        padding: '3rem 0'
      }}
    >
      
      {/* 1. Cinematic Background with Ambient Atmospheric Lighting */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(to right, rgba(11, 17, 32, 0.92) 0%, rgba(11, 17, 32, 0.65) 50%, rgba(11, 17, 32, 0.88) 100%), url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          zIndex: 1
        }}
      />

      {/* Atmospheric Emerald Ambient Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          left: '20%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 102, 53, 0.22) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '3.5rem 1.5rem 4rem 1.5rem' }}>
        
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Story & Value Proposition (7 Cols) */}
          <div className="lg:col-span-7">
            
            {/* Trust Pill */}
            <div className="flex items-center gap-2" style={{ marginBottom: '1.25rem' }}>
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  backgroundColor: 'rgba(22, 101, 52, 0.45)',
                  color: '#4ADE80',
                  padding: '0.42rem 1.1rem',
                  borderRadius: 999,
                  border: '1px solid rgba(74, 222, 128, 0.35)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                }}
              >
                <Sparkles size={13} style={{ color: '#DFB76C' }} /> 
                <span>Heritage of Trust • Inder Road, Dalanwala</span>
              </span>
            </div>

            {/* Headline */}
            <h1 
              style={{ 
                fontSize: 'clamp(2.5rem, 4.8vw, 4.1rem)', 
                fontWeight: 800, 
                letterSpacing: '-0.025em', 
                color: '#FFFFFF', 
                lineHeight: 1.15, 
                marginBottom: '1.5rem',
                textWrap: 'balance',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              {homepageSettings.heroHeadline ? (
                homepageSettings.heroHeadline
              ) : (
                <>
                  Discover Verified{' '}
                  <span style={{ color: '#DFB76C', fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontWeight: 600 }}>
                    Luxury Properties
                  </span>{' '}
                  in Dehradun
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p 
              style={{ 
                fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)', 
                color: '#CBD5E1', 
                lineHeight: 1.7, 
                maxWidth: 620, 
                fontWeight: 400, 
                marginBottom: '2rem',
                textWrap: 'pretty'
              }}
            >
              {homepageSettings.heroSubheadline || 'From valley-view penthouses on Rajpur Road to heritage kothis in Dalanwala and high-yield plots, we guide discerning buyers with 100% legal due diligence.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4" style={{ marginBottom: '2.25rem' }}>
              <button
                onClick={() => navigate('/search')}
                className="btn-gold btn-pill"
                style={{ 
                  padding: '0.95rem 2.4rem', 
                  fontSize: '1rem', 
                  fontWeight: 800,
                  boxShadow: '0 8px 24px rgba(197, 160, 89, 0.35)'
                }}
              >
                <span>Browse Inventory</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => navigate('/sell')}
                className="btn-outline-gray btn-pill"
                style={{ 
                  padding: '0.95rem 2rem', 
                  fontSize: '0.95rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(6px)'
                }}
              >
                List Your Property
              </button>
            </div>

            {/* 3 Credibility Indicators Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" style={{ marginBottom: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '1.5rem', maxWidth: 640 }}>
              <div className="flex items-center gap-2" style={{ color: '#E2E8F0', fontSize: '0.82rem' }}>
                <Shield size={16} style={{ color: '#4ADE80', flexShrink: 0 }} />
                <span><strong>30-Yr Legal</strong> Title Search</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: '#E2E8F0', fontSize: '0.82rem' }}>
                <Landmark size={16} style={{ color: '#DFB76C', flexShrink: 0 }} />
                <span><strong>MDDA & RERA</strong> Sanctioned</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: '#E2E8F0', fontSize: '0.82rem' }}>
                <Trees size={16} style={{ color: '#4ADE80', flexShrink: 0 }} />
                <span><strong>Prime Valley</strong> Inventory</span>
              </div>
            </div>

            {/* Quick Popular Locality Shortcuts */}
            <div>
              <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#94A3B8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Quick Locality Explorer
              </div>
              <div className="flex flex-wrap gap-2">
                {quickLocalityPills.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => navigate(`/search?locality=${encodeURIComponent(loc)}`)}
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.72)',
                      color: '#F1F5F9',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      padding: '0.45rem 1rem',
                      borderRadius: 999,
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      backdropFilter: 'blur(8px)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#166534';
                      e.currentTarget.style.borderColor = '#4ADE80';
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.72)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                      e.currentTarget.style.color = '#F1F5F9';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <MapPin size={12} style={{ color: '#DFB76C' }} />
                    <span>{loc}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Next-Gen Floating Property Search Pod (5 Cols) */}
          <div className="lg:col-span-5">
            <div 
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                color: '#0F172A',
                borderRadius: 26,
                padding: '2.25rem',
                boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.55)',
                border: '1px solid rgba(255, 255, 255, 0.85)',
                position: 'relative'
              }}
            >
              
              {/* Search Hub Title & Tab Switches */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: '0.85rem' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit, sans-serif' }}>
                    Find Verified Property
                  </h3>
                  <span className="flex items-center gap-1" style={{ fontSize: '0.74rem', color: '#166534', fontWeight: 800, backgroundColor: '#EBF4EC', padding: '0.25rem 0.65rem', borderRadius: 999, border: '1px solid rgba(22,101,52,0.2)' }}>
                    <Shield size={13} style={{ color: '#166534' }} /> 100% Freehold
                  </span>
                </div>

                {/* Multi-Tab Selector */}
                <div 
                  className="flex" 
                  style={{ 
                    backgroundColor: '#F1F5F9', 
                    padding: 4, 
                    borderRadius: 14,
                    overflowX: 'auto',
                    border: '1px solid #E2E8F0'
                  }}
                >
                  {[
                    { id: 'BUY', label: 'Buy' },
                    { id: 'RENT', label: 'Rent' },
                    { id: 'VILLA', label: 'Villas' },
                    { id: 'PLOT', label: 'Plots' },
                    { id: 'COMMERCIAL', label: 'Commercial' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveTab(t.id as any)}
                      style={{
                        flex: 1,
                        padding: '0.5rem 0.6rem',
                        borderRadius: 10,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        backgroundColor: activeTab === t.id ? '#166534' : 'transparent',
                        color: activeTab === t.id ? '#FFFFFF' : '#475569',
                        boxShadow: activeTab === t.id ? '0 4px 12px rgba(22,101,52,0.3)' : 'none',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Search Form */}
              <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3.5">
                
                {/* Locality Selector */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <MapPin size={13} style={{ color: '#166534' }} /> Preferred Locality / Sector
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select 
                      value={locality} 
                      onChange={(e) => setLocality(e.target.value)} 
                      className="form-select"
                      style={{ fontSize: '0.88rem', padding: '0.7rem 0.85rem', borderRadius: 12, borderColor: '#CBD5E1', backgroundColor: '#FFFFFF' }}
                    >
                      <option value="ALL">All Prime Dehradun Localities</option>
                      {locations.map(loc => (
                        <option key={loc.id} value={loc.name}>{loc.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Property Category (If on Buy / Rent) */}
                {activeTab === 'BUY' && (
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Building size={13} style={{ color: '#166534' }} /> Property Typology
                    </label>
                    <select 
                      value={propertyType} 
                      onChange={(e) => setPropertyType(e.target.value)} 
                      className="form-select"
                      style={{ fontSize: '0.88rem', padding: '0.7rem 0.85rem', borderRadius: 12, borderColor: '#CBD5E1', backgroundColor: '#FFFFFF' }}
                    >
                      <option value="ALL">All Types (Villas, Flats, Plots)</option>
                      <option value="INDEPENDENT_HOUSE">Independent Villa / Kothi</option>
                      <option value="APARTMENT">Luxury Flat & Penthouse</option>
                      <option value="PLOT">Residential Land & Plot</option>
                      <option value="COMMERCIAL">Office & Commercial Space</option>
                      <option value="FARMHOUSE">Farmhouse & Hill Estate</option>
                    </select>
                  </div>
                )}

                {/* Budget Range Dropdown */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Landmark size={13} style={{ color: '#C5A059' }} /> Budget Range
                  </label>
                  <select 
                    value={budget} 
                    onChange={(e) => setBudget(e.target.value)} 
                    className="form-select"
                    style={{ fontSize: '0.88rem', padding: '0.7rem 0.85rem', borderRadius: 12, borderColor: '#CBD5E1', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="ALL">Any Budget</option>
                    <option value="5000000">Up to ₹50 Lakhs</option>
                    <option value="10000000">Up to ₹1 Crore</option>
                    <option value="25000000">Up to ₹2.5 Crores</option>
                    <option value="50000000">Up to ₹5 Crores+</option>
                  </select>
                </div>

                {/* Bedroom Selector Chips */}
                {(activeTab === 'BUY' || activeTab === 'RENT' || activeTab === 'VILLA') && (
                  <div>
                    <label className="form-label" style={{ fontSize: '0.78rem', color: '#475569', marginBottom: 5, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Home size={13} style={{ color: '#166534' }} /> Bedrooms (BHK)
                    </label>
                    <div className="flex gap-1.5">
                      {['ALL', '2', '3', '4', '5+'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBedrooms(b)}
                          style={{
                            flex: 1,
                            padding: '0.45rem',
                            borderRadius: 10,
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            border: '1px solid',
                            borderColor: bedrooms === b ? '#166534' : '#E2E8F0',
                            backgroundColor: bedrooms === b ? '#EBF4EC' : '#FFFFFF',
                            color: bedrooms === b ? '#166534' : '#64748B',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {b === 'ALL' ? 'Any' : `${b} BHK`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search Button */}
                <button 
                  type="submit" 
                  className="btn-green w-full" 
                  style={{ 
                    padding: '0.92rem', 
                    borderRadius: 14, 
                    fontSize: '0.98rem', 
                    marginTop: '0.65rem',
                    width: '100%',
                    backgroundColor: '#166534',
                    boxShadow: '0 8px 20px rgba(22, 101, 52, 0.35)'
                  }}
                >
                  <Search size={18} style={{ color: '#DFB76C' }} />
                  <span>Search Verified Properties</span>
                </button>

              </form>

              {/* Bottom Assurance */}
              <div className="flex items-center justify-between" style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid #E2E8F0', fontSize: '0.75rem', color: '#64748B' }}>
                <span className="flex items-center gap-1">🔒 100% Freehold Cleared</span>
                <span className="flex items-center gap-1">⚡ Dedicated Valley Escort</span>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
