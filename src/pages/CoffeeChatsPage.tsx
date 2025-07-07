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
import { Coffee, Plus, Search, Star, Calendar, MapPin, Clock, Building2 } from 'lucide-react';

const CoffeeChatsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingChat, setIsAddingChat] = useState(false);

  // Mock data - will be replaced with real data from hooks
  const coffeeChats = [
    {
      id: '1',
      contactName: 'Sarah Chen',
      company: 'TechCorp',
      dateTime: '2024-01-15T10:00:00',
      location: 'Blue Bottle Coffee, Mission St',
      chatType: 'coffee',
      agenda: 'Discuss product strategy trends and potential collaboration',
      notes: 'Great conversation about AI in product development. Sarah shared insights about scaling product teams. Discussed potential mentorship opportunity.',
      followUpActions: 'Send her the article about product metrics we discussed. Schedule follow-up in 3 months.',
      rating: 5
    },
    {
      id: '2',
      contactName: 'John Smith',
      company: 'StartupXYZ',
      dateTime: '2024-01-10T14:30:00',
      location: 'Virtual - Zoom',
      chatType: 'video',
      agenda: 'Learn about fintech startup landscape',
      notes: 'John explained their approach to digital payments and regulatory challenges. Startup is growing rapidly but facing scaling issues.',
      followUpActions: 'Introduce him to our DevOps consultant. Follow up about their hiring needs.',
      rating: 4
    },
    {
      id: '3',
      contactName: 'Maria Garcia',
      company: 'FinanceInc',
      dateTime: '2024-01-20T12:00:00',
      location: 'The Capital Grille',
      chatType: 'lunch',
      agenda: 'Explore opportunities in fintech engineering',
      notes: 'Maria provided excellent insights into traditional finance transformation. Company is actively modernizing their tech stack.',
      followUpActions: 'Send resume for their senior engineer position. Connect her with Alex from our network.',
      rating: 5
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getChatTypeIcon = (type: string) => {
    switch (type) {
      case 'coffee': return <Coffee className="h-4 w-4" />;
      case 'lunch': return <Coffee className="h-4 w-4" />;
      case 'video': return <Coffee className="h-4 w-4" />;
      default: return <Coffee className="h-4 w-4" />;
    }
  };

  const getChatTypeLabel = (type: string) => {
    switch (type) {
      case 'coffee': return 'Coffee Chat';
      case 'lunch': return 'Lunch Meeting';
      case 'video': return 'Video Call';
      case 'call': return 'Phone Call';
      case 'networking_event': return 'Networking Event';
      default: return 'Meeting';
    }
  };

  const filteredChats = coffeeChats.filter(chat =>
    chat.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Coffee className="h-8 w-8 mr-3" />
            Coffee Chats
          </h1>
          <p className="text-muted-foreground">Track your networking meetings and conversations</p>
        </div>
        <Dialog open={isAddingChat} onOpenChange={setIsAddingChat}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Coffee Chat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Coffee Chat</DialogTitle>
              <DialogDescription>
                Record details from your networking meeting
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="contactSelect">Contact *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a contact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah Chen - TechCorp</SelectItem>
                    <SelectItem value="john">John Smith - StartupXYZ</SelectItem>
                    <SelectItem value="maria">Maria Garcia - FinanceInc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chatDate">Date *</Label>
                  <Input id="chatDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chatTime">Time *</Label>
                  <Input id="chatTime" type="time" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Blue Bottle Coffee, Mission St" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chatType">Meeting Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coffee">Coffee Chat</SelectItem>
                    <SelectItem value="lunch">Lunch Meeting</SelectItem>
                    <SelectItem value="call">Phone Call</SelectItem>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="networking_event">Networking Event</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="agenda">Agenda</Label>
                <Textarea id="agenda" placeholder="What did you plan to discuss?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chatNotes">Meeting Notes</Label>
                <Textarea id="chatNotes" placeholder="Key points discussed, insights gained, etc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="followUpActions">Follow-up Actions</Label>
                <Textarea id="followUpActions" placeholder="What needs to be done next?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Meeting Rating</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Rate the meeting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Not useful</SelectItem>
                    <SelectItem value="2">2 - Somewhat useful</SelectItem>
                    <SelectItem value="3">3 - Moderately useful</SelectItem>
                    <SelectItem value="4">4 - Very useful</SelectItem>
                    <SelectItem value="5">5 - Extremely valuable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingChat(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddingChat(false)}>
                Save Coffee Chat
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search coffee chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Coffee Chats List */}
      <div className="space-y-4">
        {filteredChats.map((chat) => (
          <Card key={chat.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{getInitials(chat.contactName)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{chat.contactName}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Building2 className="h-3 w-3 mr-1" />
                      {chat.company}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="flex items-center space-x-1">
                    {getChatTypeIcon(chat.chatType)}
                    <span>{getChatTypeLabel(chat.chatType)}</span>
                  </Badge>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < chat.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(chat.dateTime).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {new Date(chat.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {chat.location}
                </div>
              </div>

              {chat.agenda && (
                <div>
                  <h4 className="font-medium mb-1">Agenda</h4>
                  <p className="text-sm text-muted-foreground">{chat.agenda}</p>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-1">Meeting Notes</h4>
                <p className="text-sm text-muted-foreground">{chat.notes}</p>
              </div>

              {chat.followUpActions && (
                <div>
                  <h4 className="font-medium mb-1">Follow-up Actions</h4>
                  <p className="text-sm text-muted-foreground">{chat.followUpActions}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Schedule Follow-up
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredChats.length === 0 && (
        <div className="text-center py-12">
          <Coffee className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No coffee chats found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Start recording your networking meetings and conversations'}
          </p>
          <Button onClick={() => setIsAddingChat(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Coffee Chat
          </Button>
        </div>
      )}
    </div>
  );
};

export default CoffeeChatsPage;