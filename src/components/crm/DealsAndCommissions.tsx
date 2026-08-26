import React, { useState } from 'react';
import { DollarSign, Award, Plus, CheckCircle2, TrendingUp } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { DealStage } from '../../types';

export const DealsAndCommissions: React.FC = () => {
  const { deals, createDeal, updateDealStage, leads, properties, owners } = useStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [customerName, setCustomerName] = useState('Dr. Alok Aggarwal');
  const [ownerName, setOwnerName] = useState('Lt. Gen. Devender Bisht');
  const [dealValue, setDealValue] = useState<number>(34500000);
  const [bookingAmount, setBookingAmount] = useState<number>(1000000);

  const totalDealValueSum = deals.reduce((acc, d) => acc + d.dealValue, 0);
  const totalCommissionSum = deals.reduce((acc, d) => acc + d.totalCommission, 0);

  const handleCreateDealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDeal({
      customerName,
      ownerName,
      dealValue,
      bookingAmount,
      commissionPercentage: 2.0,
      stage: 'NEGOTIATION'
    });
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>Deal & Commission Management</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            Tracking transactional deal values, booking amounts, 2% commission calculations, and agent payouts
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-primary btn-sm flex items-center gap-1">
          <Plus size={16} /> Record New Deal
        </button>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: 4 }}>Total Deal Pipeline Value</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>
            ₹{(totalDealValueSum / 10000000).toFixed(2)} Cr
          </div>
        </div>
        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: 4 }}>Gross Commission (2%)</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#D97706', fontFamily: 'Outfit' }}>
            ₹{(totalCommissionSum / 100000).toFixed(2)} Lakhs
          </div>
        </div>
        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: 4 }}>Agent Pool Split (50%)</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10B981', fontFamily: 'Outfit' }}>
            ₹{((totalCommissionSum * 0.5) / 100000).toFixed(2)} Lakhs
          </div>
        </div>
      </div>

      {/* DEALS TABLE */}
      <div className="card" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Deal Code & Property</th>
                <th style={{ padding: '0.85rem 1rem' }}>Buyer & Seller</th>
                <th style={{ padding: '0.85rem 1rem' }}>Deal Value (₹)</th>
                <th style={{ padding: '0.85rem 1rem' }}>Gross Comm (2%)</th>
                <th style={{ padding: '0.85rem 1rem' }}>Agent Split</th>
                <th style={{ padding: '0.85rem 1rem' }}>Stage</th>
                <th style={{ padding: '0.85rem 1rem' }}>Closing Date</th>
              </tr>
            </thead>
            <tbody>
              {deals.map(deal => (
                <tr key={deal.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#D97706', fontSize: '0.78rem' }}>{deal.dealCode}</div>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>{deal.propertyTitle}</div>
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600, color: '#0F172A' }}>Buyer: {deal.customerName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Owner: {deal.ownerName}</div>
                  </td>

                  <td style={{ padding: '1rem', fontWeight: 800, color: '#0F172A' }}>
                    ₹{(deal.dealValue / 10000000).toFixed(2)} Cr
                  </td>

                  <td style={{ padding: '1rem', fontWeight: 800, color: '#D97706' }}>
                    ₹{(deal.totalCommission / 100000).toFixed(2)} L
                  </td>

                  <td style={{ padding: '1rem', color: '#10B981', fontWeight: 700 }}>
                    ₹{(deal.agentCommissionSplit / 100000).toFixed(2)} L ({deal.agentName})
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <select
                      value={deal.stage}
                      onChange={(e) => updateDealStage(deal.id, e.target.value as DealStage)}
                      style={{ padding: '0.2rem 0.5rem', borderRadius: 6, fontSize: '0.78rem', fontWeight: 700, outline: 'none' }}
                    >
                      <option value="NEGOTIATION">NEGOTIATION</option>
                      <option value="BOOKING">BOOKING</option>
                      <option value="AGREEMENT">AGREEMENT</option>
                      <option value="PAYMENT">PAYMENT</option>
                      <option value="CLOSING">CLOSING</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                  </td>

                  <td style={{ padding: '1rem', fontSize: '0.82rem', color: '#64748B' }}>
                    {deal.closingDate}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECORD DEAL MODAL */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: 480, width: '100%', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
              Record Property Transaction Deal
            </h3>

            <form onSubmit={handleCreateDealSubmit}>
              <div className="form-group">
                <label className="form-label">Buyer Client Name *</label>
                <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Property Owner Name *</label>
                <input type="text" required value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="form-input" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">Agreed Deal Value (₹) *</label>
                  <input type="number" required value={dealValue} onChange={(e) => setDealValue(Number(e.target.value))} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Booking Token (₹)</label>
                  <input type="number" value={bookingAmount} onChange={(e) => setBookingAmount(Number(e.target.value))} className="form-input" />
                </div>
              </div>

              <div style={{ backgroundColor: '#FEF3C7', padding: '0.75rem', borderRadius: 8, fontSize: '0.82rem', color: '#92400E', margin: '0.5rem 0 1rem 0' }}>
                💰 Calculated 2% Commission: <strong>₹{((dealValue * 0.02) / 100000).toFixed(2)} Lakhs</strong> (Split: 50% Agent / 50% Agency)
              </div>

              <div className="flex gap-2" style={{ marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1">Record Deal</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
