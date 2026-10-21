import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, TrendingUp, Trees, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const LocalityExplorer: React.FC = () => {
  const navigate = useNavigate();
  const { locations } = useStore();

  const hotspots = [
    {
      name: 'Rajpur Road',
      slug: 'rajpur-road',
      growth: '+14.5% YoY',
      vibe: 'Luxury Corridor & Mountain Views',
      propertiesCount: 24,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600',
      popularFor: 'Luxury Penthouses, High-end Cafes, Heritage Estates'
    },
    {
      name: 'Dalanwala',
      slug: 'dalanwala',
      growth: '+12.8% YoY',
      vibe: 'Colonial Bungalows & Elite Living',
      propertiesCount: 18,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
      popularFor: 'Kothis, Top Boarding Schools, Green Canopy'
    },
    {
      name: 'Sahastradhara Road',
      slug: 'sahastradhara-road',
      growth: '+18.2% YoY',
      vibe: 'High Growth Investment Hub',
      propertiesCount: 32,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600',
      popularFor: 'Gated Townships, IT Park, High Rental Yield'
    },
    {
      name: 'Mussoorie Foothills',
      slug: 'mussoorie-road',
      growth: '+16.0% YoY',
      vibe: 'Scenic Valley Estates & Farmhouses',
      propertiesCount: 15,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=600',
      popularFor: 'Panoramic Hills, Boutique Villas, Pure Air'
    }
  ];

  return (
    <section style={{ padding: '6.5rem 0', backgroundColor: '#F8FAFC', position: 'relative' }}>
      <div className="container">
        
        {/* Section Title Header */}
        <div className="flex flex-wrap items-end justify-between gap-6" style={{ marginBottom: '3.5rem' }}>
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '0.85rem' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                backgroundColor: '#EBF4EC',
                color: '#166534',
                padding: '0.35rem 0.9rem',
                borderRadius: 999,
                border: '1px solid rgba(22, 101, 52, 0.25)'
              }}>
                <Trees size={13} style={{ color: '#166534' }} /> High-Appreciation Corridors
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(2.1rem, 3.6vw, 2.85rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em', lineHeight: 1.2, fontFamily: 'Outfit, sans-serif' }}>
              Explore Prime Valley Neighborhoods
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.05rem', maxWidth: 640, marginTop: '0.65rem', lineHeight: 1.65 }}>
              Discover verified locality profiles, annual capital appreciation rates, and lifestyle amenities across Dehradun's most desirable residential zones.
            </p>
          </div>

          <button
            onClick={() => navigate('/search')}
            className="btn-outline-green btn-pill"
            style={{ padding: '0.75rem 1.6rem', fontSize: '0.92rem' }}
          >
            <span>View All Valley Localities</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Hotspots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotspots.map((spot, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/search?locality=${encodeURIComponent(spot.name)}`)}
              className="card-luxury group"
              style={{
                borderRadius: 22,
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 18px rgba(15, 23, 42, 0.04)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(15, 23, 42, 0.12)';
                e.currentTarget.style.borderColor = '#166534';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(15, 23, 42, 0.04)';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              {/* Image Preview with overlay badge */}
              <div style={{ position: 'relative', height: 210, overflow: 'hidden', backgroundColor: '#0B1120' }}>
                <img
                  src={spot.image}
                  alt={spot.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="group-hover:scale-108"
                />
                
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(11,17,32,0.85) 0%, rgba(11,17,32,0.2) 60%, rgba(0,0,0,0.3) 100%)'
                }} />

                <div style={{ position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(11,17,32,0.85)', backdropFilter: 'blur(8px)', color: '#FFFFFF', padding: '0.28rem 0.75rem', borderRadius: 999, fontSize: '0.72rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 5, border: '1px solid rgba(255,255,255,0.2)' }}>
                  <MapPin size={12} style={{ color: '#DFB76C' }} /> {spot.propertiesCount} Listings
                </div>

                <div style={{ position: 'absolute', bottom: 12, right: 12, backgroundColor: 'rgba(22, 101, 52, 0.92)', color: '#FFFFFF', padding: '0.28rem 0.75rem', borderRadius: 999, fontSize: '0.74rem', fontWeight: 800, border: '1px solid rgba(74, 222, 128, 0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 5, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                  <TrendingUp size={13} style={{ color: '#4ADE80' }} /> {spot.growth}
                </div>
              </div>

              {/* Content Body */}
              <div style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem', fontFamily: 'Outfit, sans-serif' }}>
                  {spot.name}
                </h3>
                
                <div style={{ fontSize: '0.82rem', color: '#166534', fontWeight: 700, marginBottom: '0.85rem', lineHeight: 1.35, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Trees size={13} /> {spot.vibe}
                </div>

                <div style={{ fontSize: '0.84rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.35rem', flexGrow: 1 }}>
                  {spot.popularFor}
                </div>

                <div className="flex items-center justify-between" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #F1F5F9', fontSize: '0.84rem', fontWeight: 700, color: '#166534' }}>
                  <span>View Available Listings</span>
                  <ArrowRight size={15} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
