import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, TrendingUp, Home, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PropertyCard } from './PropertyCard';

export const LocalityPage: React.FC = () => {
  const { localitySlug } = useParams<{ localitySlug: string }>();
  const { locations, properties } = useStore();

  const locality = locations.find(l => l.slug === localitySlug || l.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === localitySlug);

  if (!locality) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2>Locality Not Found</h2>
        <p style={{ color: '#64748B', margin: '1rem 0' }}>The requested Dehradun neighborhood page could not be located.</p>
        <Link to="/search" className="btn btn-primary">Browse All Properties</Link>
      </div>
    );
  }

  const localityProperties = properties.filter(p => p.published && p.location.toLowerCase().includes(locality.name.toLowerCase()));

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
      
      {/* Locality Hero Banner */}
      <div style={{ position: 'relative', backgroundColor: '#0F172A', color: '#FFFFFF', padding: '4.5rem 0 3.5rem 0', overflow: 'hidden' }}>
        <img 
          src={locality.coverImage} 
          alt={locality.name}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Link to="/search" className="flex items-center gap-1" style={{ color: '#D97706', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>
            <ArrowLeft size={16} /> Back to Search
          </Link>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.75rem' }}>
            Properties in <span style={{ color: '#D97706' }}>{locality.name}</span>, Dehradun
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#CBD5E1', maxWidth: 780, lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {locality.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="card" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFF', padding: '0.75rem 1.25rem', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>Average Market Benchmark</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FEF3C7' }}>₹{locality.avgPricePerSqft.toLocaleString('en-IN')}/sq.ft</div>
            </div>
            <div className="card" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFF', padding: '0.75rem 1.25rem', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>Active Verified Listings</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FEF3C7' }}>{localityProperties.length} Properties</div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Results for Locality */}
      <div className="container" style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem' }}>
          Available Properties in {locality.name}
        </h2>

        {localityProperties.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
            <h3>No active listings currently available in {locality.name}</h3>
            <p style={{ color: '#64748B', margin: '0.5rem 0 1.5rem 0' }}>Submit a buyer requirement and our consultants will source off-market properties for you.</p>
            <Link to="/contact" className="btn btn-primary">Tell Us Your Requirement</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {localityProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
