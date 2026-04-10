import { useState } from "react";
import { generateStudyPlan, StudyPlan } from "@/lib/fakeAI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Sparkles, CalendarDays, Lightbulb } from "lucide-react";

export default function AIAdvisor() {
  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!goal.trim()) return;
    setLoading(true);
    // Simulate AI thinking
    await new Promise((r) => setTimeout(r, 1500));
    const result = generateStudyPlan(goal);
    setPlan(result);
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Brain className="w-8 h-8 text-primary" /> AI Study Advisor
        </h1>
        <p className="text-muted-foreground mt-1">Tell me your goal and I'll create a personalized study plan.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <label className="text-sm font-medium text-foreground">What's your study goal?</label>
        <div className="flex gap-3">
          <Input
            placeholder='e.g. "I have exams in 10 days for Physics"'
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            className="flex-1"
          />
          <Button variant="hero" onClick={handleGenerate} disabled={loading} className="gap-2">
            <Sparkles className="w-4 h-4" />
            {loading ? "Thinking..." : "Generate Plan"}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {["I have exams in 10 days", "Learn Python in 2 weeks", "Math finals in 5 days", "Study JavaScript for 14 days"].map((example) => (
            <button
              key={example}
              onClick={() => setGoal(example)}
              className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {plan && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" /> Overview
            </h2>
            <p className="text-muted-foreground leading-relaxed">{plan.overview}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" /> Daily Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plan.dailySchedule.map((day) => (
                <div key={day.day} className="bg-secondary/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">{day.day}</h3>
                  <ul className="space-y-1">
                    {day.tasks.map((task, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span> {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" /> Study Tips
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {plan.tips.map((tip, i) => (
                <div key={i} className="bg-secondary/50 rounded-lg p-3 text-sm text-muted-foreground">
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
