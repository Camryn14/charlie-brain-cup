# CLAUS - Code Standards & Implementation Guidelines

## Purpose
This document outlines code standards and best practices for the Alfa project to ensure consistency and maintainability.

## HTML Standards (Google Style Guide)

### Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- Content -->
    <script src="assets/js/main.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### Rules
- Use lowercase for element names
- Use double quotes for attributes
- Close all elements properly
- Indent consistently (2 spaces)
- Use semantic elements
- Validate HTML structure
- **No inline styling** - use external CSS files only
- **No inline scripting** - use event listeners in external JS files
- **No internal `<style>` tags** - all styles in `assets/css/`
- **No internal `<script>` tags** - all scripts in `assets/js/`

## CSS Standards (Google Style Guide)

### Format
```css
/* Component Name */
.component {
    property: value;
    property: value;
}

/* Modifier */
.component--modifier {
    property: value;
}
```

### Rules
- Use lowercase with hyphens for class names
- One declaration per line
- Use shorthand properties when applicable
- Use color variables
- Comments for non-obvious code
- Mobile-first media queries
- No `!important` unless absolutely necessary

## JavaScript Standards (Google Style Guide)

### Format
```javascript
// Function Declaration
function functionName(param1, param2) {
    // Implementation
    return result;
}

// Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize code
});

// ES5 Constructor Pattern (no modules)
const MyObject = function(config) {
    this.config = config;
};

MyObject.prototype.method = function() {
    // Method implementation
};
```

### Rules
- Use camelCase for variable and function names
- Use UPPER_CASE for constants
- Use single quotes for strings
- Add comments for complex logic
- Use arrow functions `() => {}` for callbacks
- Destructure objects when helpful
- Use `const` by default, `let` when reassignment needed
- Never use `var`
- Keep functions under 50 lines when possible

## Bootstrap 5 Usage

### Grid System
- Use `.container` or `.container-fluid`
- Use `.row` and `.col-*` classes
- Responsive prefixes: `col-sm-`, `col-md-`, `col-lg-`, `col-xl-`, `col-xxl-`

### Components
- Buttons: `.btn`, `.btn-primary`, `.btn-secondary`, etc.
- Forms: `.form-control`, `.form-label`, `.mb-*` spacing
- Modals: `.modal`, `.modal-dialog`, `.modal-content`
- Navbar: `.navbar`, `.navbar-expand-*`, `.navbar-dark`

### Icons (Bootstrap Icons)
```html
<i class="bi bi-icon-name"></i>
```

## Naming Conventions

### Classes
- BEM: `.block__element--modifier`
- Bootstrap utilities: `.mb-3`, `.mt-2`, `.p-4`, etc.

### IDs
- Use for form elements and unique components only
- Lowercase with hyphens: `#main-content`

### Variables (CSS)
```css
:root {
    --primary-color: #007bff;
    --spacing-unit: 0.5rem;
}
```

## Performance Checklist

- [ ] Minimize CSS and JS files
- [ ] Optimize images
- [ ] Use responsive images (`srcset`)
- [ ] Lazy load images when appropriate
- [ ] Minimize DOM manipulation
- [ ] Use event delegation for multiple listeners
- [ ] Avoid unnecessary reflows and repaints

## File Organization

- HTML files in root or `pages/` directory
- CSS in `assets/css/`
- JavaScript in `assets/js/`
- Images in `assets/img/`
- All assets properly linked with relative paths

## Testing & Validation

- Validate HTML: https://validator.w3.org/
- Test CSS: Run through CSS validator
- Test responsiveness across breakpoints
- Cross-browser testing
- Accessibility: WCAG 2.1 AA standards
