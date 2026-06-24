# Anushad Kaveera — DevOps Engineer Portfolio

A production-ready personal portfolio with a dark terminal aesthetic, built with **React 18 + Vite + Tailwind CSS**, animated with **Framer Motion**, and featuring an animated typing terminal hero.

> _"Automate everything. Secure everything. Scale everything."_

---

## ✨ Features

- **Animated terminal hero** — types out `whoami`, `cat skills.txt`, `systemctl status internship`, and `echo $MOTTO` line-by-line, with a pulsing green cursor and macOS-style window buttons.
- **Orbiting tech icons** — Docker, Kubernetes, AWS, GitHub & more slowly orbit the terminal via pure CSS keyframes.
- **Scroll-reveal animations** on every section (Framer Motion).
- **Fixed navbar** with smooth scrolling, active-section highlighting, and a mobile hamburger menu.
- Sections: About (with count-up stats), Skills, Experience timeline, Projects grid, Certifications badges, Contact form, Education footer.
- Fully **responsive** and **dark-only** (deep navy-black `#0a0f1e`, electric cyan `#00d4ff`, purple `#7c3aed`).
- Respects `prefers-reduced-motion`.

---

## 🛠 Tech Stack

| Purpose            | Library                |
| ------------------ | ---------------------- |
| Framework          | React 18               |
| Build tool         | Vite 5                 |
| Styling            | Tailwind CSS 3         |
| Animations         | Framer Motion          |
| Typing effect      | react-type-animation   |
| Icons              | lucide-react           |
| Smooth scrolling   | react-scroll           |

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
# Runtime dependencies
npm install react react-dom framer-motion lucide-react react-scroll react-type-animation

# Dev dependencies (build + styling)
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer
```

Or simply install everything from `package.json`:

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open <http://localhost:5173>.

### 3. Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

---

## 📁 Project Structure

```
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Hero.jsx           ← animated terminal lives here
    │   ├── About.jsx
    │   ├── Skills.jsx
    │   ├── Experience.jsx
    │   ├── Projects.jsx
    │   ├── Certifications.jsx
    │   ├── Contact.jsx
    │   ├── Footer.jsx         ← education + socials
    │   └── SectionHeading.jsx ← shared heading
    ├── data/
    │   └── portfolio.js       ← all content as exported JS objects
    ├── lib/
    │   └── motion.js          ← shared Framer Motion variants
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

---

## ✏️ Customizing

- **Content** — everything (bio, skills, projects, certs, experience, education) lives in [`src/data/portfolio.js`](src/data/portfolio.js). Edit there; no component changes needed.
- **Colors / theme** — tweak the palette, glows, and animations in [`tailwind.config.js`](tailwind.config.js).
- **CV download** — drop your PDF in `public/` named `Anushad-Kaveera-CV.pdf` (or change the `cv` path in `portfolio.js`).
- **Contact form** — currently opens the visitor's mail client via `mailto:`. To use a hosted service, replace the `handleSubmit` body in `Contact.jsx` with an [EmailJS](https://www.emailjs.com/) or [Formspree](https://formspree.io/) call.

---

## 📦 Deploy

This is a static SPA — deploy `dist/` anywhere:

- **Vercel / Netlify** — point at the repo; build command `npm run build`, output dir `dist`.
- **GitHub Pages / S3 / Nginx** — serve the `dist/` folder.

---

Built with ❤️ using React, Vite & Tailwind CSS.
