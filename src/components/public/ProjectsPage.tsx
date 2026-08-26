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
      <div style={{ backgroundColor: '#0F172A', color: '#FFFFFF', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800 }}>Project Portfolio & Case Studies</h1>
          <p style={{ color: '#CBD5E1', maxWidth: 640, margin: '0.5rem auto 0 auto' }}>
            Showcasing delivered residential, commercial, renovation, and land development projects across Dehradun.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '3rem' }}>
        {/* Category Tabs */}
        <div className="flex justify-center gap-2" style={{ marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {['ALL', 'Residential', 'Commercial', 'Construction', 'Renovation'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className="btn btn-sm"
              style={{
                backgroundColor: filterCategory === cat ? '#0F172A' : '#FFFFFF',
                color: filterCategory === cat ? '#FFFFFF' : '#475569',
                border: '1px solid #E2E8F0',
                borderRadius: 20,
                padding: '0.4rem 1.25rem'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map(proj => (
            <div key={proj.id} className="card" style={{ backgroundColor: '#FFFFFF' }}>
              <img src={proj.imageUrl} alt={proj.title} style={{ width: '100%', height: 260, objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <span className="badge badge-featured" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>{proj.category}</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0F172A' }}>{proj.title}</h3>
                <div style={{ fontSize: '0.85rem', color: '#D97706', margin: '0.25rem 0 0.75rem 0' }}>📍 {proj.location}</div>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>{proj.description}</p>
                <div style={{ marginTop: '1rem', backgroundColor: '#F8FAFC', padding: '0.65rem 0.85rem', borderRadius: 8, fontSize: '0.82rem', color: '#334155' }}>
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
