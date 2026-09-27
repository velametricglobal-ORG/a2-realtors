import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, X, Check, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const PropertyCompare: React.FC = () => {
  const { properties, compareList, toggleCompare, clearCompare } = useStore();

  const compareProperties = properties.filter(p => compareList.includes(p.id));

  if (compareProperties.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <Scale size={48} style={{ color: '#D97706', margin: '0 auto 1rem auto' }} />
        <h2 style={{ fontSize: '1.8rem', color: '#0F172A', marginBottom: '0.5rem' }}>No Properties Selected for Comparison</h2>
        <p style={{ color: '#64748B', maxWidth: 460, margin: '0 auto 1.5rem auto' }}>
          Select up to 3 properties while browsing listings to compare price, location, bedrooms, area sq.ft, and amenities side by side.
        </p>
        <Link to="/search" className="btn btn-primary">Browse Properties to Compare</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F8FAFC', padding: '3rem 0 6rem 0' }}>
      <div className="container">
        
        <div className="flex items-center justify-between" style={{ marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>Property Comparison Matrix</h1>
            <p style={{ color: '#64748B' }}>Comparing {compareProperties.length} selected properties</p>
          </div>
          <button onClick={clearCompare} className="btn btn-outline btn-sm" style={{ color: '#EF4444' }}>
            Clear Comparison Table
          </button>
        </div>

        {/* Comparison Matrix Table */}
        <div style={{ overflowX: 'auto', backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '1.5rem', width: 220, color: '#475569', fontSize: '0.88rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Property Specifications
                </th>
                {compareProperties.map(p => (
                  <th key={p.id} style={{ padding: '1.5rem', minWidth: 260, position: 'relative', verticalAlign: 'top' }}>
                    <button
                      onClick={() => toggleCompare(p.id)}
                      style={{ position: 'absolute', top: 12, right: 12, width: 26, height: 26, borderRadius: '50%', backgroundColor: '#F1F5F9', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none' }}
                      title="Remove from comparison"
                    >
                      <X size={14} />
                    </button>
                    <img src={p.images[0]?.url} alt={p.title} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 12, marginBottom: '0.85rem' }} />
                    <div style={{ fontSize: '0.78rem', color: '#386635', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.propertyCode}</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.3, marginTop: 2, minHeight: '2.6rem' }}>{p.title}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#386635', marginTop: 4 }}>Price on Request</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ fontSize: '0.9rem' }}>
              
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#334155' }}>Locality</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1rem 1.25rem', color: '#0F172A' }}>{p.location}</td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#334155' }}>Property Type</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1rem 1.25rem', color: '#0F172A' }}>{p.propertyType.replace('_', ' ')}</td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#334155' }}>Super Area</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1rem 1.25rem', color: '#0F172A', fontWeight: 700 }}>{p.areaSqft.toLocaleString('en-IN')} sq.ft</td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#334155' }}>Bedrooms</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1rem 1.25rem', color: '#0F172A' }}>{p.bedrooms || '-'} BHK</td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#334155' }}>Bathrooms</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1rem 1.25rem', color: '#0F172A' }}>{p.bathrooms || '-'} Baths</td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#334155' }}>Furnishing</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1rem 1.25rem', color: '#0F172A' }}>{p.furnishingStatus || 'Semi Furnished'}</td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#334155' }}>Facing Direction</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1rem 1.25rem', color: '#0F172A' }}>{p.facingDirection || 'East'}</td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#334155' }}>Amenities Count</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1rem 1.25rem', color: '#0F172A' }}>{p.amenities.length} Features</td>
                ))}
              </tr>

              <tr>
                <td style={{ padding: '1.25rem' }}>Action</td>
                {compareProperties.map(p => (
                  <td key={p.id} style={{ padding: '1.25rem' }}>
                    <Link to={`/property/${p.id}`} className="btn btn-primary btn-sm w-full" style={{ width: '100%' }}>
                      View Details <ArrowRight size={14} />
                    </Link>
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
