# 🎨 Professional Portfolio

A modern, responsive developer portfolio built with Next.js, Shadcn UI, and TailwindCSS. Features dark/light mode and markdown-based content management.

## ✨ Features

- 🎯 **Modern Design** - Clean, professional UI with Shadcn components
- 🌓 **Dark/Light Mode** - System-aware theme switching
- 📱 **Fully Responsive** - Mobile-first approach
- ✏️ **Markdown Content** - Easy content updates without touching code
- 🚀 **Fast Performance** - Built with Next.js 15 and Turbopack
- ♿ **Accessible** - Semantic HTML and ARIA labels
- 🎨 **Customizable** - Easy to modify colors and styles

## 📋 Sections

- **Header** - Name, title, and contact information with theme toggle
- **About** - Professional summary
- **Skills** - Categorized technical and soft skills
- **Experience** - Timeline-style work history
- **Education** - Academic background and languages
- **Footer** - Social links and copyright

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (preferred package manager)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## ✏️ Updating Content

All portfolio content is managed through Markdown files in the `/content` directory. **No coding required!**

See **[CONTENT_GUIDE.md](./CONTENT_GUIDE.md)** for detailed instructions on updating:
- Profile information
- Skills
- Work experience
- Education

### Quick Example

To update your name and title, edit `/content/profile.md`:

```markdown
---
name: "Your Name Here"
title: "Your Professional Title"
email: "your.email@example.com"
---

# About Me

Your professional summary here...
```

Save the file and refresh your browser. That's it!

## 📁 Project Structure

```
my-portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── header.tsx        # Site header
│   ├── about-section.tsx
│   ├── skills-section.tsx
│   ├── experience-section.tsx
│   ├── education-section.tsx
│   ├── footer.tsx
│   └── theme-toggle.tsx  # Dark/light mode toggle
├── content/              # 📝 MARKDOWN CONTENT (EDIT THESE!)
│   ├── profile.md       # Your info and summary
│   ├── skills.md        # Skills by category
│   ├── education.md     # Education and languages
│   └── experience/      # Job history (one file per job)
├── lib/
│   ├── content.ts       # Content loading utilities
│   └── utils.ts         # Helper functions
├── public/              # Static assets
└── data/
    └── profile.ts       # Legacy data (now using markdown!)
```

## 🎨 Customization

### Change Theme Colors

Edit `/app/globals.css` and modify the CSS variables:

```css
:root {
  --primary: oklch(...);    /* Primary color */
  --secondary: oklch(...);  /* Secondary color */
  --accent: oklch(...);     /* Accent color */
  /* ... more colors */
}
```

### Modify Layout

Edit the component files in `/components`:
- `header.tsx` - Header layout and contact display
- `*-section.tsx` - Individual section layouts
- `footer.tsx` - Footer content and social links

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **UI Library:** [Shadcn UI](https://ui.shadcn.com/)
- **Styling:** [TailwindCSS 4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Markdown:** [gray-matter](https://github.com/jonschlinkert/gray-matter)
- **Typography:** [Geist Font](https://vercel.com/font)

## 📦 Available Scripts

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 🔧 Adding Shadcn Components

To add more Shadcn UI components:

```bash
pnpm dlx shadcn@latest add [component-name]
```

Example:
```bash
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add tooltip
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repo in [Vercel](https://vercel.com)
3. Deploy! (Vercel auto-detects Next.js)

### Other Platforms

Build the production version:

```bash
pnpm build
pnpm start
```

Then deploy the `.next` folder to your hosting platform.

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to customize this portfolio for your own use!

## 📧 Contact

**Jun-Paul I. Bosque**
- Email: bosque.junpaul@gmail.com
- LinkedIn: [linkedin.com/in/junbosque](https://linkedin.com/in/junbosque)

---

Built with ❤️ using Next.js, Shadcn UI, and TailwindCSS
