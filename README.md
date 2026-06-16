# Tattoo Style Quiz

An interactive front-end quiz that identifies the user's ideal tattoo style based on their answers. Built as Milestone Project 2 for the Code Institute L5 Diploma in Web Application Development.

---

## Purpose

Many people are interested in getting a tattoo but are unsure which aesthetic direction suits them. This quiz guides users through five short questions about their visual preferences, personality traits, and placement ideas, then reveals one of four tattoo styles: **Fineline**, **Blackwork**, **Abstract / Flow-line**, or **Geometric**.

---

## Features

- Five multiple-choice questions loaded from an external JSON file
- Score-based result: the style with the most points wins
- Result screen with style name and description
- Restart button to retake the quiz
- Fully responsive layout (mobile and desktop)
- Error handling if the JSON file fails to load
- No page reloads — entirely controlled by JavaScript

---

## File Structure

```
tattoo-style-quiz/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── data/
        └── questions.json
```

---

## Technologies Used

- HTML5
- CSS3 (Flexbox, responsive media queries)
- JavaScript (ES6, Fetch API, Promises)
- JSON (external data file for quiz questions and results)

---

## How It Works

1. On page load, `script.js` fetches `assets/data/questions.json`
2. Questions and style result definitions are loaded into memory
3. Each answer increments the score for the corresponding style
4. After the last question, the style with the highest score is displayed
5. The restart button resets all scores and returns to question 1

---

## Deployment

The project is deployed via **GitHub Pages**.

Steps to deploy:
1. Push the repository to GitHub
2. Go to **Settings > Pages**
3. Set source to the `main` branch, root folder (`/`)
4. GitHub Pages will publish the site automatically

---

## Testing

### Manual Testing

| Action | Expected Result | Pass/Fail |
|--------|----------------|-----------|
| Page loads | First question is displayed | Pass |
| Click an answer | Next question appears | Pass |
| Answer all 5 questions | Result screen is shown | Pass |
| Click "Take the quiz again" | Quiz resets to question 1 | Pass |
| Resize to mobile (< 480px) | Layout adapts correctly | Pass |
| JSON file unavailable | Error message is shown | Pass |

### Validation

- HTML: validated with [W3C Validator](https://validator.w3.org/)
- CSS: validated with [W3C Jigsaw](https://jigsaw.w3.org/css-validator/)
- JavaScript: checked with [JSHint](https://jshint.com/)

---

## Credits

- Project by Railson Viana — Raigon Lab
- Built for Code Institute Milestone Project 2
