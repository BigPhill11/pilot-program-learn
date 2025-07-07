import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Plus, Search, Star, Building2, Mail, Phone, Calendar, ExternalLink, Coffee } from 'lucide-react';

const ContactsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingContact, setIsAddingContact] = useState(false);

  // Mock data - will be replaced with real data from hooks
  const contacts = [
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Chen',
      email: 'sarah.chen@techcorp.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp',
      jobTitle: 'Senior Product Manager',
      location: 'San Francisco, CA',
      relationshipStrength: 4,
      lastContactDate: '2024-01-15',
      nextFollowUpDate: '2024-02-15',
      tags: ['product', 'tech', 'mentor'],
      notes: 'Met at tech conference. Very knowledgeable about product strategy.',
      linkedinUrl: 'https://linkedin.com/in/sarahchen'
    },
    {
      id: '2',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@startupxyz.com',
      company: 'StartupXYZ',
      jobTitle: 'Co-founder & CEO',
      location: 'New York, NY',
      relationshipStrength: 3,
      lastContactDate: '2024-01-10',
      nextFollowUpDate: '2024-02-01',
      tags: ['startup', 'founder', 'ai'],
      notes: 'Introduced by mutual friend. Interested in AI applications.'
    },
    {
      id: '3',
      firstName: 'Maria',
      lastName: 'Garcia',
      email: 'maria.garcia@financeinc.com',
      company: 'FinanceInc',
      jobTitle: 'VP of Engineering',
      location: 'Austin, TX',
      relationshipStrength: 5,
      lastContactDate: '2024-01-20',
      nextFollowUpDate: '2024-02-20',
      tags: ['finance', 'engineering', 'leadership'],
      notes: 'Strong technical leader with fintech experience.'
    }
  ];

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const getStrengthColor = (strength: number) => {
    if (strength >= 4) return 'bg-green-500';
    if (strength >= 3) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const filteredContacts = contacts.filter(contact =>
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Users className="h-8 w-8 mr-3" />
            Contacts
          </h1>
          <p className="text-muted-foreground">Manage your professional network</p>
        </div>
        <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Contact</DialogTitle>
              <DialogDescription>
                Add a new person to your professional network
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="TechCorp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" placeholder="Software Engineer" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="San Francisco, CA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input id="linkedinUrl" placeholder="https://linkedin.com/in/johndoe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationshipStrength">Relationship Strength</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select strength" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Just met</SelectItem>
                    <SelectItem value="2">2 - Acquaintance</SelectItem>
                    <SelectItem value="3">3 - Professional contact</SelectItem>
                    <SelectItem value="4">4 - Strong connection</SelectItem>
                    <SelectItem value="5">5 - Close professional relationship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input id="tags" placeholder="tech, startup, mentor" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="How you met, key interests, etc." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingContact(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddingContact(false)}>
                Add Contact
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
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>{getInitials(contact.firstName, contact.lastName)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">
                    {contact.firstName} {contact.lastName}
                  </CardTitle>
                  <CardDescription className="flex items-center">
                    <Building2 className="h-3 w-3 mr-1" />
                    {contact.jobTitle} at {contact.company}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < contact.relationshipStrength
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-3 w-3 mr-2" />
                {contact.email || 'No email'}
              </div>
              {contact.phone && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-3 w-3 mr-2" />
                  {contact.phone}
                </div>
              )}
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-3 w-3 mr-2" />
                Last contact: {new Date(contact.lastContactDate).toLocaleDateString()}
              </div>
              {contact.tags && (
                <div className="flex flex-wrap gap-1">
                  {contact.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between pt-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <div className="flex space-x-2">
                  {contact.linkedinUrl && (
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Coffee className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No contacts found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Start building your network by adding your first contact'}
          </p>
          <Button onClick={() => setIsAddingContact(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;