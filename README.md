# NyaySetu - AI-Powered Legal Access for India

NyaySetu is a static web demo for making Indian legal information easier to understand and access. It brings together an AI-style legal chat interface, legal document generation, plain-language law simplification, emergency helplines, lawyer discovery, and a law-student review ecosystem.

The project is built as a frontend-only prototype, so it can be opened directly in a browser or hosted on GitHub Pages without a backend.

## Live Demo File

Open:

```text
nyaysetu-complete.html
```

This file contains the complete presentation-ready application experience.

## Features

- **AI Legal Assistant**: Ask legal questions in plain language and receive structured guidance.
- **Role-Based Get Started Flow**: Separate onboarding paths for legal help seekers, law students, and advocates.
- **Document Generator**: Create draft legal notices, affidavits, rent agreements, consumer complaints, RTI applications, FIR drafts, and more.
- **Law Simplifier**: Paste legal text and get a simpler explanation with key points and next steps.
- **Lawyer Connect Flow**: View lawyer cards, ratings, filters, reviews, and booking/send-case actions.
- **Lawyer Network Area**: A dedicated Lawyers section for advocate dashboard, case leads, verification details, and profile submission.
- **Student Ecosystem**: Includes student dashboard, review queue, credits, and leaderboard UI.
- **Emergency Helplines**: Quick-access emergency contacts for police, women helpline, cyber crime, ambulance, child helpline, and senior citizens.
- **Language Support**: English/Hindi UI switching through `translations.js`.
- **Theme Toggle**: Dark and bright visual modes.
- **Voice Input**: Browser speech recognition support where available.
- **PDF Export**: Document drafts can be downloaded as PDFs using jsPDF from a CDN.

## User Flows

NyaySetu includes separate flows for citizens, law students, and lawyers:

- **Ask a Legal Question**: Users can open AI Chat, describe their issue, choose a topic shortcut, attach evidence, and receive structured legal guidance.
- **Get Started**: Users land on a role-selection page instead of chat. They can continue as a Legal Help Seeker, Law Student, or Advocate.
- **Appoint or Connect With a Lawyer**: Users can open the lawyer modal from AI Chat, filter lawyers by specialization, budget, and location, then book a consultation or send case details.
- **Join as a Student**: Law students can open the Students page, choose the Join as Student tab, enter their name, email, college, year, legal interest area, and optional enrollment number.
- **Review as a Student**: Students can use the dashboard, review queue, and leaderboard UI to review AI responses, earn credits, track activity, and build a public ranking.
- **Join as a Lawyer**: Advocates can open the Join as Lawyer tab and submit profile details such as name, contact information, qualification, specialization, experience, location, fees, bio, and certificate upload.
- **Use the Lawyers Area**: Advocates can open the Lawyers navigation item to view a dashboard, case leads, verification workflow, and join-as-advocate form.
- **Lawyer Verification Concept**: Lawyer profiles are marked as verification-based in the UI, with future scope for Bar Council ID checks and supporting document review.
- **Generate Legal Documents**: Users can create draft legal documents and download or copy them for advocate review.
- **Simplify Legal Text**: Users can paste complex legal text and receive a plain-language breakdown.
- **Emergency Help**: Users can access emergency helplines directly from the navigation bar.

## Project Structure

```text
Nyaysetu/
|-- nyaysetu-complete.html  # Complete static demo: HTML, CSS, and app JavaScript
|-- translations.js         # English/Hindi UI translation strings
|-- README.md               # Project overview and usage instructions
|-- index.html              # Earlier/reference version of the demo
|-- .nojekyll               # Keeps GitHub Pages from running Jekyll processing
|-- css/
|   `-- styles.css          # Legacy/extracted stylesheet
`-- js/
    `-- scripts.js          # Legacy/extracted JavaScript
```

## Phase Status

### Phase 1 - MVP: Implemented

- Local AI-style legal chat demo.
- English/Hindi language selector with saved preference.
- Category-based legal problem shortcuts.
- Evidence upload UI for documents and images.
- Case summary banner.
- Connect-with-lawyer flow.
- Static lawyer listing with filters, ratings, reviews, booking, and send-case actions.
- Emergency helplines and legal disclaimers.

### Phase 2 - Growth: Demo/UI Level

- Document generator with local templates.
- Copy-to-clipboard and PDF download support.
- Case summary generation using frontend logic.
- Voice input using browser speech recognition when available.
- Student dashboard, review queue, and leaderboard UI.

### Phase 3 - Future Scope

The current code includes placeholders or natural extension points for:

- Smart lawyer matching.
- Backend integration with Firebase, Node.js, or another API layer.
- Authentication and user profiles.
- Payments.
- Real-time lawyer chat.
- Case tracking.
- Admin moderation and lawyer verification.

## Setup

No installation is required for the static demo.

1. Clone or download this repository.
2. Open `nyaysetu-complete.html` in a modern browser.
3. For GitHub Pages, publish the repository and use `nyaysetu-complete.html` as the main demo file.

## Dependencies

- jsPDF is loaded from a CDN for PDF generation.
- The rest of the complete demo runs with plain HTML, CSS, and JavaScript.
- No package manager, build step, or backend server is required.

## Browser Support

- Chrome, Edge, Firefox, and Safari are supported for the core app.
- Voice input works best in Chrome-based browsers.
- PDF download requires the jsPDF CDN to load successfully.

## How To Use

1. Open `nyaysetu-complete.html`.
2. Use the top navigation to switch between Home, AI Chat, Documents, Simplifier, Students, Lawyers, About, Privacy, and Terms.
3. Use the language selector in the navigation bar to switch between English and Hindi.
4. Use **Ask a Question** to open AI Chat directly.
5. Use **Get Started** to open the role-based login/onboarding page.
6. In AI Chat, type a legal issue, select a topic shortcut, attach evidence if needed, or use voice input where supported.
7. In Documents, choose a document type, fill in the form, then copy or download the generated draft.
8. In Simplifier, paste legal text to receive a plain-language explanation.
9. In Students, use the Dashboard, Review Queue, Leaderboard, Join as Student, or Join as Lawyer tabs.
10. In Lawyers, use the Dashboard, Case Leads, Verification, or Join as Advocate tabs.
11. Use Find Lawyers from AI Chat to filter advocates, book a consultation, or send case details.
12. Use the emergency button in the navigation bar for quick helpline access.

## Key Components

### AI Chat Engine

- Frontend-only legal guidance demo.
- Structured responses covering explanation, applicable law, next steps, options, time limits, and important notes.
- Topic shortcuts for common legal issues.
- Evidence upload UI for supporting files.
- Lawyer connection flow after chat responses.

### Document Generator

- Local templates for common Indian legal documents.
- Generated drafts with practical review checklists.
- Copy and PDF download actions.

### Law Simplifier

- Converts dense legal text into simpler language.
- Highlights key takeaways and suggested actions.
- Includes sample legal text for quick testing.

### Student Platform

- Student review queue.
- Credit and activity display.
- National leaderboard UI.
- Join form for new student registrations.

### Lawyer Platform

- Dedicated Lawyers navigation button.
- Advocate dashboard with consultation requests, ratings, accepted cases, and demo earnings.
- Case leads section with category, location, budget, urgency, and structured summaries.
- Verification section explaining Bar Council details, document review, case matching, and trusted profiles.
- Join-as-lawyer form for advocate profile submission.
- Specialization, experience, location, fee, bio, and certificate fields.
- Lawyer cards with verification badges, ratings, reviews, fees, and consultation actions.
- Filters for specialization, budget, and location.
- Demo flow for booking a lawyer or sending case details.

## Production Roadmap

This demo does not call paid AI APIs directly from the browser. A production version should move sensitive and dynamic features to a backend service.

Recommended backend responsibilities:

- AI legal response generation.
- Authentication and authorization.
- User profiles and chat history.
- Document storage and case history.
- Lawyer verification.
- Admin moderation.
- Payments.
- Real-time chat and notifications.

## Legal Disclaimer

**NyaySetu is a technology platform, not a law firm.** The information provided by the demo, AI-style responses, platform flows, or student-review concepts is for educational and informational purposes only and does not constitute legal advice. Using NyaySetu does not create an attorney-client relationship. Always consult a qualified and licensed advocate for advice about a specific legal matter.

## Contributing

Contributions are welcome for:

- Adding more languages.
- Improving legal response templates.
- Adding new document templates.
- Enhancing UI/UX.
- Improving accessibility.
- Fixing bugs and performance issues.

## License

Copyright (c) 2026 NyaySetu. All rights reserved.

## Contact

For support or project inquiries, use the About page in the application.
