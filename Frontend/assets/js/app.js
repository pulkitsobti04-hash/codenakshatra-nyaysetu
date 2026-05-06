/* ══════════════════════════════════════
   PAGE ROUTER
══════════════════════════════════════ */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const page = document.getElementById('page-' + name);
  if (page) page.classList.add('active');
  const navBtn = document.querySelector(`.nav-link[data-page="${name}"]`);
  if (navBtn) navBtn.classList.add('active');
  window.scrollTo(0, 0);
}

function handleCardKey(event, pageName) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    showPage(pageName);
  }
}

function openProcessStep(action) {
  if (action === 'student-join') {
    openStudentTab('join');
    return;
  }

  if (action === 'lawyer-join') {
    openLawyerTab('join');
    return;
  }

  showPage('chat');
}

function handleProcessStepKey(event, action) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openProcessStep(action);
  }
}

function handleEvidenceKey(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    document.getElementById('evidence-input')?.click();
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  return copied;
}

/* ══════════════════════════════════════
   LANGUAGE TOGGLE
══════════════════════════════════════ */
var uiLang = 'en';
var selectedLanguage = 'English';
window.setSelectedLanguageName = function(languageName) {
  selectedLanguage = languageName || 'English';
};
window.getSelectedLanguageName = function() {
  return selectedLanguage;
};
window.setUiLanguageCode = function(langCode) {
  uiLang = langCode === 'hi' ? 'hi' : 'en';
};
const LANG = {
  en: {
    chatPh: 'Describe your legal problem...',
    disclaimer: '⚠️ Guidance only. Consult a lawyer for serious matters.',
    welcomeTitle: 'NyaySetu AI',
    welcomeSub: 'Your personal legal assistant. Simple, fast, and reliable.',
    status: 'Online — responds in seconds',
  },
  hi: {
    chatPh: 'अपनी कानूनी समस्या बताएं...',
    disclaimer: '⚠️ केवल मार्गदर्शन। गंभीर मामलों में वकील से सलाह लें।',
    welcomeTitle: 'न्यायसेतु AI',
    welcomeSub: 'आपका व्यक्तिगत कानूनी सहायक। सरल, तेज़ और विश्वसनीय।',
    status: 'ऑनलाइन — कुछ ही सेकंड में जवाब',
  }
};

const SPEECH_LANG_CODES = {
  afrikaans: 'af-ZA', albanian: 'sq-AL', amharic: 'am-ET', arabic: 'ar-SA',
  armenian: 'hy-AM', assamese: 'as-IN', azerbaijani: 'az-AZ', basque: 'eu-ES',
  belarusian: 'be-BY', bengali: 'bn-IN', bosnian: 'bs-BA', bulgarian: 'bg-BG',
  burmese: 'my-MM', catalan: 'ca-ES', cebuano: 'ceb-PH', chichewa: 'ny-MW', chinese: 'zh-CN',
  'chinese (simplified)': 'zh-CN', 'chinese (traditional)': 'zh-TW',
  corsican: 'co-FR', croatian: 'hr-HR', czech: 'cs-CZ', danish: 'da-DK',
  dutch: 'nl-NL', english: 'en-IN', esperanto: 'eo', estonian: 'et-EE',
  filipino: 'fil-PH', finnish: 'fi-FI', french: 'fr-FR', frisian: 'fy-NL',
  galician: 'gl-ES', georgian: 'ka-GE', german: 'de-DE', greek: 'el-GR',
  gujarati: 'gu-IN', haitian: 'ht-HT', 'haitian creole': 'ht-HT', hausa: 'ha-NG',
  hawaiian: 'haw-US', hebrew: 'he-IL', hindi: 'hi-IN', hmong: 'hmn',
  hungarian: 'hu-HU', icelandic: 'is-IS', igbo: 'ig-NG', indonesian: 'id-ID',
  irish: 'ga-IE', italian: 'it-IT', japanese: 'ja-JP', javanese: 'jv-ID',
  kannada: 'kn-IN', kashmiri: 'ks-IN', kazakh: 'kk-KZ', khmer: 'km-KH',
  kinyarwanda: 'rw-RW', konkani: 'kok-IN', korean: 'ko-KR', kurdish: 'ku-TR',
  kyrgyz: 'ky-KG', lao: 'lo-LA', latin: 'la', latvian: 'lv-LV',
  lithuanian: 'lt-LT', luxembourgish: 'lb-LU', macedonian: 'mk-MK',
  maithili: 'mai-IN', malagasy: 'mg-MG', malay: 'ms-MY', malayalam: 'ml-IN',
  maltese: 'mt-MT', manipuri: 'mni-IN', maori: 'mi-NZ', marathi: 'mr-IN',
  mongolian: 'mn-MN', myanmar: 'my-MM', nepali: 'ne-NP', norwegian: 'no-NO',
  odia: 'or-IN', pashto: 'ps-AF', persian: 'fa-IR', polish: 'pl-PL',
  portuguese: 'pt-PT', punjabi: 'pa-IN', romanian: 'ro-RO', russian: 'ru-RU',
  samoan: 'sm-WS', sanskrit: 'sa-IN', santhali: 'sat-IN', 'scots gaelic': 'gd-GB',
  serbian: 'sr-RS', sesotho: 'st-ZA', shona: 'sn-ZW', sindhi: 'sd-IN',
  sinhala: 'si-LK', slovak: 'sk-SK', slovenian: 'sl-SI', somali: 'so-SO',
  spanish: 'es-ES', sundanese: 'su-ID', swahili: 'sw-KE', swedish: 'sv-SE',
  tajik: 'tg-TJ', tamil: 'ta-IN', tatar: 'tt-RU', telugu: 'te-IN',
  thai: 'th-TH', turkish: 'tr-TR', turkmen: 'tk-TM', ukrainian: 'uk-UA',
  urdu: 'ur-IN', uyghur: 'ug-CN', uzbek: 'uz-UZ', vietnamese: 'vi-VN',
  welsh: 'cy-GB', xhosa: 'xh-ZA', yiddish: 'yi', yoruba: 'yo-NG', zulu: 'zu-ZA',
  bodo: 'brx-IN', dogri: 'doi-IN'
};

const UI_TRANSLATIONS = {
  Hindi: {
    'Home': 'होम',
    'AI Chat': 'AI चैट',
    'Documents': 'दस्तावेज़',
    'Simplifier': 'सरलीकरण',
    'Students': 'छात्र',
    '⚖ Lawyers': '⚖ वकील',
    'About': 'परिचय',
    'ℹ️ About Us': 'ℹ️ हमारे बारे में',
    'Emergency': 'आपातकाल',
    'Start for Free →': 'मुफ्त शुरू करें →',
    'How It Works': 'यह कैसे काम करता है',
    'AI-Powered': 'AI-संचालित',
    'Legal Access': 'कानूनी पहुंच',
    'India': 'भारत',
    'Justice should not depend on': 'न्याय इस पर निर्भर नहीं होना चाहिए कि',
    'who you know.': 'आप किसे जानते हैं।',
    'NyaySetu bridges the gap between people and the law. Ask legal questions in plain language — English, Hindi, or any language — powered by AI.': 'NyaySetu लोगों और कानून के बीच की दूरी कम करता है। सरल भाषा में कानूनी सवाल पूछें — English, Hindi या किसी भी भाषा में — AI द्वारा संचालित।',
    'No signup required': 'साइनअप की आवश्यकता नहीं',
    'Hindi, Urdu & more languages': 'हिंदी, उर्दू और अधिक भाषाएँ',
    '12,400+ queries resolved': '12,400+ प्रश्न हल किए गए',
    'Legal queries resolved': 'कानूनी प्रश्न हल',
    'Law students onboarded': 'कानून छात्र जुड़े',
    'Documents generated': 'दस्तावेज़ बनाए गए',
    'User satisfaction': 'उपयोगकर्ता संतुष्टि',
    'Process': 'प्रक्रिया',
    'A system built for clarity': 'स्पष्टता के लिए बना सिस्टम',
    'Every query passes through AI analysis and human review — fast and reliable.': 'हर प्रश्न AI विश्लेषण और मानवीय समीक्षा से गुजरता है — तेज़ और भरोसेमंद।',
    'You Ask': 'आप पूछते हैं',
    'AI Analyses': 'AI विश्लेषण करता है',
    'Student Reviews': 'छात्र समीक्षा करते हैं',
    'Lawyer Escalates': 'वकील आगे बढ़ाते हैं',
    'Citizen': 'नागरिक',
    'Law Student': 'कानून छात्र',
    'Advocate': 'अधिवक्ता',
    'Capabilities': 'क्षमताएँ',
    'Every legal need, covered': 'हर कानूनी ज़रूरत का समाधान',
    'AI Legal Assistant': 'AI कानूनी सहायक',
    'Document Generator': 'दस्तावेज़ जनरेटर',
    'Law Simplifier': 'कानून सरलीकरण',
    'Student Ecosystem': 'छात्र इकोसिस्टम',
    'Open Chat →': 'चैट खोलें →',
    'Generate Now →': 'अभी बनाएं →',
    'Try Simplifier →': 'सरलीकरण आज़माएँ →',
    'Join as Student →': 'छात्र के रूप में जुड़ें →',
    'Advantage': 'लाभ',
    'Why NyaySetu exists': 'NyaySetu क्यों है',
    'Your rights matter. Know them.': 'आपके अधिकार मायने रखते हैं। उन्हें जानें।',
    'Ask your first legal question for free. No signup required to begin.': 'अपना पहला कानूनी सवाल मुफ्त पूछें। शुरू करने के लिए साइनअप जरूरी नहीं।',
    'Join as Student': 'छात्र के रूप में जुड़ें',
    'About Us': 'हमारे बारे में',
    'Privacy Policy': 'गोपनीयता नीति',
    'Terms of Use': 'उपयोग की शर्तें',
    'Legal Disclaimer': 'कानूनी अस्वीकरण',
    'Topics': 'विषय',
    'Common Questions': 'सामान्य प्रश्न',
    'Criminal Law': 'आपराधिक कानून',
    'Family & Property': 'परिवार और संपत्ति',
    'New Chat': 'नई चैट',
    'Find Lawyers': 'वकील खोजें',
    'Connect with a Lawyer': 'वकील से जुड़ें',
    'Document Preview': 'दस्तावेज़ पूर्वावलोकन',
    'Copy': 'कॉपी',
    'Download PDF': 'PDF डाउनलोड करें',
    'Law Simplifier': 'कानून सरलीकरण',
    'Understand any legal text instantly': 'किसी भी कानूनी पाठ को तुरंत समझें',
    'Recent Activity': 'हाल की गतिविधि',
    'Performance by Category': 'श्रेणी के अनुसार प्रदर्शन',
    'Join NyaySetu Students': 'NyaySetu छात्रों से जुड़ें'
  },
  Urdu: {
    'Home': 'ہوم',
    'AI Chat': 'AI چیٹ',
    'Documents': 'دستاویزات',
    'Simplifier': 'آسان کنندہ',
    'Students': 'طلبہ',
    'About': 'تعارف',
    'Emergency': 'ایمرجنسی',
    'Start for Free →': 'مفت شروع کریں →',
    'How It Works': 'یہ کیسے کام کرتا ہے',
    'Justice should not depend on': 'انصاف اس پر منحصر نہیں ہونا چاہیے کہ',
    'who you know.': 'آپ کس کو جانتے ہیں۔',
    'Process': 'عمل',
    'A system built for clarity': 'وضاحت کے لیے بنایا گیا نظام',
    'Every legal need, covered': 'ہر قانونی ضرورت کا احاطہ',
    'AI Legal Assistant': 'AI قانونی معاون',
    'Document Generator': 'دستاویز بنانے والا',
    'Law Simplifier': 'قانون آسان کرنے والا',
    'Why NyaySetu exists': 'NyaySetu کیوں موجود ہے',
    'Your rights matter. Know them.': 'آپ کے حقوق اہم ہیں۔ انہیں جانیں۔',
    'Topics': 'موضوعات',
    'Common Questions': 'عام سوالات',
    'New Chat': 'نئی چیٹ',
    'Find Lawyers': 'وکیل تلاش کریں',
    'Connect with a Lawyer': 'وکیل سے رابطہ کریں'
  },
  Bengali: {
    'Home': 'হোম',
    'AI Chat': 'AI চ্যাট',
    'Documents': 'নথি',
    'Simplifier': 'সরলীকরণ',
    'Students': 'শিক্ষার্থী',
    'About': 'সম্পর্কে',
    'Emergency': 'জরুরি',
    'Start for Free →': 'বিনামূল্যে শুরু করুন →',
    'How It Works': 'কিভাবে কাজ করে',
    'Justice should not depend on': 'ন্যায়বিচার নির্ভর করা উচিত নয়',
    'who you know.': 'আপনি কাকে চেনেন তার উপর।',
    'Process': 'প্রক্রিয়া',
    'A system built for clarity': 'স্পষ্টতার জন্য তৈরি একটি ব্যবস্থা',
    'Every legal need, covered': 'প্রতিটি আইনি প্রয়োজনের সমাধান',
    'AI Legal Assistant': 'AI আইনি সহায়ক',
    'Document Generator': 'নথি জেনারেটর',
    'Law Simplifier': 'আইন সরলীকরণ',
    'Why NyaySetu exists': 'NyaySetu কেন আছে',
    'Your rights matter. Know them.': 'আপনার অধিকার গুরুত্বপূর্ণ। জানুন।',
    'Topics': 'বিষয়',
    'Common Questions': 'সাধারণ প্রশ্ন',
    'New Chat': 'নতুন চ্যাট',
    'Find Lawyers': 'আইনজীবী খুঁজুন',
    'Connect with a Lawyer': 'আইনজীবীর সাথে যুক্ত হন'
  },
  Tamil: {
    'Home': 'முகப்பு',
    'AI Chat': 'AI அரட்டை',
    'Documents': 'ஆவணங்கள்',
    'Simplifier': 'எளிமைப்படுத்தி',
    'Students': 'மாணவர்கள்',
    'About': 'பற்றி',
    'Emergency': 'அவசரம்',
    'Start for Free →': 'இலவசமாக தொடங்குங்கள் →',
    'How It Works': 'இது எப்படி செயல்படுகிறது',
    'Justice should not depend on': 'நீதி இதைப் பொறுத்திருக்கக் கூடாது',
    'who you know.': 'நீங்கள் யாரை அறிவீர்கள் என்பதையே.',
    'Process': 'செயல்முறை',
    'A system built for clarity': 'தெளிவுக்காக உருவாக்கப்பட்ட அமைப்பு',
    'Every legal need, covered': 'ஒவ்வொரு சட்டத் தேவைக்கும் தீர்வு',
    'AI Legal Assistant': 'AI சட்ட உதவியாளர்',
    'Document Generator': 'ஆவண உருவாக்கி',
    'Law Simplifier': 'சட்ட எளிமைப்படுத்தி',
    'Why NyaySetu exists': 'NyaySetu ஏன் உள்ளது',
    'Your rights matter. Know them.': 'உங்கள் உரிமைகள் முக்கியம். அவற்றை அறியுங்கள்.',
    'Topics': 'தலைப்புகள்',
    'Common Questions': 'பொதுவான கேள்விகள்',
    'New Chat': 'புதிய அரட்டை',
    'Find Lawyers': 'வழக்கறிஞர்களைக் கண்டறி',
    'Connect with a Lawyer': 'வழக்கறிஞருடன் இணைக'
  },
  Telugu: {
    'Home': 'హోమ్',
    'AI Chat': 'AI చాట్',
    'Documents': 'పత్రాలు',
    'Simplifier': 'సరళీకరణ',
    'Students': 'విద్యార్థులు',
    'About': 'గురించి',
    'Emergency': 'అత్యవసరం',
    'Start for Free →': 'ఉచితంగా ప్రారంభించండి →',
    'How It Works': 'ఇది ఎలా పనిచేస్తుంది',
    'Justice should not depend on': 'న్యాయం దీనిపై ఆధారపడకూడదు',
    'who you know.': 'మీకు ఎవరు తెలుసు అన్నదానిపై.',
    'Process': 'ప్రక్రియ',
    'A system built for clarity': 'స్పష్టత కోసం నిర్మించిన వ్యవస్థ',
    'Every legal need, covered': 'ప్రతి చట్టపరమైన అవసరానికి పరిష్కారం',
    'AI Legal Assistant': 'AI న్యాయ సహాయకుడు',
    'Document Generator': 'పత్రాల జనరేటర్',
    'Law Simplifier': 'చట్ట సరళీకరణ',
    'Why NyaySetu exists': 'NyaySetu ఎందుకు ఉంది',
    'Your rights matter. Know them.': 'మీ హక్కులు ముఖ్యం. వాటిని తెలుసుకోండి.',
    'Topics': 'విషయాలు',
    'Common Questions': 'సాధారణ ప్రశ్నలు',
    'New Chat': 'కొత్త చాట్',
    'Find Lawyers': 'న్యాయవాదులను కనుగొనండి',
    'Connect with a Lawyer': 'న్యాయవాదితో కలవండి'
  },
  Marathi: {
    'Home': 'मुख्यपृष्ठ',
    'AI Chat': 'AI चॅट',
    'Documents': 'दस्तऐवज',
    'Simplifier': 'सुलभीकरण',
    'Students': 'विद्यार्थी',
    'About': 'माहिती',
    'Emergency': 'आपत्कालीन',
    'Start for Free →': 'मोफत सुरू करा →',
    'How It Works': 'हे कसे काम करते',
    'Justice should not depend on': 'न्याय यावर अवलंबून नसावा',
    'who you know.': 'तुम्ही कोणाला ओळखता.',
    'Process': 'प्रक्रिया',
    'A system built for clarity': 'स्पष्टतेसाठी बनवलेली प्रणाली',
    'Every legal need, covered': 'प्रत्येक कायदेशीर गरजेचे समाधान',
    'AI Legal Assistant': 'AI कायदेशीर सहाय्यक',
    'Document Generator': 'दस्तऐवज जनरेटर',
    'Law Simplifier': 'कायदा सुलभीकरण',
    'Why NyaySetu exists': 'NyaySetu का आहे',
    'Your rights matter. Know them.': 'तुमचे हक्क महत्त्वाचे आहेत. ते जाणून घ्या.',
    'Topics': 'विषय',
    'Common Questions': 'सामान्य प्रश्न',
    'New Chat': 'नवीन चॅट',
    'Find Lawyers': 'वकील शोधा',
    'Connect with a Lawyer': 'वकिलाशी जोडा'
  },
  Gujarati: {
    'Home': 'હોમ',
    'AI Chat': 'AI ચેટ',
    'Documents': 'દસ્તાવેજો',
    'Simplifier': 'સરળીકરણ',
    'Students': 'વિદ્યાર્થીઓ',
    'About': 'વિશે',
    'Emergency': 'ઇમરજન્સી',
    'Start for Free →': 'મફતમાં શરૂ કરો →',
    'How It Works': 'તે કેવી રીતે કામ કરે છે',
    'Justice should not depend on': 'ન્યાય તેના પર આધારિત ન હોવો જોઈએ',
    'who you know.': 'તમે કોને ઓળખો છો.',
    'Process': 'પ્રક્રિયા',
    'A system built for clarity': 'સ્પષ્ટતા માટે બનાવેલી સિસ્ટમ',
    'Every legal need, covered': 'દરેક કાનૂની જરૂરિયાતનું સમાધાન',
    'AI Legal Assistant': 'AI કાનૂની સહાયક',
    'Document Generator': 'દસ્તાવેજ જનરેટર',
    'Law Simplifier': 'કાયદા સરળીકરણ',
    'Why NyaySetu exists': 'NyaySetu શા માટે છે',
    'Your rights matter. Know them.': 'તમારા અધિકારો મહત્વપૂર્ણ છે. તેમને જાણો.',
    'Topics': 'વિષયો',
    'Common Questions': 'સામાન્ય પ્રશ્નો',
    'New Chat': 'નવી ચેટ',
    'Find Lawyers': 'વકીલો શોધો',
    'Connect with a Lawyer': 'વકીલ સાથે જોડાઓ'
  },
  Kannada: {
    'Home': 'ಮುಖಪುಟ',
    'AI Chat': 'AI ಚಾಟ್',
    'Documents': 'ದಾಖಲೆಗಳು',
    'Simplifier': 'ಸರಳೀಕರಣ',
    'Students': 'ವಿದ್ಯಾರ್ಥಿಗಳು',
    'About': 'ಬಗ್ಗೆ',
    'Emergency': 'ತುರ್ತು',
    'Start for Free →': 'ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ →',
    'How It Works': 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
    'Justice should not depend on': 'ನ್ಯಾಯ ಇದಕ್ಕೆ ಅವಲಂಬಿತವಾಗಿರಬಾರದು',
    'who you know.': 'ನೀವು ಯಾರನ್ನು ತಿಳಿದಿದ್ದೀರಿ ಎಂಬುದಕ್ಕೆ.',
    'Process': 'ಪ್ರಕ್ರಿಯೆ',
    'A system built for clarity': 'ಸ್ಪಷ್ಟತೆಗೆ ನಿರ್ಮಿಸಿದ ವ್ಯವಸ್ಥೆ',
    'Every legal need, covered': 'ಪ್ರತಿ ಕಾನೂನು ಅಗತ್ಯಕ್ಕೆ ಪರಿಹಾರ',
    'AI Legal Assistant': 'AI ಕಾನೂನು ಸಹಾಯಕ',
    'Document Generator': 'ದಾಖಲೆ ರಚಕ',
    'Law Simplifier': 'ಕಾನೂನು ಸರಳೀಕರಣ',
    'Why NyaySetu exists': 'NyaySetu ಏಕೆ ಇದೆ',
    'Your rights matter. Know them.': 'ನಿಮ್ಮ ಹಕ್ಕುಗಳು ಮುಖ್ಯ. ಅವನ್ನು ತಿಳಿಯಿರಿ.',
    'Topics': 'ವಿಷಯಗಳು',
    'Common Questions': 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು',
    'New Chat': 'ಹೊಸ ಚಾಟ್',
    'Find Lawyers': 'ವಕೀಲರನ್ನು ಹುಡುಕಿ',
    'Connect with a Lawyer': 'ವಕೀಲರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ'
  },
  Malayalam: {
    'Home': 'ഹോം',
    'AI Chat': 'AI ചാറ്റ്',
    'Documents': 'രേഖകൾ',
    'Simplifier': 'ലളിതീകരണം',
    'Students': 'വിദ്യാർത്ഥികൾ',
    'About': 'കുറിച്ച്',
    'Emergency': 'അടിയന്തരം',
    'Start for Free →': 'സൗജന്യമായി തുടങ്ങുക →',
    'How It Works': 'ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു',
    'Justice should not depend on': 'നീതി ഇതിനെ ആശ്രയിക്കരുത്',
    'who you know.': 'നിങ്ങൾ ആരെ അറിയുന്നു എന്നതിനെ.',
    'Process': 'പ്രക്രിയ',
    'A system built for clarity': 'വ്യക്തതയ്ക്കായി നിർമ്മിച്ച സംവിധാനം',
    'Every legal need, covered': 'എല്ലാ നിയമ ആവശ്യത്തിനും പരിഹാരം',
    'AI Legal Assistant': 'AI നിയമ സഹായി',
    'Document Generator': 'രേഖ ജനറേറ്റർ',
    'Law Simplifier': 'നിയമ ലളിതീകരണം',
    'Why NyaySetu exists': 'NyaySetu എന്തിനാണ്',
    'Your rights matter. Know them.': 'നിങ്ങളുടെ അവകാശങ്ങൾ പ്രധാനമാണ്. അവ അറിയുക.',
    'Topics': 'വിഷയങ്ങൾ',
    'Common Questions': 'സാധാരണ ചോദ്യങ്ങൾ',
    'New Chat': 'പുതിയ ചാറ്റ്',
    'Find Lawyers': 'അഭിഭാഷകരെ കണ്ടെത്തുക',
    'Connect with a Lawyer': 'അഭിഭാഷകനുമായി ബന്ധപ്പെടുക'
  },
  Punjabi: {
    'Home': 'ਹੋਮ',
    'AI Chat': 'AI ਚੈਟ',
    'Documents': 'ਦਸਤਾਵੇਜ਼',
    'Simplifier': 'ਸਰਲੀਕਰਨ',
    'Students': 'ਵਿਦਿਆਰਥੀ',
    'About': 'ਬਾਰੇ',
    'Emergency': 'ਐਮਰਜੈਂਸੀ',
    'Start for Free →': 'ਮੁਫ਼ਤ ਸ਼ੁਰੂ ਕਰੋ →',
    'How It Works': 'ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ',
    'Justice should not depend on': 'ਨਿਆਂ ਇਸ ਤੇ ਨਿਰਭਰ ਨਹੀਂ ਹੋਣਾ ਚਾਹੀਦਾ',
    'who you know.': 'ਤੁਸੀਂ ਕਿਸ ਨੂੰ ਜਾਣਦੇ ਹੋ।',
    'Process': 'ਪ੍ਰਕਿਰਿਆ',
    'A system built for clarity': 'ਸਪਸ਼ਟਤਾ ਲਈ ਬਣਾਇਆ ਸਿਸਟਮ',
    'Every legal need, covered': 'ਹਰ ਕਾਨੂੰਨੀ ਲੋੜ ਦਾ ਹੱਲ',
    'AI Legal Assistant': 'AI ਕਾਨੂੰਨੀ ਸਹਾਇਕ',
    'Document Generator': 'ਦਸਤਾਵੇਜ਼ ਜਨਰੇਟਰ',
    'Law Simplifier': 'ਕਾਨੂੰਨ ਸਰਲੀਕਰਨ',
    'Why NyaySetu exists': 'NyaySetu ਕਿਉਂ ਹੈ',
    'Your rights matter. Know them.': 'ਤੁਹਾਡੇ ਅਧਿਕਾਰ ਮਹੱਤਵਪੂਰਨ ਹਨ। ਉਹਨਾਂ ਨੂੰ ਜਾਣੋ।',
    'Topics': 'ਵਿਸ਼ੇ',
    'Common Questions': 'ਆਮ ਸਵਾਲ',
    'New Chat': 'ਨਵੀਂ ਚੈਟ',
    'Find Lawyers': 'ਵਕੀਲ ਲੱਭੋ',
    'Connect with a Lawyer': 'ਵਕੀਲ ਨਾਲ ਜੁੜੋ'
  }
};

function normalizeLanguage(value) {
  return (value || 'English').trim();
}
function isEnglishLanguage(value) {
  return /^english$/i.test(normalizeLanguage(value));
}
function isHindiLanguage(value) {
  return /^(hindi|हिन्दी|हिंदी)$/i.test(normalizeLanguage(value));
}
function activeLangCopy() {
  if (isHindiLanguage(selectedLanguage)) return LANG.hi;
  if (isEnglishLanguage(selectedLanguage)) return LANG.en;
  return {
    ...LANG.en,
    chatPh: `Describe your legal problem in ${selectedLanguage}...`,
    welcomeSub: `Ask in ${selectedLanguage}. NyaySetu will keep the answer simple, practical, and reliable.`,
    status: `Online — responds in ${selectedLanguage}`,
  };
}
function getSpeechRecognitionLang(value) {
  return SPEECH_LANG_CODES[normalizeLanguage(value).toLowerCase()] || 'en-IN';
}
const originalTextNodes = new WeakMap();
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}
function tr(dict, key) {
  return dict?.[key] || key;
}
function setSelText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}
function setAllText(selector, values) {
  document.querySelectorAll(selector).forEach((el, index) => {
    if (values[index]) el.textContent = values[index];
  });
}
function setPreviewTitle(value) {
  const title = document.querySelector('.docs-preview-title');
  const actions = title?.querySelector('.docs-preview-actions');
  if (!title) return;
  Array.from(title.childNodes).forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) node.nodeValue = '';
  });
  title.insertBefore(document.createTextNode(value), actions || null);
}
function applyKnownUiTranslation(dict) {
  setAllText('.nav-link', ['Home', 'AI Chat', 'Docs', 'Simplify', 'Citizens', 'Students', '⚖ Lawyers', 'ℹ️ About Us'].map(k => tr(dict, k)));
  setSelText('.nav-ask', tr(dict, 'Ask a Question'));
  setSelText('.nav-start', tr(dict, 'Get Started'));
  setAllText('.hero-ask', Array.from(document.querySelectorAll('.hero-ask')).map(() => tr(dict, 'Ask a Question')));
  setAllText('.hero-start', Array.from(document.querySelectorAll('.hero-start')).map(() => tr(dict, 'Get Started')));
  setSelText('.home-eyebrow', `${tr(dict, 'AI-Powered')} · ${tr(dict, 'Legal Access')} · ${tr(dict, 'India')}`);
  const h1 = document.querySelector('.home-h1');
  if (h1) {
    h1.textContent = '';
    const firstLine = document.createElement('span');
    firstLine.className = 'home-h1-line';
    firstLine.textContent = 'Justice';
    const secondLine = document.createElement('span');
    secondLine.className = 'home-h1-line';
    secondLine.textContent = 'should not depend';
    const thirdLine = document.createElement('span');
    thirdLine.className = 'home-h1-line';
    thirdLine.append(document.createTextNode('on '));
    const em = document.createElement('em');
    em.textContent = tr(dict, 'who you know.');
    thirdLine.append(em);
    h1.append(firstLine, secondLine, thirdLine);
  }
  setSelText('.home-sub', tr(dict, 'NyaySetu bridges the gap between people and the law. Ask legal questions in plain language — English, Hindi, or any language — powered by AI.'));
  setAllText('.home-trust span', [
    `🔒 ${tr(dict, 'No signup required')}`,
    tr(dict, 'Hindi, Urdu & more languages'),
    tr(dict, '12,400+ queries resolved'),
    tr(dict, 'No credit card required'),
    tr(dict, 'Hindi & English'),
    tr(dict, '12,400+ queries resolved')
  ]);
  setAllText('.stat-label', ['Legal queries resolved', 'Law students onboarded', 'Documents generated', 'User satisfaction'].map(k => tr(dict, k)));
  setAllText('.section-label', ['Process', 'Capabilities', 'Advantage', 'Get Started', 'Document Generator', 'Law Simplifier', 'Student Ecosystem', 'Lawyer Network'].map(k => tr(dict, k)));
  setAllText('.section-label', ['Process', 'Capabilities', 'Advantage', 'Get Started', 'Document Generator', 'Law Simplifier', 'Citizen Case Desk', 'Student Ecosystem', 'Lawyer Network'].map(k => tr(dict, k)));
  setAllText('.section-h2', ['A system built for clarity', 'Every legal need, covered', 'Why NyaySetu exists'].map(k => tr(dict, k)));
  const sectionSubs = document.querySelectorAll('.section-sub');
  if (sectionSubs[0]) sectionSubs[0].textContent = tr(dict, 'Every query passes through AI analysis and human review — fast and reliable.');
  if (sectionSubs[1]) sectionSubs[1].textContent = tr(dict, 'Traditional legal help is slow, expensive, and inaccessible. We built NyaySetu to change all three.');
  setAllText('#how .step-title', ['You Ask', 'AI Analyses', 'Student Reviews', 'Lawyer Escalates'].map(k => tr(dict, k)));
  setAllText('#how .step-role', ['Citizen', 'NyaySetu AI', 'Law Student', 'Advocate'].map(k => tr(dict, k)));
  setAllText('.cap-card-title', ['AI Legal Assistant', 'Document Generator', 'Law Simplifier', 'Student Ecosystem'].map(k => tr(dict, k)));
  setAllText('.cap-card-link', ['Open Chat →', 'Generate Now →', 'Try Simplifier →', 'Join as Student →'].map(k => tr(dict, k)));
  setAllText('.cap-card-title', ['AI Legal Assistant', 'Document Generator', 'Law Simplifier', 'Citizen Case Desk', 'Student Ecosystem', 'Lawyer Network'].map(k => tr(dict, k)));
  setAllText('.cap-card-link', ['Open Chat \u2192', 'Generate Now \u2192', 'Try Simplifier \u2192', 'Submit a Case \u2192', 'Join as Student \u2192', 'Join as Lawyer \u2192'].map(k => tr(dict, k)));
  setSelText('.cta-h2', tr(dict, 'Your rights matter. Know them.'));
  setSelText('.cta-sub', tr(dict, 'Ask your first legal question for free. No signup required to begin.'));
  setSelText('.cta-start-free', tr(dict, 'Start for Free â†’'));
  setSelText('.cta-start-free', 'Start for Free \u2192');
  setSelText('.cta-citizen', tr(dict, 'Submit a Case'));
  setSelText('.cta-student', tr(dict, 'Join as Student'));
  setSelText('.cta-lawyer', tr(dict, 'Join as Lawyer'));
  setAllText('.cta-trust span', [
    tr(dict, 'No signup required'),
    tr(dict, 'Hindi, Urdu & more languages'),
    tr(dict, '12,400+ queries resolved')
  ]);
  setAllText('.footer-link', Array.from(document.querySelectorAll('.footer-link')).map(el => tr(dict, el.textContent.trim())));
  setSelText('.sidebar-header-title', tr(dict, 'Topics'));
  setAllText('.sidebar-section-title', ['Common Questions', 'Criminal Law', 'Family & Property'].map(k => tr(dict, k)));
  setAllText('.chat-action-btn', Array.from(document.querySelectorAll('.chat-action-btn')).map(el => tr(dict, el.textContent.replace(/^[^A-Za-z0-9]+/, '').trim())));
  setSelText('.lm-head-title', tr(dict, 'Connect with a Lawyer'));
  setPreviewTitle(tr(dict, 'Document Preview'));
  setAllText('.docs-preview-actions button', ['Copy', 'Download PDF'].map(k => tr(dict, k)));
  setSelText('.simp-h1', tr(dict, 'Understand any legal text instantly'));
  setSelText('#stud-join .join-form-title', tr(dict, 'Join NyaySetu Students'));
}
function translatePhrase(original, dict) {
  const trimmed = original.trim();
  if (!trimmed) return original;
  const leadingMatch = original.match(/^\s*/);
  const trailingMatch = original.match(/\s*$/);
  const leading = leadingMatch ? leadingMatch[0] : '';
  const trailing = trailingMatch ? trailingMatch[0] : '';
  const direct = dict[trimmed];
  if (direct) return leading + direct + trailing;

  const withoutLeadingIcon = trimmed.replace(/^[^A-Za-z0-9\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F]+/, '').trim();
  if (withoutLeadingIcon && dict[withoutLeadingIcon]) {
    return leading + trimmed.replace(withoutLeadingIcon, dict[withoutLeadingIcon]) + trailing;
  }
  return original;
}
function translateStaticText(root, dict) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'OPTION'].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
    const original = originalTextNodes.get(node);
    node.nodeValue = dict ? translatePhrase(original, dict) : original;
  });
}
function applyLocalUiTranslation(language) {
  const dict = UI_TRANSLATIONS[normalizeLanguage(language)];
  translateStaticText(document.body, dict || null);
  applyKnownUiTranslation(dict || null);
  if (language && !isEnglishLanguage(language) && !dict) {
    console.info(`No local UI dictionary found for ${language}. AI responses will still use the selected language.`);
  }
  return Boolean(dict);
}
function setLang(keepPlaceholder = false) {
  const input = document.getElementById('lang-select');
  const rawValue = input ? input.value.trim() : '';
  const value = normalizeLanguage(rawValue);
  selectedLanguage = value;
  uiLang = isHindiLanguage(value) ? 'hi' : 'en';
  const rtl = /^(arabic|hebrew|persian|urdu|pashto|yiddish)$/i.test(value);
  document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  document.documentElement.lang = getSpeechRecognitionLang(value).split('-')[0];
  const l = activeLangCopy();
  const chatInput = document.getElementById('chat-input');
  if (chatInput) chatInput.placeholder = l.chatPh;
  setText('chat-disclaimer', l.disclaimer);
  setText('welcome-title', l.welcomeTitle);
  setText('welcome-sub', l.welcomeSub);
  setText('chat-status', l.status);
  setText('lang-note', `Selected language: ${selectedLanguage}. Chat, simplifier, and document AI responses will use this language.`);
  if (input && (!keepPlaceholder || rawValue)) input.value = selectedLanguage;
  if (rawValue) {
    const uiChanged = applyLocalUiTranslation(selectedLanguage);
    if (!uiChanged && !isEnglishLanguage(selectedLanguage)) {
      setText('lang-note', `${selectedLanguage} is selected for AI responses. Local website labels are available for Hindi, Urdu, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, and Punjabi.`);
    }
  }
}

/* ══════════════════════════════════════
   EMERGENCY PANEL
══════════════════════════════════════ */
const HELPLINES = [
  { name: 'Police Emergency', num: '100' },
  { name: 'Women Helpline', num: '1091' },
  { name: 'Cyber Crime', num: '1930' },
  { name: 'Consumer Helpline', num: '1800-11-4000' },
  { name: 'Legal Aid', num: '15100' },
  { name: 'Child Helpline', num: '1098' },
  { name: 'Senior Citizen', num: '14567' },
  { name: 'Anti-Corruption', num: '1064' },
];
let emergencyOpen = false;
function toggleEmergency() {
  emergencyOpen = !emergencyOpen;
  const panel = document.getElementById('emergency-panel');
  if (emergencyOpen) {
    panel.style.display = 'block';
    if (!panel.dataset.built) {
      document.getElementById('helplines-grid').innerHTML = HELPLINES.map(h =>
        `<div class="helpline-item">
          <div><div class="helpline-name">${h.name}</div></div>
          <a href="tel:${h.num}" class="helpline-num">${h.num}</a>
        </div>`
      ).join('');
      panel.dataset.built = '1';
    }
    document.body.classList.add('emergency-open');
    document.documentElement.style.setProperty('--emergency-panel-height', `${panel.offsetHeight}px`);
    panel.setAttribute('aria-hidden', 'false');
  } else {
    panel.style.display = 'none';
    document.body.classList.remove('emergency-open');
    document.documentElement.style.setProperty('--emergency-panel-height', '0px');
    panel.setAttribute('aria-hidden', 'true');
  }
}

window.addEventListener('resize', () => {
  const panel = document.getElementById('emergency-panel');
  if (emergencyOpen && panel) {
    document.documentElement.style.setProperty('--emergency-panel-height', `${panel.offsetHeight}px`);
  }
});

/* Theme toggle: night mode is the default project identity; brightness mode is optional. */
function applyTheme(mode) {
  const safeMode = mode === 'bright' ? 'bright' : 'night';
  document.body.classList.toggle('theme-bright', safeMode === 'bright');
  localStorage.setItem('nyaysetu_theme', safeMode);
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    const nextLabel = safeMode === 'bright' ? 'Switch to night mode' : 'Switch to brightness mode';
    btn.textContent = safeMode === 'bright' ? '🌙' : '☀';
    btn.title = nextLabel;
    btn.setAttribute('aria-label', nextLabel);
  }
}

function toggleTheme() {
  const next = document.body.classList.contains('theme-bright') ? 'night' : 'bright';
  applyTheme(next);
}

/* ══════════════════════════════════════
   PHASE 1 - MVP: CHAT ENGINE
   Fully implemented for demo/judging with local AI-style responses.
   Future backend AI integration is documented in PHASE 3 comments below.
══════════════════════════════════════ */
let chatHistory = [];
let isLoading = false;
let caseSummary = null;
let detectedDeadline = null;
let evidenceFiles = [];
let reminderSet = false;

const LEGAL_SYSTEM_PROMPT = `You are NyaySetu, an AI legal assistant specialising in Indian law. You help ordinary Indian citizens understand their legal rights and options clearly.

For every query, structure your response with exactly these sections:

**🔍 Simple Explanation**
(Explain in plain, non-legal language what the situation means — as if explaining to a friend)

**📜 Applicable Law**
(List the specific IPC sections, Acts, or laws that apply — keep brief)

**📋 Step-by-Step Actions**
(Numbered list: 3–5 clear action steps they should take immediately)

**⚡ Your Options**
(2–3 different approaches: from simplest to most formal legal action)

**⏱️ Time Limit**
(Any legal deadlines they must be aware of — state "X days" clearly if applicable, or "No strict deadline" if not)

**⚠️ Important Note**
(Brief disclaimer + when they must see a real lawyer)

Always be empathetic, clear, and avoid jargon. Always respond in the language selected by the user. Keep it practical and actionable.`;

const CASE_LIBRARY = {
  Cybercrime: {
    keywords: /cyber|online fraud|upi|otp|hacking|phishing|it act|sextortion|bank fraud|scam/i,
    law: 'Information Technology Act, 2000; IPC/BNS cheating and fraud provisions; cybercrime reporting rules.',
    actions: ['Call 1930 immediately for financial cyber fraud.', 'File a complaint at cybercrime.gov.in.', 'Preserve screenshots, transaction IDs, numbers, emails, and chats.', 'Contact your bank and request transaction blocking/reversal.'],
    deadline: 1
  },
  Criminal: {
    keywords: /fir|police|arrest|bail|ipc|crime|criminal|assault|threat|stolen/i,
    law: 'BNSS/CrPC FIR and arrest procedure; relevant IPC/BNS offence sections based on facts.',
    actions: ['Write a clear complaint with date, place, people involved, and evidence.', 'Visit the police station and request FIR registration.', 'If FIR is refused, send complaint to the SP by registered post.', 'For arrest/bail risk, contact an advocate urgently.'],
    deadline: 7
  },
  Consumer: {
    keywords: /consumer|refund|defect|e-commerce|product|service failure|delivery|warranty|company/i,
    law: 'Consumer Protection Act, 2019 and e-commerce consumer protection rules.',
    actions: ['Collect invoice, order ID, payment proof, screenshots, and complaint emails.', 'Send a written complaint to the company support/grievance officer.', 'If unresolved, file on the e-Daakhil consumer portal.', 'Claim refund, replacement, compensation, and litigation cost where applicable.'],
    deadline: 30
  },
  Property: {
    keywords: /property|land|rent|landlord|tenant|rera|deposit|eviction|registration/i,
    law: 'State rent/property laws, Transfer of Property Act, Registration Act, and RERA where applicable.',
    actions: ['Review rent agreement/sale deed and payment records.', 'Send a written notice before taking formal action.', 'Do not vacate or sign anything under pressure without advice.', 'Consult a property lawyer for title, eviction, or deposit disputes.'],
    deadline: 15
  },
  Family: {
    keywords: /divorce|custody|498a|domestic|maintenance|marriage|wife|husband|child/i,
    law: 'Family law, Domestic Violence Act, maintenance provisions, and matrimonial laws based on religion/personal law.',
    actions: ['Keep records of messages, expenses, incidents, and documents.', 'For violence or danger, call emergency helplines and approach protection officers/police.', 'Consider mediation only when safe and voluntary.', 'Consult a family lawyer before filing or responding to legal notice.'],
    deadline: 30
  },
  Employment: {
    keywords: /salary|employment|job|termination|employer|labour|pf|resign|notice period/i,
    law: 'Labour laws, Shops and Establishments rules, Industrial Disputes Act where applicable, and employment contract terms.',
    actions: ['Collect offer letter, salary slips, attendance proof, emails, and messages.', 'Send a written salary/settlement request to HR/employer.', 'Approach labour commissioner if salary or dues remain unpaid.', 'Do not sign resignation/settlement under pressure without reading terms.'],
    deadline: 30
  },
  General: {
    keywords: /.*/,
    law: 'The applicable law depends on your facts, location, documents, and urgency.',
    actions: ['Write down the full timeline of events.', 'Collect documents, screenshots, IDs, notices, receipts, and witness details.', 'Use the document generator if you need a basic draft.', 'For high-risk matters, connect with a verified lawyer.'],
    deadline: null
  }
};

function detectCaseFromText(text) {
  return Object.entries(CASE_LIBRARY).find(([type, data]) => type !== 'General' && data.keywords.test(text))?.[0] || 'General';
}

function makeDemoReply(userText) {
  const type = detectCaseFromText(userText);
  const data = CASE_LIBRARY[type] || CASE_LIBRARY.General;
  if (isHindiLanguage(selectedLanguage)) {
    return `**🔍 सरल समझ**
आपकी समस्या "${type === 'General' ? 'कानूनी' : type}" श्रेणी से जुड़ी लगती है। घबराएं नहीं, पहले तथ्य और सबूत व्यवस्थित करें।

**📜 लागू कानून**
${data.law}

**📋 अभी क्या करें**
${data.actions.map((a, i) => `${i + 1}. ${a}`).join('\n')}

**⚡ आपके विकल्प**
1. पहले लिखित शिकायत/नोटिस भेजें।
2. जरूरत हो तो संबंधित पोर्टल, पुलिस, उपभोक्ता मंच या श्रम अधिकारी से संपर्क करें।
3. मामला गंभीर हो तो वकील से सलाह लें।

**⏱️ समय सीमा**
${data.deadline ? `संभव हो तो ${data.deadline} दिन के अंदर कार्रवाई शुरू करें।` : 'कोई एक तय समय सीमा नहीं दिखती, लेकिन देरी न करें।'}

**⚠️ महत्वपूर्ण नोट**
यह सामान्य कानूनी जानकारी है, वकील की सलाह का विकल्प नहीं।`;
  }
  return `**🔍 Simple Explanation**
Your issue appears to fall under **${type}**. The first goal is to preserve proof, understand the correct forum, and avoid taking rushed steps.

**📜 Applicable Law**
${data.law}

**📋 Step-by-Step Actions**
${data.actions.map((a, i) => `${i + 1}. ${a}`).join('\n')}

**⚡ Your Options**
1. Start with a written complaint or legal notice.
2. Use the proper authority/portal depending on the issue.
3. Connect with a lawyer if money, arrest, eviction, violence, or deadlines are involved.

**⏱️ Time Limit**
${data.deadline ? `Start action within ${data.deadline} days if possible.` : 'No strict deadline is visible from your message, but do not delay.'}

**⚠️ Important Note**
This is general legal information, not a substitute for advice from a licensed advocate.`;
}

function handleKey(e) {
  const input = document.getElementById('chat-input');
  document.getElementById('send-btn').disabled = !input.value.trim();
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  document.getElementById('send-btn').disabled = !el.value.trim();
}

function sendTopic(text) {
  showPage('chat');
  setTimeout(() => {
    document.getElementById('chat-input').value = text;
    document.getElementById('send-btn').disabled = false;
    sendMessage();
  }, 80);
}

async function sendMessage() {
  const inputEl = document.getElementById('chat-input');
  const text = inputEl.value.trim();
  if (!text || isLoading) return;

  inputEl.value = '';
  inputEl.style.height = 'auto';
  document.getElementById('send-btn').disabled = true;

  // Hide welcome
  const welcome = document.querySelector('.chat-welcome');
  if (welcome) welcome.remove();

  appendBubble('user', text);
  chatHistory.push({ role: 'user', content: text });
  saveQueryToBackend(text);

  isLoading = true;
  showTyping();

  window.setTimeout(() => {
    hideTyping();
    const reply = makeDemoReply(text);
    chatHistory.push({ role: 'assistant', content: reply });
    appendBubble('bot', reply);

    const caseType = detectCaseFromText(text);
    const deadline = CASE_LIBRARY[caseType]?.deadline;
    if (deadline && !detectedDeadline) {
      detectedDeadline = deadline;
      appendDeadlineBanner(deadline);
    }

    generateCaseSummary();
    appendLawyerButton();
    isLoading = false;
  }, 450);
}

function appendBubble(role, text) {
  const msgs = document.getElementById('chat-messages');
  const row = document.createElement('div');
  row.className = `msg-row ${role}`;
  const formatted = formatBotText(text);
  const avatar = role === 'bot' ? '⚖' : 'U';
  row.innerHTML = `
    <div class="msg-avatar ${role}">${avatar}</div>
    <div class="msg-bubble ${role}">${formatted}</div>
  `;
  msgs.appendChild(row);
  msgs.scrollTop = msgs.scrollHeight;
}

function formatBotText(text) {
  // Convert **bold** to <strong>, preserve newlines
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function showTyping() {
  const msgs = document.getElementById('chat-messages');
  const t = document.createElement('div');
  t.className = 'typing-indicator'; t.id = 'typing-indicator';
  t.innerHTML = `<div class="msg-avatar bot">⚖</div><div class="typing-dots"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
  msgs.appendChild(t);
  msgs.scrollTop = msgs.scrollHeight;
}

function hideTyping() {
  document.getElementById('typing-indicator')?.remove();
}

function appendLawyerButton() {
  const msgs = document.getElementById('chat-messages');
  const wrap = document.createElement('div');
  wrap.className = 'lawyer-connect-row';
  const detected = detectCaseType();
  wrap.innerHTML = `<button class="lawyer-connect-btn">
    👨‍⚖️ Connect with a Lawyer <span class="lcb-arrow">→</span>
  </button>`;
  wrap.querySelector('button').addEventListener('click', () => openLawyerModal(detected || ''));
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
}

function appendDeadlineBanner(days) {
  const msgs = document.getElementById('chat-messages');
  const b = document.createElement('div');
  b.className = 'chat-banner warn';
  b.innerHTML = `<span>⏱️ <strong>Deadline Alert:</strong> You may need to act within ${days} days.</span>
    <button class="banner-action warn" onclick="setReminder(this, ${days})">${reminderSet ? '✓ Set' : 'Set Reminder'}</button>`;
  msgs.appendChild(b);
  msgs.scrollTop = msgs.scrollHeight;
}

function setReminder(btn, days) {
  reminderSet = true;
  btn.textContent = '✓ Reminder Set';
  btn.style.background = 'var(--success-bg)';
  btn.style.color = 'var(--success)';
}

async function generateCaseSummary() {
  const userMessages = chatHistory.filter(m => m.role === 'user').map(m => m.content);
  if (!userMessages.length || caseSummary) return;
  const combined = userMessages.join(' ');
  const caseType = detectCaseFromText(combined);
  const data = CASE_LIBRARY[caseType] || CASE_LIBRARY.General;
  caseSummary = {
    problem: combined.slice(0, 90) + (combined.length > 90 ? '...' : ''),
    keyFacts: [
      `Category: ${caseType}`,
      evidenceFiles.length ? `${evidenceFiles.length} evidence file(s) attached` : 'No evidence uploaded yet',
      data.deadline ? `Suggested urgency: act within ${data.deadline} days` : 'Suggested urgency: normal follow-up'
    ],
    suggestedAction: data.actions[0],
    caseType
  };
  appendCaseSummaryBanner();
}

function appendCaseSummaryBanner() {
  if (!caseSummary) return;
  const msgs = document.getElementById('chat-messages');
  const b = document.createElement('div');
  b.className = 'chat-banner info';
  const safeCaseType = escapeHtml(caseSummary.caseType || '');
  const safeProblem = escapeHtml(caseSummary.problem || '');
  b.innerHTML = `<div>
    <strong>📋 Case Summary Generated</strong> — <span class="badge badge-blue">${safeCaseType}</span><br>
    <span style="font-size:12px">${safeProblem}</span>
  </div>
  <button class="banner-action info">Find Lawyers →</button>`;
  b.querySelector('button').addEventListener('click', () => openLawyerModal(caseSummary.caseType || ''));
  msgs.appendChild(b);
  msgs.scrollTop = msgs.scrollHeight;
}

function newChat() {
  chatHistory = []; caseSummary = null; detectedDeadline = null; reminderSet = false; evidenceFiles = [];
  const msgs = document.getElementById('chat-messages');
  const l = activeLangCopy();
  msgs.innerHTML = `<div class="chat-welcome">
    <div class="chat-welcome-icon">⚖</div>
    <div class="chat-welcome-title" data-i18n="welcomeTitle">${l.welcomeTitle}</div>
    <p class="chat-welcome-sub" data-i18n="welcomeSub">${l.welcomeSub}</p>
    <div class="quick-actions">
      <button class="quick-action-btn" onclick="sendTopic('Generate a legal notice for me')">📄 Generate Legal Notice</button>
      <button class="quick-action-btn" onclick="sendTopic('What are my rights as a citizen of India')">🛡️ Check My Rights</button>
      <button class="quick-action-btn" onclick="sendTopic('How do I file a complaint against a company')">⚖️ File Complaint</button>
    </div>
  </div>`;
  document.getElementById('evidence-label').textContent = 'Attach evidence (documents, images)';
}

function detectCaseType() {
  const text = chatHistory.map(m => m.content).join(' ').toLowerCase();
  const type = detectCaseFromText(text);
  return type === 'General' ? null : type;
}

/* Voice input */
function startVoice() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { alert('Voice input not supported in this browser. Try Chrome.'); return; }
  const r = new SR();
  const recogLang = getSpeechRecognitionLang(selectedLanguage);
  r.lang = recogLang;
  r.onresult = e => {
    document.getElementById('chat-input').value = e.results[0][0].transcript;
    document.getElementById('send-btn').disabled = false;
  };
  r.start();
}

/* Evidence upload */
function handleEvidence(event) {
  const files = Array.from(event.target.files);
  evidenceFiles = [...evidenceFiles, ...files.map(f => ({ name: f.name, size: (f.size/1024).toFixed(0)+'KB' }))];
  document.getElementById('evidence-label').innerHTML =
    `<strong>${evidenceFiles.length} file(s) attached:</strong> ` +
    evidenceFiles.map(f => `<span class="evidence-file">${escapeHtml(f.name)}</span>`).join(' ');
}

function toggleSidebar() {}

/* ══════════════════════════════════════
   LAWYER MODAL
══════════════════════════════════════ */
const LAWYERS = [
  { id:1, name:'Adv. Priya Sharma', init:'PS', qual:'LLB, LLM (Criminal Law)', spec:['Criminal','Cybercrime'], loc:'Delhi', exp:12, fees:1500, rating:4.8, reviews:142, verified:true, bio:'Former public prosecutor. Expert in FIR filings, bail applications, and cybercrime cases.' },
  { id:2, name:'Adv. Rajesh Mehta', init:'RM', qual:'LLB, BA LLB (Hons)', spec:['Property','Consumer'], loc:'Mumbai', exp:8, fees:2000, rating:4.6, reviews:98, verified:true, bio:'Specialist in property disputes, RERA complaints, and consumer forum matters.' },
  { id:3, name:'Adv. Sunita Verma', init:'SV', qual:'LLM (Family Law)', spec:['Family','Criminal'], loc:'Bangalore', exp:15, fees:1800, rating:4.9, reviews:213, verified:true, bio:'Expert in matrimonial disputes, domestic violence, Section 498A IPC cases.' },
  { id:4, name:'Adv. Arun Tiwari', init:'AT', qual:'LLB, Diploma Labour Law', spec:['Employment','Consumer'], loc:'Hyderabad', exp:6, fees:1200, rating:4.5, reviews:67, verified:false, bio:'Labour disputes, wrongful termination, unpaid salary, and PF cases.' },
  { id:5, name:'Adv. Meera Nair', init:'MN', qual:'LLB, LLM (Cyber Law)', spec:['Cybercrime','Criminal'], loc:'Chennai', exp:10, fees:2500, rating:4.7, reviews:156, verified:true, bio:'Pioneer in cyber law — online fraud, IT Act violations, identity theft.' },
  { id:6, name:'Adv. Vikram Singh', init:'VS', qual:'BA LLB (Hons), LLM', spec:['Property','Criminal'], loc:'Delhi', exp:20, fees:3500, rating:4.9, reviews:381, verified:true, bio:'Senior advocate with 20 years in property disputes and criminal matters.' },
];
const bookedIds = new Set();

function openLawyerModal(caseType) {
  const modal = document.getElementById('lawyer-modal');
  const badge = document.getElementById('lm-case-badge');
  if (caseType && caseType !== 'null' && caseType !== '') {
    badge.textContent = caseType; badge.style.display = 'inline-flex';
    const spec = document.getElementById('lm-spec');
    if (spec) { const opt = [...spec.options].find(o => o.value === caseType); if (opt) spec.value = caseType; }
  } else {
    badge.style.display = 'none';
  }
  renderLawyerCards();
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLawyerModal() {
  document.getElementById('lawyer-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function handleModalClick(e) {
  if (e.target === document.getElementById('lawyer-modal')) closeLawyerModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLawyerModal(); });

function renderLawyerCards() {
  const spec = document.getElementById('lm-spec').value;
  const budget = parseInt(document.getElementById('lm-budget').value);
  const loc = document.getElementById('lm-loc').value;
  const list = document.getElementById('lm-card-list');

  const filtered = LAWYERS.filter(l => {
    return (spec === 'all' || l.spec.includes(spec)) &&
           (l.fees <= budget) &&
           (loc === 'all' || l.loc === loc);
  });

  if (!filtered.length) {
    list.innerHTML = `<div class="lm-empty">No lawyers match these filters.<br>Try adjusting budget, specialization, or location.</div>`;
    return;
  }

  list.innerHTML = filtered.map(l => {
    const stars = '★'.repeat(Math.floor(l.rating)) + (l.rating % 1 >= 0.5 ? '⯨' : '') + '☆'.repeat(5 - Math.ceil(l.rating));
    const booked = bookedIds.has(l.id);
    const safeName = escapeHtml(l.name);
    const safeQual = escapeHtml(l.qual);
    const safeLoc = escapeHtml(l.loc);
    const safeBio = escapeHtml(l.bio);
    return `
      <div class="lm-card" id="lm-card-${l.id}">
        <div class="lm-card-top">
          <div class="lm-avatar">${escapeHtml(l.init)}</div>
          <div class="lm-card-info">
            <div class="lm-card-name">
              ${safeName}
              ${l.verified ? '<span class="lm-verified">✓ Verified</span>' : ''}
            </div>
            <div class="lm-card-qual">${safeQual} · ${l.exp}y exp · ${safeLoc}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div class="lm-fee">₹${l.fees.toLocaleString('en-IN')}</div>
            <div class="lm-fee-label">per consult</div>
          </div>
        </div>
        <div class="lm-card-meta">
          <span class="lm-stars">${stars}</span>
          <span class="lm-rating">${l.rating} (${l.reviews} reviews)</span>
        </div>
        <div class="lm-tags">${l.spec.map(s => `<span class="lm-tag">${escapeHtml(s)}</span>`).join('')}</div>
        <div class="lm-bio">${safeBio}</div>
        <div id="lm-actions-${l.id}">
          ${booked
            ? `<div class="lm-booked">✓ Appointment requested — ${safeName} will contact you within 24 hrs.</div>`
            : `<div class="lm-card-actions">
                 <button class="lm-btn-book" onclick="bookLawyer(${l.id})">Book Consultation</button>
                 <button class="lm-btn-send" onclick="sendCase(${l.id}, this)">Send Case</button>
               </div>`
          }
        </div>
      </div>`;
  }).join('');
}

function bookLawyer(id) {
  bookedIds.add(id);
  const lawyer = LAWYERS.find(l => l.id === id);
  if (!lawyer) return;
  document.getElementById(`lm-actions-${id}`).innerHTML =
    `<div class="lm-booked">✓ Appointment requested — ${escapeHtml(lawyer.name)} will contact you within 24 hrs. Case summary ${caseSummary ? 'auto-sent.' : 'not yet generated (chat more to generate).'}</div>`;
}

function sendCase(id, btn) {
  const lawyer = LAWYERS.find(l => l.id === id);
  if (!lawyer) return;
  btn.textContent = '✓ Sent';
  btn.disabled = true;
  btn.style.opacity = '.5';
  const actions = btn.closest('.lm-card-actions');
  if (actions) {
    const note = document.createElement('div');
    note.style.cssText = 'font-size:12px;color:var(--text-3);margin-top:6px';
    note.textContent = caseSummary
      ? `Case summary for "${caseSummary.problem.slice(0,50)}..." sent to ${lawyer.name}.`
      : `Message sent to ${lawyer.name}. They will review your query.`;
    actions.after(note);
  }
}

/* ══════════════════════════════════════
   PHASE 2 - GROWTH: DOCUMENT GENERATOR
   Demo-level templates are implemented locally. Future backend can improve
   drafts with lawyer-reviewed clauses and state-specific rules.
══════════════════════════════════════ */
const DOC_SCHEMAS = {
  'legal-notice': {
    title: '📬 Legal Notice Details',
    fields: [
      { id:'senderName', label:'Your Full Name (Sender)', type:'text' },
      { id:'senderAddress', label:'Your Address', type:'text' },
      { id:'recipientName', label:'Recipient Full Name', type:'text' },
      { id:'recipientAddress', label:'Recipient Address', type:'text' },
      { id:'subject', label:'Subject of Notice', type:'text' },
      { id:'details', label:'Details of your grievance / demand', type:'textarea' },
      { id:'deadline', label:'Compliance Deadline (days)', type:'text', placeholder:'e.g. 15' },
    ],
    template: f => `LEGAL NOTICE
(Via Registered Post / Speed Post / Email)

Date: ${new Date().toLocaleDateString('en-IN', {day:'2-digit',month:'long',year:'numeric'})}

From:
${f.senderName || '______'}
${f.senderAddress || '______'}

To:
${f.recipientName || '______'}
${f.recipientAddress || '______'}

SUBJECT: ${f.subject || 'Legal Notice'}

Under legal advice and on behalf of my client, I hereby serve you with this Legal Notice:

${f.details || '(Details of grievance will appear here)'}

You are hereby called upon to comply with the above within ${f.deadline || '15'} days from receipt of this notice, failing which my client shall be constrained to initiate appropriate legal proceedings against you without further notice, at your risk, cost, and consequences.

Regards,
[Advocate Name]
[Enrollment No.]
On behalf of: ${f.senderName || '______'}

Note: This notice is sent in good faith. A copy is retained for record.

---
⚠️ This is an AI-generated draft. Have a licensed advocate review and issue on their official letterhead before sending.`
  },
  'affidavit': {
    title: '📜 Affidavit Details',
    fields: [
      { id:'deponentName', label:'Deponent Full Name', type:'text' },
      { id:'deponentAge', label:'Age', type:'text' },
      { id:'deponentAddress', label:'Address', type:'text' },
      { id:'deponentOccupation', label:'Occupation', type:'text' },
      { id:'affidavitContent', label:'Content / Statement of Facts', type:'textarea' },
      { id:'purpose', label:'Purpose of Affidavit', type:'text' },
    ],
    template: f => `AFFIDAVIT

I, ${f.deponentName || '______'}, aged ${f.deponentAge || '__'} years, ${f.deponentOccupation || '______'}, resident of ${f.deponentAddress || '______'}, do hereby solemnly affirm and declare as under:

PURPOSE: ${f.purpose || '______'}

STATEMENT:
${f.affidavitContent || '(Your statement of facts will appear here)'}

I, the above-named deponent, do hereby solemnly affirm that the contents of this Affidavit are true and correct to the best of my knowledge and belief, and nothing material has been concealed therefrom.

Deponent: ${f.deponentName || '______'}
Date: ${new Date().toLocaleDateString('en-IN')}
Place: ______

Sworn before me on ${new Date().toLocaleDateString('en-IN')}

____________________
Notary Public / Oath Commissioner

⚠️ Draft for guidance. Must be executed before a Notary or Magistrate.`
  },
  'rent': {
    title: '🏠 Rent Agreement Details',
    fields: [
      { id:'landlordName', label:'Landlord Full Name', type:'text' },
      { id:'landlordAddress', label:'Landlord Address', type:'text' },
      { id:'tenantName', label:'Tenant Full Name', type:'text' },
      { id:'tenantAddress', label:'Tenant Permanent Address', type:'text' },
      { id:'propertyAddress', label:'Property Address (being rented)', type:'text' },
      { id:'rentAmount', label:'Monthly Rent (₹)', type:'text' },
      { id:'deposit', label:'Security Deposit (₹)', type:'text' },
      { id:'startDate', label:'Agreement Start Date', type:'date' },
      { id:'duration', label:'Duration (months)', type:'text', placeholder:'e.g. 11' },
    ],
    template: f => `LEAVE AND LICENSE AGREEMENT

This Agreement is made on ${f.startDate ? new Date(f.startDate).toLocaleDateString('en-IN') : '____'} between:

LICENSOR (Landlord):
${f.landlordName || '______'}, resident of ${f.landlordAddress || '______'}

AND

LICENSEE (Tenant):
${f.tenantName || '______'}, resident of ${f.tenantAddress || '______'}

PROPERTY: ${f.propertyAddress || '______'}

TERMS:
1. Duration: ${f.duration || '11'} months from ${f.startDate ? new Date(f.startDate).toLocaleDateString('en-IN') : '____'}
2. Monthly Rent: ₹${f.rentAmount || '______'}/- (payable by 5th of each month)
3. Security Deposit: ₹${f.deposit || '______'}/- (refundable on vacating)
4. The property shall be used for residential purposes only.
5. No structural changes without written consent of Licensor.
6. Tenant shall maintain the property in good condition.
7. Either party may terminate with 1 month written notice.

SIGNATURES:

Licensor: ____________________    Licensee: ____________________
${f.landlordName || '______'}              ${f.tenantName || '______'}

Witness 1: ____________________   Witness 2: ____________________

⚠️ This is a draft. Get it registered at Sub-Registrar's office for agreements over 11 months.`
  },
  'consumer': {
    title: '⚠️ Consumer Complaint Details',
    fields: [
      { id:'complainantName', label:'Your Full Name', type:'text' },
      { id:'complainantAddress', label:'Your Address & Contact', type:'text' },
      { id:'opName', label:'Company/Service Provider Name', type:'text' },
      { id:'opAddress', label:'Company Address', type:'text' },
      { id:'purchaseDate', label:'Date of Purchase/Service', type:'date' },
      { id:'amount', label:'Amount Paid (₹)', type:'text' },
      { id:'grievance', label:'Details of Deficiency / Grievance', type:'textarea' },
      { id:'relief', label:'Relief Sought (refund, replacement, compensation)', type:'text' },
    ],
    template: f => `CONSUMER COMPLAINT
(Under Consumer Protection Act, 2019)

To,
The President / Registrar,
District Consumer Disputes Redressal Commission
[District]

Date: ${new Date().toLocaleDateString('en-IN')}

COMPLAINANT: ${f.complainantName || '______'}, ${f.complainantAddress || '______'}
OPPOSITE PARTY: ${f.opName || '______'}, ${f.opAddress || '______'}

SUBJECT: Complaint for Deficiency of Service and Unfair Trade Practice

Facts:
1. On ${f.purchaseDate ? new Date(f.purchaseDate).toLocaleDateString('en-IN') : '____'}, the Complainant availed services/purchased products from the Opposite Party for ₹${f.amount || '______'}.
2. Grievance: ${f.grievance || '______'}
3. Despite repeated requests, the Opposite Party has failed to resolve the issue.

PRAYER:
The Complainant respectfully prays that this Commission may be pleased to direct the Opposite Party to:
${f.relief || '(Relief sought will appear here)'}
- Pay ₹10,000/- as compensation for mental agony and harassment.
- Pay ₹5,000/- as litigation costs.

Complainant: ${f.complainantName || '______'}

⚠️ Draft for guidance. Attach bills, receipts, and correspondence before filing.`
  },
  'rti': {
    title: '📋 RTI Application Details',
    fields: [
      { id:'applicantName', label:'Your Full Name', type:'text' },
      { id:'applicantAddress', label:'Your Address', type:'text' },
      { id:'department', label:'Department / Public Authority Name', type:'text' },
      { id:'informationSought', label:'Information Sought (be specific)', type:'textarea' },
      { id:'periodOfInfo', label:'Period for which information is sought', type:'text', placeholder:'e.g. 2023-2024' },
    ],
    template: f => `RIGHT TO INFORMATION APPLICATION
(Under Section 6(1) of the RTI Act, 2005)

To,
The Public Information Officer,
${f.department || '______'}

Date: ${new Date().toLocaleDateString('en-IN')}

Subject: Request for Information under RTI Act, 2005

Sir/Madam,

I, ${f.applicantName || '______'}, resident of ${f.applicantAddress || '______'}, hereby request the following information under Section 6(1) of the Right to Information Act, 2005:

INFORMATION SOUGHT:
${f.informationSought || '______'}

Period: ${f.periodOfInfo || '______'}

I am enclosing the prescribed fee of ₹10/- (Ten Rupees) by [Demand Draft/IPO/Court Fee Stamp].

Kindly provide the information within 30 days as mandated under the RTI Act.

Yours faithfully,
${f.applicantName || '______'}
${f.applicantAddress || '______'}

⚠️ Attach ₹10 fee. Keep a copy for your records.`
  },
  'bail': {
    title: '⚖️ Bail Application Details',
    fields: [
      { id:'accusedName', label:'Accused Full Name', type:'text' },
      { id:'accusedAddress', label:'Accused Address', type:'text' },
      { id:'fatherName', label:"Father's/Husband's Name", type:'text' },
      { id:'caseFIR', label:'FIR No. / Case No.', type:'text' },
      { id:'psName', label:'Police Station / Court Name', type:'text' },
      { id:'offences', label:'Offences Alleged (IPC sections)', type:'text' },
      { id:'groundsBail', label:'Grounds for Bail', type:'textarea' },
    ],
    template: f => `BAIL APPLICATION
(Under Section 437/438/439 CrPC)

IN THE COURT OF [Hon'ble Sessions Judge / Judicial Magistrate]
[District]

IN THE MATTER OF:
State vs. ${f.accusedName || '______'}

FIR No.: ${f.caseFIR || '______'}
Police Station: ${f.psName || '______'}
Offences Alleged: ${f.offences || '______'}

APPLICATION FOR BAIL

To,
The Learned [Magistrate/Sessions Judge],

The applicant, ${f.accusedName || '______'}, son/daughter of ${f.fatherName || '______'}, resident of ${f.accusedAddress || '______'}, humbly states:

GROUNDS:
${f.groundsBail || '(State grounds for bail: first offence, no prior criminal record, family responsibilities, cooperation with investigation, etc.)'}

The applicant undertakes to:
1. Abide by all conditions imposed by this Hon'ble Court.
2. Not tamper with evidence or influence witnesses.
3. Appear before the Court on all dates.

It is therefore most humbly prayed that this Hon'ble Court may be pleased to enlarge the applicant on bail on such terms and conditions as deemed fit.

Advocate for Applicant: ____________________

⚠️ Must be drafted and filed by a licensed advocate. This is a template only.`
  },
  'fir': {
    title: '🚨 FIR Draft Details',
    fields: [
      { id:'complainantName', label:'Your Full Name', type:'text' },
      { id:'complainantAddress', label:'Your Address', type:'text' },
      { id:'complainantPhone', label:'Phone Number', type:'text' },
      { id:'incidentDate', label:'Date of Incident', type:'date' },
      { id:'incidentLocation', label:'Place of Incident', type:'text' },
      { id:'incidentDescription', label:'Describe the incident in full detail', type:'textarea' },
      { id:'accusedDetails', label:'Accused Person Details (if known)', type:'text' },
      { id:'witnessDetails', label:'Witness Details (if any)', type:'text' },
    ],
    template: f => `FIRST INFORMATION REPORT
(Draft Under Section 154 CrPC / BNSS)

To,
The Station House Officer,
[Police Station Name], [District]

Date: ${new Date().toLocaleDateString('en-IN')}

Subject: Complaint for Registration of FIR

Sir/Madam,

I, ${f.complainantName || '______'}, resident of ${f.complainantAddress || '______'}, Phone: ${f.complainantPhone || '______'}, respectfully submit the following complaint for registration of FIR:

1. DATE & PLACE OF OCCURRENCE:
   Date: ${f.incidentDate ? new Date(f.incidentDate).toLocaleDateString('en-IN') : '______'}
   Location: ${f.incidentLocation || '______'}

2. FACTS OF THE CASE:
   ${f.incidentDescription || '(Incident description will appear here)'}

3. DETAILS OF ACCUSED (if known):
   ${f.accusedDetails || 'Not known at this time'}

4. WITNESS (if any):
   ${f.witnessDetails || 'None'}

I request you to register this FIR and take necessary legal action against the accused.

Signature / Thumb Impression: ____________________
Name: ${f.complainantName || '______'}
Date: ${new Date().toLocaleDateString('en-IN')}

⚠️ This is a draft to help you prepare. Visit your Police Station in person to file the actual FIR. If refused, you can send it via registered post to the SP or approach the Judicial Magistrate.`
  },
};

let currentDocType = 'legal-notice';

function selectDocType(btn, type) {
  document.querySelectorAll('.doc-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  currentDocType = type;
  document.getElementById('doc-form-title').textContent = DOC_SCHEMAS[type].title;
  buildDocForm(type);
  document.getElementById('doc-preview').innerHTML = `<div class="docs-preview-empty"><div style="font-size:32px">📄</div>Fill in the form on the left<br>and click <strong>"Generate Document"</strong></div>`;
  window.refreshNyaysetuLanguage?.();
}

function buildDocForm(type) {
  const schema = DOC_SCHEMAS[type];
  let html = '';
  schema.fields.forEach(f => {
    const fieldId = escapeHtml(f.id);
    const label = escapeHtml(f.label);
    const placeholder = escapeHtml(f.placeholder || '');
    html += `<div class="form-group">
      <label class="form-label" for="df-${fieldId}">${label}</label>`;
    if (f.type === 'textarea') {
      html += `<textarea class="form-textarea" id="df-${fieldId}" rows="3" placeholder="${placeholder}"></textarea>`;
    } else {
      html += `<input class="form-input" id="df-${fieldId}" type="${escapeHtml(f.type)}" placeholder="${placeholder}"/>`;
    }
    html += `</div>`;
  });
  document.getElementById('doc-form-fields').innerHTML = html;
  window.refreshNyaysetuLanguage?.();
}

async function generateDocument() {
  const schema = DOC_SCHEMAS[currentDocType];
  const fields = {};
  schema.fields.forEach(f => {
    const el = document.getElementById('df-' + f.id);
    if (el) fields[f.id] = el.value;
  });
  const draft = schema.template(fields);
  const btn = document.getElementById('btn-generate');
  btn.disabled = true; btn.textContent = 'Generating...';
  const preview = document.getElementById('doc-preview');
  preview.textContent = 'Generating demo draft...';
  window.setTimeout(() => {
    preview.textContent = `${draft}

---
DEMO REVIEW CHECKLIST
- Verify names, dates, addresses, and amounts before use.
- Attach supporting documents and evidence.
- For court filing or high-risk matters, get this reviewed by a licensed advocate.

NyaySetu Phase 2 Demo: template generated locally without backend storage.`;
    btn.disabled = false; btn.textContent = '✦ Generate Document';
  }, 350);
}

async function copyDoc(btn) {
  const text = document.getElementById('doc-preview').textContent;
  if (await copyText(text)) {
    btn.textContent = '✓ Copied';
    setTimeout(() => btn.textContent = '📋 Copy', 1500);
  }
}

function downloadPDF() {
  const text = document.getElementById('doc-preview').textContent;
  if (!text || text.includes('Fill in the form')) { alert('Please generate a document first.'); return; }
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFont('helvetica'); doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, 180);
    let y = 20;
    lines.forEach(line => {
      if (y > 280) { doc.addPage(); y = 20; }
      doc.text(line, 15, y); y += 7;
    });
    doc.save(`NyaySetu_${currentDocType}_${Date.now()}.pdf`);
  } catch(e) { alert('PDF download requires the jsPDF library to load. Please check your internet connection.'); }
}

// Build initial doc form
buildDocForm('legal-notice');

/* ══════════════════════════════════════
   PHASE 2 - GROWTH: LAW SIMPLIFIER
   Demo-level local simplifier. It gives a structured explanation without
   requiring API keys, so the project works in college/demo environments.
══════════════════════════════════════ */
const SAMPLES = {
  ipc420: `Section 420 in The Indian Penal Code
420. Cheating and dishonestly inducing delivery of property.—Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, or anything which is signed or sealed, and which is capable of being converted into a valuable security, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.`,
  notice: `LEGAL NOTICE
Whereas you have failed to pay the outstanding dues of Rs. 50,000/- (Rupees Fifty Thousand Only) being the amount due and payable by you to our client in respect of the goods supplied and services rendered to you vide Invoice No. ABC-2024-567 dated 01.01.2024, and despite repeated oral and written requests and demands, you have neglected and refused to pay the said amount.`,
  court: `The Respondent is directed to maintain status quo with respect to the property bearing Plot No. 45, Sector 12, Noida until further orders. The matter is adjourned sine die. Liberty to the parties to move the Court upon compliance. Let the matter appear on board on 15.06.2026 for hearing on merits. Costs shall be in the cause.`,
  contract: `The LICENSEE shall not, without the prior written consent of the LICENSOR, assign, sublet, or part with the possession of the Licensed Premises or any part thereof. The LICENSEE shall use the said premises solely for residential purposes and shall not carry on any commercial, business, trade or professional activity from the said premises.`,
  rti: `Your application dated 15.03.2024 has been received. The information sought by you falls under Section 8(1)(e) of the RTI Act, 2005 as it pertains to information available in fiduciary relationship. Your application is accordingly rejected. You may file a First Appeal before the First Appellate Authority within 30 days of receipt of this order.`
};

function loadSample(key) {
  document.getElementById('simp-input').value = SAMPLES[key] || '';
  updateWordCount();
}
function updateWordCount() {
  const words = document.getElementById('simp-input').value.trim().split(/\s+/).filter(Boolean).length;
  document.getElementById('simp-word-count').textContent = words + ' words';
}
function clearSimp() {
  document.getElementById('simp-input').value = '';
  document.getElementById('simp-output').innerHTML = `<div class="simp-output-empty"><div style="font-size:32px">⚖️</div>Your plain-language explanation<br>will appear here</div>`;
  document.getElementById('simp-time').textContent = '0.0s';
  document.getElementById('simp-out-words').textContent = '0 words read';
  updateWordCount();
}
function copySimp() {
  const text = document.getElementById('simp-output').textContent;
  copyText(text);
}
async function reanalyse() { await simplifyText(); }

async function simplifyText() {
  const text = document.getElementById('simp-input').value.trim();
  if (!text) return;
  const btn = document.getElementById('simp-btn');
  btn.disabled = true; btn.textContent = 'Simplifying...';
  const start = Date.now();
  window.setTimeout(() => {
    const type = detectCaseFromText(text);
    const data = CASE_LIBRARY[type] || CASE_LIBRARY.General;
    const summary = text.length > 180 ? text.slice(0, 180) + '...' : text;
    const plain = isHindiLanguage(selectedLanguage)
      ? `**इसका मतलब:**\nयह कानूनी पाठ ${type} विषय से जुड़ा लगता है। मुख्य बात यह है: "${summary}"\n\n**आपको क्या करना चाहिए:**\n${data.actions.slice(0, 3).map((a, i) => `${i + 1}. ${a}`).join('\n')}\n\n**आपके अधिकार:**\nआपको लिखित रिकॉर्ड रखने, शिकायत करने, और जरूरत पड़ने पर वकील से सलाह लेने का अधिकार है।\n\n**महत्वपूर्ण समय सीमा:**\n${data.deadline ? `${data.deadline} दिन के अंदर कार्रवाई शुरू करना बेहतर है।` : 'तुरंत दस्तावेज़ सुरक्षित रखें; निश्चित समय सीमा मामले पर निर्भर है।'}`
      : `**What this means:**\nThis text appears related to ${type}. In simple words, the important part is: "${summary}"\n\n**What you should do:**\n${data.actions.slice(0, 3).map((a, i) => `${i + 1}. ${a}`).join('\n')}\n\n**Your rights:**\nYou can keep written records, ask for a written response, file a complaint with the correct authority, and consult a lawyer before signing or filing anything.\n\n**Important deadlines:**\n${data.deadline ? `Start action within ${data.deadline} days if possible.` : 'Preserve documents now; the exact deadline depends on the case.'}`;
    const reply = escapeHtml(plain).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
    const elapsed = ((Date.now()-start)/1000).toFixed(1);
    document.getElementById('simp-output').innerHTML = reply;
    document.getElementById('simp-time').textContent = elapsed + 's';
    const outWords = document.getElementById('simp-output').textContent.trim().split(/\s+/).filter(Boolean).length;
    document.getElementById('simp-out-words').textContent = outWords + ' words read';
    btn.disabled = false; btn.textContent = '✦ Simplify →';
  }, 350);
}

/* ══════════════════════════════════════
   STUDENTS
══════════════════════════════════════ */
function studTab(btn, tab) {
  document.querySelectorAll('#page-students .students-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('#page-students .stud-tab-content').forEach(t => t.style.display = 'none');
  btn.classList.add('active');
  const el = document.getElementById('stud-' + tab);
  if (el) el.style.display = 'block';
  if (tab === 'queue' && !document.getElementById('queue-items').dataset.built) buildQueue();
  if (tab === 'leaderboard' && !document.getElementById('lb-tbody').dataset.built) buildLeaderboard();
}

function openStudentTab(tab) {
  showPage('students');
  window.setTimeout(() => {
    const target = [...document.querySelectorAll('#page-students .students-tab')]
      .find(btn => btn.getAttribute('onclick')?.includes(`'${tab}'`));
    if (target) studTab(target, tab);
  }, 40);
}

function lawyerTab(btn, tab) {
  document.querySelectorAll('#page-lawyers .lawyer-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.lawyer-tab-content').forEach(t => t.style.display = 'none');
  btn.classList.add('active');
  const el = document.getElementById('lawyer-' + tab);
  if (el) el.style.display = 'block';
  if (tab === 'leads' && !document.getElementById('lawyer-leads-list').dataset.built) buildLawyerLeads();
}

function openLawyerTab(tab = 'dashboard') {
  showPage('lawyers');
  window.setTimeout(() => {
    const target = [...document.querySelectorAll('#page-lawyers .lawyer-tab')]
      .find(btn => btn.getAttribute('onclick')?.includes(`'${tab}'`));
    if (target) lawyerTab(target, tab);
  }, 40);
}

function openLoginRole(role = 'seeker') {
  showPage('login');
  window.setTimeout(() => selectLoginRole(role), 40);
}

function selectLoginRole(role) {
  document.querySelectorAll('.role-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.role === role);
  });
  document.querySelectorAll('.login-form').forEach(form => {
    form.classList.toggle('active', form.id === 'login-' + role);
  });
}

const NYAYSETU_API_BASE = window.NYAYSETU_API_BASE || 'http://localhost:5000/api';

function formValue(data, keys) {
  for (const key of keys) {
    if (data[key]) return data[key];
  }
  return '';
}

function showFormNote(form, anchor, message, color = 'var(--success)') {
  const oldNote = form.querySelector('.join-form-note');
  if (oldNote) oldNote.remove();

  const note = document.createElement('div');
  note.className = 'join-form-note';
  note.style.cssText = `margin-top:12px;font-size:13px;color:${color};font-weight:500;line-height:1.5`;
  note.textContent = message;
  anchor.after(note);
}

function saveLocalSubmission(formType, data) {
  const storageKey = formType === 'lawyer' ? 'nyaysetu_lawyer_applications' : 'nyaysetu_student_applications';
  const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
  saved.push({
    ...data,
    submittedAt: new Date().toISOString(),
    status: formType === 'lawyer' ? 'Pending verification' : 'Pending review'
  });
  localStorage.setItem(storageKey, JSON.stringify(saved));
}

async function postToApi(path, payload) {
  const response = await fetch(`${NYAYSETU_API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(body.error || 'Request failed.');
    error.status = response.status;
    throw error;
  }

  return body;
}

function buildStudentPayload(data) {
  return {
    name: formValue(data, ['name', 'student-name']),
    email: formValue(data, ['email', 'student-email']),
    phone: formValue(data, ['phone', 'student-phone']),
    role: 'student',
    college: formValue(data, ['college', 'student-college']),
    year_of_study: formValue(data, ['year_of_study', 'student-year']),
    interest_area: formValue(data, ['interest_area', 'student-interest']),
    enrollment_no: formValue(data, ['enrollment_no', 'student-enrollment'])
  };
}

function buildLawyerPayload(data) {
  return {
    name: formValue(data, ['name', 'fullName', 'lawyer-name', 'lawyer-page-name']),
    email: formValue(data, ['email', 'lawyer-email', 'lawyer-page-email']),
    phone: formValue(data, ['phone', 'lawyer-phone', 'lawyer-page-phone']),
    qualification: formValue(data, ['qualification', 'lawyer-qualification', 'lawyer-page-qualification']),
    specialization: formValue(data, ['specialization', 'lawyer-specialization', 'lawyer-page-specialization']),
    experience: formValue(data, ['experience', 'lawyer-experience', 'lawyer-page-experience']),
    location: formValue(data, ['location', 'lawyer-location', 'lawyer-page-location']),
    fees: formValue(data, ['fees', 'lawyer-fees', 'lawyer-page-fees']),
    bio: formValue(data, ['bio', 'lawyer-bio', 'lawyer-page-bio']),
    certificate_file: formValue(data, ['certificate', 'lawyer-certificate', 'lawyer-page-certificate'])
  };
}

function collectFieldData(fields) {
  const data = {};

  fields.forEach(i => {
    const value = i.type === 'file'
      ? (i.files?.[0]?.name || '')
      : i.value.trim();
    data[i.id] = value;
  });

  return data;
}

async function saveQueryToBackend(problemText) {
  const userId = Number(localStorage.getItem('nyaysetu_current_user_id'));
  if (!userId) return;

  try {
    await postToApi('/queries', {
      user_id: userId,
      problem_text: problemText,
      category: detectCaseFromText(problemText)
    });
  } catch (error) {
    console.info('NyaySetu query was not saved to the backend:', error.message);
  }
}

async function loginSubmit(btn, role) {
  const form = btn.closest('.login-form');
  const fields = form.querySelectorAll('input, select');
  let valid = true;

  fields.forEach(field => {
    const value = field.value.trim();
    const badEmail = field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const missing = !value;
    field.style.borderColor = (missing || badEmail) ? 'var(--danger)' : '';
    if (missing || badEmail) valid = false;
  });

  const oldNote = form.querySelector('.join-form-note');
  if (oldNote) oldNote.remove();
  if (!valid) {
    showFormNote(form, btn.closest('.login-actions'), 'Please complete all fields before continuing.', 'var(--danger)');
    return;
  }

  const originalText = btn.textContent;
  btn.textContent = role === 'seeker' ? 'Saving...' : 'Opening...';
  btn.disabled = true;

  if (role === 'seeker') {
    try {
      const result = await postToApi('/users', {
        name: document.getElementById('seeker-name').value.trim(),
        email: document.getElementById('seeker-email').value.trim(),
        phone: document.getElementById('seeker-phone').value.trim(),
        role: 'user'
      });
      localStorage.setItem('nyaysetu_current_user_id', result.user.id);
      localStorage.setItem('nyaysetu_current_user_role', 'user');
    } catch (error) {
      if (error.status) {
        btn.textContent = originalText;
        btn.disabled = false;
        showFormNote(form, btn.closest('.login-actions'), error.message, 'var(--danger)');
        return;
      }

      localStorage.setItem('nyaysetu_pending_user', JSON.stringify({
        name: document.getElementById('seeker-name').value.trim(),
        email: document.getElementById('seeker-email').value.trim(),
        phone: document.getElementById('seeker-phone').value.trim(),
        role: 'user'
      }));
    }
  }

  localStorage.setItem('nyaysetu_active_role', role);
  btn.textContent = role === 'lawyer' ? 'Opening Advocate Area...' : role === 'student' ? 'Opening Student Area...' : 'Opening AI Chat...';
  window.setTimeout(() => {
    if (role === 'student') showPage('students');
    else if (role === 'lawyer') openLawyerTab('dashboard');
    else showPage('chat');
    btn.disabled = false;
  }, 450);
}

function buildQueue() {
  const QUEUE = [
    { id:1, q:'My online order was not delivered but money was deducted. What can I do?', cat:'Consumer', ai:'Under Consumer Protection Act 2019, you can file a complaint with the consumer forum...', time:'5 min ago' },
    { id:2, q:'My employer is forcing me to resign. Is this legal?', cat:'Employment', ai:'Forced resignation may amount to constructive dismissal under the Industrial Disputes Act...', time:'22 min ago' },
    { id:3, q:'Can the landlord enter my rented property without notice?', cat:'Property', ai:'Under most state Rent Control Acts, landlord must give prior notice before entering...', time:'1 hr ago' },
  ];
  const container = document.getElementById('queue-items');
  container.innerHTML = QUEUE.map(q => `
    <div style="border:1px solid var(--border);border-radius:var(--radius-lg);padding:16px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:10px">
        <div>
          <span class="badge badge-blue" style="margin-bottom:6px;display:inline-flex">${q.cat}</span>
          <div style="font-size:14px;font-weight:500;color:var(--navy)">"${q.q}"</div>
        </div>
        <span style="font-size:11px;color:var(--text-3);flex-shrink:0">${q.time}</span>
      </div>
      <div style="background:var(--bg-2);border:1px solid var(--border);border-radius:8px;padding:10px;font-size:12px;color:var(--text-2);margin-bottom:12px;line-height:1.6">
        <strong>AI Response:</strong> ${q.ai}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button onclick="reviewAction(this,'Approved')" style="padding:7px 14px;background:var(--success-bg);color:var(--success);border:1px solid #6ee7b7;border-radius:7px;font-size:12px;font-weight:600">✓ Approve</button>
        <button onclick="reviewAction(this,'Edited')" style="padding:7px 14px;background:var(--blue-light);color:var(--blue);border:1px solid #93c5fd;border-radius:7px;font-size:12px;font-weight:600">✏️ Edit</button>
        <button onclick="reviewAction(this,'Escalated')" style="padding:7px 14px;background:var(--warn-bg);color:var(--warn);border:1px solid #fcd34d;border-radius:7px;font-size:12px;font-weight:600">⬆ Escalate</button>
        <button onclick="reviewAction(this,'Flagged')" style="padding:7px 14px;background:var(--danger-bg);color:var(--danger);border:1px solid #fca5a5;border-radius:7px;font-size:12px;font-weight:600">🚩 Flag</button>
        <span style="margin-left:auto;font-size:11px;color:var(--text-3);display:flex;align-items:center">+15 pts</span>
      </div>
    </div>`).join('');
  container.dataset.built = '1';
  window.refreshNyaysetuLanguage?.();
}

function reviewAction(btn, action) {
  const card = btn.closest('div[style*="border:1px solid var(--border)"]');
  card.style.opacity = '.5'; card.style.pointerEvents = 'none';
  const notice = document.createElement('div');
  notice.style.cssText = 'margin-top:8px;font-size:12px;color:var(--success);font-weight:600';
  notice.textContent = `✓ ${action} — +15 pts earned`;
  card.appendChild(notice);
}

function buildLawyerLeads() {
  const leads = [
    { cat:'Property', title:'Tenant deposit recovery', loc:'Delhi', budget:'₹1,500', urgency:'Medium', summary:'User has rent agreement, payment receipts, and landlord messages.' },
    { cat:'Criminal', title:'Anticipatory bail guidance', loc:'Mumbai', budget:'₹3,000', urgency:'High', summary:'Family received police call after FIR threat; user needs urgent consultation.' },
    { cat:'Cyber Law', title:'UPI fraud complaint', loc:'Bengaluru', budget:'₹2,000', urgency:'High', summary:'User has screenshots, transaction ID, bank complaint number, and cyber portal draft.' },
    { cat:'Family', title:'Maintenance and custody query', loc:'Lucknow', budget:'₹2,500', urgency:'Medium', summary:'User needs advice before responding to a legal notice.' }
  ];
  const container = document.getElementById('lawyer-leads-list');
  container.innerHTML = leads.map(lead => `
    <div class="lawyer-lead-card">
      <div class="lawyer-lead-top">
        <div>
          <span class="badge badge-blue" style="margin-bottom:6px;display:inline-flex">${lead.cat}</span>
          <div class="lawyer-lead-title">${lead.title}</div>
        </div>
        <span class="lawyer-lead-urgency ${lead.urgency === 'High' ? 'high' : ''}">${lead.urgency}</span>
      </div>
      <p class="lawyer-lead-summary">${lead.summary}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:12px;color:var(--text-2)">
        <span class="lm-tag">${lead.loc}</span><span class="lm-tag">${lead.budget}</span><span class="lm-tag">Case summary ready</span>
      </div>
      <div class="lawyer-lead-actions">
        <button class="lawyer-lead-btn accept" onclick="lawyerLeadAction(this,'Accepted')">Accept Lead</button>
        <button class="lawyer-lead-btn request" onclick="lawyerLeadAction(this,'Documents requested')">Request Documents</button>
        <button class="lawyer-lead-btn" onclick="lawyerLeadAction(this,'Declined')">Decline</button>
      </div>
    </div>
  `).join('');
  container.dataset.built = '1';
  window.refreshNyaysetuLanguage?.();
}

function lawyerLeadAction(btn, action) {
  const card = btn.closest('.lawyer-lead-card');
  const oldNote = card.querySelector('.lawyer-lead-note');
  if (oldNote) oldNote.remove();
  const notice = document.createElement('div');
  notice.className = 'lawyer-lead-note';
  notice.style.cssText = 'margin-top:10px;font-size:12px;color:var(--success);font-weight:600';
  notice.textContent = `${action}. This status is saved only for the static demo.`;
  card.appendChild(notice);
}

function buildLeaderboard() {
  const LB = [
    { rank:1, init:'AK', name:'Ananya Krishnan', pts:2840, acc:97, prog:97 },
    { rank:2, init:'RS', name:'Rahul Sharma', pts:2650, acc:95, prog:94 },
    { rank:3, init:'PM', name:'Priya Mehta', pts:2410, acc:94, prog:86 },
    { rank:4, init:'VJ', name:'Vikash Joshi', pts:2180, acc:92, prog:78 },
    { rank:5, init:'SN', name:'Sneha Nair', pts:1950, acc:91, prog:70 },
    { rank:6, init:'AT', name:'Arjun Tiwari', pts:1720, acc:89, prog:62 },
    { rank:7, init:'YK', name:'You', pts:1540, acc:94, prog:55, highlight:true },
  ];
  document.getElementById('lb-tbody').innerHTML = LB.map(l => `
    <tr style="${l.highlight ? 'background:var(--blue-light)' : ''}">
      <td><span class="lb-rank ${l.rank<=3?'gold':''}">${l.rank<=3?['🥇','🥈','🥉'][l.rank-1]:l.rank}</span></td>
      <td><div style="display:flex;align-items:center;gap:8px"><div class="lb-avt" style="${l.highlight?'background:var(--blue)':''}">${l.init}</div><span style="font-size:13px;font-weight:${l.highlight?'700':'400'}">${l.name}${l.highlight?' (You)':''}</span></div></td>
      <td><div class="lb-progress-bg"><div class="lb-progress-fill" style="width:${l.prog}%"></div></div></td>
      <td><span style="font-weight:600;font-size:14px">${l.pts.toLocaleString()}</span></td>
      <td><span style="font-weight:600;color:var(--success)">${l.acc}%</span></td>
    </tr>`).join('');
  document.getElementById('lb-tbody').dataset.built = '1';
  window.refreshNyaysetuLanguage?.();
}

async function joinSubmit(btn) {
  const form = btn.closest('.join-form');
  const fields = form.querySelectorAll('input, select, textarea');
  const formType = form.dataset.formType || 'student';
  let valid = true;

  fields.forEach(i => {
    const label = i.closest('.form-group')?.querySelector('.form-label')?.textContent || i.name || i.id;
    const optional = /optional/i.test(label);
    const value = i.type === 'file'
      ? (i.files?.[0]?.name || '')
      : i.value.trim();
    const missing = !optional && !value && i.type !== 'file';
    const badEmail = i.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    i.style.borderColor = (missing || badEmail) ? 'var(--danger)' : '';
    if (missing || badEmail) valid = false;
  });

  if (!valid) {
    showFormNote(form, btn, 'Please complete all required fields and enter a valid email address.', 'var(--danger)');
    return;
  }

  const data = collectFieldData(fields);
  const payload = formType === 'lawyer' ? buildLawyerPayload(data) : buildStudentPayload(data);
  const apiPath = formType === 'lawyer' ? '/lawyers' : '/users';
  const originalText = btn.textContent;
  let savedToServer = false;

  btn.textContent = formType === 'lawyer' ? 'Submitting profile...' : 'Creating account...';
  btn.disabled = true;

  try {
    const result = await postToApi(apiPath, payload);
    savedToServer = true;

    if (formType === 'student' && result.user?.id) {
      localStorage.setItem('nyaysetu_current_user_id', result.user.id);
      localStorage.setItem('nyaysetu_current_user_role', 'student');
    }
  } catch (error) {
    if (error.status) {
      btn.textContent = originalText;
      btn.disabled = false;
      showFormNote(form, btn, error.message, 'var(--danger)');
      return;
    }

    saveLocalSubmission(formType, data);
  }

  btn.textContent = savedToServer
    ? (formType === 'lawyer' ? 'Saved to SQL!' : 'Account Stored!')
    : (formType === 'lawyer' ? 'Saved Locally!' : 'Application Saved!');
  btn.style.background = 'var(--success)';

  const message = savedToServer
    ? (formType === 'lawyer'
      ? 'Thank you! Your lawyer profile is stored in SQLite and marked pending verification.'
      : 'Thank you! Your student account is stored in SQLite.')
    : 'The backend is not running, so this was saved in the browser demo only. Start the backend to store it in SQL.';
  showFormNote(form, btn, message, savedToServer ? 'var(--success)' : 'var(--warn)');
}

/* ══════════════════════════════════════
   PHASE 3 - FUTURE SCOPE PLACEHOLDERS
   These are intentionally not fully implemented in this frontend-only demo.
   They document the next product steps without adding complex backend code.
══════════════════════════════════════ */
/* Citizens */
const CITIZEN_SESSION_KEY = 'nyaysetu_citizen_session';
const CITIZEN_CASES_KEY = 'nyaysetu_citizen_cases';

function getCitizenSession() {
  try {
    return JSON.parse(localStorage.getItem(CITIZEN_SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

function getCitizenCases() {
  try {
    return JSON.parse(localStorage.getItem(CITIZEN_CASES_KEY) || '[]');
  } catch {
    return [];
  }
}

function setCitizenPageState() {
  const session = getCitizenSession();
  const loginForm = document.getElementById('citizen-login-form');
  const sessionPanel = document.getElementById('citizen-session-panel');
  const lockPanel = document.getElementById('citizen-lock-panel');
  const workspace = document.getElementById('citizen-case-workspace');
  const shell = document.getElementById('citizens-page-shell');

  if (!loginForm || !sessionPanel || !lockPanel || !workspace) return;

  const ready = Boolean(session?.id);
  loginForm.style.display = ready ? 'none' : 'block';
  sessionPanel.style.display = ready ? 'block' : 'none';
  lockPanel.style.display = ready ? 'none' : 'flex';
  workspace.style.display = ready ? 'grid' : 'none';
  shell?.classList.toggle('citizen-ready', ready);

  if (ready) {
    const displayName = session.id.includes('@') ? session.id.split('@')[0] : session.id;
    setText('citizen-session-name', displayName || 'Citizen');
    setText('citizen-session-id', session.id);
    setText('citizen-session-mini', `Logged in as ${displayName || 'Citizen'}`);
  }

  renderCitizenCases();
}

function fillCitizenDemo() {
  const id = document.getElementById('citizen-login-id');
  const password = document.getElementById('citizen-login-password');
  if (id) id.value = 'citizen@example.com';
  if (password) password.value = 'nyaysetu123';
}

function citizenLogin(btn) {
  const form = document.getElementById('citizen-login-form');
  const idInput = document.getElementById('citizen-login-id');
  const passInput = document.getElementById('citizen-login-password');
  const citizenId = idInput?.value.trim() || '';
  const password = passInput?.value.trim() || '';

  [idInput, passInput].forEach(input => {
    if (input) input.style.borderColor = input.value.trim() ? '' : 'var(--danger)';
  });

  if (!citizenId || !password) {
    showFormNote(form, btn, 'Please enter your citizen ID and password.', 'var(--danger)');
    return;
  }

  localStorage.setItem(CITIZEN_SESSION_KEY, JSON.stringify({
    id: citizenId,
    loggedInAt: new Date().toISOString()
  }));
  localStorage.setItem('nyaysetu_active_role', 'citizen');
  btn.textContent = 'Opening case form...';

  window.setTimeout(() => {
    btn.textContent = 'Login & Open Case Form';
    setCitizenPageState();
  }, 250);
}

function citizenLogout() {
  localStorage.removeItem(CITIZEN_SESSION_KEY);
  setCitizenPageState();
}

function citizenField(id) {
  return document.getElementById(id)?.value.trim() || '';
}

function collectCitizenCase() {
  const evidence = document.getElementById('citizen-case-evidence');
  return {
    name: citizenField('citizen-full-name'),
    phone: citizenField('citizen-phone'),
    title: citizenField('citizen-case-title'),
    category: citizenField('citizen-case-category'),
    location: citizenField('citizen-case-location'),
    urgency: citizenField('citizen-case-urgency'),
    language: citizenField('citizen-case-language') || selectedLanguage || 'English',
    budget: citizenField('citizen-case-budget'),
    summary: citizenField('citizen-case-summary'),
    evidence: Array.from(evidence?.files || []).map(file => file.name)
  };
}

function updateCitizenLiveBrief() {
  const data = collectCitizenCase();
  const title = data.title || 'Case brief waiting';
  const meta = [data.category, data.urgency, data.location].filter(Boolean).join(' · ') || 'Complete the form to preview category, urgency, and location.';
  setText('citizen-live-title', title);
  setText('citizen-live-meta', meta);
}

function validateCitizenCase(data) {
  const requiredIds = [
    'citizen-full-name',
    'citizen-phone',
    'citizen-case-title',
    'citizen-case-category',
    'citizen-case-location',
    'citizen-case-urgency',
    'citizen-case-budget',
    'citizen-case-summary'
  ];
  let valid = true;

  requiredIds.forEach(id => {
    const input = document.getElementById(id);
    const missing = !input?.value.trim();
    if (input) input.style.borderColor = missing ? 'var(--danger)' : '';
    if (missing) valid = false;
  });

  const consent = document.getElementById('citizen-case-consent');
  if (!consent?.checked) valid = false;
  return valid && data.summary.length >= 20;
}

function saveCitizenCaseLocal(caseData) {
  const saved = getCitizenCases();
  saved.unshift(caseData);
  localStorage.setItem(CITIZEN_CASES_KEY, JSON.stringify(saved.slice(0, 20)));
}

function renderCitizenCases() {
  const list = document.getElementById('citizen-submitted-list');
  const session = getCitizenSession();
  if (!list || !session) return;

  const cases = getCitizenCases().filter(item => item.citizenId === session.id).slice(0, 3);
  const countNode = document.querySelector('.citizen-session-grid strong');
  if (countNode) countNode.textContent = String(cases.length);

  list.innerHTML = cases.map(item => `
    <div class="citizen-submitted-case">
      <strong>${escapeHtml(item.title)}</strong>
      <span>${escapeHtml(item.category)} · ${escapeHtml(item.status)} · ${escapeHtml(item.createdAtLabel)}</span>
    </div>
  `).join('');
}

function clearCitizenCaseForm() {
  [
    'citizen-full-name',
    'citizen-phone',
    'citizen-case-title',
    'citizen-case-category',
    'citizen-case-location',
    'citizen-case-urgency',
    'citizen-case-budget',
    'citizen-case-summary'
  ].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.value = '';
      input.style.borderColor = '';
    }
  });

  const evidence = document.getElementById('citizen-case-evidence');
  const consent = document.getElementById('citizen-case-consent');
  if (evidence) evidence.value = '';
  if (consent) consent.checked = false;
  updateCitizenLiveBrief();
}

async function citizenCaseSubmit(btn) {
  const session = getCitizenSession();
  const card = btn.closest('.citizen-submit-card');
  if (!session) {
    showFormNote(document.getElementById('citizen-login-form'), document.querySelector('#citizen-login-form .btn-join'), 'Please log in before submitting a case.', 'var(--danger)');
    return;
  }

  const data = collectCitizenCase();
  if (!validateCitizenCase(data)) {
    showFormNote(card, btn, 'Please complete all required case details, add at least 20 characters, and confirm accuracy.', 'var(--danger)');
    return;
  }

  const originalText = btn.textContent;
  btn.textContent = 'Submitting case...';
  btn.disabled = true;

  const problemText = [
    data.title,
    `Category: ${data.category}`,
    `Location: ${data.location}`,
    `Urgency: ${data.urgency}`,
    `Preferred language: ${data.language}`,
    `Consultation budget: ${data.budget}`,
    data.evidence.length ? `Evidence files: ${data.evidence.join(', ')}` : 'Evidence files: none uploaded in UI',
    '',
    data.summary
  ].join('\n');

  let savedToServer = false;
  let userId = 0;

  if (!userId && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(session.id)) {
    try {
      const result = await postToApi('/users', {
        name: data.name,
        email: session.id.toLowerCase(),
        phone: data.phone,
        role: 'user'
      });
      userId = result.user?.id;
      if (userId) localStorage.setItem('nyaysetu_current_user_id', userId);
      localStorage.setItem('nyaysetu_current_user_role', 'user');
    } catch (error) {
      if (error.status && error.status !== 409) {
        btn.textContent = originalText;
        btn.disabled = false;
        showFormNote(card, btn, error.message, 'var(--danger)');
        return;
      }
    }
  }

  if (userId) {
    try {
      await postToApi('/queries', {
        user_id: userId,
        problem_text: problemText,
        category: data.category || detectCaseFromText(problemText)
      });
      savedToServer = true;
    } catch (error) {
      console.info('Citizen case was not saved to the backend:', error.message);
    }
  }

  saveCitizenCaseLocal({
    ...data,
    citizenId: session.id,
    problemText,
    status: savedToServer ? 'Saved to SQL' : 'Saved locally',
    createdAt: new Date().toISOString(),
    createdAtLabel: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
  });

  btn.textContent = savedToServer ? 'Case Saved to SQL!' : 'Case Saved Locally!';
  btn.style.background = 'var(--success)';
  showFormNote(card, btn, savedToServer
    ? 'Your case has been saved and added to the NyaySetu review queue.'
    : 'The backend is not available for this login, so the case was saved in this browser.',
    savedToServer ? 'var(--success)' : 'var(--warn)');
  renderCitizenCases();

  window.setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.disabled = false;
    clearCitizenCaseForm();
  }, 700);
}

function initCitizenPage() {
  setCitizenPageState();
  [
    'citizen-case-title',
    'citizen-case-category',
    'citizen-case-location',
    'citizen-case-urgency',
    'citizen-case-summary'
  ].forEach(id => {
    document.getElementById(id)?.addEventListener('input', updateCitizenLiveBrief);
    document.getElementById(id)?.addEventListener('change', updateCitizenLiveBrief);
  });
}

const FUTURE_SCOPE = {
  smartLawyerMatching:
    'Future: rank lawyers using case category, city, language, budget, urgency, availability, and verified success history.',
  backendIntegration:
    'Future: move AI calls, authentication, chat history, document storage, and admin moderation to Firebase/Node backend.',
  payments:
    'Future: add Razorpay/Stripe checkout, invoices, refunds, and lawyer payout records after backend verification.',
  realtimeLawyerChat:
    'Future: enable secure real-time lawyer chat with case summaries, consent, file sharing, and audit logs.',
  caseTracking:
    'Future: create case status pipeline: Drafted -> Sent -> Lawyer Reviewing -> Action Needed -> Closed.'
};

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
// chat textarea input tracking
document.getElementById('chat-input').addEventListener('input', function() {
  document.getElementById('send-btn').disabled = !this.value.trim();
});
applyTheme(localStorage.getItem('nyaysetu_theme') || 'night');
initCitizenPage();
// Language is initialized by translations.js.
