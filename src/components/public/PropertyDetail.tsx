import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Bed, Bath, Maximize2, CheckCircle2, Phone, MessageSquare, 
  Calendar, ShieldCheck, FileText, Share2, Heart, Scale, User, School, 
  Building2, ShoppingBag, Car, Compass, Clock, Award, ArrowLeft, ArrowRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PropertyCard } from './PropertyCard';

export const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { properties, submitPropertyEnquiry, scheduleSiteVisit, toggleFavorite, favorites, toggleCompare, compareList } = useStore();

  const property = properties.find(p => p.id === id || p.propertyCode === id || p.slug === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [showSiteVisitModal, setShowSiteVisitModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requirement, setRequirement] = useState('');

  // Site Visit Modal states
  const [visitDate, setVisitDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [visitTime, setVisitTime] = useState('11:00 AM');

  if (!property) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>Property Not Found</h2>
        <p style={{ color: '#64748B', margin: '1rem 0' }}>The property listing you are looking for does not exist or has been archived.</p>
        <Link to="/search" className="btn-green btn-pill">Back to Search</Link>
      </div>
    );
  }

  const isFav = favorites.includes(property.id);
  const isComp = compareList.includes(property.id);

  // Similar properties in same locality or category
  const similarProperties = properties
    .filter(p => p.id !== property.id && p.published && (p.location === property.location || p.propertyType === property.propertyType))
    .slice(0, 3);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    submitPropertyEnquiry({
      propertyId: property.id,
      name,
      phone,
      email,
      requirement
    });
    setEnquirySuccess(true);
  };

  const handleBookVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    
    submitPropertyEnquiry({
      propertyId: property.id,
      name,
      phone,
      email,
      requirement: `SITE VISIT REQUESTED for ${visitDate} at ${visitTime}`
    });

    scheduleSiteVisit({
      propertyId: property.id,
      customerName: name,
      customerPhone: phone,
      visitDate,
      visitTime
    });

    setShowSiteVisitModal(false);
    setEnquirySuccess(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const currentImage = property.images[activeImageIndex]?.url || property.images[0]?.url;

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
      
      {/* 1. Breadcrumb & Navigation Bar */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0.9rem 0' }}>
        <div className="container flex flex-wrap items-center justify-between gap-4" style={{ fontSize: '0.85rem', color: '#64748B' }}>
          <div>
            <Link to="/" style={{ color: '#64748B' }}>Home</Link>
            <span style={{ margin: '0 6px' }}>/</span>
            <Link to="/search" style={{ color: '#64748B' }}>Properties</Link>
            <span style={{ margin: '0 6px' }}>/</span>
            <span style={{ color: '#0F172A', fontWeight: 700 }}>{property.propertyCode} ({property.title})</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button 
              onClick={handleShare}
              className="btn-outline-gray btn-sm flex items-center gap-1.5"
            >
              <Share2 size={14} />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button 
              onClick={() => toggleCompare(property.id)} 
              className="btn-outline-gray btn-sm flex items-center gap-1.5"
            >
              <Scale size={14} style={{ color: isComp ? '#386635' : 'inherit' }} />
              <span>{isComp ? 'In Comparison' : 'Compare'}</span>
            </button>

            <button 
              onClick={() => toggleFavorite(property.id)} 
              className="btn-outline-gray btn-sm flex items-center gap-1.5"
            >
              <Heart size={14} fill={isFav ? '#DC2626' : 'none'} style={{ color: isFav ? '#DC2626' : 'inherit' }} />
              <span>{isFav ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem' }}>
        
        {/* 2. Property Header: Title, Locality & Pricing */}
        <div className="flex flex-wrap items-start justify-between gap-6" style={{ marginBottom: '1.75rem' }}>
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '0.65rem' }}>
              <span className="badge badge-featured">
                {property.transactionType === 'RENT' ? 'For Rent' : 'For Sale'}
              </span>
              {property.verified && (
                <span className="badge badge-verified flex items-center gap-1">
                  <CheckCircle2 size={13} /> 100% Freehold Title Verified
                </span>
              )}
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>
                Code: <strong>{property.propertyCode}</strong>
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
              {property.title}
            </h1>

            <div className="flex items-center gap-2" style={{ color: '#386635', fontSize: '1rem', fontWeight: 600, marginTop: '0.4rem' }}>
              <MapPin size={16} />
              <span>{property.address || `${property.location}, Dehradun, Uttarakhand`}</span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#386635', fontFamily: 'Outfit, sans-serif' }}>
              Price on Request
            </div>
            <div style={{ fontSize: '0.88rem', color: '#64748B', fontWeight: 600, marginTop: 4 }}>
              Exclusive & Confidential Pricing
            </div>
          </div>
        </div>

        {/* 3. Luxury Image Gallery: Main Preview + Thumbnail Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4" style={{ marginBottom: '3rem' }}>
          
          {/* Main Large Photo */}
          <div 
            className="lg:col-span-9" 
            style={{ 
              position: 'relative', 
              height: 480, 
              borderRadius: 20, 
              overflow: 'hidden', 
              backgroundColor: '#0B1120',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}
          >
            <img 
              src={currentImage} 
              alt={property.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {property.images[activeImageIndex]?.caption && (
              <div 
                style={{ 
                  position: 'absolute', 
                  bottom: 16, 
                  left: 16, 
                  backgroundColor: 'rgba(11,17,32,0.85)', 
                  color: '#FFFFFF', 
                  padding: '0.5rem 1rem', 
                  borderRadius: 10, 
                  fontSize: '0.85rem', 
                  fontWeight: 600,
                  backdropFilter: 'blur(8px)' 
                }}
              >
                📷 {property.images[activeImageIndex].caption}
              </div>
            )}
          </div>

          {/* Vertical Thumbnail Rail */}
          <div className="lg:col-span-3 flex lg:flex-col gap-3" style={{ height: 480, overflowY: 'auto' }}>
            {property.images.map((img, idx) => (
              <div
                key={img.id || idx}
                onClick={() => setActiveImageIndex(idx)}
                style={{
                  height: 110,
                  borderRadius: 14,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: activeImageIndex === idx ? '3px solid #386635' : '2px solid transparent',
                  opacity: activeImageIndex === idx ? 1 : 0.7,
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
              >
                <img src={img.url} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>

        </div>

        {/* 4. Main Body: Specs, Details & Financial Calculator vs Sticky Lead Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT 8 COLUMNS: Property Deep Dive */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Key Specs Bar */}
            <div className="card-luxury" style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
                Key Specifications
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ textAlign: 'center' }}>
                <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem 1rem', borderRadius: 14, border: '1px solid #F1F5F9' }}>
                  <Bed size={24} style={{ color: '#386635', margin: '0 auto 0.4rem auto' }} />
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>{property.bedrooms || '—'} Beds</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Bedrooms</div>
                </div>

                <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem 1rem', borderRadius: 14, border: '1px solid #F1F5F9' }}>
                  <Bath size={24} style={{ color: '#386635', margin: '0 auto 0.4rem auto' }} />
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>{property.bathrooms || '—'} Baths</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Bathrooms</div>
                </div>

                <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem 1rem', borderRadius: 14, border: '1px solid #F1F5F9' }}>
                  <Maximize2 size={24} style={{ color: '#386635', margin: '0 auto 0.4rem auto' }} />
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>{property.areaSqft.toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Super Area (sq.ft)</div>
                </div>

                <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem 1rem', borderRadius: 14, border: '1px solid #F1F5F9' }}>
                  <Car size={24} style={{ color: '#386635', margin: '0 auto 0.4rem auto' }} />
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>{property.parkingSpaces || 1} Covered</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Parking Spaces</div>
                </div>
              </div>

              {/* Extra Property Attributes */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #F1F5F9', fontSize: '0.85rem' }}>
                <div><span style={{ color: '#64748B' }}>Property Facing:</span> <strong style={{ color: '#0F172A' }}>{property.facingDirection ? property.facingDirection.replace('_', '-') : 'North-East (Valley)'}</strong></div>
                <div><span style={{ color: '#64748B' }}>Furnishing State:</span> <strong style={{ color: '#0F172A' }}>{property.furnishingStatus ? property.furnishingStatus.replace('_', ' ') : 'Semi-Furnished Luxury'}</strong></div>
                <div><span style={{ color: '#64748B' }}>Possession / Status:</span> <strong style={{ color: '#0F172A' }}>{property.constructionStatus ? property.constructionStatus.replace('_', ' ') : 'Ready to Move'}</strong></div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="card-luxury" style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>
                Detailed Property Overview
              </h3>
              <div style={{ whiteSpace: 'pre-line', lineHeight: '1.8', color: '#334155', fontSize: '1rem' }}>
                {property.description}
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="card-luxury" style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
                Amenities & Premium Features
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map(amenity => (
                  <div 
                    key={amenity} 
                    className="flex items-center gap-2.5" 
                    style={{ 
                      backgroundColor: '#F8FAFC', 
                      padding: '0.75rem 1rem', 
                      borderRadius: 12, 
                      fontSize: '0.88rem', 
                      color: '#0F172A',
                      fontWeight: 600,
                      border: '1px solid #F1F5F9' 
                    }}
                  >
                    <CheckCircle2 size={16} style={{ color: '#386635', flexShrink: 0 }} />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Neighborhood Highlights with Map Embed */}
            <div className="card-luxury" style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
                Neighborhood & Strategic Location
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                Prime address in <strong>{property.location}</strong>. Landmark: {property.landmark || 'Dehradun VIP Residential Corridor'}.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ marginBottom: '1.75rem' }}>
                <div className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#334155' }}>
                  <School size={16} style={{ color: '#386635' }} /> Top Schools &lt; 2 km
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#334155' }}>
                  <Building2 size={16} style={{ color: '#386635' }} /> Max Hospital 10 min
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#334155' }}>
                  <ShoppingBag size={16} style={{ color: '#386635' }} /> Pacific Mall 12 min
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#334155' }}>
                  <Car size={16} style={{ color: '#386635' }} /> Jolly Grant Airport 40 min
                </div>
              </div>

              {/* Map Embed */}
              <div style={{ width: '100%', height: 280, borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                <iframe
                  title="Property Location"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.address || property.location + ' Dehradun')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
            </div>

            {/* Confidential Price & Acquisition Advisory Card */}
            <div className="card-luxury" style={{ padding: '2.5rem', backgroundColor: '#F8FAFC', borderRadius: 20 }}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
                    Confidential Pricing & Acquisition Dossier
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '0.95rem', maxWidth: 540, lineHeight: 1.6 }}>
                    Request the verified pricing breakdown, developer terms, floor layouts, and site visit coordinates directly from our senior advisory team.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://wa.me/918445190135?text=Hi%20A2%20Realtors%2C%20I%20would%20like%20to%20request%20the%20official%20pricing%20dossier%20for%20Property%20${property.propertyCode}%20(${encodeURIComponent(property.title)})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                    style={{ padding: '0.75rem 1.4rem', borderRadius: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  >
                    <MessageSquare size={16} />
                    <span>Request Price</span>
                  </a>
                  <button
                    onClick={() => setShowSiteVisitModal(true)}
                    className="btn-green"
                    style={{ padding: '0.75rem 1.4rem', borderRadius: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  >
                    <Calendar size={16} />
                    <span>Schedule Visit</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT 4 COLUMNS: Sticky Lead Capture & Consultant Card */}
          <div className="lg:col-span-4 flex flex-col gap-6" style={{ alignSelf: 'start', position: 'sticky', top: 90 }}>
            
            {/* Sticky Lead Capture Widget */}
            <div 
              className="card-luxury" 
              style={{ 
                padding: '2rem', 
                backgroundColor: '#FFFFFF', 
                borderRadius: 20,
                border: '2px solid rgba(56,102,53,0.3)',
                boxShadow: '0 20px 40px rgba(56,102,53,0.1)'
              }}
            >
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
                Inquire on this Listing
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
                Schedule a private viewing or speak with our senior valley advisor.
              </p>

              {enquirySuccess ? (
                <div style={{ backgroundColor: '#EBF4EC', border: '1px solid #A7F3D0', padding: '1.5rem', borderRadius: 16, color: '#1B4332', textAlign: 'center' }}>
                  <CheckCircle2 size={36} style={{ color: '#386635', margin: '0 auto 0.75rem auto' }} />
                  <strong style={{ display: 'block', fontSize: '1.1rem' }}>Inquiry Received!</strong>
                  <p style={{ fontSize: '0.85rem', marginTop: 4, color: '#475569' }}>
                    Our property specialist will contact you on <strong>{phone}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit}>
                  
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Alok Aggarwal"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98970 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Specific Query / Note</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. I want to inspect property title deed..."
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      className="form-textarea"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-green w-full" 
                    style={{ width: '100%', borderRadius: 12, padding: '0.8rem', marginBottom: '0.75rem' }}
                  >
                    <Phone size={16} /> Request Callback
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowSiteVisitModal(true)}
                    className="btn-outline-green w-full"
                    style={{ width: '100%', borderRadius: 12, padding: '0.8rem' }}
                  >
                    <Calendar size={16} /> Book Guided Site Visit
                  </button>

                </form>
              )}

            </div>

            {/* Assigned Consultant Card */}
            <div className="card-luxury" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                Assigned Valley Specialist
              </div>
              
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                  alt={property.assignedAgentName || 'Priya Verma'}
                  style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid #386635' }}
                />
                <div>
                  <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '1.05rem' }}>
                    {property.assignedAgentName || 'Priya Verma'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Senior Property Consultant</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#386635', marginTop: 2 }}>
                    +91 84451 90135
                  </div>
                </div>
              </div>

              <div className="flex gap-2" style={{ marginTop: '1.25rem' }}>
                <a href="tel:+918445190135" className="btn-dark btn-sm flex-1" style={{ borderRadius: 10 }}>
                  <Phone size={14} /> Call
                </a>
                <a
                  href={`https://wa.me/918445190135?text=Hi%20${property.assignedAgentName || 'Priya'}%2C%20I%20am%20inquiring%20about%20Property%20${property.propertyCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp btn-sm flex-1 flex items-center justify-center gap-1"
                  style={{ borderRadius: 10 }}
                >
                  <MessageSquare size={14} /> WhatsApp
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* 5. SIMILAR PROPERTIES RECOMMENDATIONS */}
        {similarProperties.length > 0 && (
          <div style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid #E2E8F0' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                  Similar Properties in {property.location}
                </h3>
              </div>
              <Link to="/search" className="btn-outline-green btn-pill" style={{ padding: '0.5rem 1.25rem' }}>
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map(sim => (
                <PropertyCard key={sim.id} property={sim} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* BOOK SITE VISIT MODAL */}
      {showSiteVisitModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,17,32,0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(6px)' }}>
          <div className="glass-panel" style={{ maxWidth: 500, width: '100%', padding: '2.5rem', borderRadius: 24, color: '#0F172A' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem' }}>
              Schedule Chauffeured Site Visit
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
              Choose your preferred date to inspect <strong>{property.title}</strong> with our senior consultant.
            </p>

            <form onSubmit={handleBookVisitSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">Visit Date *</label>
                  <input type="date" required value={visitDate} onChange={(e) => setVisitDate(e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Time *</label>
                  <select value={visitTime} onChange={(e) => setVisitTime(e.target.value)} className="form-select">
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2" style={{ marginTop: '1.75rem' }}>
                <button type="button" onClick={() => setShowSiteVisitModal(false)} className="btn-outline-gray flex-1" style={{ borderRadius: 12 }}>
                  Cancel
                </button>
                <button type="submit" className="btn-green flex-1" style={{ borderRadius: 12 }}>
                  Confirm Site Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
