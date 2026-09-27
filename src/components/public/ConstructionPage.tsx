import React, { useState } from 'react';
import { Hammer, HardHat, Home, RefreshCw, CheckCircle2, Phone, ArrowRight, MapPin } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ConstructionPage: React.FC = () => {
  const { projects, submitGeneralContact } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [projectCategory, setProjectCategory] = useState('Residential Construction');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitGeneralContact({
      name,
      phone,
      message: `CONSTRUCTION ENQUIRY (${projectCategory}): ${message}`
    });
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
      
      {/* Hero Header */}
      <div style={{ backgroundColor: '#0B1120', color: '#FFFFFF', padding: '6rem 0 5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 880, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Build Your Dream Villa with <span style={{ color: '#DFB76C', fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>Precision & Quality</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#94A3B8', lineHeight: 1.7, maxWidth: 780, margin: '0 auto' }}>
            A2 Realtors offers end-to-end turnkey residential construction, luxury villa building, heritage remodeling, and commercial structural work across Dehradun.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '4rem' }}>
        
        {/* Services Grid */}
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', textAlign: 'center', marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
          Our Specialized Construction Capabilities
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" style={{ marginBottom: '5rem' }}>
          <div className="card flex flex-col justify-between" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
            <div>
              <div style={{ padding: '0.75rem', backgroundColor: '#FEF3C7', color: '#B45309', borderRadius: 10, display: 'inline-block', marginBottom: '1rem' }}>
                <Home size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', lineHeight: 1.3 }}>Villa & House Construction</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>
                Turnkey architectural execution from soil testing, MDDA layout approvals, RCC frame construction to fine interior detailing.
              </p>
            </div>
          </div>

          <div className="card flex flex-col justify-between" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
            <div>
              <div style={{ padding: '0.75rem', backgroundColor: '#FEF3C7', color: '#B45309', borderRadius: 10, display: 'inline-block', marginBottom: '1rem' }}>
                <RefreshCw size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', lineHeight: 1.3 }}>Renovation & Remodeling</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>
                Restoring heritage bungalows in Dalanwala, modernizing facades, waterproofing, structural strengthening, and modular kitchen upgrades.
              </p>
            </div>
          </div>

          <div className="card flex flex-col justify-between" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
            <div>
              <div style={{ padding: '0.75rem', backgroundColor: '#FEF3C7', color: '#B45309', borderRadius: 10, display: 'inline-block', marginBottom: '1rem' }}>
                <HardHat size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', lineHeight: 1.3 }}>Commercial Development</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>
                Glass-fronted commercial plazas, office floors, retail showrooms along main Rajpur Road and Sahastradhara corridors.
              </p>
            </div>
          </div>

          <div className="card flex flex-col justify-between" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', borderRadius: 16 }}>
            <div>
              <div style={{ padding: '0.75rem', backgroundColor: '#FEF3C7', color: '#B45309', borderRadius: 10, display: 'inline-block', marginBottom: '1rem' }}>
                <Hammer size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', lineHeight: 1.3 }}>Infrastructure & Road Work</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>
                Boundary wall construction, internal sector road laying, drainage systems, and land development for residential plots.
              </p>
            </div>
          </div>
        </div>

        {/* Project Showcase Section */}
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '2rem', letterSpacing: '-0.02em', textAlign: 'center' }}>
          Delivered Projects Portfolio
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ marginBottom: '5rem' }}>
          {projects.map(proj => (
            <div key={proj.id} className="card flex flex-col" style={{ backgroundColor: '#FFFFFF', borderRadius: 18, overflow: 'hidden' }}>
              <img src={proj.imageUrl} alt={proj.title} style={{ width: '100%', height: 260, objectFit: 'cover' }} />
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#386635', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{proj.category}</span>
                  <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>Completed {proj.completionYear}</span>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem', lineHeight: 1.3 }}>{proj.title}</h3>
                <div className="flex items-center gap-1.5" style={{ fontSize: '0.85rem', color: '#B45309', fontWeight: 600, marginBottom: '0.75rem' }}>
                  <MapPin size={14} /> <span>{proj.location}</span>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>{proj.description}</p>
                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: 10, fontSize: '0.82rem', color: '#334155', marginTop: 'auto', border: '1px solid #F1F5F9' }}>
                  <strong>Scope:</strong> {proj.scope}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consultation Form Box */}
        <div className="card" style={{ maxWidth: 760, margin: '0 auto', padding: '2.5rem', backgroundColor: '#FFFFFF', borderRadius: 20 }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <CheckCircle2 size={48} style={{ color: '#10B981', margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.5rem', color: '#0F172A', marginBottom: '0.5rem' }}>Construction Estimate Request Received</h3>
              <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>
                Our senior project manager will contact you at <strong>{phone}</strong> to discuss site measurements and architectural estimates.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn btn-primary">Submit Another Query</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', textAlign: 'center', marginBottom: '0.5rem' }}>
                Discuss Your Construction Project
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#64748B', textAlign: 'center', marginBottom: '1.5rem' }}>
                Get expert guidance on material estimations, MDDA permissions, and architectural designs.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Your Full Name *</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-input" placeholder="e.g. Vikram Anand" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" placeholder="+91 98970 00000" />
                </div>
                <div className="form-group lg:col-span-2">
                  <label className="form-label">Project Type *</label>
                  <select value={projectCategory} onChange={(e) => setProjectCategory(e.target.value)} className="form-select">
                    <option value="Residential Villa Construction">Residential Villa Construction</option>
                    <option value="House Renovation & Remodeling">House Renovation & Remodeling</option>
                    <option value="Commercial Plaza Construction">Commercial Plaza Construction</option>
                    <option value="Plot Boundary Wall & Land Development">Plot Boundary Wall & Land Development</option>
                  </select>
                </div>
                <div className="form-group lg:col-span-2">
                  <label className="form-label">Project Details / Location in Dehradun</label>
                  <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className="form-textarea" placeholder="Describe plot area sq.ft, number of floors planned, or renovation requirements..." />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full" style={{ width: '100%', marginTop: '1rem' }}>
                Request Free Construction Estimate <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
