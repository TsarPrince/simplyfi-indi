export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      announcement: {
        Row: {
          content: string | null
          created_at: string
          id: number
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          title: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      comment: {
        Row: {
          created_at: string
          discussion_id: number
          id: number
          title: string
          user_id: number
        }
        Insert: {
          created_at?: string
          discussion_id: number
          id?: number
          title: string
          user_id: number
        }
        Update: {
          created_at?: string
          discussion_id?: number
          id?: number
          title?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "comment_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "discussion"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      discussion: {
        Row: {
          content: string | null
          created_at: string
          id: number
          image: string | null
          status: Database["public"]["Enums"]["status"]
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          image?: string | null
          status?: Database["public"]["Enums"]["status"]
          title: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          image?: string | null
          status?: Database["public"]["Enums"]["status"]
          title?: string
        }
        Relationships: []
      }
      information: {
        Row: {
          content: string | null
          created_at: string
          flag: boolean
          id: number
          image: string | null
          status: Database["public"]["Enums"]["status"]
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          flag?: boolean
          id?: number
          image?: string | null
          status?: Database["public"]["Enums"]["status"]
          title: string
        }
        Update: {
          content?: string | null
          created_at?: string
          flag?: boolean
          id?: number
          image?: string | null
          status?: Database["public"]["Enums"]["status"]
          title?: string
        }
        Relationships: []
      }
      metric: {
        Row: {
          created_at: string
          description: string
          id: number
          name: string
          symbol: Database["public"]["Enums"]["symbol"] | null
          user_id: string | null
          value: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          name: string
          symbol?: Database["public"]["Enums"]["symbol"] | null
          user_id?: string | null
          value: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          name?: string
          symbol?: Database["public"]["Enums"]["symbol"] | null
          user_id?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "metric_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      poll: {
        Row: {
          created_at: string
          id: number
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "poll_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      poll_option: {
        Row: {
          id: number
          order: number
          poll_id: number
          title: string
        }
        Insert: {
          id?: number
          order: number
          poll_id: number
          title: string
        }
        Update: {
          id?: number
          order?: number
          poll_id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "poll_option_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "poll"
            referencedColumns: ["id"]
          }
        ]
      }
      poll_vote: {
        Row: {
          created_at: string
          id: number
          poll_option_id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          poll_option_id: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          poll_option_id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "poll_vote_poll_option_id_fkey"
            columns: ["poll_option_id"]
            isOneToOne: false
            referencedRelation: "poll_option"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "poll_vote_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          avatar: string | null
          created_at: string
          email: string | null
          id: number
          name: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      status: "PUBLISHED" | "DRAFT" | "ARCHIVE"
      symbol: "DOLLAR" | "PERCENTAGE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
