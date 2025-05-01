
import { useState } from "react";
import { Header } from "@/components/header";
import { FeedbackForm } from "@/components/feedback-form";
import { FeedbackList } from "@/components/feedback-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("list");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSubmitSuccess = () => {
    setActiveTab("list");
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <div className="container py-8 flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Feedback Portal</h1>
          <p className="text-muted-foreground">
            Submit your feedback or browse existing submissions.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="list">Feedback List</TabsTrigger>
            <TabsTrigger value="form">Submit Feedback</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-6">
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
          </TabsContent>
          
          <TabsContent value="form">
            <div className="w-full max-w-md mx-auto">
              <FeedbackForm onSubmitSuccess={handleSubmitSuccess} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <footer className="border-t py-6">
        <div className="container flex justify-between text-sm text-muted-foreground">
          <p>© 2025 MIDIOR FEEDBACK</p>
          <p>All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
