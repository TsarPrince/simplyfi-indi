export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      announcement: {
        Row: {
          content: string | null;
          created_at: string;
          id: number;
          title: string;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: number;
          title: string;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: number;
          title?: string;
        };
        Relationships: [];
      };
      comment: {
        Row: {
          created_at: string;
          discussion_id: number;
          id: number;
          title: string;
          user_id: number;
        };
        Insert: {
          created_at?: string;
          discussion_id: number;
          id?: number;
          title: string;
          user_id: number;
        };
        Update: {
          created_at?: string;
          discussion_id?: number;
          id?: number;
          title?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "comment_discussion_id_fkey";
            columns: ["discussion_id"];
            isOneToOne: false;
            referencedRelation: "discussion";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comment_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          }
        ];
      };
      discussion: {
        Row: {
          content: string | null;
          created_at: string;
          id: number;
          image: string | null;
          status: Database["public"]["Enums"]["status"];
          title: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: number;
          image?: string | null;
          status?: Database["public"]["Enums"]["status"];
          title?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: number;
          image?: string | null;
          status?: Database["public"]["Enums"]["status"];
          title?: string | null;
        };
        Relationships: [];
      };
      information: {
        Row: {
          content: string | null;
          created_at: string;
          flag: boolean;
          id: number;
          image: string | null;
          status: Database["public"]["Enums"]["status"];
          title: string;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          flag?: boolean;
          id?: number;
          image?: string | null;
          status?: Database["public"]["Enums"]["status"];
          title: string;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          flag?: boolean;
          id?: number;
          image?: string | null;
          status?: Database["public"]["Enums"]["status"];
          title?: string;
        };
        Relationships: [];
      };
      poll: {
        Row: {
          created_at: string;
          id: number;
          title: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          title: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          title?: string;
        };
        Relationships: [];
      };
      poll_option: {
        Row: {
          created_at: string;
          id: number;
          poll_id: number;
          title: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          poll_id: number;
          title: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          poll_id?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "poll_option_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "poll";
            referencedColumns: ["id"];
          }
        ];
      };
      poll_vote: {
        Row: {
          created_at: string;
          id: number;
          poll_option_id: number;
          user_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          poll_option_id: number;
          user_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          poll_option_id?: number;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "poll_vote_poll_option_id_fkey";
            columns: ["poll_option_id"];
            isOneToOne: false;
            referencedRelation: "poll_option";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "poll_vote_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          }
        ];
      };
      user: {
        Row: {
          avatar: string | null;
          created_at: string;
          email: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          avatar?: string | null;
          created_at?: string;
          email?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          avatar?: string | null;
          created_at?: string;
          email?: string | null;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      status: "PUBLISHED" | "DRAFT" | "ARCHIVE";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
