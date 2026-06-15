# AGENTS - Project Parameters & Configuration

## Overview
This document defines the core parameters and technical specifications for the Alfa project.

## Technology Stack

### Frontend Framework
- **Bootstrap 5 (BS5)**: CSS framework for responsive design and components
- **Bootstrap Icons**: Icon library for UI elements

### Code Standards

#### HTML
- Follow **Google Style Guide for HTML**
- Semantic HTML5 markup
- Proper heading hierarchy (H1, H2, H3, etc.)
- Descriptive alt text for images
- Valid HTML structure

#### CSS
- Follow **Google Style Guide for CSS**
- Use Bootstrap 5 utility classes where applicable
- Custom styles in `assets/css/style.css`
- Mobile-first responsive design
- Consistent naming conventions

#### JavaScript
- Follow **Google Style Guide for JavaScript**
- No ES6 modules (vanilla JS)
- Vanilla JavaScript (no frameworks like React/Vue)
- Script files in `assets/js/`
- Keep functions modular and reusable
- Use `const` and `let` instead of `var`

## Project Structure
```
Alfa/
├── index.html
├── pages/
│   ├── auth.html
│   ├── content.html
│   └── form.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── img/
└── README.md
```

## Guidelines

### HTML Files
- Include Bootstrap 5 CDN links
- Include Bootstrap Icons CDN link
- Use semantic tags (`<header>`, `<nav>`, `<main>`, `<footer>`, etc.)
- Proper form validation attributes
- **No inline styling** (no `style="..."` attributes)
- **No inline scripting** (no `onclick="..."`, `onload="..."`, etc.)
- **No internal `<style>` tags** - all CSS in external files
- **No internal `<script>` tags** - all JavaScript in external files

### CSS
- Organize styles by component/section
- Use CSS variables for consistent theming
- Follow BEM naming convention for custom classes
- Responsive breakpoints: xs, sm, md, lg, xl, xxl

### JavaScript
- Initialize scripts in `main.js`
- Use event delegation where applicable
- Keep functions pure and testable
- Add comments for complex logic
- No external JS libraries (unless absolutely necessary)

## Dependencies
- Bootstrap 5
- Bootstrap Icons
- Vanilla JavaScript

## Version Control
- Commit with clear, descriptive messages
- Reference files and line numbers in commits
