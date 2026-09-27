import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, RotateCcw, Search, Grid, List, MapPin, Sparkles, SlidersHorizontal, Check } from 'lucide-react';
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

  // Synchronize filter states when URL search parameters change
  useEffect(() => {
    setTransactionType(searchParams.get('type') || 'ALL');
    setPropertyType(searchParams.get('category') || 'ALL');
    setSelectedLocation(searchParams.get('locality') || searchParams.get('location') || 'ALL');
    setBudgetMax(searchParams.get('budget') ? Number(searchParams.get('budget')) : 100000000);
    setBedrooms(searchParams.get('beds') || 'ALL');
  }, [searchParams]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('FEATURED');
  const [viewMode, setViewMode] = useState<'GRID' | 'LIST'>('GRID');

  const amenityOptions = [
    'Parking', 'Garden', 'Balcony', 'Lift', 'Security Guard', 
    'Power Backup', 'Water Supply', 'Gated Community', 'Modular Kitchen', 
    'CCTV', 'Swimming Pool', 'Gym', 'Terrace Observatory', 'Servant Quarter'
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
      if (p.price > budgetMax) return false;

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

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '85vh', paddingBottom: '6rem' }}>
      
      {/* Header Banner */}
      <div style={{ backgroundColor: '#0B1120', color: '#FFFFFF', padding: '4.5rem 0 3.5rem 0', borderBottom: '1px solid #1E2E4F', position: 'relative' }}>
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 2.8rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                Explore Verified Properties in Dehradun
              </h1>
              <p style={{ color: '#94A3B8', fontSize: '1.05rem', marginTop: '0.4rem' }}>
                Showing <strong>{filteredProperties.length}</strong> authenticated luxury listings with 100% legal title clearance
              </p>
            </div>

            {/* View Switcher & Clear Filters */}
            <div className="flex items-center gap-3">
              <button 
                onClick={resetFilters} 
                className="btn-outline-gray btn-sm flex items-center gap-1.5"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}
              >
                <RotateCcw size={14} /> Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        
        {/* Main Content Layout: Left Sidebar + Right Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR: FILTERS (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6" style={{ alignSelf: 'start', position: 'sticky', top: 90 }}>
            
            <div className="card-luxury" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
              
              <div className="flex items-center justify-between" style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
                <div className="flex items-center gap-2" style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>
                  <SlidersHorizontal size={18} style={{ color: '#386635' }} /> Filter Criteria
                </div>
                <button 
                  onClick={resetFilters} 
                  style={{ fontSize: '0.78rem', color: '#64748B', cursor: 'pointer', fontWeight: 600 }}
                  onMouseOver={e => e.currentTarget.style.color = '#386635'}
                  onMouseOut={e => e.currentTarget.style.color = '#64748B'}
                >
                  Reset
                </button>
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
                </div>
              </div>

              {/* Transaction Type */}
              <div className="form-group">
                <label className="form-label">Transaction Type</label>
                <div className="flex gap-2">
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
                        padding: '0.5rem',
                        borderRadius: 8,
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        border: '1px solid',
                        borderColor: transactionType === t.id ? '#386635' : '#E2E8F0',
                        backgroundColor: transactionType === t.id ? '#386635' : '#FFFFFF',
                        color: transactionType === t.id ? '#FFFFFF' : '#475569',
                        cursor: 'pointer'
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

              {/* Locality */}
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


              {/* Bedrooms */}
              <div className="form-group">
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
                        borderColor: bedrooms === b ? '#386635' : '#E2E8F0',
                        backgroundColor: bedrooms === b ? '#EBF4EC' : '#FFFFFF',
                        color: bedrooms === b ? '#1B4332' : '#475569',
                        cursor: 'pointer'
                      }}
                    >
                      {b === 'ALL' ? 'Any' : `${b} BHK`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities Filter */}
              <div className="form-group" style={{ marginTop: '0.5rem' }}>
                <label className="form-label">Amenities & Features</label>
                <div className="flex flex-col gap-2" style={{ maxHeight: 160, overflowY: 'auto', paddingRight: 4 }}>
                  {amenityOptions.map(amenity => (
                    <label key={amenity} className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#334155', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                        style={{ accentColor: '#386635' }}
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: SEARCH RESULTS (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Sort & Results Bar */}
            <div className="card" style={{ padding: '0.85rem 1.25rem', backgroundColor: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0' }}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                
                <div style={{ fontSize: '0.88rem', color: '#475569' }}>
                  Showing <strong style={{ color: '#0F172A' }}>{filteredProperties.length}</strong> matching properties
                </div>

                <div className="flex items-center gap-3">
                  <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>Sort by:</span>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="form-select"
                    style={{ backgroundColor: '#F8FAFC', padding: '0.4rem 0.85rem', fontSize: '0.82rem', borderRadius: 8, width: 'auto' }}
                  >
                    <option value="FEATURED">Featured First</option>
                    <option value="NEWEST">Newest Listings</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div 
                className="card" 
                style={{ 
                  padding: '4rem 2rem', 
                  textAlign: 'center', 
                  backgroundColor: '#FFFFFF', 
                  borderRadius: 20,
                  border: '1px dashed #CBD5E1' 
                }}
              >
                <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#F1F5F9', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                  <Search size={28} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
                  No Exact Match Found
                </h3>
                <p style={{ color: '#64748B', maxWidth: 460, margin: '0 auto 1.5rem auto', fontSize: '0.92rem' }}>
                  We couldn't find properties matching all selected filters. Try broadening your budget range or resetting filters.
                </p>
                <button onClick={resetFilters} className="btn-green btn-pill">
                  <RotateCcw size={15} /> Reset All Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
