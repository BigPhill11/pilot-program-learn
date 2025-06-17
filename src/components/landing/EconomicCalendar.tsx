
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface EconomicEvent {
  date: string;
  title: string;
  description: string;
  importance: 'high' | 'medium' | 'low';
}

const economicEvents: EconomicEvent[] = [
  {
    date: '2025-07-15',
    title: 'CPI Release',
    description: 'Consumer Price Index data for inflation tracking',
    importance: 'high'
  },
  {
    date: '2025-07-30',
    title: 'FOMC Meeting',
    description: 'Federal Open Market Committee interest rate decision',
    importance: 'high'
  },
  {
    date: '2025-08-02',
    title: 'Jobs Report',
    description: 'Monthly employment statistics release',
    importance: 'high'
  },
  {
    date: '2025-08-14',
    title: 'Retail Sales',
    description: 'Consumer spending data release',
    importance: 'medium'
  },
  {
    date: '2025-08-28',
    title: 'GDP Report',
    description: 'Quarterly economic growth data',
    importance: 'high'
  }
];

const EconomicCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<EconomicEvent | null>(null);

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const hasEvent = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return economicEvents.find(event => event.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (day: number) => {
    const event = hasEvent(day);
    if (event) {
      setSelectedEvent(event);
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const event = hasEvent(day);
      const isToday = today.getDate() === day && 
                     today.getMonth() === currentMonth && 
                     today.getFullYear() === currentYear;

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`
            p-2 text-center cursor-pointer rounded-lg border transition-colors
            ${event ? 'bg-green-100 border-green-300 hover:bg-green-200' : 'hover:bg-gray-100'}
            ${isToday ? 'ring-2 ring-blue-500' : ''}
          `}
        >
          <span className={`text-sm ${event ? 'font-semibold text-green-700' : ''}`}>
            {day}
          </span>
          {event && (
            <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-1"></div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Economic Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendarDays()}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-sm text-gray-600 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Economic Event</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-blue-500 rounded-full"></div>
                <span>Today</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Details */}
      {selectedEvent && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700">{selectedEvent.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600">{selectedEvent.description}</p>
            <div className="mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                selectedEvent.importance === 'high' ? 'bg-red-100 text-red-700' :
                selectedEvent.importance === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {selectedEvent.importance.toUpperCase()} IMPACT
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EconomicCalendar;
