export interface StudySession {
  id: string;
  subject: string;
  startTime: number;
  endTime: number;
  duration: number; // seconds
}

const SESSIONS_KEY = "studymate_sessions";
const SUBJECTS_KEY = "studymate_subjects";

export function getSessions(): StudySession[] {
  return JSON.parse(localStorage.getItem(SESSIONS_KEY) || "[]");
}

export function saveSession(session: StudySession) {
  const sessions = getSessions();
  sessions.push(session);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function deleteSession(id: string) {
  const sessions = getSessions().filter((s) => s.id !== id);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function getSubjects(): string[] {
  return JSON.parse(localStorage.getItem(SUBJECTS_KEY) || '["Mathematics","Physics","Computer Science"]');
}

export function addSubject(subject: string) {
  const subjects = getSubjects();
  if (!subjects.includes(subject)) {
    subjects.push(subject);
    localStorage.setItem(SUBJECTS_KEY, JSON.stringify(subjects));
  }
}

export function getTodayStats() {
  const sessions = getSessions();
  const today = new Date().toDateString();
  const todaySessions = sessions.filter((s) => new Date(s.startTime).toDateString() === today);
  const totalSeconds = todaySessions.reduce((acc, s) => acc + s.duration, 0);
  return { sessions: todaySessions.length, totalMinutes: Math.round(totalSeconds / 60) };
}

export function getTotalStudyTime() {
  const sessions = getSessions();
  const totalSeconds = sessions.reduce((acc, s) => acc + s.duration, 0);
  return Math.round(totalSeconds / 60);
}

export function getStreak(): number {
  const sessions = getSessions();
  if (sessions.length === 0) return 0;
  const dates = [...new Set(sessions.map((s) => new Date(s.startTime).toDateString()))].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );
  let streak = 0;
  const now = new Date();
  for (let i = 0; i < dates.length; i++) {
    const expected = new Date(now);
    expected.setDate(expected.getDate() - i);
    if (dates[i] === expected.toDateString()) {
      streak++;
    } else break;
  }
  return streak;
}

export function getWeeklyData() {
  const sessions = getSessions();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date();
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dayStr = d.toDateString();
    const dayMinutes = sessions
      .filter((s) => new Date(s.startTime).toDateString() === dayStr)
      .reduce((acc, s) => acc + s.duration, 0);
    result.push({ day: days[d.getDay()], minutes: Math.round(dayMinutes / 60) });
  }
  return result;
}
