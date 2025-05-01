
import { Feedback, FeedbackFormValues } from "@/types/feedback";
import { supabase } from "@/integrations/supabase/client";

export const FeedbackService = {
  // Get all feedback
  getAll: async (): Promise<Feedback[]> => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Map Supabase data structure to our Feedback type
      return data.map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        message: item.message,
        createdAt: item.created_at
      }));
    } catch (error) {
      console.error("Error fetching feedback:", error);
      throw error;
    }
  },

  // Create new feedback
  create: async (feedback: FeedbackFormValues): Promise<Feedback> => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .insert([
          {
            name: feedback.name,
            email: feedback.email,
            message: feedback.message
          }
        ])
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        message: data.message,
        createdAt: data.created_at
      };
    } catch (error) {
      console.error("Error creating feedback:", error);
      throw error;
    }
  },

  // Delete feedback
  delete: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('feedback')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error("Error deleting feedback:", error);
      throw error;
    }
  }
};
