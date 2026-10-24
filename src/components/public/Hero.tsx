import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ArrowRight, MapPin, Sparkles, Shield, Building, Home, 
  Landmark, Trees, CheckCircle2, Star, Compass, Phone, ChevronRight 
} from 'lucide-react';
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

  const quickLocalityPills = [
    'Rajpur Road', 
    'Dalanwala', 
    'Sahastradhara', 
    'Mussoorie Road', 
    'Canal Road',
    'Chakrata Road'
  ];

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        minHeight: '92vh', 
        backgroundColor: '#070C16', 
        color: '#FFFFFF', 
        display: 'flex', 
        alignItems: 'center', 
        overflow: 'hidden',
        padding: '4rem 0 5rem 0'
      }}
    >
      
      {/* 1. Cinematic Multi-Layered Architectural Background */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(to right, rgba(7, 12, 22, 0.94) 0%, rgba(7, 12, 22, 0.72) 48%, rgba(7, 12, 22, 0.92) 100%), url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2200")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 38%',
          zIndex: 1
        }}
      />

      {/* Atmospheric Ambient Lighting Meshes */}
      <div 
        style={{
          position: 'absolute',
          top: '-15%',
          left: '12%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22, 101, 52, 0.28) 0%, transparent 68%)',
          filter: 'blur(75px)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '8%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.22) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '2rem 1.5rem' }}>
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Brand Story & Value Proposition (7 Cols) */}
          <div className="lg:col-span-7">
            
            {/* Live Trust & Verification Pill */}
            <div className="flex flex-wrap items-center gap-3" style={{ marginBottom: '1.5rem' }}>
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
                  padding: '0.45rem 1.15rem',
                  borderRadius: 999,
                  border: '1px solid rgba(74, 222, 128, 0.35)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.3)'
                }}
              >
                <span className="pulse-dot"></span>
                <span>Heritage of Trust • Inder Road, Dalanwala</span>
              </span>

              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: '#DFB76C',
                  backgroundColor: 'rgba(197, 160, 89, 0.15)',
                  padding: '0.42rem 0.95rem',
                  borderRadius: 999,
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Star size={12} fill="#DFB76C" />
                <span>4.9 / 5.0 Rated Advisory</span>
              </span>
            </div>

            {/* Main Headline with Editorial Typography */}
            <h1 
              style={{ 
                fontSize: 'clamp(2.4rem, 4.6vw, 4rem)', 
                fontWeight: 800, 
                letterSpacing: '-0.025em', 
                color: '#FFFFFF', 
                lineHeight: 1.15, 
                marginBottom: '1.4rem',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              {homepageSettings.heroHeadline ? (
                homepageSettings.heroHeadline
              ) : (
                <>
                  Curated Sanctuaries &amp;{' '}
                  <span 
                    style={{ 
                      fontFamily: 'Playfair Display, serif', 
                      fontStyle: 'italic', 
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #FFE8B6 0%, #DFB76C 50%, #C5A059 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      paddingRight: 6
                    }}
                  >
                    Verified Luxury
                  </span>{' '}
                  in Dehradun
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p 
              style={{ 
                fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', 
                color: '#CBD5E1', 
                lineHeight: 1.7, 
                maxWidth: 620, 
                fontWeight: 400, 
                marginBottom: '2.25rem'
              }}
            >
              {homepageSettings.heroSubheadline || 'From panoramic mountain-facing penthouses on Rajpur Road to heritage kothis in Dalanwala and sanctioned freehold estates, we guide discerning buyers with zero-compromise legal due diligence.'}
            </p>

            {/* High-Impact Action CTAs */}
            <div className="flex flex-wrap items-center gap-4" style={{ marginBottom: '2.5rem' }}>
              <button
                onClick={() => navigate('/search')}
                className="btn-gold btn-pill hover-lift"
                style={{ 
                  padding: '1rem 2.5rem', 
                  fontSize: '1rem', 
                  fontWeight: 800,
                  boxShadow: '0 10px 30px rgba(197, 160, 89, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <span>Explore Verified Portfolio</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => navigate('/contact')}
                className="btn-pill hover-lift"
                style={{ 
                  padding: '0.95rem 2.1rem', 
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  backdropFilter: 'blur(10px)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <Compass size={17} style={{ color: '#4ADE80' }} />
                <span>Book Guided Valley Tour</span>
              </button>
            </div>

            {/* 3 Credibility Indicators Strip */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-4" 
              style={{ 
                marginBottom: '2.25rem', 
                borderTop: '1px solid rgba(255,255,255,0.12)', 
                paddingTop: '1.6rem', 
                maxWidth: 660 
              }}
            >
              <div className="flex items-center gap-3">
                <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(22, 101, 52, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(74, 222, 128, 0.3)' }}>
                  <Shield size={17} style={{ color: '#4ADE80' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFFFFF' }}>30-Year Title Search</div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Zero legal encumbrances</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(197, 160, 89, 0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(197, 160, 89, 0.35)' }}>
                  <Landmark size={17} style={{ color: '#DFB76C' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFFFFF' }}>MDDA &amp; RERA Sanctioned</div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>100% Freehold layouts</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(22, 101, 52, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(74, 222, 128, 0.3)' }}>
                  <Trees size={17} style={{ color: '#4ADE80' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFFFFF' }}>Direct Mandates</div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>No middleman markups</div>
                </div>
              </div>
            </div>

            {/* Quick Popular Locality Shortcuts */}
            <div>
              <div className="flex items-center gap-2" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                <Compass size={13} style={{ color: '#DFB76C' }} />
                <span>Explore Top Neighborhoods</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickLocalityPills.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => navigate(`/search?locality=${encodeURIComponent(loc)}`)}
                    className="hover-lift"
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.75)',
                      color: '#F1F5F9',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      padding: '0.45rem 1rem',
                      borderRadius: 999,
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      backdropFilter: 'blur(10px)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#166534';
                      e.currentTarget.style.borderColor = '#4ADE80';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.75)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                      e.currentTarget.style.color = '#F1F5F9';
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
                backgroundColor: 'rgba(255, 255, 255, 0.96)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                color: '#0F172A',
                borderRadius: 28,
                padding: '2.4rem',
                boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.6)',
                position: 'relative'
              }}
            >
              
              {/* Header Badge & Title */}
              <div style={{ marginBottom: '1.4rem' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: '0.85rem' }}>
                  <div className="flex items-center gap-2">
                    <span style={{ 
                      width: 10, 
                      height: 10, 
                      borderRadius: '50%', 
                      backgroundColor: '#166534',
                      boxShadow: '0 0 10px #166534'
                    }} />
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit, sans-serif' }}>
                      Find Verified Property
                    </h3>
                  </div>
                  <span 
                    style={{ 
                      fontSize: '0.74rem', 
                      color: '#166534', 
                      fontWeight: 800, 
                      backgroundColor: '#EBF4EC', 
                      padding: '0.28rem 0.75rem', 
                      borderRadius: 999, 
                      border: '1px solid rgba(22, 101, 52, 0.25)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    <Shield size={12} style={{ color: '#166534' }} /> Freehold Title
                  </span>
                </div>

                {/* Multi-Tab Selector with Pill Indicator */}
                <div 
                  className="flex" 
                  style={{ 
                    backgroundColor: '#F1F5F9', 
                    padding: 5, 
                    borderRadius: 16,
                    border: '1px solid #E2E8F0',
                    gap: 4
                  }}
                >
                  {[
                    { id: 'BUY', label: 'Buy' },
                    { id: 'RENT', label: 'Rent' },
                    { id: 'VILLA', label: 'Luxury Villa' },
                    { id: 'PLOT', label: 'Plots' },
                    { id: 'COMMERCIAL', label: 'Commercial' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveTab(t.id as any)}
                      style={{
                        flex: 1,
                        padding: '0.55rem 0.4rem',
                        borderRadius: 11,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        backgroundColor: activeTab === t.id ? '#166534' : 'transparent',
                        color: activeTab === t.id ? '#FFFFFF' : '#475569',
                        boxShadow: activeTab === t.id ? '0 4px 14px rgba(22,101,52,0.35)' : 'none',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer'
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
                  <label className="form-label" style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                    <MapPin size={13} style={{ color: '#166534' }} /> Prime Locality / Belt
                  </label>
                  <select 
                    value={locality} 
                    onChange={(e) => setLocality(e.target.value)} 
                    className="form-select"
                    style={{ 
                      fontSize: '0.88rem', 
                      padding: '0.75rem 0.9rem', 
                      borderRadius: 12, 
                      borderColor: '#CBD5E1', 
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                    }}
                  >
                    <option value="ALL">All Prime Dehradun Localities</option>
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.name}>{loc.name}</option>
                    ))}
                  </select>
                </div>

                {/* Property Category (If on Buy / Rent) */}
                {activeTab === 'BUY' && (
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                      <Building size={13} style={{ color: '#166534' }} /> Property Typology
                    </label>
                    <select 
                      value={propertyType} 
                      onChange={(e) => setPropertyType(e.target.value)} 
                      className="form-select"
                      style={{ 
                        fontSize: '0.88rem', 
                        padding: '0.75rem 0.9rem', 
                        borderRadius: 12, 
                        borderColor: '#CBD5E1', 
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                      }}
                    >
                      <option value="ALL">All Types (Villas, Flats, Plots)</option>
                      <option value="INDEPENDENT_HOUSE">Independent Villa / Kothi</option>
                      <option value="APARTMENT">Luxury Flat &amp; Penthouse</option>
                      <option value="PLOT">Residential Land &amp; Plot</option>
                      <option value="COMMERCIAL">Office &amp; Commercial Space</option>
                      <option value="FARMHOUSE">Farmhouse &amp; Hill Estate</option>
                    </select>
                  </div>
                )}

                {/* Budget Range Dropdown */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                    <Landmark size={13} style={{ color: '#C5A059' }} /> Budget Range
                  </label>
                  <select 
                    value={budget} 
                    onChange={(e) => setBudget(e.target.value)} 
                    className="form-select"
                    style={{ 
                      fontSize: '0.88rem', 
                      padding: '0.75rem 0.9rem', 
                      borderRadius: 12, 
                      borderColor: '#CBD5E1', 
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                    }}
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
                    <label className="form-label" style={{ fontSize: '0.78rem', color: '#475569', marginBottom: 6, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Home size={13} style={{ color: '#166534' }} /> Bedrooms (BHK)
                    </label>
                    <div className="flex gap-2">
                      {['ALL', '2', '3', '4', '5+'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBedrooms(b)}
                          style={{
                            flex: 1,
                            padding: '0.5rem 0.2rem',
                            borderRadius: 10,
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            border: '1px solid',
                            borderColor: bedrooms === b ? '#166534' : '#E2E8F0',
                            backgroundColor: bedrooms === b ? '#EBF4EC' : '#FFFFFF',
                            color: bedrooms === b ? '#166534' : '#64748B',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: bedrooms === b ? '0 2px 6px rgba(22,101,52,0.15)' : 'none'
                          }}
                        >
                          {b === 'ALL' ? 'Any' : `${b} BHK`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search Button with Shimmer Hover */}
                <button 
                  type="submit" 
                  className="btn-green w-full hover-lift" 
                  style={{ 
                    padding: '0.95rem', 
                    borderRadius: 14, 
                    fontSize: '0.98rem', 
                    marginTop: '0.65rem',
                    width: '100%',
                    backgroundColor: '#166534',
                    boxShadow: '0 8px 24px rgba(22, 101, 52, 0.38)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8
                  }}
                >
                  <Search size={18} style={{ color: '#DFB76C' }} />
                  <span>Search Verified Properties</span>
                </button>

              </form>

              {/* Bottom Assurance */}
              <div 
                className="flex items-center justify-between" 
                style={{ 
                  marginTop: '1.4rem', 
                  paddingTop: '1rem', 
                  borderTop: '1px solid #E2E8F0', 
                  fontSize: '0.76rem', 
                  color: '#64748B',
                  fontWeight: 600
                }}
              >
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} style={{ color: '#166534' }} /> Freehold Title Records
                </span>
                <span className="flex items-center gap-1.5">
                  <Compass size={13} style={{ color: '#C5A059' }} /> Dedicated Valley Escort
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
