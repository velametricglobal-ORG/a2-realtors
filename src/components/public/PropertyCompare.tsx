import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, X, Check, ArrowRight, MessageSquare, Shield, CheckCircle2, MapPin } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const PropertyCompare: React.FC = () => {
  const { properties, compareList, toggleCompare, clearCompare } = useStore();

  const compareProperties = properties.filter(p => compareList.includes(p.id));

  const formatPrice = (p: typeof properties[0]) => {
    if (p.priceDisplay) return p.priceDisplay;
    if (!p.price || p.price === 0) return 'Price on Request';
    if (p.price >= 10000000) return `₹ ${(p.price / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
    if (p.price >= 100000) return `₹ ${(p.price / 100000).toFixed(1).replace(/\.0$/, '')} Lakhs`;
    return `₹ ${p.price.toLocaleString('en-IN')}`;
  };

  const getPricePerSqft = (p: typeof properties[0]) => {
    if (p.price && p.areaSqft && p.areaSqft > 0) {
      return Math.round(p.price / p.areaSqft);
    }
    return null;
  };

  if (compareProperties.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', backgroundColor: '#EBF4EC', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
          <Scale size={36} />
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>
          No Properties in Comparison
        </h2>
        <p style={{ color: '#64748B', maxWidth: 480, margin: '0 auto 2rem auto', fontSize: '1rem', lineHeight: 1.6 }}>
          Select up to 3 properties while browsing to compare prices, floor areas, bedrooms, and verified credentials side by side.
        </p>
        <Link to="/search" className="btn-green btn-pill" style={{ padding: '0.75rem 2rem' }}>
          Browse Verified Properties
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F8FAFC', padding: '3.5rem 0 6rem 0', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4" style={{ marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: '#EBF4EC', color: '#166534', fontSize: '0.78rem', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: 20, marginBottom: '0.5rem' }}>
              <Scale size={13} /> Side-by-Side Analysis
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Property Comparison Matrix
            </h1>
            <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
              Comparing <strong>{compareProperties.length}</strong> selected properties with transparent specifications
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/search" className="btn-outline-green btn-sm" style={{ borderRadius: 10 }}>
              + Add Another Property
            </Link>
            <button onClick={clearCompare} className="btn-outline-gray btn-sm" style={{ borderRadius: 10, color: '#DC2626' }}>
              Clear Matrix
            </button>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div style={{ overflowX: 'auto', backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E2E8F0', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '1.75rem', width: 220, color: '#475569', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Specifications
                </th>
                {compareProperties.map(p => (
                  <th key={p.id} style={{ padding: '1.75rem', minWidth: 280, position: 'relative', verticalAlign: 'top' }}>
                    <button
                      onClick={() => toggleCompare(p.id)}
                      style={{ position: 'absolute', top: 16, right: 16, width: 28, height: 28, borderRadius: '50%', backgroundColor: '#FFFFFF', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}
                      title="Remove from comparison"
                    >
                      <X size={14} />
                    </button>
                    
                    <div style={{ height: 160, borderRadius: 14, overflow: 'hidden', marginBottom: '1rem', backgroundColor: '#0B1120' }}>
                      <img src={p.images[0]?.url} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div className="flex items-center gap-1.5" style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      <span>{p.propertyCode}</span>
                      {p.verified && <Shield size={12} style={{ color: '#166534' }} />}
                    </div>

                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.3, marginTop: 4, minHeight: '2.8rem' }}>
                      {p.title}
                    </div>

                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#166534', fontFamily: 'Outfit', marginTop: 4 }}>
                      {formatPrice(p)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ fontSize: '0.9rem' }}>
              
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '1.1rem 1.75rem', fontWeight: 700, color: '#475569' }}>Locality Corridor</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1.1rem 1.75rem', color: '#0F172A', fontWeight: 600 }}>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={15} style={{ color: '#166534' }} /> {p.location}
                    </div>
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
                <td style={{ padding: '1.1rem 1.75rem', fontWeight: 700, color: '#475569' }}>Property Category</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1.1rem 1.75rem', color: '#0F172A', fontWeight: 600 }}>
                    {p.propertyType.replace('_', ' ')}
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '1.1rem 1.75rem', fontWeight: 700, color: '#475569' }}>Super Built-up Area</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1.1rem 1.75rem', color: '#0F172A', fontWeight: 800, fontFamily: 'Outfit', fontSize: '1rem' }}>
                    {p.areaSqft.toLocaleString('en-IN')} sq.ft
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
                <td style={{ padding: '1.1rem 1.75rem', fontWeight: 700, color: '#475569' }}>Rate per Sq.ft</td>
                {compareProperties.map(p => {
                  const rate = getPricePerSqft(p);
                  return (
                    <td key={p.id} style={{ padding: '1.1rem 1.75rem', color: '#166534', fontWeight: 700 }}>
                      {rate ? `₹ ${rate.toLocaleString('en-IN')} / sq.ft` : '—'}
                    </td>
                  );
                })}
              </tr>

              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '1.1rem 1.75rem', fontWeight: 700, color: '#475569' }}>Bedrooms & Layout</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1.1rem 1.75rem', color: '#0F172A', fontWeight: 700 }}>
                    {p.bedrooms ? `${p.bedrooms} BHK` : 'Open Plot / Layout'}
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
                <td style={{ padding: '1.1rem 1.75rem', fontWeight: 700, color: '#475569' }}>Bathrooms</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1.1rem 1.75rem', color: '#0F172A' }}>
                    {p.bathrooms ? `${p.bathrooms} Luxury Baths` : '—'}
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '1.1rem 1.75rem', fontWeight: 700, color: '#475569' }}>Furnishing State</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1.1rem 1.75rem', color: '#0F172A' }}>
                    {p.furnishingStatus ? p.furnishingStatus.replace('_', ' ') : 'Semi-Furnished'}
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
                <td style={{ padding: '1.1rem 1.75rem', fontWeight: 700, color: '#475569' }}>Facing Orientation</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1.1rem 1.75rem', color: '#0F172A' }}>
                    {p.facingDirection ? p.facingDirection.replace('_', '-') : 'North-East Valley'}
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '1.1rem 1.75rem', fontWeight: 700, color: '#475569' }}>Title Verification</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1.1rem 1.75rem' }}>
                    <span className="badge badge-verified flex items-center gap-1" style={{ width: 'fit-content' }}>
                      <CheckCircle2 size={13} /> 100% Freehold Verified
                    </span>
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
                <td style={{ padding: '1.1rem 1.75rem', fontWeight: 700, color: '#475569' }}>Amenities & Features</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1.1rem 1.75rem', color: '#334155' }}>
                    <div className="flex flex-wrap gap-1.5" style={{ maxWidth: 260 }}>
                      {p.amenities.slice(0, 5).map(a => (
                        <span key={a} style={{ fontSize: '0.75rem', backgroundColor: '#FFFFFF', padding: '0.2rem 0.5rem', borderRadius: 6, border: '1px solid #E2E8F0' }}>
                          ✓ {a}
                        </span>
                      ))}
                      {p.amenities.length > 5 && (
                        <span style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 700 }}>
                          +{p.amenities.length - 5} more
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td style={{ padding: '1.75rem' }}>Actions</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1.75rem' }}>
                    <div className="flex flex-col gap-2">
                      <Link 
                        to={`/property/${p.id}`} 
                        className="btn-green w-full" 
                        style={{ width: '100%', borderRadius: 10, padding: '0.65rem 1rem', fontSize: '0.85rem' }}
                      >
                        View Full Dossier <ArrowRight size={14} />
                      </Link>
                      <a
                        href={`https://wa.me/918445190135?text=Hello%20A2%20Realtors%2C%20I%20am%20comparing%20Property%20${p.propertyCode}%20and%20need%20further%20guidance`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp btn-sm w-full flex items-center justify-center gap-1.5"
                        style={{ borderRadius: 10, padding: '0.6rem 1rem' }}
                      >
                        <MessageSquare size={14} /> Inquire on WhatsApp
                      </a>
                    </div>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
