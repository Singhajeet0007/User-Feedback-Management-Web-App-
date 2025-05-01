
import { useState, useEffect } from "react";
import { Feedback } from "@/types/feedback";
import { FeedbackCard } from "@/components/feedback-card";
import { FeedbackService } from "@/services/feedback-service";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface FeedbackListProps {
  searchTerm: string;
  refreshTrigger: number;
}

export function FeedbackList({ searchTerm, refreshTrigger }: FeedbackListProps) {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedback = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await FeedbackService.getAll();
      setFeedbackList(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setError("Failed to load feedback. Please try again.");
      toast.error("Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    try {
      await FeedbackService.delete(id);
      setFeedbackList(prevList => prevList.filter(item => item.id !== id));
      toast.success("Feedback deleted successfully");
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast.error("Failed to delete feedback");
    }
  };

  // Filter the feedback list based on search term
  const filteredFeedback = feedbackList.filter(
    feedback =>
      feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="w-full">
            <Skeleton className="h-[200px] w-full rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-xl font-semibold mb-2">Error loading feedback</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={fetchFeedback} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  if (filteredFeedback.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-xl font-semibold mb-2">No feedback found</h3>
        {searchTerm ? (
          <p className="text-muted-foreground">
            No results match your search. Try different keywords.
          </p>
        ) : (
          <p className="text-muted-foreground">
            Be the first to submit feedback!
          </p>
        )}
        <Button onClick={fetchFeedback} variant="outline" className="mt-4 flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button 
          onClick={fetchFeedback} 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      <div className="space-y-4">
        {filteredFeedback.map(feedback => (
          <FeedbackCard
            key={feedback.id}
            feedback={feedback}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
