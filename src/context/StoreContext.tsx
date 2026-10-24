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
  UserRoleDefinition,
  LeadStatus,
  DealStage,
  HomepageSettings
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
  initialStaff,
  initialRoles
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
  roles: UserRoleDefinition[];
  
  activeUser: UserProfile;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  
  // Login Authentication for Private CRM
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => boolean;
  logout: () => void;
  
  // Staff & RBAC Management
  addStaff: (staffData: { name: string; email: string; phone: string; role: UserRole; password?: string; avatar?: string }) => UserProfile;
  updateStaff: (id: string, updates: Partial<UserProfile>) => void;
  changeStaffPassword: (id: string, newPassword: string) => void;
  removeStaff: (id: string) => boolean;
  addRole: (roleData: Omit<UserRoleDefinition, 'id'>) => UserRoleDefinition;
  updateRole: (roleKey: string, updates: Partial<UserRoleDefinition>) => void;
  removeRole: (roleKey: string) => boolean;
  
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
  approveProperty: (id: string) => void;
  rejectProperty: (id: string, reason?: string) => void;
  
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
  
  addBlogPost: (post: Partial<BlogPost>) => BlogPost;
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  
  addProject: (project: Partial<ConstructionProject>) => ConstructionProject;
  updateProject: (id: string, updates: Partial<ConstructionProject>) => void;
  deleteProject: (id: string) => void;
  
  addLocation: (loc: Partial<LocationInfo>) => LocationInfo;
  updateLocation: (id: string, updates: Partial<LocationInfo>) => void;
  deleteLocation: (id: string) => void;
  
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
  homepageSettings: HomepageSettings;
  updateHomepageSettings: (settingsUpdates: Partial<HomepageSettings>) => void;
}

// Input Sanitization Helper against XSS and Script Injection
export const sanitizeText = (input: string | undefined | null): string => {
  if (!input) return '';
  return String(input)
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/javascript:/gi, '') // Strip javascript pseudo-protocol
    .replace(/vbscript:/gi, '')
    .replace(/on\w+=/gi, '') // Strip inline event handlers
    .trim();
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('a2_properties');
    if (saved) {
      try {
        const parsed: Property[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map(p => p.id));
        const missing = initialProperties.filter(ip => !existingIds.has(ip.id));
        if (missing.length > 0) {
          return [...parsed, ...missing];
        }
        return parsed;
      } catch (e) {
        console.error('Error parsing properties from localStorage', e);
      }
    }
    return initialProperties;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('a2_leads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing leads from localStorage', e);
      }
    }
    return initialLeads;
  });

  const [owners, setOwners] = useState<Owner[]>(() => {
    const saved = localStorage.getItem('a2_owners');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing owners from localStorage', e);
      }
    }
    return initialOwners;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('a2_customers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing customers from localStorage', e);
      }
    }
    return initialCustomers;
  });

  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>(() => {
    const saved = localStorage.getItem('a2_site_visits');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing site visits from localStorage', e);
      }
    }
    return initialSiteVisits;
  });

  const [followUps, setFollowUps] = useState<FollowUpTask[]>(() => {
    const saved = localStorage.getItem('a2_follow_ups');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing follow ups from localStorage', e);
      }
    }
    return initialFollowUps;
  });

  const [deals, setDeals] = useState<Deal[]>(() => {
    const saved = localStorage.getItem('a2_deals');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing deals from localStorage', e);
      }
    }
    return initialDeals;
  });

  const [campaigns] = useState<MarketingCampaign[]>(initialCampaigns);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('a2_blog_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing blog posts from localStorage', e);
      }
    }
    return initialBlogPosts;
  });

  const [projects, setProjects] = useState<ConstructionProject[]>(() => {
    const saved = localStorage.getItem('a2_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing projects from localStorage', e);
      }
    }
    return initialProjects;
  });

  const [locations, setLocations] = useState<LocationInfo[]>(() => {
    const saved = localStorage.getItem('a2_locations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing locations from localStorage', e);
      }
    }
    return initialLocations;
  });
  
  const [staff, setStaff] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('a2_staff');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((u: UserProfile) => {
          if (u.id === 'u-1' && (u.name.includes('Vikram') || u.avatar.includes('unsplash'))) {
            return {
              ...u,
              name: 'Punit Tyagi',
              avatar: '/director-punit-tyagi.jpg',
              rating: 5.0,
              dealsClosed: 85
            };
          }
          return u;
        });
      } catch (e) {
        console.error('Error parsing staff from localStorage', e);
      }
    }
    return initialStaff;
  });

  const [roles, setRoles] = useState<UserRoleDefinition[]>(() => {
    const saved = localStorage.getItem('a2_roles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing roles from localStorage', e);
      }
    }
    return initialRoles;
  });

  const [activeRole, setActiveRole] = useState<UserRole>('SUPER_ADMIN');
  const [activeUser, setActiveUser] = useState<UserProfile>(() => staff[0] || initialStaff[0]);

  // Auth State for Private CRM — default to false for unauthenticated visitors
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('a2_auth');
    return saved === 'true';
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('a2_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing favorites from localStorage', e);
      }
    }
    return ['prop-1'];
  });

  const [compareList, setCompareList] = useState<string[]>([]);

  const [brandTheme, setBrandTheme] = useState(() => {
    const saved = localStorage.getItem('a2_brand_theme');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing brand theme from localStorage', e);
      }
    }
    return {
      primaryColor: '#386635',
      secondaryColor: '#111827',
      accentColor: '#457B43',
      websiteName: 'A2 Realtors',
      phone: '+91 84451 90135',
      address: '25 B, Inder Road, Dalanwala, Dehradun, Uttarakhand 248001'
    };
  });

  const [homepageSettings, setHomepageSettings] = useState<HomepageSettings>(() => {
    const defaultSettings: HomepageSettings = {
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
      showAboutSection: true,
      showDirectorMessage: true,
      showWhyChooseUs: true,
      showWhatWeDo: true,
      showTestimonials: true,
      showContactForm: true,
      showLatestArticles: true,

      // Director Information
      directorName: 'Punit Tyagi',
      directorRole: 'Founder & Managing Director',
      directorPhoto: '/director-punit-tyagi.jpg',
      directorQuote: 'Our success as a company is measured by the remarkable returns and generational trust we have consistently provided our clients across Dehradun and Uttarakhand over the past 14 years.',

      // Property Display Grid, Columns, Rows & Spacing Controls
      propertyGridCols: 4,
      maxPropertiesCount: 8,
      sectionPaddingY: '4.5rem',
      gridGap: '1.5rem',
      cardPadding: '1rem'
    };

    const saved = localStorage.getItem('a2_homepage_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.directorName || parsed.directorName.includes('Vikram')) {
          parsed.directorName = 'Punit Tyagi';
          parsed.directorRole = 'Founder & Managing Director';
          parsed.directorPhoto = '/director-punit-tyagi.jpg';
        }
        return { ...defaultSettings, ...parsed };
      } catch (e) {
        console.error('Error parsing homepage settings from localStorage', e);
      }
    }
    return defaultSettings;
  });

  // Local Storage Sync Effects
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
    localStorage.setItem('a2_staff', JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem('a2_roles', JSON.stringify(roles));
  }, [roles]);

  useEffect(() => {
    localStorage.setItem('a2_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('a2_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('a2_locations', JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    localStorage.setItem('a2_brand_theme', JSON.stringify(brandTheme));
  }, [brandTheme]);

  useEffect(() => {
    localStorage.setItem('a2_homepage_settings', JSON.stringify(homepageSettings));
  }, [homepageSettings]);

  const login = (emailInput: string, passwordInput: string, roleOverride?: UserRole): boolean => {
    const cleanEmail = sanitizeText(emailInput).toLowerCase();
    const cleanPass = passwordInput.trim();

    // Find staff member by email (or username "admin" maps to admin@a2realtors.in)
    const foundStaff = staff.find(s => {
      const sEmail = s.email.toLowerCase();
      if (cleanEmail === 'admin' && sEmail === 'admin@a2realtors.in') return true;
      return sEmail === cleanEmail;
    });

    if (!foundStaff) {
      // Allow master admin login if matching admin credentials
      if ((cleanEmail === 'admin@a2realtors.in' || cleanEmail === 'admin') && cleanPass === 'admin123') {
        const fallbackAdmin = staff[0] || initialStaff[0];
        setActiveRole('SUPER_ADMIN');
        setActiveUser(fallbackAdmin);
        setIsAuthenticated(true);
        localStorage.setItem('a2_auth', 'true');
        return true;
      }
      return false;
    }

    // Verify Password strictly against staff profile
    const expectedPassword = foundStaff.password || 'admin123';
    if (cleanPass === expectedPassword) {
      const targetRole = roleOverride || foundStaff.role;
      setActiveRole(targetRole);
      setActiveUser(foundStaff);
      setIsAuthenticated(true);
      localStorage.setItem('a2_auth', 'true');
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('a2_auth', 'false');
  };

  // Staff & Role Actions
  const addStaff = (staffData: { name: string; email: string; phone: string; role: UserRole; password?: string; avatar?: string }): UserProfile => {
    const newStaffMember: UserProfile = {
      id: `u-${Date.now()}`,
      name: staffData.name,
      email: staffData.email.trim().toLowerCase(),
      phone: staffData.phone,
      role: staffData.role,
      password: staffData.password || 'admin123',
      avatar: staffData.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200`,
      rating: 5.0,
      dealsClosed: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setStaff(prev => [...prev, newStaffMember]);
    return newStaffMember;
  };

  const updateStaff = (id: string, updates: Partial<UserProfile>) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    if (activeUser.id === id) {
      setActiveUser(prev => ({ ...prev, ...updates }));
    }
  };

  const changeStaffPassword = (id: string, newPassword: string) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, password: newPassword } : s));
    if (activeUser.id === id) {
      setActiveUser(prev => ({ ...prev, password: newPassword }));
    }
  };

  const removeStaff = (id: string): boolean => {
    if (staff.length <= 1) {
      return false; // Prevent removing last remaining staff member
    }
    setStaff(prev => prev.filter(s => s.id !== id));
    return true;
  };

  const addRole = (roleData: Omit<UserRoleDefinition, 'id'>): UserRoleDefinition => {
    const newRole: UserRoleDefinition = {
      id: `role-${Date.now()}`,
      ...roleData
    };
    setRoles(prev => [...prev, newRole]);
    return newRole;
  };

  const updateRole = (roleKey: string, updates: Partial<UserRoleDefinition>) => {
    setRoles(prev => prev.map(r => r.roleKey === roleKey ? { ...r, ...updates } : r));
  };

  const removeRole = (roleKey: string): boolean => {
    const isSystemRole = ['SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER', 'AGENT', 'TELECALLER'].includes(roleKey);
    if (isSystemRole) return false;
    setRoles(prev => prev.filter(r => r.roleKey !== roleKey));
    return true;
  };

  useEffect(() => {
    const foundUser = staff.find(s => s.role === activeRole) || staff[0];
    if (foundUser) {
      setActiveUser(foundUser);
    }
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
    const cleanName = sanitizeText(data.name);
    const cleanPhone = sanitizeText(data.phone);
    const cleanEmail = data.email ? sanitizeText(data.email) : undefined;
    const cleanReq = data.requirement ? sanitizeText(data.requirement) : undefined;
    const prop = properties.find(p => p.id === data.propertyId);
    
    // Create Customer if not exists
    let existingCust = customers.find(c => c.phone === cleanPhone);
    if (!existingCust) {
      existingCust = {
        id: `cust-${Date.now()}`,
        fullName: cleanName,
        phone: cleanPhone,
        whatsapp: cleanPhone,
        email: cleanEmail,
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
      customerName: cleanName,
      phone: cleanPhone,
      whatsapp: cleanPhone,
      email: cleanEmail,
      source: 'WEBSITE',
      leadType: prop?.transactionType || 'BUY',
      requirementSummary: cleanReq || `Enquiry for ${prop?.title || 'Property'} (${prop?.propertyCode || ''})`,
      minBudget: prop ? Math.max(0, prop.price * 0.8) : 5000000,
      maxBudget: prop ? Math.max(0, prop.price * 1.2) : 20000000,
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
      customerName: cleanName,
      customerPhone: cleanPhone,
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
    const cleanOwnerName = sanitizeText(data.ownerName);
    const cleanPhone = sanitizeText(data.phone);
    const cleanEmail = data.email ? sanitizeText(data.email) : undefined;
    const cleanLocation = sanitizeText(data.location);
    const cleanDesc = sanitizeText(data.description);
    const validArea = Math.max(10, Number(data.areaSqft) || 1000);
    const validPrice = Math.max(1000, Number(data.expectedPrice) || 1000000);

    // 1. Create Owner Record
    const newOwner: Owner = {
      id: `own-${Date.now()}`,
      fullName: cleanOwnerName,
      phone: cleanPhone,
      email: cleanEmail,
      address: cleanLocation,
      preferredCommunication: 'WhatsApp',
      propertiesOwned: [],
      askingPriceNotes: `Expected price: ₹${(validPrice / 100000).toFixed(2)} Lakhs`,
      verificationStatus: 'PENDING',
      assignedAgentId: staff[1].id,
      assignedAgentName: staff[1].name,
      createdAt: new Date().toISOString().split('T')[0]
    };

    // 2. Create Property in PENDING_APPROVAL status (Awaiting Admin Approval)
    const newPropCode = `A2-${1150 + properties.length + 1}`;
    const priceDisplayVal = validPrice >= 10000000 
      ? `₹${(validPrice / 10000000).toFixed(2)} Cr` 
      : `₹${(validPrice / 100000).toFixed(2)} Lakhs`;

    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      propertyCode: newPropCode,
      title: `${String(data.propertyType).replace('_', ' ')} for Sale — ${cleanLocation}`,
      slug: `property-${newPropCode.toLowerCase()}`,
      description: cleanDesc || `Property listed by owner ${cleanOwnerName}. Awaiting Admin Review & Approval.`,
      transactionType: 'BUY',
      propertyType: data.propertyType,
      status: 'PENDING_APPROVAL',
      approvalStatus: 'PENDING',
      price: validPrice,
      priceDisplay: priceDisplayVal,
      location: cleanLocation,
      address: `${cleanLocation}, Dehradun`,
      areaSqft: validArea,
      constructionStatus: 'READY_TO_MOVE',
      amenities: ['Power Backup', 'Water Supply'],
      featured: false,
      verified: false,
      published: false,
      submittedBy: {
        name: cleanOwnerName,
        phone: cleanPhone,
        email: cleanEmail,
        submittedAt: new Date().toISOString()
      },
      images: [
        { id: `img-${Date.now()}`, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', isPrimary: true, caption: 'Submitted Owner Photo' }
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
      customerName: cleanOwnerName,
      phone: cleanPhone,
      whatsapp: cleanPhone,
      email: cleanEmail,
      source: 'WEBSITE',
      leadType: 'SELL' as any,
      requirementSummary: `SELLER LEAD: Wants to sell ${data.propertyType} in ${cleanLocation}. Expected Price: ₹${validPrice}`,
      minBudget: validPrice,
      maxBudget: validPrice,
      preferredLocation: cleanLocation,
      preferredPropertyType: data.propertyType,
      score: 90,
      temperature: 'HOT',
      status: 'NEW',
      assignedAgentId: staff[1].id,
      assignedAgentName: staff[1].name,
      createdAt: new Date().toISOString().split('T')[0],
      history: [
        { id: `act-${Date.now()}`, timestamp: new Date().toLocaleString(), type: 'OWNER_LISTING_SUBMITTED', description: `Owner submitted property listing for ${cleanLocation}`, user: 'Property Owner' }
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
        customerName: cleanOwnerName,
        customerPhone: cleanPhone,
        assignedUserId: staff[1].id,
        assignedUserName: staff[1].name,
        type: 'CALL',
        scheduledAt: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
        priority: 'HIGH',
        status: 'PENDING',
        notes: `Verify new owner property listing (${newPropCode}) in ${cleanLocation}.`
      },
      ...prev
    ]);
  };

  const submitGeneralContact = (data: { name: string; phone: string; email?: string; message: string; requirement?: string }) => {
    const cleanName = sanitizeText(data.name);
    const cleanPhone = sanitizeText(data.phone);
    const cleanEmail = data.email ? sanitizeText(data.email) : undefined;
    const cleanMessage = sanitizeText(data.message || data.requirement);

    const newLeadCode = `L-${1000 + leads.length + 1}`;
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      leadCode: newLeadCode,
      customerName: cleanName,
      phone: cleanPhone,
      whatsapp: cleanPhone,
      email: cleanEmail,
      source: 'WEBSITE',
      leadType: 'BUY',
      requirementSummary: cleanMessage || 'General contact enquiry from website',
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
    const code = sanitizeText(propertyData.propertyCode) || `A2-${1150 + properties.length + 1}`;
    const priceVal = Math.max(0, Number(propertyData.price) || 10000000);
    const priceDisplayVal = propertyData.priceDisplay || (priceVal >= 10000000 
      ? `₹${(priceVal / 10000000).toFixed(2)} Cr` 
      : `₹${(priceVal / 100000).toFixed(2)} Lakhs`);
    
    const cleanTitle = sanitizeText(propertyData.title) || 'New Property Listing';
    const cleanLocation = sanitizeText(propertyData.location) || 'Dehradun';
    const cleanAddress = sanitizeText(propertyData.address) || `${cleanLocation}, Uttarakhand`;
    const cleanDesc = sanitizeText(propertyData.description) || '';

    const newProp: Property = {
      id: propertyData.id || `prop-${Date.now()}`,
      propertyCode: code,
      title: cleanTitle,
      slug: propertyData.slug || cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4),
      description: cleanDesc,
      transactionType: propertyData.transactionType || 'BUY',
      propertyType: propertyData.propertyType || 'INDEPENDENT_HOUSE',
      status: propertyData.status || 'AVAILABLE',
      price: priceVal,
      priceDisplay: priceDisplayVal,
      location: cleanLocation,
      address: cleanAddress,
      areaSqft: Math.max(10, Number(propertyData.areaSqft) || 1500),
      bedrooms: Math.max(0, Number(propertyData.bedrooms) || 3),
      bathrooms: Math.max(0, Number(propertyData.bathrooms) || 3),
      constructionStatus: propertyData.constructionStatus || 'READY_TO_MOVE',
      amenities: propertyData.amenities && propertyData.amenities.length > 0 ? propertyData.amenities : ['Parking', 'Power Backup', 'Security', 'Water Supply'],
      featured: propertyData.featured !== undefined ? propertyData.featured : false,
      verified: propertyData.verified !== undefined ? propertyData.verified : true,
      published: propertyData.published !== undefined ? propertyData.published : true,
      images: propertyData.images && propertyData.images.length > 0 ? propertyData.images : [
        { id: `img-${Date.now()}`, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', isPrimary: true, caption: 'Main Elevation' }
      ],
      assignedAgentId: propertyData.assignedAgentId || activeUser.id,
      assignedAgentName: propertyData.assignedAgentName || activeUser.name,
      assignedAgentPhone: propertyData.assignedAgentPhone || activeUser.phone,
      viewCount: 0,
      enquiryCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProperties(prev => [newProp, ...prev]);
    return newProp;
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties(prev => prev.map(p => {
      if (p.id === id) {
        let priceDisplay = updates.priceDisplay || p.priceDisplay;
        if (updates.price !== undefined && !updates.priceDisplay) {
          const numPrice = Math.max(0, Number(updates.price) || 0);
          priceDisplay = numPrice >= 10000000 
            ? `₹${(numPrice / 10000000).toFixed(2)} Cr` 
            : `₹${(numPrice / 100000).toFixed(2)} Lakhs`;
        }
        return {
          ...p,
          ...updates,
          title: updates.title !== undefined ? sanitizeText(updates.title) : p.title,
          location: updates.location !== undefined ? sanitizeText(updates.location) : p.location,
          address: updates.address !== undefined ? sanitizeText(updates.address) : p.address,
          description: updates.description !== undefined ? sanitizeText(updates.description) : p.description,
          priceDisplay
        };
      }
      return p;
    }));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const approveProperty = (id: string) => {
    setProperties(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status: 'AVAILABLE',
          published: true,
          verified: true,
          approvalStatus: 'APPROVED'
        };
      }
      return p;
    }));

    // Also mark owner as verified if associated
    const targetProp = properties.find(p => p.id === id);
    if (targetProp && targetProp.ownerId) {
      setOwners(prev => prev.map(o => o.id === targetProp.ownerId ? { ...o, verificationStatus: 'VERIFIED' } : o));
    }
  };

  const rejectProperty = (id: string, reason?: string) => {
    setProperties(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status: 'REJECTED',
          published: false,
          approvalStatus: 'REJECTED',
          rejectionReason: sanitizeText(reason) || 'Listing submission did not meet verification criteria'
        };
      }
      return p;
    }));
  };

  const addLead = (leadData: Partial<Lead>) => {
    const code = `L-${1000 + leads.length + 1}`;
    const cleanCustName = sanitizeText(leadData.customerName) || 'New Client';
    const cleanPhone = sanitizeText(leadData.phone) || '+91 90000 00000';
    const cleanEmail = leadData.email ? sanitizeText(leadData.email) : undefined;
    const cleanLoc = sanitizeText(leadData.preferredLocation) || 'Dehradun';
    const cleanReq = sanitizeText(leadData.requirementSummary) || 'Requirement intake';

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      leadCode: code,
      customerName: cleanCustName,
      phone: cleanPhone,
      whatsapp: leadData.whatsapp ? sanitizeText(leadData.whatsapp) : cleanPhone,
      email: cleanEmail,
      source: leadData.source || 'PHONE',
      leadType: leadData.leadType || 'BUY',
      requirementSummary: cleanReq,
      minBudget: Math.max(0, Number(leadData.minBudget) || 5000000),
      maxBudget: Math.max(0, Number(leadData.maxBudget) || 15000000),
      preferredLocation: cleanLoc,
      preferredPropertyType: leadData.preferredPropertyType || 'INDEPENDENT_HOUSE',
      preferredBedrooms: Math.max(1, Number(leadData.preferredBedrooms) || 3),
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
    const val = Math.max(0, Number(dealData.dealValue) || 10000000);
    const commPct = Math.max(0, Math.min(100, Number(dealData.commissionPercentage) || 2.0));
    const totComm = (val * commPct) / 100;
    const agentSplit = totComm * 0.5;

    const newDeal: Deal = {
      id: `deal-${Date.now()}`,
      dealCode: `D-2026-${deals.length + 1}`,
      leadId: dealData.leadId || '',
      customerName: sanitizeText(dealData.customerName) || 'Buyer Client',
      ownerName: sanitizeText(dealData.ownerName) || 'Property Owner',
      propertyId: dealData.propertyId || '',
      propertyTitle: sanitizeText(dealData.propertyTitle) || 'Dehradun Property',
      agentId: activeUser.id,
      agentName: activeUser.name,
      dealValue: val,
      bookingAmount: Math.max(0, Number(dealData.bookingAmount) || 500000),
      commissionPercentage: commPct,
      totalCommission: totComm,
      agentCommissionSplit: agentSplit,
      companyCommissionSplit: Math.max(0, totComm - agentSplit),
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
    const cleanTitle = sanitizeText(post.title) || 'New Real Estate Article';
    const newPost: BlogPost = {
      id: post.id || `post-${Date.now()}`,
      title: cleanTitle,
      slug: post.slug || cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: sanitizeText(post.category) || 'Dehradun Real Estate',
      author: sanitizeText(post.author) || activeUser.name,
      excerpt: sanitizeText(post.excerpt) || '',
      content: sanitizeText(post.content) || '',
      coverImage: post.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
      published: post.published !== undefined ? post.published : true,
      views: Math.max(0, Number(post.views) || 0),
      createdAt: post.createdAt || new Date().toISOString().split('T')[0]
    };
    setBlogPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(p => p.id === id ? { 
      ...p, 
      ...updates,
      title: updates.title !== undefined ? sanitizeText(updates.title) : p.title,
      category: updates.category !== undefined ? sanitizeText(updates.category) : p.category,
      excerpt: updates.excerpt !== undefined ? sanitizeText(updates.excerpt) : p.excerpt,
      content: updates.content !== undefined ? sanitizeText(updates.content) : p.content
    } : p));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
  };

  const addProject = (project: Partial<ConstructionProject>) => {
    const cleanTitle = sanitizeText(project.title) || 'New Construction Project';
    const newProj: ConstructionProject = {
      id: project.id || `proj-${Date.now()}`,
      title: cleanTitle,
      category: (sanitizeText(project.category) as any) || 'Construction',
      location: sanitizeText(project.location) || 'Dehradun',
      completionYear: Math.max(1900, Number(project.completionYear) || 2024),
      status: project.status || 'Completed',
      imageUrl: project.imageUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000',
      description: sanitizeText(project.description) || '',
      scope: sanitizeText(project.scope) || 'Turnkey Execution'
    };
    setProjects(prev => [newProj, ...prev]);
    return newProj;
  };

  const updateProject = (id: string, updates: Partial<ConstructionProject>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addLocation = (loc: Partial<LocationInfo>) => {
    const newLoc: LocationInfo = {
      id: loc.id || `loc-${Date.now()}`,
      name: loc.name || 'New Locality',
      slug: loc.slug || (loc.name || 'locality').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      coverImage: loc.coverImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
      avgPricePerSqft: loc.avgPricePerSqft || 6500,
      description: loc.description || '',
      highlights: loc.highlights || [],
      propertyCount: loc.propertyCount || 0,
      isFeatured: loc.isFeatured ?? true
    };
    setLocations(prev => [...prev, newLoc]);
    return newLoc;
  };

  const updateLocation = (id: string, updates: Partial<LocationInfo>) => {
    setLocations(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const deleteLocation = (id: string) => {
    setLocations(prev => prev.filter(l => l.id !== id));
  };

  const updateBrandTheme = (themeUpdates: Partial<StoreContextType['brandTheme']>) => {
    setBrandTheme((prev: any) => ({ ...prev, ...themeUpdates }));
  };

  const updateHomepageSettings = (settingsUpdates: Partial<StoreContextType['homepageSettings']>) => {
    setHomepageSettings((prev: any) => ({ ...prev, ...settingsUpdates }));
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
      roles,
      activeUser,
      activeRole,
      setActiveRole,
      isAuthenticated,
      login,
      logout,
      addStaff,
      updateStaff,
      changeStaffPassword,
      removeStaff,
      addRole,
      updateRole,
      removeRole,
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
      approveProperty,
      rejectProperty,
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
      updateBlogPost,
      deleteBlogPost,
      addProject,
      updateProject,
      deleteProject,
      addLocation,
      updateLocation,
      deleteLocation,
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
