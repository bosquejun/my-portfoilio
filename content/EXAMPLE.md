# 📝 Markdown Content Examples

This file shows you exactly how to format your markdown content files.

## Example 1: Profile Information

```markdown
---
name: "John Doe"
title: "Full-Stack Developer"
location: "San Francisco, CA"
email: "john.doe@example.com"
phone: "+1 555 123 4567"  # Optional field
linkedin: "https://linkedin.com/in/johndoe"
github: "https://github.com/johndoe"
website: "https://johndoe.dev"  # Optional field
---

# About Me

I'm a passionate developer with 10 years of experience building web applications.
I love creating elegant solutions to complex problems and mentoring junior developers.
```

**Key Points:**
- Everything between `---` markers is YAML frontmatter (metadata)
- The text after `# About Me` is your summary
- `phone` and `website` are optional - remove lines if you don't want to display them
- `github` will display in header and footer
- `website` will display as a link in the footer
- Just change the values in quotes!

---

## Example 2: Adding a New Skill Category

In `skills.md`, add a new category:

```markdown
---
categories:
  # Existing categories...
  
  - name: "Tools & Platforms"
    skills:
      - "Docker"
      - "Kubernetes"
      - "GitHub Actions"
      - "Jira"
---
```

---

## Example 3: Adding a New Job

Create `/content/experience/01-new-job.md`:

```markdown
---
title: "Senior Software Engineer"
company: "Tech Company Inc."
period: "Jan 2024 – Present"
order: 1
---

- Led a team of 5 engineers in building a new product feature
- Improved application performance by 40%
- Implemented CI/CD pipelines reducing deployment time
- Mentored 3 junior developers
```

**Remember:**
- `order: 1` = most recent job
- Update order numbers in other files (2, 3, 4, etc.)
- Each bullet point starts with `- `

---

## Example 4: Updating Education

```markdown
---
degree: "Master of Science in Computer Science"
school: "Stanford University"
period: "2018 – 2020"
languages:
  - "English (Native)"
  - "Spanish (Fluent)"
  - "French (Conversational)"
---
```

---

## Tips for Success

1. **Always use quotes** around text values: `"like this"`
2. **Maintain indentation** - use spaces, not tabs
3. **Keep the dashes** in lists: `- item`
4. **Don't remove the `---` markers** - they're required!
5. **Save and refresh** your browser after editing

---

## Common Mistakes to Avoid

❌ **Wrong:**
```markdown
name: John Doe (no quotes)
```

✅ **Correct:**
```markdown
name: "John Doe"
```

❌ **Wrong:**
```markdown
skills:
- React (no indentation)
```

✅ **Correct:**
```markdown
skills:
  - "React"
```

---

That's it! You're ready to update your portfolio content. Happy editing! 🎉

