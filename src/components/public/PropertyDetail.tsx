import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Bed, Bath, Maximize2, CheckCircle2, Phone, MessageSquare, 
  Calendar, ShieldCheck, FileText, Share2, Heart, Scale, User, School, 
  Building2, ShoppingBag, Car, Compass, Clock, Award, ArrowLeft, ArrowRight,
  Calculator, X, ChevronLeft, ChevronRight, Sparkles, Check, Download, Layers
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PropertyCard } from './PropertyCard';

export const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { properties, submitPropertyEnquiry, scheduleSiteVisit, toggleFavorite, favorites, toggleCompare, compareList } = useStore();

  const property = properties.find(p => p.id === id || p.propertyCode === id || p.slug === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [showSiteVisitModal, setShowSiteVisitModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'amenities' | 'emi' | 'map'>('overview');

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requirement, setRequirement] = useState('');

  // Site Visit Modal states
  const [visitDate, setVisitDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [visitTime, setVisitTime] = useState('11:00 AM');

  // In-page EMI Calculator states
  const initialPrice = property?.price && property.price > 0 ? property.price : 15000000;
  const [calcPrice, setCalcPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanInterestRate, setLoanInterestRate] = useState<number>(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(20);

  // Sync loan calculation when property loads
  useEffect(() => {
    if (property?.price && property.price > 0) {
      setCalcPrice(property.price);
    }
  }, [property?.price]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen || !property) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') {
        setActiveImageIndex(prev => (prev + 1) % property.images.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex(prev => (prev - 1 + property.images.length) % property.images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, property]);

  if (!property) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>Property Not Found</h2>
        <p style={{ color: '#64748B', margin: '1rem 0' }}>The property listing you are looking for does not exist or has been archived.</p>
        <Link to="/search" className="btn-green btn-pill">Back to All Properties</Link>
      </div>
    );
  }

  const isFav = favorites.includes(property.id);
  const isComp = compareList.includes(property.id);

  // Similar properties in same locality or category
  const similarProperties = properties
    .filter(p => p.id !== property.id && p.published && (p.location === property.location || p.propertyType === property.propertyType))
    .slice(0, 3);

  // Formatted price
  const formattedPrice = property.priceDisplay || (
    property.price > 0
      ? (property.price >= 10000000
          ? `₹ ${(property.price / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`
          : `₹ ${(property.price / 100000).toFixed(1).replace(/\.0$/, '')} Lakhs`)
      : 'Price on Request'
  );

  const pricePerSqft = (property.price && property.areaSqft && property.areaSqft > 0)
    ? `₹ ${Math.round(property.price / property.areaSqft).toLocaleString('en-IN')} / sq.ft`
    : null;

  // EMI formula computation
  const downPaymentAmount = (calcPrice * downPaymentPercent) / 100;
  const loanPrincipal = calcPrice - downPaymentAmount;
  const monthlyRate = loanInterestRate / (12 * 100);
  const totalMonths = loanTenureYears * 12;
  const calculatedEMI = Math.round(
    (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

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
      
      {/* 1. BREADCRUMB & QUICK ACTIONS */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0.85rem 0' }}>
        <div className="container flex flex-wrap items-center justify-between gap-4" style={{ fontSize: '0.85rem', color: '#64748B' }}>
          <div className="flex items-center gap-2">
            <Link to="/" style={{ color: '#64748B' }}>Home</Link>
            <span>/</span>
            <Link to="/search" style={{ color: '#64748B' }}>Properties</Link>
            <span>/</span>
            <span style={{ color: '#166534', fontWeight: 700 }}>{property.location}</span>
            <span>/</span>
            <span style={{ color: '#0F172A', fontWeight: 800 }}>{property.propertyCode}</span>
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
              <Scale size={14} style={{ color: isComp ? '#166534' : 'inherit' }} />
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
        
        {/* 2. PROPERTY HEADER */}
        <div className="flex flex-wrap items-start justify-between gap-6" style={{ marginBottom: '1.75rem' }}>
          <div style={{ maxWidth: 800 }}>
            
            {/* Status Pills */}
            <div className="flex items-center gap-2" style={{ marginBottom: '0.65rem', flexWrap: 'wrap' }}>
              <span className="badge badge-featured">
                {property.transactionType === 'RENT' ? 'For Rent' : 'For Sale'}
              </span>
              {property.verified && (
                <span className="badge badge-verified flex items-center gap-1">
                  <CheckCircle2 size={13} /> 100% Freehold Title Verified
                </span>
              )}
              {property.featured && (
                <span className="badge-gold flex items-center gap-1">
                  <Sparkles size={12} /> Prime Mandate
                </span>
              )}
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>
                Code: <strong>{property.propertyCode}</strong>
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              {property.title}
            </h1>

            <div className="flex items-center gap-2" style={{ color: '#166534', fontSize: '1rem', fontWeight: 600, marginTop: '0.4rem' }}>
              <MapPin size={16} />
              <span>{property.address || `${property.location}, Dehradun, Uttarakhand`}</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 800, color: '#166534', fontFamily: 'Outfit, sans-serif' }}>
              {formattedPrice}
            </div>
            {pricePerSqft ? (
              <div style={{ fontSize: '0.92rem', color: '#64748B', fontWeight: 700, marginTop: 2 }}>
                {pricePerSqft} • All Inclusive
              </div>
            ) : (
              <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600, marginTop: 2 }}>
                Exclusive & Confidential Terms
              </div>
            )}
          </div>
        </div>

        {/* 3. LUXURY IMAGE GALLERY WITH LIGHTBOX TRIGGER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4" style={{ marginBottom: '2.5rem' }}>
          
          {/* Main Large Photo with Zoom Click */}
          <div 
            className="lg:col-span-9" 
            style={{ 
              position: 'relative', 
              height: 480, 
              borderRadius: 20, 
              overflow: 'hidden', 
              backgroundColor: '#0B1120',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              cursor: 'zoom-in'
            }}
            onClick={() => setLightboxOpen(true)}
          >
            <img 
              src={currentImage} 
              alt={property.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
            />

            {/* Click to expand pill */}
            <div 
              style={{ 
                position: 'absolute', 
                top: 16, 
                right: 16, 
                backgroundColor: 'rgba(11,17,32,0.85)', 
                color: '#FFFFFF', 
                padding: '0.4rem 0.85rem', 
                borderRadius: 20, 
                fontSize: '0.78rem', 
                fontWeight: 700,
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                gap: 5
              }}
            >
              <Maximize2 size={13} /> Click to View Fullscreen ({property.images.length} photos)
            </div>

            {/* Caption */}
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
                  border: activeImageIndex === idx ? '3px solid #166534' : '2px solid transparent',
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

        {/* 4. IN-PAGE TABS NAVIGATION BAR */}
        <div 
          className="flex items-center gap-2" 
          style={{ 
            backgroundColor: '#FFFFFF', 
            padding: '0.5rem', 
            borderRadius: 16, 
            border: '1px solid #E2E8F0', 
            marginBottom: '2rem',
            overflowX: 'auto'
          }}
        >
          {[
            { id: 'overview', label: 'Overview & Specs' },
            { id: 'amenities', label: 'Amenities' },
            { id: 'emi', label: 'Mortgage & EMI Estimator' },
            { id: 'map', label: 'Location & Map' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: 12,
                fontSize: '0.88rem',
                fontWeight: 700,
                border: 'none',
                backgroundColor: activeTab === tab.id ? '#166534' : 'transparent',
                color: activeTab === tab.id ? '#FFFFFF' : '#475569',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 5. MAIN BODY: LEFT CONTENT VS RIGHT STICKY LEAD CAPTURE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT 8 COLUMNS: PROPERTY CONTENT */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* TAB: Overview & Key Specs */}
            {(activeTab === 'overview' || activeTab === 'specs') && (
              <>
                {/* Key Specs Card */}
                <div className="card-luxury" style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
                    Key Property Specifications
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ textAlign: 'center' }}>
                    <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem 1rem', borderRadius: 14, border: '1px solid #F1F5F9' }}>
                      <Bed size={24} style={{ color: '#166534', margin: '0 auto 0.4rem auto' }} />
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>{property.bedrooms || '—'} Beds</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Bedrooms</div>
                    </div>

                    <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem 1rem', borderRadius: 14, border: '1px solid #F1F5F9' }}>
                      <Bath size={24} style={{ color: '#166534', margin: '0 auto 0.4rem auto' }} />
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>{property.bathrooms || '—'} Baths</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Bathrooms</div>
                    </div>

                    <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem 1rem', borderRadius: 14, border: '1px solid #F1F5F9' }}>
                      <Maximize2 size={24} style={{ color: '#166534', margin: '0 auto 0.4rem auto' }} />
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>{property.areaSqft.toLocaleString('en-IN')}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Super Area (sq.ft)</div>
                    </div>

                    <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem 1rem', borderRadius: 14, border: '1px solid #F1F5F9' }}>
                      <Car size={24} style={{ color: '#166534', margin: '0 auto 0.4rem auto' }} />
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>{property.parkingSpaces || 1} Covered</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Parking Spaces</div>
                    </div>
                  </div>

                  {/* Extra Property Attributes */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #F1F5F9', fontSize: '0.88rem' }}>
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
                  <div style={{ whiteSpace: 'pre-line', lineHeight: '1.85', color: '#334155', fontSize: '1rem' }}>
                    {property.description}
                  </div>
                </div>
              </>
            )}

            {/* TAB: Amenities */}
            {(activeTab === 'overview' || activeTab === 'amenities') && (
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
                      <CheckCircle2 size={16} style={{ color: '#166534', flexShrink: 0 }} />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Integrated Mortgage & EMI Calculator */}
            {(activeTab === 'overview' || activeTab === 'emi') && (
              <div className="card-luxury" style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>
                  <div className="flex items-center gap-2">
                    <Calculator size={20} style={{ color: '#166534' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                      Mortgage & Monthly Installment Estimator
                    </h3>
                  </div>
                  <span className="badge badge-emerald">Partner Banks: SBI, HDFC, ICICI</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  
                  {/* Left: Sliders */}
                  <div className="flex flex-col gap-5">
                    
                    {/* Down payment slider */}
                    <div>
                      <div className="flex justify-between items-center" style={{ marginBottom: 4, fontSize: '0.88rem' }}>
                        <span style={{ fontWeight: 600, color: '#334155' }}>Down Payment ({downPaymentPercent}%)</span>
                        <strong style={{ color: '#166534' }}>₹ {(downPaymentAmount / 100000).toFixed(1)} Lakhs</strong>
                      </div>
                      <input 
                        type="range"
                        min="10"
                        max="60"
                        step="5"
                        value={downPaymentPercent}
                        onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                        style={{ width: '100%', accentColor: '#166534', height: 6 }}
                      />
                    </div>

                    {/* Interest Rate */}
                    <div>
                      <div className="flex justify-between items-center" style={{ marginBottom: 4, fontSize: '0.88rem' }}>
                        <span style={{ fontWeight: 600, color: '#334155' }}>Annual Interest Rate</span>
                        <strong style={{ color: '#166534' }}>{loanInterestRate}% p.a.</strong>
                      </div>
                      <input 
                        type="range"
                        min="7"
                        max="12"
                        step="0.25"
                        value={loanInterestRate}
                        onChange={(e) => setLoanInterestRate(Number(e.target.value))}
                        style={{ width: '100%', accentColor: '#166534', height: 6 }}
                      />
                    </div>

                    {/* Loan Tenure */}
                    <div>
                      <div className="flex justify-between items-center" style={{ marginBottom: 4, fontSize: '0.88rem' }}>
                        <span style={{ fontWeight: 600, color: '#334155' }}>Loan Tenure</span>
                        <strong style={{ color: '#166534' }}>{loanTenureYears} Years</strong>
                      </div>
                      <input 
                        type="range"
                        min="5"
                        max="30"
                        step="1"
                        value={loanTenureYears}
                        onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                        style={{ width: '100%', accentColor: '#166534', height: 6 }}
                      />
                    </div>

                  </div>

                  {/* Right: EMI Output Box */}
                  <div style={{ backgroundColor: '#0B1120', color: '#FFFFFF', padding: '1.75rem', borderRadius: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: '0.82rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Estimated Monthly EMI
                    </div>
                    <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#DFB76C', fontFamily: 'Outfit', margin: '0.4rem 0' }}>
                      ₹ {calculatedEMI.toLocaleString('en-IN')} <span style={{ fontSize: '0.9rem', color: '#A7F3D0', fontWeight: 600 }}>/ month</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#CBD5E1', borderTop: '1px solid #1E2E4F', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                      Loan Amount: <strong>₹ {(loanPrincipal / 100000).toFixed(1)} Lakhs</strong>
                    </div>
                    <a
                      href={`https://wa.me/918445190135?text=Hello%20A2%20Realtors%2C%20I%20am%20interested%20in%20a%20home%20loan%20quote%20for%20Property%20${property.propertyCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold btn-sm w-full"
                      style={{ marginTop: '1rem', width: '100%', borderRadius: 10, fontWeight: 800 }}
                    >
                      Check Bank Eligibility
                    </a>
                  </div>

                </div>
              </div>
            )}

            {/* TAB: Location & Neighborhood Map */}
            {(activeTab === 'overview' || activeTab === 'map') && (
              <div className="card-luxury" style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
                  Neighborhood & Strategic Location
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                  Prime address in <strong>{property.location}</strong>. Landmark: {property.landmark || 'Dehradun VIP Residential Corridor'}.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ marginBottom: '1.75rem' }}>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#334155' }}>
                    <School size={16} style={{ color: '#166534' }} /> Top Schools &lt; 2 km
                  </div>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#334155' }}>
                    <Building2 size={16} style={{ color: '#166534' }} /> Max Hospital 10 min
                  </div>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#334155' }}>
                    <ShoppingBag size={16} style={{ color: '#166534' }} /> Pacific Mall 12 min
                  </div>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#334155' }}>
                    <Car size={16} style={{ color: '#166534' }} /> Jolly Grant Airport 40 min
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
            )}

            {/* Confidential Price & Acquisition Advisory Card */}
            <div className="card-luxury" style={{ padding: '2.5rem', backgroundColor: '#F8FAFC', borderRadius: 20 }}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
                    Official Property Dossier & Legal Inspection
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '0.95rem', maxWidth: 540, lineHeight: 1.6 }}>
                    Request the verified title search report, MDDA layout approvals, and site coordinates directly from our senior advisory desk.
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
                    <span>WhatsApp Inquiry</span>
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

          {/* RIGHT 4 COLUMNS: STICKY INQUIRY CARD & ADVISOR */}
          <div className="lg:col-span-4 flex flex-col gap-6" style={{ alignSelf: 'start', position: 'sticky', top: 90 }}>
            
            {/* Sticky Lead Capture Widget */}
            <div 
              className="card-luxury" 
              style={{ 
                padding: '2rem', 
                backgroundColor: '#FFFFFF', 
                borderRadius: 20,
                border: '2px solid rgba(22,101,52,0.35)',
                boxShadow: '0 20px 40px rgba(22,101,52,0.1)'
              }}
            >
              <div className="flex items-center gap-2" style={{ marginBottom: '0.35rem' }}>
                <span className="pulse-dot"></span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Direct Listing Inquiry
                </span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
                Schedule Private Viewing
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
                Speak directly with the mandated property specialist for {property.location}.
              </p>

              {enquirySuccess ? (
                <div style={{ backgroundColor: '#EBF4EC', border: '1px solid #A7F3D0', padding: '1.5rem', borderRadius: 16, color: '#1B4332', textAlign: 'center' }}>
                  <CheckCircle2 size={36} style={{ color: '#166534', margin: '0 auto 0.75rem auto' }} />
                  <strong style={{ display: 'block', fontSize: '1.1rem' }}>Inquiry Registered!</strong>
                  <p style={{ fontSize: '0.85rem', marginTop: 4, color: '#475569' }}>
                    Our senior property advisor will call you at <strong>{phone}</strong> within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit}>
                  
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Col. Rajesh Mehra"
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
                    <label className="form-label">Specific Query / Requirement</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Is price negotiable? Want title deed check..."
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      className="form-textarea"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-green w-full" 
                    style={{ width: '100%', borderRadius: 12, padding: '0.8rem', marginBottom: '0.75rem', fontWeight: 800 }}
                  >
                    <Phone size={16} /> Request Guaranteed Callback
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowSiteVisitModal(true)}
                    className="btn-outline-green w-full"
                    style={{ width: '100%', borderRadius: 12, padding: '0.8rem', fontWeight: 700 }}
                  >
                    <Calendar size={16} /> Book Chauffeured Site Visit
                  </button>

                </form>
              )}

            </div>

            {/* Assigned Consultant Card */}
            <div className="card-luxury" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                Mandated Valley Specialist
              </div>
              
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                  alt={property.assignedAgentName || 'Priya Verma'}
                  style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid #166534' }}
                />
                <div>
                  <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '1.05rem' }}>
                    {property.assignedAgentName || 'Priya Verma'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Senior Real Estate Consultant</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#166534', marginTop: 2 }}>
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

        {/* 6. SIMILAR PROPERTIES RECOMMENDATIONS */}
        {similarProperties.length > 0 && (
          <div style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid #E2E8F0' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                  Similar Properties in {property.location}
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.95rem', marginTop: 4 }}>
                  Compare with other premium listings verified in the same corridor
                </p>
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

      {/* FULLSCREEN LIGHTBOX PHOTO VIEWER */}
      {lightboxOpen && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: 'rgba(11, 17, 32, 0.96)', 
            zIndex: 1000, 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)'
          }}
          onClick={() => setLightboxOpen(false)}
        >
          {/* Top Bar with Counter and Close */}
          <div 
            style={{ 
              position: 'absolute', 
              top: 20, 
              left: 24, 
              right: 24, 
              display: 'flex', 
              justifyContent: 'between', 
              alignItems: 'center',
              color: '#FFFFFF',
              zIndex: 10
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#CBD5E1' }}>
              {property.title} • Photo {activeImageIndex + 1} of {property.images.length}
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Main Full-Size Image Container */}
          <div 
            style={{ position: 'relative', maxWidth: '90vw', maxHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={currentImage} 
              alt={property.title} 
              style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 12, boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }} 
            />

            {/* Left Prev Arrow */}
            {property.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(prev => (prev - 1 + property.images.length) % property.images.length);
                }}
                style={{
                  position: 'absolute',
                  left: -50,
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: '#FFFFFF',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Right Next Arrow */}
            {property.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(prev => (prev + 1) % property.images.length);
                }}
                style={{
                  position: 'absolute',
                  right: -50,
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: '#FFFFFF',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Caption at bottom */}
          {property.images[activeImageIndex]?.caption && (
            <div style={{ color: '#DFB76C', marginTop: 16, fontSize: '0.95rem', fontWeight: 600 }}>
              {property.images[activeImageIndex].caption}
            </div>
          )}
        </div>
      )}

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
