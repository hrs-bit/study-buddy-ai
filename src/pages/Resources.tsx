import { useState } from "react";
import { searchResources, Resource } from "@/lib/resources";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Video, FileText, GraduationCap, ExternalLink } from "lucide-react";

const typeIcons = { video: Video, article: FileText, course: GraduationCap };
const typeColors = { video: "text-red-400", article: "text-sky-400", course: "text-emerald-400" };

export default function Resources() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Resource[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setResults(searchResources(query));
    setSearched(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Resource Finder</h1>
        <p className="text-muted-foreground mt-1">Find the best learning resources for any topic.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex gap-3">
          <Input
            placeholder='Search topics... e.g. "Python basics", "Math", "Physics"'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
          />
          <Button variant="hero" onClick={handleSearch} className="gap-2">
            <Search className="w-4 h-4" /> Search
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Python basics", "Math", "Physics", "JavaScript", "History"].map((topic) => (
            <button
              key={topic}
              onClick={() => { setQuery(topic); setResults(searchResources(topic)); setSearched(true); }}
              className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {searched && (
        <div className="space-y-3 animate-fade-in">
          <h2 className="text-lg font-semibold text-foreground">{results.length} resources found</h2>
          {results.map((r, i) => {
            const Icon = typeIcons[r.type];
            return (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <Icon className={`w-5 h-5 mt-0.5 ${typeColors[r.type]}`} />
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{r.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{r.description}</p>
                      <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground capitalize">{r.type}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
