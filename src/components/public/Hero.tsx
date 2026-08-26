import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { locations, homepageSettings } = useStore();

  const [tab, setTab] = useState<'BUY' | 'RENT'>('BUY');
  const [propertyType, setPropertyType] = useState('ALL');
  const [locality, setLocality] = useState('ALL');
  const [budget, setBudget] = useState('ALL');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let query = `/search?type=${tab}`;
    if (propertyType !== 'ALL') query += `&category=${propertyType}`;
    if (locality !== 'ALL') query += `&locality=${locality}`;
    if (budget !== 'ALL') query += `&budget=${budget}`;
    navigate(query);
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '85vh', backgroundColor: '#0B0F19', color: '#FFFFFF', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* Background Aerial / Luxury Estate Image */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(to right, rgba(11, 15, 25, 0.85) 0%, rgba(11, 15, 25, 0.5) 60%, rgba(11, 15, 25, 0.75) 100%), url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '4rem 1.5rem' }}>
        
        {/* Desktop PC Content Distribution Grid */}
        <div className={`grid grid-cols-1 ${homepageSettings.showHeroSearch ? 'lg:grid-cols-12' : 'max-w-4xl mx-auto text-center'} gap-10 items-center`}>
          
          {/* Left Column Narrative */}
          <div className={homepageSettings.showHeroSearch ? 'lg:col-span-7' : ''}>
            
            <div className="section-tag" style={{ color: '#457B43', backgroundColor: 'rgba(56, 102, 53, 0.18)', padding: '0.35rem 0.85rem', borderRadius: 20, marginBottom: '1.25rem', border: '1px solid rgba(69, 123, 67, 0.4)' }}>
              🌲 Dehradun's Premier Real Estate Agency
            </div>

            <h1 style={{ 
              fontSize: 'clamp(2.6rem, 5vw, 4.4rem)', 
              fontWeight: 800, 
              letterSpacing: '-0.02em', 
              color: '#FFFFFF', 
              lineHeight: 1.1, 
              marginBottom: '1.5rem' 
            }}>
              {homepageSettings.heroHeadline || 'Your Trusted Real Estate Partner in Dehradun'}
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', color: '#E5E7EB', lineHeight: 1.6, maxWidth: 580, fontWeight: 400, marginBottom: '2rem' }}>
              {homepageSettings.heroSubheadline || 'From luxury heritage bungalows in Dalanwala to valley-view apartments on Rajpur Road, we help you find the property that fits your lifestyle and investment goals.'}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/search')}
                className="btn-green btn-green-pill"
                style={{ 
                  backgroundColor: '#386635', 
                  padding: '0.85rem 2.25rem', 
                  fontSize: '1.02rem', 
                  boxShadow: '0 10px 25px rgba(56, 102, 53, 0.4)' 
                }}
              >
                {homepageSettings.heroButtonText || 'Explore Properties'} <ArrowRight size={18} />
              </button>

              <button
                onClick={() => navigate('/sell')}
                className="btn-outline-gray"
                style={{ 
                  borderRadius: 30, 
                  padding: '0.85rem 1.75rem', 
                  fontSize: '0.95rem',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#FFFFFF',
                  borderColor: 'rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                List Your Property
              </button>
            </div>

          </div>

          {/* Right Column: Floating PC Property Search Card */}
          {homepageSettings.showHeroSearch && (
            <div className="lg:col-span-5">
              <div 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  color: '#111827',
                  borderRadius: 20,
                  padding: '2rem',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>Find Property</h3>
                  
                  {/* Buy / Rent Tabs */}
                  <div className="flex" style={{ backgroundColor: '#F3F4F6', padding: 3, borderRadius: 20 }}>
                    <button
                      onClick={() => setTab('BUY')}
                      style={{
                        padding: '0.35rem 1rem',
                        borderRadius: 18,
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        backgroundColor: tab === 'BUY' ? '#386635' : 'transparent',
                        color: tab === 'BUY' ? '#FFFFFF' : '#4B5563',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => setTab('RENT')}
                      style={{
                        padding: '0.35rem 1rem',
                        borderRadius: 18,
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        backgroundColor: tab === 'RENT' ? '#386635' : 'transparent',
                        color: tab === 'RENT' ? '#FFFFFF' : '#4B5563',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      Rent
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3.5">
                  
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.78rem', color: '#4B5563' }}>Locality / Area</label>
                    <select 
                      value={locality} 
                      onChange={(e) => setLocality(e.target.value)} 
                      className="form-select"
                      style={{ fontSize: '0.88rem', padding: '0.6rem 0.85rem' }}
                    >
                      <option value="ALL">All Dehradun Localities</option>
                      {locations.map(loc => (
                        <option key={loc.id} value={loc.name}>{loc.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.78rem', color: '#4B5563' }}>Property Type</label>
                    <select 
                      value={propertyType} 
                      onChange={(e) => setPropertyType(e.target.value)} 
                      className="form-select"
                      style={{ fontSize: '0.88rem', padding: '0.6rem 0.85rem' }}
                    >
                      <option value="ALL">All Property Types</option>
                      <option value="INDEPENDENT_HOUSE">Independent Villa / Kothi</option>
                      <option value="APARTMENT">Flat / Apartment / Penthouse</option>
                      <option value="PLOT">Land / Residential Plot</option>
                      <option value="COMMERCIAL">Commercial Office & Retail</option>
                      <option value="FARMHOUSE">Farm House & Hill Estate</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.78rem', color: '#4B5563' }}>Max Budget</label>
                    <select 
                      value={budget} 
                      onChange={(e) => setBudget(e.target.value)} 
                      className="form-select"
                      style={{ fontSize: '0.88rem', padding: '0.6rem 0.85rem' }}
                    >
                      <option value="ALL">Any Budget Range</option>
                      <option value="50">Up to ₹50 Lakhs</option>
                      <option value="100">Up to ₹1 Crore</option>
                      <option value="250">Up to ₹2.5 Crores</option>
                      <option value="500">Up to ₹5 Crores+</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-green w-full" 
                    style={{ backgroundColor: '#386635', padding: '0.75rem', borderRadius: 10, fontSize: '0.92rem', marginTop: '0.5rem' }}
                  >
                    <Search size={16} /> Search Verified Inventory
                  </button>

                </form>

              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
