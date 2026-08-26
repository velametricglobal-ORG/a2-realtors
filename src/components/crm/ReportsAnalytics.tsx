import React from 'react';
import { BarChart3, Download, Printer, FileSpreadsheet } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ReportsAnalytics: React.FC = () => {
  const { leads, properties, siteVisits, deals } = useStore();

  const handleExportCSV = (type: string) => {
    let headers: string[] = [];
    let rows: string[][] = [];

    if (type === 'LEADS') {
      headers = ['Lead Code', 'Client Name', 'Phone', 'Locality', 'Max Budget', 'Status', 'Score'];
      rows = leads.map(l => [l.leadCode, l.customerName, l.phone, l.preferredLocation, l.maxBudget.toString(), l.status, l.score.toString()]);
    } else if (type === 'PROPERTIES') {
      headers = ['Property Code', 'Title', 'Price', 'Location', 'Area Sqft', 'Status'];
      rows = properties.map(p => [p.propertyCode, p.title, p.price.toString(), p.location, p.areaSqft.toString(), p.status]);
    } else {
      headers = ['Deal Code', 'Buyer', 'Owner', 'Value', 'Commission', 'Stage'];
      rows = deals.map(d => [d.dealCode, d.customerName, d.ownerName, d.dealValue.toString(), d.totalCommission.toString(), d.stage]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `A2_Realtors_${type}_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>CRM Reports & Export Studio</h1>
        <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
          Downloadable CSV, Excel, and printable PDF executive audit reports.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Leads Report */}
        <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginBottom: '0.5rem' }}>Leads & Conversion Report</h3>
          <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.25rem' }}>
            Includes all {leads.length} leads with contact details, budgets, lead scores, and status stages.
          </p>
          <button onClick={() => handleExportCSV('LEADS')} className="btn btn-primary btn-sm flex items-center gap-1 w-full" style={{ width: '100%' }}>
            <Download size={14} /> Download Leads CSV
          </button>
        </div>

        {/* Property Inventory Report */}
        <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginBottom: '0.5rem' }}>Property Inventory Audit</h3>
          <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.25rem' }}>
            Includes all {properties.length} properties with price benchmarks, view counts, and status.
          </p>
          <button onClick={() => handleExportCSV('PROPERTIES')} className="btn btn-primary btn-sm flex items-center gap-1 w-full" style={{ width: '100%' }}>
            <Download size={14} /> Download Properties CSV
          </button>
        </div>

        {/* Financial Deals Report */}
        <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginBottom: '0.5rem' }}>Deals & Commission Report</h3>
          <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.25rem' }}>
            Financial report of {deals.length} active deals, gross commissions, and agent payouts.
          </p>
          <button onClick={() => handleExportCSV('DEALS')} className="btn btn-primary btn-sm flex items-center gap-1 w-full" style={{ width: '100%' }}>
            <Download size={14} /> Download Deals CSV
          </button>
        </div>

      </div>

    </div>
  );
};
