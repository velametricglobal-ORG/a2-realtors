import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Filter, RotateCcw, Search, Grid, List, MapPin, Sparkles, 
  SlidersHorizontal, Check, X, ArrowUpDown, ChevronDown, CheckCircle2, Shield
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PropertyCard } from './PropertyCard';

export const PropertySearch: React.FC = () => {
  const { properties, locations } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States initialized from URL params if available
  const [transactionType, setTransactionType] = useState<string>(searchParams.get('type') || 'ALL');
  const [propertyType, setPropertyType] = useState<string>(searchParams.get('category') || 'ALL');
  const [selectedLocation, setSelectedLocation] = useState<string>(searchParams.get('locality') || searchParams.get('location') || 'ALL');
  const [budgetMax, setBudgetMax] = useState<number>(searchParams.get('budget') ? Number(searchParams.get('budget')) : 100000000);
  const [bedrooms, setBedrooms] = useState<string>(searchParams.get('beds') || 'ALL');
  const [searchTerm, setSearchTerm] = useState<string>(() => searchParams.get('q') || searchParams.get('search') || '');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('FEATURED');
  const [viewMode, setViewMode] = useState<'GRID' | 'LIST'>('GRID');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Synchronize filter states when URL search parameters change
  useEffect(() => {
    setTransactionType(searchParams.get('type') || 'ALL');
    setPropertyType(searchParams.get('category') || 'ALL');
    setSelectedLocation(searchParams.get('locality') || searchParams.get('location') || 'ALL');
    setBudgetMax(searchParams.get('budget') ? Number(searchParams.get('budget')) : 100000000);
    setBedrooms(searchParams.get('beds') || 'ALL');
    setSearchTerm(searchParams.get('q') || searchParams.get('search') || '');
  }, [searchParams]);

  const amenityOptions = [
    'Parking', 'Garden', 'Balcony', 'Lift', 'Security Guard', 
    'Power Backup', 'Water Supply', 'Gated Community', 'Modular Kitchen', 
    'CCTV', 'Swimming Pool', 'Gym', 'Terrace Observatory', 'Servant Quarter'
  ];

  const quickBudgets = [
    { label: 'Any Budget', value: 100000000 },
    { label: '< ₹50 L', value: 5000000 },
    { label: '₹50L - 1.5 Cr', value: 15000000 },
    { label: '₹1.5 - 3 Cr', value: 30000000 },
    { label: '₹3 - 6 Cr', value: 60000000 },
  ];

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const resetFilters = () => {
    setTransactionType('ALL');
    setPropertyType('ALL');
    setSelectedLocation('ALL');
    setBudgetMax(100000000);
    setBedrooms('ALL');
    setSearchTerm('');
    setSelectedAmenities([]);
    setFeaturedOnly(false);
    setVerifiedOnly(false);
    setSearchParams({});
  };

  const formatPrice = (num: number) => {
    if (num >= 10000000) return `₹ ${(num / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
    if (num >= 100000) return `₹ ${(num / 100000).toFixed(1).replace(/\.0$/, '')} Lakhs`;
    return `₹ ${num.toLocaleString('en-IN')}`;
  };

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      if (!p.published) return false;

      // Search term
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesCode = p.propertyCode.toLowerCase().includes(query);
        const matchesLoc = p.location.toLowerCase().includes(query);
        const matchesAddr = p.address?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCode && !matchesLoc && !matchesAddr) return false;
      }

      // Transaction Type
      if (transactionType !== 'ALL' && p.transactionType !== transactionType) return false;

      // Property Type
      if (propertyType !== 'ALL') {
        if (propertyType === 'VILLAS_FLATS' || propertyType === 'RESIDENTIAL') {
          if (p.propertyType !== 'INDEPENDENT_HOUSE' && p.propertyType !== 'APARTMENT' && p.propertyType !== 'VILLA' && p.propertyType !== 'FARMHOUSE') {
            return false;
          }
        } else if (p.propertyType !== propertyType) {
          return false;
        }
      }

      // Location
      if (selectedLocation !== 'ALL' && !p.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;

      // Budget
      if (budgetMax < 100000000 && p.price > budgetMax) return false;

      // Bedrooms
      if (bedrooms !== 'ALL') {
        if (bedrooms === '5+' && (p.bedrooms || 0) < 5) return false;
        if (bedrooms !== '5+' && p.bedrooms !== Number(bedrooms)) return false;
      }

      // Amenities
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(a => p.amenities?.includes(a));
        if (!hasAllAmenities) return false;
      }

      // Badges
      if (featuredOnly && !p.featured) return false;
      if (verifiedOnly && !p.verified) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'PRICE_LOW') return a.price - b.price;
      if (sortBy === 'PRICE_HIGH') return b.price - a.price;
      if (sortBy === 'NEWEST') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [properties, searchTerm, transactionType, propertyType, selectedLocation, budgetMax, bedrooms, selectedAmenities, featuredOnly, verifiedOnly, sortBy]);

  // Count active applied filters for badge indicator
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (transactionType !== 'ALL') count++;
    if (propertyType !== 'ALL') count++;
    if (selectedLocation !== 'ALL') count++;
    if (budgetMax < 100000000) count++;
    if (bedrooms !== 'ALL') count++;
    if (searchTerm.trim().length > 0) count++;
    if (selectedAmenities.length > 0) count += selectedAmenities.length;
    if (featuredOnly) count++;
    if (verifiedOnly) count++;
    return count;
  }, [transactionType, propertyType, selectedLocation, budgetMax, bedrooms, searchTerm, selectedAmenities, featuredOnly, verifiedOnly]);

  const quickCorridors = [
    'Rajpur Road',
    'Dalanwala',
    'Sahastradhara Road',
    'Mussoorie Road',
    'GMS Road',
    'Chakrata Road'
  ];

  const renderFilterPanel = () => (
    <div className="card-luxury" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
      <div className="flex items-center justify-between" style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
        <div className="flex items-center gap-2" style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0F172A' }}>
          <SlidersHorizontal size={18} style={{ color: '#166534' }} /> Filter Criteria
          {activeFilterCount > 0 && (
            <span style={{ backgroundColor: '#166534', color: '#FFFFFF', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 12, fontWeight: 700 }}>
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button 
            onClick={resetFilters} 
            style={{ fontSize: '0.78rem', color: '#64748B', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}
            onMouseOver={e => e.currentTarget.style.color = '#166534'}
            onMouseOut={e => e.currentTarget.style.color = '#64748B'}
          >
            <RotateCcw size={12} /> Reset
          </button>
        )}
      </div>

      {/* Keyword Search */}
      <div className="form-group">
        <label className="form-label">Search Keyword / Property ID</label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="e.g. A2-1024, Dalanwala, Villa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.4rem', fontSize: '0.88rem' }}
          />
          <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: '#94A3B8' }} />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              style={{ position: 'absolute', right: 10, top: 10, color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Transaction Type Segmented Control */}
      <div className="form-group">
        <label className="form-label">Transaction Type</label>
        <div className="flex gap-2" style={{ backgroundColor: '#F1F5F9', padding: 4, borderRadius: 10 }}>
          {[
            { id: 'ALL', label: 'All' },
            { id: 'BUY', label: 'Buy' },
            { id: 'RENT', label: 'Rent' }
          ].map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTransactionType(t.id)}
              style={{
                flex: 1,
                padding: '0.45rem',
                borderRadius: 8,
                fontSize: '0.82rem',
                fontWeight: 700,
                border: 'none',
                backgroundColor: transactionType === t.id ? '#166534' : 'transparent',
                color: transactionType === t.id ? '#FFFFFF' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Property Category */}
      <div className="form-group">
        <label className="form-label">Property Category</label>
        <select 
          value={propertyType} 
          onChange={(e) => setPropertyType(e.target.value)} 
          className="form-select"
          style={{ fontSize: '0.88rem' }}
        >
          <option value="ALL">All Categories</option>
          <option value="VILLAS_FLATS">Villas & Flats</option>
          <option value="INDEPENDENT_HOUSE">Independent Villa / Kothi</option>
          <option value="APARTMENT">Apartment / Penthouse</option>
          <option value="PLOT">Residential Land & Plot</option>
          <option value="COMMERCIAL">Commercial & Retail</option>
          <option value="FARMHOUSE">Farmhouse & Hill Estate</option>
        </select>
      </div>

      {/* Locality Corridor */}
      <div className="form-group">
        <label className="form-label">Dehradun Locality</label>
        <select 
          value={selectedLocation} 
          onChange={(e) => setSelectedLocation(e.target.value)} 
          className="form-select"
          style={{ fontSize: '0.88rem' }}
        >
          <option value="ALL">All Dehradun Corridors</option>
          {locations.map(loc => (
            <option key={loc.id} value={loc.name}>{loc.name}</option>
          ))}
        </select>
      </div>

      {/* Budget Slider & Quick Presets */}
      <div className="form-group">
        <div className="flex justify-between items-center" style={{ marginBottom: 4 }}>
          <label className="form-label" style={{ marginBottom: 0 }}>Max Budget</label>
          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#166534' }}>
            {budgetMax >= 100000000 ? 'Any Budget' : `Up to ${formatPrice(budgetMax)}`}
          </span>
        </div>
        <input
          type="range"
          min="2000000"
          max="100000000"
          step="2500000"
          value={budgetMax}
          onChange={(e) => setBudgetMax(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#166534', height: 6, margin: '8px 0' }}
        />
        <div className="flex flex-wrap gap-1.5" style={{ marginTop: 4 }}>
          {quickBudgets.map(b => (
            <button
              key={b.label}
              type="button"
              onClick={() => setBudgetMax(b.value)}
              style={{
                fontSize: '0.72rem',
                padding: '0.2rem 0.55rem',
                borderRadius: 6,
                fontWeight: 600,
                border: '1px solid',
                borderColor: budgetMax === b.value ? '#166534' : '#E2E8F0',
                backgroundColor: budgetMax === b.value ? '#EBF4EC' : '#F8FAFC',
                color: budgetMax === b.value ? '#166534' : '#64748B',
                cursor: 'pointer'
              }}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms (BHK) */}
      <div className="form-group" style={{ marginTop: '0.5rem' }}>
        <label className="form-label">Bedrooms (BHK)</label>
        <div className="flex gap-1.5" style={{ flexWrap: 'wrap' }}>
          {['ALL', '1', '2', '3', '4', '5+'].map(b => (
            <button
              key={b}
              type="button"
              onClick={() => setBedrooms(b)}
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: 8,
                fontSize: '0.78rem',
                fontWeight: 700,
                border: '1px solid',
                borderColor: bedrooms === b ? '#166534' : '#E2E8F0',
                backgroundColor: bedrooms === b ? '#EBF4EC' : '#FFFFFF',
                color: bedrooms === b ? '#166534' : '#475569',
                cursor: 'pointer'
              }}
            >
              {b === 'ALL' ? 'Any' : `${b} BHK`}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Verified / Featured Checkboxes */}
      <div className="flex flex-col gap-2" style={{ padding: '0.75rem 0', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9', margin: '0.75rem 0' }}>
        <label className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#1E293B', fontWeight: 600, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            style={{ accentColor: '#166534' }}
          />
          <Shield size={14} style={{ color: '#166534' }} /> Verified 100% Freehold Only
        </label>
        <label className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#1E293B', fontWeight: 600, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={featuredOnly}
            onChange={(e) => setFeaturedOnly(e.target.checked)}
            style={{ accentColor: '#166534' }}
          />
          <Sparkles size={14} style={{ color: '#DFB76C' }} /> Featured Properties Only
        </label>
      </div>

      {/* Amenities Filter */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">Amenities & Features</label>
        <div className="flex flex-col gap-2" style={{ maxHeight: 150, overflowY: 'auto', paddingRight: 4 }}>
          {amenityOptions.map(amenity => (
            <label key={amenity} className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                style={{ accentColor: '#166534' }}
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '85vh', paddingBottom: '6rem' }}>
      
      {/* 1. LUXURY HERO BANNER */}
      <div style={{ backgroundColor: '#0B1120', color: '#FFFFFF', padding: '4.5rem 0 3.25rem 0', borderBottom: '1px solid #1E2E4F', position: 'relative' }}>
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: 'rgba(56,102,53,0.35)', border: '1px solid rgba(167,243,208,0.3)', padding: '0.3rem 0.9rem', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700, color: '#A7F3D0', marginBottom: '0.85rem' }}>
                <Sparkles size={13} style={{ color: '#DFB76C' }} /> Dehradun Verified Property Desk
              </div>
              <h1 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 2.75rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Explore Verified Properties in <span style={{ color: '#DFB76C', fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>Dehradun</span>
              </h1>
              <p style={{ color: '#94A3B8', fontSize: '1.02rem', marginTop: '0.45rem', maxWidth: 650 }}>
                Showing <strong>{filteredProperties.length}</strong> authenticated luxury listings with 100% legal title clearance and transparent pricing.
              </p>
            </div>

            {/* Quick Stats or Reset */}
            <div className="flex items-center gap-3">
              {activeFilterCount > 0 && (
                <button 
                  onClick={resetFilters} 
                  className="btn-outline-gray btn-sm flex items-center gap-1.5"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.25)' }}
                >
                  <RotateCcw size={14} /> Clear All Filters ({activeFilterCount})
                </button>
              )}
            </div>
          </div>

          {/* Quick Locality Corridor Pill Bar */}
          <div className="flex items-center gap-2" style={{ marginTop: '1.75rem', overflowX: 'auto', paddingBottom: 6 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', marginRight: 4 }}>
              Prime Corridors:
            </span>
            <button
              onClick={() => setSelectedLocation('ALL')}
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '0.35rem 0.85rem',
                borderRadius: 20,
                border: '1px solid',
                borderColor: selectedLocation === 'ALL' ? '#DFB76C' : 'rgba(255,255,255,0.15)',
                backgroundColor: selectedLocation === 'ALL' ? '#DFB76C' : 'rgba(255,255,255,0.06)',
                color: selectedLocation === 'ALL' ? '#0B1120' : '#E2E8F0',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              All Dehradun
            </button>
            {quickCorridors.map(corridor => (
              <button
                key={corridor}
                onClick={() => setSelectedLocation(corridor)}
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '0.35rem 0.85rem',
                  borderRadius: 20,
                  border: '1px solid',
                  borderColor: selectedLocation === corridor ? '#DFB76C' : 'rgba(255,255,255,0.15)',
                  backgroundColor: selectedLocation === corridor ? '#DFB76C' : 'rgba(255,255,255,0.06)',
                  color: selectedLocation === corridor ? '#0B1120' : '#E2E8F0',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {corridor}
              </button>
            ))}
          </div>

        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem' }}>
        
        {/* 2. ACTIVE FILTERS & CONTROL BAR */}
        <div 
          className="card" 
          style={{ 
            padding: '1rem 1.25rem', 
            backgroundColor: '#FFFFFF', 
            borderRadius: 16, 
            border: '1px solid #E2E8F0',
            marginBottom: '1.75rem' 
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Left: Results counter & Mobile Filter button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="btn-outline-green btn-sm lg:hidden flex items-center gap-1.5"
                style={{ borderRadius: 10 }}
              >
                <SlidersHorizontal size={14} />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span style={{ backgroundColor: '#166534', color: '#FFFFFF', fontSize: '0.68rem', padding: '0.1rem 0.4rem', borderRadius: 10, fontWeight: 800 }}>
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div style={{ fontSize: '0.9rem', color: '#475569' }}>
                Showing <strong style={{ color: '#0F172A' }}>{filteredProperties.length}</strong> verified properties
              </div>
            </div>

            {/* Right: Sort & View Toggle */}
            <div className="flex items-center gap-4">
              
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>Sort by:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select"
                  style={{ backgroundColor: '#F8FAFC', padding: '0.4rem 0.85rem', fontSize: '0.82rem', borderRadius: 8, width: 'auto' }}
                >
                  <option value="FEATURED">Featured First</option>
                  <option value="PRICE_LOW">Price: Low to High</option>
                  <option value="PRICE_HIGH">Price: High to Low</option>
                  <option value="NEWEST">Newest Added</option>
                </select>
              </div>

              {/* View Switcher (Grid / List) */}
              <div className="flex items-center gap-1" style={{ backgroundColor: '#F1F5F9', padding: 3, borderRadius: 8 }}>
                <button
                  type="button"
                  onClick={() => setViewMode('GRID')}
                  title="Grid View"
                  style={{
                    padding: '0.35rem 0.55rem',
                    borderRadius: 6,
                    border: 'none',
                    backgroundColor: viewMode === 'GRID' ? '#FFFFFF' : 'transparent',
                    color: viewMode === 'GRID' ? '#166534' : '#64748B',
                    boxShadow: viewMode === 'GRID' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Grid size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('LIST')}
                  title="List View"
                  style={{
                    padding: '0.35rem 0.55rem',
                    borderRadius: 6,
                    border: 'none',
                    backgroundColor: viewMode === 'LIST' ? '#FFFFFF' : 'transparent',
                    color: viewMode === 'LIST' ? '#166534' : '#64748B',
                    boxShadow: viewMode === 'LIST' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  <List size={16} />
                </button>
              </div>

            </div>

          </div>

          {/* Active Filter Chips Collection with flex-wrap per UI UX Pro Max */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2" style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>
                Active Filters:
              </span>

              {searchTerm && (
                <span className="badge flex items-center gap-1" style={{ backgroundColor: '#EBF4EC', color: '#166534', fontSize: '0.75rem', padding: '0.2rem 0.55rem', borderRadius: 20, border: '1px solid rgba(22,101,52,0.2)' }}>
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#166534', display: 'flex', alignItems: 'center' }}>
                    <X size={12} />
                  </button>
                </span>
              )}

              {transactionType !== 'ALL' && (
                <span className="badge flex items-center gap-1" style={{ backgroundColor: '#EBF4EC', color: '#166534', fontSize: '0.75rem', padding: '0.2rem 0.55rem', borderRadius: 20, border: '1px solid rgba(22,101,52,0.2)' }}>
                  {transactionType === 'BUY' ? 'Buy' : 'Rent'}
                  <button onClick={() => setTransactionType('ALL')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#166534', display: 'flex', alignItems: 'center' }}>
                    <X size={12} />
                  </button>
                </span>
              )}

              {selectedLocation !== 'ALL' && (
                <span className="badge flex items-center gap-1" style={{ backgroundColor: '#EBF4EC', color: '#166534', fontSize: '0.75rem', padding: '0.2rem 0.55rem', borderRadius: 20, border: '1px solid rgba(22,101,52,0.2)' }}>
                  {selectedLocation}
                  <button onClick={() => setSelectedLocation('ALL')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#166534', display: 'flex', alignItems: 'center' }}>
                    <X size={12} />
                  </button>
                </span>
              )}

              {propertyType !== 'ALL' && (
                <span className="badge flex items-center gap-1" style={{ backgroundColor: '#EBF4EC', color: '#166534', fontSize: '0.75rem', padding: '0.2rem 0.55rem', borderRadius: 20, border: '1px solid rgba(22,101,52,0.2)' }}>
                  {propertyType.replace('_', ' ')}
                  <button onClick={() => setPropertyType('ALL')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#166534', display: 'flex', alignItems: 'center' }}>
                    <X size={12} />
                  </button>
                </span>
              )}

              {budgetMax < 100000000 && (
                <span className="badge flex items-center gap-1" style={{ backgroundColor: '#EBF4EC', color: '#166534', fontSize: '0.75rem', padding: '0.2rem 0.55rem', borderRadius: 20, border: '1px solid rgba(22,101,52,0.2)' }}>
                  Max: {formatPrice(budgetMax)}
                  <button onClick={() => setBudgetMax(100000000)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#166534', display: 'flex', alignItems: 'center' }}>
                    <X size={12} />
                  </button>
                </span>
              )}

              {bedrooms !== 'ALL' && (
                <span className="badge flex items-center gap-1" style={{ backgroundColor: '#EBF4EC', color: '#166534', fontSize: '0.75rem', padding: '0.2rem 0.55rem', borderRadius: 20, border: '1px solid rgba(22,101,52,0.2)' }}>
                  {bedrooms} BHK
                  <button onClick={() => setBedrooms('ALL')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#166534', display: 'flex', alignItems: 'center' }}>
                    <X size={12} />
                  </button>
                </span>
              )}

              {selectedAmenities.map(amenity => (
                <span key={amenity} className="badge flex items-center gap-1" style={{ backgroundColor: '#F1F5F9', color: '#334155', fontSize: '0.75rem', padding: '0.2rem 0.55rem', borderRadius: 20 }}>
                  {amenity}
                  <button onClick={() => handleAmenityToggle(amenity)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center' }}>
                    <X size={12} />
                  </button>
                </span>
              ))}

              {verifiedOnly && (
                <span className="badge flex items-center gap-1" style={{ backgroundColor: '#FEF3C7', color: '#92400E', fontSize: '0.75rem', padding: '0.2rem 0.55rem', borderRadius: 20 }}>
                  Verified Freehold
                  <button onClick={() => setVerifiedOnly(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#92400E', display: 'flex', alignItems: 'center' }}>
                    <X size={12} />
                  </button>
                </span>
              )}

              <button
                onClick={resetFilters}
                style={{ fontSize: '0.75rem', color: '#DC2626', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', marginLeft: 4 }}
              >
                Clear All
              </button>
            </div>
          )}

        </div>

        {/* 3. MAIN CONTENT LAYOUT: SIDEBAR + RESULTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* DESKTOP LEFT SIDEBAR: FILTERS (4 Cols) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-6" style={{ alignSelf: 'start', position: 'sticky', top: 90 }}>
            {renderFilterPanel()}
          </div>

          {/* RIGHT COLUMN: SEARCH RESULTS (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {filteredProperties.length > 0 ? (
              <div 
                className={viewMode === 'GRID' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'flex flex-col gap-5'}
              >
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} layout={viewMode === 'LIST' ? 'list' : 'grid'} />
                ))}
              </div>
            ) : (
              /* High-Quality Empty State with Suggestions (UI UX Pro Max Result 1) */
              <div 
                className="card" 
                style={{ 
                  padding: '4.5rem 2rem', 
                  textAlign: 'center', 
                  backgroundColor: '#FFFFFF', 
                  borderRadius: 20,
                  border: '1px dashed #CBD5E1' 
                }}
              >
                <div style={{ width: 68, height: 68, borderRadius: '50%', backgroundColor: '#F1F5F9', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                  <Search size={30} style={{ color: '#166534' }} />
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
                  No Exact Matches for Selected Filters
                </h3>
                <p style={{ color: '#64748B', maxWidth: 480, margin: '0 auto 1.5rem auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  We couldn't find listings matching all selected criteria. Try adjusting your budget, selecting another corridor, or browsing all available properties.
                </p>

                {/* Helpful Locality Suggestions */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                    Popular Locations to Explore:
                  </div>
                  <div className="flex justify-center flex-wrap gap-2">
                    {quickCorridors.slice(0, 4).map(loc => (
                      <button
                        key={loc}
                        onClick={() => {
                          setSelectedLocation(loc);
                          setBudgetMax(100000000);
                          setBedrooms('ALL');
                          setSearchTerm('');
                        }}
                        className="btn-outline-gray btn-sm"
                        style={{ borderRadius: 20 }}
                      >
                        <MapPin size={12} style={{ color: '#166534' }} /> {loc}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={resetFilters} className="btn-green btn-pill">
                  <RotateCcw size={15} /> Reset All Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* 4. MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: 'rgba(11,17,32,0.7)', 
            zIndex: 1000, 
            display: 'flex', 
            justifyContent: 'flex-end', 
            backdropFilter: 'blur(6px)' 
          }}
          onClick={() => setMobileFilterOpen(false)}
        >
          <div 
            style={{ 
              width: '100%', 
              maxWidth: 420, 
              backgroundColor: '#FFFFFF', 
              height: '100%', 
              overflowY: 'auto', 
              padding: '1.5rem', 
              boxShadow: '-10px 0 30px rgba(0,0,0,0.25)', 
              display: 'flex', 
              flexDirection: 'column' 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between" style={{ paddingBottom: '1rem', borderBottom: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
              <div className="flex items-center gap-2" style={{ fontWeight: 800, fontSize: '1.15rem', color: '#0F172A' }}>
                <SlidersHorizontal size={18} style={{ color: '#166534' }} /> Filter Properties
              </div>
              <button 
                onClick={() => setMobileFilterOpen(false)}
                style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#F1F5F9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ flexGrow: 1 }}>
              {renderFilterPanel()}
            </div>

            <div style={{ paddingTop: '1.25rem', borderTop: '1px solid #E2E8F0', marginTop: '1.25rem' }}>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="btn-green w-full"
                style={{ borderRadius: 12, padding: '0.85rem', width: '100%', fontWeight: 800 }}
              >
                Show {filteredProperties.length} Properties
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
