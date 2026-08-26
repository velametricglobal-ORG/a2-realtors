import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, XCircle, Phone, MessageSquare, Plus } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { SiteVisit } from '../../types';

export const SiteVisitsManager: React.FC = () => {
  const { siteVisits, updateSiteVisitStatus, scheduleSiteVisit, leads, properties } = useStore();

  const [selectedVisit, setSelectedVisit] = useState<SiteVisit | null>(null);
  const [outcome, setOutcome] = useState('');
  const [feedback, setFeedback] = useState('');

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(leads[0]?.id || '');
  const [selectedPropertyId, setSelectedPropertyId] = useState(properties[0]?.id || '');
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]);
  const [visitTime, setVisitTime] = useState('11:00 AM');

  const handleCreateVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleSiteVisit({
      leadId: selectedLeadId,
      propertyId: selectedPropertyId,
      visitDate,
      visitTime
    });
    setShowScheduleModal(false);
  };

  const handleOutcomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVisit) return;
    updateSiteVisitStatus(selectedVisit.id, 'COMPLETED', outcome, feedback);
    setSelectedVisit(null);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>Site Visit Management</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            Tracking guided property inspections, customer feedback, and post-visit negotiations
          </p>
        </div>

        <button onClick={() => setShowScheduleModal(true)} className="btn btn-primary btn-sm flex items-center gap-1">
          <Plus size={16} /> Schedule Site Visit
        </button>
      </div>

      {/* VISITS TABLE */}
      <div className="card" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Date & Time</th>
                <th style={{ padding: '0.85rem 1rem' }}>Client Name</th>
                <th style={{ padding: '0.85rem 1rem' }}>Property Inspected</th>
                <th style={{ padding: '0.85rem 1rem' }}>Agent</th>
                <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem' }}>Outcome / Feedback</th>
                <th style={{ padding: '0.85rem 1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {siteVisits.map(sv => (
                <tr key={sv.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>📅 {sv.visitDate}</div>
                    <div style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: 600 }}>⏰ {sv.visitTime}</div>
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>{sv.customerName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{sv.customerPhone}</div>
                  </td>

                  <td style={{ padding: '1rem', maxWidth: 240 }}>
                    <div style={{ fontWeight: 600, color: '#1E293B' }}>{sv.propertyTitle}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>📍 {sv.propertyLocation}</div>
                  </td>

                  <td style={{ padding: '1rem', fontSize: '0.82rem', color: '#475569' }}>
                    {sv.agentName}
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <span className={`badge ${sv.status === 'COMPLETED' ? 'badge-verified' : sv.status === 'SCHEDULED' ? 'badge-featured' : 'badge-hot'}`}>
                      {sv.status}
                    </span>
                  </td>

                  <td style={{ padding: '1rem', fontSize: '0.82rem', color: '#334155', maxWidth: 220 }}>
                    {sv.customerFeedback || sv.outcome || <span style={{ color: '#94A3B8' }}>Pending Outcome</span>}
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <button
                      onClick={() => { setSelectedVisit(sv); setOutcome(sv.outcome || ''); setFeedback(sv.customerFeedback || ''); }}
                      className="btn btn-outline btn-sm"
                    >
                      Record Outcome
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECORD OUTCOME MODAL */}
      {selectedVisit && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: 480, width: '100%', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Record Site Visit Outcome
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
              Client: <strong>{selectedVisit.customerName}</strong> for {selectedVisit.propertyTitle}
            </p>

            <form onSubmit={handleOutcomeSubmit}>
              <div className="form-group">
                <label className="form-label">Visit Outcome</label>
                <select value={outcome} onChange={(e) => setOutcome(e.target.value)} className="form-select">
                  <option value="OFFER_MADE">Offer Made / Price Negotiating</option>
                  <option value="LIKED_WANTS_SECOND_VISIT">Liked / Requested 2nd Visit</option>
                  <option value="NOT_INTERESTED">Not Interested</option>
                  <option value="REJECTED_LOCATION">Rejected Location</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Client Feedback Notes</label>
                <textarea rows={3} value={feedback} onChange={(e) => setFeedback(e.target.value)} className="form-textarea" placeholder="e.g. Liked room sizes, asked for 5% discount on price..." />
              </div>

              <div className="flex gap-2" style={{ marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setSelectedVisit(null)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1">Save Visit Outcome</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCHEDULE VISIT MODAL */}
      {showScheduleModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: 480, width: '100%', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
              Schedule Site Visit
            </h3>

            <form onSubmit={handleCreateVisitSubmit}>
              <div className="form-group">
                <label className="form-label">Select Lead / Buyer *</label>
                <select value={selectedLeadId} onChange={(e) => setSelectedLeadId(e.target.value)} className="form-select">
                  {leads.map(l => (
                    <option key={l.id} value={l.id}>{l.customerName} ({l.phone})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Select Property *</label>
                <select value={selectedPropertyId} onChange={(e) => setSelectedPropertyId(e.target.value)} className="form-select">
                  {properties.map(p => (
                    <option key={p.id} value={p.id}>{p.propertyCode} — {p.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input type="date" required value={visitDate} onChange={(e) => setVisitDate(e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Time *</label>
                  <select value={visitTime} onChange={(e) => setVisitTime(e.target.value)} className="form-select">
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2" style={{ marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowScheduleModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1">Schedule Visit</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
