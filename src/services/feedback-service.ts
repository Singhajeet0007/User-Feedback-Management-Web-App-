
import { Feedback, FeedbackFormValues } from "@/types/feedback";
import { supabase } from "@/integrations/supabase/client";

export const FeedbackService = {
  // Get all feedback
  getAll: async (): Promise<Feedback[]> => {
    try {
      console.log("Fetching all feedback from Supabase...");
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Supabase error fetching feedback:", error);
        throw new Error(`Failed to fetch feedback: ${error.message}`);
      }
      
      if (!data) {
        console.log("No feedback data returned from Supabase");
        return [];
      }
      
      console.log(`Successfully fetched ${data.length} feedback items`);
      
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
      console.log("Attempting to create feedback:", feedback);
      
      // Validate input data
      if (!feedback.name || !feedback.email || !feedback.message) {
        console.error("Missing required fields in feedback submission");
        throw new Error("Name, email, and message are required");
      }
      
      const { data, error } = await supabase
        .from('feedback')
        .insert([
          {
            name: feedback.name,
            email: feedback.email,
            message: feedback.message
          }
        ])
        .select();
      
      if (error) {
        console.error("Supabase error creating feedback:", error);
        throw new Error(`Failed to create feedback: ${error.message}`);
      }
      
      if (!data || data.length === 0) {
        console.error("No data returned after insert");
        throw new Error("Failed to create feedback: No data returned");
      }
      
      const createdFeedback = data[0];
      console.log("Feedback created successfully:", createdFeedback);
      
      return {
        id: createdFeedback.id,
        name: createdFeedback.name,
        email: createdFeedback.email,
        message: createdFeedback.message,
        createdAt: createdFeedback.created_at
      };
    } catch (error) {
      console.error("Error creating feedback:", error);
      throw error;
    }
  },

  // Delete feedback
  delete: async (id: string): Promise<void> => {
    try {
      console.log(`Attempting to delete feedback with ID: ${id}`);
      const { error } = await supabase
        .from('feedback')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error("Supabase error deleting feedback:", error);
        throw new Error(`Failed to delete feedback: ${error.message}`);
      }
      
      console.log(`Successfully deleted feedback with ID: ${id}`);
    } catch (error) {
      console.error("Error deleting feedback:", error);
      throw error;
    }
  }
};
