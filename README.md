# Portfolio

Personal web portfolio showcasing projects, skills, and achievements in Artificial Intelligence and Machine Learning.

## Design System

Built with **Untitled UI** inspired design principles:
- Black theme with red accent colors
- Clean, modern interface
- Responsive design for all devices
- Smooth animations and transitions

## Project Structure

```
Portfolio/
├── index.html          # Main HTML structure
├── styles.css          # All CSS styles and design tokens
├── script.js           # JavaScript for interactivity
├── P1000635.jpg        # Profile image
└── README.md           # Project documentation
```

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: AOS (Animate on Scroll) library integration
- **Dark Theme**: Professional black background with red accents
- **Modular Code**: Separated HTML, CSS, and JavaScript for maintainability
- **Form Validation**: Client-side validation for contact form
- **SEO Optimized**: Proper meta tags and semantic HTML

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox
- **JavaScript (ES6)**: Vanilla JS, no frameworks
- **AOS**: Animate on Scroll library
- **Font Awesome**: Icons
- **Google Fonts**: Anton (hero) & Graphik (body) fonts

## Dependencies

- [AOS](https://michalsnik.github.io/aos/) - Animate on Scroll Library
- [Font Awesome 6](https://fontawesome.com/) - Icon library
- [Graphik Font](https://www.npmjs.com/package/@fontsource/graphik) - Primary typeface
- [Anton Font](https://fonts.google.com/specimen/Anton) - Hero section typeface

## Sections

1. **Hero**: Introduction with name and tagline
2. **About**: Background and experience
3. **Skills**: Technical skills and tools
4. **Projects**: Portfolio of completed projects
5. **Awards**: Achievements and certifications
6. **Contact**: Contact form and social links

## Customization

### Colors
Edit the CSS custom properties in `styles.css`:

```css
:root {
    --gray-950: #0A0A0A;    /* Background */
    --red-500: #EF4444;     /* Accent color */
    /* ... more colors */
}
```

### Content
Update the content directly in `index.html`.

### Animations
Modify AOS settings in `script.js`:

```javascript
AOS.init({
    duration: 600,
    once: true,
    offset: 80,
    easing: 'ease-out-cubic'
});
```

## License

© 2025 Srinivas Hegde M. All rights reserved.

## Author

**Srinivas Hegde M**
- GitHub: [@hegdesrinivasm](https://github.com/hegdesrinivasm)
- Email: hegdesriniavsm@gmail.com
