import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, MessageSquare, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface ChatMessage {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  timestamp: string;
}

export const AISalesAssistant: React.FC = () => {
  const { leads, properties, followUps, staff, generateWhatsAppFollowup } = useStore();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'AI',
      text: 'Namaste! I am your A2 Realtors AI Sales Copilot. Ask me natural queries about hot buyers, property matches, urgent follow-ups, or WhatsApp message generation.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const samplePrompts = [
    "Show me hot buyers looking for 3 BHK houses under ₹2 crore.",
    "Which leads need follow-up today?",
    "Which agent has the highest conversion rate?",
    "Write a WhatsApp follow-up message for Dr. Alok Aggarwal."
  ];

  const handleQuerySubmit = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'USER',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');

    // Process Natural Query Intelligence
    setTimeout(() => {
      let aiResponseText = '';
      const q = queryText.toLowerCase();

      if (q.includes('hot buyer') || q.includes('3 bhk') || q.includes('2 crore')) {
        const hotLeads = leads.filter(l => l.temperature === 'HOT' || l.maxBudget <= 20000000);
        aiResponseText = `Found ${hotLeads.length} Hot Buyers matching your criteria:\n\n` + 
          hotLeads.map(l => `• ${l.leadCode} ${l.customerName} (${l.phone}): Budget ₹${(l.maxBudget / 10000000).toFixed(2)} Cr in ${l.preferredLocation}. Status: ${l.status}`).join('\n');
      } else if (q.includes('follow-up') || q.includes('today')) {
        const pending = followUps.filter(f => f.status === 'PENDING');
        aiResponseText = `You have ${pending.length} Pending Follow-ups Today:\n\n` + 
          pending.map(f => `• ${f.customerName} (${f.type}) at ${f.scheduledAt.slice(11, 16)}. Notes: ${f.notes}`).join('\n');
      } else if (q.includes('agent') || q.includes('conversion') || q.includes('highest')) {
        const topAgent = staff[0];
        aiResponseText = `Top Performing Agent:\n🏆 ${topAgent.name} (${topAgent.role})\n• Rating: ${topAgent.rating}/5.0\n• Deals Closed: ${topAgent.dealsClosed} deals`;
      } else if (q.includes('whatsapp') || q.includes('dr. alok') || q.includes('alok')) {
        const alokLead = leads.find(l => l.customerName.toLowerCase().includes('alok')) || leads[0];
        aiResponseText = `Generated WhatsApp Followup for ${alokLead.customerName}:\n\n` + generateWhatsAppFollowup(alokLead);
      } else {
        aiResponseText = `Analyzed CRM Store:\n• Total Active Leads: ${leads.length}\n• Available Properties: ${properties.length}\n• Scheduled Site Visits: ${followUps.length}\n\nHow else can I assist your sales team today?`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'AI',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: '0.35rem' }}>AI Sales Assistant & Copilot</h1>
        <p style={{ color: '#64748B', fontSize: '0.92rem' }}>
          Query your CRM database in natural English or Hindi to extract hot leads, agent performance, or draft client communications.
        </p>
      </div>

      {/* Quick Prompts Bar */}
      <div className="flex flex-wrap gap-2">
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleQuerySubmit(prompt)}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: 20,
              fontSize: '0.8rem',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              color: '#334155',
              cursor: 'pointer',
              fontWeight: 500,
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            💬 "{prompt}"
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="card" style={{ height: 500, backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', padding: '1.25rem' }}>
        
        {/* Messages History */}
        <div className="flex flex-col gap-3" style={{ flexGrow: 1, overflowY: 'auto', paddingRight: 4 }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.sender === 'USER' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                backgroundColor: msg.sender === 'USER' ? '#0F172A' : '#F8FAFC',
                color: msg.sender === 'USER' ? '#FFFFFF' : '#0F172A',
                border: msg.sender === 'AI' ? '1px solid #E2E8F0' : 'none',
                padding: '0.85rem 1.15rem',
                borderRadius: 14,
                fontSize: '0.92rem',
                whiteSpace: 'pre-line'
              }}
            >
              <div className="flex items-center gap-1" style={{ fontSize: '0.72rem', color: msg.sender === 'USER' ? '#94A3B8' : '#D97706', fontWeight: 700, marginBottom: 4 }}>
                {msg.sender === 'AI' ? <Sparkles size={13} /> : <User size={13} />}
                {msg.sender === 'AI' ? 'A2 AI Copilot' : 'You'} • {msg.timestamp}
              </div>
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleQuerySubmit(inputQuery); }}
          className="flex gap-2"
          style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #E2E8F0' }}
        >
          <input
            type="text"
            placeholder="Ask AI Sales Assistant anything (e.g. Which leads need follow-up today?)..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="form-input"
            style={{ flexGrow: 1 }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0 1.25rem' }}>
            <Send size={16} /> Send
          </button>
        </form>

      </div>

    </div>
  );
};
