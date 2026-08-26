import React, { useState } from 'react';
import { Target, Sparkles, MessageSquare, Check, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Lead } from '../../types';

export const PropertyMatcher: React.FC = () => {
  const { leads, matchPropertiesForLead, generateWhatsAppFollowup } = useStore();

  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || '');

  const selectedLead = leads.find(l => l.id === selectedLeadId) || leads[0];
  const matchedResults = selectedLead ? matchPropertiesForLead(selectedLead) : [];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <div className="badge badge-featured" style={{ marginBottom: '0.5rem', display: 'inline-flex' }}>
          🎯 Automated PropTech Intelligence
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>Automated Property Matcher</h1>
        <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
          Identifies properties matching buyer budget, location, bedrooms, and specs with algorithmic percentage confidence.
        </p>
      </div>

      {/* Lead Selector Box */}
      <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
        <label className="form-label" style={{ fontSize: '0.95rem' }}>Select Buyer Lead to Match:</label>
        <select
          value={selectedLeadId}
          onChange={(e) => setSelectedLeadId(e.target.value)}
          className="form-select"
          style={{ fontSize: '1rem', padding: '0.75rem', fontWeight: 600 }}
        >
          {leads.map(l => (
            <option key={l.id} value={l.id}>
              {l.leadCode} — {l.customerName} ({l.preferredLocation || 'Dehradun'} | Max ₹{(l.maxBudget / 10000000).toFixed(2)} Cr)
            </option>
          ))}
        </select>

        {selectedLead && (
          <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 10, marginTop: '1rem', border: '1px solid #E2E8F0', fontSize: '0.88rem' }}>
            <div style={{ fontWeight: 700, color: '#0F172A' }}>Lead Requirement Breakdown:</div>
            <div style={{ color: '#475569', marginTop: 4 }}>
              <strong>Type:</strong> {selectedLead.leadType} • <strong>Location:</strong> {selectedLead.preferredLocation} • <strong>Bedrooms:</strong> {selectedLead.preferredBedrooms || 3} BHK • <strong>Budget:</strong> Up to ₹{(selectedLead.maxBudget / 10000000).toFixed(2)} Cr
            </div>
          </div>
        )}
      </div>

      {/* Matched Results Grid */}
      <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A' }}>
        Top Matched Properties ({matchedResults.length} Inventory Items Analyzed)
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {matchedResults.map(({ property, matchScore, reasons }) => {
          const waMessage = encodeURIComponent(
            `Hi ${selectedLead.customerName} Ji,\n\nBased on your requirement for ${selectedLead.preferredLocation}, we have found a ${matchScore}% MATCHING property:\n\n🏡 ${property.title}\n📍 Location: ${property.location}\n💰 Price: ${property.priceDisplay}\n📐 Area: ${property.areaSqft} sq.ft (${property.bedrooms} Beds)\n\nWould you like to schedule a site visit?\n\nRegards,\nA2 Realtors Dehradun`
          );

          return (
            <div key={property.id} className="card" style={{ backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              
              {/* Match Score Badge */}
              <div style={{ position: 'absolute', top: 12, right: 12, backgroundColor: matchScore >= 80 ? '#D1FAE5' : '#FEF3C7', color: matchScore >= 80 ? '#065F46' : '#92400E', padding: '0.35rem 0.75rem', borderRadius: 20, fontWeight: 800, fontSize: '0.85rem', zIndex: 2, border: '1px solid currentColor' }}>
                🎯 {matchScore}% Match
              </div>

              <img src={property.images[0]?.url} alt={property.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />

              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D97706' }}>{property.propertyCode}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>{property.title}</h3>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#D97706', marginBottom: '0.75rem' }}>{property.priceDisplay}</div>

                {/* Match Reasons */}
                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: 8, fontSize: '0.8rem', marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#334155', marginBottom: 4 }}>Matching Criteria:</div>
                  {reasons.map((r, i) => (
                    <div key={i} className="flex items-center gap-1" style={{ color: '#10B981', marginBottom: 2 }}>
                      <Check size={12} /> {r}
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=${waMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-whatsapp btn-sm w-full"
                    style={{ width: '100%' }}
                  >
                    <MessageSquare size={14} /> Send Matched Property via WhatsApp
                  </a>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
