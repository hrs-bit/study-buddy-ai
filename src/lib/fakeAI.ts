export interface StudyPlan {
  overview: string;
  dailySchedule: { day: string; tasks: string[] }[];
  tips: string[];
}

export function generateStudyPlan(goal: string): StudyPlan {
  const daysMatch = goal.match(/(\d+)\s*days?/i);
  const numDays = daysMatch ? parseInt(daysMatch[1]) : 7;
  const examMatch = goal.match(/exam|test|quiz/i);
  const subjectMatch = goal.match(/math|physics|chemistry|biology|history|english|computer|python|java|science/i);
  const subject = subjectMatch ? subjectMatch[0] : "your subject";

  const schedule: { day: string; tasks: string[] }[] = [];
  for (let i = 1; i <= Math.min(numDays, 10); i++) {
    const phase = i <= numDays * 0.4 ? "learn" : i <= numDays * 0.75 ? "practice" : "review";
    const tasks =
      phase === "learn"
        ? [`Study ${subject} core concepts (Chapter ${i})`, "Take detailed notes", "Watch educational videos", "Create flashcards"]
        : phase === "practice"
          ? [`Solve ${subject} practice problems`, "Attempt past papers", "Identify weak areas", "Group study session"]
          : [`Review all ${subject} notes`, "Do a timed mock test", "Review mistakes", "Light revision & rest"];
    schedule.push({ day: `Day ${i}`, tasks });
  }

  return {
    overview: examMatch
      ? `You have ${numDays} days to prepare for your ${subject} exam. Here's an optimized study plan that follows the proven 40-35-25 learning method: 40% learning new material, 35% practice, and 25% revision.`
      : `Here's a ${numDays}-day plan to master ${subject}. We'll use active recall and spaced repetition to maximize retention.`,
    dailySchedule: schedule,
    tips: [
      "🧠 Use the Pomodoro technique: 25 min study + 5 min break",
      "📝 Teach concepts to someone else — it's the best way to learn",
      "😴 Get 7-8 hours of sleep — memory consolidation happens during sleep",
      "🏃 Exercise for 20 minutes before study sessions to boost focus",
      "📱 Put your phone in another room while studying",
      "🎯 Start with the hardest topics when your energy is highest",
      "💧 Stay hydrated and keep healthy snacks nearby",
    ],
  };
}
