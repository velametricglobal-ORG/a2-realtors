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
    <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFC', position: 'relative' }}>
      <div className="container">
        
        {/* Section Title Header */}
        <div className="flex flex-wrap items-end justify-between gap-6" style={{ marginBottom: '3.5rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Explore Prime Valley Neighborhoods
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.05rem', maxWidth: 640, marginTop: '0.6rem', lineHeight: 1.6 }}>
              Discover authentic locality profiles, annual capital appreciation, and lifestyle perks across Dehradun's most desirable sectors.
            </p>
          </div>

          <button
            onClick={() => navigate('/search')}
            className="btn-outline-green"
            style={{ borderRadius: 30 }}
          >
            <span>View All Localities</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Hotspots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotspots.map((spot, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/search?locality=${encodeURIComponent(spot.name)}`)}
              className="card-luxury"
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: '#FFFFFF'
              }}
            >
              {/* Image Preview with overlay badge */}
              <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                <img
                  src={spot.image}
                  alt={spot.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                />
                <div style={{ position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(11,17,32,0.85)', backdropFilter: 'blur(8px)', color: '#FFFFFF', padding: '0.25rem 0.65rem', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={12} style={{ color: '#C5A059' }} /> {spot.propertiesCount} Listings
                </div>

                <div style={{ position: 'absolute', bottom: 12, right: 12, backgroundColor: '#E8F5E9', color: '#1B4332', padding: '0.25rem 0.6rem', borderRadius: 20, fontSize: '0.72rem', fontWeight: 800, border: '1px solid rgba(56,102,53,0.3)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <TrendingUp size={12} /> {spot.growth}
                </div>
              </div>

              {/* Content Body */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem' }}>
                  {spot.name}
                </h3>
                <div style={{ fontSize: '0.82rem', color: '#386635', fontWeight: 700, marginBottom: '0.85rem', lineHeight: 1.35 }}>
                  {spot.vibe}
                </div>

                <div style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
                  {spot.popularFor}
                </div>

                <div className="flex items-center justify-between" style={{ marginTop: 'auto', paddingTop: '0.85rem', borderTop: '1px solid #F1F5F9', fontSize: '0.82rem', fontWeight: 700, color: '#386635' }}>
                  <span>Explore Properties</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
