/* ══════════════════════════════════════
   PAGE ROUTER
══════════════════════════════════════ */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const page = document.getElementById('page-' + name);
  if (page) page.classList.add('active');
  const navBtn = [...document.querySelectorAll('.nav-link')].find(b => b.textContent.toLowerCase().includes(name === 'home' ? 'home' : name === 'docs' ? 'doc' : name === 'simplifier' ? 'simp' : name === 'students' ? 'stud' : name === 'about' ? 'about' : ''));
  if (navBtn) navBtn.classList.add('active');
  window.scrollTo(0, 0);
}

/* ══════════════════════════════════════
   LANGUAGE TOGGLE
══════════════════════════════════════ */
let uiLang = 'en';
let selectedLanguage = 'English';
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
function isHindiLanguage(value) {
  return /^(hindi|हिन्दी|हिंदी)$/i.test(value.trim());
}
function setLang() {
  const input = document.getElementById('lang-select');
  const value = input?.value.trim() || 'English';
  selectedLanguage = value;
  uiLang = isHindiLanguage(value) ? 'hi' : 'en';
  const l = LANG[uiLang];
  document.getElementById('chat-input').placeholder = l.chatPh;
  document.getElementById('chat-disclaimer').textContent = l.disclaimer;
  document.getElementById('welcome-title').textContent = l.welcomeTitle;
  document.getElementById('welcome-sub').textContent = l.welcomeSub;
  document.getElementById('chat-status').textContent = l.status;
  document.getElementById('lang-note').textContent = `Responses will be provided in ${selectedLanguage}. Use the top selector to choose another language.`;
  if (input) input.value = selectedLanguage;
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
  } else {
    panel.style.display = 'none';
  }
}

/* ══════════════════════════════════════
   CHAT ENGINE
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

Always be empathetic, clear, and avoid jargon. If the user writes in Hindi, respond in Hindi. Keep it practical and actionable.`;

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
  const welcome = document.getElementById('chat-welcome');
  if (welcome) welcome.remove();

  appendBubble('user', text);
  chatHistory.push({ role: 'user', content: text });

  isLoading = true;
  showTyping();

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: LEGAL_SYSTEM_PROMPT + '\n\nIMPORTANT: Respond in ' + (selectedLanguage || 'English') + ' as the user has selected that language.',
        messages: chatHistory,
      })
    });
    const data = await res.json();
    const reply = data.content?.[0]?.text || 'Sorry, I could not process that. Please try again.';

    hideTyping();
    chatHistory.push({ role: 'assistant', content: reply });
    appendBubble('bot', reply);

    // Detect deadline
    const deadlineMatch = reply.match(/(\d+)\s*day[s]?/i);
    if (deadlineMatch && !detectedDeadline) {
      detectedDeadline = parseInt(deadlineMatch[1]);
      appendDeadlineBanner(detectedDeadline);
    }

    // Auto-generate case summary after 2+ exchanges
    if (chatHistory.filter(m => m.role === 'user').length >= 2 && !caseSummary) {
      generateCaseSummary();
    }

    // ★ THE KEY FEATURE: Connect with Lawyer button ★
    appendLawyerButton();

  } catch (err) {
    hideTyping();
    appendBubble('bot', 'Connection error. Please check your internet and try again.\n\n(Note: This demo requires an Anthropic API connection. The full UI, all pages, document generation, and features are fully functional.)');
    appendLawyerButton();
  }

  isLoading = false;
}

function appendBubble(role, text) {
  const msgs = document.getElementById('chat-messages');
  const row = document.createElement('div');
  row.className = `msg-row ${role}`;
  const formatted = formatBotText(text);
  row.innerHTML = `
    <div class="msg-avatar ${role}">${role === 'bot' ? '⚖' : 'U'}</div>
    <div class="msg-bubble ${role}">${formatted}</div>
  `;
  msgs.appendChild(row);
  msgs.scrollTop = msgs.scrollHeight;
}

function formatBotText(text) {
  // Convert **bold** to <strong>, preserve newlines
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
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
  wrap.innerHTML = `<button class="lawyer-connect-btn" onclick="openLawyerModal('${detected || ''}')">
    👨‍⚖️ Connect with a Lawyer <span class="lcb-arrow">→</span>
  </button>`;
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
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: 'Extract a case summary from the conversation. Return ONLY valid JSON with keys: problem (string, max 80 chars), keyFacts (array of max 4 strings), suggestedAction (string), caseType (one of: Criminal, Civil, Consumer, Family, Property, Employment, Cyber). No markdown, no explanation, pure JSON only.',
        messages: chatHistory,
      })
    });
    const data = await res.json();
    const raw = (data.content?.[0]?.text || '').replace(/```json|```/g, '').trim();
    caseSummary = JSON.parse(raw);
    appendCaseSummaryBanner();
  } catch (_) {}
}

function appendCaseSummaryBanner() {
  if (!caseSummary) return;
  const msgs = document.getElementById('chat-messages');
  const b = document.createElement('div');
  b.className = 'chat-banner info';
  b.innerHTML = `<div>
    <strong>📋 Case Summary Generated</strong> — <span class="badge badge-blue">${caseSummary.caseType}</span><br>
    <span style="font-size:12px">${caseSummary.problem}</span>
  </div>
  <button class="banner-action info" onclick="openLawyerModal('${caseSummary.caseType}')">Find Lawyers →</button>`;
  msgs.appendChild(b);
  msgs.scrollTop = msgs.scrollHeight;
}

function newChat() {
  chatHistory = []; caseSummary = null; detectedDeadline = null; reminderSet = false; evidenceFiles = [];
  const msgs = document.getElementById('chat-messages');
  msgs.innerHTML = `<div class="chat-welcome" id="chat-welcome">
    <div class="chat-welcome-icon">⚖</div>
    <div class="chat-welcome-title">${LANG[uiLang].welcomeTitle}</div>
    <p class="chat-welcome-sub">${LANG[uiLang].welcomeSub}</p>
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
  if (/cyber|online fraud|hacking|phishing|it act|sextortion/.test(text)) return 'Cybercrime';
  if (/fir|police|arrest|bail|ipc|crime|criminal/.test(text)) return 'Criminal';
  if (/property|land|rent|landlord|tenant|rera|deposit/.test(text)) return 'Property';
  if (/divorce|custody|498a|domestic|maintenance|marriage/.test(text)) return 'Family';
  if (/consumer|refund|defect|e-commerce|product|service failure/.test(text)) return 'Consumer';
  if (/salary|employment|job|termination|employer|labour|pf/.test(text)) return 'Employment';
  return null;
}

/* Voice input */
function startVoice() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { alert('Voice input not supported in this browser. Try Chrome.'); return; }
  const r = new SR();
  const recogLang = isHindiLanguage(selectedLanguage) ? 'hi-IN' : 'en-IN';
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
    evidenceFiles.map(f => `<span class="evidence-file">${f.name}</span>`).join(' ');
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
    return `
      <div class="lm-card" id="lm-card-${l.id}">
        <div class="lm-card-top">
          <div class="lm-avatar">${l.init}</div>
          <div class="lm-card-info">
            <div class="lm-card-name">
              ${l.name}
              ${l.verified ? '<span class="lm-verified">✓ Verified</span>' : ''}
            </div>
            <div class="lm-card-qual">${l.qual} · ${l.exp}y exp · ${l.loc}</div>
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
        <div class="lm-tags">${l.spec.map(s => `<span class="lm-tag">${s}</span>`).join('')}</div>
        <div class="lm-bio">${l.bio}</div>
        <div id="lm-actions-${l.id}">
          ${booked
            ? `<div class="lm-booked">✓ Appointment requested — ${l.name} will contact you within 24 hrs.</div>`
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
  document.getElementById(`lm-actions-${id}`).innerHTML =
    `<div class="lm-booked">✓ Appointment requested — ${lawyer.name} will contact you within 24 hrs. Case summary ${caseSummary ? 'auto-sent.' : 'not yet generated (chat more to generate).'}</div>`;
}

function sendCase(id, btn) {
  const lawyer = LAWYERS.find(l => l.id === id);
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
   DOCUMENT GENERATOR
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

I, ${f.applicantName || '______'}, resident of ${f.applicantAddress || '______'}, hereby request the following information under Section 6(1) of the RTI Act, 2005:

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
}

function buildDocForm(type) {
  const schema = DOC_SCHEMAS[type];
  let html = '';
  schema.fields.forEach(f => {
    html += `<div class="form-group">
      <label class="form-label">${f.label}</label>`;
    if (f.type === 'textarea') {
      html += `<textarea class="form-textarea" id="df-${f.id}" rows="3" placeholder="${f.placeholder||''}"></textarea>`;
    } else {
      html += `<input class="form-input" id="df-${f.id}" type="${f.type}" placeholder="${f.placeholder||''}"/>`;
    }
    html += `</div>`;
  });
  document.getElementById('doc-form-fields').innerHTML = html;
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
  preview.textContent = 'Generating with AI...';
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: 'You are a legal document assistant specialising in Indian law. The user provides a draft document. Improve it to be more formal, precise, and court-ready while keeping the same structure. Fill in any obvious blanks appropriately. Return ONLY the improved document text — no commentary, no markdown code blocks.',
        messages: [{ role:'user', content:`Improve this document draft:\n\n${draft}` }]
      })
    });
    const data = await res.json();
    const improved = data.content?.[0]?.text || draft;
    preview.textContent = improved;
  } catch (_) {
    preview.textContent = draft;
  }
  btn.disabled = false; btn.textContent = '✦ Generate Document';
}

function copyDoc() {
  const text = document.getElementById('doc-preview').textContent;
  navigator.clipboard?.writeText(text).then(() => {
    const btn = event.target;
    btn.textContent = '✓ Copied';
    setTimeout(() => btn.textContent = '📋 Copy', 1500);
  });
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
   SIMPLIFIER
══════════════════════════════════════ */
const SAMPLES = {
  ipc420: `Section 420 in The Indian Penal Code
420. Cheating and dishonestly inducing delivery of property.—Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, or anything which is signed or sealed, and which is capable of being converted into a valuable security, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.`,
  notice: `LEGAL NOTICE
Whereas you have failed to pay the outstanding dues of Rs. 50,000/- (Rupees Fifty Thousand Only) being the amount due and payable by you to our client in respect of the goods supplied and services rendered to you vide Invoice No. ABC-2024-567 dated 01.01.2024, and despite repeated oral and written demands, you have neglected and refused to pay the said amount.`,
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
  navigator.clipboard?.writeText(text);
}
async function reanalyse() { await simplifyText(); }

async function simplifyText() {
  const text = document.getElementById('simp-input').value.trim();
  if (!text) return;
  const btn = document.getElementById('simp-btn');
  btn.disabled = true; btn.textContent = 'Simplifying...';
  const start = Date.now();
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 700,
        system: `You are a legal simplifier for Indian citizens. Take complex legal text and explain it in plain, simple language. Structure your response as:

**What this means:**
(Plain language explanation — what this actually says)

**What you should do:**
(2-3 practical action steps)

**Your rights:**
(Any rights or protections this gives you or affects)

**Important deadlines:**
(Any time limits mentioned)

Be concise, friendly, and practical. No jargon.`,
        messages: [{ role:'user', content: text }]
      })
    });
    const data = await res.json();
    const reply = (data.content?.[0]?.text || 'Could not simplify. Try again.').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
    const elapsed = ((Date.now()-start)/1000).toFixed(1);
    document.getElementById('simp-output').innerHTML = reply;
    document.getElementById('simp-time').textContent = elapsed + 's';
    const outWords = document.getElementById('simp-output').textContent.trim().split(/\s+/).filter(Boolean).length;
    document.getElementById('simp-out-words').textContent = outWords + ' words read';
  } catch(e) {
    document.getElementById('simp-output').textContent = 'Error connecting. Please check your connection.';
  }
  btn.disabled = false; btn.textContent = '✦ Simplify →';
}

/* ══════════════════════════════════════
   STUDENTS
══════════════════════════════════════ */
function studTab(btn, tab) {
  document.querySelectorAll('.students-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.stud-tab-content').forEach(t => t.style.display = 'none');
  btn.classList.add('active');
  const el = document.getElementById('stud-' + tab);
  if (el) el.style.display = 'block';
  if (tab === 'queue' && !document.getElementById('queue-items').dataset.built) buildQueue();
  if (tab === 'leaderboard' && !document.getElementById('lb-tbody').dataset.built) buildLeaderboard();
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
}

function reviewAction(btn, action) {
  const card = btn.closest('div[style*="border:1px solid var(--border)"]');
  card.style.opacity = '.5'; card.style.pointerEvents = 'none';
  const notice = document.createElement('div');
  notice.style.cssText = 'margin-top:8px;font-size:12px;color:var(--success);font-weight:600';
  notice.textContent = `✓ ${action} — +15 pts earned`;
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
}

function joinSubmit(btn) {
  const form = btn.closest('.join-form');
  const inputs = form.querySelectorAll('input, select');
  let valid = true;
  inputs.forEach(i => { if (i.type !== 'text' || i.value.trim()) {} else valid = false; });
  btn.textContent = '✓ Application Submitted!';
  btn.style.background = 'var(--success)';
  btn.disabled = true;
  const note = document.createElement('div');
  note.style.cssText = 'margin-top:12px;font-size:13px;color:var(--success);font-weight:500';
  note.textContent = 'Thank you! Our team will review your application and reach out within 48 hours.';
  btn.after(note);
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
// chat textarea input tracking
document.getElementById('chat-input').addEventListener('input', function() {
  document.getElementById('send-btn').disabled = !this.value.trim();
});
setLang();