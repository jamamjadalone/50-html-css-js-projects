# Contributing to 50+ HTML, CSS & JavaScript Projects

First off, thank you for considering contributing to this project. It's people like you that make it a truly great learning resource.

The following is a set of guidelines for contributing. Use your best judgment, and feel free to propose changes to this document in a pull request.

---

## 🧭 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [What Should I Know Before I Get Started?](#-what-should-i-know-before-i-get-started)
- [How Can I Contribute?](#-how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Adding a New Project](#adding-a-new-project)
  - [Improving Documentation](#improving-documentation)
- [Style Guide](#-style-guide)
- [Git Workflow](#-git-workflow)
- [Attribution](#-attribution)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the repository owner.

---

## 💡 What Should I Know Before I Get Started?

- This repository is a **learning resource**. Prioritize clean, readable code over clever or obfuscated solutions.
- Projects should be **self-contained** in their own folder with `index.html`, `style.css` and `script.js`.
- Each project should work by simply opening `index.html` in a browser — no build tools required.

---

## 🤝 How Can I Contribute?

### Reporting Bugs

Bugs are tracked as [GitHub issues](https://github.com/jamamjadalone/50-html-css-js-projects/issues). Create an issue and provide:

- A clear, descriptive title.
- Steps to reproduce the behavior.
- Expected vs. actual behavior.
- Screenshots or GIFs if applicable.
- Browser and operating system used.

Use the [Bug Report template](./.github/ISSUE_TEMPLATE/bug_report.md).

### Suggesting Enhancements

Enhancement suggestions are also tracked as GitHub issues. Provide:

- A clear, descriptive title.
- The current behavior and why it's a problem.
- The suggested improvement and how it benefits learners.
- Any alternative solutions you considered.

Use the [Feature Request template](./.github/ISSUE_TEMPLATE/feature_request.md).

### Adding a New Project

1. Create a folder named using the next available number, e.g., `52-your-project-name`.
2. Include at minimum:
   - `index.html`
   - `style.css`
   - `script.js` (if the project uses JavaScript)
3. Add a short meta description inside the `<head>` of your `index.html` for SEO.
4. Update the **Projects table** in the `README.md`.
5. Update the root `index.html` to include your new project card.
6. Update `sitemap.xml` and `robots.txt` if needed.

### Improving Documentation

Documentation fixes are always welcome. This includes the README, CONTRIBUTING, comments in code, and typo corrections.

---

## 🎨 Style Guide

- Use **4 spaces** for indentation in HTML/CSS/JS.
- Use **meaningful, descriptive names** for classes and variables.
- Keep CSS organized: reset/typography → layout → components → responsive.
- Write comments only where the logic is not self-evident.
- Test your changes in at least one modern browser (Chrome/Firefox/Edge).
- Keep the design consistent with the project's existing aesthetic.

---

## 🔀 Git Workflow

We use the **Fork & Pull Request** model:

1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/jamamjadalone/50-html-css-js-projects.git
   ```
3. Create a branch for your work:
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. Make your changes and commit them with a clear message:
   ```bash
   git commit -m "Add: Amazing Feature"
   ```
5. Push to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```
6. Open a [Pull Request](https://github.com/jamamjadalone/50-html-css-js-projects/pulls).

---

## 🙏 Attribution

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

Thank you for helping make this project better! ❤️