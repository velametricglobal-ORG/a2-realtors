import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Scale, Bed, Bath, Maximize2, CheckCircle2, MessageSquare, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Property } from '../../types';
import { useStore } from '../../context/StoreContext';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { favorites, toggleFavorite, compareList, toggleCompare } = useStore();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const isFav = favorites.includes(property.id);
  const isComp = compareList.includes(property.id);

  const allImages = property.images && property.images.length > 0
    ? property.images.map(i => i.url)
    : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'];

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div 
      className="card-luxury" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        borderRadius: 20, 
        overflow: 'hidden', 
        backgroundColor: '#FFFFFF',
        position: 'relative'
      }}
    >
      
      {/* 1. Image Container with Multi-Photo Carousel & Luxury Tags */}
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          aspectRatio: '4 / 3', 
          overflow: 'hidden', 
          backgroundColor: '#0B1120' 
        }}
      >
        <img 
          src={allImages[currentImgIndex]} 
          alt={property.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
        />

        {/* Carousel Navigation Arrows (visible if > 1 image) */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              aria-label="Previous Image"
              style={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: 'rgba(11, 17, 32, 0.7)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3,
                backdropFilter: 'blur(4px)'
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNextImage}
              aria-label="Next Image"
              style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: 'rgba(11, 17, 32, 0.7)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3,
                backdropFilter: 'blur(4px)'
              }}
            >
              <ChevronRight size={16} />
            </button>

            {/* Pagination Dots */}
            <div 
              style={{ 
                position: 'absolute', 
                bottom: 10, 
                left: '50%', 
                transform: 'translateX(-50%)', 
                display: 'flex', 
                gap: 4, 
                zIndex: 3 
              }}
            >
              {allImages.slice(0, 5).map((_, idx) => (
                <span
                  key={idx}
                  style={{
                    width: currentImgIndex === idx ? 16 : 6,
                    height: 5,
                    borderRadius: 4,
                    backgroundColor: currentImgIndex === idx ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Top Badges: Transaction Type & Verified */}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6, zIndex: 2 }}>
          <span 
            style={{
              backgroundColor: property.transactionType === 'RENT' ? '#0F172A' : '#1B4332',
              color: '#FFFFFF',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '0.3rem 0.65rem',
              borderRadius: 20,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            {property.transactionType === 'RENT' ? 'For Rent' : 'For Sale'}
          </span>

          {property.featured && (
            <span 
              style={{
                backgroundColor: '#DFB76C',
                color: '#0F172A',
                fontSize: '0.68rem',
                fontWeight: 800,
                padding: '0.25rem 0.6rem',
                borderRadius: 20,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                boxShadow: '0 2px 8px rgba(223, 183, 108, 0.35)'
              }}
            >
              Featured
            </span>
          )}
        </div>

        {/* Action Icons: Favorite & Compare */}
        <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6, zIndex: 2 }}>
          <button
            onClick={(e) => { e.preventDefault(); toggleCompare(property.id); }}
            title={isComp ? 'Remove from comparison' : 'Compare property'}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: isComp ? '#386635' : 'rgba(255, 255, 255, 0.92)',
              color: isComp ? '#FFFFFF' : '#1E293B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              backdropFilter: 'blur(4px)'
            }}
          >
            <Scale size={14} />
          </button>
          
          <button
            onClick={(e) => { e.preventDefault(); toggleFavorite(property.id); }}
            title={isFav ? 'Remove from saved' : 'Save property'}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: isFav ? '#DC2626' : 'rgba(255, 255, 255, 0.92)',
              color: isFav ? '#FFFFFF' : '#1E293B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              backdropFilter: 'blur(4px)'
            }}
          >
            <Heart size={14} fill={isFav ? '#FFFFFF' : 'none'} />
          </button>
        </div>

      </div>

      {/* 2. Content Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        
        {/* Verified Title & Property Code */}
        <div className="flex items-center justify-between" style={{ marginBottom: '0.4rem', fontSize: '0.74rem' }}>
          <span style={{ color: '#64748B', fontWeight: 600 }}>ID: {property.propertyCode}</span>
          {property.verified && (
            <span className="flex items-center gap-1" style={{ color: '#2D6A4F', fontWeight: 700 }}>
              <CheckCircle2 size={13} /> Verified Title
            </span>
          )}
        </div>

        {/* Title */}
        <h3 
          style={{ 
            fontSize: '1.1rem', 
            fontWeight: 800, 
            color: '#0F172A', 
            lineHeight: 1.35, 
            marginBottom: '0.4rem',
            minHeight: '2.8rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          <Link to={`/property/${property.id}`} style={{ color: 'inherit' }}>
            {property.title}
          </Link>
        </h3>

        {/* Location Pin */}
        <div className="flex items-center gap-1.5" style={{ fontSize: '0.82rem', color: '#386635', fontWeight: 600, marginBottom: '0.85rem' }}>
          <MapPin size={14} style={{ flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {property.location}, Dehradun
          </span>
        </div>

        {/* Specs Pill Grid */}
        <div 
          className="flex items-center justify-between" 
          style={{ 
            fontSize: '0.78rem', 
            color: '#475569', 
            padding: '0.65rem 0.75rem', 
            backgroundColor: '#F8FAFC',
            borderRadius: 10,
            border: '1px solid #F1F5F9',
            marginTop: 'auto',
            marginBottom: '1rem'
          }}
        >
          <div className="flex items-center gap-1">
            <Bed size={15} style={{ color: '#C5A059' }} />
            <span>{property.bedrooms ? `${property.bedrooms} Beds` : 'Villa'}</span>
          </div>
          <span style={{ color: '#CBD5E1' }}>•</span>
          <div className="flex items-center gap-1">
            <Bath size={15} style={{ color: '#C5A059' }} />
            <span>{property.bathrooms ? `${property.bathrooms} Baths` : 'Clear'}</span>
          </div>
          <span style={{ color: '#CBD5E1' }}>•</span>
          <div className="flex items-center gap-1">
            <Maximize2 size={14} style={{ color: '#C5A059' }} />
            <span>{property.areaSqft} sqft</span>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between" style={{ paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9' }}>
          <div>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#386635' }}>
              Price on Request
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/918445190135?text=Hi%20A2%20Realtors%2C%20I%20am%20interested%20in%20Property%20${property.propertyCode}%20(${encodeURIComponent(property.title)})`}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp"
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(37,211,102,0.3)'
              }}
            >
              <MessageSquare size={15} />
            </a>

            <Link 
              to={`/property/${property.id}`} 
              className="btn-outline-green btn-sm"
              style={{ borderRadius: 20, padding: '0.45rem 1rem', fontWeight: 600 }}
            >
              <span>View Details</span>
              <Eye size={13} />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
