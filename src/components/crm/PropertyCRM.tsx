import React, { useState } from 'react';
import { 
  Home, Plus, Sparkles, CheckCircle2, Edit, Trash2, Eye, ShieldCheck, X
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Property, PropertyStatus, PropertyType, TransactionType } from '../../types';

export const PropertyCRM: React.FC = () => {
  const { properties, addProperty, updateProperty, deleteProperty, locations, generateAIDescription } = useStore();

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAIGeneratorModal, setShowAIGeneratorModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(14500000);
  const [location, setLocation] = useState('Dalanwala, Dehradun');
  const [areaSqft, setAreaSqft] = useState<number>(2200);
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(3);
  const [transactionType, setTransactionType] = useState<TransactionType>('BUY');
  const [propertyType, setPropertyType] = useState<PropertyType>('INDEPENDENT_HOUSE');
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState<string>(['Parking', 'Power Backup', 'Water Supply', 'Modular Kitchen'].join(', '));

  // AI Generator Inputs
  const [aiType, setAiType] = useState('INDEPENDENT_HOUSE');
  const [aiLocation, setAiLocation] = useState('Dalanwala, Dehradun');
  const [aiArea, setAiArea] = useState(2500);
  const [aiBeds, setAiBeds] = useState(3);

  const filteredProperties = properties.filter(p => {
    if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
    return true;
  });

  const handleRunAIGenerator = () => {
    const res = generateAIDescription({
      propertyType: aiType,
      location: aiLocation,
      areaSqft: aiArea,
      bedrooms: aiBeds,
      amenities: ['Power Backup', 'Private Lawn', 'Modular Kitchen', 'Security']
    });

    setTitle(res.title);
    setDescription(res.longDesc);
    setLocation(aiLocation);
    setAreaSqft(aiArea);
    setBedrooms(aiBeds);
    setShowAIGeneratorModal(false);
  };

  const handleCreatePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !areaSqft) return;

    addProperty({
      title,
      price,
      location,
      areaSqft,
      bedrooms,
      bathrooms,
      transactionType,
      propertyType,
      description,
      amenities: amenities.split(',').map(a => a.trim()).filter(Boolean),
      status: 'AVAILABLE',
      published: true
    });

    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>Property Inventory CRM</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            Managing {properties.length} Dehradun real estate listings, status, and AI description generation
          </p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setShowAIGeneratorModal(true)} className="btn btn-outline btn-sm flex items-center gap-1" style={{ color: '#B45309', borderColor: '#D97706' }}>
            <Sparkles size={16} /> AI Property Generator
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn btn-primary btn-sm flex items-center gap-1">
            <Plus size={16} /> Add Property
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="card" style={{ padding: '0.85rem 1.25rem', backgroundColor: '#FFFFFF' }}>
        <div className="flex gap-2" style={{ overflowX: 'auto' }}>
          {['ALL', 'AVAILABLE', 'DRAFT', 'UNDER_NEGOTIATION', 'RESERVED', 'SOLD', 'RENTED'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 6,
                fontSize: '0.8rem',
                fontWeight: 600,
                backgroundColor: statusFilter === st ? '#0F172A' : '#F1F5F9',
                color: statusFilter === st ? '#FFFFFF' : '#475569',
                cursor: 'pointer'
              }}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* PROPERTY TABLE */}
      <div className="card" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Code & Title</th>
                <th style={{ padding: '0.85rem 1rem' }}>Type & Location</th>
                <th style={{ padding: '0.85rem 1rem' }}>Price & Sq.ft</th>
                <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem' }}>Agent</th>
                <th style={{ padding: '0.85rem 1rem' }}>Stats</th>
                <th style={{ padding: '0.85rem 1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map(prop => (
                <tr key={prop.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#D97706', fontSize: '0.78rem' }}>{prop.propertyCode}</div>
                    <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>{prop.title}</div>
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <div style={{ color: '#1E293B', fontWeight: 600 }}>{prop.propertyType.replace('_', ' ')}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>📍 {prop.location}</div>
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#D97706' }}>{prop.priceDisplay}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{prop.areaSqft.toLocaleString('en-IN')} sq.ft</div>
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <select
                      value={prop.status}
                      onChange={(e) => updateProperty(prop.id, { status: e.target.value as PropertyStatus })}
                      style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: 6,
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        backgroundColor: prop.status === 'AVAILABLE' ? '#D1FAE5' : '#FEF3C7',
                        color: prop.status === 'AVAILABLE' ? '#065F46' : '#92400E',
                        border: 'none',
                        outline: 'none'
                      }}
                    >
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="DRAFT">DRAFT</option>
                      <option value="UNDER_NEGOTIATION">UNDER NEGOTIATION</option>
                      <option value="RESERVED">RESERVED</option>
                      <option value="SOLD">SOLD</option>
                      <option value="RENTED">RENTED</option>
                    </select>
                  </td>

                  <td style={{ padding: '1rem', color: '#475569', fontSize: '0.82rem' }}>
                    {prop.assignedAgentName || 'Priya Verma'}
                  </td>

                  <td style={{ padding: '1rem', fontSize: '0.78rem', color: '#64748B' }}>
                    👁️ {prop.viewCount} views • 📩 {prop.enquiryCount} enquiries
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <div className="flex gap-2">
                      <button onClick={() => deleteProperty(prop.id)} className="btn btn-outline btn-sm" style={{ color: '#EF4444' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI GENERATOR MODAL */}
      {showAIGeneratorModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: 480, width: '100%', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
            <div className="flex items-center gap-2" style={{ color: '#D97706', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              <Sparkles size={20} /> AI Property Description Generator
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
              Select property parameters and AI will automatically compose titles, formatted overview text, and SEO tags.
            </p>

            <div className="form-group">
              <label className="form-label">Property Category</label>
              <select value={aiType} onChange={(e) => setAiType(e.target.value)} className="form-select">
                <option value="INDEPENDENT_HOUSE">Independent House / Villa</option>
                <option value="APARTMENT">Flat / Penthouse</option>
                <option value="PLOT">Residential Plot</option>
                <option value="COMMERCIAL">Commercial Office</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Locality</label>
              <select value={aiLocation} onChange={(e) => setAiLocation(e.target.value)} className="form-select">
                {locations.map(l => (
                  <option key={l.id} value={l.name}>{l.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="form-group">
                <label className="form-label">Area (sq.ft)</label>
                <input type="number" value={aiArea} onChange={(e) => setAiArea(Number(e.target.value))} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Bedrooms</label>
                <input type="number" value={aiBeds} onChange={(e) => setAiBeds(Number(e.target.value))} className="form-input" />
              </div>
            </div>

            <div className="flex gap-2" style={{ marginTop: '1.5rem' }}>
              <button type="button" onClick={() => setShowAIGeneratorModal(false)} className="btn btn-outline flex-1">Cancel</button>
              <button type="button" onClick={() => { handleRunAIGenerator(); setShowAddModal(true); }} className="btn btn-primary flex-1">
                <Sparkles size={16} /> Generate & Fill Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD PROPERTY MODAL */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: 640, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
              Add Property Listing to Catalog
            </h3>

            <form onSubmit={handleCreatePropertySubmit}>
              <div className="form-group">
                <label className="form-label">Property Title *</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">Price (₹) *</label>
                  <input type="number" required value={price} onChange={(e) => setPrice(Number(e.target.value))} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Area (sq.ft) *</label>
                  <input type="number" required value={areaSqft} onChange={(e) => setAreaSqft(Number(e.target.value))} className="form-input" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">Transaction Type</label>
                  <select value={transactionType} onChange={(e) => setTransactionType(e.target.value as any)} className="form-select">
                    <option value="BUY">BUY</option>
                    <option value="RENT">RENT</option>
                    <option value="LEASE">LEASE</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select value={propertyType} onChange={(e) => setPropertyType(e.target.value as any)} className="form-select">
                    <option value="INDEPENDENT_HOUSE">Independent House</option>
                    <option value="APARTMENT">Apartment / Flat</option>
                    <option value="PLOT">Plot / Land</option>
                    <option value="COMMERCIAL">Commercial</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Locality</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)} className="form-select">
                  {locations.map(l => (
                    <option key={l.id} value={l.name}>{l.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Property Description</label>
                <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="form-textarea" />
              </div>

              <div className="flex gap-2" style={{ marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1">Publish Property</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
