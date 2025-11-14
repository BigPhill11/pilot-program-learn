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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      initial_assessments: {
        Row: {
          answers: Json | null
          assessment_type: string
          completed_at: string
          created_at: string | null
          id: string
          score: number | null
          user_id: string
        }
        Insert: {
          answers?: Json | null
          assessment_type: string
          completed_at?: string
          created_at?: string | null
          id?: string
          score?: number | null
          user_id: string
        }
        Update: {
          answers?: Json | null
          assessment_type?: string
          completed_at?: string
          created_at?: string | null
          id?: string
          score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "initial_assessments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_completions: {
        Row: {
          career_id: string
          completed_at: string
          completed_by_admin: boolean | null
          created_at: string | null
          id: string
          lesson_level: number
          user_id: string
        }
        Insert: {
          career_id: string
          completed_at?: string
          completed_by_admin?: boolean | null
          created_at?: string | null
          id?: string
          lesson_level: number
          user_id: string
        }
        Update: {
          career_id?: string
          completed_at?: string
          completed_by_admin?: boolean | null
          created_at?: string | null
          id?: string
          lesson_level?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_completions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          app_version: string | null
          average_session_duration: number | null
          behavioral_segment:
            | Database["public"]["Enums"]["behavioral_segment_enum"]
            | null
          created_at: string | null
          current_streak: number | null
          device_preference: string | null
          email: string | null
          engagement_score: number | null
          experience_level: string | null
          finance_goals: string[] | null
          first_session_at: string | null
          goals: string[] | null
          id: string
          interests: string[] | null
          last_active_at: string | null
          learning_progress: Json | null
          learning_style:
            | Database["public"]["Enums"]["learning_style_enum"]
            | null
          onboarding_completed: boolean | null
          preferred_content_types: string[] | null
          profile_completion_score: number | null
          survey_completed: boolean | null
          time_commitment: string | null
          total_sessions: number | null
          total_xp: number | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          app_version?: string | null
          average_session_duration?: number | null
          behavioral_segment?:
            | Database["public"]["Enums"]["behavioral_segment_enum"]
            | null
          created_at?: string | null
          current_streak?: number | null
          device_preference?: string | null
          email?: string | null
          engagement_score?: number | null
          experience_level?: string | null
          finance_goals?: string[] | null
          first_session_at?: string | null
          goals?: string[] | null
          id: string
          interests?: string[] | null
          last_active_at?: string | null
          learning_progress?: Json | null
          learning_style?:
            | Database["public"]["Enums"]["learning_style_enum"]
            | null
          onboarding_completed?: boolean | null
          preferred_content_types?: string[] | null
          profile_completion_score?: number | null
          survey_completed?: boolean | null
          time_commitment?: string | null
          total_sessions?: number | null
          total_xp?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          app_version?: string | null
          average_session_duration?: number | null
          behavioral_segment?:
            | Database["public"]["Enums"]["behavioral_segment_enum"]
            | null
          created_at?: string | null
          current_streak?: number | null
          device_preference?: string | null
          email?: string | null
          engagement_score?: number | null
          experience_level?: string | null
          finance_goals?: string[] | null
          first_session_at?: string | null
          goals?: string[] | null
          id?: string
          interests?: string[] | null
          last_active_at?: string | null
          learning_progress?: Json | null
          learning_style?:
            | Database["public"]["Enums"]["learning_style_enum"]
            | null
          onboarding_completed?: boolean | null
          preferred_content_types?: string[] | null
          profile_completion_score?: number | null
          survey_completed?: boolean | null
          time_commitment?: string | null
          total_sessions?: number | null
          total_xp?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          created_at: string | null
          id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          created_at?: string | null
          id?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          created_at?: string | null
          id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity_log: {
        Row: {
          activity_category: string
          activity_details: Json | null
          activity_type: Database["public"]["Enums"]["activity_type_enum"]
          duration_seconds: number | null
          engagement_level: string | null
          id: string
          session_id: string | null
          timestamp: string
          user_id: string
        }
        Insert: {
          activity_category: string
          activity_details?: Json | null
          activity_type: Database["public"]["Enums"]["activity_type_enum"]
          duration_seconds?: number | null
          engagement_level?: string | null
          id?: string
          session_id?: string | null
          timestamp?: string
          user_id: string
        }
        Update: {
          activity_category?: string
          activity_details?: Json | null
          activity_type?: Database["public"]["Enums"]["activity_type_enum"]
          duration_seconds?: number | null
          engagement_level?: string | null
          id?: string
          session_id?: string | null
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_log_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "user_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          created_at: string | null
          device_info: Json | null
          duration_seconds: number | null
          entry_point: string | null
          exit_point: string | null
          id: string
          pages_visited: Json | null
          session_end: string | null
          session_start: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_info?: Json | null
          duration_seconds?: number | null
          entry_point?: string | null
          exit_point?: string | null
          id?: string
          pages_visited?: Json | null
          session_end?: string | null
          session_start?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_info?: Json | null
          duration_seconds?: number | null
          entry_point?: string | null
          exit_point?: string | null
          id?: string
          pages_visited?: Json | null
          session_end?: string | null
          session_start?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_video_average_ratings: {
        Args: { video_id_param: string }
        Returns: {
          avg_clarity: number
          avg_difficulty: number
          avg_entertainment: number
          avg_usefulness: number
          total_ratings: number
        }[]
      }
      handle_daily_login: { Args: { user_id_param: string }; Returns: Json }
    }
    Enums: {
      activity_type_enum:
        | "page_view"
        | "feature_interaction"
        | "quiz_attempt"
        | "video_watch"
        | "profile_edit"
        | "game_play"
      behavioral_segment_enum:
        | "explorer"
        | "achiever"
        | "focused_learner"
        | "casual_browser"
        | "passive_observer"
        | "dormant"
      learning_style_enum: "visual" | "reading" | "interactive" | "video"
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
      activity_type_enum: [
        "page_view",
        "feature_interaction",
        "quiz_attempt",
        "video_watch",
        "profile_edit",
        "game_play",
      ],
      behavioral_segment_enum: [
        "explorer",
        "achiever",
        "focused_learner",
        "casual_browser",
        "passive_observer",
        "dormant",
      ],
      learning_style_enum: ["visual", "reading", "interactive", "video"],
    },
  },
} as const
