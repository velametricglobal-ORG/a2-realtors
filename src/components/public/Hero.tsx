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
            
            {/* Headline */}
            <h1 
              style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', 
                fontWeight: 800, 
                letterSpacing: '-0.025em', 
                color: '#FFFFFF', 
                lineHeight: 1.15, 
                marginBottom: '1.5rem',
                textWrap: 'balance'
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
                marginBottom: '2.5rem',
                textWrap: 'pretty'
              }}
            >
              {homepageSettings.heroSubheadline || 'From valley-view penthouses on Rajpur Road to heritage kothis in Dalanwala and high-yield plots, we guide discerning buyers with 100% legal due diligence.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4" style={{ marginBottom: '3rem' }}>
              <button
                onClick={() => navigate('/search')}
                className="btn-gold btn-pill"
                style={{ 
                  padding: '0.95rem 2.4rem', 
                  fontSize: '1rem', 
                  fontWeight: 800 
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

            {/* Quick Popular Locality Shortcuts */}
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Popular Locations
              </div>
              <div className="flex flex-wrap gap-2">
                {quickLocalityPills.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => navigate(`/search?locality=${encodeURIComponent(loc)}`)}
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.65)',
                      color: '#CBD5E1',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      padding: '0.4rem 0.95rem',
                      borderRadius: 20,
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      backdropFilter: 'blur(4px)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#386635';
                      e.currentTarget.style.borderColor = '#386635';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.65)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.color = '#CBD5E1';
                    }}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Next-Gen Floating Property Search Pod (5 Cols) */}
          <div className="lg:col-span-5">
            <div 
              className="glass-panel"
              style={{
                color: '#0F172A',
                borderRadius: 24,
                padding: '2rem',
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.6)'
              }}
            >
              
              {/* Search Hub Title & Tab Switches */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                    Find Verified Property
                  </h3>
                  <span className="flex items-center gap-1" style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 700 }}>
                    <Shield size={13} /> 100% Freehold
                  </span>
                </div>

                {/* Multi-Tab Selector */}
                <div 
                  className="flex" 
                  style={{ 
                    backgroundColor: '#F1F5F9', 
                    padding: 3, 
                    borderRadius: 14,
                    overflowX: 'auto'
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
                        padding: '0.45rem 0.5rem',
                        borderRadius: 10,
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        backgroundColor: activeTab === t.id ? '#386635' : 'transparent',
                        color: activeTab === t.id ? '#FFFFFF' : '#475569',
                        boxShadow: activeTab === t.id ? '0 2px 8px rgba(56,102,53,0.3)' : 'none',
                        transition: 'all 0.15s ease',
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
                  <label className="form-label" style={{ fontSize: '0.78rem', color: '#475569' }}>
                    Preferred Locality / Sector
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select 
                      value={locality} 
                      onChange={(e) => setLocality(e.target.value)} 
                      className="form-select"
                      style={{ fontSize: '0.88rem', padding: '0.65rem 0.85rem' }}
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
                    <label className="form-label" style={{ fontSize: '0.78rem', color: '#475569' }}>
                      Property Type
                    </label>
                    <select 
                      value={propertyType} 
                      onChange={(e) => setPropertyType(e.target.value)} 
                      className="form-select"
                      style={{ fontSize: '0.88rem', padding: '0.65rem 0.85rem' }}
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
                  <label className="form-label" style={{ fontSize: '0.78rem', color: '#475569' }}>
                    Budget Range
                  </label>
                  <select 
                    value={budget} 
                    onChange={(e) => setBudget(e.target.value)} 
                    className="form-select"
                    style={{ fontSize: '0.88rem', padding: '0.65rem 0.85rem' }}
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
                    <label className="form-label" style={{ fontSize: '0.78rem', color: '#475569', marginBottom: 4, display: 'block' }}>
                      Bedrooms (BHK)
                    </label>
                    <div className="flex gap-1.5">
                      {['ALL', '2', '3', '4', '5+'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBedrooms(b)}
                          style={{
                            flex: 1,
                            padding: '0.4rem',
                            borderRadius: 8,
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            border: '1px solid',
                            borderColor: bedrooms === b ? '#386635' : '#E2E8F0',
                            backgroundColor: bedrooms === b ? '#EBF4EC' : '#FFFFFF',
                            color: bedrooms === b ? '#1B4332' : '#64748B',
                            cursor: 'pointer'
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
                    padding: '0.85rem', 
                    borderRadius: 12, 
                    fontSize: '0.95rem', 
                    marginTop: '0.5rem',
                    width: '100%'
                  }}
                >
                  <Search size={18} />
                  <span>Search Verified Inventory</span>
                </button>

              </form>

              {/* Bottom Assurance */}
              <div className="flex items-center justify-between" style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #E2E8F0', fontSize: '0.72rem', color: '#64748B' }}>
                <span>🔒 Zero Brokerage Hassle</span>
                <span>⚡ Instant Site Visit Booking</span>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
