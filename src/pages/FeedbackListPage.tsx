
import { useState } from "react";
import { Header } from "@/components/header";
import { FeedbackList } from "@/components/feedback-list";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeedbackListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header showSearch={true} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <div className="container py-8 flex-1">
        <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Feedback List</h1>
            <p className="text-muted-foreground">
              Browse all feedback submissions below.
            </p>
          </div>
          
          {isMobile && (
            <Button 
              onClick={() => navigate('/submit')} 
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" /> 
              Submit Feedback
            </Button>
          )}
        </div>
        
        <div className="w-full max-w-3xl mx-auto">
          {/* Mobile search for small screens */}
          <div className="mb-4 sm:hidden">
            <input
              type="search"
              placeholder="Search feedback..."
              className="w-full p-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <FeedbackList searchTerm={searchTerm} refreshTrigger={refreshTrigger} />
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

export default FeedbackListPage;
