
import { Feedback, FeedbackFormValues } from "@/types/feedback";
import { supabase } from "@/integrations/supabase/client";

// Dummy feedback data
const dummyFeedback: Feedback[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    message: "The user interface is very intuitive and easy to use. Great job!",
    createdAt: "2025-04-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    message: "I found a minor issue with the search functionality. It sometimes takes too long to respond.",
    createdAt: "2025-04-20T14:25:00Z"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    message: "Would love to see dark mode implemented in the next update. Otherwise, excellent application!",
    createdAt: "2025-04-25T09:15:00Z"
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    message: "The mobile responsiveness could use some improvement, especially on smaller screens.",
    createdAt: "2025-04-28T16:40:00Z"
  },
  {
    id: "5",
    name: "Alex Brown",
    email: "alex@example.com",
    message: "I'm impressed with how fast the application loads. Performance is excellent!",
    createdAt: "2025-05-01T11:20:00Z"
  }
];

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
      
      if (!data || data.length === 0) {
        console.log("No feedback data returned from Supabase, using dummy data");
        return dummyFeedback;
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
      console.log("Returning dummy data due to error");
      return dummyFeedback;
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
