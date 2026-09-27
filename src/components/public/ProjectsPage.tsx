import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Building2, MapPin, CheckCircle2 } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects } = useStore();
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const filteredProjects = filterCategory === 'ALL' 
    ? projects 
    : projects.filter(p => p.category.toLowerCase() === filterCategory.toLowerCase());

  return (
    <div style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
      <div style={{ backgroundColor: '#0B1120', color: '#FFFFFF', padding: '6rem 0 5rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 840 }}>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Project Portfolio & Case Studies
          </h1>
          <p style={{ color: '#94A3B8', maxWidth: 640, margin: '1rem auto 0 auto', fontSize: '1.15rem', lineHeight: 1.7 }}>
            Showcasing delivered residential, commercial, renovation, and land development projects across Dehradun.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '4rem' }}>
        {/* Category Tabs */}
        <div className="flex justify-center gap-2" style={{ marginBottom: '3.5rem', flexWrap: 'wrap' }}>
          {['ALL', 'Residential', 'Commercial', 'Construction', 'Renovation'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className="btn btn-sm"
              style={{
                backgroundColor: filterCategory === cat ? '#386635' : '#FFFFFF',
                color: filterCategory === cat ? '#FFFFFF' : '#475569',
                border: filterCategory === cat ? '1px solid #386635' : '1px solid #E2E8F0',
                borderRadius: 24,
                padding: '0.5rem 1.4rem',
                fontWeight: 600,
                boxShadow: filterCategory === cat ? '0 4px 12px rgba(56,102,53,0.2)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map(proj => (
            <div key={proj.id} className="card flex flex-col" style={{ backgroundColor: '#FFFFFF', borderRadius: 18, overflow: 'hidden' }}>
              <img src={proj.imageUrl} alt={proj.title} style={{ width: '100%', height: 260, objectFit: 'cover' }} />
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#386635', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {proj.category}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>Completed {proj.completionYear}</span>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem', lineHeight: 1.3 }}>{proj.title}</h3>
                <div className="flex items-center gap-1.5" style={{ fontSize: '0.85rem', color: '#B45309', fontWeight: 600, marginBottom: '0.75rem' }}>
                  <MapPin size={14} /> <span>{proj.location}</span>
                </div>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>{proj.description}</p>
                <div style={{ marginTop: 'auto', backgroundColor: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: 10, fontSize: '0.82rem', color: '#334155', border: '1px solid #F1F5F9' }}>
                  <strong>Scope:</strong> {proj.scope}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
