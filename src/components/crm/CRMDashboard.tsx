import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, TrendingUp, Calendar, Clock, DollarSign, Award, Flame, 
  CheckCircle2, ArrowUpRight, Plus, Sparkles, Phone, MessageSquare 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const CRMDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { leads, properties, siteVisits, followUps, deals, staff, activeUser } = useStore();

  const hotLeads = leads.filter(l => l.temperature === 'HOT');
  const todayFollowUps = followUps.filter(f => f.status === 'PENDING');
  const todayVisits = siteVisits.filter(v => v.status === 'SCHEDULED');
  const totalRevenue = deals.reduce((acc, d) => acc + d.totalCommission, 0);
  const pendingApprovals = properties.filter(p => p.status === 'PENDING_APPROVAL' || p.approvalStatus === 'PENDING');

  // Chart Data
  const funnelData = [
    { stage: 'New Leads', count: leads.length },
    { stage: 'Qualified', count: leads.filter(l => ['QUALIFIED', 'PROPERTY_SHORTLISTED', 'SITE_VISIT', 'NEGOTIATION', 'BOOKING', 'WON'].includes(l.status)).length },
    { stage: 'Site Visits', count: siteVisits.length },
    { stage: 'Negotiation', count: leads.filter(l => l.status === 'NEGOTIATION').length },
    { stage: 'Deals Won', count: deals.length }
  ];

  const sourceData = [
    { name: 'Website', value: 45, color: '#386635' },
    { name: 'Google Ads', value: 25, color: '#2563EB' },
    { name: 'WhatsApp', value: 15, color: '#10B981' },
    { name: 'Referral', value: 10, color: '#C5A059' },
    { name: 'Walk-in', value: 5, color: '#64748B' }
  ];

  const monthlySalesData = [
    { month: 'May', sales: 18000000, revenue: 360000 },
    { month: 'Jun', sales: 24000000, revenue: 480000 },
    { month: 'Jul', sales: 31000000, revenue: 620000 },
    { month: 'Aug', sales: 42500000, revenue: 850000 },
    { month: 'Sep', sales: 56000000, revenue: 1120000 }
  ];

  return (
    <div className="flex flex-col gap-8">
      
      {/* Top Banner Greeting */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: 4 }}>
            <span className="pulse-dot"></span>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#386635', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Dehradun Central Sales Desk
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
            Welcome back, {activeUser.name} 👋
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
            Here is your live real estate sales velocity, pending visits, and commission analytics.
          </p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/admin/leads?action=new')} 
            className="btn-green btn-sm flex items-center gap-1.5"
            style={{ borderRadius: 10, padding: '0.65rem 1.25rem' }}
          >
            <Plus size={16} /> Add New Lead
          </button>
          
          <button 
            onClick={() => navigate('/admin/properties?action=new')} 
            className="btn-dark btn-sm flex items-center gap-1.5"
            style={{ borderRadius: 10, padding: '0.65rem 1.25rem' }}
          >
            <Plus size={16} /> Add Inventory
          </button>
        </div>
      </div>

      {/* PENDING APPROVALS ALERT IF ANY */}
      {pendingApprovals.length > 0 && (
        <div style={{ backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 16, padding: '1.25rem 1.75rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div className="flex items-center gap-3">
            <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#D97706', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem' }}>
              🔔
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#92400E', fontSize: '1.05rem' }}>
                {pendingApprovals.length} Owner Property Listing(s) Awaiting Review & Approval
              </div>
              <div style={{ fontSize: '0.88rem', color: '#B45309' }}>
                Owners have submitted new listings from the public website. Verify title & specs to publish live.
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/admin/properties?filter=PENDING_APPROVAL')}
            className="btn btn-sm"
            style={{ backgroundColor: '#92400E', color: '#FFFFFF', fontWeight: 800, borderRadius: 10, padding: '0.6rem 1.25rem', border: 'none', cursor: 'pointer' }}
          >
            Review & Approve Submissions →
          </button>
        </div>
      )}

      {/* METRICS KPI CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Total Leads */}
        <div className="card-luxury" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
          <div className="flex items-center justify-between" style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: 6 }}>
            <span style={{ fontWeight: 700 }}>Total CRM Leads</span>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>
            {leads.length}
          </div>
          <div className="flex items-center gap-2" style={{ fontSize: '0.78rem', marginTop: 6 }}>
            <span className="badge badge-hot flex items-center gap-1"><Flame size={12} /> {hotLeads.length} Hot Buyers</span>
            <span style={{ color: '#10B981', fontWeight: 700 }}>↑ 24% YoY</span>
          </div>
        </div>

        {/* Metric 2: Today's Follow-ups */}
        <div className="card-luxury" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
          <div className="flex items-center justify-between" style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: 6 }}>
            <span style={{ fontWeight: 700 }}>Pending Follow-ups</span>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>
            {todayFollowUps.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#B45309', fontWeight: 700, marginTop: 6 }}>
            ⚡ Immediate callbacks queued
          </div>
        </div>

        {/* Metric 3: Site Visits */}
        <div className="card-luxury" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
          <div className="flex items-center justify-between" style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: 6 }}>
            <span style={{ fontWeight: 700 }}>Scheduled Site Visits</span>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#EBF4EC', color: '#386635', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>
            {siteVisits.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: 700, marginTop: 6 }}>
            {todayVisits.length} Confirmed for today
          </div>
        </div>

        {/* Metric 4: Total Commission Revenue */}
        <div className="card-luxury" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
          <div className="flex items-center justify-between" style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: 6 }}>
            <span style={{ fontWeight: 700 }}>Earned Commission</span>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#FDF4FF', color: '#C026D3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#386635', fontFamily: 'Outfit' }}>
            ₹{(totalRevenue / 100000).toFixed(2)} L
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: 6 }}>
            Across {deals.length} closed transactions
          </div>
        </div>

      </div>

      {/* CHARTS SECTION: Sales Bar Trend + Lead Sources Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sales & Revenue Trend Chart (8 Cols) */}
        <div className="lg:col-span-8 card-luxury" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>Monthly Deal Volume & Commission Revenue</h3>
              <p style={{ fontSize: '0.82rem', color: '#64748B' }}>Dehradun transactional closures in INR</p>
            </div>
            <span className="badge badge-verified">2.0% Average Fee Split</span>
          </div>

          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySalesData}>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip 
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
                  contentStyle={{ backgroundColor: '#0B1120', color: '#FFFFFF', borderRadius: 12, border: 'none' }}
                />
                <Bar dataKey="sales" name="Deal Volume" fill="#0B1120" radius={[6, 6, 0, 0]} />
                <Bar dataKey="revenue" name="A2 Revenue" fill="#386635" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Source Pie Distribution (4 Cols) */}
        <div className="lg:col-span-4 card-luxury" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem' }}>Acquisition Channels</h3>
          <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1rem' }}>Inbound buyer inquiry sources</p>

          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={42}>
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap gap-2" style={{ fontSize: '0.78rem', justifyContent: 'center' }}>
            {sourceData.map(s => (
              <span key={s.name} className="flex items-center gap-1.5" style={{ backgroundColor: '#F8FAFC', padding: '0.25rem 0.55rem', borderRadius: 6, border: '1px solid #F1F5F9' }}>
                <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: s.color }}></span>
                <strong>{s.name}</strong> ({s.value}%)
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* TODAY'S TASKS & AGENT LEADERBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Urgent Follow-ups */}
        <div className="card-luxury" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>Priority Customer Tasks</h3>
            <button onClick={() => navigate('/admin/follow-ups')} className="btn-outline-green btn-sm">View All</button>
          </div>

          <div className="flex flex-col gap-3">
            {todayFollowUps.slice(0, 4).map(task => (
              <div 
                key={task.id} 
                className="flex items-center justify-between" 
                style={{ 
                  padding: '0.85rem 1rem', 
                  border: '1px solid #E2E8F0', 
                  borderRadius: 12, 
                  backgroundColor: '#F8FAFC',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-hot" style={{ fontSize: '0.68rem' }}>{task.type}</span>
                    <strong style={{ fontSize: '0.92rem', color: '#0F172A' }}>{task.customerName}</strong>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: 2 }}>{task.notes}</div>
                </div>

                <div className="flex gap-1.5">
                  <a href={`tel:${task.customerPhone}`} className="btn-dark btn-sm" style={{ padding: '0.35rem 0.65rem' }}>
                    <Phone size={13} />
                  </a>
                  <a 
                    href={`https://wa.me/91${task.customerPhone}?text=Hello%20${encodeURIComponent(task.customerName)}%2C%20following%20up%20from%20A2%20Realtors`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp btn-sm" 
                    style={{ padding: '0.35rem 0.65rem' }}
                  >
                    <MessageSquare size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Agent Leaderboard */}
        <div className="card-luxury" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
            Valley Sales Leaderboard
          </h3>
          
          <div className="flex flex-col gap-3.5">
            {staff.slice(0, 4).map((agent, idx) => (
              <div 
                key={agent.id} 
                className="flex items-center justify-between" 
                style={{ 
                  padding: '0.85rem 1rem', 
                  border: '1px solid #F1F5F9', 
                  borderRadius: 12,
                  backgroundColor: '#FFFFFF'
                }}
              >
                <div className="flex items-center gap-3">
                  <div style={{ fontWeight: 900, color: idx === 0 ? '#C5A059' : '#64748B', fontSize: '1.1rem', width: 24 }}>
                    #{idx + 1}
                  </div>
                  <img src={agent.avatar} alt={agent.name} style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', border: '2px solid #386635' }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>{agent.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{agent.role.replace('_', ' ')}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ color: '#0F172A', fontSize: '1rem', fontFamily: 'Outfit' }}>{agent.dealsClosed} Deals</strong>
                  <div style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: 700 }}>⭐ {agent.rating} Rating</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
