import { useState } from "react";
import { Search, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const suggestions = [
  "John Doe buying shares",
  "Dad's birthday",
  "Q4 roadmap",
  "investment meeting",
  "shipping updates",
];

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setIsFocused(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setIsFocused(false);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className={cn(
          "relative flex items-center bg-secondary rounded-xl transition-all",
          isFocused && "ring-2 ring-primary"
        )}>
          <div className="pl-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Smart search: try 'John Doe buying shares' or 'Dad's birthday'"
            className="flex-1 bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="pr-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {/* Search Suggestions Dropdown */}
      {isFocused && !query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50">
          <div className="p-3 border-b border-border">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              AI-Powered Smart Search
            </div>
          </div>
          <div className="p-2">
            <div className="text-xs font-medium text-muted-foreground px-2 py-1">
              Try searching for:
            </div>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-2 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                "{suggestion}"
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
