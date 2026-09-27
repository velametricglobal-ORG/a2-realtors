import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Home, Plus, Sparkles, CheckCircle2, Edit, Trash2, Eye, ShieldCheck, X, 
  ExternalLink, Check, Image as ImageIcon, MapPin, Building2, Clock, 
  AlertCircle, User, Phone, Mail, FileCheck
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Property, PropertyStatus, PropertyType, TransactionType } from '../../types';

export const PropertyCRM: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { 
    properties, addProperty, updateProperty, deleteProperty, 
    approveProperty, rejectProperty, locations, generateAIDescription 
  } = useStore();

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAIGeneratorModal, setShowAIGeneratorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Check URL params for filter=PENDING_APPROVAL or action=new
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    const actionParam = searchParams.get('action');
    if (filterParam) {
      setStatusFilter(filterParam);
    }
    if (actionParam === 'new') {
      resetForm();
      setShowAddModal(true);
    }
  }, [searchParams]);

  // Selected property for editing
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(14500000);
  const [location, setLocation] = useState('Dalanwala, Dehradun');
  const [address, setAddress] = useState('Dalanwala, Dehradun, Uttarakhand');
  const [areaSqft, setAreaSqft] = useState<number>(2200);
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(3);
  const [transactionType, setTransactionType] = useState<TransactionType>('BUY');
  const [propertyType, setPropertyType] = useState<PropertyType>('INDEPENDENT_HOUSE');
  const [constructionStatus, setConstructionStatus] = useState<any>('READY_TO_MOVE');
  const [status, setStatus] = useState<PropertyStatus>('AVAILABLE');
  const [published, setPublished] = useState<boolean>(true);
  const [featured, setFeatured] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200');
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState<string>('Parking, Power Backup, Water Supply, Modular Kitchen, Gated Community');

  // AI Generator Inputs
  const [aiType, setAiType] = useState('INDEPENDENT_HOUSE');
  const [aiLocation, setAiLocation] = useState('Dalanwala, Dehradun');
  const [aiArea, setAiArea] = useState(2500);
  const [aiBeds, setAiBeds] = useState(3);

  const pendingApprovals = properties.filter(p => p.status === 'PENDING_APPROVAL' || p.approvalStatus === 'PENDING');

  const showNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const filteredProperties = properties.filter(p => {
    if (statusFilter !== 'ALL') {
      if (statusFilter === 'PENDING_APPROVAL') {
        if (p.status !== 'PENDING_APPROVAL' && p.approvalStatus !== 'PENDING') return false;
      } else if (p.status !== statusFilter) {
        return false;
      }
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchCode = p.propertyCode.toLowerCase().includes(q);
      const matchLoc = p.location.toLowerCase().includes(q);
      const matchOwner = p.submittedBy?.name?.toLowerCase().includes(q) || false;
      if (!matchTitle && !matchCode && !matchLoc && !matchOwner) return false;
    }
    return true;
  });

  const resetForm = () => {
    setTitle('');
    setPrice(14500000);
    setLocation(locations[0]?.name || 'Dalanwala, Dehradun');
    setAddress('Dalanwala, Dehradun, Uttarakhand');
    setAreaSqft(2200);
    setBedrooms(3);
    setBathrooms(3);
    setTransactionType('BUY');
    setPropertyType('INDEPENDENT_HOUSE');
    setConstructionStatus('READY_TO_MOVE');
    setStatus('AVAILABLE');
    setPublished(true);
    setFeatured(false);
    setVerified(true);
    setImageUrl('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200');
    setDescription('');
    setAmenities('Parking, Power Backup, Water Supply, Modular Kitchen, Gated Community');
    setEditingPropertyId(null);
  };

  const openEditModal = (prop: Property) => {
    setEditingPropertyId(prop.id);
    setTitle(prop.title);
    setPrice(prop.price);
    setLocation(prop.location);
    setAddress(prop.address || `${prop.location}, Dehradun`);
    setAreaSqft(prop.areaSqft);
    setBedrooms(prop.bedrooms || 3);
    setBathrooms(prop.bathrooms || 3);
    setTransactionType(prop.transactionType);
    setPropertyType(prop.propertyType);
    setConstructionStatus(prop.constructionStatus || 'READY_TO_MOVE');
    setStatus(prop.status === 'PENDING_APPROVAL' ? 'AVAILABLE' : prop.status);
    setPublished(prop.status === 'PENDING_APPROVAL' ? true : prop.published !== false);
    setFeatured(prop.featured || false);
    setVerified(prop.verified !== false);
    setImageUrl(prop.images?.[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200');
    setDescription(prop.description || '');
    setAmenities((prop.amenities || []).join(', '));
    setShowEditModal(true);
  };

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
    setAddress(`${aiLocation}, Dehradun`);
    setAreaSqft(aiArea);
    setBedrooms(aiBeds);
    setShowAIGeneratorModal(false);
  };

  const handleCreatePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !areaSqft) return;

    const parsedAmenities = amenities.split(',').map(a => a.trim()).filter(Boolean);
    const priceDisplay = price >= 10000000 ? `₹${(price / 10000000).toFixed(2)} Cr` : `₹${(price / 100000).toFixed(2)} Lakhs`;

    const newProp = addProperty({
      title,
      price,
      priceDisplay,
      location,
      address,
      areaSqft,
      bedrooms: (propertyType === 'PLOT' || propertyType === 'COMMERCIAL') ? undefined : bedrooms,
      bathrooms: (propertyType === 'PLOT') ? undefined : bathrooms,
      transactionType,
      propertyType,
      constructionStatus,
      description,
      amenities: parsedAmenities,
      status,
      published,
      featured,
      verified,
      images: [
        { id: `img-${Date.now()}`, url: imageUrl, isPrimary: true, caption: 'Main Elevation' }
      ]
    });

    setShowAddModal(false);
    resetForm();
    showNotification(`Property "${newProp.title}" created successfully! It is now live on the public website.`);
  };

  const handleUpdatePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPropertyId || !title || !price || !areaSqft) return;

    const parsedAmenities = amenities.split(',').map(a => a.trim()).filter(Boolean);
    const priceDisplay = price >= 10000000 ? `₹${(price / 10000000).toFixed(2)} Cr` : `₹${(price / 100000).toFixed(2)} Lakhs`;

    updateProperty(editingPropertyId, {
      title,
      price,
      priceDisplay,
      location,
      address,
      areaSqft,
      bedrooms: (propertyType === 'PLOT' || propertyType === 'COMMERCIAL') ? undefined : bedrooms,
      bathrooms: (propertyType === 'PLOT') ? undefined : bathrooms,
      transactionType,
      propertyType,
      constructionStatus,
      description,
      amenities: parsedAmenities,
      status,
      published,
      approvalStatus: status === 'AVAILABLE' ? 'APPROVED' : undefined,
      featured,
      verified,
      images: [
        { id: `img-${Date.now()}`, url: imageUrl, isPrimary: true, caption: 'Main Elevation' }
      ]
    });

    setShowEditModal(false);
    resetForm();
    showNotification(`Property "${title}" updated successfully! Changes are live on the public website.`);
  };

  const handleApprove = (prop: Property) => {
    approveProperty(prop.id);
    showNotification(`✓ Property "${prop.title}" (${prop.propertyCode}) APPROVED! It is now live across the public website.`);
  };

  const handleReject = (prop: Property) => {
    const reason = window.prompt(`Please enter rejection reason for "${prop.title}":`, 'Documentation incomplete or invalid contact details');
    if (reason !== null) {
      rejectProperty(prop.id, reason);
      showNotification(`✕ Property "${prop.title}" marked as REJECTED.`);
    }
  };

  const handleDeleteProperty = (id: string, propTitle: string) => {
    if (window.confirm(`Are you sure you want to delete property "${propTitle}"? This cannot be undone.`)) {
      deleteProperty(id);
      showNotification(`Property "${propTitle}" deleted successfully.`);
    }
  };

  const handleTogglePublish = (prop: Property) => {
    const nextPublished = !prop.published;
    updateProperty(prop.id, { published: nextPublished });
    showNotification(`Property "${prop.title}" is now ${nextPublished ? 'PUBLISHED (Live on Public Website)' : 'HIDDEN (Draft Mode)'}.`);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>Property Inventory & Approvals CRM</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            Manage inventory listings, review user-submitted properties, and approve listings to go live on the public website.
          </p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setShowAIGeneratorModal(true)} 
            className="btn btn-outline btn-sm flex items-center gap-1.5" 
            style={{ color: '#386635', borderColor: '#386635', fontWeight: 700 }}
          >
            <Sparkles size={16} /> AI Generator
          </button>
          <button 
            onClick={() => { resetForm(); setShowAddModal(true); }} 
            className="btn btn-primary btn-sm flex items-center gap-1.5"
            style={{ backgroundColor: '#386635', fontWeight: 700 }}
          >
            <Plus size={16} /> Add Inventory
          </button>
        </div>
      </div>

      {/* PENDING APPROVALS ATTENTION BANNER */}
      {pendingApprovals.length > 0 && (
        <div style={{ backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 14, padding: '1rem 1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div className="flex items-center gap-3">
            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#D97706', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem' }}>
              🔔
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#92400E', fontSize: '1rem' }}>
                {pendingApprovals.length} Owner Listed Property(s) Awaiting Admin Approval
              </div>
              <div style={{ fontSize: '0.85rem', color: '#B45309' }}>
                Properties submitted from the public website require verification before appearing live to buyers.
              </div>
            </div>
          </div>

          <button
            onClick={() => setStatusFilter('PENDING_APPROVAL')}
            className="btn btn-sm"
            style={{ backgroundColor: '#92400E', color: '#FFFFFF', fontWeight: 700, borderRadius: 8, padding: '0.5rem 1rem', border: 'none', cursor: 'pointer' }}
          >
            Review Approvals ({pendingApprovals.length})
          </button>
        </div>
      )}

      {/* Success Notification Alert */}
      {successMessage && (
        <div style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '0.9rem 1.25rem', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #A7F3D0', fontWeight: 600, fontSize: '0.9rem' }}>
          <CheckCircle2 size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Filter Tabs & Search Bar */}
      <div className="card" style={{ padding: '1rem 1.25rem', backgroundColor: '#FFFFFF', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #E2E8F0' }}>
        <div className="flex gap-2" style={{ overflowX: 'auto' }}>
          {['ALL', 'PENDING_APPROVAL', 'AVAILABLE', 'DRAFT', 'UNDER_NEGOTIATION', 'RESERVED', 'SOLD', 'REJECTED'].map(st => {
            const isPending = st === 'PENDING_APPROVAL';
            const count = isPending ? pendingApprovals.length : 0;
            const isSelected = statusFilter === st;

            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: 8,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  backgroundColor: isSelected ? (isPending ? '#D97706' : '#386635') : (isPending && count > 0 ? '#FEF3C7' : '#F1F5F9'),
                  color: isSelected ? '#FFFFFF' : (isPending && count > 0 ? '#92400E' : '#475569'),
                  border: isPending && count > 0 && !isSelected ? '1px solid #FCD34D' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                {isPending ? `Pending Approvals` : st.replace('_', ' ')}
                {isPending && count > 0 && (
                  <span style={{ backgroundColor: isSelected ? '#FFFFFF' : '#D97706', color: isSelected ? '#D97706' : '#FFFFFF', padding: '0.1rem 0.45rem', borderRadius: 12, fontSize: '0.72rem', fontWeight: 800 }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <input 
          type="text" 
          placeholder="Search by Code, Title, Locality, or Owner..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input"
          style={{ maxWidth: 320, padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
        />
      </div>

      {/* PROPERTY TABLE */}
      <div className="card" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Property Code & Title</th>
                <th style={{ padding: '0.85rem 1rem' }}>Category & Locality</th>
                <th style={{ padding: '0.85rem 1rem' }}>Asking Price & Area</th>
                <th style={{ padding: '0.85rem 1rem' }}>Submitted By / Source</th>
                <th style={{ padding: '0.85rem 1rem' }}>Approval & Live Status</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Admin Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '3.5rem', textAlign: 'center', color: '#64748B' }}>
                    {statusFilter === 'PENDING_APPROVAL' ? (
                      <div className="flex flex-col items-center gap-2">
                        <CheckCircle2 size={32} style={{ color: '#10B981' }} />
                        <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '1.1rem' }}>All Caught Up!</span>
                        <span>There are no pending property approvals awaiting review.</span>
                      </div>
                    ) : (
                      'No properties match the selected criteria.'
                    )}
                  </td>
                </tr>
              ) : (
                filteredProperties.map(prop => {
                  const isPending = prop.status === 'PENDING_APPROVAL' || prop.approvalStatus === 'PENDING';

                  return (
                    <tr key={prop.id} style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: isPending ? '#FFFDF5' : 'transparent' }}>
                      
                      {/* Property Code & Title */}
                      <td style={{ padding: '1rem', minWidth: 260 }}>
                        <div className="flex items-center gap-3">
                          <img 
                            src={prop.images?.[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200'} 
                            alt={prop.title} 
                            style={{ width: 54, height: 54, borderRadius: 8, objectFit: 'cover', flexShrink: 0, border: '1px solid #E2E8F0' }}
                          />
                          <div>
                            <span style={{ fontWeight: 800, color: '#386635', fontSize: '0.78rem' }}>{prop.propertyCode}</span>
                            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.92rem', lineHeight: 1.3 }}>{prop.title}</div>
                            {prop.featured && <span style={{ fontSize: '0.7rem', color: '#D97706', fontWeight: 800 }}>★ FEATURED</span>}
                          </div>
                        </div>
                      </td>

                      {/* Category & Locality */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ color: '#1E293B', fontWeight: 700 }}>{prop.propertyType.replace('_', ' ')}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <MapPin size={12} /> {prop.location}
                        </div>
                      </td>

                      {/* Pricing & Area */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>
                          {prop.priceDisplay || (prop.price >= 10000000 ? `₹${(prop.price / 10000000).toFixed(2)} Cr` : `₹${(prop.price / 100000).toFixed(2)} L`)}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                          {prop.areaSqft?.toLocaleString('en-IN')} sq.ft {prop.bedrooms ? `• ${prop.bedrooms} BHK` : ''}
                        </div>
                      </td>

                      {/* Submitted By / Source */}
                      <td style={{ padding: '1rem' }}>
                        {prop.submittedBy ? (
                          <div>
                            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.85rem' }}>
                              👤 {prop.submittedBy.name}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#386635', fontWeight: 600 }}>
                              📞 {prop.submittedBy.phone}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                              Date: {prop.createdAt}
                            </div>
                          </div>
                        ) : (
                          <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                            Internal Inventory <br />
                            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Agent: {prop.assignedAgentName || 'Central Desk'}</span>
                          </div>
                        )}
                      </td>

                      {/* Status & Public Visibility */}
                      <td style={{ padding: '1rem' }}>
                        {isPending ? (
                          <div className="flex flex-col gap-1">
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, backgroundColor: '#FEF3C7', color: '#92400E', padding: '0.25rem 0.65rem', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, width: 'fit-content' }}>
                              <Clock size={12} /> Pending Approval
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#B45309' }}>Hidden from Website</span>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1">
                            <select
                              value={prop.status}
                              onChange={(e) => {
                                const nextSt = e.target.value as PropertyStatus;
                                updateProperty(prop.id, { 
                                  status: nextSt,
                                  published: nextSt === 'AVAILABLE' ? true : prop.published
                                });
                                showNotification(`Status for ${prop.propertyCode} updated to ${nextSt}`);
                              }}
                              style={{
                                padding: '0.3rem 0.6rem',
                                borderRadius: 6,
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                backgroundColor: prop.status === 'AVAILABLE' ? '#D1FAE5' : prop.status === 'SOLD' ? '#FEE2E2' : '#FEF3C7',
                                color: prop.status === 'AVAILABLE' ? '#065F46' : prop.status === 'SOLD' ? '#991B1B' : '#92400E',
                                border: '1px solid rgba(0,0,0,0.05)',
                                outline: 'none',
                                cursor: 'pointer'
                              }}
                            >
                              <option value="AVAILABLE">AVAILABLE</option>
                              <option value="DRAFT">DRAFT</option>
                              <option value="UNDER_NEGOTIATION">UNDER NEGOTIATION</option>
                              <option value="RESERVED">RESERVED</option>
                              <option value="SOLD">SOLD</option>
                              <option value="RENTED">RENTED</option>
                              <option value="REJECTED">REJECTED</option>
                            </select>

                            <button
                              onClick={() => handleTogglePublish(prop)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                padding: '0.2rem 0.5rem',
                                borderRadius: 14,
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                backgroundColor: prop.published ? '#EBF4EC' : '#F1F5F9',
                                color: prop.published ? '#386635' : '#64748B',
                                border: prop.published ? '1px solid #386635' : '1px solid #CBD5E1',
                                cursor: 'pointer',
                                width: 'fit-content'
                              }}
                            >
                              {prop.published ? <Check size={10} /> : <X size={10} />}
                              {prop.published ? 'Live on Site' : 'Hidden'}
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Admin Actions */}
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        {isPending ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleApprove(prop)}
                              className="btn btn-sm flex items-center gap-1"
                              style={{ backgroundColor: '#386635', color: '#FFFFFF', fontWeight: 800, fontSize: '0.78rem', padding: '0.4rem 0.85rem' }}
                              title="Approve & Publish to Public Website"
                            >
                              <CheckCircle2 size={14} /> Approve & Publish
                            </button>

                            <button 
                              onClick={() => openEditModal(prop)} 
                              className="btn btn-outline btn-sm" 
                              style={{ padding: '0.4rem 0.65rem', color: '#0F172A', borderColor: '#CBD5E1' }}
                              title="Review / Edit before approving"
                            >
                              <Edit size={14} />
                            </button>

                            <button 
                              onClick={() => handleReject(prop)} 
                              className="btn btn-outline btn-sm" 
                              style={{ padding: '0.4rem 0.65rem', color: '#EF4444', borderColor: '#FCA5A5' }}
                              title="Reject Submission"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <a 
                              href={`/property/${prop.id}`} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="btn btn-outline btn-sm" 
                              style={{ padding: '0.35rem 0.65rem', color: '#386635', borderColor: '#386635' }}
                              title="View Live Page on Public Website"
                            >
                              <Eye size={14} />
                            </a>
                            
                            <button 
                              onClick={() => openEditModal(prop)} 
                              className="btn btn-outline btn-sm" 
                              style={{ padding: '0.35rem 0.65rem', color: '#0F172A', borderColor: '#CBD5E1' }}
                              title="Edit Property Listing"
                            >
                              <Edit size={14} />
                            </button>
                            
                            <button 
                              onClick={() => handleDeleteProperty(prop.id, prop.title)} 
                              className="btn btn-outline btn-sm" 
                              style={{ padding: '0.35rem 0.65rem', color: '#EF4444', borderColor: '#FCA5A5' }}
                              title="Delete Property"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI GENERATOR MODAL */}
      {showAIGeneratorModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ maxWidth: 480, width: '100%', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
            <div className="flex items-center gap-2" style={{ color: '#386635', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              <Sparkles size={20} /> AI Property Description Generator
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
              Choose property parameters and AI will automatically compose high-converting titles, descriptions, and highlights.
            </p>

            <div className="form-group">
              <label className="form-label">Property Category</label>
              <select value={aiType} onChange={(e) => setAiType(e.target.value)} className="form-select">
                <option value="INDEPENDENT_HOUSE">Independent House / Luxury Villa</option>
                <option value="APARTMENT">Apartment / Penthouse</option>
                <option value="PLOT">Residential Plot / Land</option>
                <option value="COMMERCIAL">Commercial Showroom / Office</option>
                <option value="FARMHOUSE">Farmhouse / Mountain Estate</option>
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
              <button 
                type="button" 
                onClick={() => { handleRunAIGenerator(); setShowAddModal(true); }} 
                className="btn btn-primary flex-1"
                style={{ backgroundColor: '#386635' }}
              >
                <Sparkles size={16} /> Generate & Fill Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD PROPERTY MODAL */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ maxWidth: 740, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2.25rem', backgroundColor: '#FFFFFF', borderRadius: 20, position: 'relative' }}>
            
            <button 
              onClick={() => setShowAddModal(false)} 
              style={{ position: 'absolute', top: 20, right: 20, background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
              Add Property Listing to Public Website
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Create a new listing. It will immediately appear on the Homepage, Search, and Category pages.
            </p>

            <form onSubmit={handleCreatePropertySubmit}>
              <div className="form-group">
                <label className="form-label">Property Title *</label>
                <input 
                  type="text" 
                  required 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="form-input" 
                  placeholder="e.g. 4 BHK Heritage Villa with Panoramic Forest Views"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Price (₹ INR) *</label>
                  <input 
                    type="number" 
                    required 
                    value={price} 
                    onChange={(e) => setPrice(Number(e.target.value))} 
                    className="form-input" 
                  />
                  <span style={{ fontSize: '0.78rem', color: '#386635', fontWeight: 700, marginTop: 4, display: 'block' }}>
                    Preview: {price >= 10000000 ? `₹${(price / 10000000).toFixed(2)} Cr` : `₹${(price / 100000).toFixed(2)} Lakhs`}
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">Super Built-up Area (sq.ft) *</label>
                  <input 
                    type="number" 
                    required 
                    value={areaSqft} 
                    onChange={(e) => setAreaSqft(Number(e.target.value))} 
                    className="form-input" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select value={propertyType} onChange={(e) => setPropertyType(e.target.value as any)} className="form-select">
                    <option value="INDEPENDENT_HOUSE">Independent House / Villa</option>
                    <option value="APARTMENT">Apartment / Flat</option>
                    <option value="PLOT">Residential Plot / Land</option>
                    <option value="COMMERCIAL">Commercial Space</option>
                    <option value="FARMHOUSE">Farmhouse / Estate</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Transaction Type</label>
                  <select value={transactionType} onChange={(e) => setTransactionType(e.target.value as any)} className="form-select">
                    <option value="BUY">BUY / SALE</option>
                    <option value="RENT">RENT</option>
                    <option value="LEASE">LEASE</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Construction Status</label>
                  <select value={constructionStatus} onChange={(e) => setConstructionStatus(e.target.value)} className="form-select">
                    <option value="READY_TO_MOVE">Ready to Move</option>
                    <option value="UNDER_CONSTRUCTION">Under Construction</option>
                    <option value="NEW_LAUNCH">New Launch</option>
                  </select>
                </div>
              </div>

              {propertyType !== 'PLOT' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Bedrooms (BHK)</label>
                    <input type="number" value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))} className="form-input" min={1} max={20} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Bathrooms</label>
                    <input type="number" value={bathrooms} onChange={(e) => setBathrooms(Number(e.target.value))} className="form-input" min={1} max={20} />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Locality / Sector</label>
                  <select value={location} onChange={(e) => { setLocation(e.target.value); setAddress(`${e.target.value}, Dehradun, Uttarakhand`); }} className="form-select">
                    {locations.map(l => (
                      <option key={l.id} value={l.name}>{l.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Full Address</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-input" placeholder="e.g. 24 Inder Road, Dalanwala, Dehradun" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Primary Image URL</label>
                <input 
                  type="text" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)} 
                  className="form-input" 
                  placeholder="https://images.unsplash.com/..." 
                />
                {imageUrl && (
                  <div style={{ marginTop: 8 }}>
                    <img src={imageUrl} alt="Preview" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, border: '1px solid #E2E8F0' }} />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Amenities (Comma-separated)</label>
                <input type="text" value={amenities} onChange={(e) => setAmenities(e.target.value)} className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Full Property Description</label>
                <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="form-textarea" placeholder="Describe the layout, neighborhood, sunlight, orientation, and architectural highlights..." />
              </div>

              <div className="flex flex-wrap items-center gap-6" style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 10, margin: '1.25rem 0' }}>
                <label className="flex items-center gap-2" style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem' }}>
                  <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#386635' }} />
                  <span>Publish to Public Website</span>
                </label>

                <label className="flex items-center gap-2" style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem' }}>
                  <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#386635' }} />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2" style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem' }}>
                  <input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#386635' }} />
                  <span>Verified Legal Title</span>
                </label>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1" style={{ backgroundColor: '#386635', fontWeight: 700 }}>
                  Publish Property Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT / REVIEW PROPERTY MODAL */}
      {showEditModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ maxWidth: 740, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2.25rem', backgroundColor: '#FFFFFF', borderRadius: 20, position: 'relative' }}>
            
            <button 
              onClick={() => setShowEditModal(false)} 
              style={{ position: 'absolute', top: 20, right: 20, background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
              Review & Edit Property Listing
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Update property specifications. Click <strong>"Save & Publish Live"</strong> to make it visible on the public website.
            </p>

            <form onSubmit={handleUpdatePropertySubmit}>
              <div className="form-group">
                <label className="form-label">Property Title *</label>
                <input 
                  type="text" 
                  required 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Price (₹ INR) *</label>
                  <input 
                    type="number" 
                    required 
                    value={price} 
                    onChange={(e) => setPrice(Number(e.target.value))} 
                    className="form-input" 
                  />
                  <span style={{ fontSize: '0.78rem', color: '#386635', fontWeight: 700, marginTop: 4, display: 'block' }}>
                    Formatted: {price >= 10000000 ? `₹${(price / 10000000).toFixed(2)} Cr` : `₹${(price / 100000).toFixed(2)} Lakhs`}
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">Super Built-up Area (sq.ft) *</label>
                  <input 
                    type="number" 
                    required 
                    value={areaSqft} 
                    onChange={(e) => setAreaSqft(Number(e.target.value))} 
                    className="form-input" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select value={propertyType} onChange={(e) => setPropertyType(e.target.value as any)} className="form-select">
                    <option value="INDEPENDENT_HOUSE">Independent House / Villa</option>
                    <option value="APARTMENT">Apartment / Flat</option>
                    <option value="PLOT">Residential Plot / Land</option>
                    <option value="COMMERCIAL">Commercial Space</option>
                    <option value="FARMHOUSE">Farmhouse / Estate</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Transaction Type</label>
                  <select value={transactionType} onChange={(e) => setTransactionType(e.target.value as any)} className="form-select">
                    <option value="BUY">BUY / SALE</option>
                    <option value="RENT">RENT</option>
                    <option value="LEASE">LEASE</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Listing Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="form-select">
                    <option value="AVAILABLE">AVAILABLE (Approved)</option>
                    <option value="PENDING_APPROVAL">PENDING APPROVAL</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="UNDER_NEGOTIATION">UNDER NEGOTIATION</option>
                    <option value="RESERVED">RESERVED</option>
                    <option value="SOLD">SOLD</option>
                    <option value="RENTED">RENTED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>
              </div>

              {propertyType !== 'PLOT' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Bedrooms (BHK)</label>
                    <input type="number" value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))} className="form-input" min={1} max={20} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Bathrooms</label>
                    <input type="number" value={bathrooms} onChange={(e) => setBathrooms(Number(e.target.value))} className="form-input" min={1} max={20} />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Locality / Sector</label>
                  <select value={location} onChange={(e) => setLocation(e.target.value)} className="form-select">
                    {locations.map(l => (
                      <option key={l.id} value={l.name}>{l.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Full Address</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-input" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Primary Image URL</label>
                <input 
                  type="text" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)} 
                  className="form-input" 
                />
                {imageUrl && (
                  <div style={{ marginTop: 8 }}>
                    <img src={imageUrl} alt="Preview" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, border: '1px solid #E2E8F0' }} />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Amenities (Comma-separated)</label>
                <input type="text" value={amenities} onChange={(e) => setAmenities(e.target.value)} className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Property Description</label>
                <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="form-textarea" />
              </div>

              <div className="flex flex-wrap items-center gap-6" style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 10, margin: '1.25rem 0' }}>
                <label className="flex items-center gap-2" style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem' }}>
                  <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#386635' }} />
                  <span>Publish to Public Website (Make Live)</span>
                </label>

                <label className="flex items-center gap-2" style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem' }}>
                  <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#386635' }} />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2" style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem' }}>
                  <input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#386635' }} />
                  <span>Verified Legal Title</span>
                </label>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setShowEditModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1" style={{ backgroundColor: '#386635', fontWeight: 700 }}>
                  Save & Publish Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
