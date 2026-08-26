import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, TrendingUp, Calendar, Clock, DollarSign, Award, Flame, CheckCircle2, ArrowUpRight, Plus 
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

  // Chart Data
  const funnelData = [
    { stage: 'New Leads', count: leads.length },
    { stage: 'Qualified', count: leads.filter(l => ['QUALIFIED', 'PROPERTY_SHORTLISTED', 'SITE_VISIT', 'NEGOTIATION', 'BOOKING', 'WON'].includes(l.status)).length },
    { stage: 'Site Visits', count: siteVisits.length },
    { stage: 'Negotiation', count: leads.filter(l => l.status === 'NEGOTIATION').length },
    { stage: 'Deals Won', count: deals.length }
  ];

  const sourceData = [
    { name: 'Website', value: 45, color: '#D97706' },
    { name: 'Google Ads', value: 25, color: '#3B82F6' },
    { name: 'WhatsApp', value: 15, color: '#10B981' },
    { name: 'Referral', value: 10, color: '#8B5CF6' },
    { name: 'Offline', value: 5, color: '#64748B' }
  ];

  const monthlySalesData = [
    { month: 'May', sales: 18000000, revenue: 360000 },
    { month: 'Jun', sales: 24000000, revenue: 480000 },
    { month: 'Jul', sales: 31000000, revenue: 620000 },
    { month: 'Aug', sales: 42500000, revenue: 850000 }
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Banner Greeting */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>
            Good Morning, {activeUser.name} 👋
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
            Here is what's happening with A2 Realtors Dehradun today.
          </p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => navigate('/admin/leads?action=new')} className="btn btn-primary btn-sm flex items-center gap-1">
            <Plus size={16} /> Add New Lead
          </button>
          <button onClick={() => navigate('/admin/properties?action=new')} className="btn btn-dark btn-sm flex items-center gap-1">
            <Plus size={16} /> Add Property
          </button>
        </div>
      </div>

      {/* METRICS CARDS GRID (Section 22) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Leads */}
        <div className="card" style={{ padding: '1.25rem', backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between" style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: 4 }}>
            <span>Total CRM Leads</span>
            <Users size={18} style={{ color: '#3B82F6' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>{leads.length}</div>
          <div className="flex items-center gap-2" style={{ fontSize: '0.78rem', marginTop: 4 }}>
            <span className="badge badge-hot flex items-center gap-1"><Flame size={11} /> {hotLeads.length} Hot Buyers</span>
            <span style={{ color: '#10B981', fontWeight: 600 }}>↑ 18% vs last month</span>
          </div>
        </div>

        {/* Metric 2: Today's Follow-ups */}
        <div className="card" style={{ padding: '1.25rem', backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between" style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: 4 }}>
            <span>Today's Follow-ups</span>
            <Clock size={18} style={{ color: '#D97706' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>{todayFollowUps.length}</div>
          <div style={{ fontSize: '0.78rem', color: '#B45309', fontWeight: 600, marginTop: 4 }}>
            ⚡ Urgent calls pending for agents
          </div>
        </div>

        {/* Metric 3: Site Visits */}
        <div className="card" style={{ padding: '1.25rem', backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between" style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: 4 }}>
            <span>Site Visits Scheduled</span>
            <Calendar size={18} style={{ color: '#10B981' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>{siteVisits.length}</div>
          <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600, marginTop: 4 }}>
            {todayVisits.length} Confirmed for today
          </div>
        </div>

        {/* Metric 4: Total Commission Revenue */}
        <div className="card" style={{ padding: '1.25rem', backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between" style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: 4 }}>
            <span>Total Commission Earned</span>
            <DollarSign size={18} style={{ color: '#8B5CF6' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#D97706', fontFamily: 'Outfit' }}>
            ₹{(totalRevenue / 100000).toFixed(2)} L
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: 4 }}>
            From {deals.length} active closed deals
          </div>
        </div>

      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales & Revenue Trend Chart */}
        <div className="lg:col-span-2 card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>Monthly Sales Volume & Revenue</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Dehradun transactional values in INR</p>
            </div>
            <span className="badge badge-verified">2.0% Commission Split</span>
          </div>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySalesData}>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip />
                <Bar dataKey="sales" name="Sales Volume (₹)" fill="#0F172A" radius={[6, 6, 0, 0]} />
                <Bar dataKey="revenue" name="Commission (₹)" fill="#D97706" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Source Pie Distribution */}
        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>Lead Sources</h3>
          <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '1rem' }}>Inbound inquiry channels</p>

          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={65} innerRadius={35}>
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
              <span key={s.name} className="flex items-center gap-1">
                <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: s.color }}></span>
                {s.name} ({s.value}%)
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* TODAY'S TASKS & AGENT LEADERBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Urgent Follow-ups */}
        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>Today's Urgent Tasks</h3>
            <button onClick={() => navigate('/admin/follow-ups')} className="btn btn-outline btn-sm" style={{ fontSize: '0.78rem' }}>View All</button>
          </div>

          <div className="flex flex-col gap-3">
            {todayFollowUps.slice(0, 3).map(task => (
              <div key={task.id} className="flex items-center justify-between" style={{ padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: 8, backgroundColor: '#F8FAFC' }}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-hot" style={{ fontSize: '0.68rem' }}>{task.type}</span>
                    <strong style={{ fontSize: '0.9rem', color: '#0F172A' }}>{task.customerName}</strong>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: 2 }}>{task.notes}</div>
                </div>
                <a href={`tel:${task.customerPhone}`} className="btn btn-whatsapp btn-sm">
                  Call
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Leaderboard */}
        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Top Agent Leaderboard</h3>
          <div className="flex flex-col gap-3">
            {staff.slice(0, 3).map((agent, idx) => (
              <div key={agent.id} className="flex items-center justify-between" style={{ padding: '0.65rem 0.85rem', border: '1px solid #F1F5F9', borderRadius: 8 }}>
                <div className="flex items-center gap-3">
                  <div style={{ fontWeight: 800, color: '#D97706', width: 20 }}>#{idx + 1}</div>
                  <img src={agent.avatar} alt={agent.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }}>{agent.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{agent.role.replace('_', ' ')}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ color: '#0F172A', fontSize: '0.95rem' }}>{agent.dealsClosed} Deals</strong>
                  <div style={{ fontSize: '0.75rem', color: '#10B981' }}>⭐ {agent.rating} Rating</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
