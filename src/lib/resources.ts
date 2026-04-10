export interface Resource {
  title: string;
  type: "video" | "article" | "course";
  url: string;
  description: string;
}

const resourcesDB: Record<string, Resource[]> = {
  python: [
    { title: "Python for Beginners — Full Course", type: "video", url: "https://youtube.com", description: "Learn Python from scratch in this comprehensive 4-hour tutorial." },
    { title: "Automate the Boring Stuff with Python", type: "article", url: "https://automatetheboringstuff.com", description: "Free online book for practical Python programming." },
    { title: "Python Data Science Handbook", type: "course", url: "https://jakevdp.github.io/PythonDataScienceHandbook/", description: "Complete guide to Python for data science." },
    { title: "Real Python Tutorials", type: "article", url: "https://realpython.com", description: "In-depth Python tutorials and articles." },
    { title: "CS50's Introduction to Python", type: "course", url: "https://cs50.harvard.edu/python", description: "Harvard's free Python course for beginners." },
  ],
  math: [
    { title: "3Blue1Brown — Essence of Linear Algebra", type: "video", url: "https://youtube.com", description: "Beautiful visual explanations of linear algebra concepts." },
    { title: "Khan Academy Mathematics", type: "course", url: "https://khanacademy.org/math", description: "Free courses from arithmetic to calculus and beyond." },
    { title: "Paul's Online Math Notes", type: "article", url: "https://tutorial.math.lamar.edu", description: "Comprehensive calculus and algebra notes." },
    { title: "MIT OpenCourseWare — Calculus", type: "course", url: "https://ocw.mit.edu", description: "Full MIT calculus course with lectures and problem sets." },
  ],
  physics: [
    { title: "Walter Lewin's Physics Lectures", type: "video", url: "https://youtube.com", description: "Legendary MIT physics lectures." },
    { title: "HyperPhysics", type: "article", url: "http://hyperphysics.phy-astr.gsu.edu", description: "Interactive concept maps for physics topics." },
    { title: "Feynman Lectures on Physics", type: "course", url: "https://feynmanlectures.caltech.edu", description: "The classic Feynman physics lectures, free online." },
  ],
  javascript: [
    { title: "JavaScript — The Complete Guide", type: "video", url: "https://youtube.com", description: "Master JavaScript with this in-depth video course." },
    { title: "MDN Web Docs — JavaScript", type: "article", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", description: "The definitive JS reference documentation." },
    { title: "The Odin Project", type: "course", url: "https://theodinproject.com", description: "Full-stack JavaScript curriculum, completely free." },
    { title: "JavaScript.info", type: "article", url: "https://javascript.info", description: "Modern JavaScript tutorial from basics to advanced." },
  ],
  history: [
    { title: "Crash Course World History", type: "video", url: "https://youtube.com", description: "Engaging and fast-paced world history series." },
    { title: "HistoryExtra Articles", type: "article", url: "https://historyextra.com", description: "Articles from BBC History Magazine." },
    { title: "Yale Open Courses — History", type: "course", url: "https://oyc.yale.edu", description: "Free Yale history courses with full lectures." },
  ],
  default: [
    { title: "CrashCourse — YouTube", type: "video", url: "https://youtube.com/@crashcourse", description: "Educational videos on dozens of subjects." },
    { title: "Wikipedia", type: "article", url: "https://wikipedia.org", description: "Free encyclopedia — great starting point for any topic." },
    { title: "Coursera", type: "course", url: "https://coursera.org", description: "Free courses from top universities." },
    { title: "Khan Academy", type: "course", url: "https://khanacademy.org", description: "Free courses in math, science, and more." },
  ],
};

export function searchResources(query: string): Resource[] {
  const q = query.toLowerCase();
  for (const key of Object.keys(resourcesDB)) {
    if (q.includes(key)) return resourcesDB[key];
  }
  return resourcesDB.default;
}
