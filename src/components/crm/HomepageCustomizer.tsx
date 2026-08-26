import React, { useState } from 'react';
import { Layout, Eye, Save, Sparkles, CheckCircle2, RotateCcw, Monitor, Smartphone, Globe } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const HomepageCustomizer: React.FC = () => {
  const { homepageSettings, updateHomepageSettings } = useStore();
  const [formData, setFormData] = useState(homepageSettings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleToggle = (key: keyof typeof formData) => {
    setFormData(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepageSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetDefaults = () => {
    const defaults = {
      heroHeadline: 'Your Trusted Real Estate Partner in Dehradun',
      heroSubheadline: 'From luxury apartments to commercial spaces, we help you find the property that fits your lifestyle and investment goals.',
      heroButtonText: 'Explore Property',
      categoriesTitle: 'Choose Your Property Type',
      popularPropertiesTitle: 'Best Properties Sale',
      whatWeDoTitle: 'See how A2 Realtors can Help',
      testimonialsTitle: 'What Clients Say About Pillar',
      contactTitle: "Let's Talk Your Property Goal",
      articlesTitle: 'Helpful Real Estate Articles',
      
      showHeroSearch: true,
      showPartnerLogos: true,
      showCategories: true,
      showPopularProperties: true,
      showWhatWeDo: true,
      showTestimonials: true,
      showContactForm: true,
      showLatestArticles: true,

      propertyGridCols: 4,
      maxPropertiesCount: 8,
      sectionPaddingY: '4.5rem',
      gridGap: '1.5rem',
      cardPadding: '1rem'
    };
    setFormData(defaults);
    updateHomepageSettings(defaults);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header Banner */}
      <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: 4 }}>
            <span style={{ backgroundColor: '#EBF4EC', color: '#386635', padding: '0.2rem 0.65rem', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800 }}>
              ⚡ SUPER ADMIN STUDIO
            </span>
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827' }}>
            Homepage Layout & Content Customizer
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: 2 }}>
            Customize headlines, sub-headers, and show/hide sections dynamically across your public website homepage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={handleResetDefaults} 
            className="btn-outline-gray flex items-center gap-1.5"
          >
            <RotateCcw size={15} /> Reset Defaults
          </button>

          <a 
            href="/" 
            target="_blank" 
            rel="noreferrer" 
            className="btn-outline-gray flex items-center gap-1.5"
            style={{ color: '#386635', borderColor: '#386635' }}
          >
            <Globe size={15} /> Live Preview Site
          </a>

          <button 
            onClick={handleSave} 
            className="btn-green flex items-center gap-2"
            style={{ backgroundColor: '#386635' }}
          >
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '1rem 1.5rem', borderRadius: 12, border: '1px solid #A7F3D0', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700 }}>
          <CheckCircle2 size={20} /> Homepage customization saved live! Changes are reflected immediately on your website homepage.
        </div>
      )}

      {/* Main Studio Grid */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Section Visibility Switches (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginBottom: '0.25rem' }}>
              Section Visibility Toggles
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#6B7280', marginBottom: '1.25rem' }}>
              Enable or disable specific sections on your public homepage in 1-click.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { key: 'showHeroSearch', label: 'Floating Hero Search Card', desc: 'Property search card on right side of Hero' },
                { key: 'showPartnerLogos', label: 'Builder & Partner Logos Bar', desc: 'DLF, M3M, Godrej brand logos bar' },
                { key: 'showCategories', label: 'Property Type Categories Grid', desc: 'Choose Your Property Type (Kothi, Plot, etc.)' },
                { key: 'showPopularProperties', label: 'Best Properties Sale Grid', desc: '4-column popular listings showcase' },
                { key: 'showWhatWeDo', label: 'See how A2 Realtors can Help', desc: '01, 02, 03, 04 feature cards' },
                { key: 'showTestimonials', label: 'Client Testimonials Carousel', desc: 'What Clients Say About Pillar section' },
                { key: 'showContactForm', label: "Let's Talk Your Property Goal", desc: 'Floating inquiry form overlay card' },
                { key: 'showLatestArticles', label: 'Helpful Real Estate Articles', desc: 'Blog news grid teaser' }
              ].map(item => {
                const isChecked = !!(formData as any)[item.key];
                return (
                  <div 
                    key={item.key} 
                    onClick={() => handleToggle(item.key as any)}
                    style={{ 
                      padding: '0.85rem 1rem', 
                      borderRadius: 10, 
                      border: '1px solid #E5E7EB', 
                      backgroundColor: isChecked ? '#F0FDF4' : '#FAFAFA',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: isChecked ? '#166534' : '#374151' }}>{item.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{item.desc}</div>
                    </div>

                    <div style={{
                      width: 44,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: isChecked ? '#386635' : '#D1D5DB',
                      position: 'relative',
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}>
                      <div style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        position: 'absolute',
                        top: 2,
                        left: isChecked ? 22 : 2,
                        transition: 'all 0.2s ease'
                      }}></div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Right Column: Text & Content Configurator (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Hero Section Configurator */}
          <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
            <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
              <Sparkles size={18} style={{ color: '#386635' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>Hero Banner Content</h3>
            </div>

            <div className="form-group">
              <label className="form-label">Hero Main Headline</label>
              <input 
                type="text" 
                value={formData.heroHeadline} 
                onChange={(e) => handleChange('heroHeadline', e.target.value)} 
                className="form-input" 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Hero Subheadline Text</label>
              <textarea 
                rows={3} 
                value={formData.heroSubheadline} 
                onChange={(e) => handleChange('heroSubheadline', e.target.value)} 
                className="form-textarea" 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Primary Button Text</label>
              <input 
                type="text" 
                value={formData.heroButtonText} 
                onChange={(e) => handleChange('heroButtonText', e.target.value)} 
                className="form-input" 
              />
            </div>
          </div>

          {/* Section Titles Configurator */}
          <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
            <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
              <Layout size={18} style={{ color: '#386635' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>Section Headlines</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Categories Section Title</label>
                <input 
                  type="text" 
                  value={formData.categoriesTitle} 
                  onChange={(e) => handleChange('categoriesTitle', e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Popular Properties Title</label>
                <input 
                  type="text" 
                  value={formData.popularPropertiesTitle} 
                  onChange={(e) => handleChange('popularPropertiesTitle', e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">What We Do Section Title</label>
                <input 
                  type="text" 
                  value={formData.whatWeDoTitle} 
                  onChange={(e) => handleChange('whatWeDoTitle', e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Testimonials Title</label>
                <input 
                  type="text" 
                  value={formData.testimonialsTitle} 
                  onChange={(e) => handleChange('testimonialsTitle', e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Contact Section Title</label>
                <input 
                  type="text" 
                  value={formData.contactTitle} 
                  onChange={(e) => handleChange('contactTitle', e.target.value)} 
                  className="form-input" 
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Articles Section Title</label>
                <input 
                  type="text" 
                  value={formData.articlesTitle} 
                  onChange={(e) => handleChange('articlesTitle', e.target.value)} 
                  className="form-input" 
                />
              </div>
            </div>
          </div>

          {/* NEW SECTION: Property Grid, Columns, Rows & Spacing Controls */}
          <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
            <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
              <Monitor size={18} style={{ color: '#386635' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>
                Property Grid, Columns, Rows & Spacing Controls
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Desktop Columns Selector */}
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Desktop PC Grid Columns</label>
                <select 
                  value={formData.propertyGridCols} 
                  onChange={(e) => handleChange('propertyGridCols', Number(e.target.value))} 
                  className="form-select"
                >
                  <option value={2}>2 Columns (Large Showcase Cards)</option>
                  <option value={3}>3 Columns (Wide Aspect Ratio)</option>
                  <option value={4}>4 Columns (Standard 500x500 Layout)</option>
                  <option value={6}>6 Columns (Compact Density Grid)</option>
                </select>
                <span style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: 4, display: 'block' }}>
                  Controls how many property cards appear per row on PC screens.
                </span>
              </div>

              {/* Max Properties Shown (Rows limit) */}
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Total Properties Limit (Rows)</label>
                <select 
                  value={formData.maxPropertiesCount} 
                  onChange={(e) => handleChange('maxPropertiesCount', Number(e.target.value))} 
                  className="form-select"
                >
                  <option value={4}>4 Properties (1 Row in 4-Col)</option>
                  <option value={6}>6 Properties (2 Rows in 3-Col)</option>
                  <option value={8}>8 Properties (2 Rows in 4-Col - Default)</option>
                  <option value={12}>12 Properties (3 Rows in 4-Col)</option>
                  <option value={16}>16 Properties (4 Rows in 4-Col)</option>
                </select>
                <span style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: 4, display: 'block' }}>
                  Maximum properties loaded under Best Properties Sale section.
                </span>
              </div>

              {/* Section Vertical Margin & Padding (Padding-Y) */}
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Section Top/Bottom Padding (Margin)</label>
                <select 
                  value={formData.sectionPaddingY} 
                  onChange={(e) => handleChange('sectionPaddingY', e.target.value)} 
                  className="form-select"
                >
                  <option value="2.5rem">Compact Padding (2.5rem / 40px)</option>
                  <option value="4.5rem">Standard Padding (4.5rem / 72px - Default)</option>
                  <option value="6.5rem">Spacious Padding (6.5rem / 104px)</option>
                </select>
                <span style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: 4, display: 'block' }}>
                  Adjusts white space between homepage sections.
                </span>
              </div>

              {/* Grid Gap Spacing */}
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Grid Gap Spacing</label>
                <select 
                  value={formData.gridGap} 
                  onChange={(e) => handleChange('gridGap', e.target.value)} 
                  className="form-select"
                >
                  <option value="1rem">Small Gap (1rem / 16px)</option>
                  <option value="1.5rem">Medium Gap (1.5rem / 24px - Default)</option>
                  <option value="2rem">Large Gap (2rem / 32px)</option>
                </select>
                <span style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: 4, display: 'block' }}>
                  Distance between adjacent property cards.
                </span>
              </div>

            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button 
                type="submit" 
                className="btn-green flex items-center gap-2"
                style={{ backgroundColor: '#386635', marginLeft: 'auto' }}
              >
                <Save size={16} /> Save All Customizations
              </button>
            </div>

          </div>

        </div>

      </form>

    </div>
  );
};
