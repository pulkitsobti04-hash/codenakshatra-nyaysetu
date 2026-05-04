// NyaySetu i18n - small, framework-free language switcher.
// Add more languages by adding a new top-level key and translated values.
const translations = {
  en: {
    navHome: '🏠 Home',
    navChat: '⚖️ AI Chat',
    navDocs: '📄 Documents',
    navSimplifier: '📚 Simplifier',
    navStudents: '🎓 Students',
    navAbout: 'ℹ️ About Us',
    emergency: '🚨 Emergency',
    askQuestion: 'Ask a Question',
    getStarted: 'Get Started',
    startFree: 'Start for Free →',
    heroEyebrow: 'AI-Powered · Legal Access · India',
    heroTitlePrefix: 'Justice should not depend on',
    heroTitleEm: 'who you know.',
    heroSub: 'NyaySetu bridges the gap between people and the law. Ask legal questions in plain language — English, Hindi, or any Indian language — powered by AI.',
    howItWorks: 'How It Works',
    trustNoSignup: '🔒 No signup required',
    trustLanguages: 'Hindi, Urdu & more Indian languages',
    trustResolved: '12,400+ queries resolved',
    statQueries: 'Legal queries resolved',
    statStudents: 'Law students onboarded',
    statDocs: 'Documents generated',
    statSatisfaction: 'User satisfaction',
    process: 'Process',
    clarityTitle: 'A system built for clarity',
    claritySub: 'Every query passes through AI analysis and human review — fast and reliable.',
    youAsk: 'You Ask',
    aiAnalyses: 'AI Analyses',
    studentReviews: 'Student Reviews',
    lawyerEscalates: 'Lawyer Escalates',
    citizen: 'Citizen',
    lawStudent: 'Law Student',
    advocate: 'Advocate',
    capabilities: 'Capabilities',
    legalNeed: 'Every legal need, covered',
    aiAssistant: 'AI Legal Assistant',
    docGenerator: 'Document Generator',
    lawSimplifier: 'Law Simplifier',
    studentEcosystem: 'Student Ecosystem',
    openChat: 'Open Chat →',
    generateNow: 'Generate Now →',
    trySimplifier: 'Try Simplifier →',
    joinStudentArrow: 'Join as Student →',
    advantage: 'Advantage',
    whyExists: 'Why NyaySetu exists',
    ctaTitle: 'Your rights matter. Know them.',
    ctaSub: 'Ask your first legal question for free. No signup required to begin.',
    joinStudent: 'Join as Student',
    joinLawyer: 'Join as Lawyer',
    aboutUs: 'About Us',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    disclaimer: 'Legal Disclaimer',
    topics: 'Topics',
    commonQuestions: 'Common Questions',
    criminalLaw: 'Criminal Law',
    familyProperty: 'Family & Property',
    newChat: 'New Chat',
    chatDocs: '📄 Documents',
    findLawyers: '👨‍⚖️ Find Lawyers',
    welcomeTitle: 'NyaySetu AI',
    welcomeSub: 'Your personal legal assistant. Simple, fast, and reliable.',
    chatPlaceholder: 'Describe your legal problem...',
    chatDisclaimer: '⚠️ Guidance only. Consult a lawyer for serious matters.',
    chatStatus: 'Online — responds in seconds',
    langNote: 'Selected language: English. Chat, simplifier, and document AI responses will use this language.',
    connectLawyer: 'Connect with a Lawyer',
    docPageLabel: 'Document Generator',
    docPageTitle: 'Generate legal documents in minutes',
    docPreview: 'Document Preview',
    copy: '📋 Copy',
    downloadPdf: '📄 Download PDF',
    simplifierLabel: 'Law Simplifier',
    simplifierTitle: 'Understand any legal text instantly',
    simplifyButton: '✦ Simplify →',
    studentsDashboard: '📊 Dashboard',
    studentsQueue: '✅ Review Queue',
    studentsLeaderboard: '🏆 Leaderboard',
    studentsJoin: '🎓 Join as Student',
    studentsLawyer: '⚖ Join as Lawyer',
    joinStudentsTitle: 'Join NyaySetu Students',
    joinLawyersTitle: 'Join NyaySetu Lawyers'
  },
  hi: {
    navHome: '🏠 होम',
    navChat: '⚖️ AI चैट',
    navDocs: '📄 दस्तावेज़',
    navSimplifier: '📚 सरलीकरण',
    navStudents: '🎓 छात्र',
    navAbout: 'ℹ️ परिचय',
    emergency: '🚨 आपातकाल',
    askQuestion: 'सवाल पूछें',
    getStarted: 'शुरू करें',
    startFree: 'मुफ्त शुरू करें →',
    heroEyebrow: 'AI-संचालित · कानूनी पहुंच · भारत',
    heroTitlePrefix: 'न्याय इस पर निर्भर नहीं होना चाहिए कि',
    heroTitleEm: 'आप किसे जानते हैं।',
    heroSub: 'NyaySetu लोगों और कानून के बीच की दूरी कम करता है। सरल भाषा में कानूनी सवाल पूछें — English, Hindi या किसी भी भारतीय भाषा में — AI द्वारा संचालित।',
    howItWorks: 'यह कैसे काम करता है',
    trustNoSignup: '🔒 साइनअप की आवश्यकता नहीं',
    trustLanguages: 'हिंदी, उर्दू और अधिक भारतीय भाषाएँ',
    trustResolved: '12,400+ प्रश्न हल किए गए',
    statQueries: 'कानूनी प्रश्न हल',
    statStudents: 'कानून छात्र जुड़े',
    statDocs: 'दस्तावेज़ बनाए गए',
    statSatisfaction: 'उपयोगकर्ता संतुष्टि',
    process: 'प्रक्रिया',
    clarityTitle: 'स्पष्टता के लिए बना सिस्टम',
    claritySub: 'हर प्रश्न AI विश्लेषण और मानवीय समीक्षा से गुजरता है — तेज़ और भरोसेमंद।',
    youAsk: 'आप पूछते हैं',
    aiAnalyses: 'AI विश्लेषण करता है',
    studentReviews: 'छात्र समीक्षा करते हैं',
    lawyerEscalates: 'वकील आगे बढ़ाते हैं',
    citizen: 'नागरिक',
    lawStudent: 'कानून छात्र',
    advocate: 'अधिवक्ता',
    capabilities: 'क्षमताएँ',
    legalNeed: 'हर कानूनी ज़रूरत का समाधान',
    aiAssistant: 'AI कानूनी सहायक',
    docGenerator: 'दस्तावेज़ जनरेटर',
    lawSimplifier: 'कानून सरलीकरण',
    studentEcosystem: 'छात्र इकोसिस्टम',
    openChat: 'चैट खोलें →',
    generateNow: 'अभी बनाएं →',
    trySimplifier: 'सरलीकरण आज़माएँ →',
    joinStudentArrow: 'छात्र के रूप में जुड़ें →',
    advantage: 'लाभ',
    whyExists: 'NyaySetu क्यों है',
    ctaTitle: 'आपके अधिकार मायने रखते हैं। उन्हें जानें।',
    ctaSub: 'अपना पहला कानूनी सवाल मुफ्त पूछें। शुरू करने के लिए साइनअप जरूरी नहीं।',
    joinStudent: 'छात्र के रूप में जुड़ें',
    joinLawyer: 'वकील के रूप में जुड़ें',
    aboutUs: 'हमारे बारे में',
    privacy: 'गोपनीयता नीति',
    terms: 'उपयोग की शर्तें',
    disclaimer: 'कानूनी अस्वीकरण',
    topics: 'विषय',
    commonQuestions: 'सामान्य प्रश्न',
    criminalLaw: 'आपराधिक कानून',
    familyProperty: 'परिवार और संपत्ति',
    newChat: 'नई चैट',
    chatDocs: '📄 दस्तावेज़',
    findLawyers: '👨‍⚖️ वकील खोजें',
    welcomeTitle: 'न्यायसेतु AI',
    welcomeSub: 'आपका व्यक्तिगत कानूनी सहायक। सरल, तेज़ और भरोसेमंद।',
    chatPlaceholder: 'अपनी कानूनी समस्या बताएं...',
    chatDisclaimer: '⚠️ केवल मार्गदर्शन। गंभीर मामलों में वकील से सलाह लें।',
    chatStatus: 'ऑनलाइन — कुछ ही सेकंड में जवाब',
    langNote: 'चुनी गई भाषा: हिंदी। चैट, सरलीकरण और दस्तावेज़ AI उत्तर इसी भाषा में देंगे।',
    connectLawyer: 'वकील से जुड़ें',
    docPageLabel: 'दस्तावेज़ जनरेटर',
    docPageTitle: 'मिनटों में कानूनी दस्तावेज़ बनाएं',
    docPreview: 'दस्तावेज़ पूर्वावलोकन',
    copy: '📋 कॉपी',
    downloadPdf: '📄 PDF डाउनलोड करें',
    simplifierLabel: 'कानून सरलीकरण',
    simplifierTitle: 'किसी भी कानूनी पाठ को तुरंत समझें',
    simplifyButton: '✦ सरल करें →',
    studentsDashboard: '📊 डैशबोर्ड',
    studentsQueue: '✅ समीक्षा कतार',
    studentsLeaderboard: '🏆 लीडरबोर्ड',
    studentsJoin: '🎓 छात्र के रूप में जुड़ें',
    studentsLawyer: '⚖ वकील के रूप में जुड़ें',
    joinStudentsTitle: 'NyaySetu छात्रों से जुड़ें',
    joinLawyersTitle: 'NyaySetu वकीलों से जुड़ें'
  }
};

const i18nBindings = [
  ['.nav-link[data-page="home"]', 'navHome'],
  ['.nav-link[data-page="chat"]', 'navChat'],
  ['.nav-link[data-page="docs"]', 'navDocs'],
  ['.nav-link[data-page="simplifier"]', 'navSimplifier'],
  ['.nav-link[data-page="students"]', 'navStudents'],
  ['.nav-link[data-page="about"]', 'navAbout'],
  ['.nav-ask-btn', 'askQuestion'],
  ['.nav-start-btn', 'getStarted'],
  ['.home-eyebrow', 'heroEyebrow'],
  ['.home-sub', 'heroSub'],
  ['.home-actions .btn-hero-primary', 'startFree'],
  ['.home-actions .btn-hero-ghost', 'howItWorks'],
  ['.home-trust span:nth-child(1)', 'trustNoSignup'],
  ['.home-trust span:nth-child(2)', 'trustLanguages'],
  ['.home-trust span:nth-child(3)', 'trustResolved'],
  ['.stat-item:nth-child(1) .stat-label', 'statQueries'],
  ['.stat-item:nth-child(2) .stat-label', 'statStudents'],
  ['.stat-item:nth-child(3) .stat-label', 'statDocs'],
  ['.stat-item:nth-child(4) .stat-label', 'statSatisfaction'],
  ['#how .section-label', 'process'],
  ['#how .section-h2', 'clarityTitle'],
  ['#how .section-sub', 'claritySub'],
  ['.process-step:nth-child(1) .step-title', 'youAsk'],
  ['.process-step:nth-child(2) .step-title', 'aiAnalyses'],
  ['.process-step:nth-child(3) .step-title', 'studentReviews'],
  ['.process-step:nth-child(4) .step-title', 'lawyerEscalates'],
  ['.process-step:nth-child(1) .step-role', 'citizen'],
  ['.process-step:nth-child(3) .step-role', 'lawStudent'],
  ['.process-step:nth-child(4) .step-role', 'advocate'],
  ['.cap-card:nth-child(1) .cap-card-title', 'aiAssistant'],
  ['.cap-card:nth-child(2) .cap-card-title', 'docGenerator'],
  ['.cap-card:nth-child(3) .cap-card-title', 'lawSimplifier'],
  ['.cap-card:nth-child(4) .cap-card-title', 'studentEcosystem'],
  ['.cap-card:nth-child(1) .cap-card-link', 'openChat'],
  ['.cap-card:nth-child(2) .cap-card-link', 'generateNow'],
  ['.cap-card:nth-child(3) .cap-card-link', 'trySimplifier'],
  ['.cap-card:nth-child(4) .cap-card-link', 'joinStudentArrow'],
  ['.adv-section .section-label', 'advantage'],
  ['.adv-section .section-h2', 'whyExists'],
  ['.cta-h2', 'ctaTitle'],
  ['.cta-sub', 'ctaSub'],
  ['.cta-actions .btn-hero-primary', 'startFree'],
  ['.cta-actions .cta-student', 'joinStudent'],
  ['.cta-actions .cta-lawyer', 'joinLawyer'],
  ['.sidebar-header-title', 'topics'],
  ['.sidebar-section:nth-of-type(1) .sidebar-section-title', 'commonQuestions'],
  ['.sidebar-section:nth-of-type(2) .sidebar-section-title', 'criminalLaw'],
  ['.sidebar-section:nth-of-type(3) .sidebar-section-title', 'familyProperty'],
  ['.chat-action-btn:nth-child(1)', 'newChat'],
  ['.chat-action-btn:nth-child(2)', 'chatDocs'],
  ['.chat-action-btn:nth-child(3)', 'findLawyers'],
  ['#welcome-title', 'welcomeTitle'],
  ['#welcome-sub', 'welcomeSub'],
  ['#chat-disclaimer', 'chatDisclaimer'],
  ['#chat-status', 'chatStatus'],
  ['#lang-note', 'langNote'],
  ['.lm-head-title', 'connectLawyer'],
  ['#page-docs .section-label', 'docPageLabel'],
  ['.docs-h1', 'docPageTitle'],
  ['.simp-page .section-label', 'simplifierLabel'],
  ['.simp-h1', 'simplifierTitle'],
  ['#simp-btn', 'simplifyButton'],
  ['.students-tab:nth-child(1)', 'studentsDashboard'],
  ['.students-tab:nth-child(2)', 'studentsQueue'],
  ['.students-tab:nth-child(3)', 'studentsLeaderboard'],
  ['.students-tab:nth-child(4)', 'studentsJoin'],
  ['.students-tab:nth-child(5)', 'studentsLawyer'],
  ['#stud-join .join-form-title', 'joinStudentsTitle'],
  ['#stud-lawyer .join-form-title', 'joinLawyersTitle']
];

function bindI18nKeys() {
  i18nBindings.forEach(([selector, key]) => {
    document.querySelectorAll(selector).forEach(el => {
      el.setAttribute('data-i18n', key);
    });
  });
  document.querySelectorAll('#chat-input').forEach(el => {
    el.setAttribute('data-i18n-placeholder', 'chatPlaceholder');
  });
}

function getLang() {
  return localStorage.getItem('nyaysetu_lang') || 'en';
}

function applyLanguage(lang) {
  const safeLang = translations[lang] ? lang : 'en';
  const dict = translations[safeLang];
  localStorage.setItem('nyaysetu_lang', safeLang);
  const languageName = safeLang === 'hi' ? 'Hindi' : 'English';
  if (typeof window.setSelectedLanguageName === 'function') {
    window.setSelectedLanguageName(languageName);
  }
  if (typeof window.setUiLanguageCode === 'function') {
    window.setUiLanguageCode(safeLang);
  }
  window.selectedLanguage = languageName;
  document.documentElement.lang = safeLang;
  document.documentElement.dir = 'ltr';

  const select = document.getElementById('lang-select');
  if (select) select.value = safeLang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.placeholder = dict[key];
  });

  const heroTitle = document.querySelector('.home-h1');
  if (heroTitle) {
    heroTitle.innerHTML = `${dict.heroTitlePrefix} <em>${dict.heroTitleEm}</em>`;
  }

  const previewTitle = document.querySelector('.docs-preview-title');
  const previewActions = previewTitle?.querySelector('.docs-preview-actions');
  if (previewTitle && previewActions) {
    previewTitle.firstChild.textContent = `${dict.docPreview} `;
    const buttons = previewActions.querySelectorAll('button');
    if (buttons[0]) buttons[0].textContent = dict.copy;
    if (buttons[1]) buttons[1].textContent = dict.downloadPdf;
  }

  window.dispatchEvent(new CustomEvent('nyaysetu:language-change', { detail: { lang: safeLang } }));
}

function setLang(lang) {
  applyLanguage(lang || document.getElementById('lang-select')?.value || getLang());
}

document.addEventListener('DOMContentLoaded', () => {
  bindI18nKeys();
  const select = document.getElementById('lang-select');
  if (select) {
    select.addEventListener('change', event => setLang(event.target.value));
  }
  applyLanguage(getLang());
});

// Make these intentionally global for existing inline handlers.
window.translations = translations;
window.setLang = setLang;
