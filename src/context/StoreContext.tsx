import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Property,
  Lead,
  Owner,
  Customer,
  SiteVisit,
  FollowUpTask,
  Deal,
  MarketingCampaign,
  BlogPost,
  ConstructionProject,
  LocationInfo,
  UserProfile,
  UserRole,
  LeadStatus,
  DealStage
} from '../types';
import {
  initialProperties,
  initialLeads,
  initialOwners,
  initialCustomers,
  initialSiteVisits,
  initialFollowUps,
  initialDeals,
  initialCampaigns,
  initialBlogPosts,
  initialProjects,
  initialLocations,
  initialStaff
} from '../db/seedData';

interface StoreContextType {
  properties: Property[];
  leads: Lead[];
  owners: Owner[];
  customers: Customer[];
  siteVisits: SiteVisit[];
  followUps: FollowUpTask[];
  deals: Deal[];
  campaigns: MarketingCampaign[];
  blogPosts: BlogPost[];
  projects: ConstructionProject[];
  locations: LocationInfo[];
  staff: UserProfile[];
  
  activeUser: UserProfile;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  
  // Login Authentication for Private CRM
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => boolean;
  logout: () => void;
  
  favorites: string[];
  toggleFavorite: (propertyId: string) => void;
  compareList: string[];
  toggleCompare: (propertyId: string) => void;
  clearCompare: () => void;
  
  // Public form submissions
  submitPropertyEnquiry: (data: { propertyId: string; name: string; phone: string; email?: string; requirement?: string }) => void;
  submitOwnerPropertyListing: (data: { ownerName: string; phone: string; email?: string; propertyType: any; location: string; areaSqft: number; expectedPrice: number; description: string }) => void;
  submitGeneralContact: (data: { name: string; phone: string; email?: string; message: string; requirement?: string }) => void;
  
  // CRM operations
  addProperty: (property: Partial<Property>) => Property;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  
  addLead: (leadData: Partial<Lead>) => Lead;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  updateLeadStatus: (id: string, newStatus: LeadStatus) => void;
  
  addOwner: (ownerData: Partial<Owner>) => Owner;
  addCustomer: (customerData: Partial<Customer>) => Customer;
  
  scheduleSiteVisit: (visitData: Partial<SiteVisit>) => SiteVisit;
  updateSiteVisitStatus: (id: string, status: any, outcome?: string, feedback?: string) => void;
  
  addFollowUp: (followUp: Partial<FollowUpTask>) => FollowUpTask;
  completeFollowUp: (id: string) => void;
  
  createDeal: (dealData: Partial<Deal>) => Deal;
  updateDealStage: (id: string, stage: DealStage) => void;
  
  addBlogPost: (post: Partial<BlogPost>) => void;
  addProject: (project: Partial<ConstructionProject>) => void;
  
  // Intelligence Engine
  calculateLeadScore: (lead: Partial<Lead>) => number;
  matchPropertiesForLead: (lead: Lead) => { property: Property; matchScore: number; reasons: string[] }[];
  generateAIDescription: (input: { propertyType: string; location: string; areaSqft: number; bedrooms?: number; amenities: string[] }) => { title: string; shortDesc: string; longDesc: string; seoTitle: string; seoDesc: string };
  generateLeadAISummary: (lead: Lead) => string;
  generateWhatsAppFollowup: (lead: Lead, property?: Property) => string;

  // Brand Settings
  brandTheme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    websiteName: string;
    phone: string;
    address: string;
  };
  updateBrandTheme: (themeUpdates: Partial<StoreContextType['brandTheme']>) => void;

  // Homepage Customization Studio (Super Admin)
  homepageSettings: {
    heroHeadline: string;
    heroSubheadline: string;
    heroButtonText: string;
    categoriesTitle: string;
    popularPropertiesTitle: string;
    whatWeDoTitle: string;
    testimonialsTitle: string;
    contactTitle: string;
    articlesTitle: string;
    
    showHeroSearch: boolean;
    showPartnerLogos: boolean;
    showCategories: boolean;
    showPopularProperties: boolean;
    showWhatWeDo: boolean;
    showTestimonials: boolean;
    showContactForm: boolean;
    showLatestArticles: boolean;

    // Property Display Grid & Spacing Controls
    propertyGridCols: number;
    maxPropertiesCount: number;
    sectionPaddingY: string;
    gridGap: string;
    cardPadding: string;
  };
  updateHomepageSettings: (settingsUpdates: Partial<StoreContextType['homepageSettings']>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('a2_properties');
    return saved ? JSON.parse(saved) : initialProperties;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('a2_leads');
    return saved ? JSON.parse(saved) : initialLeads;
  });

  const [owners, setOwners] = useState<Owner[]>(() => {
    const saved = localStorage.getItem('a2_owners');
    return saved ? JSON.parse(saved) : initialOwners;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('a2_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>(() => {
    const saved = localStorage.getItem('a2_site_visits');
    return saved ? JSON.parse(saved) : initialSiteVisits;
  });

  const [followUps, setFollowUps] = useState<FollowUpTask[]>(() => {
    const saved = localStorage.getItem('a2_follow_ups');
    return saved ? JSON.parse(saved) : initialFollowUps;
  });

  const [deals, setDeals] = useState<Deal[]>(() => {
    const saved = localStorage.getItem('a2_deals');
    return saved ? JSON.parse(saved) : initialDeals;
  });

  const [campaigns] = useState<MarketingCampaign[]>(initialCampaigns);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [projects, setProjects] = useState<ConstructionProject[]>(initialProjects);
  const [locations] = useState<LocationInfo[]>(initialLocations);
  const [staff] = useState<UserProfile[]>(initialStaff);

  const [activeRole, setActiveRole] = useState<UserRole>('SUPER_ADMIN');
  const [activeUser, setActiveUser] = useState<UserProfile>(initialStaff[0]);

  // Auth State for Private CRM
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('a2_auth');
    return saved !== 'false';
  });

  const login = (email: string, password: string, role?: UserRole): boolean => {
    const foundStaff = staff.find(s => s.email.toLowerCase() === email.toLowerCase()) || staff[0];
    const targetRole = role || foundStaff.role;
    setActiveRole(targetRole);
    setActiveUser(foundStaff);
    setIsAuthenticated(true);
    localStorage.setItem('a2_auth', 'true');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('a2_auth', 'false');
  };

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('a2_favorites');
    return saved ? JSON.parse(saved) : ['prop-1'];
  });

  const [compareList, setCompareList] = useState<string[]>([]);

  const [brandTheme, setBrandTheme] = useState({
    primaryColor: '#386635',
    secondaryColor: '#111827',
    accentColor: '#457B43',
    websiteName: 'A2 Realtors',
    phone: '+91 84451 90135',
    address: '25 B, Inder Road, Dalanwala, Dehradun, Uttarakhand 248001'
  });

  const [homepageSettings, setHomepageSettings] = useState({
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

    // Property Display Grid, Columns, Rows & Spacing Controls
    propertyGridCols: 4,
    maxPropertiesCount: 8,
    sectionPaddingY: '4.5rem',
    gridGap: '1.5rem',
    cardPadding: '1rem'
  });

  useEffect(() => {
    localStorage.setItem('a2_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('a2_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('a2_owners', JSON.stringify(owners));
  }, [owners]);

  useEffect(() => {
    localStorage.setItem('a2_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('a2_site_visits', JSON.stringify(siteVisits));
  }, [siteVisits]);

  useEffect(() => {
    localStorage.setItem('a2_follow_ups', JSON.stringify(followUps));
  }, [followUps]);

  useEffect(() => {
    localStorage.setItem('a2_deals', JSON.stringify(deals));
  }, [deals]);

  useEffect(() => {
    localStorage.setItem('a2_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const foundUser = staff.find(s => s.role === activeRole) || staff[0];
    setActiveUser(foundUser);
  }, [activeRole, staff]);

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) ? prev.filter(id => id !== propertyId) : [...prev, propertyId]
    );
  };

  const toggleCompare = (propertyId: string) => {
    setCompareList(prev => {
      if (prev.includes(propertyId)) return prev.filter(id => id !== propertyId);
      if (prev.length >= 3) return [prev[1], prev[2], propertyId];
      return [...prev, propertyId];
    });
  };

  const clearCompare = () => setCompareList([]);

  // LEAD SCORING ALGORITHM (+20 budget, +15 location, +15 type, +20 site visit, +10 phone)
  const calculateLeadScore = (lead: Partial<Lead>): number => {
    let score = 30; // base score
    if (lead.maxBudget && lead.maxBudget > 0) score += 20;
    if (lead.preferredLocation) score += 15;
    if (lead.preferredPropertyType) score += 15;
    if (lead.phone && lead.phone.length > 8) score += 10;
    if (lead.source === 'WHATSAPP' || lead.source === 'WEBSITE') score += 10;
    return Math.min(100, score);
  };

  // AUTOMATED PROPERTY MATCHING ENGINE (% match)
  const matchPropertiesForLead = (lead: Lead) => {
    return properties
      .filter(p => p.published && p.status === 'AVAILABLE')
      .map(p => {
        let score = 0;
        const reasons: string[] = [];

        // Transaction Type Match
        if (p.transactionType === lead.leadType) {
          score += 25;
          reasons.push(`Matching transaction type (${p.transactionType})`);
        }

        // Budget Match
        if (lead.maxBudget && p.price <= lead.maxBudget * 1.1) {
          score += 30;
          reasons.push('Fits within specified budget range');
        }

        // Location Match
        if (lead.preferredLocation && p.location.toLowerCase().includes(lead.preferredLocation.toLowerCase().split(',')[0])) {
          score += 25;
          reasons.push(`Desired locality match (${p.location.split(',')[0]})`);
        }

        // Bedrooms Match
        if (lead.preferredBedrooms && p.bedrooms === lead.preferredBedrooms) {
          score += 20;
          reasons.push(`${p.bedrooms} Bedrooms requirement fulfilled`);
        }

        return { property: p, matchScore: score, reasons };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  };

  // AI GENERATOR FOR PROPERTY DESCRIPTIONS
  const generateAIDescription = (input: { propertyType: string; location: string; areaSqft: number; bedrooms?: number; amenities: string[] }) => {
    const formattedType = input.propertyType.replace('_', ' ');
    const bedsText = input.bedrooms ? `${input.bedrooms} BHK ` : '';
    const title = `Architectural ${bedsText}${formattedType} — ${input.location}`;
    const shortDesc = `Exquisite ${input.areaSqft} sq.ft. ${formattedType.toLowerCase()} situated in prime ${input.location}, Dehradun featuring ${input.amenities.slice(0, 3).join(', ')}.`;
    const longDesc = `Discover a landmark address with this premium ${input.areaSqft} sq.ft. ${formattedType.toLowerCase()} located in the prestigious neighborhood of ${input.location}, Dehradun.\n\nDesigned to elevate daily living with generous natural light, expansive room proportions, and modern amenities including ${input.amenities.join(', ')}.\n\nEnjoy proximity to leading Dehradun schools, healthcare centers, and shopping avenues while savoring mountain serenity.`;
    
    return {
      title,
      shortDesc,
      longDesc,
      seoTitle: `${title} for Sale in ${input.location} | A2 Realtors`,
      seoDesc: `${bedsText}${formattedType} for sale in ${input.location}, Dehradun. Area: ${input.areaSqft} sq.ft. Contact A2 Realtors +91 84451 90135.`
    };
  };

  const generateLeadAISummary = (lead: Lead) => {
    const tempIcon = lead.temperature === 'HOT' ? '🔥 High Intent' : lead.temperature === 'WARM' ? '🟠 Moderate Intent' : '🔵 Nurture Stage';
    const budgetStr = lead.maxBudget ? `Budget ₹${(lead.maxBudget / 10000000).toFixed(2)} Cr` : 'Budget Not Specified';
    return `${lead.customerName} is looking to ${lead.leadType.toLowerCase()} a ${lead.preferredBedrooms ? lead.preferredBedrooms + ' BHK' : ''} ${lead.preferredPropertyType || 'property'} in ${lead.preferredLocation || 'Dehradun'}. ${budgetStr}. ${tempIcon}. Current Status: ${lead.status}.`;
  };

  const generateWhatsAppFollowup = (lead: Lead, property?: Property) => {
    const propTitle = property ? ` regarding "${property.title}" (${property.propertyCode})` : '';
    return `Namaste ${lead.customerName} Ji,\n\nThank you for reaching out to A2 Realtors Dehradun${propTitle}.\n\nWe have curated handpicked property choices matching your criteria in ${lead.preferredLocation || 'Dehradun'}.\n\nWould you be available for a short call or site visit this week?\n\nWarm regards,\n${lead.assignedAgentName || 'A2 Realtors Team'}\n+91 84451 90135`;
  };

  // PUBLIC FORM SUBMISSIONS
  const submitPropertyEnquiry = (data: { propertyId: string; name: string; phone: string; email?: string; requirement?: string }) => {
    const prop = properties.find(p => p.id === data.propertyId);
    
    // Create Customer if not exists
    let existingCust = customers.find(c => c.phone === data.phone);
    if (!existingCust) {
      existingCust = {
        id: `cust-${Date.now()}`,
        fullName: data.name,
        phone: data.phone,
        whatsapp: data.phone,
        email: data.email,
        customerType: 'BUYER',
        assignedAgentId: prop?.assignedAgentId || staff[2].id,
        assignedAgentName: prop?.assignedAgentName || staff[2].name,
        notes: `Enquired for property ${prop?.propertyCode || ''}`,
        createdAt: new Date().toISOString().split('T')[0],
        totalEnquiries: 1,
        totalVisits: 0
      };
      setCustomers(prev => [existingCust!, ...prev]);
    }

    // Create New Lead
    const newLeadCode = `L-${1000 + leads.length + 1}`;
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      leadCode: newLeadCode,
      customerName: data.name,
      phone: data.phone,
      whatsapp: data.phone,
      email: data.email,
      source: 'WEBSITE',
      leadType: prop?.transactionType || 'BUY',
      requirementSummary: data.requirement || `Enquiry for ${prop?.title || 'Property'} (${prop?.propertyCode || ''})`,
      minBudget: prop ? prop.price * 0.8 : 5000000,
      maxBudget: prop ? prop.price * 1.2 : 20000000,
      preferredLocation: prop?.location || 'Dehradun',
      preferredPropertyType: prop?.propertyType || 'INDEPENDENT_HOUSE',
      preferredBedrooms: prop?.bedrooms || 3,
      score: 85,
      temperature: 'HOT',
      status: 'NEW',
      assignedAgentId: prop?.assignedAgentId || staff[2].id,
      assignedAgentName: prop?.assignedAgentName || staff[2].name,
      interestedPropertyId: prop?.id,
      interestedPropertyTitle: prop?.title,
      nextFollowUpDate: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
      lastContactDate: new Date().toISOString(),
      createdAt: new Date().toISOString().split('T')[0],
      history: [
        { id: `act-${Date.now()}`, timestamp: new Date().toLocaleString(), type: 'LEAD_CREATED', description: `Enquiry submitted for ${prop?.title || 'Website Property'}`, user: 'Website Visitor' }
      ]
    };

    setLeads(prev => [newLead, ...prev]);

    // Create Follow up task
    const newTask: FollowUpTask = {
      id: `fu-${Date.now()}`,
      leadId: newLead.id,
      leadCode: newLeadCode,
      customerName: data.name,
      customerPhone: data.phone,
      assignedUserId: newLead.assignedAgentId,
      assignedUserName: newLead.assignedAgentName,
      type: 'CALL',
      scheduledAt: new Date(Date.now() + 3600000 * 2).toISOString().slice(0, 16),
      priority: 'HIGH',
      status: 'PENDING',
      notes: `New Website Enquiry for ${prop?.propertyCode || 'Property'}. Call customer back promptly.`
    };
    setFollowUps(prev => [newTask, ...prev]);

    // Increment property enquiry counter
    if (prop) {
      setProperties(prev => prev.map(p => p.id === prop.id ? { ...p, enquiryCount: p.enquiryCount + 1 } : p));
    }
  };

  const submitOwnerPropertyListing = (data: { ownerName: string; phone: string; email?: string; propertyType: any; location: string; areaSqft: number; expectedPrice: number; description: string }) => {
    // 1. Create Owner Record
    const newOwner: Owner = {
      id: `own-${Date.now()}`,
      fullName: data.ownerName,
      phone: data.phone,
      email: data.email,
      address: data.location,
      preferredCommunication: 'WhatsApp',
      propertiesOwned: [],
      askingPriceNotes: `Expected price: ₹${(data.expectedPrice / 100000).toFixed(2)} Lakhs`,
      verificationStatus: 'PENDING',
      assignedAgentId: staff[1].id,
      assignedAgentName: staff[1].name,
      createdAt: new Date().toISOString().split('T')[0]
    };

    // 2. Create Property Draft
    const newPropCode = `A2-${1150 + properties.length + 1}`;
    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      propertyCode: newPropCode,
      title: `${data.propertyType.replace('_', ' ')} for Sale — ${data.location}`,
      slug: `property-${newPropCode.toLowerCase()}`,
      description: data.description || `Property submitted by owner ${data.ownerName}. Pending verification.`,
      transactionType: 'BUY',
      propertyType: data.propertyType,
      status: 'DRAFT',
      price: data.expectedPrice,
      priceDisplay: `₹${(data.expectedPrice / 100000).toFixed(2)} Lakhs`,
      location: data.location,
      address: `${data.location}, Dehradun`,
      areaSqft: data.areaSqft,
      constructionStatus: 'READY_TO_MOVE',
      amenities: ['Power Backup', 'Water Supply'],
      featured: false,
      verified: false,
      published: false,
      images: [
        { id: `img-${Date.now()}`, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', isPrimary: true, caption: 'Submitted Photo' }
      ],
      ownerId: newOwner.id,
      assignedAgentId: staff[1].id,
      assignedAgentName: staff[1].name,
      assignedAgentPhone: staff[1].phone,
      viewCount: 0,
      enquiryCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    newOwner.propertiesOwned = [newProperty.id];

    // 3. Create Seller Lead
    const newLeadCode = `L-${1000 + leads.length + 1}`;
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      leadCode: newLeadCode,
      customerName: data.ownerName,
      phone: data.phone,
      whatsapp: data.phone,
      email: data.email,
      source: 'WEBSITE',
      leadType: 'SELL' as any,
      requirementSummary: `SELLER LEAD: Wants to sell ${data.propertyType} in ${data.location}. Expected Price: ₹${data.expectedPrice}`,
      minBudget: data.expectedPrice,
      maxBudget: data.expectedPrice,
      preferredLocation: data.location,
      preferredPropertyType: data.propertyType,
      score: 90,
      temperature: 'HOT',
      status: 'NEW',
      assignedAgentId: staff[1].id,
      assignedAgentName: staff[1].name,
      createdAt: new Date().toISOString().split('T')[0],
      history: [
        { id: `act-${Date.now()}`, timestamp: new Date().toLocaleString(), type: 'OWNER_LISTING_SUBMITTED', description: `Owner submitted property listing for ${data.location}`, user: 'Property Owner' }
      ]
    };

    setOwners(prev => [newOwner, ...prev]);
    setProperties(prev => [newProperty, ...prev]);
    setLeads(prev => [newLead, ...prev]);

    // Add Task
    setFollowUps(prev => [
      {
        id: `fu-${Date.now()}`,
        leadId: newLead.id,
        leadCode: newLeadCode,
        customerName: data.ownerName,
        customerPhone: data.phone,
        assignedUserId: staff[1].id,
        assignedUserName: staff[1].name,
        type: 'CALL',
        scheduledAt: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
        priority: 'HIGH',
        status: 'PENDING',
        notes: `Verify new owner property listing (${newPropCode}) in ${data.location}.`
      },
      ...prev
    ]);
  };

  const submitGeneralContact = (data: { name: string; phone: string; email?: string; message: string; requirement?: string }) => {
    const newLeadCode = `L-${1000 + leads.length + 1}`;
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      leadCode: newLeadCode,
      customerName: data.name,
      phone: data.phone,
      whatsapp: data.phone,
      email: data.email,
      source: 'WEBSITE',
      leadType: 'BUY',
      requirementSummary: data.message || data.requirement || 'General contact enquiry from website',
      minBudget: 5000000,
      maxBudget: 15000000,
      preferredLocation: 'Dehradun',
      preferredPropertyType: 'INDEPENDENT_HOUSE',
      score: 75,
      temperature: 'WARM',
      status: 'NEW',
      assignedAgentId: staff[2].id,
      assignedAgentName: staff[2].name,
      createdAt: new Date().toISOString().split('T')[0],
      history: [
        { id: `act-${Date.now()}`, timestamp: new Date().toLocaleString(), type: 'LEAD_CREATED', description: 'General contact form submission', user: 'Website Visitor' }
      ]
    };
    setLeads(prev => [newLead, ...prev]);
  };

  // CRM CRUD METHODS
  const addProperty = (propertyData: Partial<Property>) => {
    const code = `A2-${1150 + properties.length + 1}`;
    const newProp: Property = {
      id: `prop-${Date.now()}`,
      propertyCode: code,
      title: propertyData.title || 'New Property Listing',
      slug: (propertyData.title || 'new-property').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: propertyData.description || '',
      transactionType: propertyData.transactionType || 'BUY',
      propertyType: propertyData.propertyType || 'INDEPENDENT_HOUSE',
      status: propertyData.status || 'AVAILABLE',
      price: propertyData.price || 10000000,
      priceDisplay: propertyData.priceDisplay || `₹${((propertyData.price || 10000000) / 100000).toFixed(2)} Lakhs`,
      location: propertyData.location || 'Dehradun',
      address: propertyData.address || 'Dehradun, Uttarakhand',
      areaSqft: propertyData.areaSqft || 1500,
      bedrooms: propertyData.bedrooms || 3,
      bathrooms: propertyData.bathrooms || 3,
      constructionStatus: propertyData.constructionStatus || 'READY_TO_MOVE',
      amenities: propertyData.amenities || ['Parking', 'Power Backup', 'Security'],
      featured: propertyData.featured || false,
      verified: true,
      published: true,
      images: propertyData.images && propertyData.images.length > 0 ? propertyData.images : [
        { id: 'img-new', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', isPrimary: true, caption: 'Main Elevation' }
      ],
      assignedAgentId: activeUser.id,
      assignedAgentName: activeUser.name,
      assignedAgentPhone: activeUser.phone,
      viewCount: 0,
      enquiryCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProperties(prev => [newProp, ...prev]);
    return newProp;
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const addLead = (leadData: Partial<Lead>) => {
    const code = `L-${1000 + leads.length + 1}`;
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      leadCode: code,
      customerName: leadData.customerName || 'New Client',
      phone: leadData.phone || '+91 90000 00000',
      whatsapp: leadData.whatsapp || leadData.phone || '+91 90000 00000',
      email: leadData.email,
      source: leadData.source || 'PHONE',
      leadType: leadData.leadType || 'BUY',
      requirementSummary: leadData.requirementSummary || 'Requirement intake',
      minBudget: leadData.minBudget || 5000000,
      maxBudget: leadData.maxBudget || 15000000,
      preferredLocation: leadData.preferredLocation || 'Dehradun',
      preferredPropertyType: leadData.preferredPropertyType || 'INDEPENDENT_HOUSE',
      preferredBedrooms: leadData.preferredBedrooms || 3,
      score: calculateLeadScore(leadData),
      temperature: leadData.temperature || 'WARM',
      status: leadData.status || 'NEW',
      assignedAgentId: leadData.assignedAgentId || activeUser.id,
      assignedAgentName: leadData.assignedAgentName || activeUser.name,
      nextFollowUpDate: leadData.nextFollowUpDate,
      createdAt: new Date().toISOString().split('T')[0],
      history: [
        { id: `act-${Date.now()}`, timestamp: new Date().toLocaleString(), type: 'LEAD_CREATED', description: 'Lead manually added into CRM', user: activeUser.name }
      ]
    };

    setLeads(prev => [newLead, ...prev]);
    return newLead;
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const updateLeadStatus = (id: string, newStatus: LeadStatus) => {
    setLeads(prev => prev.map(l => {
      if (l.id === id) {
        const historyItem = {
          id: `act-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          type: 'STATUS_CHANGE',
          description: `Status updated from ${l.status} to ${newStatus}`,
          user: activeUser.name
        };
        return {
          ...l,
          status: newStatus,
          history: [historyItem, ...(l.history || [])]
        };
      }
      return l;
    }));
  };

  const addOwner = (ownerData: Partial<Owner>) => {
    const newOwner: Owner = {
      id: `own-${Date.now()}`,
      fullName: ownerData.fullName || 'Property Owner',
      phone: ownerData.phone || '+91 90000 00000',
      email: ownerData.email,
      address: ownerData.address || 'Dehradun',
      preferredCommunication: ownerData.preferredCommunication || 'WhatsApp',
      propertiesOwned: ownerData.propertiesOwned || [],
      askingPriceNotes: ownerData.askingPriceNotes,
      verificationStatus: ownerData.verificationStatus || 'VERIFIED',
      assignedAgentId: activeUser.id,
      assignedAgentName: activeUser.name,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setOwners(prev => [newOwner, ...prev]);
    return newOwner;
  };

  const addCustomer = (customerData: Partial<Customer>) => {
    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      fullName: customerData.fullName || 'Client Name',
      phone: customerData.phone || '+91 90000 00000',
      whatsapp: customerData.whatsapp || customerData.phone || '+91 90000 00000',
      email: customerData.email,
      customerType: customerData.customerType || 'BUYER',
      assignedAgentId: activeUser.id,
      assignedAgentName: activeUser.name,
      notes: customerData.notes,
      createdAt: new Date().toISOString().split('T')[0],
      totalEnquiries: 1,
      totalVisits: 0
    };
    setCustomers(prev => [newCust, ...prev]);
    return newCust;
  };

  const scheduleSiteVisit = (visitData: Partial<SiteVisit>) => {
    const lead = leads.find(l => l.id === visitData.leadId);
    const prop = properties.find(p => p.id === visitData.propertyId);

    const newVisit: SiteVisit = {
      id: `sv-${Date.now()}`,
      leadId: visitData.leadId || '',
      leadCode: lead?.leadCode || 'L-1000',
      customerName: lead?.customerName || visitData.customerName || 'Client',
      customerPhone: lead?.phone || visitData.customerPhone || '',
      propertyId: visitData.propertyId || '',
      propertyTitle: prop?.title || visitData.propertyTitle || 'Property',
      propertyLocation: prop?.location || 'Dehradun',
      agentId: activeUser.id,
      agentName: activeUser.name,
      visitDate: visitData.visitDate || new Date().toISOString().split('T')[0],
      visitTime: visitData.visitTime || '11:00 AM',
      status: 'SCHEDULED',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setSiteVisits(prev => [newVisit, ...prev]);

    // Update Lead Status to SITE_VISIT
    if (lead) {
      updateLeadStatus(lead.id, 'SITE_VISIT');
    }

    return newVisit;
  };

  const updateSiteVisitStatus = (id: string, status: any, outcome?: string, feedback?: string) => {
    setSiteVisits(prev => prev.map(sv => sv.id === id ? {
      ...sv,
      status,
      outcome: outcome || sv.outcome,
      customerFeedback: feedback || sv.customerFeedback
    } : sv));
  };

  const addFollowUp = (followUp: Partial<FollowUpTask>) => {
    const lead = leads.find(l => l.id === followUp.leadId);

    const newTask: FollowUpTask = {
      id: `fu-${Date.now()}`,
      leadId: followUp.leadId || '',
      leadCode: lead?.leadCode || 'L-1000',
      customerName: lead?.customerName || followUp.customerName || 'Client',
      customerPhone: lead?.phone || followUp.customerPhone || '',
      assignedUserId: followUp.assignedUserId || activeUser.id,
      assignedUserName: followUp.assignedUserName || activeUser.name,
      type: followUp.type || 'CALL',
      scheduledAt: followUp.scheduledAt || new Date().toISOString().slice(0, 16),
      priority: followUp.priority || 'HIGH',
      status: 'PENDING',
      notes: followUp.notes
    };

    setFollowUps(prev => [newTask, ...prev]);
    return newTask;
  };

  const completeFollowUp = (id: string) => {
    setFollowUps(prev => prev.map(f => f.id === id ? { ...f, status: 'COMPLETED', completedAt: new Date().toISOString() } : f));
  };

  const createDeal = (dealData: Partial<Deal>) => {
    const val = dealData.dealValue || 10000000;
    const commPct = dealData.commissionPercentage || 2.0;
    const totComm = (val * commPct) / 100;
    const agentSplit = totComm * 0.5;

    const newDeal: Deal = {
      id: `deal-${Date.now()}`,
      dealCode: `D-2026-${deals.length + 1}`,
      leadId: dealData.leadId || '',
      customerName: dealData.customerName || 'Buyer Client',
      ownerName: dealData.ownerName || 'Property Owner',
      propertyId: dealData.propertyId || '',
      propertyTitle: dealData.propertyTitle || 'Dehradun Property',
      agentId: activeUser.id,
      agentName: activeUser.name,
      dealValue: val,
      bookingAmount: dealData.bookingAmount || 500000,
      commissionPercentage: commPct,
      totalCommission: totComm,
      agentCommissionSplit: agentSplit,
      companyCommissionSplit: totComm - agentSplit,
      stage: dealData.stage || 'NEGOTIATION',
      paymentStatus: 'PENDING',
      closingDate: dealData.closingDate || new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setDeals(prev => [newDeal, ...prev]);
    return newDeal;
  };

  const updateDealStage = (id: string, stage: DealStage) => {
    setDeals(prev => prev.map(d => d.id === id ? { ...d, stage } : d));
  };

  const addBlogPost = (post: Partial<BlogPost>) => {
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: post.title || 'New Real Estate Article',
      slug: (post.title || 'article').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: post.category || 'Dehradun Real Estate',
      author: activeUser.name,
      excerpt: post.excerpt || '',
      content: post.content || '',
      coverImage: post.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
      published: true,
      views: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBlogPosts(prev => [newPost, ...prev]);
  };

  const addProject = (project: Partial<ConstructionProject>) => {
    const newProj: ConstructionProject = {
      id: `proj-${Date.now()}`,
      title: project.title || 'New Construction Project',
      category: project.category || 'Construction',
      location: project.location || 'Dehradun',
      completionYear: project.completionYear || 2024,
      status: project.status || 'Completed',
      imageUrl: project.imageUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000',
      description: project.description || '',
      scope: project.scope || 'Turnkey Execution'
    };
    setProjects(prev => [newProj, ...prev]);
  };

  const updateBrandTheme = (themeUpdates: Partial<StoreContextType['brandTheme']>) => {
    setBrandTheme(prev => ({ ...prev, ...themeUpdates }));
  };

  const updateHomepageSettings = (settingsUpdates: Partial<StoreContextType['homepageSettings']>) => {
    setHomepageSettings(prev => ({ ...prev, ...settingsUpdates }));
  };

  return (
    <StoreContext.Provider value={{
      properties,
      leads,
      owners,
      customers,
      siteVisits,
      followUps,
      deals,
      campaigns,
      blogPosts,
      projects,
      locations,
      staff,
      activeUser,
      activeRole,
      setActiveRole,
      isAuthenticated,
      login,
      logout,
      favorites,
      toggleFavorite,
      compareList,
      toggleCompare,
      clearCompare,
      submitPropertyEnquiry,
      submitOwnerPropertyListing,
      submitGeneralContact,
      addProperty,
      updateProperty,
      deleteProperty,
      addLead,
      updateLead,
      updateLeadStatus,
      addOwner,
      addCustomer,
      scheduleSiteVisit,
      updateSiteVisitStatus,
      addFollowUp,
      completeFollowUp,
      createDeal,
      updateDealStage,
      addBlogPost,
      addProject,
      calculateLeadScore,
      matchPropertiesForLead,
      generateAIDescription,
      generateLeadAISummary,
      generateWhatsAppFollowup,
      brandTheme,
      updateBrandTheme,
      homepageSettings,
      updateHomepageSettings
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
