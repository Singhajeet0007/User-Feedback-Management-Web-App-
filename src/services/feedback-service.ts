
import { Feedback, FeedbackFormValues } from "@/types/feedback";
import { v4 as uuidv4 } from "uuid";

// Mock data for our feedback list
const initialFeedback: Feedback[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    message: "The new dashboard design is amazing! Much easier to navigate than before.",
    createdAt: "2025-04-28T08:30:00Z",
  },
  {
    id: "2",
    name: "Sam Miller",
    email: "sam.miller@example.com",
    message: "I'm having trouble accessing the reporting features. Can someone help me with this?",
    createdAt: "2025-04-27T14:45:00Z",
  },
  {
    id: "3",
    name: "Taylor Williams",
    email: "taylor.w@example.com",
    message: "Love the new mobile responsiveness! Works perfectly on my phone now.",
    createdAt: "2025-04-26T09:15:00Z",
  },
  {
    id: "4",
    name: "Jordan Lee",
    email: "jlee@example.com",
    message: "Would it be possible to add dark mode support? That would make the app much more comfortable to use at night.",
    createdAt: "2025-04-25T17:20:00Z",
  },
];

// Local storage key
const STORAGE_KEY = "midior-feedback";

// Helper to save data to local storage
const saveToStorage = (data: Feedback[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Helper to get data from local storage
const getFromStorage = (): Feedback[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    saveToStorage(initialFeedback);
    return initialFeedback;
  }
  return JSON.parse(stored);
};

// Create a simulated delay for async operations
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const FeedbackService = {
  // Get all feedback
  getAll: async (): Promise<Feedback[]> => {
    await delay(500); // Simulate network delay
    const feedbackList = getFromStorage();
    return feedbackList.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  // Create new feedback
  create: async (feedback: FeedbackFormValues): Promise<Feedback> => {
    await delay(800); // Simulate network delay
    
    const newFeedback: Feedback = {
      id: uuidv4(),
      ...feedback,
      createdAt: new Date().toISOString(),
    };
    
    const feedbackList = getFromStorage();
    feedbackList.push(newFeedback);
    saveToStorage(feedbackList);
    
    return newFeedback;
  },

  // Delete feedback
  delete: async (id: string): Promise<void> => {
    await delay(500); // Simulate network delay
    
    const feedbackList = getFromStorage();
    const updatedList = feedbackList.filter(item => item.id !== id);
    saveToStorage(updatedList);
  }
};
