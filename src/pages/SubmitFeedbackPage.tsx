
import { useState } from "react";
import { Header } from "@/components/header";
import { FeedbackForm } from "@/components/feedback-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
      
      <div className="container py-8 flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Submit Feedback</h1>
          <p className="text-muted-foreground">
            We value your input. Please share your thoughts with us.
          </p>
        </div>
        
        <div className="w-full max-w-md mx-auto">
          <FeedbackForm onSubmitSuccess={handleSubmitSuccess} />
        </div>
      </div>
      
      <footer className="border-t py-6">
        <div className="container flex justify-between text-sm text-muted-foreground">
          <p>© 2025 Ajeet Singh</p>
          <p>All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default SubmitFeedbackPage;
