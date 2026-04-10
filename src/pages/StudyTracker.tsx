import { useState, useEffect, useRef } from "react";
import { getSubjects, addSubject, saveSession, deleteSession, getSessions, StudySession } from "@/lib/studyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Square, Plus, Clock, BookOpen, Trash2 } from "lucide-react";

export default function StudyTracker() {
  const [subjects, setSubjects] = useState(getSubjects());
  const [newSubject, setNewSubject] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(subjects[0] || "");
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [sessions, setSessions] = useState<StudySession[]>(getSessions());
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsed * 1000;
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => {
    if (!selectedSubject) return;
    setElapsed(0);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    if (elapsed > 0) {
      const session: StudySession = {
        id: crypto.randomUUID(),
        subject: selectedSubject,
        startTime: Date.now() - elapsed * 1000,
        endTime: Date.now(),
        duration: elapsed,
      };
      saveSession(session);
      setSessions([...sessions, session]);
    }
    setElapsed(0);
  };

  const handleAddSubject = () => {
    if (newSubject.trim()) {
      addSubject(newSubject.trim());
      setSubjects(getSubjects());
      setNewSubject("");
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Study Tracker</h1>
        <p className="text-muted-foreground mt-1">Track your study sessions and build consistency.</p>
      </div>

      {/* Timer */}
      <div className="bg-card border border-border rounded-xl p-8 text-center space-y-6">
        <div className="text-6xl font-bold text-foreground font-mono tracking-wider">{formatTime(elapsed)}</div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => !isRunning && setSelectedSubject(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedSubject === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-2 max-w-xs">
            <Input placeholder="Add subject..." value={newSubject} onChange={(e) => setNewSubject(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddSubject()} />
            <Button variant="outline" size="icon" onClick={handleAddSubject}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          {!isRunning ? (
            <Button variant="hero" onClick={handleStart} disabled={!selectedSubject} className="gap-2">
              <Play className="w-4 h-4" /> Start Studying
            </Button>
          ) : (
            <Button variant="destructive" onClick={handleStop} className="gap-2 rounded-full px-6">
              <Square className="w-4 h-4" /> Stop
            </Button>
          )}
        </div>
      </div>

      {/* History */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" /> Session History
        </h2>
        {sessions.length === 0 ? (
          <p className="text-muted-foreground text-sm">No sessions yet. Start your first study session!</p>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {[...sessions].reverse().slice(0, 20).map((s) => (
              <div key={s.id} className="flex items-center justify-between py-3 px-4 rounded-lg bg-secondary/50 group">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.subject}</p>
                    <p className="text-xs text-muted-foreground">{new Date(s.startTime).toLocaleDateString()} {new Date(s.startTime).toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-muted-foreground">{formatTime(s.duration)}</span>
                  <button
                    onClick={() => { deleteSession(s.id); setSessions(getSessions()); }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
