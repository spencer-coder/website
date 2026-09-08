// ---------------------------------------------------------------------------
// Every piece of copy on the site lives here.
//
// Components read from this file and never hold strings of their own, so
// updating the portfolio means editing one file rather than hunting through
// JSX. Anything marked TODO is a placeholder that still needs real content.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Spencer Selorm Bokor',
  role: 'Full-stack Developer',

  // The one line a recruiter reads before deciding whether to keep scrolling.
  pitch:
    'Computer Science graduate building full-stack web applications, with two years supporting ' +
    'IT systems in hospital and university settings.',

  // Shown as a small badge under the pitch. null hides it entirely.
  availability: null,

  about: [
    'I studied Computer Science at Ghana Communication Technology University, then spent two ' +
      'years doing IT support — an internship at the University of Health and Allied Sciences, ' +
      'and national service at Ho Teaching Hospital. Most of that work was being the person ' +
      'someone comes to when a system is not doing what they need it to do.',
    'That is what pulled me toward building software rather than only maintaining it. Supporting ' +
      'users teaches you that an application is judged on how it behaves at its worst moment, ' +
      'not its best — so I care about the parts that are easy to skip: failing with a message ' +
      'that says what to fix, keeping secrets out of the repo, writing the deploy doc so the ' +
      'next person is not stuck. Both projects below are things I wanted to exist and built ' +
      'end to end.',
  ],

  email: 'spencerbokor07@gmail.com',
  phone: '0542354403',
  github: 'https://github.com/spencer-coder',
  githubUsername: 'spencer-coder',
  linkedin: 'https://www.linkedin.com/in/spencer-bokor/',
  resume: '/resume.pdf', // TODO: drop Spencer_Resume.pdf into public/
};

// Sections rendered in the main column, in order. The sidebar nav and the
// scroll-spy both derive from this list, so adding a section here is enough.
export const navigation = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'activity', label: 'Activity' },
  { id: 'contact', label: 'Contact' },
];

// ---------------------------------------------------------------------------
// Projects
//
// `caseStudy.challenge` is the field that matters in an interview: one concrete
// technical decision and the reasoning behind it, not a feature list.
// ---------------------------------------------------------------------------

export const projects = [
  {
    slug: 'runway',
    name: 'Runway',
    tagline: 'A personal budget tracker: set a monthly limit, log expenses, see what is left.',
    year: '2025',
    screenshot: '/screenshots/runway.png', // TODO: real screenshot
    liveUrl: 'https://runway-1e7s.onrender.com/',
    // Setting expectations beats a visitor deciding the app is broken.
    liveNote:
      'Hosted on Render’s free tier, which sleeps after a spell of inactivity. The first load ' +
      'can take up to a minute to wake the server.',
    repoUrl: 'https://github.com/spencer-coder/Runway',
    stack: ['React', 'Redux Toolkit', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Render'],
    highlights: [
      'Email and password accounts with bcrypt-hashed credentials',
      'Monthly spending limits with live remaining-budget calculation',
      'Expenses logged against categories, scoped per user per month',
    ],
    caseStudy: {
      problem:
        'I wanted to know how much of my monthly budget was actually left at any given moment, ' +
        'without opening a spreadsheet and adding it up. Most apps show what you have spent. ' +
        'The number I care about is what remains.',
      approach:
        'A REST API on Express with Mongoose models for users, budgets and expenses, and a ' +
        'React frontend using Redux Toolkit for state. Authentication is JWT-based: passwords ' +
        'are hashed with bcrypt before they reach the database, and every budget and expense ' +
        'query is filtered by the authenticated user, so one account cannot read another’s data.',
      challenge:
        'Modelling the budget itself. A budget belongs to a user and a calendar month, so I ' +
        'store the month as a "YYYY-MM" string with a compound unique index on user, month and ' +
        'category — the database, not the application, guarantees you cannot end up with two ' +
        'budgets for the same month. Setting one is a single upsert rather than a read then ' +
        'write, which removes the race between them. The category field defaults to null for ' +
        'the overall budget, so per-category budgets can be added later without a migration. ' +
        'Fetching a budget that does not exist returns null rather than a 404, because not ' +
        'having set one yet is a normal state, not an error.',
      learned:
        'To let the database enforce what must always be true. Validating in the controller is ' +
        'worth doing, but a unique index holds even when a request arrives twice at once — and ' +
        'choosing the shape of the data carefully at the start is what makes the code on top of ' +
        'it simple.',
    },
  },
  {
    slug: 'formfit',
    name: 'FormFit',
    tagline: 'A home-workout companion focused on how to do each exercise, not just what to do.',
    year: '2025',
    screenshot: '/screenshots/formfit.png', // TODO: real screenshot
    liveUrl: 'https://formfit-beige.vercel.app/',
    liveNote:
      'The site itself is always up, but Supabase pauses free projects after long inactivity, ' +
      'so the exercise library may need a moment to come back.',
    repoUrl: 'https://github.com/spencer-coder/formfit',
    stack: ['React 19', 'Vite', 'Tailwind CSS', 'Supabase', 'Postgres', 'Vercel'],
    highlights: [
      '36 exercises with form cues and the mistakes people actually make',
      'Browse by muscle group and difficulty, with progress tracked locally',
      'Admin screen for editing the exercise library, behind a passcode gate',
    ],
    caseStudy: {
      problem:
        'Most workout apps tell you to do three sets of ten and stop there. If you are training ' +
        'at home with nobody watching, the thing you actually need is what good form looks like ' +
        'and which mistake you are probably making.',
      approach:
        'Exercises live in Supabase Postgres with images in Supabase Storage, so the library can ' +
        'be edited without a redeploy. The frontend is React 19 on Vite with Tailwind v4, and ' +
        'all database access goes through a single module rather than being scattered across ' +
        'components — which made it straightforward to add caching and error handling in one place.',
      challenge:
        'Two failures that both looked like a broken app rather than a configuration mistake. ' +
        'The Supabase dashboard displays the project URL with a /rest/v1/ suffix, but the client ' +
        'library appends that path itself — so pasting the value you are shown produces ' +
        '/rest/v1/rest/v1/ and the error "Invalid path specified in request URL", which tells ' +
        'you nothing about the real cause. I wrote a small function that strips the suffix, ' +
        'shared between the browser client and the Node seed script. Separately, Vite bakes env ' +
        'vars in at build time, so a missing key produces a blank white screen in production ' +
        'with nothing in the console. The app now checks its credentials at startup — including ' +
        'whether they are still the placeholder values from .env.example — and renders an ' +
        'explicit "Supabase is not configured" message instead.',
      learned:
        'To design for the failure path first. Every external service will be unavailable or ' +
        'misconfigured at some point, and deciding in advance what the user sees costs far less ' +
        'than debugging a blank page later. Both fixes came from being the person who used to ' +
        'get called when a system broke with no useful error.',
    },
  },
];

// ---------------------------------------------------------------------------
// Skills
//
// Grouped honestly rather than as a logo wall. No percentage bars — they only
// invite the question "eighty percent of what?".
// ---------------------------------------------------------------------------

export const skills = [
  {
    title: 'Comfortable with',
    note: 'Used to build and ship the projects above.',
    items: [
      'JavaScript',
      'React',
      'HTML / CSS',
      'Node.js',
      'Express',
      'MongoDB / Mongoose',
      'Postgres / Supabase',
      'Tailwind CSS',
      'Vite',
      'REST APIs',
      'Git',
    ],
  },
  {
    title: 'Currently learning',
    note: 'Working through it by building small projects.',
    items: ['Python'],
  },
  {
    title: 'Next up',
    note: 'What I plan to pick up soon.',
    items: ['Testing', 'SQL', 'Next.js'],
  },
  {
    title: 'IT and support',
    note: 'Two years across a university and a teaching hospital.',
    items: ['IT support & troubleshooting', 'Network troubleshooting', 'Staff training'],
  },
];

// Shown when the GitHub API is unavailable — rate limited, offline, or blocked.
// The activity section renders these instead of an error.
export const fallbackRepos = projects.map((project) => ({
  id: project.slug,
  name: project.repoUrl.split('/').pop(),
  description: project.tagline,
  html_url: project.repoUrl,
  language: project.stack[0],
  stargazers_count: 0,
  pushed_at: null,
}));
