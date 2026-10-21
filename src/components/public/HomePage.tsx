import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, Home, Landmark, Briefcase, FileCheck, ShieldCheck, 
  MapPin, Phone, Mail, ArrowRight, ArrowLeft, Star, Calendar, User, 
  CheckCircle2, ChevronLeft, ChevronRight, Sparkles, Trees, Hammer,
  Award, Check, Clock, TrendingUp, Compass, HeartHandshake, Quote, BadgeCheck,
  ExternalLink, X, Info, Layers, Camera, FileText, Maximize2, Eye
} from 'lucide-react';
import { Hero } from './Hero';
import { TrustStatsBar } from './TrustStatsBar';
import { LocalityExplorer } from './LocalityExplorer';
import { EMICalculator } from './EMICalculator';
import { PropertyCard } from './PropertyCard';
import { useStore } from '../../context/StoreContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { properties, blogPosts, submitGeneralContact, homepageSettings } = useStore();

  const [activePropertyTab, setActivePropertyTab] = useState<string>('ALL');
  const [selectedPartnerModal, setSelectedPartnerModal] = useState<any | null>(null);
  const [partnerFilter, setPartnerFilter] = useState<string>('ALL');
  const [partnerImageMode, setPartnerImageMode] = useState<{ [id: string]: number }>({});
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);

  // Contact Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formCategory, setFormCategory] = useState('Buy Residential Property');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Dynamic Grid Columns Class for Property Showcase
  const gridColsClass = 
    homepageSettings.propertyGridCols === 2 ? 'lg:grid-cols-2' :
    homepageSettings.propertyGridCols === 3 ? 'lg:grid-cols-3' :
    homepageSettings.propertyGridCols === 6 ? 'lg:grid-cols-6' :
    'lg:grid-cols-4';

  // Filtered properties for "Best Properties Sale" section
  const filteredProperties = properties.filter(p => {
    if (!p.published) return false;
    if (activePropertyTab === 'ALL') return true;
    if (activePropertyTab === 'APARTMENT') return p.propertyType === 'APARTMENT';
    if (activePropertyTab === 'COMMERCIAL') return p.propertyType === 'COMMERCIAL';
    if (activePropertyTab === 'PLOT') return p.propertyType === 'PLOT';
    if (activePropertyTab === 'VILLA') return p.propertyType === 'INDEPENDENT_HOUSE' || p.propertyType === 'FARMHOUSE';
    return true;
  }).slice(0, homepageSettings.maxPropertiesCount || 8);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;
    submitGeneralContact({
      name: formName,
      email: formEmail,
      phone: formPhone,
      message: `Preferred Category: ${formCategory}. Preferred Date: ${formDate || 'ASAP'}. Note: ${formMessage}`
    });
    setFormSubmitted(true);
  };

  // Property categories grid
  const categories = [
    { icon: Home, name: 'Kothi / Luxury Villa', count: '14 Properties', type: 'INDEPENDENT_HOUSE', desc: 'Rajpur Road & Dalanwala' },
    { icon: Building2, name: 'Apartments & Penthouses', count: '28 Properties', type: 'APARTMENT', desc: 'Gated Hill-view Communities' },
    { icon: Landmark, name: 'Residential Plots', count: '19 Properties', type: 'PLOT', desc: 'Freehold MDDA Approved Land' },
    { icon: Briefcase, name: 'Commercial Spaces', count: '12 Properties', type: 'COMMERCIAL', desc: 'High ROI Retail & Offices' },
    { icon: Trees, name: 'Farmhouses & Estates', count: '8 Properties', type: 'FARMHOUSE', desc: 'Mussoorie Foothills' },
    { icon: Hammer, name: 'Bespoke Construction', count: 'Turnkey Execution', type: 'CONSTRUCTION', desc: 'Architectural Design & Build' }
  ];

  // 6 Flagship Partner Townships & Approved Developments in Dehradun with Official Real Site Media
  const partnerDevelopments = [
    {
      id: 'dev-ats',
      name: 'ATS Heavenly Foothills',
      shortName: 'ATS',
      developer: 'ATS Infrastructure Ltd (ATS Greens)',
      location: 'Sahastradhara Road (Near IT Park), Dehradun',
      belt: 'SAHASTRADHARA',
      type: 'Plotted Township & Bespoke Luxury Villas',
      scale: '29 Acres • ~300 Units',
      priceGuide: 'Plots from ₹1.45 Cr',
      approval: 'MDDA & RERA Approved',
      reraNumber: 'UKREP09170000028',
      officialSource: 'Official Portal (atsgreens.com)',
      tagline: 'Dehradun’s premier foothill plotted sanctuary with panoramic mountain horizons',
      description: 'ATS Heavenly Foothills is one of Dehradun’s most prestigious gated townships, situated directly at the green foothill reserves along Sahastradhara Road. Spanning nearly 29 acres, the development features wide 40 to 60-ft internal avenues, a modern clubhouse with swimming pool, underground electrical cablings, and fully serviced freehold plots ready for luxury villa construction.',
      highlights: [
        '40 to 60-ft wide concrete internal arterial roads',
        'State-of-the-art clubhouse with swimming pool & gym',
        '100% Freehold MDDA Approved title with bank loan approvals',
        'Multi-tier 24/7 security with perimeter CCTV surveillance'
      ],
      specs: [
        { label: 'Scale', val: '29 Acres' },
        { label: 'Density', val: '~300 Plots' },
        { label: 'Road Width', val: '40–60 Ft' }
      ],
      landmarks: [
        '400 meters from Doon IT Park & Software Hub',
        '15 minutes to Rajpur Road & Pacific Mall',
        '25 minutes to Dehradun Railway Station',
        'Direct connectivity to Jolly Grant Airport bypass'
      ],
      searchQuery: 'ATS',
      coverImage: 'https://www.atsgreens.com/wp-content/uploads/2022/03/Heaven-foothills.png',
      sitePhoto: 'https://www.atsgreens.com/wp-content/uploads/2022/03/PHOTO-2022-03-03-11-51-13.jpg',
      gallery: [
        { title: 'Official Master Elevation & Landscape', url: 'https://www.atsgreens.com/wp-content/uploads/2022/03/Heaven-foothills.png', type: 'Official Master Plan' },
        { title: 'Real Site Foothill Landscape & Boundary', url: 'https://www.atsgreens.com/wp-content/uploads/2022/03/PHOTO-2022-03-03-11-51-13.jpg', type: 'On-Ground Site Photo' }
      ]
    },
    {
      id: 'dev-panache',
      name: 'Panache Valley',
      shortName: 'Panache Valley',
      developer: 'Adarsh Buildestate Ltd (ABL)',
      location: 'Village Chalang, Sahastradhara Road, Dehradun',
      belt: 'SAHASTRADHARA',
      type: 'Eco-Luxury Hillside Villas & Land',
      scale: '37+ Acres Scenic Gated Township',
      priceGuide: 'From ₹95 Lakhs',
      approval: 'MDDA Approved Master Plan',
      reraNumber: 'UKRERA Approved Layout',
      officialSource: 'Adarsh Buildestate (ABL) Site Portfolio',
      tagline: 'Resort-style luxury living enveloped by pristine Shivalik greenery',
      description: 'Panache Valley in Village Chalang (Sahastradhara corridor) spans over 37 acres of gently undulating hillside terrain. Designed as an eco-conscious luxury retreat, it offers both custom residential plots and ready-to-move 3 & 4 BHK independent villas that capture breathtaking 360-degree mountain vistas with unpolluted mountain breezes.',
      highlights: [
        'Unobstructed panoramic views of Himalayan foothills',
        '37+ acres integrated township with dense green cover',
        'MDDA approved layout with clear mutation & registry',
        'Resident clubhouse, jogging tracks & landscaped parks'
      ],
      specs: [
        { label: 'Scale', val: '37+ Acres' },
        { label: 'Typology', val: 'Villas & Plots' },
        { label: 'Sanction', val: 'MDDA Sanction' }
      ],
      landmarks: [
        'Direct approach from Sahastradhara Road corridor',
        '10 minutes to Helipad & IT Park',
        '18 minutes to Max Super Speciality Hospital',
        '20 minutes to Clock Tower & Central Dehradun'
      ],
      searchQuery: 'Panache Valley',
      coverImage: 'https://valaistaestates.com/wp-content/uploads/2025/05/Panache-Valley-1.jpg',
      sitePhoto: 'https://mittirealty.com/assets/image/project/Panch/9.webp',
      gallery: [
        { title: 'Real Luxury Villa Elevation & Facade', url: 'https://valaistaestates.com/wp-content/uploads/2025/05/Panache-Valley-1.jpg', type: 'Real Villa Architecture' },
        { title: 'Prisitine Green Valley Terrain View', url: 'https://mittirealty.com/assets/image/project/Panch/9.webp', type: 'On-Ground Site Photo' }
      ]
    },
    {
      id: 'dev-silver',
      name: 'Silver Heights',
      shortName: 'Silver Heights',
      developer: 'GLF Builders / Silver Heights',
      location: 'Pondha, Prem Nagar (Near IMA), Dehradun',
      belt: 'PREMNAGAR',
      type: 'Gated Plotted Enclave & Builder Floors',
      scale: 'Spacious Low-Density Colony',
      priceGuide: 'Plots from ₹65 Lakhs',
      approval: 'MDDA Compliant Master Plan',
      reraNumber: 'Dehradun MDDA Sanctioned Layout',
      officialSource: 'Official Website (silverheightsindia.com)',
      tagline: 'Tranquil defense & civil plotted enclave in pristine western Dehradun',
      description: 'Silver Heights is an established gated residential community situated in Pondha near Prem Nagar, merely 5 km from the prestigious Indian Military Academy (IMA). Surrounded by lush green nature buffers away from metropolitan congestion, it features earthquake-resistant engineering, wide tree-lined internal streets, and freehold plots.',
      highlights: [
        'Just 5 km from Indian Military Academy (IMA) & NH-72',
        'Earthquake-resistant layout with wide metalled roads',
        '100% Freehold clear titles with instant registry',
        'Peaceful community with dedicated parks & green belts'
      ],
      specs: [
        { label: 'Location', val: '5km to IMA' },
        { label: 'Density', val: 'Low-Density' },
        { label: 'Registry', val: '100% Freehold' }
      ],
      landmarks: [
        '5 km to Indian Military Academy (IMA)',
        '10 minutes to UPES Energy Acres Campus',
        '20 minutes to Ballupur Chowk & FRI',
        '25 minutes to Dehradun ISBT Bus Terminal'
      ],
      searchQuery: 'Silver Heights',
      coverImage: 'https://silverheightsindia.com/images/imgabout.jpg',
      sitePhoto: 'https://www.silverheightsindia.com/gallery/gallery180sm5.jpg',
      gallery: [
        { title: 'Official Clubhouse & Gated Entrance', url: 'https://silverheightsindia.com/images/imgabout.jpg', type: 'Official Development View' },
        { title: 'Real Plotted Avenues & Streetscape', url: 'https://www.silverheightsindia.com/gallery/gallery180sm5.jpg', type: 'On-Ground Site Photo' }
      ]
    },
    {
      id: 'dev-mayfair',
      name: 'Mayfair Highlands',
      shortName: 'Mayfair',
      developer: 'Presidency Builders & Developers',
      location: 'Purukul, Mussoorie Road Corridor, Dehradun',
      belt: 'MUSSOORIE',
      type: 'MIST Luxury Suites & Hillside Plots',
      scale: '20 Acres Riverfront Sanctuary',
      priceGuide: 'Suites from ₹1.85 Cr',
      approval: 'MDDA & RERA Approved',
      reraNumber: 'UKRERA Certified Riverfront Enclave',
      officialSource: 'Presidency Group Official Project Portfolio',
      tagline: 'Ultra-luxury riverside residences on the direct gateway to Mussoorie',
      description: 'Mayfair Highlands is an iconic 20-acre ultra-luxury residential township nestled along Mussoorie Road in Purukul. Flanked by two perennial mountain rivers, it presents a bespoke collection of mid-rise MIST penthouses/suites and private hillside villa plots equipped with 5-star club amenities, infinity swimming pools, and riverfront trails.',
      highlights: [
        'Bordered by two natural perennial mountain rivers',
        '5-star clubhouse with infinity pool, spa & wellness center',
        'Prime Mussoorie Road corridor near top international schools',
        'High-yielding luxury second home & holiday rental asset'
      ],
      specs: [
        { label: 'Scale', val: '20 Acres' },
        { label: 'Setting', val: 'Twin Riverfront' },
        { label: 'Suites', val: 'MIST Collection' }
      ],
      landmarks: [
        '5 minutes to DIT University & IMS Unison',
        '10 minutes to Mussoorie Diversion & Pacific Mall',
        '20 minutes to Rajpur Road fine dining & cafes',
        '25 minutes to Mussoorie Mall Road'
      ],
      searchQuery: 'Mayfair',
      coverImage: 'https://dynamic.realestateindia.com/proj_images/project56994/projGal-1-770x400.jpeg',
      sitePhoto: 'https://dehradunbusinessdirectory.com/wp-content/uploads/2024/04/Mayfair-Highlands-Dehradun.png',
      gallery: [
        { title: 'Real Riverside Suites Elevation & Balconies', url: 'https://dynamic.realestateindia.com/proj_images/project56994/projGal-1-770x400.jpeg', type: 'Architecture Elevation' },
        { title: 'Township Gateway & Mussoorie Foothills View', url: 'https://dehradunbusinessdirectory.com/wp-content/uploads/2024/04/Mayfair-Highlands-Dehradun.png', type: 'On-Ground Site Photo' }
      ]
    },
    {
      id: 'dev-zodiac',
      name: 'Zodiac Greens',
      shortName: 'Zodiac Green',
      developer: 'Zodiac Securities & Developers',
      location: 'Kirsali Gaon / Sahastradhara Road, Dehradun',
      belt: 'SAHASTRADHARA',
      type: 'Boutique MDDA Plotted Community',
      scale: 'Premium Plotted Enclave',
      priceGuide: 'Plots from ₹85 Lakhs',
      approval: 'MDDA & RERA Approved',
      reraNumber: 'UKREP Approved Gated Layout',
      officialSource: 'Zodiac Developers Official Project Media',
      tagline: 'Modern infrastructure with dual connectivity to Sahastradhara & Rajpur Road',
      description: 'Zodiac Greens at Kirsali Gaon is an elite, fully approved gated plotted enclave designed for discerning homebuilders. It offers superior civic infrastructure including 30-ft wide concrete roads, underground power grid, modern sewage treatment plant (STP), and seamless connectivity linking Sahastradhara Road to Rajpur Road.',
      highlights: [
        'MDDA & RERA approved layout with immediate bank financing',
        '30-ft wide concrete internal road network with drainage',
        'Underground electrical lines & eco Sewage Treatment Plant',
        'Dual arterial access to both Sahastradhara & Rajpur Road'
      ],
      specs: [
        { label: 'Type', val: 'MDDA Plotted' },
        { label: 'Road Width', val: '30-Ft Concrete' },
        { label: 'Grid', val: 'Underground' }
      ],
      landmarks: [
        '3 minutes to Sahastradhara arterial corridor',
        '8 minutes to Doon IT Park campus',
        '12 minutes to Silver City Mall & Rajpur Road',
        '20 minutes to Max Super Speciality Hospital'
      ],
      searchQuery: 'Zodiac Green',
      coverImage: 'https://newprojects.99acres.com/projects/projectHighlightStory/j8znga6_1773643023_727312727_med.jpg',
      sitePhoto: 'https://justabode.com/public/frontend/uploads/17180984291.jpeg',
      gallery: [
        { title: 'Real Plotted Infrastructure & Concrete Internal Roads', url: 'https://newprojects.99acres.com/projects/projectHighlightStory/j8znga6_1773643023_727312727_med.jpg', type: 'On-Ground Site Photo' },
        { title: 'Hillside Gated Colony Panorama', url: 'https://justabode.com/public/frontend/uploads/17180984291.jpeg', type: 'Landscape Vista' }
      ]
    },
    {
      id: 'dev-ghati',
      name: 'Doon Ghati River Valley',
      shortName: 'Ghati River Valley',
      developer: 'Doon Ghati Infrastructure',
      location: 'Canal Road / Dhoran Road (Near IT Park), Dehradun',
      belt: 'CANAL',
      type: 'Scenic Riverfront Enclave & Duplexes',
      scale: '23+ Acres Integrated Township',
      priceGuide: 'From ₹75 Lakhs',
      approval: 'MDDA Approved Layout',
      reraNumber: 'MDDA Sanctioned Layout Plan',
      officialSource: 'Doon Nature Farms Official Development Media',
      tagline: 'Pristine mountain stream backdrop in the rapidly appreciating Canal Road belt',
      description: 'Doon Ghati River Valley along Canal Road and Dhoran Road represents an exceptional blend of natural beauty and urban accessibility. Enclosed by fresh mountain streams and pine-clad hills adjacent to the Doon IT Park, this 23+ acre gated colony provides freehold residential plots and independent duplex homes with strong capital growth.',
      highlights: [
        'Perennial mountain stream running along township perimeter',
        'Ready-to-build freehold plots with all civic connections',
        'Direct proximity to Canal Road lifestyle hubs & IT Park',
        'Gated entrance, round-the-clock security & children’s parks'
      ],
      specs: [
        { label: 'Scale', val: '23+ Acres' },
        { label: 'Feature', val: 'Perennial Stream' },
        { label: 'Access', val: '2m to Canal Rd' }
      ],
      landmarks: [
        '2 minutes to Canal Road main crossing',
        '5 minutes to Doon IT Park software hub',
        '15 minutes to Dalanwala & Welham Schools',
        '18 minutes to Clock Tower & Rajpur Road'
      ],
      searchQuery: 'Ghati River Valley',
      coverImage: 'https://img.staticmb.com/mbimages/project/Photo_h310_w462/2021/09/22/Project-Photo-1-Ghati-River-Valley-Dehradun-5311859_345_1366_310_462.jpg',
      sitePhoto: 'https://imagecdn.99acres.com/media1/42131/4/842624845M-1789816068852.webp',
      gallery: [
        { title: 'Real Project Site & Construction Overview', url: 'https://img.staticmb.com/mbimages/project/Photo_h310_w462/2021/09/22/Project-Photo-1-Ghati-River-Valley-Dehradun-5311859_345_1366_310_462.jpg', type: 'On-Ground Site Photo' },
        { title: 'Pristine Canal Road Valley Terrain', url: 'https://imagecdn.99acres.com/media1/42131/4/842624845M-1789816068852.webp', type: 'Valley Vista' }
      ]
    }
  ];

  const testimonials = [
    {
      quote: "As an NRI based in Dubai, purchasing property in Dehradun seemed daunting. A2 Realtors handled complete title verification, mutation documents, and smooth registration for our Rajpur Road villa. Absolute transparency!",
      name: "Brig. Rajiv Sharma (Retd.)",
      role: "Luxury Villa Owner, Rajpur Road",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: 5
    },
    {
      quote: "We wanted a clean plot near Sahastradhara Road with verified legal titles. A2 Realtors guided us through the entire MDDA layout check and bank loan processing within 10 days. Outstanding team!",
      name: "Dr. Sunita & Alok Aggarwal",
      role: "Plot Buyers, Sahastradhara Corridor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      rating: 5
    },
    {
      quote: "Found a prime commercial showroom floor on GMS Road for our diagnostic clinic. Their local market intelligence and negotiation skills helped us acquire it at 15% below developer rates.",
      name: "Mr. Harshvardhan Rawat",
      role: "Commercial Investor, GMS Road",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      rating: 5
    }
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      
      {/* 1. CINEMATIC HERO BANNER */}
      <Hero />

      {/* 2. TRUST & MARKET STATS COUNTER BAR */}
      <TrustStatsBar />

      {/* 2.5. ABOUT US & DIRECTOR'S MESSAGE SECTION */}
      {homepageSettings.showAboutSection !== false && (
        <section style={{ padding: '6.5rem 0', backgroundColor: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle decorative background gradient */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100%',
              backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(235, 244, 236, 0.6) 0%, transparent 45%), radial-gradient(circle at 90% 80%, rgba(253, 250, 243, 0.8) 0%, transparent 45%)',
              pointerEvents: 'none'
            }}
          />

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            
            {/* Section Tagline */}
            <div className="flex items-center justify-center gap-2" style={{ marginBottom: '1rem' }}>
              <span className="badge badge-verified" style={{ fontSize: '0.8rem', padding: '0.35rem 0.9rem', borderRadius: 20 }}>
                <Sparkles size={13} style={{ color: '#386635' }} /> Heritage of Trust & Excellence
              </span>
            </div>

            <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 3.5rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 2.85rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                Rooted in Dehradun, Built on <span style={{ color: '#386635', fontFamily: 'Outfit, sans-serif' }}>Integrity & Local Mastery</span>
              </h2>
              <p style={{ color: '#64748B', fontSize: '1.08rem', marginTop: '0.85rem', lineHeight: 1.7 }}>
                Established in the heart of Dalanwala, A2 Realtors is Uttarakhand’s leading real estate advisory and development firm. We curate premier residential kothis, hill-view apartments, approved freehold plots, and turnkey architectural spaces with unmatched legal transparency.
              </p>
            </div>

            {/* 2-Column Grid: Company Story / Pillars + Director's Message Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              
              {/* Left Column: Company Story & Highlights (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between" style={{ gap: '2rem' }}>
                <div style={{ backgroundColor: '#F8FAFC', borderRadius: 24, padding: '2.5rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                  <div className="flex items-center gap-3" style={{ marginBottom: '1.25rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#EBF4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#386635' }}>
                      <Building2 size={24} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Our Identity</span>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A' }}>Who We Are at A2 Realtors</h3>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.96rem', color: '#334155', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                    For over 15 years, A2 Realtors has championed safe, high-yield property transactions across Dehradun, Mussoorie, and the Doon Valley. In a market where title ambiguities and unapproved layouts cause investor hesitation, we pioneered a rigorous <strong>zero-compromise legal vetting process</strong> before introducing any property to our clientele.
                  </p>

                  <p style={{ fontSize: '0.96rem', color: '#64748B', lineHeight: 1.75, marginBottom: '1.75rem' }}>
                    Whether you are an NRI securing a mountain retreat, an established family seeking a legacy villa along Rajpur Road, or an astute investor acquiring prime commercial assets, our certified advisors provide end-to-end guidance from preliminary due diligence through registry and possession.
                  </p>

                  {/* 3 Core Value Stats */}
                  <div className="grid grid-cols-3 gap-3" style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.55rem', color: '#386635' }}>15+</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Years in Valley</div>
                    </div>
                    <div style={{ textAlign: 'center', borderLeft: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0' }}>
                      <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.55rem', color: '#C5A059' }}>100%</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Clear Titles</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.55rem', color: '#0F172A' }}>₹650 Cr+</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Delivered Value</div>
                    </div>
                  </div>
                </div>

                {/* Company Highlights Strip */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem', backgroundColor: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#EBF4EC', color: '#386635', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Compass size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0F172A', marginBottom: 2 }}>Hyper-Local Expertise</h4>
                      <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.5 }}>Unmatched ground intelligence in Dalanwala, Rajpur Rd, Mussoorie & Sahastradhara corridor.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem', backgroundColor: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(197, 160, 89, 0.15)', color: '#C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <HeartHandshake size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0F172A', marginBottom: 2 }}>Client-First Fiduciary Care</h4>
                      <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.5 }}>Transparent commission structures, zero hidden costs, and honest property valuations.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Director's Message (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col">
                <div 
                  className="card-luxury"
                  style={{ 
                    height: '100%',
                    backgroundColor: '#0B1120', 
                    borderRadius: 24, 
                    padding: '2.5rem', 
                    color: '#FFFFFF',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 20px 45px rgba(11, 17, 32, 0.25)',
                    border: '1px solid #1E2E4F'
                  }}
                >
                  {/* Atmospheric Glow */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '-15%',
                      right: '-15%',
                      width: 250,
                      height: 250,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(197, 160, 89, 0.22) 0%, transparent 70%)',
                      filter: 'blur(40px)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Header Badge & Quote Icon */}
                  <div>
                    <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: 6, 
                        fontSize: '0.72rem', 
                        fontWeight: 800, 
                        letterSpacing: '0.1em', 
                        textTransform: 'uppercase', 
                        backgroundColor: 'rgba(197, 160, 89, 0.18)', 
                        color: '#DFB76C', 
                        padding: '0.35rem 0.75rem', 
                        borderRadius: 20,
                        border: '1px solid rgba(197, 160, 89, 0.35)'
                      }}>
                        <Award size={13} /> Director's Vision & Note
                      </span>

                      <Quote size={32} style={{ color: 'rgba(197, 160, 89, 0.35)' }} />
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.4, marginBottom: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>
                      "{homepageSettings.directorQuote || 'Real estate is not merely land and brick; it is a sacred foundation for family legacies and hard-earned wealth.'}"
                    </h3>

                    <p style={{ fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '1.25rem' }}>
                      "When we founded A2 Realtors in Dalanwala, our mission was clear: eradicate the uncertainty, legal ambiguity, and stress from buying property in Uttarakhand. 
                    </p>

                    <p style={{ fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                      Every property we present has been scrutinized as if we were purchasing it for our own kin. Our relationship with our clients begins before the sale and endures for generations."
                    </p>
                  </div>

                  {/* Director Signature & Profile */}
                  <div style={{ borderTop: '1px solid #1E2E4F', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                    <div className="flex items-center gap-4">
                      <img 
                        src={homepageSettings.directorPhoto || '/director-punit-tyagi.jpg'} 
                        alt={`${homepageSettings.directorName || 'Punit Tyagi'} - ${homepageSettings.directorRole || 'Founder & Managing Director'}, A2 Realtors`} 
                        style={{ 
                          width: 68, 
                          height: 68, 
                          borderRadius: '50%', 
                          objectFit: 'cover', 
                          objectPosition: 'center 20%',
                          border: '2px solid #C5A059',
                          boxShadow: '0 4px 14px rgba(0,0,0,0.4)'
                        }} 
                      />
                      <div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                          {homepageSettings.directorName || 'Punit Tyagi'}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#DFB76C', fontWeight: 700 }}>
                          {homepageSettings.directorRole || 'Founder & Managing Director'}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: 2 }}>
                          A2 Realtors • 25 B Inder Road, Dalanwala, Dehradun
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3" style={{ marginTop: '1.25rem' }}>
                      <Link 
                        to="/contact" 
                        className="btn-green"
                        style={{ padding: '0.55rem 1.25rem', fontSize: '0.82rem', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                      >
                        <Mail size={14} /> Schedule Director Consultation
                      </Link>
                      <a 
                        href="tel:+918445190135" 
                        className="btn-outline-gray"
                        style={{ padding: '0.55rem 1rem', fontSize: '0.82rem', borderRadius: 10, borderColor: '#1E2E4F', color: '#E2E8F0', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                      >
                        <Phone size={14} style={{ color: '#DFB76C' }} /> Call Office
                      </a>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* 2.6. WHY CHOOSE US (KEY PILLARS OF EXCELLENCE) */}
      {homepageSettings.showWhyChooseUs !== false && (
        <section style={{ padding: '6.5rem 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', position: 'relative' }}>
          <div className="container">
            
            {/* Header */}
            <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 4rem auto' }}>
              <span className="badge badge-verified" style={{ fontSize: '0.8rem', padding: '0.35rem 0.9rem', borderRadius: 20, marginBottom: '0.85rem' }}>
                <ShieldCheck size={13} style={{ color: '#386635' }} /> Dehradun's Benchmark Advisory
              </span>
              <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 2.85rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                Why Discerning Buyers & Investors Choose A2 Realtors
              </h2>
              <p style={{ color: '#64748B', fontSize: '1.08rem', marginTop: '0.85rem' }}>
                We combine uncompromising integrity, forensic title due diligence, and exclusive valley inventory to ensure every investment delivers absolute peace of mind.
              </p>
            </div>

            {/* 6 Feature Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              
              {/* Feature 1 */}
              <div 
                className="card-luxury" 
                style={{ 
                  padding: '2.25rem', 
                  borderRadius: 20, 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ width: 54, height: 54, borderRadius: 14, backgroundColor: '#EBF4EC', color: '#386635', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <ShieldCheck size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.22rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.65rem' }}>
                    100% Verified Legal Due Diligence
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.7 }}>
                    Every listing undergoes a 30-year registrar title search, mutation verification, and MDDA approval confirmation before being listed. Zero legal ambiguities.
                  </p>
                </div>
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: '#386635', fontWeight: 700 }}>
                  <CheckCircle2 size={15} /> 100% Registry Ready Inventory
                </div>
              </div>

              {/* Feature 2 */}
              <div 
                className="card-luxury" 
                style={{ 
                  padding: '2.25rem', 
                  borderRadius: 20, 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ width: 54, height: 54, borderRadius: 14, backgroundColor: 'rgba(197, 160, 89, 0.15)', color: '#C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Landmark size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.22rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.65rem' }}>
                    Off-Market & Exclusive Valley Inventory
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.7 }}>
                    Direct access to private ancestral kothis in Dalanwala, hillside estates in Mussoorie Foothills, and prime commercial retail frontage before public release.
                  </p>
                </div>
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: '#C5A059', fontWeight: 700 }}>
                  <CheckCircle2 size={15} /> Exclusive Owner Direct Mandates
                </div>
              </div>

              {/* Feature 3 */}
              <div 
                className="card-luxury" 
                style={{ 
                  padding: '2.25rem', 
                  borderRadius: 20, 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ width: 54, height: 54, borderRadius: 14, backgroundColor: '#EBF4EC', color: '#386635', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <TrendingUp size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.22rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.65rem' }}>
                    High Capital Appreciation Analysis
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.7 }}>
                    Our research team maps infrastructural growth—including the Delhi-Dehradun Expressway, Sahastradhara smart corridor, and ring roads—for targeted ROI.
                  </p>
                </div>
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: '#386635', fontWeight: 700 }}>
                  <CheckCircle2 size={15} /> Verified Historical Price Benchmarks
                </div>
              </div>

              {/* Feature 4 */}
              <div 
                className="card-luxury" 
                style={{ 
                  padding: '2.25rem', 
                  borderRadius: 20, 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ width: 54, height: 54, borderRadius: 14, backgroundColor: 'rgba(197, 160, 89, 0.15)', color: '#C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Hammer size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.22rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.65rem' }}>
                    Turnkey Architectural & Build Services
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.7 }}>
                    From raw plot acquisition to custom villa architecture, MDDA layout sanctions, structural construction, and smart interiors—executed under single point accountability.
                  </p>
                </div>
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: '#C5A059', fontWeight: 700 }}>
                  <CheckCircle2 size={15} /> In-House Civil Engineers & Architects
                </div>
              </div>

              {/* Feature 5 */}
              <div 
                className="card-luxury" 
                style={{ 
                  padding: '2.25rem', 
                  borderRadius: 20, 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ width: 54, height: 54, borderRadius: 14, backgroundColor: '#EBF4EC', color: '#386635', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <HeartHandshake size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.22rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.65rem' }}>
                    NRI & Outstation Concierge Support
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.7 }}>
                    Remote video walkthroughs, digital documentation, Power of Attorney assistance, chauffeured valley inspection tours, and bank liaison for overseas Indians.
                  </p>
                </div>
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: '#386635', fontWeight: 700 }}>
                  <CheckCircle2 size={15} /> 450+ NRIs Successfully Settled
                </div>
              </div>

              {/* Feature 6 */}
              <div 
                className="card-luxury" 
                style={{ 
                  padding: '2.25rem', 
                  borderRadius: 20, 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ width: 54, height: 54, borderRadius: 14, backgroundColor: 'rgba(197, 160, 89, 0.15)', color: '#C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Award size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.22rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.65rem' }}>
                    Zero Hidden Costs & Ethical Pricing
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.7 }}>
                    Crystal clear fee structures, direct seller negotiations with no inflated middleman markups, and transparent breakdown of stamp duty and registry costs.
                  </p>
                </div>
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: '#C5A059', fontWeight: 700 }}>
                  <CheckCircle2 size={15} /> 4.9 / 5.0 Star Rated Trust Index
                </div>
              </div>

            </div>

            {/* Bottom Call to Action Banner inside Why Choose Us */}
            <div 
              style={{ 
                marginTop: '4rem', 
                backgroundColor: '#FFFFFF', 
                borderRadius: 20, 
                padding: '2.5rem', 
                border: '1px solid #E2E8F0',
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.5rem'
              }}
            >
              <div style={{ maxWidth: 600 }}>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem' }}>
                  Ready to Experience the A2 Realtors Advantage?
                </div>
                <p style={{ fontSize: '0.92rem', color: '#64748B' }}>
                  Speak directly with our senior advisory team or visit our flagship office at Inder Road, Dalanwala.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link to="/contact" className="btn-green btn-pill" style={{ padding: '0.85rem 1.85rem', fontSize: '0.95rem' }}>
                  <span>Book Private Consultation</span>
                  <ArrowRight size={16} />
                </Link>
                <a href="tel:+918445190135" className="btn-outline-green btn-pill" style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem' }}>
                  <Phone size={15} /> +91 84451 90135
                </a>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 3. FLAGSHIP PARTNER TOWNSHIPS & APPROVED DEVELOPMENTS */}
      {homepageSettings.showPartnerLogos && (
        <section 
          id="partner-townships"
          style={{ 
            background: 'radial-gradient(circle at 10% 15%, rgba(56, 102, 53, 0.05) 0%, transparent 45%), radial-gradient(circle at 90% 80%, rgba(197, 160, 89, 0.06) 0%, transparent 45%), #F8FAFC', 
            padding: '6rem 0', 
            borderTop: '1px solid #E2E8F0',
            borderBottom: '1px solid #E2E8F0',
            position: 'relative'
          }}
        >
          <div className="container">
            
            {/* Header */}
            <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto 3.5rem auto' }}>
              <div className="flex items-center justify-center gap-2" style={{ marginBottom: '1rem' }}>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 7, 
                  fontSize: '0.78rem', 
                  fontWeight: 800, 
                  letterSpacing: '0.1em', 
                  textTransform: 'uppercase', 
                  backgroundColor: '#EBF4EC', 
                  color: '#166534', 
                  padding: '0.45rem 1.1rem', 
                  borderRadius: 999,
                  border: '1px solid rgba(22, 101, 52, 0.25)',
                  boxShadow: '0 2px 8px rgba(22, 101, 52, 0.08)'
                }}>
                  <Sparkles size={14} style={{ color: '#166534' }} /> Authorized Townships & Developer Alliances
                </span>
              </div>

              <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 2.9rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em', lineHeight: 1.25 }}>
                Authorized Advisory Partner For Dehradun’s <span style={{ color: '#166534', fontFamily: 'Outfit, sans-serif' }}>Premier Townships</span>
              </h2>
              
              <p style={{ color: '#64748B', fontSize: '1.08rem', marginTop: '0.95rem', lineHeight: 1.75 }}>
                A2 Realtors is the authorized advisory partner for the Doon Valley’s most prestigious gated developments. 
                Benefit from direct developer pricing, forensic title verification, priority plot allotment, and seamless conveyance.
              </p>

              {/* Belt Filter Navigation Pills */}
              <div className="flex items-center justify-center gap-2" style={{ marginTop: '2.25rem', flexWrap: 'wrap' }}>
                {[
                  { key: 'ALL', label: 'All 6 Flagships', count: 6 },
                  { key: 'SAHASTRADHARA', label: 'Sahastradhara Belt (ATS, Panache, Zodiac)', count: 3 },
                  { key: 'MUSSOORIE', label: 'Mussoorie Corridor (Mayfair)', count: 1 },
                  { key: 'CANAL', label: 'Canal Road (Ghati River Valley)', count: 1 },
                  { key: 'PREMNAGAR', label: 'Prem Nagar / IMA (Silver Heights)', count: 1 }
                ].map(filter => (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => setPartnerFilter(filter.key)}
                    style={{
                      padding: '0.55rem 1.2rem',
                      borderRadius: 999,
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      border: partnerFilter === filter.key ? '1px solid #166534' : '1px solid #E2E8F0',
                      backgroundColor: partnerFilter === filter.key ? '#166534' : '#FFFFFF',
                      color: partnerFilter === filter.key ? '#FFFFFF' : '#475569',
                      boxShadow: partnerFilter === filter.key ? '0 6px 18px rgba(22, 101, 52, 0.25)' : '0 1px 4px rgba(0,0,0,0.03)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <span>{filter.label}</span>
                    <span style={{
                      backgroundColor: partnerFilter === filter.key ? 'rgba(255,255,255,0.2)' : '#F1F5F9',
                      color: partnerFilter === filter.key ? '#FFFFFF' : '#64748B',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.1rem 0.45rem',
                      borderRadius: 12
                    }}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 6-Township Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partnerDevelopments
                .filter(p => partnerFilter === 'ALL' || p.belt === partnerFilter)
                .map((project) => {
                  const isLivePhoto = partnerImageMode[project.id] === 1;
                  const currentImg = isLivePhoto ? project.sitePhoto : project.coverImage;

                  return (
                    <div
                      key={project.id}
                      className="card-luxury flex flex-col group"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 24,
                        border: '1px solid #E2E8F0',
                        overflow: 'hidden',
                        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: '0 8px 26px rgba(15, 23, 42, 0.05)',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-6px)';
                        e.currentTarget.style.boxShadow = '0 24px 50px -10px rgba(15, 23, 42, 0.14)';
                        e.currentTarget.style.borderColor = '#C5A059';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 26px rgba(15, 23, 42, 0.05)';
                        e.currentTarget.style.borderColor = '#E2E8F0';
                      }}
                    >
                      {/* Visual Cover Header */}
                      <div style={{ position: 'relative', height: 245, overflow: 'hidden', backgroundColor: '#0B1120' }}>
                        <img 
                          src={currentImg} 
                          alt={project.name} 
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
                          className="group-hover:scale-105"
                        />
                        
                        {/* Gradient Overlay */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(11,17,32,0.96) 0%, rgba(11,17,32,0.45) 55%, rgba(11,17,32,0.1) 80%, rgba(0,0,0,0.4) 100%)'
                        }} />

                        {/* Top Badges */}
                        <div className="flex items-center justify-between" style={{ position: 'absolute', top: 14, left: 14, right: 14, zIndex: 2 }}>
                          <span style={{
                            backgroundColor: 'rgba(22, 101, 52, 0.92)',
                            color: '#FFFFFF',
                            padding: '0.32rem 0.75rem',
                            borderRadius: 999,
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(74, 222, 128, 0.35)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
                          }}>
                            <ShieldCheck size={13} style={{ color: '#4ADE80' }} /> {project.approval}
                          </span>

                          <span style={{
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            color: '#DFB76C',
                            padding: '0.32rem 0.8rem',
                            borderRadius: 999,
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            border: '1px solid rgba(223, 183, 108, 0.5)',
                            backdropFilter: 'blur(8px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
                          }}>
                            {project.priceGuide}
                          </span>
                        </div>

                        {/* Quick Real Site Image Switcher Pill */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setPartnerImageMode(prev => ({ ...prev, [project.id]: prev[project.id] === 1 ? 0 : 1 }));
                          }}
                          style={{
                            position: 'absolute',
                            top: 50,
                            right: 14,
                            zIndex: 3,
                            backgroundColor: 'rgba(15, 23, 42, 0.78)',
                            backdropFilter: 'blur(8px)',
                            color: '#FFFFFF',
                            padding: '0.28rem 0.65rem',
                            borderRadius: 20,
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            transition: 'all 0.2s ease'
                          }}
                          title="Click to toggle between Official Master Elevation and Real Site Photo"
                        >
                          <Camera size={12} style={{ color: '#DFB76C' }} />
                          <span>{isLivePhoto ? 'Showing: Real Site Photo' : 'Toggle Real Site Photo'}</span>
                        </button>

                        {/* Bottom Banner on Image */}
                        <div style={{ position: 'absolute', bottom: 12, left: 18, right: 18, zIndex: 2 }}>
                          <div className="flex items-center gap-1.5" style={{ fontSize: '0.7rem', color: '#DFB76C', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 2 }}>
                            <BadgeCheck size={13} style={{ color: '#DFB76C' }} /> by {project.developer}
                          </div>
                          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', fontFamily: 'Outfit, sans-serif', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                            {project.name}
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div style={{ padding: '1.65rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                        <div>
                          {/* Location + Proximity Chip */}
                          <div className="flex items-center justify-between gap-2" style={{ marginBottom: '0.75rem' }}>
                            <div className="flex items-center gap-1.5" style={{ color: '#166534', fontSize: '0.82rem', fontWeight: 700 }}>
                              <MapPin size={14} style={{ color: '#166534', flexShrink: 0 }} />
                              <span className="truncate">{project.location}</span>
                            </div>
                            <span style={{ fontSize: '0.7rem', color: '#475569', backgroundColor: '#F1F5F9', padding: '0.15rem 0.55rem', borderRadius: 6, fontWeight: 700, whiteSpace: 'nowrap' }}>
                              {project.landmarks[0]}
                            </span>
                          </div>

                          {/* Tagline */}
                          <p style={{ fontSize: '0.86rem', color: '#64748B', lineHeight: 1.55, marginBottom: '1.1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {project.tagline}
                          </p>

                          {/* 3-Column Luxury Spec Grid */}
                          <div className="grid grid-cols-3 gap-2" style={{ marginBottom: '1.15rem' }}>
                            {project.specs.map((sp, sIdx) => (
                              <div key={sIdx} style={{ backgroundColor: '#F8FAFC', borderRadius: 10, padding: '0.5rem 0.35rem', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                                <div style={{ fontSize: '0.65rem', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                  {sp.label}
                                </div>
                                <div style={{ fontSize: '0.78rem', color: '#0F172A', fontWeight: 800, marginTop: 1 }} className="truncate">
                                  {sp.val}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Highlights Box */}
                          <div style={{ backgroundColor: '#F8FAFC', borderRadius: 12, padding: '0.9rem 1rem', border: '1px solid #E2E8F0', marginBottom: '1.4rem' }}>
                            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.55rem' }}>
                              Township Highlights
                            </div>
                            <div className="flex flex-col gap-2">
                              {project.highlights.slice(0, 3).map((item, hIdx) => (
                                <div key={hIdx} className="flex items-start gap-2" style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.4 }}>
                                  <CheckCircle2 size={13} style={{ color: '#166534', marginTop: 2, flexShrink: 0 }} />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Direct Action Links */}
                        <div className="flex flex-col gap-2.5" style={{ marginTop: 'auto' }}>
                          {/* 1. Direct Link to Live Inventory */}
                          <Link
                            to={`/search?q=${encodeURIComponent(project.searchQuery)}`}
                            className="w-full flex items-center justify-center gap-2"
                            style={{
                              padding: '0.72rem 1.1rem',
                              fontSize: '0.86rem',
                              borderRadius: 12,
                              fontWeight: 800,
                              textDecoration: 'none',
                              color: '#FFFFFF',
                              background: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
                              boxShadow: '0 4px 14px rgba(22, 101, 52, 0.25)',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <span>Explore Available Inventory</span>
                            <ArrowRight size={14} />
                          </Link>

                          {/* 2. Interactive Dossier & Site Visit Trigger */}
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedPartnerModal(project);
                                setModalImageIndex(0);
                              }}
                              className="btn-outline-gray flex items-center justify-center gap-1.5"
                              style={{
                                padding: '0.52rem 0.75rem',
                                fontSize: '0.78rem',
                                borderRadius: 10,
                                fontWeight: 700,
                                color: '#0F172A'
                              }}
                            >
                              <Info size={13} style={{ color: '#166534' }} /> Project Dossier
                            </button>

                            <Link
                              to={`/contact?project=${encodeURIComponent(project.name)}`}
                              className="btn-outline-gray flex items-center justify-center gap-1.5"
                              style={{
                                padding: '0.52rem 0.75rem',
                                fontSize: '0.78rem',
                                borderRadius: 10,
                                fontWeight: 700,
                                color: '#166534',
                                borderColor: '#166534',
                                textDecoration: 'none'
                              }}
                            >
                              <Calendar size={13} style={{ color: '#C5A059' }} /> Site Visit
                            </Link>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Bottom Advisory Assurance Bar */}
            <div 
              style={{ 
                marginTop: '4rem', 
                backgroundColor: '#FFFFFF', 
                borderRadius: 20, 
                padding: '1.75rem 2.25rem', 
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.5rem',
                boxShadow: '0 8px 30px rgba(0,0,0,0.03)'
              }}
            >
              <div className="flex items-center gap-4">
                <div style={{ width: 50, height: 50, borderRadius: 14, backgroundColor: '#EBF4EC', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Award size={26} />
                </div>
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>
                    A2 Realtors Direct Developer Advisory Guarantee
                  </div>
                  <div style={{ fontSize: '0.86rem', color: '#64748B', marginTop: 2 }}>
                    Zero markup on developer pricing • 100% verified mutation records • On-site project escort by certified senior consultants
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a 
                  href="tel:+918445190135" 
                  className="btn-outline-gray flex items-center gap-1.5"
                  style={{ padding: '0.65rem 1.3rem', borderRadius: 12, fontSize: '0.88rem' }}
                >
                  <Phone size={14} style={{ color: '#166534' }} /> +91 84451 90135
                </a>
                <Link
                  to="/contact"
                  className="btn-green flex items-center gap-1.5"
                  style={{ padding: '0.65rem 1.3rem', borderRadius: 12, fontSize: '0.88rem', textDecoration: 'none' }}
                >
                  <Mail size={14} /> Schedule Advisory Meeting
                </Link>
              </div>
            </div>

          </div>

          {/* PROJECT DOSSIER INTERACTIVE MODAL */}
          {selectedPartnerModal && (
            <div 
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.82)',
                backdropFilter: 'blur(8px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem'
              }}
              onClick={() => setSelectedPartnerModal(null)}
            >
              <div 
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 24,
                  maxWidth: 860,
                  width: '100%',
                  maxHeight: '92vh',
                  overflowY: 'auto',
                  boxShadow: '0 30px 70px rgba(0,0,0,0.35)',
                  border: '1px solid #E2E8F0',
                  position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header Cover with Multi-Image Tab Selector */}
                <div style={{ position: 'relative', height: 260, backgroundColor: '#0B1120', overflow: 'hidden' }}>
                  <img 
                    src={selectedPartnerModal.gallery[modalImageIndex]?.url || selectedPartnerModal.coverImage} 
                    alt={selectedPartnerModal.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(11,17,32,0.95) 0%, rgba(11,17,32,0.4) 60%, rgba(0,0,0,0.5) 100%)'
                  }} />

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedPartnerModal(null)}
                    style={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0,0,0,0.65)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                  >
                    <X size={18} />
                  </button>

                  {/* Gallery Image Tabs on Top of Modal Header */}
                  <div style={{ position: 'absolute', top: 16, left: 20, display: 'flex', gap: 6, zIndex: 10 }}>
                    {selectedPartnerModal.gallery.map((gItem: any, gIdx: number) => (
                      <button
                        key={gIdx}
                        type="button"
                        onClick={() => setModalImageIndex(gIdx)}
                        style={{
                          backgroundColor: modalImageIndex === gIdx ? '#166534' : 'rgba(15, 23, 42, 0.75)',
                          backdropFilter: 'blur(8px)',
                          color: '#FFFFFF',
                          padding: '0.35rem 0.75rem',
                          borderRadius: 20,
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          border: modalImageIndex === gIdx ? '1px solid #4ADE80' : '1px solid rgba(255, 255, 255, 0.25)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5
                        }}
                      >
                        <Camera size={11} style={{ color: modalImageIndex === gIdx ? '#4ADE80' : '#DFB76C' }} />
                        <span>{gItem.type}</span>
                      </button>
                    ))}
                  </div>

                  {/* Bottom Header Details */}
                  <div style={{ position: 'absolute', bottom: 18, left: 24, right: 24 }}>
                    <div className="flex items-center gap-2" style={{ marginBottom: 4, flexWrap: 'wrap' }}>
                      <span style={{ backgroundColor: '#DFB76C', color: '#0F172A', padding: '0.2rem 0.65rem', borderRadius: 6, fontSize: '0.72rem', fontWeight: 800 }}>
                        {selectedPartnerModal.approval}
                      </span>
                      <span style={{ color: '#E2E8F0', fontSize: '0.8rem', fontWeight: 600 }}>
                        by {selectedPartnerModal.developer}
                      </span>
                      <span style={{ color: '#94A3B8', fontSize: '0.72rem' }}>
                        • {selectedPartnerModal.officialSource}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'Outfit, sans-serif' }}>
                      {selectedPartnerModal.name}
                    </h3>
                  </div>
                </div>

                {/* Modal Body */}
                <div style={{ padding: '2.25rem' }}>
                  
                  {/* Quick Stat Pill Bar */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ marginBottom: '1.85rem' }}>
                    <div style={{ padding: '0.85rem', backgroundColor: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Pricing Guide</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: '#166534', marginTop: 2 }}>{selectedPartnerModal.priceGuide}</div>
                    </div>
                    <div style={{ padding: '0.85rem', backgroundColor: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Project Scale</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginTop: 2 }}>{selectedPartnerModal.scale}</div>
                    </div>
                    <div style={{ padding: '0.85rem', backgroundColor: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Typology</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A', marginTop: 2 }} className="truncate">{selectedPartnerModal.type}</div>
                    </div>
                    <div style={{ padding: '0.85rem', backgroundColor: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>RERA / Sanction</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F172A', marginTop: 2 }} className="truncate">{selectedPartnerModal.reraNumber}</div>
                    </div>
                  </div>

                  {/* Overview Paragraph */}
                  <div style={{ marginBottom: '1.85rem' }}>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.65rem' }}>
                      Township Dossier & Overview
                    </h4>
                    <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.75 }}>
                      {selectedPartnerModal.description}
                    </p>
                  </div>

                  {/* Two Columns: Highlights & Landmarks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '2rem' }}>
                    
                    {/* Key Master Plan Highlights */}
                    <div style={{ padding: '1.35rem', backgroundColor: '#F0FDF4', borderRadius: 16, border: '1px solid #DCFCE7' }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#166534', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <ShieldCheck size={16} /> Key Infrastructure & Approvals
                      </div>
                      <div className="flex flex-col gap-2.5">
                        {selectedPartnerModal.highlights.map((h: string, i: number) => (
                          <div key={i} className="flex items-start gap-2" style={{ fontSize: '0.85rem', color: '#14532D', lineHeight: 1.45 }}>
                            <Check size={14} style={{ color: '#166534', marginTop: 2, flexShrink: 0 }} />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Proximity & Distances */}
                    <div style={{ padding: '1.35rem', backgroundColor: '#F8FAFC', borderRadius: 16, border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Compass size={16} style={{ color: '#C5A059' }} /> Connectivity & Key Landmarks
                      </div>
                      <div className="flex flex-col gap-2.5">
                        {selectedPartnerModal.landmarks.map((l: string, i: number) => (
                          <div key={i} className="flex items-start gap-2" style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.45 }}>
                            <MapPin size={14} style={{ color: '#C5A059', marginTop: 2, flexShrink: 0 }} />
                            <span>{l}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between gap-3 flex-wrap" style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem' }}>
                    <a
                      href="tel:+918445190135"
                      className="btn-outline-gray flex items-center gap-2"
                      style={{ padding: '0.7rem 1.3rem', borderRadius: 12, fontWeight: 700 }}
                    >
                      <Phone size={15} style={{ color: '#166534' }} /> Call Senior Advisor (+91 84451 90135)
                    </a>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/contact?project=${encodeURIComponent(selectedPartnerModal.name)}`}
                        onClick={() => setSelectedPartnerModal(null)}
                        className="btn-outline-gray flex items-center gap-2"
                        style={{ padding: '0.7rem 1.3rem', borderRadius: 12, fontWeight: 700, color: '#166534', borderColor: '#166534', textDecoration: 'none' }}
                      >
                        <Calendar size={15} /> Book Private Tour
                      </Link>

                      <Link
                        to={`/search?q=${encodeURIComponent(selectedPartnerModal.searchQuery)}`}
                        onClick={() => setSelectedPartnerModal(null)}
                        className="btn-green flex items-center gap-2"
                        style={{ padding: '0.7rem 1.6rem', borderRadius: 12, fontWeight: 700, textDecoration: 'none' }}
                      >
                        View Project Inventory <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

        </section>
      )}

      {/* 4. EXPLORE PRIME DEHRADUN HOTSPOTS */}
      <LocalityExplorer />

      {/* 5. PROPERTY CATEGORIES GRID */}
      {homepageSettings.showCategories && (
        <section style={{ padding: '6rem 0', backgroundColor: '#FFFFFF' }}>
          <div className="container">
            
            <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 3.5rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                {homepageSettings.categoriesTitle || 'Explore by Property Category'}
              </h2>
              <p style={{ color: '#64748B', fontSize: '1.05rem', marginTop: '0.65rem' }}>
                Select your preferred asset class to view verified inventory with high capital appreciation potential.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-6 gap-5">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (cat.type === 'CONSTRUCTION') navigate('/construction');
                    else navigate(`/search?category=${cat.type}`);
                  }}
                  className="card-luxury"
                  style={{
                    padding: '2rem 1.25rem',
                    borderRadius: 20,
                    cursor: 'pointer',
                    textAlign: 'center',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div 
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      backgroundColor: '#EBF4EC',
                      color: '#386635',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <cat.icon size={26} />
                  </div>

                  <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', marginBottom: 3 }}>
                    {cat.name}
                  </h3>
                  
                  <div style={{ fontSize: '0.78rem', color: '#386635', fontWeight: 700, marginBottom: 2 }}>
                    {cat.count}
                  </div>

                  <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                    {cat.desc}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 6. POPULAR & FEATURED PROPERTIES SHOWCASE */}
      {homepageSettings.showPopularProperties && (
        <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
          <div className="container">
            
            <div className="flex flex-wrap items-end justify-between gap-6" style={{ marginBottom: '3rem' }}>
              <div>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                  {homepageSettings.popularPropertiesTitle || 'Best Properties For Sale in Dehradun'}
                </h2>
                <p style={{ color: '#64748B', fontSize: '1.05rem', marginTop: '0.5rem' }}>
                  Hand-picked exclusive villas, penthouses, and prime plots with clear title deeds.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
                {[
                  { id: 'ALL', label: 'All Listings' },
                  { id: 'VILLA', label: 'Luxury Villas' },
                  { id: 'APARTMENT', label: 'Apartments' },
                  { id: 'PLOT', label: 'Plots & Land' },
                  { id: 'COMMERCIAL', label: 'Commercial' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePropertyTab(tab.id)}
                    className={activePropertyTab === tab.id ? "btn-green btn-pill" : "btn-outline-gray btn-pill"}
                    style={{ padding: '0.55rem 1.25rem', fontSize: '0.86rem' }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Cards Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 ${gridColsClass} gap-6`}>
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* View All Properties Bottom CTA */}
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <button
                onClick={() => navigate('/search')}
                className="btn-outline-green btn-pill"
                style={{ padding: '0.85rem 2.5rem', fontSize: '0.98rem' }}
              >
                <span>View All 80+ Verified Properties</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </section>
      )}

      {/* 7. INTERACTIVE MORTGAGE & EMI CALCULATOR */}
      <EMICalculator />

      {/* 8. WHAT WE DO: BESPOKE REAL ESTATE & CONSTRUCTION SERVICES */}
      {homepageSettings.showWhatWeDo && (
        <section style={{ padding: '6rem 0', backgroundColor: '#0B1120', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
          
          {/* Ambient Glow */}
          <div 
            style={{
              position: 'absolute',
              top: '20%',
              right: '-10%',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(197, 160, 89, 0.15) 0%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none'
            }}
          />

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            
            <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 4rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                End-to-End Real Estate & Architectural Solutions
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '1.08rem', marginTop: '0.65rem' }}>
                We provide full-lifecycle support from property discovery, legal vetting to luxury turnkey construction.
              </p>
            </div>

            {/* 4 Feature Cards with Numbering */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="card-dark" style={{ padding: '2.4rem 1.85rem', borderRadius: 20, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '2.4rem', fontWeight: 800, color: '#1E293B', fontFamily: 'Outfit' }}>01</div>
                <div style={{ width: 50, height: 50, borderRadius: 14, backgroundColor: 'rgba(56,102,53,0.25)', color: '#A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(56,102,53,0.4)' }}>
                  <Home size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.65rem' }}>Residential Advisory</h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Curated luxury bungalows, mountain-facing apartments, and independent kothis in Dehradun’s most prestigious corridors.
                </p>
                <Link to="/search" style={{ color: '#DFB76C', fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Browse Homes <ArrowRight size={14} />
                </Link>
              </div>

              <div className="card-dark" style={{ padding: '2.4rem 1.85rem', borderRadius: 20, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '2.4rem', fontWeight: 800, color: '#1E293B', fontFamily: 'Outfit' }}>02</div>
                <div style={{ width: 50, height: 50, borderRadius: 14, backgroundColor: 'rgba(197,160,89,0.25)', color: '#DFB76C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(197,160,89,0.4)' }}>
                  <Hammer size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.65rem' }}>Turnkey Construction</h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Architectural planning, MDDA sanction drawings, RCC construction, and luxury interior finishing under single contract.
                </p>
                <Link to="/construction" style={{ color: '#DFB76C', fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Build With Us <ArrowRight size={14} />
                </Link>
              </div>

              <div className="card-dark" style={{ padding: '2.4rem 1.85rem', borderRadius: 20, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '2.4rem', fontWeight: 800, color: '#1E293B', fontFamily: 'Outfit' }}>03</div>
                <div style={{ width: 50, height: 50, borderRadius: 14, backgroundColor: 'rgba(56,102,53,0.25)', color: '#A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(56,102,53,0.4)' }}>
                  <FileCheck size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.65rem' }}>Title & Legal Due Diligence</h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Comprehensive 30-year search report, mutation check, registry drafting, and hassle-free bank loan liaison.
                </p>
                <Link to="/about" style={{ color: '#DFB76C', fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>

              <div className="card-dark" style={{ padding: '2.4rem 1.85rem', borderRadius: 20, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '2.4rem', fontWeight: 800, color: '#1E293B', fontFamily: 'Outfit' }}>04</div>
                <div style={{ width: 50, height: 50, borderRadius: 14, backgroundColor: 'rgba(197,160,89,0.25)', color: '#DFB76C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(197,160,89,0.4)' }}>
                  <Briefcase size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.65rem' }}>NRI & Owner Management</h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Dedicated property caretakers, tenant screening, lease agreements, and fast asset resale for overseas property owners.
                </p>
                <Link to="/sell" style={{ color: '#DFB76C', fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  List With Us <ArrowRight size={14} />
                </Link>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* 9. TESTIMONIALS & CLIENT REVIEWS */}
      {homepageSettings.showTestimonials && (
        <section style={{ padding: '6rem 0', backgroundColor: '#FFFFFF' }}>
          <div className="container">
            
            <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 4rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                Trusted by 1,850+ Homeowners & Investors
              </h2>
              <p style={{ color: '#64748B', fontSize: '1.05rem', marginTop: '0.65rem' }}>
                Hear directly from clients who found their dream home and prime investments through A2 Realtors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="card-luxury"
                  style={{
                    padding: '2.4rem 2rem',
                    borderRadius: 24,
                    backgroundColor: '#F8FAFC',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  <div>
                    {/* 5 Stars */}
                    <div className="flex gap-1" style={{ color: '#F59E0B', marginBottom: '1.25rem' }}>
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#F59E0B" />
                      ))}
                    </div>

                    <p style={{ fontSize: '0.98rem', color: '#1E293B', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Author Profile */}
                  <div className="flex items-center gap-3" style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem' }}>
                    <img
                      src={item.avatar}
                      alt={item.name}
                      style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid #386635' }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        {item.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 10. GET IN TOUCH & SCHEDULE VIP CONSULTATION */}
      {homepageSettings.showContactForm && (
        <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
          <div className="container">
            
            <div 
              style={{
                position: 'relative',
                borderRadius: 28,
                overflow: 'hidden',
                backgroundImage: 'linear-gradient(to right, rgba(11,17,32,0.85) 0%, rgba(11,17,32,0.4) 50%, rgba(11,17,32,0.9) 100%), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '4.5rem 3rem',
                display: 'flex',
                justifyContent: 'flex-end',
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
              }}
            >
              <div 
                className="glass-panel"
                style={{ 
                  maxWidth: 500, 
                  width: '100%', 
                  padding: '2.5rem', 
                  borderRadius: 24,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)' 
                }}
              >
                
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', lineHeight: 1.2 }}>
                  {homepageSettings.contactTitle || "Book a Guided Valley Property Tour"}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.5rem' }}>
                  Our senior consultants will shortlist properties matching your exact criteria and arrange chauffeured site visits.
                </p>

                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0', backgroundColor: '#EBF4EC', borderRadius: 16 }}>
                    <CheckCircle2 size={46} style={{ color: '#386635', margin: '0 auto 0.75rem auto' }} />
                    <strong style={{ display: 'block', fontSize: '1.15rem', color: '#0F172A' }}>Consultation Booked!</strong>
                    <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: 6, maxWidth: 320, margin: '6px auto 0 auto' }}>
                      Our property specialist will contact you on <strong>{formPhone}</strong> to confirm your schedule.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit}>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.78rem' }}>Full Name *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Your Name" 
                          value={formName} 
                          onChange={(e) => setFormName(e.target.value)} 
                          className="form-input" 
                          style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }} 
                        />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.78rem' }}>Phone Number *</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="+91 98970 00000" 
                          value={formPhone} 
                          onChange={(e) => setFormPhone(e.target.value)} 
                          className="form-input" 
                          style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }} 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ marginTop: '0.75rem' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.78rem' }}>Email Address</label>
                        <input 
                          type="email" 
                          placeholder="name@email.com" 
                          value={formEmail} 
                          onChange={(e) => setFormEmail(e.target.value)} 
                          className="form-input" 
                          style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }} 
                        />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.78rem' }}>Preferred Date</label>
                        <input 
                          type="date" 
                          value={formDate} 
                          onChange={(e) => setFormDate(e.target.value)} 
                          className="form-input" 
                          style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }} 
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '0.75rem' }}>
                      <label className="form-label" style={{ fontSize: '0.78rem' }}>Property Interest</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="form-select"
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                      >
                        <option value="Buy Luxury Villa / Kothi">Buy Luxury Villa / Kothi</option>
                        <option value="Buy Apartment / Penthouse">Buy Apartment / Penthouse</option>
                        <option value="Buy Residential Plot">Buy Residential Plot</option>
                        <option value="Commercial Space / Investment">Commercial Space / Investment</option>
                        <option value="Turnkey Construction / Renovation">Turnkey Construction / Renovation</option>
                        <option value="Sell / Rent My Property">Sell / Rent My Property</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}>
                      <label className="form-label" style={{ fontSize: '0.78rem' }}>Specific Requirements / Note</label>
                      <textarea 
                        rows={2} 
                        placeholder="e.g. Looking for 4BHK with valley view near Dalanwala..." 
                        value={formMessage} 
                        onChange={(e) => setFormMessage(e.target.value)} 
                        className="form-textarea" 
                        style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }} 
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn-green w-full" 
                      style={{ width: '100%', borderRadius: 12, padding: '0.85rem', fontSize: '0.95rem' }}
                    >
                      <span>Submit Tour Request</span>
                      <ArrowRight size={16} />
                    </button>

                  </form>
                )}

              </div>

            </div>

          </div>
        </section>
      )}

      {/* 11. HELPFUL REAL ESTATE ARTICLES & MARKET INSIGHTS */}
      {homepageSettings.showLatestArticles && (
        <section style={{ padding: '6rem 0', backgroundColor: '#FFFFFF' }}>
          <div className="container">
            
            <div className="flex flex-wrap items-center justify-between gap-4" style={{ marginBottom: '3.5rem' }}>
              <div>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                  {homepageSettings.articlesTitle || 'Market Reports & Buying Guides'}
                </h2>
                <p style={{ color: '#64748B', fontSize: '1.05rem', marginTop: '0.5rem' }}>
                  Expert insights on property registry laws, locality appreciation, and investment strategies in Uttarakhand.
                </p>
              </div>
              <Link to="/insights" className="btn-outline-green btn-pill" style={{ padding: '0.65rem 1.5rem' }}>
                Explore All Articles
              </Link>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post) => (
                <div key={post.id} className="card-luxury flex flex-col" style={{ borderRadius: 20, overflow: 'hidden' }}>
                  <img 
                    src={post.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'} 
                    alt={post.title} 
                    style={{ width: '100%', height: 220, objectFit: 'cover' }} 
                  />
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div className="flex items-center gap-2" style={{ fontSize: '0.78rem', color: '#386635', fontWeight: 700, marginBottom: '0.5rem' }}>
                      <span className="badge badge-verified" style={{ fontSize: '0.68rem' }}>{post.category}</span>
                      <span>• {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.35, marginBottom: '0.75rem' }}>
                      <Link to="/insights" style={{ color: 'inherit' }}>
                        {post.title}
                      </Link>
                    </h3>

                    <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #F1F5F9' }}>
                      <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>By {post.author}</span>
                      <Link to="/insights" style={{ color: '#386635', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 3 }}>
                        Read More <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

    </div>
  );
};
