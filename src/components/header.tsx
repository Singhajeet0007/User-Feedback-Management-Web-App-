
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Search, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  showSearch?: boolean;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
}

export function Header({ showSearch, searchTerm, setSearchTerm }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">USER FEEDBACK MANAGEMENT</h1>
        </div>
        <div className="flex items-center gap-4">
          {showSearch && searchTerm !== undefined && setSearchTerm && (
            <div className="relative hidden sm:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search feedback..."
                className="w-[200px] sm:w-[300px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Feedback List
            </Link>
            <Link to="/submit" className="text-sm font-medium hover:text-primary transition-colors">
              Submit Feedback
            </Link>
          </nav>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link 
                    to="/" 
                    className="text-base font-medium hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Feedback List
                  </Link>
                  <Link 
                    to="/submit" 
                    className="text-base font-medium hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Submit Feedback
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
