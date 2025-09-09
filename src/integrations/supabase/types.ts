export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string
          created_at: string
          criteria: Json
          description: string
          icon: string
          id: string
          name: string
          points: number
          rarity: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          criteria: Json
          description: string
          icon: string
          id?: string
          name: string
          points?: number
          rarity?: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          criteria?: Json
          description?: string
          icon?: string
          id?: string
          name?: string
          points?: number
          rarity?: string
          updated_at?: string
        }
        Relationships: []
      }
      ai_recommendations: {
        Row: {
          confidence_score: number
          created_at: string
          description: string
          expires_at: string | null
          id: string
          is_dismissed: boolean | null
          is_read: boolean | null
          reasoning: string | null
          recommendation_type: string
          recommended_item_id: string | null
          title: string
          user_id: string
        }
        Insert: {
          confidence_score?: number
          created_at?: string
          description: string
          expires_at?: string | null
          id?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          reasoning?: string | null
          recommendation_type: string
          recommended_item_id?: string | null
          title: string
          user_id: string
        }
        Update: {
          confidence_score?: number
          created_at?: string
          description?: string
          expires_at?: string | null
          id?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          reasoning?: string | null
          recommendation_type?: string
          recommended_item_id?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      career_videos: {
        Row: {
          career_id: string
          created_at: string
          created_by: string | null
          description: string | null
          duration: string
          id: string
          level: number
          speaker_type: string
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string
        }
        Insert: {
          career_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration: string
          id?: string
          level: number
          speaker_type: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_url: string
        }
        Update: {
          career_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration?: string
          id?: string
          level?: number
          speaker_type?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string
        }
        Relationships: []
      }
      coffee_chats: {
        Row: {
          agenda: string | null
          chat_type: string | null
          contact_id: string | null
          created_at: string
          date_time: string
          follow_up_actions: string | null
          id: string
          location: string | null
          notes: string | null
          rating: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          agenda?: string | null
          chat_type?: string | null
          contact_id?: string | null
          created_at?: string
          date_time: string
          follow_up_actions?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          rating?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          agenda?: string | null
          chat_type?: string | null
          contact_id?: string | null
          created_at?: string
          date_time?: string
          follow_up_actions?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          rating?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coffee_chats_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_votes: {
        Row: {
          comment_id: string
          created_at: string
          id: string
          user_id: string
          vote_type: string
        }
        Insert: {
          comment_id: string
          created_at?: string
          id?: string
          user_id: string
          vote_type: string
        }
        Update: {
          comment_id?: string
          created_at?: string
          id?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_votes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "video_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          analyst_sentiment: string | null
          created_at: string
          created_by: string | null
          financials: Json
          headquarters: string
          historical_performance: string | null
          id: string
          industry: string
          kpis: Json
          logo_url: string | null
          market_cap: string
          market_sentiment: string | null
          name: string
          overview: string
          pe_ratio: string
          revenue_ttm: string
          sector: string | null
          sub_sector: string | null
          ticker: string
          updated_at: string
        }
        Insert: {
          analyst_sentiment?: string | null
          created_at?: string
          created_by?: string | null
          financials?: Json
          headquarters: string
          historical_performance?: string | null
          id?: string
          industry: string
          kpis?: Json
          logo_url?: string | null
          market_cap: string
          market_sentiment?: string | null
          name: string
          overview: string
          pe_ratio: string
          revenue_ttm: string
          sector?: string | null
          sub_sector?: string | null
          ticker: string
          updated_at?: string
        }
        Update: {
          analyst_sentiment?: string | null
          created_at?: string
          created_by?: string | null
          financials?: Json
          headquarters?: string
          historical_performance?: string | null
          id?: string
          industry?: string
          kpis?: Json
          logo_url?: string | null
          market_cap?: string
          market_sentiment?: string | null
          name?: string
          overview?: string
          pe_ratio?: string
          revenue_ttm?: string
          sector?: string | null
          sub_sector?: string | null
          ticker?: string
          updated_at?: string
        }
        Relationships: []
      }
      consulting_module_progress: {
        Row: {
          created_at: string
          id: string
          last_accessed: string
          level: number
          mini_games_progress: Json
          overview_completed: boolean
          terms_progress: Json
          total_progress: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_accessed?: string
          level: number
          mini_games_progress?: Json
          overview_completed?: boolean
          terms_progress?: Json
          total_progress?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_accessed?: string
          level?: number
          mini_games_progress?: Json
          overview_completed?: boolean
          terms_progress?: Json
          total_progress?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company: string | null
          contact_frequency_days: number | null
          created_at: string
          email: string | null
          first_name: string
          id: string
          job_title: string | null
          last_contact_date: string | null
          last_name: string
          linkedin_url: string | null
          location: string | null
          next_follow_up_date: string | null
          notes: string | null
          phone: string | null
          relationship_strength: number | null
          tags: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company?: string | null
          contact_frequency_days?: number | null
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          job_title?: string | null
          last_contact_date?: string | null
          last_name: string
          linkedin_url?: string | null
          location?: string | null
          next_follow_up_date?: string | null
          notes?: string | null
          phone?: string | null
          relationship_strength?: number | null
          tags?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company?: string | null
          contact_frequency_days?: number | null
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          job_title?: string | null
          last_contact_date?: string | null
          last_name?: string
          linkedin_url?: string | null
          location?: string | null
          next_follow_up_date?: string | null
          notes?: string | null
          phone?: string | null
          relationship_strength?: number | null
          tags?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          participant_1: string
          participant_2: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          participant_1: string
          participant_2: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          participant_1?: string
          participant_2?: string
          updated_at?: string
        }
        Relationships: []
      }
      daily_logins: {
        Row: {
          created_at: string
          id: string
          login_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          login_date?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          login_date?: string
          user_id?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: []
      }
      financial_terms_database: {
        Row: {
          analogy: string | null
          category: string
          created_at: string
          created_by: string | null
          definition: string
          difficulty_level: string
          example_usage: string | null
          id: string
          real_world_example: string | null
          related_terms: string[] | null
          source: string | null
          status: string
          tags: string[] | null
          term: string
          updated_at: string
        }
        Insert: {
          analogy?: string | null
          category?: string
          created_at?: string
          created_by?: string | null
          definition: string
          difficulty_level?: string
          example_usage?: string | null
          id?: string
          real_world_example?: string | null
          related_terms?: string[] | null
          source?: string | null
          status?: string
          tags?: string[] | null
          term: string
          updated_at?: string
        }
        Update: {
          analogy?: string | null
          category?: string
          created_at?: string
          created_by?: string | null
          definition?: string
          difficulty_level?: string
          example_usage?: string | null
          id?: string
          real_world_example?: string | null
          related_terms?: string[] | null
          source?: string | null
          status?: string
          tags?: string[] | null
          term?: string
          updated_at?: string
        }
        Relationships: []
      }
      follow_up_reminders: {
        Row: {
          contact_id: string | null
          created_at: string
          id: string
          message: string | null
          reminder_date: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          contact_id?: string | null
          created_at?: string
          id?: string
          message?: string | null
          reminder_date: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          contact_id?: string | null
          created_at?: string
          id?: string
          message?: string | null
          reminder_date?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follow_up_reminders_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      group_memberships: {
        Row: {
          group_id: string
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string
          role?: string
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_memberships_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "industry_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      industry_groups: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          icon: string | null
          id: string
          member_count: number | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          icon?: string | null
          id?: string
          member_count?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          icon?: string | null
          id?: string
          member_count?: number | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      initial_assessments: {
        Row: {
          assigned_version: string | null
          calculated_score: number
          completed_at: string | null
          id: string
          responses: Json
          user_id: string | null
        }
        Insert: {
          assigned_version?: string | null
          calculated_score: number
          completed_at?: string | null
          id?: string
          responses: Json
          user_id?: string | null
        }
        Update: {
          assigned_version?: string | null
          calculated_score?: number
          completed_at?: string | null
          id?: string
          responses?: Json
          user_id?: string | null
        }
        Relationships: []
      }
      intro_templates: {
        Row: {
          created_at: string
          id: string
          success_rate: number | null
          template_content: string
          template_name: string
          template_type: string
          updated_at: string
          use_count: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          success_rate?: number | null
          template_content: string
          template_name: string
          template_type?: string
          updated_at?: string
          use_count?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          success_rate?: number | null
          template_content?: string
          template_name?: string
          template_type?: string
          updated_at?: string
          use_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      learning_modules: {
        Row: {
          category: string
          content_type: string
          content_url: string | null
          created_at: string
          created_by: string | null
          description: string | null
          difficulty_level: string
          estimated_duration: number
          id: string
          is_featured: boolean | null
          learning_objectives: Json | null
          prerequisites: Json | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          content_type?: string
          content_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty_level?: string
          estimated_duration?: number
          id?: string
          is_featured?: boolean | null
          learning_objectives?: Json | null
          prerequisites?: Json | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content_type?: string
          content_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty_level?: string
          estimated_duration?: number
          id?: string
          is_featured?: boolean | null
          learning_objectives?: Json | null
          prerequisites?: Json | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      lesson_completions: {
        Row: {
          career_id: string
          completed_at: string | null
          completed_by_admin: boolean | null
          id: string
          lesson_level: number
          user_id: string
        }
        Insert: {
          career_id: string
          completed_at?: string | null
          completed_by_admin?: boolean | null
          id?: string
          lesson_level: number
          user_id: string
        }
        Update: {
          career_id?: string
          completed_at?: string | null
          completed_by_admin?: boolean | null
          id?: string
          lesson_level?: number
          user_id?: string
        }
        Relationships: []
      }
      market_data_cache: {
        Row: {
          asset_type: string
          change_amount: number
          change_percent: number
          created_at: string
          id: string
          last_updated: string
          name: string
          price: number
          symbol: string
        }
        Insert: {
          asset_type: string
          change_amount: number
          change_percent: number
          created_at?: string
          id?: string
          last_updated?: string
          name: string
          price: number
          symbol: string
        }
        Update: {
          asset_type?: string
          change_amount?: number
          change_percent?: number
          created_at?: string
          id?: string
          last_updated?: string
          name?: string
          price?: number
          symbol?: string
        }
        Relationships: []
      }
      market_notes: {
        Row: {
          audio_url: string | null
          content: string | null
          created_at: string
          format_type: string | null
          id: string
          note_date: string
          podcast_episode_id: string | null
          structured_content: Json | null
          tags: string[] | null
          timestamps: Json | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          audio_url?: string | null
          content?: string | null
          created_at?: string
          format_type?: string | null
          id?: string
          note_date: string
          podcast_episode_id?: string | null
          structured_content?: Json | null
          tags?: string[] | null
          timestamps?: Json | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          audio_url?: string | null
          content?: string | null
          created_at?: string
          format_type?: string | null
          id?: string
          note_date?: string
          podcast_episode_id?: string | null
          structured_content?: Json | null
          tags?: string[] | null
          timestamps?: Json | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "market_notes_podcast_episode_id_fkey"
            columns: ["podcast_episode_id"]
            isOneToOne: false
            referencedRelation: "podcast_episodes"
            referencedColumns: ["id"]
          },
        ]
      }
      market_predictions: {
        Row: {
          actual_price: number | null
          created_at: string
          id: string
          points_earned: number | null
          predicted_price: number | null
          reasoning: string
          sentiment: string
          updated_at: string
          user_id: string
          week_ending: string
        }
        Insert: {
          actual_price?: number | null
          created_at?: string
          id?: string
          points_earned?: number | null
          predicted_price?: number | null
          reasoning: string
          sentiment: string
          updated_at?: string
          user_id: string
          week_ending: string
        }
        Update: {
          actual_price?: number | null
          created_at?: string
          id?: string
          points_earned?: number | null
          predicted_price?: number | null
          reasoning?: string
          sentiment?: string
          updated_at?: string
          user_id?: string
          week_ending?: string
        }
        Relationships: []
      }
      mentor_connections: {
        Row: {
          created_at: string
          expertise_area: string | null
          id: string
          mentee_id: string
          mentor_id: string
          message: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          expertise_area?: string | null
          id?: string
          mentee_id: string
          mentor_id: string
          message?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          expertise_area?: string | null
          id?: string
          mentee_id?: string
          mentor_id?: string
          message?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          read_at: string | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          read_at?: string | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      module_progress: {
        Row: {
          completed_at: string | null
          course_id: string | null
          created_at: string
          detailed_progress: Json
          id: string
          last_accessed: string
          module_id: string
          module_type: string
          progress_percentage: number
          time_spent_minutes: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id?: string | null
          created_at?: string
          detailed_progress?: Json
          id?: string
          last_accessed?: string
          module_id: string
          module_type: string
          progress_percentage?: number
          time_spent_minutes?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string | null
          created_at?: string
          detailed_progress?: Json
          id?: string
          last_accessed?: string
          module_id?: string
          module_type?: string
          progress_percentage?: number
          time_spent_minutes?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      note_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          format_type: string
          id: string
          is_system: boolean | null
          name: string
          structure: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          format_type: string
          id?: string
          is_system?: boolean | null
          name: string
          structure?: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          format_type?: string
          id?: string
          is_system?: boolean | null
          name?: string
          structure?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string
          description: string | null
          id: string
          industry: string | null
          interest_level: number | null
          linkedin_url: string | null
          location: string | null
          name: string
          notes: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          interest_level?: number | null
          linkedin_url?: string | null
          location?: string | null
          name: string
          notes?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          interest_level?: number | null
          linkedin_url?: string | null
          location?: string | null
          name?: string
          notes?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      paper_portfolios: {
        Row: {
          cash: number
          created_at: string
          id: string
          total_value: number
          updated_at: string
          user_id: string
        }
        Insert: {
          cash?: number
          created_at?: string
          id?: string
          total_value?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          cash?: number
          created_at?: string
          id?: string
          total_value?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      paper_positions: {
        Row: {
          asset_type: string | null
          avg_price: number
          created_at: string
          id: string
          portfolio_id: string
          shares: number
          symbol: string
          updated_at: string
        }
        Insert: {
          asset_type?: string | null
          avg_price: number
          created_at?: string
          id?: string
          portfolio_id: string
          shares: number
          symbol: string
          updated_at?: string
        }
        Update: {
          asset_type?: string | null
          avg_price?: number
          created_at?: string
          id?: string
          portfolio_id?: string
          shares?: number
          symbol?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "paper_positions_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "paper_portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
      paper_transactions: {
        Row: {
          asset_type: string | null
          created_at: string
          id: string
          portfolio_id: string
          price: number
          shares: number
          symbol: string
          total_amount: number
          transaction_type: string
        }
        Insert: {
          asset_type?: string | null
          created_at?: string
          id?: string
          portfolio_id: string
          price: number
          shares: number
          symbol: string
          total_amount: number
          transaction_type: string
        }
        Update: {
          asset_type?: string | null
          created_at?: string
          id?: string
          portfolio_id?: string
          price?: number
          shares?: number
          symbol?: string
          total_amount?: number
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "paper_transactions_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "paper_portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
      phils_friends_videos: {
        Row: {
          category: string
          company: string
          course_category: string
          created_at: string
          created_by: string | null
          description: string
          duration: string
          duration_sec: number | null
          id: string
          name: string
          processing_status: string | null
          published: boolean | null
          role_tier: string | null
          source_type: string | null
          source_url: string | null
          storage_path: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string
        }
        Insert: {
          category: string
          company: string
          course_category: string
          created_at?: string
          created_by?: string | null
          description: string
          duration: string
          duration_sec?: number | null
          id?: string
          name: string
          processing_status?: string | null
          published?: boolean | null
          role_tier?: string | null
          source_type?: string | null
          source_url?: string | null
          storage_path?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_url: string
        }
        Update: {
          category?: string
          company?: string
          course_category?: string
          created_at?: string
          created_by?: string | null
          description?: string
          duration?: string
          duration_sec?: number | null
          id?: string
          name?: string
          processing_status?: string | null
          published?: boolean | null
          role_tier?: string | null
          source_type?: string | null
          source_url?: string | null
          storage_path?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string
        }
        Relationships: []
      }
      podcast_episodes: {
        Row: {
          audio_url: string | null
          created_at: string | null
          description: string | null
          duration: number | null
          id: string
          podcast_id: string | null
          published_at: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          audio_url?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          podcast_id?: string | null
          published_at?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          audio_url?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          podcast_id?: string | null
          published_at?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "podcast_episodes_podcast_id_fkey"
            columns: ["podcast_id"]
            isOneToOne: false
            referencedRelation: "podcasts"
            referencedColumns: ["id"]
          },
        ]
      }
      podcasts: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          rss_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          rss_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          rss_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_shares: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_shares_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          chart_data: Json | null
          comments_count: number | null
          content: string
          created_at: string
          id: string
          image_url: string | null
          industry: string | null
          likes_count: number | null
          sentiment: string | null
          shares_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          chart_data?: Json | null
          comments_count?: number | null
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          industry?: string | null
          likes_count?: number | null
          sentiment?: string | null
          shares_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          chart_data?: Json | null
          comments_count?: number | null
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          industry?: string | null
          likes_count?: number | null
          sentiment?: string | null
          shares_count?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      prediction_streaks: {
        Row: {
          accuracy_percentage: number
          correct_predictions: number
          created_at: string
          current_streak: number
          id: string
          last_prediction_date: string | null
          longest_streak: number
          total_predictions: number
          updated_at: string
          user_id: string
        }
        Insert: {
          accuracy_percentage?: number
          correct_predictions?: number
          created_at?: string
          current_streak?: number
          id?: string
          last_prediction_date?: string | null
          longest_streak?: number
          total_predictions?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          accuracy_percentage?: number
          correct_predictions?: number
          created_at?: string
          current_streak?: number
          id?: string
          last_prediction_date?: string | null
          longest_streak?: number
          total_predictions?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          app_version: string | null
          company: string | null
          created_at: string | null
          current_level: number | null
          current_streak: number | null
          device_preference: string | null
          email: string | null
          id: string
          industry: string | null
          interests: string[] | null
          last_login_date: string | null
          linkedin_connected_at: string | null
          linkedin_url: string | null
          linkedin_verified: boolean | null
          longest_streak: number | null
          mobile_optimized: boolean | null
          networking_goals: string[] | null
          networking_pitch: string | null
          onboarding_completed: boolean | null
          points_to_next_level: number | null
          preferred_intro_style: string | null
          professional_summary: string | null
          professional_title: string | null
          resume_url: string | null
          skills: string[] | null
          updated_at: string | null
          username: string | null
          years_experience: number | null
        }
        Insert: {
          app_version?: string | null
          company?: string | null
          created_at?: string | null
          current_level?: number | null
          current_streak?: number | null
          device_preference?: string | null
          email?: string | null
          id: string
          industry?: string | null
          interests?: string[] | null
          last_login_date?: string | null
          linkedin_connected_at?: string | null
          linkedin_url?: string | null
          linkedin_verified?: boolean | null
          longest_streak?: number | null
          mobile_optimized?: boolean | null
          networking_goals?: string[] | null
          networking_pitch?: string | null
          onboarding_completed?: boolean | null
          points_to_next_level?: number | null
          preferred_intro_style?: string | null
          professional_summary?: string | null
          professional_title?: string | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string | null
          username?: string | null
          years_experience?: number | null
        }
        Update: {
          app_version?: string | null
          company?: string | null
          created_at?: string | null
          current_level?: number | null
          current_streak?: number | null
          device_preference?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          interests?: string[] | null
          last_login_date?: string | null
          linkedin_connected_at?: string | null
          linkedin_url?: string | null
          linkedin_verified?: boolean | null
          longest_streak?: number | null
          mobile_optimized?: boolean | null
          networking_goals?: string[] | null
          networking_pitch?: string | null
          onboarding_completed?: boolean | null
          points_to_next_level?: number | null
          preferred_intro_style?: string | null
          professional_summary?: string | null
          professional_title?: string | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string | null
          username?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      soft_skills_courses: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          difficulty_level: string
          estimated_duration: number
          id: string
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          difficulty_level: string
          estimated_duration: number
          id?: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: string
          estimated_duration?: number
          id?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      soft_skills_lessons: {
        Row: {
          content: string
          course_id: string | null
          created_at: string | null
          id: string
          lesson_order: number
          resources: Json | null
          title: string
          video_url: string | null
        }
        Insert: {
          content: string
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_order: number
          resources?: Json | null
          title: string
          video_url?: string | null
        }
        Update: {
          content?: string
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_order?: number
          resources?: Json | null
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "soft_skills_lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "soft_skills_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      soft_skills_module_progress: {
        Row: {
          completed_at: string | null
          completion_percentage: number
          course_id: string
          created_at: string
          game_scores: Json
          id: string
          module_id: string
          module_title: string
          responses: Json
          time_spent_minutes: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completion_percentage?: number
          course_id: string
          created_at?: string
          game_scores?: Json
          id?: string
          module_id: string
          module_title: string
          responses?: Json
          time_spent_minutes?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completion_percentage?: number
          course_id?: string
          created_at?: string
          game_scores?: Json
          id?: string
          module_id?: string
          module_title?: string
          responses?: Json
          time_spent_minutes?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      trading_videos: {
        Row: {
          created_at: string
          description: string | null
          difficulty_level: string
          duration_minutes: number | null
          id: string
          instructor_bio: string | null
          instructor_credentials: string | null
          instructor_name: string
          status: string
          submitted_by: string | null
          thumbnail_url: string | null
          title: string
          topic_category: string
          updated_at: string
          video_url: string
          view_count: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty_level: string
          duration_minutes?: number | null
          id?: string
          instructor_bio?: string | null
          instructor_credentials?: string | null
          instructor_name: string
          status?: string
          submitted_by?: string | null
          thumbnail_url?: string | null
          title: string
          topic_category: string
          updated_at?: string
          video_url: string
          view_count?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty_level?: string
          duration_minutes?: number | null
          id?: string
          instructor_bio?: string | null
          instructor_credentials?: string | null
          instructor_name?: string
          status?: string
          submitted_by?: string | null
          thumbnail_url?: string | null
          title?: string
          topic_category?: string
          updated_at?: string
          video_url?: string
          view_count?: number | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          id: string
          progress: Json | null
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          id?: string
          progress?: Json | null
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          id?: string
          progress?: Json | null
          unlocked_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_analytics: {
        Row: {
          created_at: string
          date_recorded: string
          id: string
          metadata: Json | null
          metric_type: string
          metric_value: number
          user_id: string
        }
        Insert: {
          created_at?: string
          date_recorded?: string
          id?: string
          metadata?: Json | null
          metric_type: string
          metric_value: number
          user_id: string
        }
        Update: {
          created_at?: string
          date_recorded?: string
          id?: string
          metadata?: Json | null
          metric_type?: string
          metric_value?: number
          user_id?: string
        }
        Relationships: []
      }
      user_charts: {
        Row: {
          chart_config: Json | null
          chart_data: Json
          chart_name: string
          chart_type: string
          created_at: string
          id: string
          is_public: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          chart_config?: Json | null
          chart_data: Json
          chart_name: string
          chart_type: string
          created_at?: string
          id?: string
          is_public?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          chart_config?: Json | null
          chart_data?: Json
          chart_name?: string
          chart_type?: string
          created_at?: string
          id?: string
          is_public?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_company_interactions: {
        Row: {
          company_id: string
          created_at: string
          id: string
          interaction_type: string
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          interaction_type: string
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          interaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_company_interactions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_experiences: {
        Row: {
          company: string
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          is_current: boolean | null
          position: string
          start_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          position: string
          start_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          position?: string
          start_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      user_learning_progress: {
        Row: {
          completion_date: string | null
          created_at: string
          id: string
          module_id: string
          notes: string | null
          progress_percentage: number
          quiz_scores: Json | null
          status: string
          time_spent_minutes: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completion_date?: string | null
          created_at?: string
          id?: string
          module_id: string
          notes?: string | null
          progress_percentage?: number
          quiz_scores?: Json | null
          status?: string
          time_spent_minutes?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completion_date?: string | null
          created_at?: string
          id?: string
          module_id?: string
          notes?: string | null
          progress_percentage?: number
          quiz_scores?: Json | null
          status?: string
          time_spent_minutes?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_learning_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "learning_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          achievements: Json | null
          created_at: string | null
          daily_activities: Json | null
          engagement_score: number | null
          id: string
          learning_progress: number | null
          level_progress: number | null
          quiz_scores: Json | null
          total_points: number | null
          trading_performance: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          achievements?: Json | null
          created_at?: string | null
          daily_activities?: Json | null
          engagement_score?: number | null
          id?: string
          learning_progress?: number | null
          level_progress?: number | null
          quiz_scores?: Json | null
          total_points?: number | null
          trading_performance?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          achievements?: Json | null
          created_at?: string | null
          daily_activities?: Json | null
          engagement_score?: number | null
          id?: string
          learning_progress?: number | null
          level_progress?: number | null
          quiz_scores?: Json | null
          total_points?: number | null
          trading_performance?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_social_stats: {
        Row: {
          bio: string | null
          expertise_areas: string[] | null
          followers_count: number | null
          following_count: number | null
          id: string
          is_mentor: boolean | null
          location: string | null
          mentor_rating: number | null
          posts_count: number | null
          total_likes_received: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bio?: string | null
          expertise_areas?: string[] | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          is_mentor?: boolean | null
          location?: string | null
          mentor_rating?: number | null
          posts_count?: number | null
          total_likes_received?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bio?: string | null
          expertise_areas?: string[] | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          is_mentor?: boolean | null
          location?: string | null
          mentor_rating?: number | null
          posts_count?: number | null
          total_likes_received?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_soft_skills_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          course_id: string | null
          created_at: string | null
          id: string
          lesson_id: string | null
          notes: string | null
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          notes?: string | null
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          notes?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_soft_skills_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "soft_skills_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_soft_skills_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "soft_skills_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_video_badges: {
        Row: {
          awarded_at: string | null
          badge_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          awarded_at?: string | null
          badge_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          awarded_at?: string | null
          badge_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_video_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "video_badges"
            referencedColumns: ["id"]
          },
        ]
      }
      vc_module_progress: {
        Row: {
          created_at: string
          id: string
          last_accessed: string
          level: number
          mini_games_progress: Json
          overview_completed: boolean
          terms_progress: Json
          total_progress: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_accessed?: string
          level: number
          mini_games_progress?: Json
          overview_completed?: boolean
          terms_progress?: Json
          total_progress?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_accessed?: string
          level?: number
          mini_games_progress?: Json
          overview_completed?: boolean
          terms_progress?: Json
          total_progress?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      video_analytics: {
        Row: {
          clip_id: string | null
          created_at: string | null
          event_type: string
          id: string
          progress_pct: number | null
          user_id: string | null
          video_id: string | null
        }
        Insert: {
          clip_id?: string | null
          created_at?: string | null
          event_type: string
          id?: string
          progress_pct?: number | null
          user_id?: string | null
          video_id?: string | null
        }
        Update: {
          clip_id?: string | null
          created_at?: string | null
          event_type?: string
          id?: string
          progress_pct?: number | null
          user_id?: string | null
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_analytics_clip_id_fkey"
            columns: ["clip_id"]
            isOneToOne: false
            referencedRelation: "video_clips"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_analytics_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "phils_friends_videos"
            referencedColumns: ["id"]
          },
        ]
      }
      video_badges: {
        Row: {
          badge_code: string
          badge_description: string | null
          badge_icon: string | null
          badge_name: string
          created_at: string | null
          id: string
        }
        Insert: {
          badge_code: string
          badge_description?: string | null
          badge_icon?: string | null
          badge_name: string
          created_at?: string | null
          id?: string
        }
        Update: {
          badge_code?: string
          badge_description?: string | null
          badge_icon?: string | null
          badge_name?: string
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      video_clips: {
        Row: {
          clip_order: number | null
          created_at: string | null
          end_sec: number
          excerpt: string | null
          id: string
          published: boolean | null
          start_sec: number
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          video_id: string | null
        }
        Insert: {
          clip_order?: number | null
          created_at?: string | null
          end_sec: number
          excerpt?: string | null
          id?: string
          published?: boolean | null
          start_sec: number
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          video_id?: string | null
        }
        Update: {
          clip_order?: number | null
          created_at?: string | null
          end_sec?: number
          excerpt?: string | null
          id?: string
          published?: boolean | null
          start_sec?: number
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_clips_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "phils_friends_videos"
            referencedColumns: ["id"]
          },
        ]
      }
      video_comments: {
        Row: {
          content: string
          created_at: string
          helpful_votes: number | null
          id: string
          parent_comment_id: string | null
          updated_at: string
          user_id: string
          video_id: string
        }
        Insert: {
          content: string
          created_at?: string
          helpful_votes?: number | null
          id?: string
          parent_comment_id?: string | null
          updated_at?: string
          user_id: string
          video_id: string
        }
        Update: {
          content?: string
          created_at?: string
          helpful_votes?: number | null
          id?: string
          parent_comment_id?: string | null
          updated_at?: string
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "video_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_comments_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "trading_videos"
            referencedColumns: ["id"]
          },
        ]
      }
      video_points: {
        Row: {
          awarded_at: string | null
          clip_id: string | null
          event_type: string
          id: string
          points_earned: number
          user_id: string | null
          video_id: string | null
        }
        Insert: {
          awarded_at?: string | null
          clip_id?: string | null
          event_type: string
          id?: string
          points_earned?: number
          user_id?: string | null
          video_id?: string | null
        }
        Update: {
          awarded_at?: string | null
          clip_id?: string | null
          event_type?: string
          id?: string
          points_earned?: number
          user_id?: string | null
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_points_clip_id_fkey"
            columns: ["clip_id"]
            isOneToOne: false
            referencedRelation: "video_clips"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_points_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "phils_friends_videos"
            referencedColumns: ["id"]
          },
        ]
      }
      video_ratings: {
        Row: {
          clarity_rating: number
          created_at: string
          difficulty_rating: number
          entertainment_rating: number
          id: string
          overall_rating: number | null
          updated_at: string
          usefulness_rating: number
          user_id: string
          video_id: string
        }
        Insert: {
          clarity_rating: number
          created_at?: string
          difficulty_rating: number
          entertainment_rating: number
          id?: string
          overall_rating?: number | null
          updated_at?: string
          usefulness_rating: number
          user_id: string
          video_id: string
        }
        Update: {
          clarity_rating?: number
          created_at?: string
          difficulty_rating?: number
          entertainment_rating?: number
          id?: string
          overall_rating?: number | null
          updated_at?: string
          usefulness_rating?: number
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_ratings_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "trading_videos"
            referencedColumns: ["id"]
          },
        ]
      }
      video_streaks: {
        Row: {
          current_streak_days: number | null
          last_active_date: string | null
          longest_streak_days: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          current_streak_days?: number | null
          last_active_date?: string | null
          longest_streak_days?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          current_streak_days?: number | null
          last_active_date?: string | null
          longest_streak_days?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      video_transcripts: {
        Row: {
          created_at: string | null
          id: string
          parsed_cues: Json | null
          raw_content: string
          transcript_type: string
          updated_at: string | null
          video_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          parsed_cues?: Json | null
          raw_content: string
          transcript_type: string
          updated_at?: string | null
          video_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          parsed_cues?: Json | null
          raw_content?: string
          transcript_type?: string
          updated_at?: string | null
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_transcripts_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "phils_friends_videos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bulk_insert_financial_terms: {
        Args: { terms_data: Json }
        Returns: {
          error_count: number
          errors: string[]
          inserted_count: number
        }[]
      }
      calculate_user_streak: {
        Args: { p_user_id: string }
        Returns: number
      }
      generate_user_recommendations: {
        Args: { p_user_id: string }
        Returns: Json
      }
      get_video_average_ratings: {
        Args: { video_id_param: string }
        Returns: {
          avg_clarity: number
          avg_difficulty: number
          avg_entertainment: number
          avg_overall: number
          avg_usefulness: number
          total_ratings: number
        }[]
      }
      handle_daily_login: {
        Args: { p_user_id: string }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      update_learning_progress: {
        Args: {
          p_module_id: string
          p_progress_percentage: number
          p_time_spent?: number
          p_user_id: string
        }
        Returns: Json
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
