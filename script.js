/**
 * CareerLift - Job Portal & Prep Hub JavaScript
 * Single-page navigation, reactive state management (localStorage),
 * dynamic filtering, interactive quizzes, and application flows.
 */

// ==========================================================================
// 1. Mock Data: Jobs, Aptitude, Technical, Coding & Interviews
// ==========================================================================
const SAMPLE_JOBS = [
  {
    id: 1,
    company: "Google Cloud",
    role: "Associate Cloud Engineer",
    location: "Bengaluru, India (Hybrid)",
    type: "Full-Time",
    experience: "Fresher",
    salary: "₹14 - 18 LPA",
    description: "Build scalable cloud infrastructure, automate deployment pipelines, and support enterprise client migrations.",
    posted: "1 day ago"
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Frontend Developer Intern",
    location: "Hyderabad, India (Remote)",
    type: "Internship",
    experience: "Fresher",
    salary: "₹45,000 / month",
    description: "Craft modern, accessible user interfaces using TypeScript, React, and Fluent Design UI systems.",
    posted: "2 days ago"
  },
  {
    id: 3,
    company: "Amazon",
    role: "Software Development Engineer (SDE-1)",
    location: "Pune, India",
    type: "Full-Time",
    experience: "1-2 Years",
    salary: "₹18 - 24 LPA",
    description: "Design low-latency distributed web microservices, data pipelines, and scalable APIs for e-commerce.",
    posted: "Just now"
  },
  {
    id: 4,
    company: "Zomato",
    role: "Junior Data Analyst",
    location: "Gurugram, India",
    type: "Full-Time",
    experience: "Fresher",
    salary: "₹8 - 11 LPA",
    description: "Analyze user delivery journeys, construct SQL queries, and build automated performance dashboards.",
    posted: "3 days ago"
  },
  {
    id: 5,
    company: "Razorpay",
    role: "Full Stack Engineer (Node & React)",
    location: "Remote",
    type: "Remote",
    experience: "1-2 Years",
    salary: "₹15 - 20 LPA",
    description: "Build secure fintech payment gateway solutions with high reliability and seamless developer checkout SDKs.",
    posted: "4 days ago"
  },
  {
    id: 6,
    company: "Infosys",
    role: "System Engineer Trainee",
    location: "Mysore / Bengaluru",
    type: "Full-Time",
    experience: "Fresher",
    salary: "₹4.5 - 6 LPA",
    description: "Comprehensive foundation training in Java, Python, enterprise databases, and modern agile project delivery.",
    posted: "1 week ago"
  }
];

const APTITUDE_QUESTIONS = [
  {
    id: "apt-1",
    category: "Quantitative",
    question: "A train running at 54 km/hr crosses a pole in 20 seconds. What is the length of the train?",
    options: ["250 meters", "300 meters", "350 meters", "400 meters"],
    answerIndex: 1,
    explanation: "Speed in m/s = 54 × (5/18) = 15 m/s. Distance (length) = Speed × Time = 15 m/s × 20 s = 300 meters."
  },
  {
    id: "apt-2",
    category: "Profit & Loss",
    question: "A student buys a gadget for ₹800 and sells it for ₹1000. What is the profit percentage?",
    options: ["20%", "25%", "15%", "30%"],
    answerIndex: 1,
    explanation: "Profit = ₹1000 - ₹800 = ₹200. Profit % = (Profit / Cost Price) × 100 = (200 / 800) × 100 = 25%."
  },
  {
    id: "apt-3",
    category: "Time & Work",
    question: "A can complete a project in 12 days, and B can complete it in 6 days. Working together, in how many days can they complete it?",
    options: ["3 days", "4 days", "5 days", "4.5 days"],
    answerIndex: 1,
    explanation: "Combined rate per day = (1/12) + (1/6) = 3/12 = 1/4. Hence, they take 4 days together."
  },
  {
    id: "apt-4",
    category: "Logical Reasoning",
    question: "Find the next number in the series: 3, 7, 15, 31, 63, ___",
    options: ["94", "127", "126", "130"],
    answerIndex: 1,
    explanation: "Pattern: Each number is (previous number × 2) + 1. 63 × 2 + 1 = 127."
  }
];

const TECHNICAL_QUESTIONS = [
  {
    id: "tech-1",
    category: "Data Structures",
    question: "What is the average and worst-case time complexity of lookup in a balanced Binary Search Tree (BST)?",
    options: ["O(1) and O(n)", "O(log n) and O(log n)", "O(n) and O(n log n)", "O(log n) and O(n)"],
    answerIndex: 1,
    explanation: "In a balanced BST (like AVL or Red-Black Tree), search operations are guaranteed to be O(log n) for both average and worst case."
  },
  {
    id: "tech-2",
    category: "Web & JavaScript",
    question: "Which of the following creates a closure in JavaScript?",
    options: [
      "A function defined inside another function that accesses outer variables",
      "Using the async/await keyword",
      "Assigning an array to an object property",
      "Using the JSON.stringify() method"
    ],
    answerIndex: 0,
    explanation: "A closure is the combination of a function bundled together with references to its lexical environment, allowing it to access outer scope variables even after execution."
  },
  {
    id: "tech-3",
    category: "DBMS & SQL",
    question: "Which SQL clause is used to filter records resulting from an aggregate function like COUNT() or AVG()?",
    options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
    answerIndex: 1,
    explanation: "The HAVING clause was added to SQL because the WHERE keyword could not be used with aggregate functions."
  },
  {
    id: "tech-4",
    category: "Core OS",
    question: "Which condition is NOT required for a deadlock to occur?",
    options: ["Mutual Exclusion", "Hold and Wait", "Preemption allowed", "Circular Wait"],
    answerIndex: 2,
    explanation: "Deadlock requires 'No Preemption'. If preemption is allowed, deadlocks can be broken and prevented."
  }
];

const CODING_QUESTIONS = [
  {
    title: "1. Two Sum (Array & Hash Map)",
    difficulty: "Easy",
    diffClass: "diff-easy",
    problem: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    solution: `// Time Complexity: O(n), Space Complexity: O(n)
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`
  },
  {
    title: "2. Reverse a Singly Linked List",
    difficulty: "Easy",
    diffClass: "diff-easy",
    problem: "Given the head of a singly linked list, reverse the list and return the reversed list's head.",
    solution: `// Time: O(n), Space: O(1)
function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`
  },
  {
    title: "3. Valid Parentheses (Stack)",
    difficulty: "Medium",
    diffClass: "diff-med",
    problem: "Given a string s containing '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    solution: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`
  }
];

const INTERVIEW_QUESTIONS = [
  {
    q: "Tell me about yourself as a fresh graduate.",
    a: "Structure your response with the Present-Past-Future model: (1) Mention your degree, core skills, and passionate area of technology; (2) Highlight a key project or internship where you solved a real problem; (3) Explain why you are excited about this specific company and how your technical foundation adds value."
  },
  {
    q: "What is the difference between synchronous and asynchronous programming?",
    a: "Synchronous operations are blocking; each statement waits for the previous one to finish before moving on. Asynchronous code runs non-blockingly (e.g., using Event Loops, Promises, callbacks), allowing other operations like UI rendering or file queries to execute concurrently."
  },
  {
    q: "How do you handle difficult bugs or tight project deadlines?",
    a: "Explain your methodical debugging approach: isolate the problem with logging/breakpoints, reproduce it consistently, search documentation or GitHub issues, and communicate early with teammates or mentors rather than getting stuck silently."
  },
  {
    q: "Why should we hire you over other candidates?",
    a: "Focus on your fast learning curve, dedication to clean, maintainable code, problem-solving mindset, and strong collaborative team attitude demonstrated through your college projects and hackathons."
  }
];

// ==========================================================================
// 2. Application State Management (Local Storage)
// ==========================================================================
let appState = {
  savedJobs: JSON.parse(localStorage.getItem("careerlift_saved_jobs")) || [],
  appliedJobs: JSON.parse(localStorage.getItem("careerlift_applied_jobs")) || [
    {
      id: 1,
      role: "Associate Cloud Engineer",
      company: "Google Cloud",
      date: "Nov 23, 2026",
      status: "In Review"
    }
  ],
  answeredQuizzes: JSON.parse(localStorage.getItem("careerlift_answered_quizzes")) || {}
};

function saveState() {
  localStorage.setItem("careerlift_saved_jobs", JSON.stringify(appState.savedJobs));
  localStorage.setItem("careerlift_applied_jobs", JSON.stringify(appState.appliedJobs));
  localStorage.setItem("careerlift_answered_quizzes", JSON.stringify(appState.answeredQuizzes));
  updateDashboardUI();
}

// ==========================================================================
// 3. Navigation & Views
// ==========================================================================
function navigateTo(targetView) {
  // Update view visibility
  document.querySelectorAll(".view-section").forEach(sec => {
    sec.classList.remove("active");
  });
  const activeView = document.getElementById(`view-${targetView}`);
  if (activeView) {
    activeView.classList.add("active");
  }

  // Update nav links
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("data-target") === targetView) {
      link.classList.add("active");
    }
  });

  // Mobile menu auto-close
  const navMenu = document.getElementById("navMenu");
  if (navMenu.classList.contains("open")) {
    navMenu.classList.remove("open");
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Update dashboard when navigated
  if (targetView === "dashboard") {
    updateDashboardUI();
  }
}

// ==========================================================================
// 4. Jobs Board Rendering & Filtering
// ==========================================================================
function renderJobs() {
  const query = document.getElementById("jobFilterQuery").value.toLowerCase();
  const typeFilter = document.getElementById("jobFilterType").value;
  const expFilter = document.getElementById("jobFilterExp").value;
  const container = document.getElementById("jobListings");

  const filtered = SAMPLE_JOBS.filter(job => {
    const matchesQuery = job.role.toLowerCase().includes(query) ||
                         job.company.toLowerCase().includes(query) ||
                         job.location.toLowerCase().includes(query);
    const matchesType = (typeFilter === "All") || (job.type === typeFilter);
    const matchesExp = (expFilter === "All") || (job.experience === expFilter);
    return matchesQuery && matchesType && matchesExp;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 0.75rem; color: var(--border-focus);"></i>
        <h3>No matching jobs found</h3>
        <p>Try modifying your search keywords or filter criteria.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(job => {
    const isSaved = appState.savedJobs.includes(job.id);
    const isApplied = appState.appliedJobs.some(a => a.id === job.id);

    return `
      <div class="job-card">
        <div>
          <div class="job-header">
            <div class="job-company-info">
              <div class="company-logo">${job.company.charAt(0)}</div>
              <div class="company-details">
                <h4>${job.company}</h4>
                <h3>${job.role}</h3>
              </div>
            </div>
            <button class="bookmark-btn ${isSaved ? 'saved' : ''}" 
                    title="${isSaved ? 'Remove Bookmark' : 'Save Job'}"
                    onclick="toggleSaveJob(${job.id})">
              <i class="fa-${isSaved ? 'solid' : 'regular'} fa-bookmark"></i>
            </button>
          </div>

          <div class="job-meta">
            <span class="job-tag tag-type"><i class="fa-solid fa-briefcase"></i> ${job.type}</span>
            <span class="job-tag"><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
            <span class="job-tag"><i class="fa-solid fa-user-graduate"></i> ${job.experience}</span>
          </div>

          <p class="job-desc">${job.description}</p>
        </div>

        <div class="job-footer">
          <span class="job-salary">${job.salary}</span>
          <button class="btn btn-sm ${isApplied ? 'btn-secondary' : 'btn-primary'}" 
                  ${isApplied ? 'disabled' : ''}
                  onclick="openApplyModal(${job.id})">
            ${isApplied ? '<i class="fa-solid fa-check"></i> Applied' : '<i class="fa-solid fa-paper-plane"></i> Apply Now'}
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function toggleSaveJob(jobId) {
  const index = appState.savedJobs.indexOf(jobId);
  if (index > -1) {
    appState.savedJobs.splice(index, 1);
    showToast("Job removed from saved bookmarks.");
  } else {
    appState.savedJobs.push(jobId);
    showToast("Job successfully saved to your dashboard!");
  }
  saveState();
  renderJobs();
}

// ==========================================================================
// 5. Job Application Modal
// ==========================================================================
function openApplyModal(jobId) {
  const job = SAMPLE_JOBS.find(j => j.id === jobId);
  if (!job) return;

  document.getElementById("modalJobId").value = job.id;
  document.getElementById("modalJobTitle").textContent = `Apply for ${job.role} at ${job.company}`;
  document.getElementById("applyModal").classList.add("active");
}

function closeApplyModal() {
  document.getElementById("applyModal").classList.remove("active");
  document.getElementById("applyForm").reset();
}

function submitApplication(event) {
  event.preventDefault();
  const jobId = parseInt(document.getElementById("modalJobId").value);
  const job = SAMPLE_JOBS.find(j => j.id === jobId);
  const applicantName = document.getElementById("applicantName").value;

  if (job) {
    const newApplication = {
      id: job.id,
      role: job.role,
      company: job.company,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Submitted"
    };

    // Prevent duplicate
    if (!appState.appliedJobs.some(a => a.id === job.id)) {
      appState.appliedJobs.unshift(newApplication);
      saveState();
    }

    closeApplyModal();
    renderJobs();
    showToast(`Success! Application submitted for ${job.role}`);
  }
}

// ==========================================================================
// 6. Job Preparation Module (Quizzes, Coding, Interviews)
// ==========================================================================
function renderPreparation() {
  // 1. Aptitude MCQs
  const aptContainer = document.getElementById("aptitudeQuestions");
  aptContainer.innerHTML = APTITUDE_QUESTIONS.map((q, idx) => {
    return createQuizQuestionHtml(q, idx + 1, "aptitude");
  }).join("");

  // 2. Technical MCQs
  const techContainer = document.getElementById("technicalQuestions");
  techContainer.innerHTML = TECHNICAL_QUESTIONS.map((q, idx) => {
    return createQuizQuestionHtml(q, idx + 1, "technical");
  }).join("");

  // 3. Coding Challenges
  const codingContainer = document.getElementById("codingQuestions");
  codingContainer.innerHTML = CODING_QUESTIONS.map(item => `
    <div class="coding-card">
      <div class="coding-header">
        <h3 style="font-size: 1.15rem; font-weight: 700;">${item.title}</h3>
        <span class="difficulty-badge ${item.diffClass}">${item.difficulty}</span>
      </div>
      <p style="color: var(--text-muted); font-size: 0.95rem;">${item.problem}</p>
      <pre class="code-snippet"><code>${escapeHtml(item.solution)}</code></pre>
    </div>
  `).join("");

  // 4. Interview Q&A
  const interviewContainer = document.getElementById("interviewQuestions");
  interviewContainer.innerHTML = INTERVIEW_QUESTIONS.map((item, idx) => `
    <div class="accordion-item ${idx === 0 ? 'active' : ''}">
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <span><i class="fa-solid fa-circle-question" style="margin-right: 0.5rem; color: var(--primary);"></i> ${item.q}</span>
        <i class="fa-solid fa-chevron-down"></i>
      </button>
      <div class="accordion-body">
        <p>${item.a}</p>
      </div>
    </div>
  `).join("");

  // Restore answered states
  restoreQuizAnswers();
}

function createQuizQuestionHtml(q, number, type) {
  return `
    <div class="question-card" id="card-${q.id}">
      <div class="question-title">
        <span class="q-badge">Q${number} • ${q.category}</span>
        <span>${q.question}</span>
      </div>
      <div class="options-grid">
        ${q.options.map((opt, optIdx) => `
          <button class="option-item" onclick="selectAnswer('${q.id}', ${optIdx}, ${q.answerIndex}, '${type}')">
            <strong>${String.fromCharCode(65 + optIdx)}.</strong> ${opt}
          </button>
        `).join("")}
      </div>
      <div class="explanation-box" id="exp-${q.id}">
        <strong><i class="fa-solid fa-circle-info"></i> Explanation:</strong> ${q.explanation}
      </div>
    </div>
  `;
}

function selectAnswer(qId, selectedIdx, correctIdx, type) {
  // If already answered, allow reselection
  const card = document.getElementById(`card-${qId}`);
  const options = card.querySelectorAll(".option-item");
  const expBox = document.getElementById(`exp-${qId}`);

  options.forEach((opt, idx) => {
    opt.classList.remove("correct", "wrong");
    if (idx === correctIdx) {
      opt.classList.add("correct");
    } else if (idx === selectedIdx) {
      opt.classList.add("wrong");
    }
  });

  expBox.classList.add("active");

  // Save to state
  appState.answeredQuizzes[qId] = {
    selected: selectedIdx,
    correct: selectedIdx === correctIdx,
    type: type
  };
  saveState();
}

function restoreQuizAnswers() {
  Object.keys(appState.answeredQuizzes).forEach(qId => {
    const data = appState.answeredQuizzes[qId];
    const card = document.getElementById(`card-${qId}`);
    if (!card) return;

    let targetList = (data.type === "aptitude") ? APTITUDE_QUESTIONS : TECHNICAL_QUESTIONS;
    let questionObj = targetList.find(q => q.id === qId);
    if (!questionObj) return;

    const options = card.querySelectorAll(".option-item");
    const expBox = document.getElementById(`exp-${qId}`);

    options.forEach((opt, idx) => {
      if (idx === questionObj.answerIndex) {
        opt.classList.add("correct");
      } else if (idx === data.selected) {
        opt.classList.add("wrong");
      }
    });

    if (expBox) expBox.classList.add("active");
  });
}

function resetQuiz(type) {
  const targetList = (type === "aptitude") ? APTITUDE_QUESTIONS : TECHNICAL_QUESTIONS;
  targetList.forEach(q => {
    delete appState.answeredQuizzes[q.id];
    const card = document.getElementById(`card-${q.id}`);
    if (card) {
      card.querySelectorAll(".option-item").forEach(opt => opt.classList.remove("correct", "wrong"));
      const exp = document.getElementById(`exp-${q.id}`);
      if (exp) exp.classList.remove("active");
    }
  });
  saveState();
  showToast(`Reset ${type} quiz questions.`);
}

function toggleAccordion(button) {
  const item = button.parentElement;
  item.classList.toggle("active");
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ==========================================================================
// 7. Resume Tools
// ==========================================================================
function copyResumeTemplate() {
  const template = `# ALEX CHEN
Bengaluru, India | +91 98765 43210 | alex.chen@example.com | linkedin.com/in/alexchen | github.com/alexchen

## EDUCATION
B.Tech in Computer Science & Engineering (2022 – 2026)
Apex Institute of Technology — CGPA: 8.8/10.0

## TECHNICAL SKILLS
- Languages: JavaScript (ES6+), Python, Java, SQL, HTML5, CSS3
- Frameworks & Tools: React.js, Node.js, Express, Git, GitHub, REST APIs
- Core: Data Structures & Algorithms, OOPs, DBMS

## PROJECTS
Campus Placement Portal | React, Node.js, SQLite
- Built a responsive recruitment management web app adopted by 350+ students.
- Implemented JWT authentication and role dashboards, cutting manual logging by 40%.

Algorithm Visualizer | JavaScript, HTML5 Canvas
- Designed an interactive tool demonstrating 6 sorting algorithms with 1.2k+ views.
- Maintained 60 FPS across mobile and desktop.

## ACHIEVEMENTS
- Solved 250+ algorithmic challenges on LeetCode / HackerRank.
- Winner, Inter-College Web Development Hackathon 2024.`;

  navigator.clipboard.writeText(template).then(() => {
    showToast("Resume markdown template copied to clipboard!");
  }).catch(() => {
    showToast("Template ready to copy from the preview.");
  });
}

// ==========================================================================
// 8. Dashboard Activity & Progress Calculation
// ==========================================================================
function updateDashboardUI() {
  // Counts
  const appliedCount = appState.appliedJobs.length;
  const savedCount = appState.savedJobs.length;

  document.getElementById("dashAppliedCount").textContent = appliedCount;
  document.getElementById("dashSavedCount").textContent = savedCount;
  document.getElementById("navBadge").textContent = appliedCount;

  // Quiz calculations
  const totalQuestions = APTITUDE_QUESTIONS.length + TECHNICAL_QUESTIONS.length;
  const answeredKeys = Object.keys(appState.answeredQuizzes);
  let correctCount = 0;
  answeredKeys.forEach(key => {
    if (appState.answeredQuizzes[key].correct) correctCount++;
  });

  document.getElementById("dashQuizScore").textContent = `${correctCount} / ${totalQuestions}`;

  const completionPercent = Math.round((answeredKeys.length / totalQuestions) * 100);
  document.getElementById("dashPrepPercent").textContent = `${completionPercent}%`;
  document.getElementById("progressBar").style.width = `${completionPercent}%`;

  const statusBadge = document.getElementById("prepStatusBadge");
  const note = document.getElementById("progressNote");

  if (completionPercent >= 100) {
    statusBadge.textContent = "Interview Ready 🔥";
    statusBadge.style.background = "#dcfce7";
    statusBadge.style.color = "#166534";
    note.textContent = "Awesome job! You have answered all practice quizzes. Keep revising!";
  } else if (completionPercent >= 50) {
    statusBadge.textContent = "Intermediate 🚀";
    statusBadge.style.background = "#eff6ff";
    statusBadge.style.color = "#1d4ed8";
    note.textContent = "Great progress! Complete the remaining questions to boost readiness.";
  } else {
    statusBadge.textContent = "Beginner 🌱";
    statusBadge.style.background = "#f1f5f9";
    statusBadge.style.color = "#475569";
    note.textContent = "Complete aptitude and technical quizzes to level up your career readiness badge.";
  }

  // Render Applied Table
  const appliedContainer = document.getElementById("appliedJobsList");
  if (appState.appliedJobs.length === 0) {
    appliedContainer.innerHTML = `<p style="padding: 1.5rem; color: var(--text-muted); text-align: center;">No job applications submitted yet. Browse jobs and apply!</p>`;
  } else {
    appliedContainer.innerHTML = `
      <table class="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Applied Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${appState.appliedJobs.map(app => `
            <tr>
              <td><strong>${app.company}</strong></td>
              <td>${app.role}</td>
              <td>${app.date}</td>
              <td><span class="status-badge ${app.status === 'Submitted' ? 'status-applied' : 'status-reviewed'}">${app.status}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  // Render Saved Jobs List
  const savedContainer = document.getElementById("savedJobsList");
  const savedJobObjs = SAMPLE_JOBS.filter(j => appState.savedJobs.includes(j.id));
  if (savedJobObjs.length === 0) {
    savedContainer.innerHTML = `<p style="padding: 1rem; color: var(--text-muted); text-align: center;">No saved jobs yet.</p>`;
  } else {
    savedContainer.innerHTML = savedJobObjs.map(job => `
      <div class="saved-item">
        <div class="saved-item-info">
          <h4>${job.role}</h4>
          <p>${job.company} • ${job.location}</p>
        </div>
        <div class="saved-item-actions">
          <button class="btn btn-sm btn-primary" onclick="openApplyModal(${job.id})">Apply</button>
          <button class="btn btn-sm btn-outline-danger" onclick="toggleSaveJob(${job.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `).join("");
  }
}

function clearAppliedJobs() {
  if (confirm("Are you sure you want to clear your application history?")) {
    appState.appliedJobs = [];
    saveState();
    renderJobs();
    showToast("Application history cleared.");
  }
}

// ==========================================================================
// 9. Toast Notification Utility
// ==========================================================================
function showToast(message) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--secondary);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// 10. Initialization & Event Listeners
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Nav Links clicks
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-target");
      navigateTo(target);
    });
  });

  // Home search bar triggers
  document.getElementById("homeSearchBtn").addEventListener("click", () => {
    const roleVal = document.getElementById("homeSearchRole").value.trim();
    if (roleVal) {
      document.getElementById("jobFilterQuery").value = roleVal;
    }
    navigateTo("jobs");
    renderJobs();
  });

  // Prep tab switcher
  document.querySelectorAll(".prep-tabs .tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".prep-tabs .tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      const targetTab = btn.getAttribute("data-tab");
      document.getElementById(`tab-${targetTab}`).classList.add("active");
    });
  });

  // Initial renders
  renderJobs();
  renderPreparation();
  updateDashboardUI();
});
