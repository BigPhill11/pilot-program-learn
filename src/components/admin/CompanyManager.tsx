
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Upload, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import CompanyForm from './CompanyForm';
import CompanyList from './CompanyList';
import CSVUploader from './CSVUploader';

export interface Company {
  id: string;
  name: string;
  ticker: string;
  logo_url?: string;
  industry: string;
  headquarters: string;
  market_cap: string;
  revenue_ttm: string;
  pe_ratio: string;
  overview: string;
  kpis: Array<{ title: string; value: string }>;
  financials: Array<{ title: string; value: string }>;
  market_sentiment?: string;
  analyst_sentiment?: string;
  historical_performance?: string;
  sector?: string;
  sub_sector?: string;
  created_at: string;
  updated_at: string;
}

const CompanyManager: React.FC = () => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Convert database format to component format with proper type casting
      const convertedData: Company[] = (data || []).map(company => ({
        id: company.id,
        name: company.name,
        ticker: company.ticker,
        logo_url: company.logo_url,
        industry: company.industry,
        headquarters: company.headquarters,
        market_cap: company.market_cap,
        revenue_ttm: company.revenue_ttm,
        pe_ratio: company.pe_ratio,
        overview: company.overview,
        kpis: Array.isArray(company.kpis) ? 
          company.kpis.filter((kpi): kpi is { title: string; value: string } => 
            typeof kpi === 'object' && kpi !== null && 'title' in kpi && 'value' in kpi &&
            typeof kpi.title === 'string' && typeof kpi.value === 'string'
          ) : [],
        financials: Array.isArray(company.financials) ? 
          company.financials.filter((fin): fin is { title: string; value: string } => 
            typeof fin === 'object' && fin !== null && 'title' in fin && 'value' in fin &&
            typeof fin.title === 'string' && typeof fin.value === 'string'
          ) : [],
        market_sentiment: company.market_sentiment,
        analyst_sentiment: company.analyst_sentiment,
        historical_performance: company.historical_performance,
        sector: company.sector,
        sub_sector: company.sub_sector,
        created_at: company.created_at,
        updated_at: company.updated_at
      }));
      
      setCompanies(convertedData);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast.error('Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  const handleCompanySubmit = async (companyData: Partial<Company>) => {
    try {
      if (editingCompany) {
        const { error } = await supabase
          .from('companies')
          .update({
            ...companyData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingCompany.id);

        if (error) throw error;
        toast.success('Company updated successfully');
      } else {
        const { error } = await supabase
          .from('companies')
          .insert([{
            ...companyData,
            created_by: user?.id
          }]);

        if (error) throw error;
        toast.success('Company added successfully');
      }

      fetchCompanies();
      setShowForm(false);
      setEditingCompany(null);
    } catch (error) {
      console.error('Error saving company:', error);
      toast.error('Failed to save company');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this company?')) return;

    try {
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Company deleted successfully');
      fetchCompanies();
    } catch (error) {
      console.error('Error deleting company:', error);
      toast.error('Failed to delete company');
    }
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const handleCSVUpload = async (csvData: any[]) => {
    try {
      const companiesToInsert = csvData.map(row => {
        // Ensure all required fields have values
        const companyData = {
          name: row.name || row.Company || 'Unknown Company',
          ticker: row.ticker || row.Ticker || row.Symbol || 'N/A',
          industry: row.industry || row.Industry || 'Unknown',
          headquarters: row.headquarters || row.Headquarters || row.HQ || 'Unknown',
          market_cap: row.market_cap || row['Market Cap'] || 'N/A',
          revenue_ttm: row.revenue_ttm || row['Revenue TTM'] || row.Revenue || 'N/A',
          pe_ratio: row.pe_ratio || row['P/E Ratio'] || row.PE || 'N/A',
          overview: row.overview || row.Overview || row.Description || 'No description available',
          kpis: row.kpis ? (typeof row.kpis === 'string' ? JSON.parse(row.kpis) : row.kpis) : [],
          financials: row.financials ? (typeof row.financials === 'string' ? JSON.parse(row.financials) : row.financials) : [],
          market_sentiment: row.market_sentiment || row['Market Sentiment'] || null,
          analyst_sentiment: row.analyst_sentiment || row['Analyst Sentiment'] || null,
          historical_performance: row.historical_performance || row['Historical Performance'] || null,
          sector: row.sector || row.Sector || null,
          sub_sector: row.sub_sector || row['Sub Sector'] || null,
          logo_url: row.logo_url || row['Logo URL'] || null,
          created_by: user?.id
        };
        
        return companyData;
      });

      // Insert each company individually to handle potential errors better
      let successCount = 0;
      let errorCount = 0;
      
      for (const company of companiesToInsert) {
        try {
          const { error } = await supabase
            .from('companies')
            .insert([company]);
          
          if (error) throw error;
          successCount++;
        } catch (error) {
          console.error('Error inserting company:', error);
          errorCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`Successfully uploaded ${successCount} companies`);
      }
      if (errorCount > 0) {
        toast.error(`Failed to upload ${errorCount} companies`);
      }
      
      fetchCompanies();
    } catch (error) {
      console.error('Error uploading CSV:', error);
      toast.error('Failed to upload companies from CSV');
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Please log in to access admin features.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Company Management</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Company</span>
        </Button>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Company List</TabsTrigger>
          <TabsTrigger value="upload">CSV Upload</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <CompanyList
            companies={companies}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>
        
        <TabsContent value="upload" className="space-y-4">
          <CSVUploader onUpload={handleCSVUpload} />
        </TabsContent>
      </Tabs>

      {showForm && (
        <CompanyForm
          company={editingCompany}
          onSubmit={handleCompanySubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingCompany(null);
          }}
        />
      )}
    </div>
  );
};

export default CompanyManager;
