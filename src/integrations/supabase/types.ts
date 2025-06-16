export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
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
          avg_price: number
          created_at: string
          id: string
          portfolio_id: string
          shares: number
          symbol: string
          updated_at: string
        }
        Insert: {
          avg_price: number
          created_at?: string
          id?: string
          portfolio_id: string
          shares: number
          symbol: string
          updated_at?: string
        }
        Update: {
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_user_streak: {
        Args: { p_user_id: string }
        Returns: number
      }
      handle_daily_login: {
        Args: { p_user_id: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
