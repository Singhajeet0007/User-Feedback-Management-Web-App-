
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { FeedbackForm } from "@/components/feedback-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const SubmitFeedbackPage = () => {
  const navigate = useNavigate();

  const handleSubmitSuccess = () => {
    toast.success("Feedback submitted successfully!");
    // Navigate to the feedback list page after successful submission
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container py-6 md:py-8 flex-1 px-4 md:px-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4 -ml-2 flex items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Feedback List
        </Button>
        
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Submit Feedback</h1>
          <p className="text-muted-foreground">
            We value your input. Please share your thoughts with us.
          </p>
        </div>
        
        <div className="w-full md:max-w-md mx-auto">
          <FeedbackForm onSubmitSuccess={handleSubmitSuccess} />
        </div>
      </div>
      
      <footer className="border-t py-4 md:py-6 mt-8">
        <div className="container flex flex-col md:flex-row justify-between text-sm text-muted-foreground px-4 md:px-6">
          <p>© 2025 Ajeet Singh</p>
          <p className="mt-1 md:mt-0">All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default SubmitFeedbackPage;
