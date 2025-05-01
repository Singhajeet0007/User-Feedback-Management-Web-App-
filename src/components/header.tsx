
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export function Header({ searchTerm, setSearchTerm }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">MIDIOR FEEDBACK</h1>
        </div>
        <div className="flex items-center gap-4">
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
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
