import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Building2, Coffee, Bell, TrendingUp, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  // Mock data - will be replaced with real data from hooks
  const stats = {
    totalContacts: 45,
    totalOrganizations: 12,
    totalCoffeeChats: 28,
    pendingFollowUps: 7,
    thisWeekMeetings: 3,
    strongConnections: 18
  };

  const recentActivity = [
    { type: 'coffee_chat', name: 'Sarah Chen', company: 'TechCorp', date: '2 days ago' },
    { type: 'follow_up', name: 'John Smith', company: 'StartupXYZ', date: '3 days ago' },
    { type: 'new_contact', name: 'Maria Garcia', company: 'FinanceInc', date: '1 week ago' },
  ];

  const upcomingReminders = [
    { name: 'Alex Johnson', company: 'DataCorp', dueDate: 'Today', type: 'follow_up' },
    { name: 'Lisa Wong', company: 'DevStudio', dueDate: 'Tomorrow', type: 'coffee_chat' },
    { name: 'Mike Brown', company: 'GrowthCo', dueDate: 'Friday', type: 'follow_up' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your networking overview.</p>
        </div>
        <Button onClick={() => navigate('/contacts')}>
          <Users className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContacts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.strongConnections} strong connections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrganizations}</div>
            <p className="text-xs text-muted-foreground">
              Companies you're tracking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coffee Chats</CardTitle>
            <Coffee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCoffeeChats}</div>
            <p className="text-xs text-muted-foreground">
              {stats.thisWeekMeetings} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Follow-ups</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingFollowUps}</div>
            <p className="text-xs text-muted-foreground">
              Requires your attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+12%</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              Response rate
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest networking interactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.name}</p>
                  <p className="text-xs text-muted-foreground">{activity.company}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type.replace('_', ' ')}
                </Badge>
                <span className="text-xs text-muted-foreground">{activity.date}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Reminders */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Reminders</CardTitle>
            <CardDescription>Don't miss these follow-ups</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingReminders.map((reminder, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{reminder.name}</p>
                  <p className="text-xs text-muted-foreground">{reminder.company}</p>
                </div>
                <div className="text-right">
                  <Badge variant={reminder.dueDate === 'Today' ? 'destructive' : 'outline'}>
                    {reminder.dueDate}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {reminder.type.replace('_', ' ')}
                  </p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              View All Reminders
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;