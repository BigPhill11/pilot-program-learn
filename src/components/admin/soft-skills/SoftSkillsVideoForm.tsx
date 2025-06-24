
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

const videoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  video_url: z.string().url('Valid URL is required'),
  thumbnail_url: z.string().url().optional().or(z.literal('')),
  name: z.string().min(1, 'Instructor name is required'),
  company: z.string().min(1, 'Company is required'),
  duration: z.string().min(1, 'Duration is required'),
  category: z.enum(['interviewing', 'networking', 'professional_communication', 'business_attire', 'workplace_etiquette']),
  course_category: z.enum(['interviewing', 'networking', 'professional_communication', 'business_attire', 'workplace_etiquette', 'career_development', 'leadership', 'teamwork', 'time_management', 'presentation_skills']).optional()
});

export type VideoFormData = z.infer<typeof videoSchema>;

interface SoftSkillsVideoFormProps {
  form: UseFormReturn<VideoFormData>;
  onSubmit: (data: VideoFormData) => void;
  onCancel: () => void;
  editingVideo: any;
  isLoading: boolean;
}

export const SoftSkillsVideoForm: React.FC<SoftSkillsVideoFormProps> = ({
  form,
  onSubmit,
  onCancel,
  editingVideo,
  isLoading
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingVideo ? 'Edit Video' : 'Add New Video'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Video title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Instructor name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 15 min" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="interviewing">Interviewing</SelectItem>
                        <SelectItem value="networking">Networking</SelectItem>
                        <SelectItem value="professional_communication">Professional Communication</SelectItem>
                        <SelectItem value="business_attire">Business Attire</SelectItem>
                        <SelectItem value="workplace_etiquette">Workplace Etiquette</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="course_category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Category (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course category (optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="interviewing">Interviewing</SelectItem>
                        <SelectItem value="networking">Networking</SelectItem>
                        <SelectItem value="professional_communication">Professional Communication</SelectItem>
                        <SelectItem value="business_attire">Business Attire</SelectItem>
                        <SelectItem value="workplace_etiquette">Workplace Etiquette</SelectItem>
                        <SelectItem value="career_development">Career Development</SelectItem>
                        <SelectItem value="leadership">Leadership</SelectItem>
                        <SelectItem value="teamwork">Teamwork</SelectItem>
                        <SelectItem value="time_management">Time Management</SelectItem>
                        <SelectItem value="presentation_skills">Presentation Skills</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Video description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="video_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="thumbnail_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex gap-2">
              <Button 
                type="submit" 
                disabled={isLoading}
              >
                {editingVideo ? 'Update Video' : 'Add Video'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export { videoSchema };
