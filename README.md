# NyaySetu — AI-Powered Legal Access for India

NyaySetu is an AI-powered platform designed to make Indian law simple and accessible to everyone. We believe that understanding your legal rights should not depend on how much money you have or who you know.

## Features

- **AI Legal Assistant**: Ask legal questions in plain language — English, Hindi, or any Indian language — powered by AI that identifies applicable laws in seconds.
- **Document Generator**: Generate legally accurate documents in minutes — legal notices, affidavits, rent agreements, consumer complaints, RTI applications, bail applications, FIR drafts.
- **Law Simplifier**: Paste any legal text (court order, notice, contract, IPC section) and get a plain-language breakdown with actionable steps.
- **Student Ecosystem**: Law students review queries, build portfolios, earn credits, and get ranked on India's legal AI leaderboard.
- **Emergency Helplines**: Quick access to police, women helpline, cyber crime, and other emergency contacts.
- **Multi-language Support**: Supports over 100 languages including English, Hindi, Urdu, and regional Indian languages.

## Project Structure

```
nyaysetu/
├── nyaysetu-complete.html  # Complete static demo: HTML, CSS, and app JavaScript
├── translations.js         # English/Hindi UI language switcher
├── README.md               # Project notes and testing instructions
├── index.html              # Earlier/reference version
├── css/                    # Optional legacy assets
└── js/                     # Optional legacy assets
```

## Phase Structure

### Phase 1 — MVP: Fully Implemented

- Working legal chat demo with local AI-style responses.
- English/Hindi language switcher with saved preference.
- Category-based problem selection through topic buttons.
- Evidence upload UI.
- Case summary banner.
- Connect with a lawyer flow after responses.
- Static lawyer listing with filters, ratings, reviews, and booking/send-case actions.
- Emergency helplines and legal disclaimers.

### Phase 2 — Growth: Demo/UI Level

- Document generator with local templates and PDF/copy support.
- Case summary generation using simple frontend logic.
- Ratings and review display in lawyer cards.
- Voice input using browser speech recognition when available.
- Student dashboard/review queue/leaderboard UI.

### Phase 3 — Future Scope: Code Comments Only

The code includes placeholders/comments for:

- Smart lawyer matching algorithm.
- Backend integration with Firebase/Node.
- Payments.
- Real-time lawyer chat.
- Case tracking.

## Setup Instructions

1. **Clone or Download**: Place all files in a web server directory or open directly in a browser.

2. **Dependencies**:
   - The app uses jsPDF (loaded via CDN) for PDF generation.
   - No additional setup required — it's a static web application.

3. **Browser Compatibility**:
   - Modern browsers (Chrome, Firefox, Safari, Edge).
   - Voice input works best in Chrome.
   - PDF download requires the jsPDF CDN to load.

## Usage

1. **Open `nyaysetu-complete.html`** in your web browser.
2. **Select Language**: Use the language selector in the top navigation to choose your preferred language for responses.
3. **Navigate Pages**:
   - **Home**: Overview of features and capabilities.
   - **AI Chat**: Ask legal questions and get AI-powered responses.
   - **Documents**: Generate legal documents by filling forms.
   - **Simplifier**: Paste legal text to get simplified explanations.
   - **Students**: Join the student ecosystem or view leaderboard.
   - **About/Privacy/Terms**: Learn more about the platform.

## Key Components

### AI Chat Engine
- Frontend-only demo responses for reliable college/project presentation.
- Structured responses with sections: Simple Explanation, Applicable Law, Step-by-Step Actions, Options, Time Limits, Important Note.
- Supports voice input (Chrome recommended).
- Evidence upload for document attachments.

### Document Generator
- Templates for common Indian legal documents.
- Local demo draft generation with review checklist.
- PDF download and copy-to-clipboard functionality.

### Law Simplifier
- Breaks down complex legal jargon into plain language.
- Actionable steps and key takeaways.
- Sample legal texts for testing.

### Student Platform
- Review queue for law students to earn points.
- National leaderboard and performance tracking.
- Join form for new student registrations.

## Future API Integration

The current MVP does **not** call paid AI APIs directly from the browser. This avoids API key exposure and demo failures.

Future production version should move these features to a backend:

- AI legal response generation.
- Authentication and user profiles.
- Chat/document history.
- Lawyer verification and admin moderation.
- Payments and real-time lawyer chat.

## Legal Disclaimer

⚠️ **NyaySetu is a technology platform, not a law firm.** The information provided by our AI, platform, or student reviewers is for educational and informational purposes only and does **not constitute legal advice**. Using NyaySetu does not create an attorney-client relationship. Always consult a qualified and licensed advocate for professional legal advice regarding your specific situation.

## Contributing

This is an open-source project. Contributions are welcome for:
- Adding more languages
- Improving AI prompts
- Adding new document templates
- Enhancing UI/UX
- Bug fixes and performance improvements

## License

© 2026 NyaySetu. All rights reserved.

## Contact

For support or inquiries, please visit the About page in the application.
