import React, { useState } from 'react';
import { 
  Users, Flame, Phone, MessageSquare, Plus, Search, Filter, Calendar, CheckCircle2, ChevronRight, Sparkles, X
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Lead, LeadStatus, LeadTemperature } from '../../types';

export const LeadManagement: React.FC = () => {
  const { 
    leads, addLead, updateLeadStatus, generateWhatsAppFollowup, generateLeadAISummary, locations, staff 
  } = useStore();

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [tempFilter, setTempFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Modal State for New Lead
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [newMaxBudget, setNewMaxBudget] = useState(15000000);
  const [newLocation, setNewLocation] = useState('Dalanwala, Dehradun');
  const [newBeds, setNewBeds] = useState(3);

  const filteredLeads = leads.filter(l => {
    if (statusFilter !== 'ALL' && l.status !== statusFilter) return false;
    if (tempFilter !== 'ALL' && l.temperature !== tempFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = l.customerName.toLowerCase().includes(q);
      const matchPhone = l.phone.includes(q);
      const matchCode = l.leadCode.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchCode) return false;
    }
    return true;
  });

  const handleCreateLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName || !newPhone) return;

    addLead({
      customerName: newCustomerName,
      phone: newPhone,
      whatsapp: newPhone,
      email: newEmail,
      requirementSummary: newRequirement || `Requirement intake for ${newBeds} BHK in ${newLocation}`,
      maxBudget: newMaxBudget,
      preferredLocation: newLocation,
      preferredBedrooms: newBeds,
      source: 'PHONE',
      temperature: 'HOT'
    });

    setShowAddModal(false);
    setNewCustomerName('');
    setNewPhone('');
  };

  const getTempBadge = (temp: LeadTemperature) => {
    if (temp === 'HOT') return <span className="badge badge-hot flex items-center gap-1"><Flame size={11} /> HOT</span>;
    if (temp === 'WARM') return <span className="badge badge-warm">WARM</span>;
    return <span className="badge badge-cold">COLD</span>;
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>Lead Management CRM</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            Showing {filteredLeads.length} leads with automated scoring and buyer intent tracking
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-primary btn-sm flex items-center gap-1">
          <Plus size={16} /> Add Lead Manually
        </button>
      </div>

      {/* Filter Tabs Bar */}
      <div className="card" style={{ padding: '1rem 1.25rem', backgroundColor: '#FFFFFF' }}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Status Tabs */}
          <div className="flex gap-1" style={{ overflowX: 'auto', paddingBottom: 2 }}>
            {['ALL', 'NEW', 'QUALIFIED', 'SITE_VISIT', 'NEGOTIATION', 'WON', 'LOST'].map(st => (
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

          {/* Search Box */}
          <div style={{ position: 'relative', width: 260 }}>
            <input
              type="text"
              placeholder="Search lead name/phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.2rem', height: 36, fontSize: '0.82rem' }}
            />
            <Search size={14} style={{ position: 'absolute', left: 10, top: 11, color: '#94A3B8' }} />
          </div>

        </div>
      </div>

      {/* LEADS TABLE */}
      <div className="card" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Lead Code & Client</th>
                <th style={{ padding: '0.85rem 1rem' }}>Requirement & Budget</th>
                <th style={{ padding: '0.85rem 1rem' }}>Score</th>
                <th style={{ padding: '0.85rem 1rem' }}>Intent</th>
                <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem' }}>Agent</th>
                <th style={{ padding: '0.85rem 1rem' }}>Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => {
                const waText = generateWhatsAppFollowup(lead);
                return (
                  <tr key={lead.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    
                    {/* Client & Phone */}
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 700, color: '#D97706', fontSize: '0.78rem' }}>{lead.leadCode}</div>
                      <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>{lead.customerName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{lead.phone}</div>
                    </td>

                    {/* Requirement & Budget */}
                    <td style={{ padding: '1rem', maxWidth: 280 }}>
                      <div style={{ color: '#1E293B', fontWeight: 600 }}>{lead.preferredLocation || 'Dehradun'} ({lead.preferredBedrooms || 3} BHK)</div>
                      <div style={{ fontSize: '0.82rem', color: '#D97706', fontWeight: 700 }}>
                        Max ₹{(lead.maxBudget / 10000000).toFixed(2)} Cr
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {lead.requirementSummary}
                      </div>
                    </td>

                    {/* Score */}
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: '50%', backgroundColor: lead.score >= 80 ? '#FEF3C7' : '#F1F5F9', color: lead.score >= 80 ? '#B45309' : '#334155', fontWeight: 800, fontSize: '0.85rem' }}>
                        {lead.score}
                      </div>
                    </td>

                    {/* Temperature Intent */}
                    <td style={{ padding: '1rem' }}>
                      {getTempBadge(lead.temperature)}
                    </td>

                    {/* Status Dropdown */}
                    <td style={{ padding: '1rem' }}>
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: 6,
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #CBD5E1',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="NEW">NEW</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="PROPERTY_SHORTLISTED">SHORTLISTED</option>
                        <option value="SITE_VISIT">SITE VISIT</option>
                        <option value="NEGOTIATION">NEGOTIATION</option>
                        <option value="BOOKING">BOOKING</option>
                        <option value="WON">WON</option>
                        <option value="LOST">LOST</option>
                      </select>
                    </td>

                    {/* Agent */}
                    <td style={{ padding: '1rem', color: '#475569', fontSize: '0.82rem' }}>
                      {lead.assignedAgentName}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '1rem' }}>
                      <div className="flex gap-2">
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waText)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-whatsapp btn-sm"
                          title="Generate & Send WhatsApp Message"
                        >
                          <MessageSquare size={14} />
                        </a>
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="btn btn-outline btn-sm"
                          title="View Lead Summary & History"
                        >
                          <Sparkles size={14} /> AI Info
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* LEAD AI SUMMARY DRAWER / MODAL */}
      {selectedLead && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: 540, width: '100%', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 16, position: 'relative' }}>
            <button
              onClick={() => setSelectedLead(null)}
              style={{ position: 'absolute', top: 16, right: 16, width: 30, height: 30, borderRadius: '50%', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={16} />
            </button>

            <div style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: 700 }}>{selectedLead.leadCode}</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
              {selectedLead.customerName}
            </h3>
            <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>{selectedLead.phone} • Source: {selectedLead.source}</div>

            {/* AI Summary Box */}
            <div style={{ backgroundColor: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem' }}>
              <div className="flex items-center gap-1" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#B45309', marginBottom: 4 }}>
                <Sparkles size={14} /> AI Executive Summary
              </div>
              <p style={{ fontSize: '0.88rem', color: '#78350F', lineHeight: 1.5 }}>
                {generateLeadAISummary(selectedLead)}
              </p>
            </div>

            {/* History Audit Timeline */}
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>Activity History Timeline</h4>
            <div className="flex flex-col gap-2" style={{ maxHeight: 160, overflowY: 'auto' }}>
              {selectedLead.history && selectedLead.history.map(item => (
                <div key={item.id} style={{ fontSize: '0.8rem', backgroundColor: '#F8FAFC', padding: '0.5rem 0.75rem', borderRadius: 6, borderLeft: '3px solid #D97706' }}>
                  <div className="flex justify-between" style={{ fontWeight: 600, color: '#0F172A' }}>
                    <span>{item.type}</span>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{item.timestamp}</span>
                  </div>
                  <div style={{ color: '#475569' }}>{item.description}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button onClick={() => setSelectedLead(null)} className="btn btn-dark btn-sm">Close</button>
            </div>

          </div>
        </div>
      )}

      {/* CREATE LEAD MODAL */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: 480, width: '100%', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
              Add New Lead into CRM
            </h3>

            <form onSubmit={handleCreateLeadSubmit}>
              <div className="form-group">
                <label className="form-label">Client Name *</label>
                <input type="text" required placeholder="e.g. Dr. Alok Aggarwal" value={newCustomerName} onChange={(e) => setNewCustomerName(e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone / WhatsApp Number *</label>
                <input type="tel" required placeholder="+91 98970 00000" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} className="form-input" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">Max Budget (₹)</label>
                  <input type="number" value={newMaxBudget} onChange={(e) => setNewMaxBudget(Number(e.target.value))} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Bedrooms</label>
                  <input type="number" value={newBeds} onChange={(e) => setNewBeds(Number(e.target.value))} className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Preferred Locality</label>
                <select value={newLocation} onChange={(e) => setNewLocation(e.target.value)} className="form-select">
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.name}>{loc.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2" style={{ marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1">Add Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
