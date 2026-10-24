import React, { useState, useRef, useEffect } from 'react';
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

  // Approved Townships Slider State & Scroll Handlers
  const partnerSliderRef = useRef<HTMLDivElement>(null);
  const [partnerCanScrollLeft, setPartnerCanScrollLeft] = useState(false);
  const [partnerCanScrollRight, setPartnerCanScrollRight] = useState(true);
  const [partnerActiveSlide, setPartnerActiveSlide] = useState(0);

  const checkPartnerScroll = () => {
    if (!partnerSliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = partnerSliderRef.current;
    setPartnerCanScrollLeft(scrollLeft > 15);
    setPartnerCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    const cardWidth = clientWidth >= 1024 ? clientWidth / 3 : clientWidth >= 768 ? clientWidth / 2 : clientWidth * 0.88;
    const idx = Math.round(scrollLeft / (cardWidth + 24));
    setPartnerActiveSlide(Math.max(0, idx));
  };

  const handlePartnerScroll = (direction: 'left' | 'right') => {
    if (!partnerSliderRef.current) return;
    const { clientWidth } = partnerSliderRef.current;
    const scrollAmount = clientWidth >= 1024 ? clientWidth * 0.72 : clientWidth >= 768 ? clientWidth * 0.85 : clientWidth * 0.88;
    partnerSliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const scrollToPartnerProject = (index: number) => {
    if (!partnerSliderRef.current) return;
    const { clientWidth } = partnerSliderRef.current;
    const cardWidth = clientWidth >= 1024 ? (clientWidth - 48) / 3 : clientWidth >= 768 ? (clientWidth - 24) / 2 : clientWidth * 0.88;
    partnerSliderRef.current.scrollTo({
      left: index * (cardWidth + 24),
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const el = partnerSliderRef.current;
    if (!el) return;
    checkPartnerScroll();
    el.addEventListener('scroll', checkPartnerScroll, { passive: true });
    window.addEventListener('resize', checkPartnerScroll);
    return () => {
      el.removeEventListener('scroll', checkPartnerScroll);
      window.removeEventListener('resize', checkPartnerScroll);
    };
  }, [partnerFilter]);

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
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      sitePhoto: 'https://justabode.com/public/frontend/uploads/17180984291.jpeg',
      gallery: [
        { title: 'Real Plotted Infrastructure & Concrete Internal Roads', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', type: 'Official Plotted Master Elevation' },
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
      coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      sitePhoto: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        { title: 'Scenic Riverfront Foothill Community', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', type: 'Enclave Elevation' },
        { title: 'Pristine Canal Road Valley Terrain', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80', type: 'Valley Vista' }
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
        <section style={{ padding: '7rem 0', backgroundColor: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle decorative background gradient */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100%',
              backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(22, 101, 52, 0.05) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(197, 160, 89, 0.06) 0%, transparent 50%)',
              pointerEvents: 'none'
            }}
          />

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            
            {/* Section Tagline */}
            <div className="flex items-center justify-center gap-2" style={{ marginBottom: '1rem' }}>
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  backgroundColor: '#EBF4EC',
                  color: '#166534',
                  padding: '0.38rem 1rem',
                  borderRadius: 999,
                  border: '1px solid rgba(22, 101, 52, 0.25)',
                  boxShadow: '0 2px 8px rgba(22, 101, 52, 0.08)'
                }}
              >
                <Sparkles size={13} style={{ color: '#166534' }} /> Heritage of Trust &amp; Local Mastery
              </span>
            </div>

            <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 4rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
                Rooted in Dehradun, Built on <span style={{ color: '#166534', fontFamily: 'Outfit, sans-serif' }}>Integrity &amp; Pure Transparency</span>
              </h2>
              <p style={{ color: '#64748B', fontSize: '1.08rem', marginTop: '0.95rem', lineHeight: 1.75 }}>
                Established in the heart of Dalanwala, A2 Realtors is Uttarakhand’s benchmark real estate advisory and development firm. We curate premier residential kothis, hill-view penthouses, approved freehold plots, and turnkey architectural estates with unmatched legal diligence.
              </p>
            </div>

            {/* 2-Column Grid: Company Story / Pillars + Director's Message Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              
              {/* Left Column: Company Story & Highlights (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between" style={{ gap: '2rem' }}>
                <div 
                  className="card-luxury hover-lift"
                  style={{ 
                    backgroundColor: '#F8FAFC', 
                    borderRadius: 26, 
                    padding: '2.75rem', 
                    border: '1px solid #E2E8F0', 
                    boxShadow: '0 6px 24px rgba(15, 23, 42, 0.04)' 
                  }}
                >
                  <div className="flex items-center gap-3.5" style={{ marginBottom: '1.5rem' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: '#EBF4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#166534', border: '1px solid rgba(22, 101, 52, 0.2)' }}>
                      <Building2 size={26} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#94A3B8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Our Identity</span>
                      <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit, sans-serif' }}>Who We Are at A2 Realtors</h3>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.98rem', color: '#334155', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                    For over 15 years, A2 Realtors has championed safe, high-yield property transactions across Dehradun, Mussoorie, and the Doon Valley. In a market where title ambiguities and unapproved layouts cause investor hesitation, we pioneered a rigorous <strong>zero-compromise legal vetting process</strong> before introducing any property to our clientele.
                  </p>

                  <p style={{ fontSize: '0.98rem', color: '#64748B', lineHeight: 1.8, marginBottom: '2rem' }}>
                    Whether you are an NRI securing a mountain retreat, an established family seeking a legacy villa along Rajpur Road, or an astute investor acquiring prime commercial assets, our certified advisors provide end-to-end fiduciary guidance from preliminary due diligence through registry and possession.
                  </p>

                  {/* 3 Core Value Stats */}
                  <div className="grid grid-cols-3 gap-4" style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.75rem' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.75rem', color: '#166534' }}>15+</div>
                      <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 700, marginTop: 2 }}>Years in Valley</div>
                    </div>
                    <div style={{ textAlign: 'center', borderLeft: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0' }}>
                      <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.75rem', color: '#C5A059' }}>100%</div>
                      <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 700, marginTop: 2 }}>Freehold Clear Titles</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.75rem', color: '#0F172A' }}>₹650 Cr+</div>
                      <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 700, marginTop: 2 }}>Delivered Volume</div>
                    </div>
                  </div>
                </div>

                {/* Company Highlights Strip */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className="card-luxury hover-lift"
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.4rem', backgroundColor: '#FFFFFF', borderRadius: 18, border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#EBF4EC', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(22, 101, 52, 0.2)' }}>
                      <Compass size={22} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: 3 }}>Hyper-Local Expertise</h4>
                      <p style={{ fontSize: '0.84rem', color: '#64748B', lineHeight: 1.55 }}>Unrivaled intelligence across Dalanwala, Rajpur Rd, Mussoorie &amp; Sahastradhara corridor.</p>
                    </div>
                  </div>

                  <div 
                    className="card-luxury hover-lift"
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.4rem', backgroundColor: '#FFFFFF', borderRadius: 18, border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(197, 160, 89, 0.18)', color: '#C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(197, 160, 89, 0.35)' }}>
                      <HeartHandshake size={22} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: 3 }}>Client Fiduciary Care</h4>
                      <p style={{ fontSize: '0.84rem', color: '#64748B', lineHeight: 1.55 }}>Transparent commission structures, zero hidden fees, and honest property valuations.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Director's Message (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col">
                <div 
                  className="card-luxury hover-lift"
                  style={{ 
                    height: '100%',
                    backgroundColor: '#070C16', 
                    borderRadius: 26, 
                    padding: '2.75rem', 
                    color: '#FFFFFF',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
                    border: '1px solid #1E2E4F'
                  }}
                >
                  {/* Atmospheric Glow */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '-15%',
                      right: '-15%',
                      width: 260,
                      height: 260,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(197, 160, 89, 0.22) 0%, transparent 70%)',
                      filter: 'blur(45px)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Header Badge & Quote Icon */}
                  <div>
                    <div className="flex items-center justify-between" style={{ marginBottom: '1.75rem' }}>
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: 6, 
                        fontSize: '0.74rem', 
                        fontWeight: 800, 
                        letterSpacing: '0.1em', 
                        textTransform: 'uppercase', 
                        backgroundColor: 'rgba(197, 160, 89, 0.18)', 
                        color: '#DFB76C', 
                        padding: '0.4rem 0.85rem', 
                        borderRadius: 20,
                        border: '1px solid rgba(197, 160, 89, 0.38)'
                      }}>
                        <Award size={13} /> Director's Vision &amp; Mandate
                      </span>

                      <Quote size={34} style={{ color: 'rgba(197, 160, 89, 0.35)' }} />
                    </div>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.4, marginBottom: '1.35rem', fontFamily: 'Outfit, sans-serif' }}>
                      "{homepageSettings.directorQuote || 'Real estate is not merely land and brick; it is a sacred foundation for family legacies and hard-earned wealth.'}"
                    </h3>

                    <p style={{ fontSize: '0.94rem', color: '#94A3B8', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '1.25rem' }}>
                      "When we founded A2 Realtors in Dalanwala, our mission was clear: eradicate the uncertainty, legal ambiguity, and stress from buying property in Uttarakhand.
                    </p>

                    <p style={{ fontSize: '0.94rem', color: '#94A3B8', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                      Every property we present has been scrutinized as if we were purchasing it for our own kin. Our relationship with our clients begins before the sale and endures for generations."
                    </p>
                  </div>

                  {/* Director Signature & Profile */}
                  <div style={{ borderTop: '1px solid #1E2E4F', paddingTop: '1.75rem', marginTop: '1.75rem' }}>
                    <div className="flex items-center gap-4">
                      <img 
                        src={homepageSettings.directorPhoto || '/director-punit-tyagi.jpg'} 
                        alt={`${homepageSettings.directorName || 'Punit Tyagi'} - ${homepageSettings.directorRole || 'Founder & Managing Director'}, A2 Realtors`} 
                        style={{ 
                          width: 72, 
                          height: 72, 
                          borderRadius: '50%', 
                          objectFit: 'cover', 
                          objectPosition: 'center 20%',
                          border: '2px solid #C5A059',
                          boxShadow: '0 6px 20px rgba(0,0,0,0.5)'
                        }} 
                      />
                      <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em', fontFamily: 'Outfit, sans-serif' }}>
                          {homepageSettings.directorName || 'Punit Tyagi'}
                        </div>
                        <div style={{ fontSize: '0.84rem', color: '#DFB76C', fontWeight: 700 }}>
                          {homepageSettings.directorRole || 'Founder & Managing Director'}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: 2 }}>
                          A2 Realtors • 25 B Inder Road, Dalanwala, Dehradun
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3" style={{ marginTop: '1.5rem' }}>
                      <Link 
                        to="/contact" 
                        className="btn-green hover-lift"
                        style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem', borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 700 }}
                      >
                        <Mail size={14} /> Schedule Consultation
                      </Link>
                      <a 
                        href="tel:+918445190135" 
                        className="btn-pill hover-lift"
                        style={{ padding: '0.65rem 1.15rem', fontSize: '0.85rem', borderRadius: 12, border: '1px solid #1E2E4F', color: '#E2E8F0', backgroundColor: 'rgba(255,255,255,0.05)', display: 'inline-flex', alignItems: 'center', gap: 6 }}
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
        <section style={{ padding: '7rem 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', position: 'relative' }}>
          <div className="container">
            
            {/* Header */}
            <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 4.5rem auto' }}>
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  backgroundColor: '#EBF4EC',
                  color: '#166534',
                  padding: '0.38rem 1rem',
                  borderRadius: 999,
                  border: '1px solid rgba(22, 101, 52, 0.25)',
                  boxShadow: '0 2px 8px rgba(22, 101, 52, 0.08)',
                  marginBottom: '1rem'
                }}
              >
                <ShieldCheck size={14} style={{ color: '#166534' }} /> Dehradun's Benchmark Advisory
              </span>
              <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em', lineHeight: 1.25 }}>
                Why Discerning Buyers &amp; Investors Choose A2 Realtors
              </h2>
              <p style={{ color: '#64748B', fontSize: '1.08rem', marginTop: '0.95rem', lineHeight: 1.7 }}>
                We combine uncompromising integrity, forensic title due diligence, and exclusive valley inventory to ensure every investment delivers absolute peace of mind.
              </p>
            </div>

            {/* 6 Feature Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Feature 1 */}
              <div 
                className="card-luxury hover-lift" 
                style={{ 
                  padding: '2.5rem', 
                  borderRadius: 22, 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: '#EBF4EC', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.4rem', border: '1px solid rgba(22, 101, 52, 0.2)' }}>
                    <ShieldCheck size={30} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>
                    100% Verified Legal Due Diligence
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: '#64748B', lineHeight: 1.75 }}>
                    Every listing undergoes a 30-year registrar title search, mutation verification, and MDDA approval confirmation before being listed. Zero legal ambiguities.
                  </p>
                </div>
                <div style={{ marginTop: '1.75rem', paddingTop: '1.15rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.84rem', color: '#166534', fontWeight: 800 }}>
                  <CheckCircle2 size={16} /> 100% Registry Ready Inventory
                </div>
              </div>

              {/* Feature 2 */}
              <div 
                className="card-luxury hover-lift" 
                style={{ 
                  padding: '2.5rem', 
                  borderRadius: 22, 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: 'rgba(197, 160, 89, 0.18)', color: '#C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.4rem', border: '1px solid rgba(197, 160, 89, 0.35)' }}>
                    <Landmark size={30} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>
                    Off-Market &amp; Exclusive Valley Inventory
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: '#64748B', lineHeight: 1.75 }}>
                    Direct access to private ancestral kothis in Dalanwala, hillside estates in Mussoorie Foothills, and prime commercial retail frontage before public release.
                  </p>
                </div>
                <div style={{ marginTop: '1.75rem', paddingTop: '1.15rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.84rem', color: '#C5A059', fontWeight: 800 }}>
                  <CheckCircle2 size={16} /> Exclusive Owner Direct Mandates
                </div>
              </div>

              {/* Feature 3 */}
              <div 
                className="card-luxury hover-lift" 
                style={{ 
                  padding: '2.5rem', 
                  borderRadius: 22, 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: '#EBF4EC', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.4rem', border: '1px solid rgba(22, 101, 52, 0.2)' }}>
                    <TrendingUp size={30} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>
                    High Capital Appreciation Analysis
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: '#64748B', lineHeight: 1.75 }}>
                    Our research team maps infrastructural growth—including the Delhi-Dehradun Expressway, Sahastradhara smart corridor, and ring roads—for targeted ROI.
                  </p>
                </div>
                <div style={{ marginTop: '1.75rem', paddingTop: '1.15rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.84rem', color: '#166534', fontWeight: 800 }}>
                  <CheckCircle2 size={16} /> Verified Historical Price Benchmarks
                </div>
              </div>

              {/* Feature 4 */}
              <div 
                className="card-luxury hover-lift" 
                style={{ 
                  padding: '2.5rem', 
                  borderRadius: 22, 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: 'rgba(197, 160, 89, 0.18)', color: '#C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.4rem', border: '1px solid rgba(197, 160, 89, 0.35)' }}>
                    <Hammer size={30} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>
                    Turnkey Architectural &amp; Build Services
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: '#64748B', lineHeight: 1.75 }}>
                    From raw plot acquisition to custom villa architecture, MDDA layout sanctions, structural construction, and smart interiors—executed under single point accountability.
                  </p>
                </div>
                <div style={{ marginTop: '1.75rem', paddingTop: '1.15rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.84rem', color: '#C5A059', fontWeight: 800 }}>
                  <CheckCircle2 size={16} /> In-House Civil Engineers &amp; Architects
                </div>
              </div>

              {/* Feature 5 */}
              <div 
                className="card-luxury hover-lift" 
                style={{ 
                  padding: '2.5rem', 
                  borderRadius: 22, 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: '#EBF4EC', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.4rem', border: '1px solid rgba(22, 101, 52, 0.2)' }}>
                    <HeartHandshake size={30} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>
                    NRI &amp; Outstation Concierge Support
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: '#64748B', lineHeight: 1.75 }}>
                    Remote video walkthroughs, digital documentation, Power of Attorney assistance, chauffeured valley inspection tours, and bank liaison for overseas Indians.
                  </p>
                </div>
                <div style={{ marginTop: '1.75rem', paddingTop: '1.15rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.84rem', color: '#166534', fontWeight: 800 }}>
                  <CheckCircle2 size={16} /> 450+ NRIs Successfully Settled
                </div>
              </div>

              {/* Feature 6 */}
              <div 
                className="card-luxury hover-lift" 
                style={{ 
                  padding: '2.5rem', 
                  borderRadius: 22, 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: 'rgba(197, 160, 89, 0.18)', color: '#C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.4rem', border: '1px solid rgba(197, 160, 89, 0.35)' }}>
                    <Award size={30} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>
                    Zero Hidden Costs &amp; Ethical Pricing
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: '#64748B', lineHeight: 1.75 }}>
                    Crystal clear fee structures, direct seller negotiations with no inflated middleman markups, and transparent breakdown of stamp duty and registry costs.
                  </p>
                </div>
                <div style={{ marginTop: '1.75rem', paddingTop: '1.15rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.84rem', color: '#C5A059', fontWeight: 800 }}>
                  <CheckCircle2 size={16} /> 4.9 / 5.0 Star Rated Trust Index
                </div>
              </div>

            </div>

            {/* Bottom Call to Action Banner inside Why Choose Us */}
            <div 
              className="card-luxury"
              style={{ 
                marginTop: '4.5rem', 
                backgroundColor: '#FFFFFF', 
                borderRadius: 24, 
                padding: '2.75rem 3rem', 
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 35px rgba(0,0,0,0.04)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '2rem'
              }}
            >
              <div style={{ maxWidth: 640 }}>
                <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.45rem', fontFamily: 'Outfit, sans-serif' }}>
                  Ready to Experience the A2 Realtors Advantage?
                </div>
                <p style={{ fontSize: '0.96rem', color: '#64748B', lineHeight: 1.6 }}>
                  Speak directly with our senior advisory team or visit our flagship office at Inder Road, Dalanwala.
                </p>
              </div>

              <div className="flex items-center gap-3.5 flex-wrap">
                <Link to="/contact" className="btn-green btn-pill hover-lift" style={{ padding: '0.9rem 2.1rem', fontSize: '0.96rem', fontWeight: 700 }}>
                  <span>Book Private Consultation</span>
                  <ArrowRight size={16} />
                </Link>
                <a href="tel:+918445190135" className="btn-outline-green btn-pill hover-lift" style={{ padding: '0.9rem 1.8rem', fontSize: '0.96rem', fontWeight: 700 }}>
                  <Phone size={15} /> +91 84451 90135
                </a>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 3. FLAGSHIP PARTNER TOWNSHIPS & APPROVED DEVELOPMENTS (INTERACTIVE SLIDER) */}
      {homepageSettings.showPartnerLogos && (
        <section 
          id="partner-townships"
          style={{ 
            background: 'radial-gradient(circle at 10% 15%, rgba(22, 101, 52, 0.05) 0%, transparent 45%), radial-gradient(circle at 90% 80%, rgba(197, 160, 89, 0.07) 0%, transparent 45%), #F8FAFC', 
            padding: '7rem 0', 
            borderTop: '1px solid #E2E8F0',
            borderBottom: '1px solid #E2E8F0',
            position: 'relative'
          }}
        >
          <div className="container">
            
            {/* Header & Controls Bar */}
            <div style={{ marginBottom: '3.5rem' }}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                
                {/* Title & Description */}
                <div style={{ maxWidth: 740 }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: '0.85rem' }}>
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
                      padding: '0.42rem 1.1rem', 
                      borderRadius: 999,
                      border: '1px solid rgba(22, 101, 52, 0.25)',
                      boxShadow: '0 2px 8px rgba(22, 101, 52, 0.08)'
                    }}>
                      <ShieldCheck size={14} style={{ color: '#166534' }} /> MDDA &amp; RERA Approved Townships
                    </span>
                  </div>

                  <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em', lineHeight: 1.25, fontFamily: 'Outfit, sans-serif' }}>
                    Dehradun’s Premier <span style={{ color: '#166534' }}>Approved Townships</span>
                  </h2>
                  
                  <p style={{ color: '#64748B', fontSize: '1.08rem', marginTop: '0.75rem', lineHeight: 1.7 }}>
                    Official advisory partner for the Doon Valley’s most prestigious gated communities. Verified master plans, underground utilities, and direct developer pricing with zero brokerage markups.
                  </p>
                </div>

                {/* Slider Quick Prev / Next Buttons */}
                <div className="flex items-center gap-3">
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#64748B', backgroundColor: '#FFFFFF', padding: '0.5rem 1rem', borderRadius: 999, border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
                    <span style={{ color: '#166534', fontWeight: 800 }}>
                      0{partnerActiveSlide + 1}
                    </span>
                    <span style={{ color: '#94A3B8', margin: '0 4px' }}>/</span>
                    <span>
                      0{partnerDevelopments.filter(p => partnerFilter === 'ALL' || p.belt === partnerFilter).length} Flagships
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handlePartnerScroll('left')}
                      disabled={!partnerCanScrollLeft}
                      aria-label="Previous Approved Property"
                      className="hover-lift"
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        backgroundColor: partnerCanScrollLeft ? '#FFFFFF' : '#F1F5F9',
                        color: partnerCanScrollLeft ? '#0F172A' : '#94A3B8',
                        border: partnerCanScrollLeft ? '1px solid #CBD5E1' : '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: partnerCanScrollLeft ? 'pointer' : 'not-allowed',
                        boxShadow: partnerCanScrollLeft ? '0 4px 12px rgba(0,0,0,0.06)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePartnerScroll('right')}
                      disabled={!partnerCanScrollRight}
                      aria-label="Next Approved Property"
                      className="hover-lift"
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        backgroundColor: partnerCanScrollRight ? '#166534' : '#F1F5F9',
                        color: partnerCanScrollRight ? '#FFFFFF' : '#94A3B8',
                        border: partnerCanScrollRight ? '1px solid #166534' : '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: partnerCanScrollRight ? 'pointer' : 'not-allowed',
                        boxShadow: partnerCanScrollRight ? '0 4px 14px rgba(22, 101, 52, 0.3)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

              </div>

              {/* Belt Filter Navigation Pills (Single Line + Mobile Horizontal Scroll) */}
              <div 
                className="flex items-center no-scrollbar" 
                style={{ 
                  marginTop: '2.25rem', 
                  gap: '0.45rem',
                  overflowX: 'auto',
                  flexWrap: 'nowrap',
                  whiteSpace: 'nowrap',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  paddingBottom: '0.35rem',
                  maxWidth: '100%'
                }}
              >
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
                    onClick={() => {
                      setPartnerFilter(filter.key);
                      if (partnerSliderRef.current) {
                        partnerSliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                      }
                    }}
                    className="hover-lift flex-shrink-0"
                    style={{
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                      padding: '0.55rem 1.15rem',
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
                      gap: '0.35rem'
                    }}
                  >
                    <span>{filter.label}</span>
                    <span style={{
                      backgroundColor: partnerFilter === filter.key ? 'rgba(255,255,255,0.22)' : '#F1F5F9',
                      color: partnerFilter === filter.key ? '#FFFFFF' : '#64748B',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.12rem 0.5rem',
                      borderRadius: 12
                    }}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* INTERACTIVE SLIDER VIEWPORT WITH FLOATING ARROWS */}
            <div style={{ position: 'relative' }}>
              
              {/* Floating Left Arrow */}
              {partnerCanScrollLeft && (
                <button
                  type="button"
                  onClick={() => handlePartnerScroll('left')}
                  aria-label="Scroll left"
                  className="hover-lift hidden md:flex"
                  style={{
                    position: 'absolute',
                    left: -20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    width: 46,
                    height: 46,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    color: '#0F172A',
                    border: '1px solid #CBD5E1',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    cursor: 'pointer'
                  }}
                >
                  <ChevronLeft size={22} />
                </button>
              )}

              {/* Floating Right Arrow */}
              {partnerCanScrollRight && (
                <button
                  type="button"
                  onClick={() => handlePartnerScroll('right')}
                  aria-label="Scroll right"
                  className="hover-lift hidden md:flex"
                  style={{
                    position: 'absolute',
                    right: -20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    width: 46,
                    height: 46,
                    borderRadius: '50%',
                    backgroundColor: '#166534',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(22, 101, 52, 0.35)',
                    cursor: 'pointer'
                  }}
                >
                  <ChevronRight size={22} />
                </button>
              )}

              {/* The Horizontal Slider Track */}
              <div
                ref={partnerSliderRef}
                style={{
                  display: 'flex',
                  gap: '1.75rem',
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  scrollBehavior: 'smooth',
                  padding: '0.75rem 0.25rem 2rem 0.25rem',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
                className="no-scrollbar"
              >
                {partnerDevelopments
                  .filter(p => partnerFilter === 'ALL' || p.belt === partnerFilter)
                  .map((project, pIndex) => {
                    const isLivePhoto = partnerImageMode[project.id] === 1;
                    const currentImg = isLivePhoto ? project.sitePhoto : project.coverImage;

                    return (
                      <div
                        key={project.id}
                        className="card-luxury hover-lift group flex flex-col"
                        style={{
                          flex: '0 0 auto',
                          width: 'calc((100% - 3.5rem) / 3)',
                          minWidth: '350px',
                          maxWidth: '430px',
                          scrollSnapAlign: 'start',
                          backgroundColor: '#FFFFFF',
                          borderRadius: 24,
                          border: '1px solid #E2E8F0',
                          overflow: 'hidden',
                          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
                          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#C5A059';
                          e.currentTarget.style.boxShadow = '0 24px 50px -10px rgba(15, 23, 42, 0.16)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#E2E8F0';
                          e.currentTarget.style.boxShadow = '0 10px 30px rgba(15, 23, 42, 0.06)';
                        }}
                      >
                        {/* 70% VISUAL FEATURE IMAGE HERO */}
                        <div style={{ position: 'relative', height: 410, overflow: 'hidden', backgroundColor: '#070C16' }}>
                          <img 
                            src={currentImg} 
                            alt={project.name} 
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover',
                              transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                            className="group-hover:scale-106"
                          />
                          
                          {/* Multi-Layered Atmospheric Dark Obsidian Gradient for Maximum Contrast */}
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(180deg, rgba(7,12,22,0.65) 0%, rgba(7,12,22,0.12) 35%, rgba(7,12,22,0.45) 60%, rgba(7,12,22,0.96) 100%)'
                          }} />

                          {/* Top Floating Glass Badges */}
                          <div className="flex items-center justify-between" style={{ position: 'absolute', top: 14, left: 14, right: 14, zIndex: 3 }}>
                            <span style={{
                              backgroundColor: 'rgba(22, 101, 52, 0.92)',
                              color: '#FFFFFF',
                              padding: '0.35rem 0.8rem',
                              borderRadius: 999,
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              letterSpacing: '0.04em',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 5,
                              backdropFilter: 'blur(8px)',
                              border: '1px solid rgba(74, 222, 128, 0.4)',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                            }}>
                              <ShieldCheck size={13} style={{ color: '#4ADE80' }} /> {project.approval}
                            </span>

                            {/* Real Site Photo Switcher */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setPartnerImageMode(prev => ({ ...prev, [project.id]: prev[project.id] === 1 ? 0 : 1 }));
                              }}
                              style={{
                                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                                backdropFilter: 'blur(8px)',
                                color: '#FFFFFF',
                                padding: '0.32rem 0.75rem',
                                borderRadius: 20,
                                fontSize: '0.68rem',
                                fontWeight: 700,
                                border: '1px solid rgba(255, 255, 255, 0.3)',
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
                              <span>{isLivePhoto ? 'Live Site' : 'Elevation'}</span>
                            </button>
                          </div>

                          {/* Bottom Hero Overlay on Image: Developer, Price, Title, Corridor */}
                          <div style={{ position: 'absolute', bottom: 16, left: 18, right: 18, zIndex: 3 }}>
                            {/* Line 1: Developer Name & Price Pill */}
                            <div className="flex items-center justify-between gap-2" style={{ marginBottom: 6 }}>
                              <div className="flex items-center gap-1.5 min-w-0" style={{ overflow: 'hidden' }}>
                                <BadgeCheck size={13} style={{ color: '#DFB76C', flexShrink: 0 }} />
                                <span style={{
                                  fontSize: '0.68rem',
                                  color: '#DFB76C',
                                  fontWeight: 800,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.06em',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}>
                                  by {project.developer}
                                </span>
                              </div>
                              <span style={{
                                backgroundColor: 'rgba(197, 160, 89, 0.25)',
                                color: '#DFB76C',
                                padding: '0.22rem 0.65rem',
                                borderRadius: 999,
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                border: '1px solid rgba(223, 183, 108, 0.5)',
                                backdropFilter: 'blur(8px)',
                                whiteSpace: 'nowrap',
                                flexShrink: 0
                              }}>
                                {project.priceGuide}
                              </span>
                            </div>

                            {/* Line 2: Project Title (Clean single-line Outfit bold) */}
                            <div style={{
                              fontSize: '1.4rem',
                              fontWeight: 800,
                              color: '#FFFFFF',
                              letterSpacing: '-0.02em',
                              fontFamily: 'Outfit, sans-serif',
                              textShadow: '0 2px 10px rgba(0,0,0,0.7)',
                              lineHeight: 1.25,
                              marginBottom: 8,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {project.name}
                            </div>

                            {/* Line 3: Corridor & Sanction Strip on Image */}
                            <div className="flex items-center gap-2" style={{ fontSize: '0.74rem' }}>
                              <span style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.16)',
                                backdropFilter: 'blur(8px)',
                                color: '#FFFFFF',
                                padding: '0.2rem 0.6rem',
                                borderRadius: 6,
                                fontWeight: 600,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 5,
                                whiteSpace: 'nowrap',
                                flexShrink: 0
                              }}>
                                <MapPin size={12} style={{ color: '#4ADE80' }} />
                                {project.belt === 'SAHASTRADHARA' ? 'Sahastradhara Belt' : project.belt === 'MUSSOORIE' ? 'Mussoorie Corridor' : project.belt === 'CANAL' ? 'Canal Road' : 'Prem Nagar / IMA'}
                              </span>
                              <span style={{
                                color: '#E2E8F0',
                                fontSize: '0.72rem',
                                fontWeight: 500,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}>
                                {project.type.split('&')[0]}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 30-40% COMPACT LUXURY INFORMATION BODY */}
                        <div style={{ padding: '1.25rem 1.4rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#FFFFFF' }}>
                          <div>
                            {/* Properly Aligned Location & Key Landmark */}
                            <div style={{ marginBottom: '0.85rem' }}>
                              <div className="flex items-center gap-1.5" style={{ color: '#0F172A', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.28rem' }}>
                                <MapPin size={14} style={{ color: '#166534', flexShrink: 0 }} />
                                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {project.location}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5" style={{ color: '#64748B', fontSize: '0.74rem', paddingLeft: 19 }}>
                                <Compass size={12} style={{ color: '#C5A059', flexShrink: 0 }} />
                                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {project.landmarks[0]}
                                </span>
                              </div>
                            </div>

                            {/* 3-Column Luxury Spec Grid */}
                            <div className="grid grid-cols-3 gap-2" style={{ marginBottom: '0.85rem' }}>
                              {project.specs.map((sp, sIdx) => (
                                <div key={sIdx} style={{ backgroundColor: '#F8FAFC', borderRadius: 8, padding: '0.5rem 0.35rem', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                                  <div style={{ fontSize: '0.62rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                    {sp.label}
                                  </div>
                                  <div style={{ fontSize: '0.8rem', color: '#0F172A', fontWeight: 800, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {sp.val}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Verified Highlight Badge */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.45rem 0.75rem',
                              backgroundColor: '#F0FDF4',
                              borderRadius: 8,
                              border: '1px solid #DCFCE7',
                              marginBottom: '0.9rem'
                            }}>
                              <CheckCircle2 size={14} style={{ color: '#166534', flexShrink: 0 }} />
                              <span style={{
                                fontSize: '0.76rem',
                                color: '#166534',
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}>
                                {project.highlights[0]}
                              </span>
                            </div>
                          </div>

                          {/* Action Links Deck with Refined Thin Gap */}
                          <div style={{ marginTop: 'auto', paddingTop: '0.45rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {/* Primary Button */}
                            <Link
                              to={`/search?q=${encodeURIComponent(project.searchQuery)}`}
                              className="btn-green hover-lift w-full flex items-center justify-center"
                              style={{
                                padding: '0.65rem 0.9rem',
                                fontSize: '0.84rem',
                                borderRadius: 10,
                                fontWeight: 800,
                                textDecoration: 'none',
                                gap: '0.35rem'
                              }}
                            >
                              <span>Explore Available Inventory</span>
                              <ArrowRight size={13} />
                            </Link>

                            {/* Secondary Buttons with Thin Gap */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedPartnerModal(project);
                                  setModalImageIndex(0);
                                }}
                                className="btn-outline-gray hover-lift flex items-center justify-center"
                                style={{
                                  padding: '0.48rem 0.55rem',
                                  fontSize: '0.76rem',
                                  borderRadius: 8,
                                  fontWeight: 700,
                                  color: '#0F172A',
                                  gap: '0.35rem'
                                }}
                              >
                                <Info size={13} style={{ color: '#166534' }} /> Dossier
                              </button>

                              <Link
                                to={`/contact?project=${encodeURIComponent(project.name)}`}
                                className="btn-outline-gray hover-lift flex items-center justify-center"
                                style={{
                                  padding: '0.48rem 0.55rem',
                                  fontSize: '0.76rem',
                                  borderRadius: 8,
                                  fontWeight: 700,
                                  color: '#166534',
                                  borderColor: '#166534',
                                  textDecoration: 'none',
                                  gap: '0.35rem'
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

              {/* Slider Pagination Dots Indicator */}
              <div className="flex items-center justify-center gap-2" style={{ marginTop: '1.5rem' }}>
                {partnerDevelopments
                  .filter(p => partnerFilter === 'ALL' || p.belt === partnerFilter)
                  .map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => scrollToPartnerProject(dotIdx)}
                      aria-label={`Scroll to project ${dotIdx + 1}`}
                      style={{
                        width: partnerActiveSlide === dotIdx ? 24 : 8,
                        height: 8,
                        borderRadius: 999,
                        backgroundColor: partnerActiveSlide === dotIdx ? '#166534' : '#CBD5E1',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  ))}
              </div>

            </div>

            {/* Bottom Advisory Assurance Bar */}
            <div 
              className="card-luxury hover-lift"
              style={{ 
                marginTop: '4rem', 
                backgroundColor: '#FFFFFF', 
                borderRadius: 22, 
                padding: '2rem 2.5rem', 
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
                <div style={{ width: 52, height: 52, borderRadius: 15, backgroundColor: '#EBF4EC', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(22, 101, 52, 0.2)' }}>
                  <Award size={28} />
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit, sans-serif' }}>
                    A2 Realtors Direct Developer Advisory Guarantee
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#64748B', marginTop: 2 }}>
                    Zero markup on developer pricing • 100% verified mutation records • On-site project escort by certified senior consultants
                  </div>
                </div>
              </div>

              <div className="flex items-center" style={{ gap: '0.45rem', flexWrap: 'wrap' }}>
                <a 
                  href="tel:+918445190135" 
                  className="btn-outline-gray hover-lift flex items-center"
                  style={{ padding: '0.65rem 1.25rem', borderRadius: 12, fontSize: '0.86rem', fontWeight: 700, gap: '0.35rem' }}
                >
                  <Phone size={14} style={{ color: '#166534' }} /> +91 84451 90135
                </a>
                <Link
                  to="/contact"
                  className="btn-green hover-lift flex items-center"
                  style={{ padding: '0.65rem 1.25rem', borderRadius: 12, fontSize: '0.86rem', fontWeight: 700, textDecoration: 'none', gap: '0.35rem' }}
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
                backgroundColor: 'rgba(7, 12, 22, 0.85)',
                backdropFilter: 'blur(10px)',
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
                  borderRadius: 26,
                  maxWidth: 880,
                  width: '100%',
                  maxHeight: '92vh',
                  overflowY: 'auto',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                  border: '1px solid #1E2E4F',
                  position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header Cover with Multi-Image Tab Selector */}
                <div style={{ position: 'relative', height: 280, backgroundColor: '#070C16', overflow: 'hidden' }}>
                  <img 
                    src={selectedPartnerModal.gallery[modalImageIndex]?.url || selectedPartnerModal.coverImage} 
                    alt={selectedPartnerModal.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(7,12,22,0.98) 0%, rgba(7,12,22,0.5) 60%, rgba(0,0,0,0.6) 100%)'
                  }} />

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedPartnerModal(null)}
                    style={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      zIndex: 10,
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                  >
                    <X size={20} />
                  </button>

                  {/* Gallery Image Tabs on Top of Modal Header */}
                  <div style={{ position: 'absolute', top: 16, left: 20, display: 'flex', gap: 6, zIndex: 10 }}>
                    {selectedPartnerModal.gallery.map((gItem: any, gIdx: number) => (
                      <button
                        key={gIdx}
                        type="button"
                        onClick={() => setModalImageIndex(gIdx)}
                        style={{
                          backgroundColor: modalImageIndex === gIdx ? '#166534' : 'rgba(15, 23, 42, 0.8)',
                          backdropFilter: 'blur(8px)',
                          color: '#FFFFFF',
                          padding: '0.4rem 0.85rem',
                          borderRadius: 20,
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          border: modalImageIndex === gIdx ? '1px solid #4ADE80' : '1px solid rgba(255, 255, 255, 0.25)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        <Camera size={12} style={{ color: modalImageIndex === gIdx ? '#4ADE80' : '#DFB76C' }} />
                        <span>{gItem.type}</span>
                      </button>
                    ))}
                  </div>

                  {/* Bottom Header Details */}
                  <div style={{ position: 'absolute', bottom: 20, left: 26, right: 26 }}>
                    <div className="flex items-center gap-2.5" style={{ marginBottom: 6, flexWrap: 'wrap' }}>
                      <span style={{ backgroundColor: '#DFB76C', color: '#0F172A', padding: '0.25rem 0.75rem', borderRadius: 6, fontSize: '0.74rem', fontWeight: 800 }}>
                        {selectedPartnerModal.approval}
                      </span>
                      <span style={{ color: '#E2E8F0', fontSize: '0.84rem', fontWeight: 600 }}>
                        by {selectedPartnerModal.developer}
                      </span>
                      <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>
                        • {selectedPartnerModal.officialSource}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'Outfit, sans-serif' }}>
                      {selectedPartnerModal.name}
                    </h3>
                  </div>
                </div>

                {/* Modal Body */}
                <div style={{ padding: '2.5rem' }}>
                  
                  {/* Quick Stat Pill Bar */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ marginBottom: '2rem' }}>
                    <div style={{ padding: '0.95rem', backgroundColor: '#F8FAFC', borderRadius: 14, border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Pricing Guide</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#166534', marginTop: 2, fontFamily: 'Outfit' }}>{selectedPartnerModal.priceGuide}</div>
                    </div>
                    <div style={{ padding: '0.95rem', backgroundColor: '#F8FAFC', borderRadius: 14, border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Project Scale</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginTop: 2 }}>{selectedPartnerModal.scale}</div>
                    </div>
                    <div style={{ padding: '0.95rem', backgroundColor: '#F8FAFC', borderRadius: 14, border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Typology</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', marginTop: 2 }} className="truncate">{selectedPartnerModal.type}</div>
                    </div>
                    <div style={{ padding: '0.95rem', backgroundColor: '#F8FAFC', borderRadius: 14, border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>RERA / Sanction</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', marginTop: 2 }} className="truncate">{selectedPartnerModal.reraNumber}</div>
                    </div>
                  </div>

                  {/* Overview Paragraph */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>
                      Township Dossier &amp; Overview
                    </h4>
                    <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.8 }}>
                      {selectedPartnerModal.description}
                    </p>
                  </div>

                  {/* Two Columns: Highlights & Landmarks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '2.25rem' }}>
                    
                    {/* Key Master Plan Highlights */}
                    <div style={{ padding: '1.5rem', backgroundColor: '#F0FDF4', borderRadius: 18, border: '1px solid #DCFCE7' }}>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#166534', marginBottom: '0.95rem', display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'Outfit, sans-serif' }}>
                        <ShieldCheck size={18} /> Key Infrastructure &amp; Approvals
                      </div>
                      <div className="flex flex-col gap-2.5">
                        {selectedPartnerModal.highlights.map((h: string, i: number) => (
                          <div key={i} className="flex items-start gap-2" style={{ fontSize: '0.86rem', color: '#14532D', lineHeight: 1.5 }}>
                            <Check size={14} style={{ color: '#166534', marginTop: 3, flexShrink: 0 }} />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Proximity & Distances */}
                    <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', borderRadius: 18, border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.95rem', display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'Outfit, sans-serif' }}>
                        <Compass size={18} style={{ color: '#C5A059' }} /> Connectivity &amp; Key Landmarks
                      </div>
                      <div className="flex flex-col gap-2.5">
                        {selectedPartnerModal.landmarks.map((l: string, i: number) => (
                          <div key={i} className="flex items-start gap-2" style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5 }}>
                            <MapPin size={14} style={{ color: '#C5A059', marginTop: 3, flexShrink: 0 }} />
                            <span>{l}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between gap-3 flex-wrap" style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.75rem' }}>
                    <a
                      href="tel:+918445190135"
                      className="btn-outline-gray hover-lift flex items-center gap-2"
                      style={{ padding: '0.75rem 1.4rem', borderRadius: 12, fontWeight: 700 }}
                    >
                      <Phone size={15} style={{ color: '#166534' }} /> Call Senior Advisor (+91 84451 90135)
                    </a>

                    <div className="flex items-center gap-2.5">
                      <Link
                        to={`/contact?project=${encodeURIComponent(selectedPartnerModal.name)}`}
                        onClick={() => setSelectedPartnerModal(null)}
                        className="btn-outline-gray hover-lift flex items-center gap-2"
                        style={{ padding: '0.75rem 1.4rem', borderRadius: 12, fontWeight: 700, color: '#166534', borderColor: '#166534', textDecoration: 'none' }}
                      >
                        <Calendar size={15} /> Book Private Tour
                      </Link>

                      <Link
                        to={`/search?q=${encodeURIComponent(selectedPartnerModal.searchQuery)}`}
                        onClick={() => setSelectedPartnerModal(null)}
                        className="btn-green hover-lift flex items-center gap-2"
                        style={{ padding: '0.75rem 1.75rem', borderRadius: 12, fontWeight: 700, textDecoration: 'none' }}
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
        <section style={{ padding: '7rem 0', backgroundColor: '#FFFFFF', position: 'relative' }}>
          <div className="container">
            
            <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 4rem auto' }}>
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
                  padding: '0.42rem 1.1rem',
                  borderRadius: 999,
                  border: '1px solid rgba(22, 101, 52, 0.25)',
                  boxShadow: '0 2px 8px rgba(22, 101, 52, 0.08)'
                }}>
                  <Building2 size={13} style={{ color: '#166534' }} /> Curated Valley Portfolios
                </span>
              </div>

              <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em', lineHeight: 1.25, fontFamily: 'Outfit, sans-serif' }}>
                {homepageSettings.categoriesTitle || 'Explore by Property Category'}
              </h2>
              <p style={{ color: '#64748B', fontSize: '1.08rem', marginTop: '0.85rem', lineHeight: 1.75 }}>
                Select your preferred asset class to view verified inventory with high capital appreciation potential across Dehradun.
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
                  className="card-luxury hover-lift group"
                  style={{
                    padding: '2.25rem 1.35rem',
                    borderRadius: 24,
                    cursor: 'pointer',
                    textAlign: 'center',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 4px 18px rgba(15, 23, 42, 0.03)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C5A059';
                    e.currentTarget.style.boxShadow = '0 16px 36px -8px rgba(15, 23, 42, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.boxShadow = '0 4px 18px rgba(15, 23, 42, 0.03)';
                  }}
                >
                  <div 
                    style={{
                      width: 62,
                      height: 62,
                      borderRadius: 20,
                      backgroundColor: '#EBF4EC',
                      color: '#166534',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                      transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      border: '1px solid rgba(22, 101, 52, 0.2)',
                      boxShadow: '0 4px 12px rgba(22, 101, 52, 0.1)'
                    }}
                    className="group-hover:scale-110"
                  >
                    <cat.icon size={28} />
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: 5, fontFamily: 'Outfit, sans-serif' }}>
                    {cat.name}
                  </h3>
                  
                  <div style={{ 
                    fontSize: '0.76rem', 
                    color: '#166534', 
                    fontWeight: 800, 
                    marginBottom: 6,
                    backgroundColor: '#EBF4EC',
                    padding: '0.15rem 0.65rem',
                    borderRadius: 999
                  }}>
                    {cat.count}
                  </div>

                  <div style={{ fontSize: '0.74rem', color: '#64748B', lineHeight: 1.45 }}>
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
        <section style={{ padding: '7rem 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
          <div className="container">
            
            <div className="flex flex-wrap items-end justify-between gap-6" style={{ marginBottom: '3.75rem' }}>
              <div>
                <div className="flex items-center gap-2" style={{ marginBottom: '0.85rem' }}>
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
                    padding: '0.42rem 1.1rem',
                    borderRadius: 999,
                    border: '1px solid rgba(22, 101, 52, 0.25)',
                    boxShadow: '0 2px 8px rgba(22, 101, 52, 0.08)'
                  }}>
                    <Sparkles size={14} style={{ color: '#166534' }} /> Verified Mandates
                  </span>
                </div>

                <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em', lineHeight: 1.25, fontFamily: 'Outfit, sans-serif' }}>
                  {homepageSettings.popularPropertiesTitle || 'Best Properties For Sale in Dehradun'}
                </h2>
                <p style={{ color: '#64748B', fontSize: '1.08rem', marginTop: '0.75rem', lineHeight: 1.7 }}>
                  Hand-picked exclusive villas, penthouses, and prime plots with 100% clear title deeds.
                </p>
              </div>

              {/* Filter Tabs (Single Line + Mobile Horizontal Scroll) */}
              <div 
                className="flex gap-2 no-scrollbar" 
                style={{ 
                  overflowX: 'auto', 
                  flexWrap: 'nowrap', 
                  whiteSpace: 'nowrap', 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none', 
                  WebkitOverflowScrolling: 'touch',
                  paddingBottom: '0.25rem',
                  maxWidth: '100%'
                }}
              >
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
                    className="hover-lift flex-shrink-0"
                    style={{
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                      padding: '0.55rem 1.25rem',
                      borderRadius: 999,
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      border: activePropertyTab === tab.id ? '1px solid #166534' : '1px solid #E2E8F0',
                      backgroundColor: activePropertyTab === tab.id ? '#166534' : '#FFFFFF',
                      color: activePropertyTab === tab.id ? '#FFFFFF' : '#475569',
                      boxShadow: activePropertyTab === tab.id ? '0 6px 18px rgba(22, 101, 52, 0.25)' : '0 1px 4px rgba(0,0,0,0.03)'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Cards Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 ${gridColsClass} gap-7`}>
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* View All Properties Bottom CTA */}
            <div style={{ textAlign: 'center', marginTop: '4.75rem' }}>
              <button
                onClick={() => navigate('/search')}
                className="btn-green btn-pill hover-lift"
                style={{ padding: '0.95rem 2.8rem', fontSize: '1.02rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 24px rgba(22, 101, 52, 0.28)' }}
              >
                <span>View All 80+ Verified Properties</span>
                <ArrowRight size={18} style={{ color: '#DFB76C' }} />
              </button>
            </div>

          </div>
        </section>
      )}

      {/* 7. INTERACTIVE MORTGAGE & EMI CALCULATOR */}
      <EMICalculator />

      {/* 8. WHAT WE DO: BESPOKE REAL ESTATE & CONSTRUCTION SERVICES */}
      {homepageSettings.showWhatWeDo && (
        <section style={{ padding: '7rem 0', backgroundColor: '#070C16', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
          
          {/* Ambient Glow */}
          <div 
            style={{
              position: 'absolute',
              top: '20%',
              right: '-10%',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(197, 160, 89, 0.16) 0%, transparent 70%)',
              filter: 'blur(55px)',
              pointerEvents: 'none'
            }}
          />

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            
            <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 4.5rem auto' }}>
              <div className="flex items-center justify-center gap-2" style={{ marginBottom: '1rem' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  backgroundColor: 'rgba(56, 102, 53, 0.3)',
                  color: '#4ADE80',
                  padding: '0.42rem 1.1rem',
                  borderRadius: 999,
                  border: '1px solid rgba(74, 222, 128, 0.3)'
                }}>
                  <Hammer size={14} style={{ color: '#DFB76C' }} /> Comprehensive Real Estate Architecture
                </span>
              </div>

              <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.025em', lineHeight: 1.25, fontFamily: 'Outfit, sans-serif' }}>
                End-to-End Real Estate &amp; Architectural Solutions
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '1.08rem', marginTop: '0.85rem', lineHeight: 1.75 }}>
                From legal due diligence and land acquisition to bespoke turnkey villa construction, we handle every phase under unified accountability.
              </p>
            </div>

            {/* 4 Feature Cards with Numbering */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div 
                className="card-luxury hover-lift group" 
                style={{ 
                  padding: '2.5rem 2rem', 
                  borderRadius: 24, 
                  position: 'relative', 
                  backgroundColor: '#111A2E', 
                  border: '1px solid #1E2E4F', 
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C5A059';
                  e.currentTarget.style.boxShadow = '0 20px 45px rgba(0,0,0,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#1E2E4F';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '2.5rem', fontWeight: 800, color: 'rgba(197, 160, 89, 0.18)', fontFamily: 'Outfit' }}>01</div>
                  <div style={{ width: 54, height: 54, borderRadius: 16, backgroundColor: 'rgba(56,102,53,0.3)', color: '#4ADE80', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(74,222,128,0.35)' }}>
                    <Home size={26} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>Residential Advisory</h3>
                  <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    Curated luxury bungalows, mountain-facing apartments, and independent kothis in Dehradun’s most prestigious corridors.
                  </p>
                </div>
                <Link to="/search" style={{ color: '#DFB76C', fontSize: '0.88rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span>Browse Homes</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div 
                className="card-luxury hover-lift group" 
                style={{ 
                  padding: '2.5rem 2rem', 
                  borderRadius: 24, 
                  position: 'relative', 
                  backgroundColor: '#111A2E', 
                  border: '1px solid #1E2E4F', 
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C5A059';
                  e.currentTarget.style.boxShadow = '0 20px 45px rgba(0,0,0,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#1E2E4F';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '2.5rem', fontWeight: 800, color: 'rgba(197, 160, 89, 0.18)', fontFamily: 'Outfit' }}>02</div>
                  <div style={{ width: 54, height: 54, borderRadius: 16, backgroundColor: 'rgba(197,160,89,0.25)', color: '#DFB76C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(197,160,89,0.4)' }}>
                    <Hammer size={26} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>Turnkey Construction</h3>
                  <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    Architectural planning, MDDA sanction drawings, RCC construction, and luxury interior finishing under single contract.
                  </p>
                </div>
                <Link to="/construction" style={{ color: '#DFB76C', fontSize: '0.88rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span>Build With Us</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div 
                className="card-luxury hover-lift group" 
                style={{ 
                  padding: '2.5rem 2rem', 
                  borderRadius: 24, 
                  position: 'relative', 
                  backgroundColor: '#111A2E', 
                  border: '1px solid #1E2E4F', 
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C5A059';
                  e.currentTarget.style.boxShadow = '0 20px 45px rgba(0,0,0,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#1E2E4F';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '2.5rem', fontWeight: 800, color: 'rgba(197, 160, 89, 0.18)', fontFamily: 'Outfit' }}>03</div>
                  <div style={{ width: 54, height: 54, borderRadius: 16, backgroundColor: 'rgba(56,102,53,0.3)', color: '#4ADE80', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(74,222,128,0.35)' }}>
                    <FileCheck size={26} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>Title &amp; Due Diligence</h3>
                  <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    Comprehensive 30-year search report, mutation check, registry drafting, and hassle-free bank loan liaison.
                  </p>
                </div>
                <Link to="/about" style={{ color: '#DFB76C', fontSize: '0.88rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span>Learn More</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div 
                className="card-luxury hover-lift group" 
                style={{ 
                  padding: '2.5rem 2rem', 
                  borderRadius: 24, 
                  position: 'relative', 
                  backgroundColor: '#111A2E', 
                  border: '1px solid #1E2E4F', 
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C5A059';
                  e.currentTarget.style.boxShadow = '0 20px 45px rgba(0,0,0,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#1E2E4F';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '2.5rem', fontWeight: 800, color: 'rgba(197, 160, 89, 0.18)', fontFamily: 'Outfit' }}>04</div>
                  <div style={{ width: 54, height: 54, borderRadius: 16, backgroundColor: 'rgba(197,160,89,0.25)', color: '#DFB76C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(197,160,89,0.4)' }}>
                    <Briefcase size={26} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>NRI &amp; Owner Management</h3>
                  <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    Dedicated property caretakers, tenant screening, lease agreements, and fast asset resale for overseas property owners.
                  </p>
                </div>
                <Link to="/sell" style={{ color: '#DFB76C', fontSize: '0.88rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span>List With Us</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* 9. TESTIMONIALS & CLIENT REVIEWS */}
      {homepageSettings.showTestimonials && (
        <section style={{ padding: '7rem 0', backgroundColor: '#FFFFFF' }}>
          <div className="container">
            
            <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 4.5rem auto' }}>
              <div className="flex items-center justify-center gap-2" style={{ marginBottom: '1rem' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  backgroundColor: '#FFFBEB',
                  color: '#B45309',
                  padding: '0.42rem 1.1rem',
                  borderRadius: 999,
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.08)'
                }}>
                  <Star size={14} fill="#F59E0B" style={{ color: '#F59E0B' }} /> Client Testimonials &amp; Track Record
                </span>
              </div>

              <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em', lineHeight: 1.25, fontFamily: 'Outfit, sans-serif' }}>
                Trusted by 1,850+ Homeowners &amp; Investors
              </h2>
              <p style={{ color: '#64748B', fontSize: '1.08rem', marginTop: '0.85rem', lineHeight: 1.75 }}>
                Hear directly from buyers and NRI families who acquired mountain estates and prime investments through A2 Realtors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="card-luxury hover-lift"
                  style={{
                    padding: '2.75rem 2.25rem',
                    borderRadius: 24,
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 4px 18px rgba(15, 23, 42, 0.03)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#166534';
                    e.currentTarget.style.boxShadow = '0 16px 36px -8px rgba(15, 23, 42, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.boxShadow = '0 4px 18px rgba(15, 23, 42, 0.03)';
                  }}
                >
                  <div>
                    {/* 5 Stars */}
                    <div className="flex gap-1" style={{ color: '#F59E0B', marginBottom: '1.4rem' }}>
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={17} fill="#F59E0B" />
                      ))}
                    </div>

                    <p style={{ fontSize: '0.98rem', color: '#334155', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '2rem' }}>
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Author Profile */}
                  <div className="flex items-center gap-4" style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem' }}>
                    <img
                      src={item.avatar}
                      alt={item.name}
                      style={{ width: 54, height: 54, borderRadius: '50%', objectFit: 'cover', border: '2px solid #166534', boxShadow: '0 4px 10px rgba(22, 101, 52, 0.2)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.02rem', color: '#0F172A', fontFamily: 'Outfit, sans-serif' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600, marginTop: 2 }}>
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
        <section style={{ padding: '7rem 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
          <div className="container">
            
            <div 
              style={{
                position: 'relative',
                borderRadius: 28,
                overflow: 'hidden',
                backgroundImage: 'linear-gradient(135deg, rgba(7,12,22,0.96) 0%, rgba(7,12,22,0.85) 45%, rgba(7,12,22,0.95) 100%), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '5rem 4rem',
                boxShadow: '0 30px 70px rgba(0,0,0,0.3)',
                border: '1px solid #1E2E4F'
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column: VIP Tour Value Proposition (7 Cols) */}
                <div className="lg:col-span-7" style={{ color: '#FFFFFF' }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: '1.25rem' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 7,
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      backgroundColor: 'rgba(197, 160, 89, 0.22)',
                      color: '#DFB76C',
                      padding: '0.42rem 1.1rem',
                      borderRadius: 999,
                      border: '1px solid rgba(197, 160, 89, 0.45)'
                    }}>
                      <Award size={14} style={{ color: '#DFB76C' }} /> White-Glove VIP Service
                    </span>
                  </div>

                  <h3 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25, marginBottom: '1.35rem', fontFamily: 'Outfit, sans-serif' }}>
                    Experience Dehradun’s Premier Properties in Absolute Comfort
                  </h3>

                  <p style={{ color: '#CBD5E1', fontSize: '1.08rem', lineHeight: 1.75, maxWidth: 580, marginBottom: '2.75rem' }}>
                    Eliminate the frustration of unverified listings and difficult mountain navigation. Our senior partners curate tailored property shortlists and arrange private site inspections with forensic legal documentation.
                  </p>

                  {/* 4 Pillars of VIP Tour */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" style={{ maxWidth: 640 }}>
                    <div className="flex items-start gap-3.5">
                      <div style={{ width: 42, height: 42, borderRadius: 13, backgroundColor: 'rgba(56, 102, 53, 0.35)', color: '#4ADE80', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(74, 222, 128, 0.3)' }}>
                        <Compass size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'Outfit, sans-serif' }}>Chauffeured Pickup</div>
                        <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: 3, lineHeight: 1.5 }}>Airport (Jolly Grant), hotel, or residence transport in AC comfort.</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div style={{ width: 42, height: 42, borderRadius: 13, backgroundColor: 'rgba(197, 160, 89, 0.25)', color: '#DFB76C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(197, 160, 89, 0.4)' }}>
                        <FileCheck size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'Outfit, sans-serif' }}>Advance Legal Dossier</div>
                        <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: 3, lineHeight: 1.5 }}>30-yr title abstracts and MDDA master plan compliance provided upfront.</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div style={{ width: 42, height: 42, borderRadius: 13, backgroundColor: 'rgba(56, 102, 53, 0.35)', color: '#4ADE80', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(74, 222, 128, 0.3)' }}>
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'Outfit, sans-serif' }}>Direct Mandate Pricing</div>
                        <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: 3, lineHeight: 1.5 }}>Zero broker markups; transparent negotiations directly with owners.</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div style={{ width: 42, height: 42, borderRadius: 13, backgroundColor: 'rgba(197, 160, 89, 0.25)', color: '#DFB76C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(197, 160, 89, 0.4)' }}>
                        <HeartHandshake size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'Outfit, sans-serif' }}>Zero-Pressure Guidance</div>
                        <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: 3, lineHeight: 1.5 }}>Fiduciary market advisory focused entirely on your lifestyle goals.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: High-Conversion Booking Card (5 Cols) */}
                <div className="lg:col-span-5">
                  <div 
                    className="card-luxury"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                      padding: '2.75rem', 
                      borderRadius: 26,
                      boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
                      border: '1px solid rgba(255, 255, 255, 0.9)' 
                    }}
                  >
                    
                    <h4 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', lineHeight: 1.3, fontFamily: 'Outfit, sans-serif' }}>
                      {homepageSettings.contactTitle || "Book Guided Valley Property Tour"}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                      Shortlist properties matching your exact criteria and schedule a private escorted visit with our senior director.
                    </p>

                    {formSubmitted ? (
                      <div style={{ textAlign: 'center', padding: '3rem 1.5rem', backgroundColor: '#EBF4EC', borderRadius: 18, border: '1px solid rgba(22, 101, 52, 0.25)' }}>
                        <CheckCircle2 size={52} style={{ color: '#166534', margin: '0 auto 0.85rem auto' }} />
                        <strong style={{ display: 'block', fontSize: '1.3rem', color: '#0F172A', fontFamily: 'Outfit, sans-serif' }}>Tour Confirmed!</strong>
                        <p style={{ fontSize: '0.92rem', color: '#475569', marginTop: 8, maxWidth: 320, margin: '8px auto 0 auto', lineHeight: 1.6 }}>
                          Our senior consultant will contact you on <strong>{formPhone}</strong> to confirm your vehicle schedule.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit}>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                          <div className="form-group" style={{ margin: 0 }}>
                            <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>Full Name *</label>
                            <input 
                              type="text" 
                              required 
                              placeholder="Your Name" 
                              value={formName} 
                              onChange={(e) => setFormName(e.target.value)} 
                              className="form-input" 
                              style={{ padding: '0.75rem 0.95rem', fontSize: '0.9rem', borderRadius: 12, borderColor: '#CBD5E1' }} 
                            />
                          </div>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>Phone Number *</label>
                            <input 
                              type="tel" 
                              required 
                              placeholder="+91 98970 00000" 
                              value={formPhone} 
                              onChange={(e) => setFormPhone(e.target.value)} 
                              className="form-input" 
                              style={{ padding: '0.75rem 0.95rem', fontSize: '0.9rem', borderRadius: 12, borderColor: '#CBD5E1' }} 
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5" style={{ marginTop: '0.95rem' }}>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>Email Address</label>
                            <input 
                              type="email" 
                              placeholder="name@email.com" 
                              value={formEmail} 
                              onChange={(e) => setFormEmail(e.target.value)} 
                              className="form-input" 
                              style={{ padding: '0.75rem 0.95rem', fontSize: '0.9rem', borderRadius: 12, borderColor: '#CBD5E1' }} 
                            />
                          </div>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>Preferred Date</label>
                            <input 
                              type="date" 
                              value={formDate} 
                              onChange={(e) => setFormDate(e.target.value)} 
                              className="form-input" 
                              style={{ padding: '0.75rem 0.95rem', fontSize: '0.9rem', borderRadius: 12, borderColor: '#CBD5E1' }} 
                            />
                          </div>
                        </div>

                        <div className="form-group" style={{ marginTop: '0.95rem' }}>
                          <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>Property Typology</label>
                          <select
                            value={formCategory}
                            onChange={(e) => setFormCategory(e.target.value)}
                            className="form-select"
                            style={{ padding: '0.75rem 0.95rem', fontSize: '0.9rem', borderRadius: 12, borderColor: '#CBD5E1' }}
                          >
                            <option value="Buy Luxury Villa / Kothi">Buy Luxury Villa / Kothi</option>
                            <option value="Buy Apartment / Penthouse">Buy Apartment / Penthouse</option>
                            <option value="Buy Residential Plot">Buy Residential Plot</option>
                            <option value="Commercial Space / Investment">Commercial Space / Investment</option>
                            <option value="Turnkey Construction / Renovation">Turnkey Construction / Renovation</option>
                            <option value="Sell / Rent My Property">Sell / Rent My Property</option>
                          </select>
                        </div>

                        <div className="form-group" style={{ marginTop: '0.95rem', marginBottom: '1.5rem' }}>
                          <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>Specific Requirements / Note</label>
                          <textarea 
                            rows={2} 
                            placeholder="e.g. Looking for 4BHK with valley view near Dalanwala or Rajpur Road..." 
                            value={formMessage} 
                            onChange={(e) => setFormMessage(e.target.value)} 
                            className="form-textarea" 
                            style={{ padding: '0.75rem 0.95rem', fontSize: '0.9rem', borderRadius: 12, borderColor: '#CBD5E1' }} 
                          />
                        </div>

                        <button 
                          type="submit" 
                          className="btn-green hover-lift w-full" 
                          style={{ width: '100%', borderRadius: 14, padding: '0.96rem', fontSize: '1rem', fontWeight: 800, backgroundColor: '#166534', boxShadow: '0 8px 24px rgba(22, 101, 52, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                        >
                          <span>Confirm Chauffeured Tour Request</span>
                          <ArrowRight size={18} style={{ color: '#DFB76C' }} />
                        </button>

                      </form>
                    )}

                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>
      )}

      {/* 11. HELPFUL REAL ESTATE ARTICLES & MARKET INSIGHTS */}
      {homepageSettings.showLatestArticles && (
        <section style={{ padding: '7rem 0', backgroundColor: '#FFFFFF' }}>
          <div className="container">
            
            <div className="flex flex-wrap items-center justify-between gap-4" style={{ marginBottom: '3.75rem' }}>
              <div>
                <div className="flex items-center gap-2" style={{ marginBottom: '0.85rem' }}>
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
                    padding: '0.42rem 1.1rem',
                    borderRadius: 999,
                    border: '1px solid rgba(22, 101, 52, 0.25)',
                    boxShadow: '0 2px 8px rgba(22, 101, 52, 0.08)'
                  }}>
                    <FileText size={14} style={{ color: '#166534' }} /> Market Research &amp; Advisory
                  </span>
                </div>

                <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em', lineHeight: 1.25, fontFamily: 'Outfit, sans-serif' }}>
                  {homepageSettings.articlesTitle || 'Market Reports & Buying Guides'}
                </h2>
                <p style={{ color: '#64748B', fontSize: '1.08rem', marginTop: '0.65rem', lineHeight: 1.7 }}>
                  Expert insights on property registry laws, locality appreciation, and investment strategies in Uttarakhand.
                </p>
              </div>
              <Link 
                to="/insights" 
                className="btn-green hover-lift group flex items-center" 
                style={{ 
                  padding: '0.65rem 0.75rem 0.65rem 1.4rem', 
                  borderRadius: 999, 
                  fontSize: '0.88rem', 
                  fontWeight: 700, 
                  gap: '0.65rem',
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(22, 101, 52, 0.25)',
                  border: 'none'
                }}
              >
                <span>Explore All Articles</span>
                <span style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.25s ease'
                }} className="group-hover:translate-x-0.5">
                  <ArrowRight size={14} style={{ color: '#FFFFFF' }} />
                </span>
              </Link>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post) => (
                <div 
                  key={post.id} 
                  className="card-luxury hover-lift group flex flex-col" 
                  style={{ 
                    borderRadius: 24, 
                    overflow: 'hidden', 
                    border: '1px solid #E2E8F0',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 4px 18px rgba(15, 23, 42, 0.03)',
                    backgroundColor: '#FFFFFF'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#166534';
                    e.currentTarget.style.boxShadow = '0 16px 36px -8px rgba(15, 23, 42, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.boxShadow = '0 4px 18px rgba(15, 23, 42, 0.03)';
                  }}
                >
                  <div style={{ height: 240, overflow: 'hidden', position: 'relative', backgroundColor: '#0B1120' }}>
                    <img 
                      src={post.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'} 
                      alt={post.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)' }}
                      className="group-hover:scale-106"
                    />
                  </div>

                  <div style={{ padding: '1.85rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div className="flex items-center gap-2" style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 700, marginBottom: '0.75rem' }}>
                      <span className="badge badge-verified" style={{ fontSize: '0.72rem', padding: '0.2rem 0.65rem' }}>{post.category}</span>
                      <span>• {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.4, marginBottom: '0.85rem', fontFamily: 'Outfit, sans-serif' }}>
                      <Link to="/insights" style={{ color: 'inherit' }}>
                        {post.title}
                      </Link>
                    </h3>

                    <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between" style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid #F1F5F9' }}>
                      <span style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>By {post.author}</span>
                      <Link to="/insights" style={{ color: '#166534', fontWeight: 700, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span>Read Guide</span>
                        <ArrowRight size={14} />
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
