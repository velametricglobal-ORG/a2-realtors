import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, RotateCcw, Search, Grid, List } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PropertyCard } from './PropertyCard';

export const PropertySearch: React.FC = () => {
  const { properties, locations } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States initialized from URL params if available
  const [transactionType, setTransactionType] = useState<string>(searchParams.get('type') || 'ALL');
  const [propertyType, setPropertyType] = useState<string>(searchParams.get('category') || 'ALL');
  const [selectedLocation, setSelectedLocation] = useState<string>(searchParams.get('location') || 'ALL');
  const [budgetMax, setBudgetMax] = useState<number>(searchParams.get('budget') ? Number(searchParams.get('budget')) : 100000000);
  const [bedrooms, setBedrooms] = useState<string>(searchParams.get('beds') || 'ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('FEATURED');

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
        if (!matchesTitle && !matchesCode && !matchesLoc) return false;
      }

      // Transaction Type
      if (transactionType !== 'ALL' && p.transactionType !== transactionType) return false;

      // Property Type
      if (propertyType !== 'ALL' && p.propertyType !== propertyType) return false;

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
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '80vh', paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      <div className="container">
        
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4" style={{ marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>Explore Properties in Dehradun</h1>
            <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
              Showing {filteredProperties.length} verified residential & commercial properties
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="form-group" style={{ margin: 0 }}>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ backgroundColor: '#FFFFFF', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                <option value="FEATURED">Sort: Featured First</option>
                <option value="PRICE_LOW">Price: Low to High</option>
                <option value="PRICE_HIGH">Price: High to Low</option>
                <option value="NEWEST">Newest Listings</option>
              </select>
            </div>
            <button onClick={resetFilters} className="btn btn-outline btn-sm flex items-center gap-1">
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>

        {/* Main Content Layout: Left Sidebar + Right Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT SIDEBAR: FILTERS */}
          <div className="card" style={{ padding: '1.5rem', alignSelf: 'start', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
            <div className="flex items-center justify-between" style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <div className="flex items-center gap-2" style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0F172A' }}>
                <Filter size={18} style={{ color: '#D97706' }} /> Filter Options
              </div>
              <button onClick={resetFilters} style={{ fontSize: '0.75rem', color: '#64748B', cursor: 'pointer' }}>Clear</button>
            </div>

            {/* Keyword Search */}
            <div className="form-group">
              <label className="form-label">Search Keyword / Property ID</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="e.g. A2-1024, Dalanwala..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.2rem' }}
                />
                <Search size={15} style={{ position: 'absolute', left: 10, top: 12, color: '#94A3B8' }} />
              </div>
            </div>

            {/* Transaction Type */}
            <div className="form-group">
              <label className="form-label">Transaction Type</label>
              <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)} className="form-select">
                <option value="ALL">All (Buy & Rent)</option>
                <option value="BUY">Buy Property</option>
                <option value="RENT">Rent / Lease</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="form-group">
              <label className="form-label">Property Type</label>
              <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="form-select">
                <option value="ALL">All Categories</option>
                <option value="INDEPENDENT_HOUSE">Independent House / Bungalow</option>
                <option value="APARTMENT">Flat / Penthouse</option>
                <option value="PLOT">Residential Plot / Land</option>
                <option value="COMMERCIAL">Commercial / Office</option>
                <option value="FARMHOUSE">Farmhouse & Hill Estate</option>
              </select>
            </div>

            {/* Locality */}
            <div className="form-group">
              <label className="form-label">Dehradun Locality</label>
              <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="form-select">
                <option value="ALL">All Localities</option>
                {locations.map(loc => (
                  <option key={loc.id} value={loc.name}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* Max Budget Slider */}
            <div className="form-group">
              <div className="flex justify-between items-center">
                <label className="form-label">Max Budget</label>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#D97706' }}>
                  {budgetMax >= 100000000 ? 'Any' : `₹${(budgetMax / 10000000).toFixed(2)} Cr`}
                </span>
              </div>
              <input
                type="range"
                min="5000000"
                max="100000000"
                step="5000000"
                value={budgetMax}
                onChange={(e) => setBudgetMax(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#D97706', margin: '0.5rem 0' }}
              />
            </div>

            {/* Bedrooms */}
            <div className="form-group">
              <label className="form-label">Bedrooms</label>
              <div className="flex gap-1" style={{ flexWrap: 'wrap' }}>
                {['ALL', '1', '2', '3', '4', '5+'].map(b => (
                  <button
                    key={b}
                    onClick={() => setBedrooms(b)}
                    style={{
                      padding: '0.35rem 0.65rem',
                      borderRadius: 6,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      border: bedrooms === b ? '1px solid #D97706' : '1px solid #E2E8F0',
                      backgroundColor: bedrooms === b ? '#FEF3C7' : '#FFFFFF',
                      color: bedrooms === b ? '#B45309' : '#475569'
                    }}
                  >
                    {b === 'ALL' ? 'Any' : b}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities Checkboxes */}
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label className="form-label">Amenities</label>
              <div className="flex flex-col gap-2" style={{ maxHeight: 180, overflowY: 'auto', paddingRight: 4 }}>
                {amenityOptions.map(amenity => (
                  <label key={amenity} className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#334155', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      style={{ accentColor: '#D97706' }}
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-col gap-2" style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem', marginTop: '1rem' }}>
              <label className="flex items-center gap-2" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', cursor: 'pointer' }}>
                <input type="checkbox" checked={featuredOnly} onChange={(e) => setFeaturedOnly(e.target.checked)} style={{ accentColor: '#D97706' }} />
                Featured Listings Only
              </label>
              <label className="flex items-center gap-2" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', cursor: 'pointer' }}>
                <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} style={{ accentColor: '#D97706' }} />
                Verified Title Deeds Only
              </label>
            </div>

          </div>

          {/* RIGHT SIDE: PROPERTY RESULTS GRID */}
          <div className="lg:col-span-3">
            {filteredProperties.length === 0 ? (
              <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏡</div>
                <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '0.5rem' }}>No properties match your current filters</h3>
                <p style={{ color: '#64748B', maxWidth: 460, margin: '0 auto 1.5rem auto' }}>
                  Try resetting your price range, location or bedroom criteria to explore available listings across Dehradun.
                </p>
                <button onClick={resetFilters} className="btn btn-primary">
                  <RotateCcw size={16} /> Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
