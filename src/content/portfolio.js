export const profile = {
  name: 'Spencer Selorm Bokor',
  role: 'Developer',

  pitch:
    'Computer Science graduate building web applications, with two years supporting IT systems ' +
    'in hospital and university settings.',

  availability: null,

  about: [
    "I'm a Computer Science graduate from Ghana Communication Technology University with two " +
      'years of experience in IT support and network troubleshooting across hospital and ' +
      "university settings. I also build web applications with React, and I'm learning Python " +
      'by building small projects with it. I have a passion for technology and innovation, and ' +
      "I'm looking for an opportunity where I can develop my skills and gain more experience.",
  ],

  email: 'spencerbokor07@gmail.com',
  phone: '0542354403',
  github: 'https://github.com/spencer-coder',
  githubUsername: 'spencer-coder',
  linkedin: 'https://www.linkedin.com/in/spencer-bokor/',
  // Named rather than "resume.pdf", so it downloads with your name on it.
  resume: '/Spencer_Bokor_Resume.pdf',
};

// Section order. The sidebar nav and the scroll-spy both derive from this.
export const navigation = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'activity', label: 'Activity' },
  { id: 'contact', label: 'Contact' },
];

export const projects = [
  {
    slug: 'runway',
    name: 'Runway',
    tagline: 'A personal budget tracker: set a monthly limit, log expenses, see what is left.',
    year: '2025',
    screenshot: '/screenshots/runway.png',
    // Must match the file's real pixels, or the page shifts as it loads.
    screenshotSize: { width: 1613, height: 829 },
    liveUrl: 'https://runway-1e7s.onrender.com/',
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
        'There are a ton of incredible expense trackers out there. I just do not find them ' +
        'simple. Most pile on features I never touch, like bank syncing, forecasts and ' +
        'elaborate budgeting rules. Do not get me wrong, they are excellent when you actually ' +
        'need that. I wanted something dead simple that gives me a quick monthly look at my ' +
        'spending. Nothing else. So I built Runway for myself: set one monthly limit, log ' +
        'expenses against a handful of categories, and see what is left rather than only what ' +
        'is gone.',
      approach:
        'A REST API on Express with Mongoose models for users, budgets and expenses, and a ' +
        'React frontend using Redux Toolkit for state. Authentication is JWT-based: passwords ' +
        'are hashed with bcrypt before they reach the database, and every budget and expense ' +
        'query is filtered by the authenticated user, so one account cannot read another’s data.',
      challenge:
        'Staying logged in after changing your profile. The app saves your details and your ' +
        'login token together as one object, and every profile update overwrote that object ' +
        'with whatever the server sent back. When a reply left the token out, it was wiped, and ' +
        'the next action failed as though you had been signed out. Now every profile response ' +
        'returns the token alongside the updated details.',
      flaws: [
        'Profile photos are written to the server’s own disk, and the free hosting wipes that ' +
          'disk on every restart. The database keeps the path, so the picture disappears while ' +
          'the app still believes it is there. It needs proper file storage.',
        'The profile endpoint saves whatever fields a request contains, when it should accept ' +
          'only a name and an email.',
        'The login token sits in browser storage for thirty days and cannot be revoked, so a ' +
          'stolen one stays usable for a month, and nothing slows down repeated login attempts.',
      ],
    },
  },
  {
    slug: 'formfit',
    name: 'FormFit',
    tagline: 'A home-workout companion focused on how to do each exercise, not just what to do.',
    year: '2025',
    screenshot: '/screenshots/formfit.png',
    screenshotSize: { width: 871, height: 898 },
    liveUrl: 'https://formfit-beige.vercel.app/',
    liveNote:
      'The site itself is always up, but Supabase pauses free projects after long inactivity, ' +
      'so the exercise library may need a moment to come back.',
    repoUrl: 'https://github.com/spencer-coder/formfit',
    stack: ['React 19', 'Vite', 'Tailwind CSS', 'Supabase', 'Postgres', 'Vercel'],
    highlights: [
      'A library of exercises with form cues and the mistakes people actually make',
      'Browse by muscle group and difficulty, with progress tracked locally',
      'Admin screen for editing the exercise library, behind a passcode gate',
    ],
    caseStudy: {
      problem:
        'I train at home, and the part I kept getting wrong was form. My only fix was searching ' +
        'online for clues and saving them in notes, and the apps I tried wanted a subscription ' +
        'for basic features. So I built something simple for myself: pick a muscle group, see ' +
        'the exercises, and read how to do each one properly.',
      approach:
        'A React frontend on Vite with Tailwind, and Supabase Postgres holding the exercises ' +
        'with their images in Supabase Storage. All database access goes through a single ' +
        'module rather than being spread across components, and an admin page edits the library ' +
        'in place, so adding an exercise never means redeploying the site.',
      // Left empty on purpose. An empty field is skipped rather than rendered.
      challenge: '',
      flaws: [
        'The admin passcode is not a login. It only decides whether the editor renders, and it ' +
          'ships inside the code the browser downloads.',
        'The database accepts changes from anyone holding the public key that comes with the ' +
          'site, so the exercise library can be edited without ever opening the admin page. No ' +
          'personal data sits there, but the library itself is unprotected.',
        'Fixing it properly means real accounts, with write access limited to signed-in admins.',
      ],
    },
  },
];

export const skills = [
  {
    title: 'Comfortable with',
    note: 'Used to build projects.',
    items: [
      'JavaScript',
      'React',
      'HTML / CSS',
      'Node.js',
      'Express',
      'MongoDB / Mongoose',
      'Supabase',
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

    items: ['IT support & troubleshooting', 'Network troubleshooting', 'Staff training'],
  },
];

// Rendered by the activity section when the GitHub API is unavailable.
export const fallbackRepos = projects.map((project) => ({
  id: project.slug,
  name: project.repoUrl.split('/').pop(),
  description: project.tagline,
  html_url: project.repoUrl,
  language: project.stack[0],
  stargazers_count: 0,
  pushed_at: null,
}));
