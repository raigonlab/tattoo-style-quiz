# [Tattoo Style Quiz](https://raigonlab.github.io/tattoo-style-quiz)

Developer: Railson Goncalves ([raigonlab](https://www.github.com/raigonlab))

[![GitHub commit activity](https://img.shields.io/github/commit-activity/t/raigonlab/tattoo-style-quiz)](https://www.github.com/raigonlab/tattoo-style-quiz/commits/main)
[![GitHub last commit](https://img.shields.io/github/last-commit/raigonlab/tattoo-style-quiz)](https://www.github.com/raigonlab/tattoo-style-quiz/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/raigonlab/tattoo-style-quiz)](https://www.github.com/raigonlab/tattoo-style-quiz)
[![badge](https://img.shields.io/badge/deployment-GitHub_Pages-purple)](https://raigonlab.github.io/tattoo-style-quiz)

---

## Project Introduction and Rationale

Tattoo Style Quiz is an interactive front-end web application that helps users identify which tattoo style best suits their personality and aesthetic preferences. The target audience includes people who are considering getting a tattoo but are unsure which visual direction to pursue, as well as tattoo enthusiasts who want to explore different styles.

The application presents five multiple-choice questions covering visual preferences, body placement, personal meaning, personality traits, and pain tolerance. Based on the answers, the quiz calculates a score for each of four tattoo styles — **Fineline**, **Blackwork**, **Abstract / Flow-line**, and **Geometric** — and reveals the best match with a description.

The project is built as a single-page application using HTML, CSS, and JavaScript, with no external frameworks or libraries. Quiz content is loaded asynchronously from a local JSON file, demonstrating the Fetch API and Promise-based data handling in a clean, user-focused context.

The key technical decisions were: loading all quiz data from `assets/data/questions.json` via `fetch()` with proper error handling, so the content layer is fully separated from the logic layer; and a score-object approach where each answer increments the corresponding style's counter, making the result calculation simple and extensible. The single-page architecture means the user never leaves the page — the quiz, result, and restart flow are all driven by JavaScript DOM manipulation.

#### [Live site →](https://raigonlab.github.io/tattoo-style-quiz)

---

![Tattoo Style Quiz responsive mockup](documentation/responsive_design.png)

*source: https://ui.dev/amiresponsive?url=https://raigonlab.github.io/tattoo-style-quiz*

---

## UX

### The 5 Planes of UX

#### 1. Strategy

**Purpose**

- Help users identify the tattoo style that best matches their personality and aesthetic preferences
- Deliver a quick, frictionless quiz experience with an immediate, meaningful result
- Present content clearly so the user understands their result without needing external references

**Primary User Needs**

- Answer a short set of questions without friction
- Receive a clear, personalised result with a description
- Be able to retake the quiz easily

**Business Goals**

- Demonstrate front-end development skills combining HTML, CSS, JavaScript, and the Fetch API
- Produce a real-world, usable application rather than a generic exercise
- Show understanding of UX principles through a well-structured, accessible, responsive interface

---

#### 2. Scope

**Features**

- Five multiple-choice questions loaded asynchronously from a JSON file
- Score-based result: the style with the most accumulated points wins
- Result screen showing the style name and a descriptive text
- Restart button that resets all state and returns to question 1
- Progress counter showing current question out of total
- Graceful error state if the JSON file fails to load
- Fully responsive layout (mobile and desktop)

**Content Requirements**

- Five questions with four answer options each, stored in `assets/data/questions.json`
- Four style result definitions (name and description), also in the JSON file
- Clear, concise question and answer copy

---

#### 3. Structure

**Information Architecture**

- Single-page application — no routing, no page reloads
- Two states managed by JavaScript: quiz view and result view
- One central content card that switches between states

**User Flow — Desktop**

1. User lands on the page and sees the first question
![Home - desktop](documentation/home-desktop.png)

2. User clicks an answer option and the next question appears
![Question - desktop](documentation/question-desktop.png)

3. After the fifth question, the result screen is shown
![Result - desktop](documentation/result-desktop.png)

4. User clicks "Take the quiz again" and returns to question 1
![Restart - desktop](documentation/restart-desktop.png)

**User Flow — Mobile**

1. User lands on the page and sees the first question
![Home - mobile](documentation/home-mobile.png)

2. User taps an answer option and the next question appears
![Question - mobile](documentation/question-mobile.png)

3. After the fifth question, the result screen is shown
![Result - mobile](documentation/result-mobile.png)

---

#### 4. Skeleton

Low-fidelity sketches were created to define content placement and user flow before writing any code.

![Quiz screen skeleton](documentation/skeleton-quiz.png)
![Result screen skeleton](documentation/skeleton-result.png)

---

#### 5. Surface

**Visual Design**

- Minimal light interface — off-white background (`#f5f5f5`) with white cards and subtle shadows
- System font stack (Helvetica Neue, Arial) for clean, neutral readability
- Interface is intentionally understated so the content — the questions and the result — is the visual priority
- High contrast between text and background to meet accessibility standards

---

## Colour Scheme

Light, editorial scheme centred on content readability:

| Token | Value |
| ------- | ------- |
| Page Background | `#f5f5f5` |
| Card Background | `#ffffff` |
| Primary Text | `#1a1a1a` |
| Secondary Text | `#666666` |
| Subtle / Meta Text | `#999999` |
| Button Background | `#f9f9f9` |
| Restart Button | `#1a1a1a` |

Clean and minimal, designed so the quiz content reads clearly without visual distraction.

![Tattoo Style Quiz Colour Scheme](documentation/colour-scheme.png)

---

## Typography

- **Helvetica Neue / Arial** — system font stack used throughout. No external font dependency is introduced, keeping the interface neutral and load times minimal.

---

## Wireframes

Wireframes were created to define layout and structure across devices before any code was written.

| Screen | Wireframe |
| ------ | --------- |
| Quiz (question view) | ![Quiz wireframe](documentation/wireframe-quiz.png) |
| Result view | ![Result wireframe](documentation/wireframe-result.png) |

---

## User Stories

| Target | Expectation | Outcome |
| ------ | ----------- | ------- |
| As a user considering a tattoo | I want to answer a few quick questions | So I can find out which tattoo style suits me best |
| As a user | I want to see how far along I am in the quiz | So I know how many questions remain |
| As a user | I want to receive a clear result with a description | So I understand what my result means |
| As a user | I want to retake the quiz easily | So I can explore different answers |
| As a user | I want the site to work on my phone | So I can use it on any device |
| As a user | I want clear visual feedback when I interact | So I always know the site responded to my action |
| As a user | I want the site to handle errors gracefully | So I am informed if something goes wrong rather than seeing a broken page |

---

## Features

### Existing Features

| Feature | Description |
| ------- | ----------- |
| JSON Data Loading | Quiz questions and style results are loaded asynchronously from `assets/data/questions.json` using the Fetch API |
| Error Handling | If the JSON file fails to load, a clear error message is shown instead of a broken interface |
| Score Calculation | Each answer increments a counter for the corresponding style; the highest score wins |
| Question Progress Counter | Displays "Question X of Y" so the user always knows where they are |
| Result Screen | Shows the winning style name and a descriptive text after the final answer |
| Restart Flow | Resets all scores and the question index, then renders the first question again |
| Responsive Layout | Flexbox-based layout adapts correctly from mobile (320px) to desktop |
| Accessible Buttons | Focus styles and `aria` attributes ensure keyboard and screen reader usability |

---

### Future Features

- Visual progress bar to complement the text counter
- Brief visual feedback (highlight) when an answer is selected before the next question loads
- Share result on social media
- Expanded style results with example tattoo images
- More questions for a more nuanced result

---

## Tools & Technologies

- HTML5
- CSS3 (Flexbox, media queries)
- JavaScript (ES6, Fetch API, Promises)
- JSON (external data file)
- Git & GitHub
- GitHub Pages
- Claude — coding assistant for debugging and project support
- ChatGPT — debugging and explanations

---

## Testing

All testing details are available in:

👉 [TESTING.md](TESTING.md)

---

## Deployment

### Live Website

The site was deployed to GitHub Pages. The steps to deploy are as follows:

1. In the GitHub repository, navigate to the **Settings** tab
2. From the **Code and automation** section drop-down menu, select **Pages**
3. In the build and deployment area, choose from source **"deploy from a branch"** and then choose the **main** branch, **root** folder, and save
4. Once saved, the page will be automatically refreshed with a ribbon confirming successful deployment (it can take around 5 minutes for the link to appear)

**Live link:** https://raigonlab.github.io/tattoo-style-quiz

### Local Development

To run the project locally:

1. Clone the repository:
   ```
   git clone https://github.com/raigonlab/tattoo-style-quiz.git
   ```
2. Navigate into the project folder:
   ```
   cd tattoo-style-quiz
   ```
3. Start a local server — either with the VS Code Live Server extension, or via terminal:
   ```
   python -m http.server
   ```
4. Open `http://localhost:8000` in your browser.

> **Note:** opening `index.html` directly via `file://` will cause a CORS error that blocks the `fetch()` call for the quiz data. A local server is required.

---

## Credits

### Content

- [MDN Web Docs](https://developer.mozilla.org/) — Fetch API and DOM reference
- Code Institute materials
- Claude — coding assistant for debugging and project support
- ChatGPT — debugging and explanations

### Media

- All quiz content and style descriptions written by Railson Gonçalves

---

## Acknowledgements

Special thanks to my mentor for their guidance and support throughout the project.
