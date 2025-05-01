
export interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface FeedbackFormValues {
  name: string;
  email: string;
  message: string;
}
