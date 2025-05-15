
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FeedbackFormValues } from "@/types/feedback";
import { FeedbackService } from "@/services/feedback-service";
import { toast } from "sonner";
import { Loader2, AlertCircle, WifiOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { v4 as uuidv4 } from "uuid";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

interface FeedbackFormProps {
  onSubmitSuccess: () => void;
}

export function FeedbackForm({ onSubmitSuccess }: FeedbackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  // Monitor online/offline status
  useState(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  });
  
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: FeedbackFormValues) => {
    try {
      setIsSubmitting(true);
      setSubmissionError(null);
      
      console.log("Submitting feedback with values:", values);
      
      // If offline, store locally and show success message
      if (isOffline) {
        const tempId = uuidv4();
        const feedbackWithId = {
          ...values,
          id: tempId,
          createdAt: new Date().toISOString()
        };
        
        // Store in local storage for later submission
        const storedFeedback = JSON.parse(localStorage.getItem('pendingFeedback') || '[]');
        localStorage.setItem('pendingFeedback', JSON.stringify([...storedFeedback, feedbackWithId]));
        
        toast.info("You're currently offline. Your feedback has been saved and will be submitted when you're back online.");
        form.reset();
        onSubmitSuccess();
        return;
      }
      
      // Online submission
      await FeedbackService.create(values);
      
      form.reset();
      onSubmitSuccess();
    } catch (error: any) {
      console.error("Error submitting feedback:", error);
      
      // Network error handling
      if (error.message?.includes('Failed to fetch') || error.name === 'TypeError') {
        setSubmissionError("Network error: Unable to connect to our servers. Please check your internet connection and try again.");
        toast.error("Connection issue. Please check your network.");
      } else {
        setSubmissionError(error.message || "Failed to submit feedback. Please try again.");
        toast.error("Failed to submit feedback. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-primary/5 rounded-t-lg">
        <CardTitle>Send Feedback</CardTitle>
        <CardDescription>
          We value your input. Please share your thoughts with us.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {isOffline && (
          <Alert variant="warning" className="mb-6 bg-amber-50 border-amber-300">
            <WifiOff className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              You are currently offline. Your feedback will be saved locally and submitted when you're back online.
            </AlertDescription>
          </Alert>
        )}
        
        {submissionError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {submissionError}
            </AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your feedback message..."
                      className="min-h-[150px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full transition-all hover:scale-[1.02]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
