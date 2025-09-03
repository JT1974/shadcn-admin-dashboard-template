/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// NOTE: frissíteni supabase változás esetén!!!
interface Database {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
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
  public: {
    Tables: {
      completionCertificates: {
        Row: {
          createdAt: string
          currency: Database["public"]["Enums"]["currency"]
          id: number
          lastModifiedAt: string | null
          lastModifiedBy: string | null
          number: string | null
          status: Database["public"]["Enums"]["completionCertificateStatus"]
          tasks: number[]
          timeAmount: number
          timeUnit: Database["public"]["Enums"]["workingTimeUnit"]
          totalPrice: number
        }
        Insert: {
          createdAt?: string
          currency?: Database["public"]["Enums"]["currency"]
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          number?: string | null
          status?: Database["public"]["Enums"]["completionCertificateStatus"]
          tasks: number[]
          timeAmount?: number
          timeUnit?: Database["public"]["Enums"]["workingTimeUnit"]
          totalPrice?: number
        }
        Update: {
          createdAt?: string
          currency?: Database["public"]["Enums"]["currency"]
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          number?: string | null
          status?: Database["public"]["Enums"]["completionCertificateStatus"]
          tasks?: number[]
          timeAmount?: number
          timeUnit?: Database["public"]["Enums"]["workingTimeUnit"]
          totalPrice?: number
        }
        Relationships: [
          {
            foreignKeyName: "completionCertificates_lastModifiedBy_fkey"
            columns: ["lastModifiedBy"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      contacts: {
        Row: {
          address: string | null
          company: number | null
          created_at: string
          email: string | null
          id: number
          lastModifiedAt: string | null
          lastModifiedBy: string | null
          name: string | null
          phone: string | null
          position: string | null
        }
        Insert: {
          address?: string | null
          company?: number | null
          created_at?: string
          email?: string | null
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          name?: string | null
          phone?: string | null
          position?: string | null
        }
        Update: {
          address?: string | null
          company?: number | null
          created_at?: string
          email?: string | null
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          name?: string | null
          phone?: string | null
          position?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          }
        ]
      }
      contracts: {
        Row: {
          clientContractNumber: string | null
          createdAt: string
          deadline: string | null
          description: string | null
          id: number
          lastModifiedAt: string | null
          lastModifiedBy: string | null
          number: string | null
          quotation: number | null
          reference: string | null
          status: Database["public"]["Enums"]["contractStatus"]
          tasks: number[]
        }
        Insert: {
          clientContractNumber?: string | null
          createdAt?: string
          deadline?: string | null
          description?: string | null
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          number?: string | null
          quotation?: number | null
          reference?: string | null
          status?: Database["public"]["Enums"]["contractStatus"]
          tasks: number[]
        }
        Update: {
          clientContractNumber?: string | null
          createdAt?: string
          deadline?: string | null
          description?: string | null
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          number?: string | null
          quotation?: number | null
          reference?: string | null
          status?: Database["public"]["Enums"]["contractStatus"]
          tasks?: number[]
        }
        Relationships: [
          {
            foreignKeyName: "contracts_quotation_fkey"
            columns: ["quotation"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_quotation_fkey"
            columns: ["quotation"]
            isOneToOne: false
            referencedRelation: "quotations_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_quotation_fkey"
            columns: ["quotation"]
            isOneToOne: false
            referencedRelation: "quotations_extended"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_quotation_fkey"
            columns: ["quotation"]
            isOneToOne: false
            referencedRelation: "quotations_with_tasks"
            referencedColumns: ["quotation_id"]
          }
        ]
      }
      invoices: {
        Row: {
          completionCertificates: number[]
          createdAt: string
          id: number
          lastModifiedAt: string | null
          lastModifiedBy: string | null
          number: string | null
          paymentCompletedAt: string | null
          paymentDueAt: string | null
          status: Database["public"]["Enums"]["invoiceStatus"]
          tasks: number[]
        }
        Insert: {
          completionCertificates: number[]
          createdAt?: string
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          number?: string | null
          paymentCompletedAt?: string | null
          paymentDueAt?: string | null
          status?: Database["public"]["Enums"]["invoiceStatus"]
          tasks: number[]
        }
        Update: {
          completionCertificates?: number[]
          createdAt?: string
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          number?: string | null
          paymentCompletedAt?: string | null
          paymentDueAt?: string | null
          status?: Database["public"]["Enums"]["invoiceStatus"]
          tasks?: number[]
        }
        Relationships: []
      }
      orders: {
        Row: {
          clientOrderNumber: string | null
          createdAt: string
          deadline: string | null
          description: string | null
          id: number
          lastModifiedAt: string | null
          lastModifiedBy: string | null
          number: string | null
          quotation: number | null
          reference: string | null
          status: Database["public"]["Enums"]["orderStatus"]
          tasks: number[]
        }
        Insert: {
          clientOrderNumber?: string | null
          createdAt?: string
          deadline?: string | null
          description?: string | null
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          number?: string | null
          quotation?: number | null
          reference?: string | null
          status?: Database["public"]["Enums"]["orderStatus"]
          tasks: number[]
        }
        Update: {
          clientOrderNumber?: string | null
          createdAt?: string
          deadline?: string | null
          description?: string | null
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          number?: string | null
          quotation?: number | null
          reference?: string | null
          status?: Database["public"]["Enums"]["orderStatus"]
          tasks?: number[]
        }
        Relationships: [
          {
            foreignKeyName: "orders_quotation_fkey"
            columns: ["quotation"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_quotation_fkey"
            columns: ["quotation"]
            isOneToOne: false
            referencedRelation: "quotations_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_quotation_fkey"
            columns: ["quotation"]
            isOneToOne: false
            referencedRelation: "quotations_extended"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_quotation_fkey"
            columns: ["quotation"]
            isOneToOne: false
            referencedRelation: "quotations_with_tasks"
            referencedColumns: ["quotation_id"]
          }
        ]
      }
      partners: {
        Row: {
          companyForm: Database["public"]["Enums"]["companyForm"] | null
          createdAt: string
          id: number
          lastModifiedAt: string | null
          lastModifiedBy: string | null
          name: string | null
          relation: Database["public"]["Enums"]["partnerRelation"] | null
          type: Database["public"]["Enums"]["partnerType"] | null
        }
        Insert: {
          companyForm?: Database["public"]["Enums"]["companyForm"] | null
          createdAt?: string
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          name?: string | null
          relation?: Database["public"]["Enums"]["partnerRelation"] | null
          type?: Database["public"]["Enums"]["partnerType"] | null
        }
        Update: {
          companyForm?: Database["public"]["Enums"]["companyForm"] | null
          createdAt?: string
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          name?: string | null
          relation?: Database["public"]["Enums"]["partnerRelation"] | null
          type?: Database["public"]["Enums"]["partnerType"] | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          createdAt: string
          email: string | null
          firstname: string | null
          id: string
          isAdmin: boolean
          lastModifiedAt: string | null
          lastModifiedBy: string | null
          lastname: string | null
          phone: string | null
          position: string | null
          preferences: Json | null
          roles: string[] | null
        }
        Insert: {
          createdAt?: string
          email?: string | null
          firstname?: string | null
          id: string
          isAdmin?: boolean
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          lastname?: string | null
          phone?: string | null
          position?: string | null
          preferences?: Json | null
          roles?: string[] | null
        }
        Update: {
          createdAt?: string
          email?: string | null
          firstname?: string | null
          id?: string
          isAdmin?: boolean
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          lastname?: string | null
          phone?: string | null
          position?: string | null
          preferences?: Json | null
          roles?: string[] | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          comments: string | null
          completionCertificates: number[]
          contract: number | null
          createdAt: string
          customer: number | null
          id: number
          invoices: number[]
          lastModifiedAt: string | null
          lastModifiedBy: string | null
          number: string | null
          order: number | null
          quotation: number | null
          status: Database["public"]["Enums"]["projectStatus"]
          tasks: number[]
        }
        Insert: {
          comments?: string | null
          completionCertificates: number[]
          contract?: number | null
          createdAt?: string
          customer?: number | null
          id?: number
          invoices: number[]
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          number?: string | null
          order?: number | null
          quotation?: number | null
          status?: Database["public"]["Enums"]["projectStatus"]
          tasks: number[]
        }
        Update: {
          comments?: string | null
          completionCertificates?: number[]
          contract?: number | null
          createdAt?: string
          customer?: number | null
          id?: number
          invoices?: number[]
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          number?: string | null
          order?: number | null
          quotation?: number | null
          status?: Database["public"]["Enums"]["projectStatus"]
          tasks?: number[]
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_fkey"
            columns: ["customer"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_contract_fkey"
            columns: ["contract"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_order_fkey"
            columns: ["order"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_quotation_fkey"
            columns: ["quotation"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_quotation_fkey"
            columns: ["quotation"]
            isOneToOne: false
            referencedRelation: "quotations_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_quotation_fkey"
            columns: ["quotation"]
            isOneToOne: false
            referencedRelation: "quotations_extended"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_quotation_fkey"
            columns: ["quotation"]
            isOneToOne: false
            referencedRelation: "quotations_with_tasks"
            referencedColumns: ["quotation_id"]
          }
        ]
      }
      quotations: {
        Row: {
          createdAt: string
          customer: number | null
          description: string | null
          fulfillmentTime: number
          fulfillmentTimeUnit: Database["public"]["Enums"]["workingTimeUnit"]
          id: number
          lastModifiedAt: string | null
          lastModifiedBy: string | null
          number: string | null
          paymentTime: number
          paymentTimeUnit: Database["public"]["Enums"]["workingTimeUnit"]
          reference: string | null
          status: Database["public"]["Enums"]["quotationStatus"]
          tasks: number[] | null
        }
        Insert: {
          createdAt?: string
          customer?: number | null
          description?: string | null
          fulfillmentTime?: number
          fulfillmentTimeUnit?: Database["public"]["Enums"]["workingTimeUnit"]
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          number?: string | null
          paymentTime?: number
          paymentTimeUnit?: Database["public"]["Enums"]["workingTimeUnit"]
          reference?: string | null
          status?: Database["public"]["Enums"]["quotationStatus"]
          tasks?: number[] | null
        }
        Update: {
          createdAt?: string
          customer?: number | null
          description?: string | null
          fulfillmentTime?: number
          fulfillmentTimeUnit?: Database["public"]["Enums"]["workingTimeUnit"]
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          number?: string | null
          paymentTime?: number
          paymentTimeUnit?: Database["public"]["Enums"]["workingTimeUnit"]
          reference?: string | null
          status?: Database["public"]["Enums"]["quotationStatus"]
          tasks?: number[] | null
        }
        Relationships: [
          {
            foreignKeyName: "quotations_client_fkey"
            columns: ["customer"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotations_lastModifiedBy_fkey"
            columns: ["lastModifiedBy"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      settings: {
        Row: {
          companyAddress: string | null
          companyBankAccountNumber: string | null
          companyCurrencies: Database["public"]["Enums"]["currency"][] | null
          companyDefaultCurrency: Database["public"]["Enums"]["currency"] | null
          companyEducítionRegistrationNumber: string | null
          companyEmail: string | null
          companyEUVAT: string | null
          companyName: string | null
          companyPhone: string | null
          companyRegistrationNumber: string | null
          companyVAT: string | null
          created_at: string
          id: number
          lastModifiedAt: string | null
          lastModifiedBy: string | null
        }
        Insert: {
          companyAddress?: string | null
          companyBankAccountNumber?: string | null
          companyCurrencies?: Database["public"]["Enums"]["currency"][] | null
          companyDefaultCurrency?:
            | Database["public"]["Enums"]["currency"]
            | null
          companyEducítionRegistrationNumber?: string | null
          companyEmail?: string | null
          companyEUVAT?: string | null
          companyName?: string | null
          companyPhone?: string | null
          companyRegistrationNumber?: string | null
          companyVAT?: string | null
          created_at?: string
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
        }
        Update: {
          companyAddress?: string | null
          companyBankAccountNumber?: string | null
          companyCurrencies?: Database["public"]["Enums"]["currency"][] | null
          companyDefaultCurrency?:
            | Database["public"]["Enums"]["currency"]
            | null
          companyEducítionRegistrationNumber?: string | null
          companyEmail?: string | null
          companyEUVAT?: string | null
          companyName?: string | null
          companyPhone?: string | null
          companyRegistrationNumber?: string | null
          companyVAT?: string | null
          created_at?: string
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          category: Database["public"]["Enums"]["taskCategory"] | null
          comments: string | null
          createdAt: string
          currency: Database["public"]["Enums"]["currency"]
          deadline: string | null
          description: string | null
          id: number
          lastModifiedAt: string | null
          lastModifiedBy: string | null
          owner: string | null
          remainingTime: number | null
          status: Database["public"]["Enums"]["taskStatus"]
          subcontractor: number | null
          timeAmount: number
          timeUnit: Database["public"]["Enums"]["workingTimeUnit"] | null
          unitPrice: number
          workplace: number | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["taskCategory"] | null
          comments?: string | null
          createdAt?: string
          currency?: Database["public"]["Enums"]["currency"]
          deadline?: string | null
          description?: string | null
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          owner?: string | null
          remainingTime?: number | null
          status?: Database["public"]["Enums"]["taskStatus"]
          subcontractor?: number | null
          timeAmount?: number
          timeUnit?: Database["public"]["Enums"]["workingTimeUnit"] | null
          unitPrice?: number
          workplace?: number | null
        }
        Update: {
          category?: Database["public"]["Enums"]["taskCategory"] | null
          comments?: string | null
          createdAt?: string
          currency?: Database["public"]["Enums"]["currency"]
          deadline?: string | null
          description?: string | null
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          owner?: string | null
          remainingTime?: number | null
          status?: Database["public"]["Enums"]["taskStatus"]
          subcontractor?: number | null
          timeAmount?: number
          timeUnit?: Database["public"]["Enums"]["workingTimeUnit"] | null
          unitPrice?: number
          workplace?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_subcontractor_fkey"
            columns: ["subcontractor"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_workplace_fkey"
            columns: ["workplace"]
            isOneToOne: false
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          }
        ]
      }
      workplaces: {
        Row: {
          companyForm: Database["public"]["Enums"]["companyForm"] | null
          createdAt: string
          id: number
          lastModifiedAt: string | null
          lastModifiedBy: string | null
          name: string | null
          site: string | null
        }
        Insert: {
          companyForm?: Database["public"]["Enums"]["companyForm"] | null
          createdAt?: string
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          name?: string | null
          site?: string | null
        }
        Update: {
          companyForm?: Database["public"]["Enums"]["companyForm"] | null
          createdAt?: string
          id?: number
          lastModifiedAt?: string | null
          lastModifiedBy?: string | null
          name?: string | null
          site?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      quotations_details: {
        Row: {
          createdAt: string
          customer: Partial<
            Database["public"]["Tables"]["partners"]["Row"]
          > | null
          description: string | null
          fulfillmentTime: number | null
          fulfillmentTimeUnit:
            | Database["public"]["Enums"]["workingTimeUnit"]
            | null
          id: number
          lastModifiedAt: string | null
          lastModifiedBy: Partial<
            Database["public"]["Tables"]["profiles"]["Row"]
          > | null
          number: string | null
          paymentTime: number | null
          paymentTimeUnit: Database["public"]["Enums"]["workingTimeUnit"] | null
          reference: string | null
          status: Database["public"]["Enums"]["quotationStatus"] | null
          tasks:
            | Partial<Database["public"]["Views"]["tasks_details"]["Row"]>[]
            | null
        }
        Relationships: []
      }
      tasks_details: {
        Row: {
          category: Database["public"]["Enums"]["taskCategory"] | null
          comments: string | null
          createdAt: string
          currency: Database["public"]["Enums"]["currency"]
          deadline: string | null
          description: string | null
          id: number
          lastModifiedAt: string | null
          lastModifiedBy: Partial<
            Database["public"]["Tables"]["profiles"]["Row"]
          > | null
          owner: Partial<Database["public"]["Tables"]["profiles"]["Row"]> | null
          remainingTime: number | null
          status: Database["public"]["Enums"]["taskStatus"] | null
          subcontractor: Partial<
            Database["public"]["Tables"]["partners"]["Row"]
          > | null
          timeAmount: number | null
          timeUnit: Database["public"]["Enums"]["workingTimeUnit"] | null
          unitPrice: number | null
          workplace: Partial<
            Database["public"]["Tables"]["workplaces"]["Row"]
          > | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      companyForm: "kft" | "bt" | "zrt" | "nyrt" | "ev"
      completionCertificateStatus:
        | "created"
        | "accepted"
        | "rejected"
        | "deleted"
      contractStatus: "open" | "closed" | "cancelled"
      currency: "HUF" | "EUR" | "USD"
      invoiceStatus: "issued" | "paid" | "deleted"
      orderStatus: "open" | "closed" | "cancelled"
      partnerRelation: "customer" | "subcontractor"
      partnerType: "new" | "existing"
      projectOwnershipType: "normal" | "subcontracting"
      projectStatus: "inprogress" | "closed" | "suspended" | "cancelled"
      quotationStatus: "created" | "accepted" | "rejected" | "deleted"
      taskCategory:
        | "ex"
        | "fp"
        | "exfp"
        | "edu"
        | "cons"
        | "rev"
        | "revex"
        | "lpex"
        | "ohs"
        | "env"
        | "lp"
      taskStatus:
        | "open"
        | "inprogress"
        | "closed"
        | "suspended"
        | "continuous"
        | "cancelled"
      workingTimeUnit: "hours" | "days" | "weeks" | "months"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
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

type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
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

type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
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

type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

// NOTE: nem supabase-ről jön!
// Enum key and value types
type SupabaseEnumKeys = keyof Database["public"]["Enums"]
type SupabaseEnums = Database["public"]["Enums"]

// Table and View types
type CompletionCertificatesTable =
  Database["public"]["Tables"]["completionCertificates"]
type ContactsTable = Database["public"]["Tables"]["contacts"]
type ContractsTable = Database["public"]["Tables"]["contracts"]
type InvoicesTable = Database["public"]["Tables"]["invoices"]
type OredersTable = Database["public"]["Tables"]["orders"]
type PartnersTable = Database["public"]["Tables"]["partners"]
type ProfilesTable = Database["public"]["Tables"]["profiles"]
type ProjectsTable = Database["public"]["Tables"]["projects"]
type QuotationsTable = Database["public"]["Tables"]["quotations"]
type QuotationsDetailsView = Database["public"]["Views"]["quotations_details"]
type SettingsTable = Database["public"]["Tables"]["settings"]
type TasksTable = Database["public"]["Tables"]["tasks"]
type TasksDetailsView = Database["public"]["Views"]["tasks_details"]
type WorkplacesTable = Database["public"]["Tables"]["workplaces"]
