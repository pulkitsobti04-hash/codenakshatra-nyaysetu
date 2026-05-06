// NyaySetu i18n - small, framework-free language switcher.
// Add more languages by adding a new top-level key and translated values.
const translations = {
  en: {
    navHome: '🏠 Home',
    navChat: '⚖️ AI Chat',
    navDocs: '📄 Docs',
    navSimplifier: '📚 Simplify',
    navCitizens: '👤 Citizens',
    navStudents: '🎓 Students',
    navLawyers: '⚖ Lawyers',
    navAbout: 'ℹ️ About Us',
    emergency: '🚨 Emergency',
    askQuestion: 'Ask a Question',
    getStarted: 'Get Started',
    startFree: 'Start for Free →',
    heroEyebrow: 'AI-Powered · Legal Access · India',
    heroTitlePrefix: 'Justice should not depend on',
    heroTitleEm: 'who you know.',
    heroTitleLine1: 'Justice',
    heroTitleLine2: 'should not depend',
    heroTitleLine3Prefix: 'on ',
    heroSub: 'NyaySetu bridges the gap between people and the law. Ask legal questions in plain language — English, Hindi, or any language — powered by AI.',
    howItWorks: 'How It Works',
    trustNoSignup: '🔒 No signup required',
    trustLanguages: 'Hindi, Urdu & more languages',
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
    citizenCaseDesk: 'Citizen Case Desk',
    studentEcosystem: 'Student Ecosystem',
    lawyerNetwork: 'Lawyer Network',
    openChat: 'Open Chat →',
    generateNow: 'Generate Now →',
    trySimplifier: 'Try Simplifier →',
    submitCaseArrow: 'Submit a Case →',
    joinStudentArrow: 'Join as Student →',
    joinLawyerArrow: 'Join as Lawyer →',
    advantage: 'Advantage',
    whyExists: 'Why NyaySetu exists',
    ctaTitle: 'Your rights matter. Know them.',
    ctaSub: 'Ask your first legal question for free. No signup required to begin.',
    joinStudent: 'Join as Student',
    joinLawyer: 'Join as Lawyer',
    submitCase: 'Submit a Case',
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
    navCitizens: '👤 नागरिक',
    navStudents: '🎓 छात्र',
    navLawyers: '⚖ वकील',
    navAbout: 'ℹ️ हमारे बारे में',
    emergency: '🚨 आपातकाल',
    askQuestion: 'सवाल पूछें',
    getStarted: 'शुरू करें',
    startFree: 'मुफ्त शुरू करें →',
    heroEyebrow: 'AI-संचालित · कानूनी पहुंच · भारत',
    heroTitlePrefix: 'न्याय इस पर निर्भर नहीं होना चाहिए कि',
    heroTitleEm: 'आप किसे जानते हैं।',
    heroTitleLine1: 'न्याय',
    heroTitleLine2: 'इस पर निर्भर नहीं',
    heroTitleLine3Prefix: 'कि ',
    heroSub: 'NyaySetu लोगों और कानून के बीच की दूरी कम करता है। सरल भाषा में कानूनी सवाल पूछें — English, Hindi या किसी भी भाषा में — AI द्वारा संचालित।',
    howItWorks: 'यह कैसे काम करता है',
    trustNoSignup: '🔒 साइनअप की आवश्यकता नहीं',
    trustLanguages: 'हिंदी, उर्दू और अधिक भाषाएँ',
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

const fullPageTextOriginals = new Map();
const fullPageAttrOriginals = new Map();

const fullPageTranslations = {
  hi: {
    'Select language': 'भाषा चुनें',
    'Emergency help': 'आपातकालीन सहायता',
    'Switch to brightness mode': 'ब्राइट मोड पर जाएं',
    'Ask a Question': 'सवाल पूछें',
    'Get Started': 'शुरू करें',
    'Start for Free →': 'मुफ्त शुरू करें →',
    'Submit a Case': 'केस जमा करें',
    'Submit a Case →': 'केस जमा करें →',
    'Join as Student': 'छात्र के रूप में जुड़ें',
    'Join as Student →': 'छात्र के रूप में जुड़ें →',
    'Join as Lawyer': 'वकील के रूप में जुड़ें',
    'Join as Lawyer →': 'वकील के रूप में जुड़ें →',
    'Join as Advocate': 'अधिवक्ता के रूप में जुड़ें',
    'Home': 'होम',
    'AI Chat': 'AI चैट',
    'Docs': 'दस्तावेज़',
    'Documents': 'दस्तावेज़',
    'Simplify': 'सरलीकरण',
    'Simplifier': 'सरलीकरण',
    'Citizens': 'नागरिक',
    'Students': 'छात्र',
    'Lawyers': 'वकील',
    'About': 'परिचय',
    'About Us': 'हमारे बारे में',
    'AI-Powered Legal Access for India': 'भारत के लिए AI-संचालित कानूनी पहुंच',
    'Not a substitute for legal advice': 'कानूनी सलाह का विकल्प नहीं',
    'No signup required': 'साइनअप की आवश्यकता नहीं',
    'Hindi, Urdu & more languages': 'हिंदी, उर्दू और अधिक भाषाएँ',
    '12,400+ queries resolved': '12,400+ प्रश्न हल किए गए',
    'Legal queries resolved': 'कानूनी प्रश्न हल',
    'Law students onboarded': 'कानून छात्र जुड़े',
    'Documents generated': 'दस्तावेज़ बनाए गए',
    'User satisfaction': 'उपयोगकर्ता संतुष्टि',
    'Process': 'प्रक्रिया',
    'Capabilities': 'क्षमताएँ',
    'Advantage': 'लाभ',
    'Every legal need, covered': 'हर कानूनी ज़रूरत का समाधान',
    'A system built for clarity': 'स्पष्टता के लिए बना सिस्टम',
    'Every query passes through AI analysis and human review — fast and reliable.': 'हर प्रश्न AI विश्लेषण और मानव समीक्षा से गुजरता है — तेज़ और भरोसेमंद।',
    'Traditional legal help is slow, expensive, and inaccessible. We built NyaySetu to change all three.': 'पारंपरिक कानूनी सहायता धीमी, महंगी और कठिन है। NyaySetu इन तीनों को बदलने के लिए बनाया गया है।',
    'Why NyaySetu exists': 'NyaySetu क्यों है',
    'Your rights matter. Know them.': 'आपके अधिकार मायने रखते हैं। उन्हें जानें।',
    'Ask your first legal question for free. No signup required to begin.': 'अपना पहला कानूनी सवाल मुफ्त पूछें। शुरू करने के लिए साइनअप जरूरी नहीं।',
    'AI Legal Assistant': 'AI कानूनी सहायक',
    'Document Generator': 'दस्तावेज़ जनरेटर',
    'Law Simplifier': 'कानून सरलीकरण',
    'Citizen Case Desk': 'नागरिक केस डेस्क',
    'Student Ecosystem': 'छात्र इकोसिस्टम',
    'Lawyer Network': 'वकील नेटवर्क',
    'Open Chat →': 'चैट खोलें →',
    'Generate Now →': 'अभी बनाएँ →',
    'Try Simplifier →': 'सरलीकरण आज़माएँ →',
    'You Ask': 'आप पूछते हैं',
    'AI Analyses': 'AI विश्लेषण करता है',
    'Student Reviews': 'छात्र समीक्षा करते हैं',
    'Lawyer Escalates': 'वकील आगे बढ़ाते हैं',
    'Citizen': 'नागरिक',
    'NyaySetu AI': 'NyaySetu AI',
    'Law Student': 'कानून छात्र',
    'Advocate': 'अधिवक्ता',
    'You Ask Submit your legal question in English, Hindi, Urdu, or any language. No legal knowledge needed. Citizen': 'आप पूछें अपनी कानूनी समस्या सरल भाषा में लिखें। कानूनी ज्ञान की आवश्यकता नहीं। नागरिक',
    'Submit your legal question in English, Hindi, Urdu, or any language. No legal knowledge needed.': 'अपनी कानूनी समस्या सरल भाषा में लिखें। कानूनी ज्ञान की आवश्यकता नहीं।',
    'AI Legal Assistant Ask anything in plain language — FIR procedures, property disputes, consumer rights. AI identifies applicable laws in seconds. Open Chat →': 'AI कानूनी सहायक सरल भाषा में कुछ भी पूछें — FIR प्रक्रिया, संपत्ति विवाद, उपभोक्ता अधिकार। AI सेकंडों में लागू कानून पहचानता है। चैट खोलें →',
    'Ask anything in plain language — FIR procedures, property disputes, consumer rights. AI identifies applicable laws in seconds.': 'सरल भाषा में कुछ भी पूछें — FIR प्रक्रिया, संपत्ति विवाद, उपभोक्ता अधिकार। AI सेकंडों में लागू कानून पहचानता है।',
    'Generate legally accurate documents in minutes — legal notices, affidavits, rent agreements, consumer complaints, RTI applications.': 'मिनटों में कानूनी दस्तावेज़ बनाएँ — कानूनी नोटिस, शपथपत्र, किराया समझौता, उपभोक्ता शिकायत, RTI आवेदन।',
    'Paste any legal text — court order, notice, contract, government circular — get a plain language breakdown with actionable steps.': 'कोई भी कानूनी पाठ पेस्ट करें — कोर्ट आदेश, नोटिस, अनुबंध, सरकारी परिपत्र — और सरल भाषा में कदम समझें।',
    'Citizens can log in, submit case facts, add urgency and evidence details, then track the next legal review step.': 'नागरिक लॉगिन कर केस तथ्य, तात्कालिकता और सबूत की जानकारी जमा कर सकते हैं और अगला समीक्षा चरण देख सकते हैं।',
    'Law students earn credits reviewing queries, build real portfolios, and get ranked on India\'s legal AI professional leaderboard.': 'कानून छात्र प्रश्नों की समीक्षा कर क्रेडिट कमाते हैं, वास्तविक पोर्टफोलियो बनाते हैं और लीडरबोर्ड पर रैंक पाते हैं।',
    'Advocates can join the NyaySetu network, submit verification details, and receive organized case leads from citizens.': 'अधिवक्ता NyaySetu नेटवर्क से जुड़कर सत्यापन विवरण जमा कर सकते हैं और नागरिकों से व्यवस्थित केस लीड पा सकते हैं।',
    'Fast — minutes, not weeks': 'तेज़ — हफ्तों नहीं, मिनटों में',
    'Affordable — not ₹5,000/hour': 'किफायती — ₹5,000/घंटा नहीं',
    'Accessible — anywhere, anyone': 'सुलभ — कहीं भी, किसी के लिए भी',
    'Privacy Policy': 'गोपनीयता नीति',
    'Terms of Use': 'उपयोग की शर्तें',
    'Legal Disclaimer': 'कानूनी अस्वीकरण',

    'Get Started': 'शुरू करें',
    'Choose how you want to use NyaySetu.': 'चुनें कि आप NyaySetu का उपयोग कैसे करना चाहते हैं।',
    'Continue as someone seeking legal help, join the student review ecosystem, or sign in as an advocate. Each path keeps the same guided NyaySetu experience.': 'कानूनी सहायता चाहने वाले व्यक्ति के रूप में जारी रखें, छात्र समीक्षा प्रणाली से जुड़ें, या अधिवक्ता के रूप में साइन इन करें।',
    'Select your role': 'अपनी भूमिका चुनें',
    'Legal Help Seeker': 'कानूनी सहायता चाहने वाला',
    'Ask questions, create documents, and connect with advocates.': 'सवाल पूछें, दस्तावेज़ बनाएँ और अधिवक्ताओं से जुड़ें।',
    'Review AI answers, earn credits, and build a legal portfolio.': 'AI उत्तरों की समीक्षा करें, क्रेडिट कमाएँ और कानूनी पोर्टफोलियो बनाएँ।',
    'Manage consultations and submit a verified lawyer profile.': 'परामर्श प्रबंधित करें और सत्यापित वकील प्रोफ़ाइल जमा करें।',
    'When the local backend is running, registrations are stored in SQLite. Otherwise, the page continues as a browser demo.': 'स्थानीय बैकएंड चलने पर पंजीकरण SQLite में सहेजे जाते हैं। अन्यथा यह ब्राउज़र डेमो के रूप में चलता है।',
    'Continue as Legal Help Seeker': 'कानूनी सहायता चाहने वाले के रूप में जारी रखें',
    'Use this path if you need legal information, document drafts, or a lawyer consultation.': 'यदि आपको कानूनी जानकारी, दस्तावेज़ ड्राफ्ट या वकील परामर्श चाहिए तो यह विकल्प चुनें।',
    'Student Login': 'छात्र लॉगिन',
    'For law students who review queries, track credits, and appear on the leaderboard.': 'उन कानून छात्रों के लिए जो प्रश्नों की समीक्षा करते हैं, क्रेडिट ट्रैक करते हैं और लीडरबोर्ड पर आते हैं।',
    'Advocate Login': 'अधिवक्ता लॉगिन',
    'For verified lawyers who want to receive case leads and manage consultations.': 'सत्यापित वकीलों के लिए जो केस लीड प्राप्त करना और परामर्श प्रबंधित करना चाहते हैं।',
    'Full Name': 'पूरा नाम',
    'Email Address': 'ईमेल पता',
    'Email': 'ईमेल',
    'Phone Number': 'फोन नंबर',
    'Password': 'पासवर्ड',
    'What do you need help with?': 'आपको किसमें मदद चाहिए?',
    'Select an option': 'एक विकल्प चुनें',
    'Ask a legal question': 'कानूनी सवाल पूछें',
    'Generate a legal document': 'कानूनी दस्तावेज़ बनाएँ',
    'Understand legal text': 'कानूनी पाठ समझें',
    'Connect with a lawyer': 'वकील से जुड़ें',
    'Continue': 'जारी रखें',
    'Ask Without Login': 'लॉगिन के बिना पूछें',
    'Login as Student': 'छात्र के रूप में लॉगिन',
    'Login as Advocate': 'अधिवक्ता के रूप में लॉगिन',
    'Bar Council / Enrollment No.': 'बार काउंसिल / नामांकन संख्या',
    'Enrollment number': 'नामांकन संख्या',

    'Topics': 'विषय',
    'Common Questions': 'सामान्य प्रश्न',
    'Criminal Law': 'आपराधिक कानून',
    'Family & Property': 'परिवार और संपत्ति',
    'New Chat': 'नई चैट',
    'Find Lawyers': 'वकील खोजें',
    'Your personal legal assistant. Simple, fast, and reliable.': 'आपका व्यक्तिगत कानूनी सहायक। सरल, तेज़ और भरोसेमंद।',
    'Generate Legal Notice': 'कानूनी नोटिस बनाएँ',
    'Check My Rights': 'मेरे अधिकार देखें',
    'File Complaint': 'शिकायत दर्ज करें',
    'Attach evidence (documents, images)': 'सबूत संलग्न करें (दस्तावेज़, चित्र)',
    'Voice input': 'आवाज़ से इनपुट',
    'Send message': 'संदेश भेजें',
    'Describe your legal problem': 'अपनी कानूनी समस्या बताएं',
    'Describe your legal problem...': 'अपनी कानूनी समस्या बताएं...',
    'Guidance only. Consult a lawyer for serious matters.': 'केवल मार्गदर्शन। गंभीर मामलों में वकील से सलाह लें।',
    'Connect with a Lawyer': 'वकील से जुड़ें',
    'All Specializations': 'सभी विशेषज्ञताएँ',
    'Any Budget': 'कोई भी बजट',
    'All Locations': 'सभी स्थान',
    'Close lawyer modal': 'वकील विंडो बंद करें',

    'Generate legal documents in minutes': 'मिनटों में कानूनी दस्तावेज़ बनाएँ',
    'AI-powered, legally accurate templates for every common Indian legal need. Fill in your details — ready to use in under 60 seconds.': 'हर सामान्य भारतीय कानूनी ज़रूरत के लिए AI-संचालित दस्तावेज़ टेम्पलेट। विवरण भरें — 60 सेकंड से कम में तैयार।',
    'Legal Notice': 'कानूनी नोटिस',
    'Affidavit': 'शपथपत्र',
    'Rent Agreement': 'किराया समझौता',
    'Consumer Complaint': 'उपभोक्ता शिकायत',
    'RTI Application': 'RTI आवेदन',
    'Bail Application': 'जमानत आवेदन',
    'FIR Draft': 'FIR ड्राफ्ट',
    'Legal Notice Details': 'कानूनी नोटिस विवरण',
    'Generate Document': 'दस्तावेज़ बनाएँ',
    'Document Preview': 'दस्तावेज़ पूर्वावलोकन',
    'Copy': 'कॉपी',
    'Download PDF': 'PDF डाउनलोड करें',
    'Fill in the form on the left and click "Generate Document"': 'बाईं ओर फॉर्म भरें और "दस्तावेज़ बनाएँ" पर क्लिक करें',
    'AI-generated documents are drafts for guidance only. Have a licensed advocate review before filing in court.': 'AI से बने दस्तावेज़ केवल मार्गदर्शन के लिए ड्राफ्ट हैं। अदालत में दाखिल करने से पहले लाइसेंस प्राप्त अधिवक्ता से समीक्षा करवाएँ।',

    'Understand any legal text instantly': 'किसी भी कानूनी पाठ को तुरंत समझें',
    'Paste a court order, legal notice, contract clause, IPC section, or government circular — get a plain-language breakdown with actionable steps in seconds.': 'कोर्ट आदेश, कानूनी नोटिस, अनुबंध क्लॉज, IPC धारा या सरकारी परिपत्र पेस्ट करें — सेकंडों में सरल भाषा में समझें।',
    'Try a sample:': 'नमूना आज़माएँ:',
    'Legal Text Input': 'कानूनी पाठ इनपुट',
    'Plain English Simplified': 'सरल भाषा में व्याख्या',
    'Clear': 'साफ करें',
    'Simplify →': 'सरल करें →',
    'Re-analyse': 'फिर से विश्लेषण करें',
    'Your plain-language explanation will appear here': 'आपकी सरल भाषा वाली व्याख्या यहाँ दिखाई देगी',
    'Paste legal text to simplify': 'सरल करने के लिए कानूनी पाठ पेस्ट करें',
    'Paste any legal text here — court order, legal notice, contract clause, IPC / CrPC section, government circular, FIR content...': 'कोई भी कानूनी पाठ यहाँ पेस्ट करें — कोर्ट आदेश, कानूनी नोटिस, अनुबंध क्लॉज, IPC / CrPC धारा, सरकारी परिपत्र, FIR सामग्री...',

    'Submit your case directly to NyaySetu.': 'अपना केस सीधे NyaySetu पर जमा करें।',
    'A dedicated citizen workspace for logging in, preparing a structured case brief, and sending facts, urgency, location, and evidence details for review.': 'लॉगिन, व्यवस्थित केस ब्रीफ तैयार करने और तथ्य, तात्कालिकता, स्थान व सबूत समीक्षा के लिए भेजने का नागरिक कार्यक्षेत्र।',
    'Login first': 'पहले लॉगिन करें',
    'Use your citizen ID or email and password before the case form opens.': 'केस फॉर्म खुलने से पहले अपनी नागरिक ID या ईमेल और पासवर्ड दर्ज करें।',
    'Build the brief': 'ब्रीफ तैयार करें',
    'Add your case type, city, timeline, urgency, and supporting documents.': 'केस प्रकार, शहर, समयरेखा, तात्कालिकता और सहायक दस्तावेज़ जोड़ें।',
    'Send for review': 'समीक्षा के लिए भेजें',
    'NyaySetu prepares the matter for AI triage, student review, or advocate routing.': 'NyaySetu मामले को AI छंटाई, छात्र समीक्षा या अधिवक्ता रूटिंग के लिए तैयार करता है।',
    'Citizen login required': 'नागरिक लॉगिन आवश्यक',
    'The case submission workspace opens after ID and password verification on this page.': 'इस पेज पर ID और पासवर्ड सत्यापन के बाद केस जमा करने का कार्यक्षेत्र खुलेगा।',
    'Submit Your Case': 'अपना केस जमा करें',
    'Create a clear intake brief so the next reviewer can understand your facts without confusion.': 'एक स्पष्ट इनटेक ब्रीफ बनाएँ ताकि अगला समीक्षक आपके तथ्य बिना भ्रम समझ सके।',
    'Case Title': 'केस शीर्षक',
    'Case Category': 'केस श्रेणी',
    'City / State': 'शहर / राज्य',
    'Urgency': 'तात्कालिकता',
    'Preferred Language': 'पसंदीदा भाषा',
    'Consultation Budget': 'परामर्श बजट',
    'Explain Your Case': 'अपना केस समझाएँ',
    'Upload Evidence': 'सबूत अपलोड करें',
    'Citizen Login': 'नागरिक लॉगिन',
    'Citizen ID / Email': 'नागरिक ID / ईमेल',
    'Login & Open Case Form': 'लॉगिन करें और केस फॉर्म खोलें',
    'Switch Citizen': 'नागरिक बदलें',
    'Submitted': 'जमा किए गए',
    'Review window': 'समीक्षा समय',
    'Live Brief': 'लाइव ब्रीफ',
    'Case brief waiting': 'केस ब्रीफ प्रतीक्षा में',
    'Complete the form to preview category, urgency, and location.': 'श्रेणी, तात्कालिकता और स्थान देखने के लिए फॉर्म पूरा करें।',
    'Citizen submitted facts': 'नागरिक ने तथ्य जमा किए',
    'AI triage prepares a summary': 'AI छंटाई सारांश तैयार करती है',
    'Student or lawyer review begins': 'छात्र या वकील समीक्षा शुरू होती है',
    'Enter your citizen ID or email and password to open case submission.': 'केस जमा करने के लिए अपनी नागरिक ID या ईमेल और पासवर्ड दर्ज करें।',
    'I confirm that the details submitted are accurate to the best of my knowledge.': 'मैं पुष्टि करता/करती हूँ कि जमा की गई जानकारी मेरी जानकारी के अनुसार सही है।',
    'Submit Case for Review': 'समीक्षा के लिए केस जमा करें',

    'Learn by doing. Earn while practicing.': 'करते हुए सीखें। अभ्यास करते हुए कमाएँ।',
    'Review real legal queries, build a professional portfolio, and get ranked on India\'s premier legal AI platform.': 'वास्तविक कानूनी प्रश्नों की समीक्षा करें, पेशेवर पोर्टफोलियो बनाएँ और भारत के कानूनी AI प्लेटफॉर्म पर रैंक पाएँ।',
    'Dashboard': 'डैशबोर्ड',
    'Review Queue': 'समीक्षा कतार',
    'Leaderboard': 'लीडरबोर्ड',
    'Cases Reviewed': 'समीक्षित केस',
    'Accuracy Rate': 'सटीकता दर',
    'Total Earned': 'कुल कमाई',
    'National Rank': 'राष्ट्रीय रैंक',
    'Recent Activity': 'हाल की गतिविधि',
    'Performance by Category': 'श्रेणी के अनुसार प्रदर्शन',
    'Pending': 'लंबित',
    'Top law students ranked by review accuracy and volume. Updated daily.': 'समीक्षा सटीकता और मात्रा के आधार पर शीर्ष कानून छात्र। रोज़ अपडेट।',
    'Rank': 'रैंक',
    'Student': 'छात्र',
    'Progress': 'प्रगति',
    'Points': 'अंक',
    'Accuracy': 'सटीकता',
    'Join NyaySetu Students': 'NyaySetu छात्रों से जुड़ें',
    'Create your student account and start reviewing today. Join 840+ law students across India.': 'अपना छात्र खाता बनाएँ और आज से समीक्षा शुरू करें। भारत भर के 840+ कानून छात्रों से जुड़ें।',
    'Law College / University': 'लॉ कॉलेज / विश्वविद्यालय',
    'Year of Study': 'अध्ययन वर्ष',
    'Area of Interest': 'रुचि का क्षेत्र',
    'Create Student Account': 'छात्र खाता बनाएँ',
    'Your career starts here': 'आपका करियर यहाँ शुरू होता है',
    'Real Case Experience': 'वास्तविक केस अनुभव',
    'Earn as You Learn': 'सीखते हुए कमाएँ',
    'Ranked & Recognised': 'रैंक और पहचान',
    'Mentorship from Advocates': 'अधिवक्ताओं से मार्गदर्शन',

    'A verified advocate desk for NyaySetu cases.': 'NyaySetu मामलों के लिए सत्यापित अधिवक्ता डेस्क।',
    'This area is built for advocates who want organized case leads from NyaySetu users. Each lead is shaped from the user\'s chat, document inputs, urgency, location, budget, and consent before it reaches a lawyer.': 'यह क्षेत्र उन अधिवक्ताओं के लिए है जो NyaySetu उपयोगकर्ताओं से व्यवस्थित केस लीड चाहते हैं।',
    'Case Desk': 'केस डेस्क',
    'Lead Inbox': 'लीड इनबॉक्स',
    'Trust & Verification': 'विश्वास और सत्यापन',
    'Matched Leads': 'मैच किए गए लीड',
    'Urgent Reviews': 'तत्काल समीक्षाएँ',
    'Client Rating': 'क्लाइंट रेटिंग',
    'Avg Response': 'औसत प्रतिक्रिया',
    'How NyaySetu routes work to advocates': 'NyaySetu अधिवक्ताओं तक काम कैसे पहुँचाता है',
    'User asks first': 'उपयोगकर्ता पहले पूछता है',
    'Case summary created': 'केस सारांश बनाया गया',
    'Advocate matched': 'अधिवक्ता मिलाया गया',
    'Consultation accepted': 'परामर्श स्वीकार किया गया',
    'Apply for NyaySetu Advocate Network': 'NyaySetu अधिवक्ता नेटवर्क के लिए आवेदन करें',
    'Submit practice details so NyaySetu can show your profile to users seeking professional consultation.': 'अपनी प्रैक्टिस जानकारी जमा करें ताकि NyaySetu आपकी प्रोफ़ाइल पेशेवर परामर्श चाहने वाले उपयोगकर्ताओं को दिखा सके।',
    'Qualification': 'योग्यता',
    'Specialization': 'विशेषज्ञता',
    'Years of Experience': 'अनुभव के वर्ष',
    'Location (City/State)': 'स्थान (शहर/राज्य)',
    'Expected Fees': 'अपेक्षित फीस',
    'Short Bio': 'संक्षिप्त परिचय',
    'Upload Certificate': 'प्रमाणपत्र अपलोड करें',
    'Submit Advocate Profile': 'अधिवक्ता प्रोफ़ाइल जमा करें',

    'About NyaySetu': 'NyaySetu के बारे में',
    'Bridging the gap between the people of India and the law.': 'भारत के लोगों और कानून के बीच की दूरी कम करना।',
    'What is NyaySetu?': 'NyaySetu क्या है?',
    'What it does': 'यह क्या करता है',
    'Who it is for': 'यह किसके लिए है',
    'Our Vision': 'हमारा दृष्टिकोण',
    'Important Disclaimer': 'महत्वपूर्ण अस्वीकरण',
    'NyaySetu is an AI-powered platform designed to make Indian law simple and accessible to everyone. We believe that understanding your legal rights should not depend on how much money you have or who you know.': 'NyaySetu एक AI-संचालित प्लेटफॉर्म है जो भारतीय कानून को सभी के लिए सरल और सुलभ बनाता है।',
    'NyaySetu is a technology platform, not a law firm.': 'NyaySetu एक तकनीकी प्लेटफॉर्म है, कानून फर्म नहीं।'
  }
};

function normalizeFullText(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function translateFullValue(value, lang) {
  if (lang === 'en') return value;
  const dict = fullPageTranslations[lang];
  if (!dict) return null;

  const original = String(value ?? '');
  const leading = original.match(/^\s*/)?.[0] || '';
  const trailing = original.match(/\s*$/)?.[0] || '';
  const normalized = normalizeFullText(original);
  if (!normalized) return null;

  if (dict[normalized]) return leading + dict[normalized] + trailing;

  const stripped = normalizeFullText(normalized.replace(/^[^A-Za-z0-9\u0900-\u097F]+/, ''));
  if (stripped && dict[stripped]) {
    return leading + normalized.replace(stripped, dict[stripped]) + trailing;
  }

  return null;
}

function captureFullPageOriginals(root = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA'].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (parent.closest('#lang-select')) return NodeFilter.FILTER_REJECT;
      return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  while (walker.nextNode()) {
    if (!fullPageTextOriginals.has(walker.currentNode)) {
      fullPageTextOriginals.set(walker.currentNode, walker.currentNode.nodeValue);
    }
  }

  document.querySelectorAll('[placeholder], [title], [aria-label]').forEach(el => {
    if (el.closest('#lang-select')) return;
    if (!fullPageAttrOriginals.has(el)) {
      fullPageAttrOriginals.set(el, {
        placeholder: el.getAttribute('placeholder'),
        title: el.getAttribute('title'),
        ariaLabel: el.getAttribute('aria-label')
      });
    }
  });
}

function applyFullPageTranslation(lang) {
  captureFullPageOriginals();

  fullPageTextOriginals.forEach((original, node) => {
    if (!node.parentElement) return;
    if (lang === 'en') {
      node.nodeValue = original;
      return;
    }
    const translated = translateFullValue(original, lang);
    if (translated) node.nodeValue = translated;
  });

  fullPageAttrOriginals.forEach((attrs, el) => {
    ['placeholder', 'title', 'ariaLabel'].forEach(key => {
      const attrName = key === 'ariaLabel' ? 'aria-label' : key;
      const original = attrs[key];
      if (original === null || original === undefined) return;
      if (lang === 'en') {
        el.setAttribute(attrName, original);
        return;
      }
      const translated = translateFullValue(original, lang);
      if (translated) el.setAttribute(attrName, translated);
    });
  });
}

const i18nBindings = [
  ['.nav-link[data-page="home"]', 'navHome'],
  ['.nav-link[data-page="chat"]', 'navChat'],
  ['.nav-link[data-page="docs"]', 'navDocs'],
  ['.nav-link[data-page="simplifier"]', 'navSimplifier'],
  ['.nav-link[data-page="citizens"]', 'navCitizens'],
  ['.nav-link[data-page="students"]', 'navStudents'],
  ['.nav-link[data-page="lawyers"]', 'navLawyers'],
  ['.nav-link[data-page="about"]', 'navAbout'],
  ['.nav-ask', 'askQuestion'],
  ['.nav-start', 'getStarted'],
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
  ['.cap-card:nth-child(4) .cap-card-title', 'citizenCaseDesk'],
  ['.cap-card:nth-child(5) .cap-card-title', 'studentEcosystem'],
  ['.cap-card:nth-child(6) .cap-card-title', 'lawyerNetwork'],
  ['.cap-card:nth-child(1) .cap-card-link', 'openChat'],
  ['.cap-card:nth-child(2) .cap-card-link', 'generateNow'],
  ['.cap-card:nth-child(3) .cap-card-link', 'trySimplifier'],
  ['.cap-card:nth-child(4) .cap-card-link', 'submitCaseArrow'],
  ['.cap-card:nth-child(5) .cap-card-link', 'joinStudentArrow'],
  ['.cap-card:nth-child(6) .cap-card-link', 'joinLawyerArrow'],
  ['.adv-section .section-label', 'advantage'],
  ['.adv-section .section-h2', 'whyExists'],
  ['.cta-h2', 'ctaTitle'],
  ['.cta-sub', 'ctaSub'],
  ['.cta-actions .btn-hero-primary', 'startFree'],
  ['.cta-actions .cta-citizen', 'submitCase'],
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
  captureFullPageOriginals();
  localStorage.setItem('nyaysetu_lang', safeLang);
  const languageName = safeLang === 'hi' ? 'Hindi' : 'English';
  if (typeof window.setSelectedLanguageName === 'function') {
    window.setSelectedLanguageName(languageName);
  }
  if (typeof window.setUiLanguageCode === 'function') {
    window.setUiLanguageCode(safeLang);
  }
  window.selectedLanguage = languageName;
  if (typeof window.applyLocalUiTranslation === 'function') {
    window.applyLocalUiTranslation(languageName);
  }
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
    heroTitle.textContent = '';

    const firstLine = document.createElement('span');
    firstLine.className = 'home-h1-line';
    firstLine.textContent = dict.heroTitleLine1 || 'Justice';

    const secondLine = document.createElement('span');
    secondLine.className = 'home-h1-line';
    secondLine.textContent = dict.heroTitleLine2 || 'should not depend';

    const thirdLine = document.createElement('span');
    thirdLine.className = 'home-h1-line';
    thirdLine.append(document.createTextNode(dict.heroTitleLine3Prefix || 'on '));

    const emphasis = document.createElement('em');
    emphasis.textContent = dict.heroTitleEm;
    thirdLine.append(emphasis);

    heroTitle.append(firstLine, secondLine, thirdLine);
  }

  const previewTitle = document.querySelector('.docs-preview-title');
  const previewActions = previewTitle?.querySelector('.docs-preview-actions');
  if (previewTitle && previewActions) {
    previewTitle.firstChild.textContent = `${dict.docPreview} `;
    const buttons = previewActions.querySelectorAll('button');
    if (buttons[0]) buttons[0].textContent = dict.copy;
    if (buttons[1]) buttons[1].textContent = dict.downloadPdf;
  }

  applyFullPageTranslation(safeLang);
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
window.refreshNyaysetuLanguage = () => applyLanguage(getLang());
