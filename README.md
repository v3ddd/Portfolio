# Personal Portfolio — Warm Editorial Template

A responsive, static personal portfolio built with **HTML5, CSS3 and vanilla JavaScript**. There is no framework, package manager, build step or server-side code. Personal content is managed centrally in `site-data.js`.

## 1. Run locally

1. Download and unzip the project.
2. Open the `portfolio` folder.
3. Open `index.html` in a modern browser.

For the most reliable local preview, use a small static server (optional):

- VS Code: install/use the Live Server extension and choose **Open with Live Server**.
- Python: run `python -m http.server 8000` from the project folder, then visit `http://localhost:8000`.

The site does not require a build process.

## 2. Edit personal information

Open `site-data.js`. The `portfolioData` object contains the editable content. Replace the bracketed placeholders with your real information. The website automatically renders the configured content.

Example:

```js
personal: {
  name: "Alex Morgan",
  firstName: "Alex",
  brand: "Alex Morgan",
  identity: "Computer Science Student",
  title: "Building thoughtful digital experiences.",
  subtitle: "Developer · Learner · Problem solver",
  intro: "I enjoy turning ideas into useful, accessible web experiences.",
  aboutLead: "I am a curious developer who enjoys learning by building.",
  about: [
    "I am currently studying computer science and exploring software development.",
    "I like breaking complex problems into smaller, practical steps."
  ],
  email: "hello@example.com",
  location: "Ahmedabad, India",
  profileImage: "assets/profile.jpg"
}
```

Keep JavaScript commas and quotation marks in place. Text fields can be left empty when optional.

## 3. Replace the profile photograph

1. Add your own image to `assets/`.
2. Name it `profile.jpg`, or change `personal.profileImage` in `site-data.js` to the correct relative path.
3. Adjust `personal.imagePosition`, for example `"center 25%"`, if the crop needs to move vertically.
4. The image uses `object-fit: cover`. If it is missing, a neutral typographic placeholder appears.

Use an optimized JPG or WebP image for faster loading. No generated face or stock portrait is included.

## 4. Add or remove skills

Add skill categories to the `skills` array:

```js
skills: [
  {
    category: "Programming",
    items: [
      { name: "JavaScript", level: "Intermediate", description: "Browser scripting" },
      { name: "Python", level: "Beginner", description: "" }
    ]
  },
  {
    category: "Frontend",
    items: [
      { name: "HTML", level: "Advanced" },
      { name: "CSS", level: "Intermediate" }
    ]
  }
]
```

Add as many categories and skill items as you need. Delete an item or category to remove it. Proficiency is shown as text, not as a made-up percentage.

## 5. Add projects

Add objects to `projects`:

```js
projects: [
  {
    name: "Project name",
    category: "Web development",
    description: "A short explanation of the project and the problem it solves.",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/username/project",
    liveUrl: "",
    image: "assets/projects/project-name.jpg",
    status: "In Progress"
  }
]
```

Supported status labels include `Completed`, `In Progress` and `Planned`. Add an image inside `assets/projects/` and provide its relative path. If the image is missing or omitted, a designed typographic fallback appears. Only supplied valid URLs are rendered as links.

## 6. Add certifications

```js
certifications: [
  {
    name: "Credential title",
    provider: "Issuing organization",
    year: "2026",
    verificationUrl: "https://example.com/verify"
  }
]
```

Entries are grouped by year automatically. Leave `verificationUrl` empty if there is no public verification link.

## 7. Update social links

Use full URLs:

```js
social: {
  github: "https://github.com/username",
  linkedin: "https://www.linkedin.com/in/username",
  instagram: "",
  portfolio: "",
  other: [
    { label: "Blog", url: "https://example.com/blog" }
  ]
}
```

Empty optional links are hidden. Supported built-in fields are GitHub, LinkedIn, Instagram and Portfolio; add other profiles through the `other` array.

## 8. Change the theme

The website starts in a warm-light theme. Visitors can use the circular theme control in the navigation to switch between light and dark. Their choice is saved in browser `localStorage` under `portfolio-theme`. Clear that key in browser storage to return to the default theme.

## 9. Update education

The template includes the two requested qualifications:

- B.Tech in Computer Science and Engineering (CSE) — Currently Pursuing; Expected Graduation: 2029.
- Diploma in Information Technology — LJ Polytechnic, Ahmedabad; Completed: 2026.

They are configured in the `education` array in `site-data.js`. You can add another object using the same fields (`qualification`, `institution`, `status`, `detail`, `year`). Do not add grades or achievements unless they are accurate.

## 10. Deploy with Netlify

1. Sign in to Netlify.
2. Choose **Add new site** / **Deploy manually**.
3. Drag the unzipped `portfolio` folder (or its contents) into the deploy area.
4. Netlify publishes the static site and provides a URL.
5. For updates, upload the updated folder again or connect a Git repository.

## 11. Deploy with Vercel

1. Push the project folder to a Git repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Set the framework preset to **Other** if prompted.
4. Leave the build command and output directory empty/default for a plain static site; the root contains `index.html`.
5. Deploy.

## 12. Publish with GitHub Pages

1. Create a GitHub repository and upload the contents of this folder to the repository root.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch (usually `main`) and folder `/ (root)`, then save.
5. Wait for GitHub Pages to publish the site. Your page will be available at the URL shown in the Pages settings.

Because the site uses relative paths, it can also be hosted from a project subpath.

## 13. Publish with Cloudflare Pages

Cloudflare Pages can publish this static portfolio at a URL such as
`https://vedd.pages.dev/#home`. The `#home` part is a normal in-page navigation
anchor and does not require server routing.

### Option A: deploy with Git

1. Create a GitHub repository and upload the contents of this folder to the repository root.
2. Sign in to Cloudflare Dashboard and open **Workers & Pages**.
3. Choose **Create** → **Pages** → **Import an existing Git repository**.
4. Select the repository.
5. Set the project name to `vedd` if that subdomain is available.
6. For **Framework preset**, select **None**.
7. Leave **Build command** empty and set **Build output directory** to `/`.
8. Deploy the project.

After deployment, the project should be available at
`https://vedd.pages.dev/` (or the URL Cloudflare assigns). The home section is
`https://vedd.pages.dev/#home`.

### Option B: deploy directly

1. Create a ZIP containing `index.html`, `style.css`, `script.js`, `site-data.js`,
   and the `assets` folder.
2. In Cloudflare Dashboard, open **Workers & Pages** → **Create** → **Pages**.
3. Choose **Upload assets** and upload the unzipped folder contents or ZIP.
4. Set the project name to an available name such as `vedd`.
5. Deploy.

Do not create a Cloudflare project or subdomain with a browser until you have
signed in to the intended Cloudflare account. The project name must be unique
across Cloudflare Pages, and Cloudflare will enforce whether `vedd` is available.

## Contact form behavior

The contact form is intentionally a `mailto:` form. It validates the visitor's name, email and message, then opens the visitor's configured email application with a prepared draft addressed to the email in `site-data.js`. It does **not** send the message or display a fake success state. For serverless submissions, connect a real form provider (for example, Netlify Forms or Formspree) and follow that provider's current setup instructions.

## Accessibility and implementation notes

- Semantic landmarks, a skip link, keyboard-operable navigation and visible focus behavior.
- Responsive layouts for desktop, tablet and mobile.
- `prefers-reduced-motion` support.
- Intersection Observer reveals and active section indication.
- Optional sections and empty social links are hidden.
- The theme preference is stored locally in the visitor's browser.
- External links use `noopener noreferrer`.
- All asset paths are relative to the project root.
