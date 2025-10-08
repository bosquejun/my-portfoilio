# Content Management Guide

Your portfolio content is now managed through easy-to-edit Markdown (`.md`) files located in the `/content` directory. No coding knowledge required!

## 📁 Content Structure

```
content/
├── profile.md          # Your basic info and summary
├── skills.md           # Skills organized by category
├── education.md        # Education and languages
└── experience/         # Job history (one file per job)
    ├── 01-comeback-media.md
    ├── 02-archax-ph7.md
    ├── 03-archax-contractor.md
    ├── 04-accenture.md
    └── 05-londa.md
```

## ✏️ How to Update Content

### 1. Update Your Profile Information

Edit `/content/profile.md`:

```markdown
---
name: "Your Name"
title: "Your Title"
location: "Your Location"
email: "your.email@example.com"
phone: "+63 123 456 7890"  # Optional - remove if you don't want to display
linkedin: "https://linkedin.com/in/yourprofile"
github: "https://github.com/yourusername"
website: "https://yourportfolio.com"  # Optional - your portfolio URL
---

# About Me

Your professional summary goes here. Write as much or as little as you want.
This section appears in the "About" section of your portfolio.
```

**What to edit:**
- The section between `---` markers contains your contact information
- Required fields: `name`, `title`, `email`, `linkedin`, and `github`
- Optional fields: `phone`, `website` (remove lines if you don't want to display them)
- The `website` URL will appear in the footer
- The text after `# About Me` is your professional summary
- Change any value, save the file, and refresh your browser!

---

### 2. Update Your Skills

Edit `/content/skills.md`:

```markdown
---
categories:
  - name: "Category Name"
    skills:
      - "Skill 1"
      - "Skill 2"
      - "Skill 3"
  
  - name: "Another Category"
    skills:
      - "Skill A"
      - "Skill B"
---
```

**How to:**
- **Add a skill**: Add a new line with `- "New Skill"` under any category
- **Remove a skill**: Delete the line
- **Add a category**: Copy an entire category block and modify it
- **Remove a category**: Delete the entire category block

---

### 3. Update Your Experience

Each job is a separate file in `/content/experience/`. 

Edit any file like `/content/experience/01-comeback-media.md`:

```markdown
---
title: "Job Title"
company: "Company Name"
period: "Start Date – End Date"
order: 1
---

- First achievement or responsibility
- Second achievement or responsibility
- Third achievement or responsibility
- Add as many as you want!
```

**How to:**
- **Update job info**: Change the values between `---` markers
- **Update job description**: Add/remove/edit bullet points below the `---` section
- **Change job order**: Change the `order:` number (1 = most recent)

**Add a new job:**
1. Create a new file: `/content/experience/06-new-company.md`
2. Copy the format from an existing file
3. Set `order: 1` for the newest job
4. Increase the `order` numbers in other files

**Remove a job:**
- Simply delete the markdown file

---

### 4. Update Education

Edit `/content/education.md`:

```markdown
---
degree: "Your Degree"
school: "Your School"
period: "Start Year – End Year"
languages:
  - "Language 1 (Level)"
  - "Language 2 (Level)"
---
```

**How to:**
- Change degree, school, or period in the section between `---` markers
- Add/remove languages as needed

---

## 💡 Tips

1. **Always save your files** after editing
2. **Restart the dev server** if changes don't appear immediately (Ctrl+C then `pnpm dev`)
3. **Keep the format** - Don't remove the `---` markers or change the structure
4. **Use quotes** - Always wrap text values in quotes (e.g., `"John Doe"`)
5. **Lists start with `-`** - For bullet points and list items
6. **Preserve indentation** - The spaces at the start of lines matter in YAML

---

## 📄 Updating Your CV

To update your downloadable CV:

1. Replace `/public/cv.pdf` with your new CV file
2. Make sure it's named exactly `cv.pdf`
3. The download button appears in:
   - **Header** (top right) - "Download CV" button
   - **Footer** (bottom) - CV icon button
4. Users can download it with one click!

---

## 🚀 Quick Changes Checklist

- [ ] Update contact info in `profile.md`
- [ ] Update professional summary in `profile.md`
- [ ] Add/remove skills in `skills.md`
- [ ] Update current job in `experience/01-*.md`
- [ ] Add new job experience if needed
- [ ] Update education in `education.md`
- [ ] Replace `/public/cv.pdf` with your latest CV

---

## 🆘 Troubleshooting

**Site not updating after changes?**
1. Check that you saved the file (Ctrl+S or Cmd+S)
2. Refresh your browser (Ctrl+R or Cmd+R)
3. Restart the dev server in terminal (Ctrl+C, then `pnpm dev`)

**Error messages?**
- Make sure all quotes are properly closed: `"text"`
- Check that `---` markers are on their own lines
- Ensure proper indentation (use spaces, not tabs)
- Look for missing colons `:` after field names

**Need help?**
- Look at the existing files as examples
- Copy the format exactly and just change the values

