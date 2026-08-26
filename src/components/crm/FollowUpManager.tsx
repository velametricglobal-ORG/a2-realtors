import React, { useState } from 'react';
import { Clock, CheckCircle2, Phone, MessageSquare, Plus, AlertCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const FollowUpManager: React.FC = () => {
  const { followUps, completeFollowUp, addFollowUp, leads, generateWhatsAppFollowup } = useStore();
  const [tabFilter, setTabFilter] = useState<'PENDING' | 'COMPLETED'>('PENDING');

  const filteredTasks = followUps.filter(f => {
    if (tabFilter === 'PENDING') return f.status === 'PENDING';
    return f.status === 'COMPLETED';
  });

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>Follow-up Task Manager</h1>
        <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
          Schedule and complete daily client call tasks, WhatsApp reminders, and document collection.
        </p>
      </div>

      {/* Tabs */}
      <div className="card" style={{ padding: '0.85rem 1.25rem', backgroundColor: '#FFFFFF' }}>
        <div className="flex gap-2">
          <button
            onClick={() => setTabFilter('PENDING')}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: 6,
              fontSize: '0.85rem',
              fontWeight: 700,
              backgroundColor: tabFilter === 'PENDING' ? '#0F172A' : '#F1F5F9',
              color: tabFilter === 'PENDING' ? '#FFFFFF' : '#475569',
              cursor: 'pointer'
            }}
          >
            Pending Tasks ({followUps.filter(f => f.status === 'PENDING').length})
          </button>
          <button
            onClick={() => setTabFilter('COMPLETED')}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: 6,
              fontSize: '0.85rem',
              fontWeight: 700,
              backgroundColor: tabFilter === 'COMPLETED' ? '#0F172A' : '#F1F5F9',
              color: tabFilter === 'COMPLETED' ? '#FFFFFF' : '#475569',
              cursor: 'pointer'
            }}
          >
            Completed History ({followUps.filter(f => f.status === 'COMPLETED').length})
          </button>
        </div>
      </div>

      {/* TASKS LIST */}
      <div className="flex flex-col gap-4">
        {filteredTasks.map(task => {
          const lead = leads.find(l => l.id === task.leadId);
          const waText = lead ? generateWhatsAppFollowup(lead) : 'Hi from A2 Realtors Dehradun';

          return (
            <div key={task.id} className="card" style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div className="flex items-center gap-3">
                <div style={{ padding: '0.65rem', borderRadius: '50%', backgroundColor: task.status === 'COMPLETED' ? '#D1FAE5' : '#FEF3C7', color: task.status === 'COMPLETED' ? '#065F46' : '#B45309' }}>
                  <Clock size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-featured" style={{ fontSize: '0.68rem' }}>{task.type}</span>
                    <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '1rem' }}>{task.customerName}</span>
                    <span style={{ fontSize: '0.78rem', color: '#64748B' }}>({task.customerPhone})</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#334155', marginTop: 4 }}>{task.notes}</div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: 2 }}>
                    Scheduled: {task.scheduledAt} • Assigned to: {task.assignedUserName}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a href={`tel:${task.customerPhone}`} className="btn btn-outline btn-sm">
                  <Phone size={14} /> Call
                </a>
                <a
                  href={`https://wa.me/${task.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp btn-sm"
                >
                  <MessageSquare size={14} /> WhatsApp
                </a>
                {task.status === 'PENDING' && (
                  <button onClick={() => completeFollowUp(task.id)} className="btn btn-primary btn-sm flex items-center gap-1">
                    <CheckCircle2 size={14} /> Mark Done
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
