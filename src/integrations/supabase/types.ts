export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
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
          id: string
          name: string
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
          id?: string
          name: string
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
          id?: string
          name?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          app_version: string | null
          created_at: string | null
          current_level: number | null
          current_streak: number | null
          email: string | null
          id: string
          last_login_date: string | null
          linkedin_connected_at: string | null
          linkedin_url: string | null
          linkedin_verified: boolean | null
          longest_streak: number | null
          onboarding_completed: boolean | null
          points_to_next_level: number | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          app_version?: string | null
          created_at?: string | null
          current_level?: number | null
          current_streak?: number | null
          email?: string | null
          id: string
          last_login_date?: string | null
          linkedin_connected_at?: string | null
          linkedin_url?: string | null
          linkedin_verified?: boolean | null
          longest_streak?: number | null
          onboarding_completed?: boolean | null
          points_to_next_level?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          app_version?: string | null
          created_at?: string | null
          current_level?: number | null
          current_streak?: number | null
          email?: string | null
          id?: string
          last_login_date?: string | null
          linkedin_connected_at?: string | null
          linkedin_url?: string | null
          linkedin_verified?: boolean | null
          longest_streak?: number | null
          onboarding_completed?: boolean | null
          points_to_next_level?: number | null
          updated_at?: string | null
          username?: string | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bulk_insert_financial_terms: {
        Args: { terms_data: Json }
        Returns: {
          inserted_count: number
          error_count: number
          errors: string[]
        }[]
      }
      calculate_user_streak: {
        Args: { p_user_id: string }
        Returns: number
      }
      get_video_average_ratings: {
        Args: { video_id_param: string }
        Returns: {
          avg_clarity: number
          avg_usefulness: number
          avg_entertainment: number
          avg_difficulty: number
          avg_overall: number
          total_ratings: number
        }[]
      }
      handle_daily_login: {
        Args: { p_user_id: string }
        Returns: Json
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
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
