import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Target, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MarketingCRM: React.FC = () => {
  const { campaigns } = useStore();

  const totalBudget = campaigns.reduce((acc, c) => acc + c.budget, 0);
  const totalLeads = campaigns.reduce((acc, c) => acc + c.leadsGenerated, 0);
  const totalRev = campaigns.reduce((acc, c) => acc + c.revenueGenerated, 0);

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>Marketing Campaign ROI</h1>
        <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
          Tracking inbound ad spend across Google, Meta, WhatsApp, Referrals, and offline banners
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: 4 }}>Total Ad Spend</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>
            ₹{totalBudget.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: 4 }}>Leads Generated</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#3B82F6', fontFamily: 'Outfit' }}>
            {totalLeads} Leads
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: 4 }}>Revenue Attributed</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10B981', fontFamily: 'Outfit' }}>
            ₹{(totalRev / 100000).toFixed(2)} Lakhs
          </div>
        </div>
      </div>

      {/* CAMPAIGN TABLE */}
      <div className="card" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Campaign Name</th>
                <th style={{ padding: '0.85rem 1rem' }}>Channel</th>
                <th style={{ padding: '0.85rem 1rem' }}>Budget</th>
                <th style={{ padding: '0.85rem 1rem' }}>Leads</th>
                <th style={{ padding: '0.85rem 1rem' }}>Deals Closed</th>
                <th style={{ padding: '0.85rem 1rem' }}>Revenue</th>
                <th style={{ padding: '0.85rem 1rem' }}>ROI %</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(camp => (
                <tr key={camp.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  
                  <td style={{ padding: '1rem', fontWeight: 700, color: '#0F172A' }}>
                    {camp.name}
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <span className="badge badge-featured">{camp.channel}</span>
                  </td>

                  <td style={{ padding: '1rem', color: '#475569' }}>
                    ₹{camp.budget.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: '1rem', fontWeight: 700, color: '#3B82F6' }}>
                    {camp.leadsGenerated} ({camp.qualifiedLeads} Qual)
                  </td>

                  <td style={{ padding: '1rem', fontWeight: 700, color: '#0F172A' }}>
                    {camp.dealsClosed} Deals
                  </td>

                  <td style={{ padding: '1rem', fontWeight: 800, color: '#D97706' }}>
                    ₹{(camp.revenueGenerated / 100000).toFixed(2)} L
                  </td>

                  <td style={{ padding: '1rem', fontWeight: 800, color: '#10B981' }}>
                    🚀 {camp.roiPercentage}% ROI
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
