export type Database = {
  public: {
    Tables: {
      vulnerability_types: {
        Row: {
          id: string;
          name: string;
          description: string;
          difficulty: 'beginner' | 'intermediate' | 'advanced';
          category: string;
          icon: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['vulnerability_types']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['vulnerability_types']['Insert']>;
      };
      labs: {
        Row: {
          id: string;
          vulnerability_type_id: string | null;
          title: string;
          description: string;
          instructions: string;
          solution: string;
          points: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['labs']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['labs']['Insert']>;
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          lab_id: string | null;
          completed: boolean;
          completed_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_progress']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['user_progress']['Insert']>;
      };
      store_products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          image_url: string | null;
          stock: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['store_products']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['store_products']['Insert']>;
      };
    };
  };
};
