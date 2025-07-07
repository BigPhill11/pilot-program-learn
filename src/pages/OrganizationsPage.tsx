import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Plus, Search, Star, Globe, MapPin, ExternalLink, Users } from 'lucide-react';

const OrganizationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingOrg, setIsAddingOrg] = useState(false);

  // Mock data - will be replaced with real data from hooks
  const organizations = [
    {
      id: '1',
      name: 'TechCorp',
      industry: 'Technology',
      location: 'San Francisco, CA',
      website: 'https://techcorp.com',
      linkedinUrl: 'https://linkedin.com/company/techcorp',
      description: 'Leading AI and machine learning company focused on enterprise solutions.',
      interestLevel: 5,
      notes: 'High growth potential. Strong engineering culture. Looking to expand.',
      contactCount: 3
    },
    {
      id: '2',
      name: 'StartupXYZ',
      industry: 'FinTech',
      location: 'New York, NY',
      website: 'https://startupxyz.com',
      description: 'Innovative fintech startup revolutionizing digital payments.',
      interestLevel: 4,
      notes: 'Early stage but promising technology. Founded by experienced team.',
      contactCount: 1
    },
    {
      id: '3',
      name: 'FinanceInc',
      industry: 'Financial Services',
      location: 'Austin, TX',
      website: 'https://financeinc.com',
      linkedinUrl: 'https://linkedin.com/company/financeinc',
      description: 'Established financial services firm with strong market presence.',
      interestLevel: 3,
      notes: 'Traditional company but modernizing. Good opportunities in tech roles.',
      contactCount: 2
    }
  ];

  const getInterestColor = (level: number) => {
    if (level >= 4) return 'text-green-600';
    if (level >= 3) return 'text-yellow-600';
    return 'text-gray-500';
  };

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Building2 className="h-8 w-8 mr-3" />
            Organizations
          </h1>
          <p className="text-muted-foreground">Track companies and organizations of interest</p>
        </div>
        <Dialog open={isAddingOrg} onOpenChange={setIsAddingOrg}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Organization
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Organization</DialogTitle>
              <DialogDescription>
                Add a company or organization you want to track
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name *</Label>
                <Input id="orgName" placeholder="TechCorp Inc." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" placeholder="Technology" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgLocation">Location</Label>
                  <Input id="orgLocation" placeholder="San Francisco, CA" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" placeholder="https://company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgLinkedin">LinkedIn URL</Label>
                <Input id="orgLinkedin" placeholder="https://linkedin.com/company/techcorp" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interestLevel">Interest Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interest level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Low interest</SelectItem>
                    <SelectItem value="2">2 - Some interest</SelectItem>
                    <SelectItem value="3">3 - Moderate interest</SelectItem>
                    <SelectItem value="4">4 - High interest</SelectItem>
                    <SelectItem value="5">5 - Top priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgDescription">Description</Label>
                <Textarea id="orgDescription" placeholder="What does this organization do?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgNotes">Notes</Label>
                <Textarea id="orgNotes" placeholder="Why are you interested? Key insights, opportunities, etc." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingOrg(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddingOrg(false)}>
                Add Organization
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Organizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrganizations.map((org) => (
          <Card key={org.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{org.name}</CardTitle>
                  <CardDescription>{org.industry}</CardDescription>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < org.interestLevel
                          ? 'fill-blue-400 text-blue-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-2" />
                {org.location}
              </div>
              
              {org.website && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Globe className="h-3 w-3 mr-2" />
                  <a 
                    href={org.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary truncate"
                  >
                    {org.website.replace('https://', '')}
                  </a>
                </div>
              )}

              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-3 w-3 mr-2" />
                {org.contactCount} contact{org.contactCount !== 1 ? 's' : ''}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {org.description}
              </p>

              <Badge variant="outline" className={getInterestColor(org.interestLevel)}>
                Interest Level: {org.interestLevel}/5
              </Badge>

              <div className="flex items-center justify-between pt-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <div className="flex space-x-2">
                  {org.website && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={org.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                  {org.linkedinUrl && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={org.linkedinUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrganizations.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No organizations found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Start tracking companies and organizations that interest you'}
          </p>
          <Button onClick={() => setIsAddingOrg(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Organization
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrganizationsPage;