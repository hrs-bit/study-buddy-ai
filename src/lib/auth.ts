export interface User {
  id: string;
  name: string;
  email: string;
}

const USERS_KEY = "studymate_users";
const CURRENT_USER_KEY = "studymate_current_user";

function getUsers(): User[] {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

export function signup(name: string, email: string, password: string): User | null {
  const users = getUsers();
  if (users.find((u) => u.email === email)) return null;
  const user: User = { id: crypto.randomUUID(), name, email };
  const stored = [...users, { ...user, password }];
  localStorage.setItem(USERS_KEY, JSON.stringify(stored));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
}

export function login(email: string, password: string): User | null {
  const users: Array<User & { password?: string }> = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) return null;
  const user: User = { id: found.id, name: found.name, email: found.email };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser(): User | null {
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function loginWithGoogle(): User {
  const user: User = { id: crypto.randomUUID(), name: "Google User", email: "user@gmail.com" };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
}
