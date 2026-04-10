import { getTodayStats, getTotalStudyTime, getStreak, getWeeklyData } from "@/lib/studyData";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { Clock, Flame, BookOpen, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const todayStats = getTodayStats();
  const totalMinutes = getTotalStudyTime();
  const streak = getStreak();
  const weeklyData = getWeeklyData();

  const statCards = [
    { label: "Today's Study", value: `${todayStats.totalMinutes} min`, sublabel: `${todayStats.sessions} sessions`, icon: Clock, color: "text-primary" },
    { label: "Total Study Time", value: `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`, sublabel: "All time", icon: BookOpen, color: "text-emerald-400" },
    { label: "Current Streak", value: `${streak} days`, sublabel: "Keep it up!", icon: Flame, color: "text-orange-400" },
    { label: "Sessions Today", value: `${todayStats.sessions}`, sublabel: "Completed", icon: TrendingUp, color: "text-sky-400" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name} 👋</h1>
        <p className="text-muted-foreground mt-1">Here's your study progress overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Weekly Study Activity</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 20%)" />
            <XAxis dataKey="day" stroke="hsl(240 5% 65%)" fontSize={12} />
            <YAxis stroke="hsl(240 5% 65%)" fontSize={12} />
            <Tooltip
              contentStyle={{ background: "hsl(240 6% 9%)", border: "1px solid hsl(240 4% 20%)", borderRadius: "8px", color: "hsl(40 6% 95%)" }}
            />
            <Bar dataKey="minutes" fill="hsl(262 83% 58%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
