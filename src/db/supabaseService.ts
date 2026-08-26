// Supabase Backend Sync Service — A2 Realtors CRM
import { supabase } from '../lib/supabase';
import { 
  Property, Lead, Owner, Customer, SiteVisit, 
  FollowUpTask, Deal, BlogPost, ConstructionProject, LocationInfo 
} from '../types';

/**
 * Supabase Storage Image Upload Helper
 * Uploads a File object or Base64/Blob to 'property-images' bucket
 */
export async function uploadPropertyImageToSupabase(file: File | Blob, fileName: string): Promise<string | null> {
  try {
    const filePath = `properties/${Date.now()}_${fileName.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const { data, error } = await supabase.storage
      .from('property-images')
      .upload(filePath, file, { cacheControl: '3600', upsert: true });

    if (error) {
      console.warn('Supabase storage upload fallback:', error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('property-images')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Supabase storage upload error:', err);
    return null;
  }
}

/**
 * 1. PROPERTIES DB OPERATIONS
 */
export async function fetchPropertiesFromSupabase(): Promise<Property[] | null> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return null;

    return data.map(item => ({
      id: item.id,
      propertyCode: item.property_code || item.id,
      title: item.title,
      slug: item.slug || item.id,
      description: item.description || '',
      transactionType: item.transaction_type || 'BUY',
      propertyType: item.property_type || 'INDEPENDENT_HOUSE',
      status: item.status || 'AVAILABLE',
      price: Number(item.price) || 0,
      priceDisplay: item.price_display || `₹${((Number(item.price) || 0) / 100000).toFixed(2)} Lakhs`,
      location: item.location || 'Dehradun',
      address: item.address || 'Dehradun',
      areaSqft: Number(item.area_sqft) || 1500,
      bedrooms: item.bedrooms || 3,
      bathrooms: item.bathrooms || 3,
      constructionStatus: item.construction_status || 'READY_TO_MOVE',
      amenities: item.amenities || ['Parking', 'Power Backup'],
      featured: item.featured || false,
      verified: item.verified || true,
      published: item.published || true,
      images: item.images || [
        { id: 'img-1', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', isPrimary: true }
      ],
      assignedAgentId: item.assigned_agent_id,
      assignedAgentName: item.assigned_agent_name || 'A2 Staff',
      assignedAgentPhone: item.assigned_agent_phone || '+91 84451 90135',
      viewCount: item.view_count || 0,
      enquiryCount: item.enquiry_count || 0,
      createdAt: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    }));
  } catch (err) {
    console.warn('Supabase fetch properties error:', err);
    return null;
  }
}

export async function insertPropertyToSupabase(property: Property): Promise<boolean> {
  try {
    const { error } = await supabase.from('properties').insert([{
      id: property.id,
      property_code: property.propertyCode,
      title: property.title,
      slug: property.slug,
      description: property.description,
      transaction_type: property.transactionType,
      property_type: property.propertyType,
      status: property.status,
      price: property.price,
      price_display: property.priceDisplay,
      location: property.location,
      address: property.address,
      area_sqft: property.areaSqft,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      construction_status: property.constructionStatus,
      amenities: property.amenities,
      featured: property.featured,
      verified: property.verified,
      published: property.published,
      assigned_agent_id: property.assignedAgentId,
      assigned_agent_name: property.assignedAgentName,
      assigned_agent_phone: property.assignedAgentPhone
    }]);

    return !error;
  } catch (err) {
    console.error('Supabase property insert error:', err);
    return false;
  }
}

/**
 * 2. LEADS DB OPERATIONS
 */
export async function fetchLeadsFromSupabase(): Promise<Lead[] | null> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return null;

    return data.map(item => ({
      id: item.id,
      leadCode: item.lead_code || item.id,
      customerName: item.customer_name,
      phone: item.phone,
      whatsapp: item.whatsapp || item.phone,
      email: item.email,
      source: item.source || 'WEBSITE',
      leadType: item.lead_type || 'BUY',
      requirementSummary: item.requirement_summary || '',
      minBudget: Number(item.min_budget) || 5000000,
      maxBudget: Number(item.max_budget) || 15000000,
      preferredLocation: item.preferred_location || 'Dehradun',
      preferredPropertyType: item.preferred_property_type || 'INDEPENDENT_HOUSE',
      preferredBedrooms: item.preferred_bedrooms || 3,
      score: item.score || 80,
      temperature: item.temperature || 'WARM',
      status: item.status || 'NEW',
      assignedAgentId: item.assigned_agent_id,
      assignedAgentName: item.assigned_agent_name || 'Agent',
      createdAt: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      history: []
    }));
  } catch (err) {
    console.warn('Supabase fetch leads error:', err);
    return null;
  }
}

export async function insertLeadToSupabase(lead: Lead): Promise<boolean> {
  try {
    const { error } = await supabase.from('leads').insert([{
      id: lead.id,
      lead_code: lead.leadCode,
      customer_name: lead.customerName,
      phone: lead.phone,
      whatsapp: lead.whatsapp,
      email: lead.email,
      source: lead.source,
      lead_type: lead.leadType,
      requirement_summary: lead.requirementSummary,
      min_budget: lead.minBudget,
      max_budget: lead.maxBudget,
      preferred_location: lead.preferredLocation,
      preferred_property_type: lead.preferredPropertyType,
      preferred_bedrooms: lead.preferredBedrooms,
      score: lead.score,
      temperature: lead.temperature,
      status: lead.status,
      assigned_agent_id: lead.assignedAgentId,
      assigned_agent_name: lead.assignedAgentName
    }]);

    return !error;
  } catch (err) {
    console.error('Supabase lead insert error:', err);
    return false;
  }
}

/**
 * 3. OWNERS & CUSTOMERS DB OPERATIONS
 */
export async function insertOwnerToSupabase(owner: Owner): Promise<boolean> {
  try {
    const { error } = await supabase.from('owners').insert([{
      id: owner.id,
      full_name: owner.fullName,
      phone: owner.phone,
      email: owner.email,
      address: owner.address,
      preferred_communication: owner.preferredCommunication,
      asking_price_notes: owner.askingPriceNotes,
      verification_status: owner.verificationStatus,
      assigned_agent_id: owner.assignedAgentId,
      assigned_agent_name: owner.assignedAgentName
    }]);
    return !error;
  } catch (err) {
    return false;
  }
}

export async function insertCustomerToSupabase(customer: Customer): Promise<boolean> {
  try {
    const { error } = await supabase.from('customers').insert([{
      id: customer.id,
      full_name: customer.fullName,
      phone: customer.phone,
      whatsapp: customer.whatsapp,
      email: customer.email,
      customer_type: customer.customerType,
      assigned_agent_id: customer.assignedAgentId,
      assigned_agent_name: customer.assignedAgentName,
      notes: customer.notes
    }]);
    return !error;
  } catch (err) {
    return false;
  }
}

/**
 * 4. SITE VISITS & FOLLOW UP TASKS
 */
export async function insertSiteVisitToSupabase(visit: SiteVisit): Promise<boolean> {
  try {
    const { error } = await supabase.from('site_visits').insert([{
      id: visit.id,
      lead_id: visit.leadId,
      lead_code: visit.leadCode,
      customer_name: visit.customerName,
      customer_phone: visit.customerPhone,
      property_id: visit.propertyId,
      property_title: visit.propertyTitle,
      property_location: visit.propertyLocation,
      agent_id: visit.agentId,
      agent_name: visit.agentName,
      visit_date: visit.visitDate,
      visit_time: visit.visitTime,
      status: visit.status
    }]);
    return !error;
  } catch (err) {
    return false;
  }
}

export async function insertFollowUpToSupabase(task: FollowUpTask): Promise<boolean> {
  try {
    const { error } = await supabase.from('follow_ups').insert([{
      id: task.id,
      lead_id: task.leadId,
      lead_code: task.leadCode,
      customer_name: task.customerName,
      customer_phone: task.customerPhone,
      assigned_user_id: task.assignedUserId,
      assigned_user_name: task.assignedUserName,
      type: task.type,
      scheduled_at: task.scheduledAt,
      priority: task.priority,
      status: task.status,
      notes: task.notes
    }]);
    return !error;
  } catch (err) {
    return false;
  }
}
