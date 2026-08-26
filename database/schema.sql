-- =============================================================================
-- A2 REALTORS — FULL PRODUCTION RELATIONAL DATABASE SCHEMA (PostgreSQL / Supabase)
-- Business Location: 25 B, Inder Road, Dalanwala, Dehradun, Uttarakhand 248001
-- Contact: +91 84451 90135
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ROLES & PERMISSIONS
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name, description) VALUES
('SUPER_ADMIN', 'Full system control, configuration, financial reports and audit management'),
('ADMIN', 'Full operational control over properties, leads, CRM, team and CMS'),
('SALES_MANAGER', 'Lead assignment, pipeline oversight, deal approvals and team metrics'),
('AGENT', 'Manage assigned properties, leads, site visits, follow-ups and deals'),
('TELECALLER', 'Lead qualification, call scheduling, initial intake and task logging'),
('MARKETING_MANAGER', 'Campaign performance, lead sources, and website CMS articles'),
('CONTENT_MANAGER', 'Manage website blog posts, project portfolios, and media assets'),
('VIEWER', 'Read-only access to property catalog and basic reports')
ON CONFLICT (name) DO NOTHING;

-- 2. USERS (STAFF & AGENTS)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    whatsapp_number VARCHAR(20),
    role_name VARCHAR(50) REFERENCES roles(name) ON DELETE RESTRICT,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    total_deals_closed INT DEFAULT 0,
    rating NUMERIC(3, 2) DEFAULT 4.9,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. LOCATIONS CATALOG
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    city VARCHAR(100) DEFAULT 'Dehradun',
    state VARCHAR(100) DEFAULT 'Uttarakhand',
    pincode VARCHAR(10),
    description TEXT,
    cover_image_url TEXT,
    avg_price_per_sqft NUMERIC(12, 2),
    is_featured BOOLEAN DEFAULT FALSE,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. PROPERTY OWNERS
CREATE TABLE IF NOT EXISTS owners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    address TEXT,
    preferred_communication VARCHAR(20) DEFAULT 'WhatsApp',
    asking_price_notes TEXT,
    verification_status VARCHAR(50) DEFAULT 'VERIFIED',
    assigned_agent_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. PROPERTIES DATABASE
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_code VARCHAR(20) UNIQUE NOT NULL, -- e.g. A2-1024
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('BUY', 'RENT', 'LEASE')),
    property_type VARCHAR(50) NOT NULL CHECK (property_type IN ('APARTMENT', 'INDEPENDENT_HOUSE', 'VILLA', 'PLOT', 'LAND', 'COMMERCIAL', 'OFFICE', 'SHOP', 'WAREHOUSE', 'FARMHOUSE', 'OTHER')),
    status VARCHAR(30) DEFAULT 'AVAILABLE' CHECK (status IN ('DRAFT', 'AVAILABLE', 'RESERVED', 'UNDER_NEGOTIATION', 'SOLD', 'RENTED', 'INACTIVE')),
    
    price NUMERIC(15, 2) NOT NULL,
    price_display VARCHAR(50),
    monthly_rent NUMERIC(12, 2),
    security_deposit NUMERIC(12, 2),
    
    location_id UUID REFERENCES locations(id) ON DELETE RESTRICT,
    address TEXT NOT NULL,
    landmark VARCHAR(255),
    latitude NUMERIC(10, 8),
    longitude NUMERIC(11, 8),
    
    area_sqft NUMERIC(10, 2) NOT NULL,
    bedrooms INT,
    bathrooms INT,
    balconies INT,
    parking_spaces INT DEFAULT 1,
    floor_number INT,
    total_floors INT,
    furnishing_status VARCHAR(30) DEFAULT 'SEMI_FURNISHED',
    facing_direction VARCHAR(20),
    construction_status VARCHAR(30) DEFAULT 'READY_TO_MOVE',
    construction_year INT,
    possession_date DATE,
    ownership_type VARCHAR(50) DEFAULT 'FREEHOLD',
    
    featured BOOLEAN DEFAULT FALSE,
    verified BOOLEAN DEFAULT TRUE,
    published BOOLEAN DEFAULT TRUE,
    
    owner_id UUID REFERENCES owners(id) ON DELETE SET NULL,
    assigned_agent_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    seo_title VARCHAR(255),
    seo_description TEXT,
    view_count INT DEFAULT 0,
    enquiry_count INT DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. PROPERTY MEDIA & DOCUMENTS
CREATE TABLE IF NOT EXISTS property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS property_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    document_name VARCHAR(255) NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    file_url TEXT NOT NULL,
    visibility VARCHAR(20) DEFAULT 'RESTRICTED' CHECK (visibility IN ('AVAILABLE', 'VERIFIED', 'RESTRICTED', 'PRIVATE')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. CUSTOMERS & CLIENTS
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    whatsapp_number VARCHAR(20),
    email VARCHAR(255),
    customer_type VARCHAR(30) DEFAULT 'BUYER' CHECK (customer_type IN ('BUYER', 'SELLER', 'TENANT', 'LANDLORD', 'INVESTOR', 'DEVELOPER', 'COMMERCIAL_CLIENT')),
    assigned_agent_id UUID REFERENCES users(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. CRM LEADS
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_code VARCHAR(20) UNIQUE NOT NULL, -- e.g. L-1001
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    lead_source VARCHAR(50) NOT NULL DEFAULT 'WEBSITE',
    lead_type VARCHAR(30) DEFAULT 'BUY',
    
    requirement_summary TEXT,
    min_budget NUMERIC(15, 2),
    max_budget NUMERIC(15, 2),
    preferred_location VARCHAR(100),
    preferred_property_type VARCHAR(50),
    preferred_bedrooms INT,
    
    lead_score INT DEFAULT 50,
    temperature VARCHAR(10) DEFAULT 'WARM' CHECK (temperature IN ('HOT', 'WARM', 'COLD')),
    status VARCHAR(30) DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPERTY_SHORTLISTED', 'SITE_VISIT', 'NEGOTIATION', 'BOOKING', 'WON', 'LOST', 'NURTURE')),
    
    assigned_agent_id UUID REFERENCES users(id) ON DELETE SET NULL,
    interested_property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    
    next_follow_up_date TIMESTAMP WITH TIME ZONE,
    last_contact_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. SITE VISITS MANAGEMENT
CREATE TABLE IF NOT EXISTS site_visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    assigned_agent_id UUID REFERENCES users(id) ON DELETE SET NULL,
    visit_date TIMESTAMP WITH TIME ZONE NOT NULL,
    visit_status VARCHAR(20) DEFAULT 'SCHEDULED' CHECK (visit_status IN ('SCHEDULED', 'CONFIRMED', 'COMPLETED', 'RESCHEDULED', 'CANCELLED', 'NO_SHOW')),
    customer_feedback TEXT,
    outcome VARCHAR(50),
    next_action TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. FOLLOW-UPS & TASKS
CREATE TABLE IF NOT EXISTS follow_ups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    assigned_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    follow_up_type VARCHAR(30) DEFAULT 'CALL' CHECK (follow_up_type IN ('CALL', 'WHATSAPP', 'MEETING', 'SITE_VISIT', 'EMAIL', 'REMINDER', 'DOCUMENT_REQUEST')),
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    priority VARCHAR(10) DEFAULT 'HIGH' CHECK (priority IN ('HIGH', 'MEDIUM', 'LOW')),
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'CANCELLED', 'OVERDUE')),
    notes TEXT,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. DEALS & COMMISSIONS
CREATE TABLE IF NOT EXISTS deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_code VARCHAR(20) UNIQUE NOT NULL,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES customers(id) ON DELETE RESTRICT,
    owner_id UUID REFERENCES owners(id) ON DELETE RESTRICT,
    property_id UUID REFERENCES properties(id) ON DELETE RESTRICT,
    assigned_agent_id UUID REFERENCES users(id) ON DELETE RESTRICT,
    
    deal_value NUMERIC(15, 2) NOT NULL,
    booking_amount NUMERIC(15, 2) DEFAULT 0,
    commission_percentage NUMERIC(5, 2) DEFAULT 2.00,
    total_commission NUMERIC(15, 2) NOT NULL,
    agent_commission_split NUMERIC(15, 2) NOT NULL,
    company_commission_split NUMERIC(15, 2) NOT NULL,
    
    stage VARCHAR(30) DEFAULT 'NEGOTIATION' CHECK (stage IN ('NEGOTIATION', 'BOOKING', 'AGREEMENT', 'PAYMENT', 'CLOSING', 'COMPLETED', 'CANCELLED')),
    payment_status VARCHAR(20) DEFAULT 'PARTIAL' CHECK (payment_status IN ('PENDING', 'PARTIAL', 'RECEIVED', 'PAID_TO_AGENT')),
    closing_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. AUDIT & ACTIVITY LOG
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    activity_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. MARKETING CAMPAIGNS
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    channel VARCHAR(50) NOT NULL, -- Google, Meta, WhatsApp, Offline, Referral
    budget NUMERIC(12, 2) DEFAULT 0,
    leads_generated INT DEFAULT 0,
    qualified_leads INT DEFAULT 0,
    deals_closed INT DEFAULT 0,
    revenue_generated NUMERIC(15, 2) DEFAULT 0,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. CMS ARTICLES & PROJECTS
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL,
    author_name VARCHAR(100) DEFAULT 'A2 Realtors Editorial',
    content TEXT NOT NULL,
    excerpt TEXT,
    cover_image_url TEXT,
    published BOOLEAN DEFAULT TRUE,
    views INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- Residential, Commercial, Construction, Renovation
    location VARCHAR(100) NOT NULL,
    completion_year INT,
    status VARCHAR(30) DEFAULT 'COMPLETED',
    image_url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
