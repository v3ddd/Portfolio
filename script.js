(() => {
  "use strict";

  const data = typeof portfolioData !== "undefined"
    ? portfolioData
    : (window.portfolioData || {});
  const personal = data.personal || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clean = value => typeof value === "string" && value.trim() && !/^\[YOUR\b/i.test(value.trim());
  const safeUrl = value => {
    if (!clean(value)) return "";
    try {
      const url = new URL(value, window.location.href);
      return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol) ? value : "";
    } catch { return ""; }
  };
  const setText = (selector, value) => {
    const el = $(selector);
    if (el && clean(value)) el.textContent = value;
    else if (el) el.hidden = true;
  };
  const make = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined && text !== null) el.textContent = text;
    return el;
  };
  const externalLink = (label, url, className = "") => {
    const valid = safeUrl(url);
    if (!valid) return null;
    const a = make("a", className, label);
    a.href = valid;
    if (/^https?:/i.test(valid)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    return a;
  };

  // Global identity and hero content
  const brand = clean(personal.brand) ? personal.brand : (clean(personal.name) ? personal.name : "[YOUR NAME]");
  $$("[data-bind='brand']").forEach(el => el.textContent = brand);
  document.title = `${brand} — Portfolio`;
  setText("#hero-kicker", personal.identity || personal.title);
  setText("#hero-name", personal.name);
  setText("#hero-title", personal.title);
  setText("#hero-description", personal.intro);
  setText("#about-lead", personal.aboutLead);
  setText("#contact-message", personal.contactMessage);
  setText("#caption-name", brand);
  setText("#hero-location", personal.location ? `Based in ${personal.location}` : "");
  $("#vertical-year").textContent = new Date().getFullYear();
  $("#copyright-year").textContent = new Date().getFullYear();

  if (clean(personal.profileImage)) {
    $("#profile-image").src = personal.profileImage;
    $("#profile-image").alt = clean(personal.imageAlt) ? personal.imageAlt : "Portrait photograph";
    $("#profile-image").style.objectPosition = clean(personal.imagePosition) ? personal.imagePosition : "center";
  }
  if (clean(personal.availability)) {
    const availability = $("#availability");
    availability.hidden = false;
    availability.querySelector("span").textContent = personal.availability;
  }
  if (safeUrl(personal.resumeUrl)) {
    const resume = $("#resume-link");
    resume.href = safeUrl(personal.resumeUrl);
    resume.hidden = false;
  }

  const aboutWrap = $("#about-paragraphs");
  (Array.isArray(personal.about) ? personal.about : []).filter(clean).forEach(paragraph => aboutWrap.append(make("p", "", paragraph)));
  if (!aboutWrap.children.length && !clean(personal.aboutLead)) $("#about").hidden = true;

  // Optional About facts
  const aboutFacts = $("#about-facts");
  if (aboutFacts) {
    (Array.isArray(personal.languages) ? personal.languages : []).filter(clean).forEach(language => {
      aboutFacts.append(make("span", "", language));
    });
  }

  // Skills
  const skillsGrid = $("#skills-grid");
  (Array.isArray(data.skills) ? data.skills : []).filter(group => clean(group.category) && Array.isArray(group.items) && group.items.length)
    .forEach(group => {
      const article = make("article", "skill-group reveal");
      article.append(make("h3", "", group.category));
      const list = make("div", "skill-list");
      group.items.filter(item => clean(item.name)).forEach(item => {
        const chip = make("div", "skill-chip");
        const name = make("span", "skill-name", item.name);
        chip.append(name);
        if (clean(item.level)) chip.append(make("span", "skill-level", item.level));
        if (clean(item.description)) chip.title = item.description;
        list.append(chip);
      });
      if (list.children.length) { article.append(list); skillsGrid.append(article); }
    });
  if (!skillsGrid.children.length) $("#skills").hidden = true;

  // Projects
  const projectsGrid = $("#projects-grid");
  (Array.isArray(data.projects) ? data.projects : []).filter(project => clean(project.name) && clean(project.description))
    .forEach((project, index) => {
      const article = make("article", "project-card reveal");
      const visual = make("div", "project-visual");
      if (safeUrl(project.image)) {
        const img = document.createElement("img");
        img.src = project.image; img.alt = clean(project.imageAlt) ? project.imageAlt : `${project.name} preview`;
        img.loading = "lazy";
        img.onerror = () => { img.remove(); visual.classList.add("project-placeholder"); visual.append(make("span", "", `0${index + 1}`)); };
        visual.append(img);
      } else {
        visual.classList.add("project-placeholder");
        visual.append(make("span", "", `0${index + 1}`));
      }
      const body = make("div", "project-body");
      const top = make("div", "project-topline");
      if (clean(project.category)) top.append(make("span", "project-category", project.category));
      if (clean(project.status)) top.append(make("span", "project-status", project.status));
      body.append(top, make("h3", "", project.name), make("p", "project-description", project.description));
      if (Array.isArray(project.technologies) && project.technologies.length) {
        const tags = make("div", "technology-tags");
        project.technologies.filter(clean).forEach(tech => tags.append(make("span", "", tech)));
        body.append(tags);
      }
      const links = make("div", "project-links");
      const repo = externalLink("GitHub ↗", project.githubUrl);
      const live = externalLink("Live project ↗", project.liveUrl);
      if (repo) links.append(repo);
      if (live) links.append(live);
      if (links.children.length) body.append(links);
      article.append(visual, body);
      projectsGrid.append(article);
    });
  if (!projectsGrid.children.length) { $("#projects").hidden = true; }

  // Education timeline
  const educationList = $("#education-list");
  (Array.isArray(data.education) ? data.education : []).filter(item => clean(item.qualification)).forEach(item => {
    const entry = make("article", "education-entry");
    const marker = make("span", "timeline-marker");
    const content = make("div", "education-content");
    content.append(make("p", "education-status", item.status || ""));
    content.append(make("h3", "", item.qualification));
    if (clean(item.institution)) content.append(make("p", "education-institution", item.institution));
    if (clean(item.detail)) content.append(make("p", "education-detail", item.detail));
    entry.append(marker, content); educationList.append(entry);
  });

  // Interests
  const interests = (Array.isArray(data.interests) ? data.interests : []).filter(clean);
  if (interests.length) {
    $("#interests").hidden = false;
    interests.forEach(item => $("#interests-list").append(make("span", "interest-tag", item)));
  }

  // Contact details and optional social links
  if (clean(personal.email) && !personal.email.startsWith("[YOUR")) {
    const email = $("#contact-email");
    email.href = `mailto:${personal.email}`; email.textContent = personal.email; email.hidden = false;
  }
  const meta = $("#contact-meta");
  if (clean(personal.phone)) {
    const phone = externalLink(personal.phone, `tel:${personal.phone.replace(/[^\d+]/g, "")}`);
    if (phone) meta.append(phone);
  }
  if (clean(personal.location)) meta.append(make("span", "", personal.location));

  const social = data.social || {};
  const socialItems = [
    ["GitHub", social.github], ["LinkedIn", social.linkedin], ["Instagram", social.instagram], ["Portfolio", social.portfolio]
  ];
  if (Array.isArray(social.other)) social.other.forEach(item => socialItems.push([item.label, item.url]));
  socialItems.forEach(([label, url]) => {
    const link = externalLink(label, url);
    if (link) $("#social-links").append(link);
  });
  if (!$("#contact-email").hidden === false && !meta.children.length && !$("#social-links").children.length) {
    // The form remains available; no empty contact labels are rendered.
  }

  // A mailto form is honest about what it does: it opens the visitor's configured email app.
  $("#contact-form").addEventListener("submit", event => {
    event.preventDefault();
    if (!clean(personal.email) || personal.email.startsWith("[YOUR")) {
      alert("Please add your email address in site-data.js before using the contact form.");
      return;
    }
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.get("name")}`);
    const body = encodeURIComponent(`Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\n${form.get("message")}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
  });

  // Theme: warm light is the default; a saved visitor preference takes precedence.
  const themeButton = $(".theme-toggle");
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark" || savedTheme === "light") document.documentElement.dataset.theme = savedTheme;
  const updateThemeLabel = () => {
    const dark = document.documentElement.dataset.theme === "dark";
    themeButton.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    themeButton.title = dark ? "Switch to light theme" : "Switch to dark theme";
    $(".theme-icon", themeButton).textContent = dark ? "☼" : "◐";
  };
  updateThemeLabel();
  themeButton.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("portfolio-theme", next);
    updateThemeLabel();
  });

  // Mobile navigation
  const menuButton = $(".menu-toggle");
  const navLinks = $("#nav-links");
  const closeMenu = () => { navLinks.classList.remove("is-open"); menuButton.setAttribute("aria-expanded", "false"); menuButton.setAttribute("aria-label", "Open navigation"); };
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    navLinks.classList.toggle("is-open", open);
  });
  $$("#nav-links a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });

  // Active navigation state
  const navAnchors = $$("#nav-links a");
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(link => link.classList.toggle("active", link.hash === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  $$("main section[id]").forEach(section => sectionObserver.observe(section));

  // Subtle reveal effects, with reduced-motion support.
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(el => revealObserver.observe(el));
  } else {
    $$(".reveal").forEach(el => el.classList.add("is-visible"));
  }
})();
