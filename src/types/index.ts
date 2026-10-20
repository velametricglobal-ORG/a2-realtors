// Types & Interfaces for A2 Realtors Platform

export type TransactionType = 'BUY' | 'RENT' | 'LEASE';

export type PropertyType = 
  | 'APARTMENT'
  | 'INDEPENDENT_HOUSE'
  | 'VILLA'
  | 'PLOT'
  | 'LAND'
  | 'COMMERCIAL'
  | 'OFFICE'
  | 'SHOP'
  | 'WAREHOUSE'
  | 'FARMHOUSE'
  | 'OTHER';

export type PropertyStatus = 
  | 'DRAFT'
  | 'PENDING_APPROVAL'
  | 'AVAILABLE'
  | 'RESERVED'
  | 'UNDER_NEGOTIATION'
  | 'SOLD'
  | 'RENTED'
  | 'REJECTED'
  | 'INACTIVE';

export interface PropertyImage {
  id: string;
  url: string;
  caption?: string;
  isPrimary?: boolean;
}

export interface PropertyDocument {
  id: string;
  name: string;
  type: string;
  fileUrl: string;
  visibility: 'AVAILABLE' | 'VERIFIED' | 'RESTRICTED' | 'PRIVATE';
}

export interface Property {
  id: string;
  propertyCode: string; // e.g. A2-1024
  title: string;
  slug: string;
  description: string;
  transactionType: TransactionType;
  propertyType: PropertyType;
  status: PropertyStatus;
  price: number;
  priceDisplay: string;
  monthlyRent?: number;
  securityDeposit?: number;
  location: string;
  address: string;
  landmark?: string;
  areaSqft: number;
  bedrooms?: number;
  bathrooms?: number;
  balconies?: number;
  parkingSpaces?: number;
  floorNumber?: number;
  totalFloors?: number;
  furnishingStatus?: 'UNFURNISHED' | 'SEMI_FURNISHED' | 'FULLY_FURNISHED';
  facingDirection?: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | 'NORTH_EAST' | 'NORTH_WEST' | 'SOUTH_EAST' | 'SOUTH_WEST';
  constructionStatus: 'READY_TO_MOVE' | 'UNDER_CONSTRUCTION' | 'RESALE' | 'NEW';
  constructionYear?: number;
  possessionDate?: string;
  amenities: string[];
  featured: boolean;
  verified: boolean;
  published: boolean;
  approvalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  submittedBy?: {
    name: string;
    phone: string;
    email?: string;
    submittedAt: string;
  };
  images: PropertyImage[];
  documents?: PropertyDocument[];
  videoUrl?: string;
  floorPlanUrl?: string;
  ownerId?: string;
  assignedAgentId?: string;
  assignedAgentName?: string;
  assignedAgentPhone?: string;
  viewCount: number;
  enquiryCount: number;
  createdAt: string;
  isDemo?: boolean;
}

export type LeadStatus = 
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'PROPERTY_SHORTLISTED'
  | 'SITE_VISIT'
  | 'NEGOTIATION'
  | 'BOOKING'
  | 'WON'
  | 'LOST'
  | 'NURTURE';

export type LeadTemperature = 'HOT' | 'WARM' | 'COLD';

export interface Lead {
  id: string;
  leadCode: string; // e.g. L-1001
  customerName: string;
  phone: string;
  whatsapp: string;
  email?: string;
  source: 'WEBSITE' | 'GOOGLE' | 'WHATSAPP' | 'PHONE' | 'FACEBOOK' | 'INSTAGRAM' | 'REFERRAL' | 'WALK_IN' | 'CAMPAIGN';
  leadType: TransactionType;
  requirementSummary: string;
  minBudget: number;
  maxBudget: number;
  preferredLocation: string;
  preferredPropertyType: PropertyType;
  preferredBedrooms?: number;
  score: number;
  temperature: LeadTemperature;
  status: LeadStatus;
  assignedAgentId: string;
  assignedAgentName: string;
  interestedPropertyId?: string;
  interestedPropertyTitle?: string;
  nextFollowUpDate?: string;
  lastContactDate?: string;
  createdAt: string;
  notes?: string;
  history: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  type: string;
  description: string;
  user: string;
}

export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  whatsapp: string;
  email?: string;
  customerType: 'BUYER' | 'SELLER' | 'TENANT' | 'LANDLORD' | 'INVESTOR' | 'DEVELOPER' | 'COMMERCIAL_CLIENT';
  assignedAgentId: string;
  assignedAgentName: string;
  notes?: string;
  createdAt: string;
  totalEnquiries: number;
  totalVisits: number;
}

export interface Owner {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  preferredCommunication: string;
  propertiesOwned: string[]; // Property IDs
  askingPriceNotes?: string;
  verificationStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  assignedAgentId: string;
  assignedAgentName: string;
  createdAt: string;
}

export type SiteVisitStatus = 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'RESCHEDULED' | 'CANCELLED' | 'NO_SHOW';

export interface SiteVisit {
  id: string;
  leadId: string;
  leadCode: string;
  customerName: string;
  customerPhone: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  agentId: string;
  agentName: string;
  visitDate: string;
  visitTime: string;
  status: SiteVisitStatus;
  customerFeedback?: string;
  outcome?: string;
  nextAction?: string;
  createdAt: string;
}

export interface FollowUpTask {
  id: string;
  leadId: string;
  leadCode: string;
  customerName: string;
  customerPhone: string;
  assignedUserId: string;
  assignedUserName: string;
  type: 'CALL' | 'WHATSAPP' | 'MEETING' | 'SITE_VISIT' | 'EMAIL' | 'REMINDER' | 'DOCUMENT_REQUEST';
  scheduledAt: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'OVERDUE';
  notes?: string;
  completedAt?: string;
}

export type DealStage = 'NEGOTIATION' | 'BOOKING' | 'AGREEMENT' | 'PAYMENT' | 'CLOSING' | 'COMPLETED' | 'CANCELLED';

export interface Deal {
  id: string;
  dealCode: string;
  leadId: string;
  customerName: string;
  ownerName: string;
  propertyId: string;
  propertyTitle: string;
  agentId: string;
  agentName: string;
  dealValue: number;
  bookingAmount: number;
  commissionPercentage: number;
  totalCommission: number;
  agentCommissionSplit: number;
  companyCommissionSplit: number;
  stage: DealStage;
  paymentStatus: 'PENDING' | 'PARTIAL' | 'RECEIVED' | 'PAID_TO_AGENT';
  closingDate: string;
  createdAt: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  channel: 'Google' | 'Meta' | 'WhatsApp' | 'Offline' | 'Referral' | 'Website';
  budget: number;
  leadsGenerated: number;
  qualifiedLeads: number;
  dealsClosed: number;
  revenueGenerated: number;
  roiPercentage: number;
  startDate: string;
  endDate: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  content: string;
  excerpt: string;
  coverImage: string;
  published: boolean;
  views: number;
  createdAt: string;
}

export interface ConstructionProject {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Construction' | 'Renovation' | 'Land Development';
  location: string;
  completionYear: number;
  status: 'Completed' | 'In Progress' | 'Planned';
  imageUrl: string;
  description: string;
  scope: string;
}

export interface LocationInfo {
  id: string;
  name: string;
  slug: string;
  avgPricePerSqft: number;
  propertyCount: number;
  coverImage: string;
  description: string;
  isFeatured: boolean;
  highlights?: string[];
}

export type UserRole = 
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'SALES_MANAGER'
  | 'AGENT'
  | 'TELECALLER'
  | 'MARKETING_MANAGER'
  | 'CONTENT_MANAGER'
  | 'VIEWER'
  | string;

export interface RolePermissions {
  viewLeads: boolean;
  editLeads: boolean;
  deleteLeads: boolean;
  manageProperties: boolean;
  viewFinances: boolean;
  editCMS: boolean;
  manageStaff: boolean;
}

export interface UserRoleDefinition {
  id: string;
  name: string;
  roleKey: string;
  description: string;
  permissions: RolePermissions;
  isSystem?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  password?: string;
  avatar: string;
  rating: number;
  dealsClosed: number;
  createdAt?: string;
}

export interface HomepageSettings {
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
  showAboutSection?: boolean;
  showDirectorMessage?: boolean;
  showWhyChooseUs?: boolean;
  showWhatWeDo: boolean;
  showTestimonials: boolean;
  showContactForm: boolean;
  showLatestArticles: boolean;

  // Property Display Grid, Columns, Rows & Spacing Controls
  propertyGridCols: number; // 2, 3, 4, 6
  maxPropertiesCount: number; // 4, 6, 8, 12, 16
  sectionPaddingY: string; // '2.5rem' | '4.5rem' | '6.5rem'
  gridGap: string; // '1rem' | '1.5rem' | '2rem'
  cardPadding: string; // '0.75rem' | '1rem' | '1.25rem'

  // Director Information
  directorName?: string;
  directorRole?: string;
  directorPhoto?: string;
  directorQuote?: string;
  directorVision?: string;
}

