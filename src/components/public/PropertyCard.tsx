import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Scale } from 'lucide-react';
import { Property } from '../../types';
import { useStore } from '../../context/StoreContext';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { favorites, toggleFavorite, compareList, toggleCompare } = useStore();

  const isFav = favorites.includes(property.id);
  const isComp = compareList.includes(property.id);

  const primaryImage = property.images?.find(i => i.isPrimary)?.url || property.images?.[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800';

  const formatPrice = (val: number) => {
    if (property.transactionType === 'RENT') {
      return property.priceDisplay || `₹${val.toLocaleString('en-IN')}/mo`;
    }
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  };

  return (
    <div 
      className="card" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        borderRadius: 16, 
        border: '1px solid #E2E8F0', 
        overflow: 'hidden', 
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        transition: 'all 0.25s ease'
      }}
    >
      
      {/* 1. 500x500 Square Featured Image Container */}
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          aspectRatio: '1 / 1', 
          maxHeight: 280,
          overflow: 'hidden', 
          backgroundColor: '#0B0F19' 
        }}
      >
        <img 
          src={primaryImage} 
          alt={property.title}
          width={500}
          height={500}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
        />

        {/* Favorite & Compare Overlay Icons */}
        <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6, zIndex: 2 }}>
          <button
            onClick={(e) => { e.preventDefault(); toggleCompare(property.id); }}
            title={isComp ? 'Remove from compare' : 'Add to compare'}
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              backgroundColor: isComp ? '#386635' : 'rgba(255,255,255,0.92)',
              color: isComp ? '#FFFFFF' : '#374151',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Scale size={13} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); toggleFavorite(property.id); }}
            title={isFav ? 'Remove from saved' : 'Save property'}
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              backgroundColor: isFav ? '#386635' : 'rgba(255,255,255,0.92)',
              color: isFav ? '#FFFFFF' : '#374151',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Heart size={13} fill={isFav ? '#FFFFFF' : 'none'} />
          </button>
        </div>
      </div>

      {/* 2. Content Padding Container */}
      <div style={{ padding: '1.1rem 1.1rem 1rem 1.1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        
        {/* Title */}
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', lineHeight: 1.25, marginBottom: '0.25rem' }}>
          <Link to={`/property/${property.id}`} style={{ color: 'inherit' }}>
            {property.title}
          </Link>
        </h3>

        {/* Location Pin & Text */}
        <div className="flex items-center gap-1" style={{ fontSize: '0.78rem', color: '#386635', fontWeight: 600, marginBottom: '0.75rem' }}>
          <MapPin size={13} style={{ color: '#386635', flexShrink: 0 }} />
          <span>{property.location}</span>
        </div>

        {/* Enclosed Specs Row: Bed 4 | Bath 2 | 1500 sqft */}
        <div 
          className="flex items-center justify-between" 
          style={{ 
            fontSize: '0.75rem', 
            color: '#6B7280', 
            padding: '0.45rem 0', 
            marginTop: 'auto',
            borderTop: '1px solid #F1F5F9', 
            borderBottom: '1px solid #F1F5F9' 
          }}
        >
          {property.bedrooms !== undefined ? (
            <span>🛏️ Bed {property.bedrooms}</span>
          ) : (
            <span>🏠 Villa</span>
          )}
          <span style={{ color: '#E2E8F0' }}>|</span>
          {property.bathrooms !== undefined ? (
            <span>🚿 Bath {property.bathrooms}</span>
          ) : (
            <span>📜 Title</span>
          )}
          <span style={{ color: '#E2E8F0' }}>|</span>
          <span>📐 {property.areaSqft} sqft</span>
        </div>

        {/* Price & View More Pill Button */}
        <div className="flex items-center justify-between" style={{ paddingTop: '0.75rem' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', fontFamily: 'Outfit, sans-serif' }}>
            {formatPrice(property.price)}
          </div>
          
          <Link 
            to={`/property/${property.id}`} 
            style={{ 
              borderRadius: 20, 
              padding: '0.35rem 0.9rem', 
              fontSize: '0.75rem', 
              fontWeight: 600,
              border: '1px solid #CBD5E1',
              color: '#475569',
              backgroundColor: '#FFFFFF',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#386635';
              e.currentTarget.style.color = '#386635';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#CBD5E1';
              e.currentTarget.style.color = '#475569';
            }}
          >
            View More
          </Link>
        </div>

      </div>

    </div>
  );
};
