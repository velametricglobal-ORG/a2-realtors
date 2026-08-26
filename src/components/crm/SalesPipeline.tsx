import React from 'react';
import { useStore } from '../../context/StoreContext';
import { LeadStatus } from '../../types';
import { Flame, MessageSquare, ChevronRight, Phone } from 'lucide-react';

export const SalesPipeline: React.FC = () => {
  const { leads, updateLeadStatus, generateWhatsAppFollowup } = useStore();

  const pipelineColumns: { status: LeadStatus; label: string; color: string }[] = [
    { status: 'NEW', label: '1. New Intake', color: '#3B82F6' },
    { status: 'QUALIFIED', label: '2. Qualified Lead', color: '#6366F1' },
    { status: 'PROPERTY_SHORTLISTED', label: '3. Shortlisted', color: '#8B5CF6' },
    { status: 'SITE_VISIT', label: '4. Site Visit', color: '#D97706' },
    { status: 'NEGOTIATION', label: '5. Negotiation', color: '#F59E0B' },
    { status: 'BOOKING', label: '6. Booking / Deal', color: '#10B981' },
    { status: 'WON', label: '7. Closed Won', color: '#059669' }
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>Kanban Sales Pipeline</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            Visual deal workflow across 7 stages. Move leads between columns to update CRM status.
          </p>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="kanban-board">
        {pipelineColumns.map(col => {
          const colLeads = leads.filter(l => l.status === col.status);
          const totalVal = colLeads.reduce((acc, l) => acc + (l.maxBudget || 0), 0);

          return (
            <div key={col.status} className="kanban-column">
              
              {/* Column Header */}
              <div className="flex items-center justify-between" style={{ borderBottom: `3px solid ${col.color}`, paddingBottom: '0.5rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0F172A' }}>{col.label}</div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#FFFFFF', padding: '0.1rem 0.5rem', borderRadius: 10, border: '1px solid #CBD5E1' }}>
                  {colLeads.length}
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                Pipe: ₹{(totalVal / 10000000).toFixed(2)} Cr
              </div>

              {/* Cards List */}
              <div className="flex flex-col gap-3" style={{ flexGrow: 1, minHeight: 450 }}>
                {colLeads.map(lead => {
                  const waText = generateWhatsAppFollowup(lead);
                  return (
                    <div key={lead.id} className="kanban-card">
                      
                      <div className="flex justify-between items-start" style={{ marginBottom: 4 }}>
                        <span style={{ fontSize: '0.72rem', color: '#D97706', fontWeight: 700 }}>{lead.leadCode}</span>
                        {lead.temperature === 'HOT' && <span className="badge badge-hot" style={{ fontSize: '0.65rem' }}>🔥 HOT</span>}
                      </div>

                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>{lead.customerName}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{lead.preferredLocation}</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D97706', marginTop: 4 }}>
                        Max ₹{(lead.maxBudget / 10000000).toFixed(2)} Cr
                      </div>

                      {/* Quick Move Selector */}
                      <div className="flex items-center justify-between gap-1" style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid #F1F5F9' }}>
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                          style={{ fontSize: '0.72rem', padding: '0.2rem', borderRadius: 4, border: '1px solid #E2E8F0', outline: 'none' }}
                        >
                          {pipelineColumns.map(c => (
                            <option key={c.status} value={c.status}>Move to {c.label}</option>
                          ))}
                        </select>

                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waText)}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#25D366' }}
                          title="WhatsApp Followup"
                        >
                          <MessageSquare size={16} />
                        </a>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
