
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface HeaderProps {
  showSearch?: boolean;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
}

export function Header({ showSearch, searchTerm, setSearchTerm }: HeaderProps) {
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
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Feedback List
            </Link>
            <Link to="/submit" className="text-sm font-medium hover:text-primary transition-colors">
              Submit Feedback
            </Link>
          </nav>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
