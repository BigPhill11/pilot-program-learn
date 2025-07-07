-- Create contacts table for storing networking connections
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  linkedin_url TEXT,
  company TEXT,
  job_title TEXT,
  location TEXT,
  notes TEXT,
  tags TEXT[],
  relationship_strength INTEGER DEFAULT 1 CHECK (relationship_strength >= 1 AND relationship_strength <= 5),
  last_contact_date DATE,
  next_follow_up_date DATE,
  contact_frequency_days INTEGER DEFAULT 14,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create organizations table for companies/organizations of interest
CREATE TABLE public.organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  industry TEXT,
  location TEXT,
  website TEXT,
  linkedin_url TEXT,
  description TEXT,
  interest_level INTEGER DEFAULT 1 CHECK (interest_level >= 1 AND interest_level <= 5),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create coffee_chats table for tracking meeting notes
CREATE TABLE public.coffee_chats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE,
  date_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  chat_type TEXT DEFAULT 'coffee' CHECK (chat_type IN ('coffee', 'lunch', 'call', 'video', 'networking_event', 'other')),
  agenda TEXT,
  notes TEXT,
  follow_up_actions TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create follow_up_reminders table for tracking reminders
CREATE TABLE public.follow_up_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE,
  reminder_date DATE NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'snoozed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coffee_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_up_reminders ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for contacts
CREATE POLICY "Users can view their own contacts" 
ON public.contacts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own contacts" 
ON public.contacts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contacts" 
ON public.contacts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contacts" 
ON public.contacts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for organizations
CREATE POLICY "Users can view their own organizations" 
ON public.organizations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own organizations" 
ON public.organizations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own organizations" 
ON public.organizations 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own organizations" 
ON public.organizations 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for coffee_chats
CREATE POLICY "Users can view their own coffee chats" 
ON public.coffee_chats 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own coffee chats" 
ON public.coffee_chats 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own coffee chats" 
ON public.coffee_chats 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own coffee chats" 
ON public.coffee_chats 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for follow_up_reminders
CREATE POLICY "Users can view their own reminders" 
ON public.follow_up_reminders 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reminders" 
ON public.follow_up_reminders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders" 
ON public.follow_up_reminders 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders" 
ON public.follow_up_reminders 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_contacts_updated_at
BEFORE UPDATE ON public.contacts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at
BEFORE UPDATE ON public.organizations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_coffee_chats_updated_at
BEFORE UPDATE ON public.coffee_chats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_follow_up_reminders_updated_at
BEFORE UPDATE ON public.follow_up_reminders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_contacts_user_id ON public.contacts(user_id);
CREATE INDEX idx_contacts_next_follow_up ON public.contacts(next_follow_up_date);
CREATE INDEX idx_organizations_user_id ON public.organizations(user_id);
CREATE INDEX idx_coffee_chats_user_id ON public.coffee_chats(user_id);
CREATE INDEX idx_coffee_chats_contact_id ON public.coffee_chats(contact_id);
CREATE INDEX idx_follow_up_reminders_user_id ON public.follow_up_reminders(user_id);
CREATE INDEX idx_follow_up_reminders_date ON public.follow_up_reminders(reminder_date);