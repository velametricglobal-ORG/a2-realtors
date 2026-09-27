import React, { useState } from 'react';
import { UserCheck, Plus, CheckCircle2, Phone, Home } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const OwnerManagement: React.FC = () => {
  const { owners, addOwner, properties } = useStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('Dalanwala, Dehradun');
  const [askingPriceNotes, setAskingPriceNotes] = useState('');

  const handleAddOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    addOwner({
      fullName,
      phone,
      email,
      address,
      askingPriceNotes
    });
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>Property Owner CRM</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            Managing verified Dehradun property sellers, title verification status, and asking price benchmarks
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-primary btn-sm flex items-center gap-1">
          <Plus size={16} /> Add Property Owner
        </button>
      </div>

      {/* OWNERS TABLE */}
      <div className="card" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Owner Name & Contact</th>
                <th style={{ padding: '0.85rem 1rem' }}>Address</th>
                <th style={{ padding: '0.85rem 1rem' }}>Owned Inventory</th>
                <th style={{ padding: '0.85rem 1rem' }}>Asking Price Notes</th>
                <th style={{ padding: '0.85rem 1rem' }}>Verification</th>
                <th style={{ padding: '0.85rem 1rem' }}>Assigned Consultant</th>
              </tr>
            </thead>
            <tbody>
              {owners.map(owner => {
                const ownedProps = properties.filter(p => p.ownerId === owner.id || owner.propertiesOwned?.includes(p.id));

                return (
                  <tr key={owner.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>{owner.fullName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{owner.phone}</div>
                    </td>

                    <td style={{ padding: '1rem', color: '#475569', fontSize: '0.85rem' }}>
                      📍 {owner.address}
                    </td>

                    <td style={{ padding: '1rem' }}>
                      {ownedProps.length === 0 ? (
                        <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>No properties linked</span>
                      ) : (
                        ownedProps.map(p => (
                          <div key={p.id} className="flex items-center gap-1.5" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A', marginBottom: 4 }}>
                            <Home size={12} style={{ color: '#386635' }} /> 
                            <span>{p.propertyCode}</span>
                            {p.status === 'PENDING_APPROVAL' ? (
                              <span style={{ backgroundColor: '#FEF3C7', color: '#92400E', fontSize: '0.68rem', padding: '0.1rem 0.4rem', borderRadius: 10, fontWeight: 700 }}>Pending Approval</span>
                            ) : p.published ? (
                              <span style={{ backgroundColor: '#EBF4EC', color: '#386635', fontSize: '0.68rem', padding: '0.1rem 0.4rem', borderRadius: 10, fontWeight: 700 }}>Live</span>
                            ) : (
                              <span style={{ backgroundColor: '#F1F5F9', color: '#64748B', fontSize: '0.68rem', padding: '0.1rem 0.4rem', borderRadius: 10, fontWeight: 700 }}>Draft</span>
                            )}
                          </div>
                        ))
                      )}
                    </td>

                    <td style={{ padding: '1rem', fontSize: '0.82rem', color: '#334155', maxWidth: 220 }}>
                      {owner.askingPriceNotes || 'Flexible'}
                    </td>

                    <td style={{ padding: '1rem' }}>
                      <span className={`badge ${owner.verificationStatus === 'VERIFIED' ? 'badge-verified' : 'badge-hot'} flex items-center gap-1`}>
                        <CheckCircle2 size={12} /> {owner.verificationStatus}
                      </span>
                    </td>

                    <td style={{ padding: '1rem', fontSize: '0.82rem', color: '#475569' }}>
                      {owner.assignedAgentName || 'Central Desk'}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD OWNER MODAL */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: 480, width: '100%', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
              Add Property Owner Record
            </h3>

            <form onSubmit={handleAddOwnerSubmit}>
              <div className="form-group">
                <label className="form-label">Owner Full Name *</label>
                <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-input" placeholder="e.g. Lt. Gen. Devender Bisht" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone / WhatsApp Number *</label>
                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" placeholder="+91 94120 00000" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Property / Home Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Asking Price & Terms</label>
                <textarea rows={2} value={askingPriceNotes} onChange={(e) => setAskingPriceNotes(e.target.value)} className="form-textarea" placeholder="Asking price benchmarks, payment terms..." />
              </div>

              <div className="flex gap-2" style={{ marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1">Save Owner Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
