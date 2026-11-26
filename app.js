(function () {
'use strict';
const APP_VER = '8.9';
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const A = window.Android || null;
const WEB = !A;
const NOGATE = WEB || !!window.SB_LITE;
const IOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const STANDALONE = (window.navigator.standalone === true) || (window.matchMedia && matchMedia('(display-mode: standalone)').matches);

/* ---------- icons ---------- */
const I = {
  menu: '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>',
  close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-9.2-9.4C1.6 7.2 3.8 4 7.2 4c2 0 3.6 1.1 4.8 2.8C13.2 5.1 14.8 4 16.8 4c3.4 0 5.6 3.2 4.4 6.6C19.5 15.4 12 20 12 20z"/></svg>',
  save: '<svg viewBox="0 0 24 24"><path d="M6 3.8h12v17l-6-4.3-6 4.3z"/></svg>',
  book: '<svg viewBox="0 0 24 24"><path d="M12 6.5C10.3 5 7.8 4.3 4 4.3v14c3.8 0 6.3.7 8 2.2 1.7-1.5 4.2-2.2 8-2.2v-14c-3.8 0-6.3.7-8 2.2zM12 6.5v14"/></svg>',
  headphones: '<svg viewBox="0 0 24 24"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3.5" y="13.5" width="4" height="6.5" rx="1.5"/><rect x="16.5" y="13.5" width="4" height="6.5" rx="1.5"/></svg>',
  tags: '<svg viewBox="0 0 24 24"><path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1.2 1.2 0 0 1 0 1.7l-7 7a1.2 1.2 0 0 1-1.7 0z"/><circle cx="8" cy="8" r="1.5"/></svg>',
  speaker: '<svg viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
  stop: '<svg viewBox="0 0 24 24"><rect x="6.5" y="6.5" width="11" height="11" rx="2"/></svg>',
  share: '<svg viewBox="0 0 24 24"><path d="M21.5 3.5 10.2 13.8M21.5 3.5l-7 17.5-4.3-7.2-7.2-4.3z"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  timer: '<svg viewBox="0 0 24 24"><circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2.5 2M9.5 3h5"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1.3"/></svg>',
  unlock: '<svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.7"/><circle cx="12" cy="15.5" r="1.3"/></svg>',
  access: '<svg viewBox="0 0 24 24"><circle cx="12" cy="4.5" r="1.8"/><path d="M5 8.5l7 1.5 7-1.5M12 10v4.5l-3 6M12 14.5l3 6"/></svg>',
  alert: '<svg viewBox="0 0 24 24"><path d="M12 3.5 21 19.5H3z"/><path d="M12 10v4.5M12 17.2v.3"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z"/><path d="M9 12l2.2 2.2L15.5 10"/></svg>',
  cal: '<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4M8.5 14.5l2.2 2.2 4.6-4.6"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  pen: '<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg>',
  link: '<svg viewBox="0 0 24 24"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2"/></svg>',
  copy: '<svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8"/></svg>',
  sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg>',
  scroll: '<svg viewBox="0 0 24 24"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M9.5 9.5L12 7l2.5 2.5M9.5 14.5L12 17l2.5-2.5"/></svg>',
  bookplus: '<svg viewBox="0 0 24 24"><path d="M4 5.5A2 2 0 0 1 6 3.5h11v13H6a2 2 0 0 0-2 2z"/><path d="M4 18.5a2 2 0 0 0 2 2h11"/><path d="M10.5 7v6M7.5 10h6"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  dots: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
  heartFill: '<svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-9.2-9.4C1.6 7.2 3.8 4 7.2 4c2 0 3.6 1.1 4.8 2.8C13.2 5.1 14.8 4 16.8 4c3.4 0 5.6 3.2 4.4 6.6C19.5 15.4 12 20 12 20z"/></svg>',
  shuffle: '<svg viewBox="0 0 24 24"><path d="M16 4h4v4M4 20 20 4M20 16v4h-4M14.5 14.5 20 20M4 4l5 5"/></svg>'
};

/* ---------- data / indexing ---------- */
const BIB = { ro: window.BIBLE_RO, en: window.BIBLE_EN };
const BK = { ro: window.BOOKS_RO, en: window.BOOKS_EN };
const VC = window.VCOUNT;
const NB = VC.length;
const OFF = []; const bookStart = []; let TOTAL = 0;
for (let b = 0; b < NB; b++) { bookStart[b] = TOTAL; OFF[b] = []; for (let c = 0; c < VC[b].length; c++) { OFF[b][c] = TOTAL; TOTAL += VC[b][c]; } }
function ref(g) {
  let lo = 0, hi = NB - 1;
  while (lo < hi) { const m = (lo + hi + 1) >> 1; if (bookStart[m] <= g) lo = m; else hi = m - 1; }
  const b = lo; let c = 0; const o = OFF[b];
  lo = 0; hi = o.length - 1;
  while (lo < hi) { const m = (lo + hi + 1) >> 1; if (o[m] <= g) lo = m; else hi = m - 1; }
  c = lo;
  return { b, c, v: g - o[c] };
}
const G = (b, c, v) => OFF[b][c] + v;
const TAGRE = /\{([^|}]*)\|([\d.]+)\}/g;
const rawv = (g, l) => { const r = ref(g); return BIB[l][r.b][r.c][r.v]; };
const txt = (g, l) => { const a = altv(g, l); return a != null ? a : l === 'en' ? rawv(g, 'en').replace(TAGRE, '$1') : rawv(g, l); };
const isNT = g => ref(g).b >= 39;
function rich(g, l) {
  const alt = altv(g, l); if (alt != null) return alt.split(/([\p{L}\p{M}’'\-]+)/u).map((t, i) => i % 2 ? '<span class="w">' + esc(t) + '</span>' : esc(t)).join('');
  const raw = rawv(g, l);
  if (l === 'en') {
    const P = isNT(g) ? 'G' : 'H'; let out = '', last = 0, m; TAGRE.lastIndex = 0;
    while ((m = TAGRE.exec(raw))) { out += esc(raw.slice(last, m.index)); out += '<span class="w s" data-s="' + m[2].split('.').map(n => P + n).join(' ') + '">' + esc(m[1]) + '</span>'; last = m.index + m[0].length; }
    return out + esc(raw.slice(last));
  }
  return raw.split(/([\p{L}\p{M}’'\-]+)/u).map((t, i) => i % 2 ? '<span class="w">' + esc(t) + '</span>' : esc(t)).join('');
}
function origWords(g) {
  const raw = rawv(g, 'en'); const P = isNT(g) ? 'G' : 'H'; const out = []; let m; TAGRE.lastIndex = 0;
  while ((m = TAGRE.exec(raw))) m[2].split('.').forEach(n => { if (n !== '853') out.push({ en: m[1], s: P + n }); });
  return out;
}
const B36 = x => parseInt(x, 36);
function xrefs(g) { const s = (window.XREF || [])[g]; if (!s) return []; return s.split(',').map(t => { const [a, b] = t.split('-'); return { g: B36(a), span: b ? B36(b) : 0 }; }); }
function xlabel(x, l) { let s = slabel(x.g, l); if (x.span) { const r = ref(x.g + x.span), r0 = ref(x.g); s += r.c === r0.c ? '-' + (r.v + 1) : '–' + (r.c + 1) + ':' + (r.v + 1); } return s; }

const label = (g, l) => { const r = ref(g); return BK[l][r.b] + ' ' + (r.c + 1) + ':' + (r.v + 1); };
const BKA = { ro: ["Gen.", "Ex.", "Lev.", "Num.", "Deut.", "Ios.", "Jud.", "Rut", "1 Sam.", "2 Sam.", "1 Împ.", "2 Împ.", "1 Cron.", "2 Cron.", "Ezra", "Neem.", "Est.", "Iov", "Ps.", "Prov.", "Ecl.", "Cânt.", "Is.", "Ier.", "Plâng.", "Ezec.", "Dan.", "Osea", "Ioel", "Amos", "Obad.", "Iona", "Mica", "Naum", "Hab.", "Țef.", "Hag.", "Zah.", "Mal.", "Mat.", "Marc.", "Luca", "Ioan", "Fapt.", "Rom.", "1 Cor.", "2 Cor.", "Gal.", "Ef.", "Filip.", "Col.", "1 Tes.", "2 Tes.", "1 Tim.", "2 Tim.", "Tit", "Filim.", "Evr.", "Iac.", "1 Pet.", "2 Pet.", "1 Ioan", "2 Ioan", "3 Ioan", "Iuda", "Apoc."], en: ["Gen", "Exod", "Lev", "Num", "Deut", "Josh", "Judg", "Ruth", "1 Sam", "2 Sam", "1 Kgs", "2 Kgs", "1 Chr", "2 Chr", "Ezra", "Neh", "Esth", "Job", "Ps", "Prov", "Eccl", "Song", "Isa", "Jer", "Lam", "Ezek", "Dan", "Hos", "Joel", "Amos", "Obad", "Jonah", "Mic", "Nah", "Hab", "Zeph", "Hag", "Zech", "Mal", "Matt", "Mark", "Luke", "John", "Acts", "Rom", "1 Cor", "2 Cor", "Gal", "Eph", "Phil", "Col", "1 Thess", "2 Thess", "1 Tim", "2 Tim", "Titus", "Phlm", "Heb", "Jas", "1 Pet", "2 Pet", "1 John", "2 John", "3 John", "Jude", "Rev"] };
const slabel = (g, l) => { const r = ref(g); return BKA[l][r.b] + ' ' + (r.c + 1) + ':' + (r.v + 1); };
const VER = { ro: 'Cornilescu', en: 'KJV' };

/* ---------- storage ---------- */
const KEY = 'scrollBiblia.v1';
let S = { lang: 'ro', fs: 1, haptics: true, liked: {}, saved: {}, readPos: 0, days: {}, votd: '', recent: [], total: 0 };
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch (e) {}
const I18N = {"Instalează din setări": "Install from settings", "Capitolul": "Chapter", "Salvate (": "Saved (", "(ajută ca alerta să nu mai apară) sau": "(helps the alert stop appearing) or", "(sau Samsung)": "(or Samsung)", ". După instalare poți retrage permisiunea.": ". After installing you can revoke the permission.", "1 activ": "1 active", "1 oră": "1 hour", "5 psalmi pe zi, pentru rugăciune": "5 psalms a day, for prayer", "= nu poți da scroll prin postări, Reels sau Explore, dar intri liber la mesaje. Pe ecranul de pauză ai și butonul „Mergi la mesaje”.": "= you can't scroll through posts, Reels or Explore, but messages stay open. The pause screen also has a “Go to messages” button.", "Accesibilitate": "Accessibility", "Accesibilitate – opțional": "Accessibility – optional", "Activă": "Active", "Activă până la": "Active until", "Actualizări": "Updates", "Ai atins „": "You tapped “", "Alege ce vrei să citești. Butonul „Tematic” din dreapta te aduce aici oricând.": "Choose what you want to read. The “Topics” button on the right brings you here anytime.", "Alege motorul": "Choose the engine", "Alege versetul": "Choose the verse", "Altă înregistrare · text ușor modernizat": "Different recording · slightly modernized text", "Amprentă SHA-256": "SHA-256 fingerprint", "Apasă pe semnul de carte de pe un verset.": "Tap the bookmark on a verse.", "Apasă încă o dată pentru confirmare": "Tap once more to confirm", "Aplicații verificate": "Watched apps", "Aplicații verificate:": "Watched apps:", "Aplicațiile alese rămân blocate până la ora asta, fără deblocare prin citit.": "The chosen apps stay blocked until this time, with no unlocking by reading.", "Aplicațiile alese sunt verificate": "The chosen apps are being watched", "Ascultă cu narator": "Listen with narrator", "Ascultă cu vocea telefonului": "Listen with the phone's voice", "Atinge de două ori un verset.": "Double-tap a verse.", "Atinge un verset pentru trimiteri și cuvintele originale.": "Tap a verse for cross-references and original words.", "Bara e ascunsă – versetele se numără în continuare": "Bar hidden – verses are still being counted", "Biblia parcursă": "Bible read", "Biblia într-un an": "The Bible in a year", "Bifează planul": "Select this plan", "Bifează un plan: bara de jos și tabul": "Select a plan: the bottom bar and the", "Biserica primară și scrisorile apostolilor": "The early church and the apostles' letters", "Blocare": "Blocking", "Blocare aplicații de scrolling": "Block scrolling apps", "Blocare totală": "Full block", "Blocare totală până la": "Full block until", "Blocarea totală e oprită": "Full block is off", "Blocat până la": "Blocked until", "Blochează până atunci": "Block until then", "Blochează până la ora…": "Block until time…", "Boală și vindecare": "Sickness and healing", "Capitolul curent, citit de un om, sincronizat cu versetele · necesită internet": "Current chapter, read by a person, synced with the verses · needs internet", "Caută în": "Searching", "Caută și alege": "Search & browse", "Caută și alege carte/capitol": "Search & choose book/chapter", "Caută „Scroll Biblia – pauză de la scroll” → Pornit": "Find “Scroll Biblia – pauză de la scroll” → On", "Ce dorești să citești?": "What would you like to read?", "Ce folosește aplicația și de ce": "What the app uses and why", "Ce vede blocarea și ce nu": "What blocking sees and what it doesn't", "Citește de aici": "Read from here", "Citește tot capitolul": "Read the whole chapter", "Citește înainte de scurtmetraje": "Read before short videos", "Citești versete ca să deblochezi": "Read verses to unlock", "Citirea cu voce nu e disponibilă aici": "Read-aloud isn't available here", "Confidențialitate și pași de instalare sigură": "Privacy and safe install steps", "Confidențialitate și siguranță": "Privacy & safety", "Contează doar versetele la care stai minimum 3 secunde. Detectarea „doar Shorts / doar Reels” depinde de versiunea aplicației YouTube/Instagram; dacă nu prinde, alege varianta „toată aplicația”.": "Only verses you stay on for at least 3 seconds count. Detecting “Shorts only / Reels only” depends on the YouTube/Instagram version; if it misses, choose “whole app”.", "Continuă cu ziua": "Continue with day", "Copiat": "Copied", "Copiază politica": "Copy the policy", "Cornilescu revizuită 2024 (EDCR)": "Cornilescu revised 2024 (EDCR)", "Credință": "Faith", "Cum e tradus în KJV": "How the KJV translates it", "Cuvinte englezești folosite": "English words used", "Cât trebuie să treacă până primești iar minutele libere": "How long until you get free minutes again", "Călăuzire": "Guidance", "Cărți": "Books", "Dacă butonul e gri („Setare restricționată”): Info aplicație → meniul ⋮ (sus-dreapta) → „Permite setările restricționate”, apoi revino aici.": "If the switch is grey (“Restricted setting”): App info → ⋮ menu (top right) → “Allow restricted settings”, then come back here.", "Datele mele": "My data", "Datele tale rămân pe telefon": "Your data stays on your phone", "De la Matei la Apocalipsa, ~3 capitole pe zi": "Matthew to Revelation, ~3 chapters a day", "Deblocare pentru": "Unlock for", "Deblochează pentru": "Unlock for", "Deloc": "None", "Deschide": "Open", "Deschide setările de voce": "Open voice settings", "Doar Reels blocat": "Only Reels blocked", "Doar Shorts blocat": "Only Shorts blocked", "Doar pentru blocarea Reels/Shorts/feed. Nu citește mesaje, nu trimite nimic.": "Only for blocking Reels/Shorts/feed. Doesn't read messages, sends nothing.", "După ce ai citit": "After you've read", "Ebraică (VT)": "Hebrew (OT)", "Ebraică ·": "Hebrew ·", "Evangheliile în 30 de zile": "The Gospels in 30 days", "Faptele și Epistolele în 40 de zile": "Acts and the Epistles in 40 days", "Feed": "Feed", "Feed, Reels, Explore blocate · mesajele libere": "Feed, Reels, Explore blocked · messages open", "Frică": "Fear", "Fără cont, fără reclame, fără urmărire. Nimic nu e trimis nicăieri.": "No account, no ads, no tracking. Nothing is sent anywhere.", "Fără deblocare, pe o perioadă": "No unlocking, for a set time", "Fără timp liber – se blochează imediat": "No free time – blocks immediately", "Greacă (NT)": "Greek (NT)", "Greacă ·": "Greek ·", "Griji și neliniște": "Worry and anxiety", "Ieșire text în vorbire": "Text-to-speech output", "Info aplicație": "App info", "Info aplicație → ⋮ → Permite setările restricționate": "App info → ⋮ → Allow restricted settings", "Instagram – doar Reels": "Instagram – Reels only", "Instagram – toată aplicația": "Instagram – whole app", "Instalează doar fișiere cu această amprentă. Dacă e alta, nu e aplicația ta.": "Only install files with this fingerprint. If it's different, it isn't your app.", "Internet – doar pentru narator": "Internet – only for the narrator", "Intrare negăsită:": "Entry not found:", "Ispită": "Temptation", "Lipsește vocea engleză": "English voice missing", "Lipsește vocea română": "Romanian voice missing", "Mai e un pas:": "One more step:", "Mai multe detalii → Instalează oricum": "More details → Install anyway", "Minim 3 secunde pe fiecare": "At least 3 seconds each", "Minute libere": "Free minutes", "Mulțumire": "Thankfulness", "Mânie și răbdare": "Anger and patience", "Mărime text": "Text size", "Narator": "Audio", "Narator uman (YouVersion)": "Human narrator (YouVersion)", "Naratorul merge doar în aplicația de pe telefon": "The narrator only works in the phone app", "Naratorul nu a pornit": "The narrator didn't start", "Nicio apariție.": "No occurrences.", "Nicio voce instalată pentru această limbă.": "No voice installed for this language.", "Niciun verset apreciat încă.": "No liked verses yet.", "Nimic salvat încă.": "Nothing saved yet.", "Noul Testament în 90 de zile": "New Testament in 90 days", "Nu acum": "Not now", "Nu am reușit să pornesc înregistrarea din YouVersion pentru acest capitol.": "I couldn't start the YouVersion recording for this chapter.", "Nu citește": "Doesn't read", "Nu există trimiteri pentru acest verset.": "No cross-references for this verse.", "O dată/zi": "Once a day", "Oprește blocarea (apasă de 2 ori)": "Stop blocking (tap twice)", "Oprește temporar sunetul când apare ecranul de pauză": "Mutes sound briefly while the pause screen shows", "Oprit": "Off", "Oprit – atinge ca să-l pornești": "Off – tap to turn it on", "Pauza de la scroll e activă": "Scroll break is on", "Pauza de la scroll e oprită": "Scroll break is off", "Pauză de la scroll": "Scroll break", "Pași de instalare sigură": "Safe install steps", "Pe zilele săptămânii": "By day of week", "Permite setările restricționate": "Allow restricted settings", "Plan": "Plan", "Plan activ": "Active plan", "Plan activ:": "Active plan:", "Plan debifat – bara arată progresul în Biblie": "Plan unselected – the bar shows Bible progress", "Planuri": "Plans", "Planuri de citire": "Reading plans", "Play Protect: „Aplicație nescanată”": "Play Protect: “Unscanned app”", "Politica a fost copiată": "Policy copied", "Politica de confidențialitate": "Privacy policy", "Pornește pauza ca să te ajute": "Turn on the break so it can help you", "Pornește serviciul din Accesibilitate": "Turn on the service in Accessibility", "Primele 60 din": "First 60 of", "Primești": "You get", "Progres pe cărți": "Progress by book", "Progresul în Biblie": "Bible progress", "Protecție": "Protection", "Protecție activă": "Protection on", "Protecție oprită": "Protection off", "Proverbele în 31 de zile": "Proverbs in 31 days", "Psalmii în 30 de zile": "Psalms in 30 days", "Putere și tărie": "Strength", "Reels": "Reels", "Referință": "Reference", "Reguli de deblocare": "Unlock rules", "Reia planul de la zero": "Restart the plan", "Resetează": "Reset", "Restul aplicației merge offline": "The rest of the app works offline", "Română": "Romanian", "Română + English": "Romanian + English", "Română · Cornilescu": "Romanian · Cornilescu", "Rugăciune": "Prayer", "Salvat": "Saved", "Salvat ✓": "Saved ✓", "Salvează": "Save", "Samsung Auto Blocker": "Samsung Auto Blocker", "Scroll Biblia folosește serviciul de accesibilitate": "Scroll Biblia uses the accessibility service", "Scroll blocat · mesajele libere": "Scrolling blocked · messages open", "Scroll în feed blocat": "Feed scrolling blocked", "Se pregătesc vocile…": "Preparing voices…", "Se încarcă dicționarul…": "Loading dictionary…", "Semnificație și origine": "Meaning and origin", "Serviciu de accesibilitate": "Accessibility service", "Setări": "Settings", "Setări restricționate": "Restricted settings", "Setări voce Android": "Android voice settings", "Setări → Administrare generală →": "Settings → General management →", "Setări → Permite": "Settings → Allow", "Shorts": "Shorts", "Singurătate": "Loneliness", "Speranță": "Hope", "Statistici zilnice": "Daily stats", "Statistici și progres": "Stats & progress", "Stop": "Stop", "Strong": "Strong", "Sunt de acord – deschide Accesibilitate": "I agree – open Accessibility", "Sâ": "Sa", "Te oprește la TikTok, Shorts, Reels": "Stops you at TikTok, Shorts, Reels", "Telefonul nu are instalată vocea": "The phone doesn't have this voice installed:", "Tematic": "Topics", "Texte: Biblia Dumitru Cornilescu (română) și King James Version cu numere Strong (engleză). Dicționar: Strong’s Hebrew & Greek. Trimiteri: OpenBible.info (Treasury of Scripture Knowledge și voturi).": "Texts: Dumitru Cornilescu Bible (Romanian) and King James Version with Strong's numbers (English). Dictionary: Strong's Hebrew & Greek. Cross-references: OpenBible.info (Treasury of Scripture Knowledge and votes).", "Textul din aplicație": "Same text as the app", "Textul din aplicație · sincronizare cea mai bună": "Same text as the app · best sync", "Timp liber înainte de blocare": "Free time before blocking", "Timpul liber revine după": "Free time comes back after", "Toate": "All", "Toate datele au fost șterse": "All data deleted", "Toată": "Whole app", "Toată Biblia, în ordine, ~3–4 capitole pe zi": "The whole Bible in order, ~3–4 chapters a day", "Toată aplicația blocată": "Whole app blocked", "Totul se păstrează doar pe telefon; aplicația funcționează fără internet.": "Everything stays on the phone; the app works without internet.", "Trimite": "Share", "Distribuie": "Share", "Trimite pentru scanare": "Send for scanning", "Tristețe și mângâiere": "Sadness and comfort", "Un capitol de înțelepciune pe zi": "One chapter of wisdom a day", "Verifică internetul și încearcă din nou. Între timp poți asculta cu vocea telefonului, tot aici.": "Check your internet and try again. Meanwhile you can listen with the phone's voice, right here.", "Verifică originalul": "Verify the original", "Versete apreciate": "Liked verses", "Versete de citit": "Verses to read", "Versete pe teme": "Verses by topic", "Versete pe zi": "Verses per day", "Versete salvate": "Saved verses", "Versete salvate, progres, planuri, setări – doar pe acest telefon": "Saved verses, progress, plans, settings – only on this phone", "Versetul": "Verse", "Versetul zilei": "Verse of the day", "Versiunea": "Version", "Vibrație la atingere": "Haptic feedback", "Viteză": "Speed", "Voce pentru citire": "Read-aloud voice", "Vocea 1 · ton grav": "Voice 1 · deep tone", "Vocea 1 · ton mediu": "Voice 1 · medium tone", "Vocile sunt cele instalate pe telefon (Google/Samsung). Pentru voci mai naturale: Setări → Ieșire text în vorbire → Google → Instalați datele vocale → alege varianta de calitate înaltă.": "These are the voices installed on the phone (Google/Samsung). For more natural voices: Settings → Text-to-speech output → Google → Install voice data → pick the high-quality option.", "YouTube – doar Shorts": "YouTube – Shorts only", "YouVersion are o singură înregistrare pentru fiecare traducere, așa că alegi între înregistrări diferite. ▶ pornește naratorul cu ea de la versetul curent.": "YouVersion has one recording per translation, so you choose between recordings. ▶ starts that narrator from the current verse.", "Ziua": "Day", "Mai mult": "More", "activă": "on", "americană": "American", "amestecat, pentru tine": "mixed, for you", "australiană": "Australian", "azi": "today", "britanică": "British", "calitate înaltă · online": "high quality · online", "ce aplicație e deschisă": "which app is open", "deblocări azi": "unlocks today", "din fișier APK": "from an APK file", "din plan terminată!": "of the plan done!", "doar ca să te ajute să nu mai dai scroll fără sens.": "only to help you stop mindless scrolling.", "doar când alegi tu": "only when you choose", "ebraică": "Hebrew", "ecranul de pauză": "the pause screen", "engleză": "English", "engleză (KJV)": "English (KJV)", "greacă": "Greek", "indiană": "Indian", "indisponibilă în browser": "not available in browser", "mai jos, sună mai bărbătesc": "lower, sounds more masculine", "mesajele, nu salvează ce e pe ecran și": "messages, doesn't save what's on screen and", "min": "min", "min, apoi se blochează": "min, then it blocks", "minute după ce ai citit": "minutes after reading", "minute libere înainte de blocare": "free minutes before blocking", "nu trimite nimic": "sends nothing", "opriri azi": "stops today", "opriri total": "stops total", "oprită": "off", "pe internet.": "over the internet.", "pornește serviciul „Scroll Biblia – pauză de la scroll” din Accesibilitate.": "turn on the “Scroll Biblia – pauză de la scroll” service in Accessibility.", "puțin mai jos": "slightly lower", "până": "until", "record zile": "best streak", "rezultate": "results", "română": "Romanian", "română (Cornilescu)": "Romanian (Cornilescu)", "română + engleză": "Romanian + English", "verset azi": "verse today", "versete": "verses", "versete azi": "verses today", "versete diferite parcurse": "different verses read", "versete total": "verses total", "versete/zi · total în perioadă:": "verses/day · period total:", "zi": "day", "zi la rând": "day streak", "zile": "days", "zile de recuperat": "days to catch up", "zile la rând": "day streak", "zile ·": "days ·", "· Biblia": "· Bible", "· Strong": "· Strong", "· acum mai ai până la": "· you now have until", "· apare în": "· appears in", "· azi ar fi ziua": "· today would be day", "· diacriticele nu contează · sau alege cartea de mai jos": "· diacritics don't matter · or choose a book below", "· instalată": "· installed", "· oprit": "· off", "· pornit": "· on", "· ziua": "· day", "· între": "· between", "Îmbărbătare": "Encouragement", "Îmi place": "Like", "Înainte să pornești blocarea": "Before you turn on blocking", "Încearcă din nou": "Try again", "Început:": "Started:", "Înțelepciune": "Wisdom", "îți arată progresul lui. Fără plan bifat, bara arată progresul în toată Biblia.": "tab show its progress. With no plan selected, the bar shows progress through the whole Bible.", "Șterge toate datele (apasă de 2 ori)": "Delete all data (tap twice)", "Șterge versetele salvate, progresul, statisticile, planurile și setările de blocare. Textele Bibliei rămân.": "Deletes saved verses, progress, stats, plans and blocking settings. The Bible texts stay.", "și": "and", "și apasă „Înapoi” sau „Mesaje”": "and taps “Back” or “Messages”", "și, în TikTok / Instagram / YouTube / Facebook, dacă ești pe Reels, Shorts, feed sau mesaje.": "and, in TikTok / Instagram / YouTube / Facebook, whether you're on Reels, Shorts, feed or messages.", "Ține apăsat pe 🎧 Audio oricând ca să revii aici.": "Long-press 🎧 Audio anytime to come back here.", "Ține apăsat pe 🔊 oricând ca să schimbi vocea. Atinge ▶ ca s-o asculți.": "Long-press 🔊 anytime to change the voice. Tap ▶ to hear it.", "– Android întreabă dacă aplicația din care deschizi fișierul (ex. Fișierele mele) poate instala. Apasă": "– Android asks whether the app you open the file from (e.g. My Files) may install. Tap", "– Setări → Aplicații → Scroll Biblia → ⋮ →": "– Settings → Apps → Scroll Biblia → ⋮ →", "– apare la orice aplicație din afara magazinului. Alege": "– shows for any app from outside the store. Choose", "– dacă blochează instalarea: Setări → Securitate și confidențialitate → Auto Blocker → oprește temporar.": "– if it blocks the install: Settings → Security and privacy → Auto Blocker → turn off temporarily.", "– instalează versiunea nouă peste cea veche. Amprenta de mai jos rămâne aceeași, deci datele tale se păstrează.": "– install the new version over the old one. The fingerprint below stays the same, so your data is kept.", "”. Alege cuvântul corespunzător din lista de mai jos (textul românesc nu e aliniat cuvânt cu cuvânt cu originalul).": "”. Pick the matching word from the list below (the Romanian text isn't aligned word-by-word with the original).", "„Doar Shorts / doar Reels” depinde de versiunea YouTube/Instagram. Dacă nu prinde, alege Instagram – toată aplicația.": "“Shorts only / Reels only” depends on the YouTube/Instagram version. If it misses, choose Instagram – whole app.", "„Instalare din surse necunoscute”": "“Install unknown apps”", "„Setare restricționată” la Accesibilitate": "“Restricted setting” for Accessibility", "↺ Îl poți opri oricând din Setări → Accesibilitate.": "↺ You can turn it off anytime in Settings → Accessibility.", "⏱ 1 oră": "⏱ 1 hour", "⏱ 3 ore": "⏱ 3 hours", "⏱ 30 min": "⏱ 30 min", "▶ Începe": "▶ Starts", "⚙ → Instalați datele vocale →": "⚙ → Install voice data →", "⚠ Serviciul de accesibilitate nu e pornit": "⚠ The accessibility service is off", "✎ Alt număr de minute": "✎ Other number of minutes", "✎ Altă": "✎ Other", "✓ Afișează": "✓ Shows", "✓ Plan activ": "✓ Active plan", "✓ Pornit": "✓ On", "✓ Serviciul este activ": "✓ Service is on", "✓ Vede doar": "✓ Sees only", "✓ Ziua": "✓ Day", "✦ Versetul zilei": "✦ Verse of the day", "✨ Toate temele, amestecat": "✨ All topics, mixed", "🇷🇴 Română": "🇷🇴 Romanian", "🇷🇴 Română · Cornilescu": "🇷🇴 Romanian · Cornilescu", "🌅 Până la 7:00": "🌅 Until 7:00", "🌙 Până la 22:00": "🌙 Until 22:00", "🎧 Se pornește naratorul…": "🎧 Starting the narrator…", "📅 Toată ziua": "📅 All day", "🔊 Citire cu voce –": "🔊 Read aloud –", "🔒 Blocat până la": "🔒 Blocked until", "🔒 până": "🔒 until", "🕐 Până la ora…": "🕐 Until time…", "3 ore": "3 hours", "Alege un plan de citire": "Choose a reading plan", "Alege vocea": "Choose the voice", "Cap.": "Ch.", "‹ Cap.": "‹ Ch.", "Cuvinte originale –": "Original words –", "Dragoste": "Love", "Familie": "Family", "Iertare": "Forgiveness", "Niciun rezultat.": "No results.", "Noul Testament": "New Testament", "Vechiul Testament": "Old Testament", "Pace": "Peace", "Scos din salvate": "Removed from saved", "Statistici": "Stats", "Statistici resetate": "Stats reset", "Unde mai apare": "Where else it appears", "Versetele mele": "My verses", "Vocea": "Voice", "Vocea naratorului": "Narrator voice", "din": "of", "din Biblie": "of the Bible", "din magazin": "from a store", "din plan": "of plan", "minute": "minutes", "plan": "plan", "Apreciate (": "Liked (", "Trimiteri (": "Cross-references (", "Ambele": "Both", "Neverificat": "Not watched", "Bucurie": "Joy", "Audio": "Audio", "Progres resetat": "Progress reset", "Bravo! Ai citit": "Well done! You read", "deblocat": "unlocked", "Caută": "Search", "Meniu": "Menu", "Citește": "Read", "trimiteri": "cross-refs", "Permisiuni": "Permissions", "Date salvate local": "Data stored locally", "Sunet": "Sound", "Medie:": "Average:", "toate": "all"};
const UI_EN = S.uiLang === 'en';
const L = (ro, en) => UI_EN ? en : ro;
const PRI = UI_EN ? 'en' : 'ro', SEC = UI_EN ? 'ro' : 'en';

const I18N_PH = { 'Caută: cuvinte, carte, „Ioan 3:16”, „G25”': 'Search: words, book, “John 3:16”, “G25”' };
function trTxt(t) { const k = t.trim(); if (!k) return t; const v = I18N[k]; return v == null ? t : t.replace(k, v); }
function T(s) { if (!UI_EN || typeof s !== 'string') return s; return s.replace(/(^|>)([^<>]+)(?=<|$)/g, (m, a, t) => a + trTxt(t)).replace(/placeholder="([^"]*)"/g, (m, p) => 'placeholder="' + (I18N_PH[p] || p) + '"'); }
let saveT = 0;
function persist() { clearTimeout(saveT); saveT = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }, 250); }

const pad = n => (n < 10 ? '0' : '') + n;
const dayKey = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const today = () => dayKey(new Date());
function streak() {
  let n = 0; const d = new Date();
  if (!S.days[dayKey(d)]) d.setDate(d.getDate() - 1);
  while (S.days[dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

/* ---------- "Pentru tine" algorithm ---------- */
const CUR_RAW = [[42,3,16],[44,8,28],[49,4,13],[23,29,11],[19,3,5],[19,3,6],[22,41,10],[5,1,9],[18,23,1],[18,23,4],[18,46,1],[18,46,10],[39,6,33],[39,11,28],[39,11,29],[49,4,6],[49,4,7],[44,12,2],[44,15,13],[44,5,8],[44,6,23],[44,8,38],[44,8,39],[47,2,20],[48,2,8],[48,2,9],[57,11,1],[57,13,5],[58,1,5],[59,5,7],[61,1,9],[61,4,8],[61,4,19],[45,13,4],[45,13,13],[46,5,17],[46,12,9],[22,40,31],[22,26,3],[22,53,5],[24,3,22],[24,3,23],[18,27,1],[18,34,8],[18,37,4],[18,37,5],[18,91,1],[18,91,2],[18,103,2],[18,118,24],[18,119,105],[18,121,1],[18,121,2],[18,139,14],[18,145,18],[18,147,3],[19,16,3],[19,18,10],[19,22,6],[20,3,1],[34,3,18],[32,6,8],[1,14,14],[4,31,6],[42,1,1],[42,8,12],[42,10,10],[42,11,25],[42,14,1],[42,14,6],[42,14,27],[42,15,5],[42,15,13],[42,16,33],[39,5,14],[39,5,16],[39,7,7],[39,19,26],[39,28,20],[40,9,23],[40,10,27],[41,1,37],[41,6,31],[43,1,8],[47,5,22],[47,5,23],[47,6,9],[48,4,32],[48,6,10],[49,1,6],[49,4,8],[50,3,23],[51,5,16],[51,5,17],[51,5,18],[53,4,12],[54,1,7],[54,3,16],[57,4,12],[57,12,1],[58,4,8],[59,2,9],[61,3,1],[65,3,20],[65,21,4],[8,16,7],[13,7,14],[15,8,10],[16,4,14],[17,19,25],[22,43,2],[22,54,10],[22,55,8],[22,55,9],[23,31,3],[23,33,3],[25,36,26],[26,3,17],[35,3,17],[38,3,10],[45,10,13],[45,16,14],[46,4,18],[18,16,11],[18,19,14],[18,30,5],[18,32,8],[18,51,10],[18,62,1],[18,73,26],[18,84,11],[18,100,4]];
const CUR = CUR_RAW.filter(([b, c, v]) => VC[b] && VC[b][c - 1] >= v).map(([b, c, v]) => G(b, c - 1, v - 1));
window.__CUR_OK = CUR.length + '/' + CUR_RAW.length;

// chapters with genealogies / lists (1-based) to skip in random feed
const SKIP = { 0: [5, 10, 11, 36, 46], 3: [1, 2, 3, 4, 7, 26, 33, 34], 5: [12, 13, 15, 16, 17, 18, 19, 21], 12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 23, 24, 25, 26, 27], 14: [2, 8, 10], 15: [3, 7, 10, 11, 12], 1: [6, 25, 26, 27, 28, 30, 35, 36, 37, 38, 39], 2: [1, 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15], 25: [40, 41, 42, 43, 45, 46, 47, 48] };
const skipSet = new Set(); for (const b in SKIP) SKIP[b].forEach(c => skipSet.add(b + ':' + (c - 1)));
skipSet.add('39:0'); skipSet.add('41:2');
const BASEW = VC.map((_, b) => {
  if (b === 18) return 4; if (b === 19) return 2.5; if (b >= 39 && b <= 42) return 2.4; if (b >= 44 && b <= 64) return 2.6;
  if (b === 22) return 1.8; if (b === 65 || b === 43) return 1.2; if ([2, 3, 12, 13, 14, 15, 25].includes(b)) return .35; return .8;
});
function weights() {
  const w = BASEW.slice();
  for (const g in S.liked) { const r = ref(+g); w[r.b] += .35; }
  for (const g in S.saved) { const r = ref(+g); w[r.b] += .35; }
  return w;
}
const recentSet = new Set(S.recent);
function markRecent(g) { S.recent.push(g); recentSet.add(g); if (S.recent.length > 600) recentSet.delete(S.recent.shift()); }
function randomVerse() {
  const w = weights(); const sum = w.reduce((a, b) => a + b, 0);
  for (let tries = 0; tries < 60; tries++) {
    let x = Math.random() * sum, b = 0; while (x > w[b]) { x -= w[b]; b++; }
    b = Math.min(b, NB - 1);
    const c = Math.floor(Math.random() * VC[b].length);
    if (skipSet.has(b + ':' + c)) continue;
    const v = Math.floor(Math.random() * VC[b][c]);
    const g = G(b, c, v);
    if (recentSet.has(g)) continue;
    const t = BIB.ro[b][c][v]; const L = t.length;
    if (L < 45 || L > 300) continue;
    if (/^(și|Şi|Și)\b/i.test(t) && tries < 40) continue; // avoid verses that start mid-thought
    return g;
  }
  return Math.floor(Math.random() * TOTAL);
}
let fyCount = 0;
function nextForYou() {
  if (S.topic && TOPICS.find(t => t[0] === S.topic)) return nextTopic();
  fyCount++;
  if (fyCount % 5 === 0) {
    const pool = CUR.filter(g => !recentSet.has(g));
    if (pool.length) return { g: pool[Math.floor(Math.random() * pool.length)] };
  }
  return { g: randomVerse() };
}
function verseOfDay() {
  const d = new Date(); const n = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5) + d.getFullYear() * 7;
  return CUR[n % CUR.length];
}

/* ---------- reading plans ---------- */
const PLANS = [
  { id: 'an', t: T('Biblia într-un an'), d: T('Toată Biblia, în ordine, ~3–4 capitole pe zi'), books: [0, 66], days: 365 },
  { id: 'cron', t: L('Biblia cronologic într-un an', 'Chronological Bible in a year'), d: L('Toată Biblia în ordinea evenimentelor: Iov după Geneza 11, Psalmii lângă David, prorocii lângă împărații lor, epistolele în Faptele apostolilor', 'The whole Bible in the order events happened'), seq: [[0,1,11],[17,1,42],[0,12,50],[1,1,40],[2,1,27],[3,1,36],[4,1,34],[18,90,90],[5,1,24],[6,1,21],[7,1,4],[8,1,31],[12,1,10],[9,1,24],[12,11,29],[18,1,72],[10,1,11],[13,1,9],[19,1,31],[21,1,8],[20,1,12],[18,73,89],[10,12,22],[13,10,20],[11,1,8],[30,1,1],[28,1,3],[11,9,14],[13,21,25],[31,1,4],[29,1,9],[11,15,16],[13,26,28],[27,1,14],[22,1,39],[32,1,7],[11,17,20],[13,29,32],[18,91,110],[11,21,23],[13,33,35],[33,1,3],[35,1,3],[23,1,52],[34,1,3],[11,24,25],[13,36,36],[24,1,5],[25,1,48],[26,1,12],[22,40,66],[14,1,6],[36,1,2],[37,1,14],[18,111,150],[16,1,10],[14,7,10],[15,1,13],[38,1,4],[41,1,3],[39,1,4],[42,1,4],[40,1,16],[39,5,28],[41,4,24],[42,5,21],[43,1,14],[58,1,5],[47,1,6],[43,15,18],[51,1,5],[52,1,3],[43,19,19],[45,1,16],[46,1,13],[44,1,16],[43,20,28],[48,1,6],[49,1,4],[50,1,4],[56,1,1],[53,1,6],[55,1,3],[59,1,5],[57,1,13],[54,1,4],[60,1,3],[64,1,1],[61,1,5],[62,1,1],[63,1,1],[65,1,22]], days: 365 },
  { id: 'nt90', t: T('Noul Testament în 90 de zile'), d: T('De la Matei la Apocalipsa, ~3 capitole pe zi'), books: [39, 66], days: 90 },
  { id: 'ev30', t: T('Evangheliile în 30 de zile'), d: 'Matei, Marcu, Luca, Ioan', books: [39, 43], days: 30 },
  { id: 'fe40', t: T('Faptele și Epistolele în 40 de zile'), d: T('Biserica primară și scrisorile apostolilor'), books: [43, 65], days: 40 },
  { id: 'ps30', t: T('Psalmii în 30 de zile'), d: T('5 psalmi pe zi, pentru rugăciune'), books: [18, 19], days: 30 },
  { id: 'pr31', t: T('Proverbele în 31 de zile'), d: T('Un capitol de înțelepciune pe zi'), books: [19, 20], days: 31 }
];
const PCACHE = {};
function planData(id) {
  if (PCACHE[id]) return PCACHE[id];
  const P = PLANS.find(p => p.id === id); const ch = [];
  if (P.seq) P.seq.forEach(([b, c0, c1]) => { for (let c = c0 - 1; c < c1; c++) ch.push([b, c, VC[b][c]]); });
  else for (let b = P.books[0]; b < P.books[1]; b++) for (let c = 0; c < VC[b].length; c++) ch.push([b, c, VC[b][c]]);
  const tot = ch.reduce((a, x) => a + x[2], 0); const days = []; let i = 0, cum = 0;
  for (let d = 0; d < P.days; d++) {
    const left = P.days - d; const day = [];
    if (d === P.days - 1) { while (i < ch.length) { day.push(ch[i]); cum += ch[i++][2]; } }
    else {
      const target = tot * (d + 1) / P.days;
      do { day.push(ch[i]); cum += ch[i++][2]; } while (i < ch.length - (left - 1) && Math.abs(cum + ch[i][2] - target) < Math.abs(cum - target));
    }
    days.push(day);
  }
  const verses = [], dayOf = [], dayStart = [];
  days.forEach((day, d) => { dayStart.push(verses.length); day.forEach(([b, c, n]) => { for (let v = 0; v < n; v++) { verses.push(G(b, c, v)); dayOf.push(d); } }); });
  return PCACHE[id] = { P, days, verses, dayOf, dayStart };
}
function planState(id) { S.plans = S.plans || {}; return S.plans[id] || (S.plans[id] = { start: today(), done: {}, pos: 0 }); }
/* verses read *inside* the plan (since it started) – only these complete a day */
const PBITS = {};
function planBits(id) {
  if (PBITS[id]) return PBITS[id];
  const pd = planData(id), st = planState(id), n = Math.ceil(pd.verses.length / 8); const a = new Uint8Array(n);
  if (st.rb) { try { const bin = atob(st.rb); for (let i = 0; i < Math.min(n, bin.length); i++) a[i] = bin.charCodeAt(i); } catch (e) {} }
  return PBITS[id] = a;
}
function planIdx(id) { const pd = planData(id); if (!pd.idx) { pd.idx = new Map(); pd.verses.forEach((g, i) => pd.idx.set(g, i)); } return pd.idx; }
function planMark(id, g) {
  const i = planIdx(id).get(g); if (i == null) return -1;
  const a = planBits(id); if (!(a[i >> 3] & (1 << (i & 7)))) { a[i >> 3] |= 1 << (i & 7); let s2 = ''; for (let k = 0; k < a.length; k++) s2 += String.fromCharCode(a[k]); planState(id).rb = btoa(s2); }
  return planData(id).dayOf[i];
}
const planHas = (id, i) => !!(planBits(id)[i >> 3] & (1 << (i & 7)));
/* schedule status: 'done' | 'late' (overdue) | 'today' | 'ahead' */
function dayStatus(id, d) {
  const pd = planData(id), st = planState(id); if (dayStat(pd, st, d).done) return 'done';
  const cal = planCalendarDay(id) - 1; return d < cal ? 'late' : d === cal ? 'today' : 'ahead';
}
function planBehind(id) { const pd = planData(id), st = planState(id), cal = Math.min(planCalendarDay(id) - 1, pd.days.length); let n = 0; for (let d = 0; d < cal; d++) if (!dayStat(pd, st, d).done) n++; return n; }
function dayLabel(day, l) {
  const parts = []; let cur = null;
  day.forEach(([b, c]) => { if (cur && cur.b === b && cur.c2 === c - 1) cur.c2 = c; else { cur = { b, c1: c, c2: c }; parts.push(cur); } });
  return parts.map(x => BK[l][x.b] + ' ' + (x.c1 + 1) + (x.c2 > x.c1 ? '–' + (x.c2 + 1) : '')).join('; ');
}
function dayStat(pd, st, d) {
  const a = pd.dayStart[d], e = d + 1 < pd.days.length ? pd.dayStart[d + 1] : pd.verses.length; let r = 0;
  const id = pd.P.id; for (let i = a; i < e; i++) r += planHas(id, i) ? 1 : 0;
  return { read: st.done[d] ? e - a : r, tot: e - a, done: !!st.done[d] || r === e - a };
}
function planProgress(id) {
  const pd = planData(id), st = planState(id); let r = 0, dd = 0, first = -1;
  for (let d = 0; d < pd.days.length; d++) { const x = dayStat(pd, st, d); r += x.read; if (x.done) dd++; else if (first < 0) first = d; }
  return { p: pct(r, pd.verses.length), daysDone: dd, next: first < 0 ? pd.days.length - 1 : first, total: pd.days.length };
}
function planCalendarDay(id) { const st = planState(id); return Math.floor((new Date(today() + 'T12:00:00') - new Date(st.start + 'T12:00:00')) / 864e5) + 1; }

/* ---------- human narrator (YouVersion) ---------- */
const USFM = 'GEN EXO LEV NUM DEU JOS JDG RUT 1SA 2SA 1KI 2KI 1CH 2CH EZR NEH EST JOB PSA PRO ECC SNG ISA JER LAM EZK DAN HOS JOL AMO OBA JON MIC NAM HAB ZEP HAG ZEC MAL MAT MRK LUK JHN ACT ROM 1CO 2CO GAL EPH PHP COL 1TH 2TH 1TI 2TI TIT PHM HEB JAS 1PE 2PE 1JN 2JN 3JN JUD REV'.split(' ');
const NARR_VERS = {
  ro: [{ id: 191, ab: 'VDC', t: 'Cornilescu 1924 (VDC)', d: T('Textul din aplicație · sincronizare cea mai bună') }, { id: 2311, ab: 'EDCR', t: T('Cornilescu revizuită 2024 (EDCR)'), d: T('Altă înregistrare · text ușor modernizat') }],
  en: [{ id: 1, ab: 'KJV', t: 'King James Version (KJV)', d: T('Textul din aplicație') }]
};
function narrVer(l) { const k = (S.narrVer || {})[l]; return NARR_VERS[l].find(v => v.ab === k) || NARR_VERS[l][0]; }
function narratorUrl(g, l) { const r = ref(g); const v = narrVer(l); return 'https://www.bible.com/audio-bible/' + v.id + '/' + USFM[r.b] + '.' + (r.c + 1) + '.' + v.ab; }
function openNarrVoices() {
  const sec = l => '<div class="sec">' + (l === 'ro' ? T('🇷🇴 Română') : '🇬🇧 English') + '</div>' + NARR_VERS[l].map(v => { const on = narrVer(l).ab === v.ab; return '<div class="vrow ' + (on ? 'on' : '') + '" data-nl="' + l + '" data-nv="' + v.ab + '"><span class="chk">' + (on ? '✓' : '') + '</span><span class="bt"><b>' + v.t + '</b><small>' + v.d + '</small></span><button class="vplay" data-pl="' + l + '" data-pv="' + v.ab + '">▶</button></div>'; }).join('');
  const h = T('<p class="hint" style="margin-top:0">YouVersion are o singură înregistrare pentru fiecare traducere, așa că alegi între înregistrări diferite. ▶ pornește naratorul cu ea de la versetul curent.</p>') + sec('ro') + sec('en') + T('<p class="hint">Ține apăsat pe 🎧 Audio oricând ca să revii aici.</p>');
  openSheet(T('Vocea naratorului'), '<button class="btn" id="toSleep" style="margin-bottom:12px">' + I.moon + ' ' + L('Noapte bună · timer de somn', 'Good night · sleep timer') + '</button>' + h, body => {
    body.querySelector('#toSleep').onclick = () => openSleep(true);
    const pick = (l, ab) => { S.narrVer = S.narrVer || {}; S.narrVer[l] = ab; persist(); haptic(); };
    body.querySelectorAll('.vrow').forEach(r => r.onclick = e => { if (e.target.closest('.vplay')) return; pick(r.dataset.nl, r.dataset.nv); sheetStack.pop(); openNarrVoices(); if (NARR.on) { const g = curG(); narrStop(); narrStart(g); } });
    body.querySelectorAll('.vplay').forEach(b => b.onclick = () => { pick(b.dataset.pl, b.dataset.pv); if (b.dataset.pl === 'en') S.lang = 'en'; else if (S.lang === 'en') S.lang = 'ro'; persist(); const g = curG(); closeSheet(); if (NARR.on) narrStop(); narrStart(g); });
  }, sheetOpen());
}
const NARR = { on: false, b: -1, c: -1, base: 0, cum: [], tot: 1, intro: 2.5, d: 0, idx: -1, auto: false, seekTo: -1, loading: false };
function narrPrep(b, c) {
  const l = S.lang === 'en' ? 'en' : 'ro'; NARR.b = b; NARR.c = c; NARR.base = G(b, c, 0); NARR.lang = l;
  NARR.cum = [0]; for (let v = 0; v < VC[b][c]; v++) NARR.cum.push(NARR.cum[v] + txt(G(b, c, v), l).length + 14);
  NARR.tot = NARR.cum[NARR.cum.length - 1]; NARR.d = 0; NARR.idx = -1; NARR.loading = true;
}
const narrTime = i => NARR.intro + (NARR.d - NARR.intro) * NARR.cum[i] / NARR.tot;
function narrIdxAt(t) { if (t <= NARR.intro) return 0; const x = (t - NARR.intro) / Math.max(1, NARR.d - NARR.intro) * NARR.tot; let i = 0; while (i < NARR.cum.length - 2 && NARR.cum[i + 1] <= x) i++; return i; }
function narrStart(g) {
  if (!A || !A.narrStart) { toast(T('Naratorul merge doar în aplicația de pe telefon')); return; }
  if (TTS.on) ttsStop();
  const r = ref(g); NARR.on = true; narrPrep(r.b, r.c); NARR.seekTo = r.v;
  if (mode !== 'read' || curG() !== g) setMode('read', g); else refresh();
  A.narrStart(narratorUrl(g, NARR.lang));
  toast(T('🎧 Se pornește naratorul…'));
}
function narrStop() { NARR.on = false; try { A && A.narrStop && A.narrStop(); } catch (e) {} refresh(); }
window.onNarrFail = why => {
  if (!NARR.on) return; const g = curG(); const url = narratorUrl(g, NARR.lang); narrStop();
  openSheet(T('Naratorul nu a pornit'), T('<p class="wdef">Nu am reușit să pornesc înregistrarea din YouVersion pentru acest capitol.</p><p class="hint">Verifică internetul și încearcă din nou. Între timp poți asculta cu vocea telefonului, tot aici.') + (why ? ' (cod: ' + esc(String(why)) + ')' : '') + T('</p><button class="btn" id="nre">Încearcă din nou</button><button class="btn ghost" id="ntts">') + I.speaker + T(' Ascultă cu vocea telefonului</button>'), body => {
    body.querySelector('#ntts').onclick = () => { closeSheet(); if (S.lang === 'both') { S.lang = 'ro'; persist(); } ttsStart(); };
    body.querySelector('#nre').onclick = () => { closeSheet(); narrStart(g); };
  });
};
window.onNarrInfo = () => {};
window.onNarr = (t, d, playing, ended) => {
  if (!NARR.on) return;
  if (d > 0) { if (NARR.loading) { NARR.loading = false; toast('🎧 ' + BK[NARR.lang][NARR.b] + ' ' + (NARR.c + 1)); } NARR.d = d; }
  if (!NARR.d) return;
  if (NARR.seekTo > 0) { const st = narrTime(NARR.seekTo); NARR.seekTo = -1; A.narrSeek(st); NARR.idx = narrIdxAt(st); return; }
  NARR.seekTo = -1;
  if (ended || (NARR.d && t >= NARR.d - 0.3 && !playing)) { // next chapter
    if (SLEEP.on && SLEEP.chap > 0 && --SLEEP.left <= 0) { sleepEnd(); return; }
    let b = NARR.b, c = NARR.c + 1; if (c >= VC[b].length) { b++; c = 0; }
    if (b >= NB) { narrStop(); return; }
    narrPrep(b, c); const g = G(b, c, 0); NARR.auto = true; setMode('read', g); NARR.auto = false;
    A.narrStart(narratorUrl(g, NARR.lang)); return;
  }
  const idx = narrIdxAt(t); if (idx === NARR.idx) return; NARR.idx = idx;
  const target = NARR.base + idx; const cg = curG(); if (target === cg) return;
  NARR.auto = true;
  if (mode === 'read' && target === cg + 1) go(1); else { RD = { base: target, i: 0 }; if (mode !== 'read') setMode('read', target); else { refresh(); onShown(); } }
  NARR.auto = false;
};
/* ---------- Good night: listen with a sleep timer ---------- */
const SLEEP = { on: false, until: 0, chap: 0, left: 0, t: 0, iv: 0 };
function sleepLeftTxt() {
  if (!SLEEP.on) return '';
  if (SLEEP.until) { const m = Math.max(0, Math.ceil((SLEEP.until - Date.now()) / 60000)); return m + ' min'; }
  return SLEEP.left + ' ' + (SLEEP.left === 1 ? L('cap.', 'ch.') : L('cap.', 'ch.'));
}
function sleepStartG(what) {
  const d = new Date(), doy = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5);
  if (what === 'psa') return G(18, (doy - 1) % 150, 0);
  if (what === 'pro') return G(19, Math.min(30, d.getDate() - 1), 0);
  if (what === 'chap') { const r = ref(curG()); return G(r.b, r.c, 0); }
  return curG();
}
function openSleep(push) {
  const P = Object.assign({ what: 'cont', kind: 'min', min: 30, chap: 1, dim: true }, S.sleepPref || {});
  const opt = (k, v, t) => '<button data-' + k + '="' + v + '" class="' + (String(P[k === 'mn' ? 'min' : k === 'ch' ? 'chap' : k]) === String(v) && (k === 'what' || (k === 'mn' ? P.kind === 'min' : P.kind === 'chap')) ? 'sl-opt on' : 'sl-opt') + '">' + t + '</button>';
  const r0 = ref(curG());
  const h = (SLEEP.on ? '<div class="sleep-now">' + I.moon + '<div><b>' + L('Timer pornit', 'Timer running') + '</b><small>' + L('Se oprește în ', 'Stops in ') + sleepLeftTxt() + '</small></div><button class="btn ghost" id="slMore">+15 min</button><button class="btn" id="slStop">' + L('Oprește', 'Stop') + '</button></div>' : '') +
    '<div class="sec">' + L('Ce asculți', 'What to listen to') + '</div><div class="chips big sl-what">' +
      opt('what', 'cont', L('De unde am rămas', 'Where I left off') + '<small>' + esc(label(curG(), S.lang === 'en' ? 'en' : 'ro')) + '</small>') +
      opt('what', 'chap', L('Capitolul curent', 'Current chapter') + '<small>' + esc(BK[S.lang === 'en' ? 'en' : 'ro'][r0.b] + ' ' + (r0.c + 1)) + '</small>') +
      opt('what', 'psa', L('Psalmul zilei', 'Psalm of the day')) + opt('what', 'pro', L('Proverbele zilei', 'Proverbs of the day')) + '</div>' +
    '<div class="sec">' + L('Oprește după', 'Stop after') + '</div><div class="chips sl-dur">' +
      [15, 30, 45, 60, 90].map(m => opt('mn', m, m + ' min')).join('') + [1, 2, 3].map(c => opt('ch', c, c + (c === 1 ? L(' capitol', ' chapter') : L(' capitole', ' chapters')))).join('') + '</div>' +
    '<div class="row"><span>' + L('Ecran întunecat cu versetul', 'Dark screen with the verse') + '<br><small class="muted">' + L('Doar versetul curent, foarte discret', 'Only the current verse, very dim') + '</small></span><button class="sw ' + (P.dim ? 'on' : '') + '" id="slDim"></button></div>' +
    '<p class="hint">' + (WEB ? L('Pe iPhone citirea se face cu vocea telefonului.', 'On iPhone the phone voice reads.') : L('Ascultă cu naratorul. Sunetul scade încet la final, apoi se oprește.', 'Listens with the narrator. The sound fades out at the end, then stops.')) + ' ' + L('Poți închide ecranul telefonului.', 'You can turn the screen off.') + '</p>' +
    '<button class="btn" id="slGo" style="width:100%;margin-top:6px">' + I.moon + ' ' + (SLEEP.on ? L('Repornește', 'Restart') : L('Pornește', 'Start')) + '</button>';
  openSheet(L('Noapte bună 🌙', 'Good night 🌙'), h, body => {
    const save = () => { S.sleepPref = P; persist(); };
    body.querySelectorAll('[data-what]').forEach(b => b.onclick = () => { P.what = b.dataset.what; save(); body.querySelectorAll('[data-what]').forEach(x => x.classList.toggle('on', x === b)); hap(0); });
    const dur = () => body.querySelectorAll('.sl-dur button').forEach(x => x.classList.toggle('on', P.kind === 'min' ? x.dataset.mn == P.min : x.dataset.ch == P.chap));
    body.querySelectorAll('[data-mn]').forEach(b => b.onclick = () => { P.kind = 'min'; P.min = +b.dataset.mn; save(); dur(); hap(0); });
    body.querySelectorAll('[data-ch]').forEach(b => b.onclick = () => { P.kind = 'chap'; P.chap = +b.dataset.ch; save(); dur(); hap(0); });
    body.querySelector('#slDim').onclick = e => { P.dim = !P.dim; e.currentTarget.classList.toggle('on', P.dim); save(); };
    body.querySelector('#slGo').onclick = () => { closeSheet(); sleepStart(P); };
    const st = body.querySelector('#slStop'); if (st) st.onclick = () => { closeSheet(); sleepEnd(true); };
    const mo = body.querySelector('#slMore'); if (mo) mo.onclick = () => { sleepExtend(15); closeSheet(); };
  }, push && sheetOpen());
}
function sleepStart(P) {
  if (NARR.on) narrStop(); if (TTS.on) ttsStop();
  const g = sleepStartG(P.what);
  SLEEP.on = true; SLEEP.chap = P.kind === 'chap' ? P.chap : 0; SLEEP.left = SLEEP.chap;
  SLEEP.until = P.kind === 'min' ? Date.now() + P.min * 60000 : 0;
  clearTimeout(SLEEP.t);
  if (SLEEP.until) { try { A && A.narrSleep && A.narrSleep(P.min * 60000); } catch (e) {} SLEEP.t = setTimeout(() => { if (SLEEP.on && (WEB || !NARR.on || !A || !A.narrSleep)) sleepEnd(); }, P.min * 60000 + 1500); }
  if (S.lang === 'both') { S.lang = 'ro'; persist(); }
  setMode('read', g);
  if (WEB || !A || !A.narrStart) ttsStart(); else narrStart(g);
  hap(1); remLearn('sleep'); if (P.dim) sleepScreen(true); try { window.__awakePoke && __awakePoke(); } catch (e) {}
  clearInterval(SLEEP.iv); SLEEP.iv = setInterval(sleepTick, 1000); sleepTick();
}
function sleepExtend(min) {
  if (!SLEEP.on) return; if (!SLEEP.until) { SLEEP.left += 1; toast(L('+1 capitol', '+1 chapter')); return; }
  SLEEP.until += min * 60000; const ms = SLEEP.until - Date.now();
  try { A && A.narrSleep && A.narrSleep(ms); } catch (e) {} clearTimeout(SLEEP.t); SLEEP.t = setTimeout(() => { if (SLEEP.on && (WEB || !NARR.on)) sleepEnd(); }, ms + 1500);
  toast('+' + min + ' min'); sleepTick();
}
function sleepEnd(manual) {
  SLEEP.on = false; clearTimeout(SLEEP.t); clearInterval(SLEEP.iv);
  try { A && A.narrSleep && A.narrSleep(0); } catch (e) {}
  if (NARR.on) narrStop(); if (TTS.on) ttsStop();
  sleepScreen(false); const c = $('#sleepChip'); if (c) c.remove(); sleepBtn();
  if (!manual) toast(L('Noapte bună 🌙', 'Good night 🌙'));
}
window.onSleepEnd = () => { NARR.on = false; refresh(); sleepEnd(); };
function sleepBtn() { const b = $('#btnSleep'); if (!b) return; b.classList.toggle('on', SLEEP.on); b.innerHTML = I.moon + '<span>' + (SLEEP.on ? sleepLeftTxt() : L('Somn', 'Sleep')) + '</span>'; }
function sleepTick() {
  sleepBtn();
  if (!SLEEP.on) return;
  if (!NARR.on && !TTS.on && !NARR.loading) { /* audio stopped by user */ }
  let c = $('#sleepChip');
  const scr = $('#sleepScr');
  if (c) c.remove();
  if (scr && !scr.classList.contains('hidden')) {
    const l = S.lang === 'en' ? 'en' : 'ro', g = curG();
    scr.querySelector('.ss-v').textContent = txt(g, l); scr.querySelector('.ss-r').textContent = label(g, l) + ' · ⏾ ' + sleepLeftTxt();
  }
  if (SLEEP.until && Date.now() > SLEEP.until + 25000) sleepEnd();
}
function sleepScreen(on) {
  let s = $('#sleepScr');
  if (!on) { if (s) s.classList.add('hidden'); return; }
  if (!s) {
    s = document.createElement('div'); s.id = 'sleepScr';
    s.innerHTML = '<div class="ss-moon">' + I.moon + '</div><p class="ss-v"></p><div class="ss-r"></div><div class="ss-b"><button data-s="more">+15 min</button><button data-s="hide">' + L('Ascunde', 'Hide') + '</button><button data-s="stop">' + L('Oprește', 'Stop') + '</button></div>';
    document.body.appendChild(s);
    s.onclick = e => { const b = e.target.closest('[data-s]'); if (!b) { s.classList.toggle('show-b'); return; } const k = b.dataset.s; if (k === 'more') sleepExtend(15); else if (k === 'hide') { s.classList.add('hidden'); sleepTick(); } else sleepEnd(true); };
  }
  s.classList.remove('hidden', 'show-b'); sleepTick();
}
/* keep the screen on while reading; let it sleep after 30 min without touching, and always during the sleep timer */
(function () {
  if (!A || !A.keepAwake) return; let t = 0, on = null;
  const set = v => { if (v !== on) { on = v; try { A.keepAwake(v); } catch (e) {} } };
  const poke = () => { clearTimeout(t); if (SLEEP.on) { set(false); return; } set(true); t = setTimeout(() => set(false), 30 * 60000); };
  ['touchstart', 'wheel', 'keydown', 'mousedown'].forEach(ev => document.addEventListener(ev, poke, { passive: true, capture: true }));
  window.__awakePoke = poke; poke();
})();
window.onLaunch = what => { if (what === 'sleep') openSleep(); else if (what === 'read') { closeSheet(); setMode('read'); } };

/* ---------- reading reminders (Android notifications) – automatic, learned from your habits ---------- */
function remLearn(kind) { // remember at what hour you usually read / start the sleep timer
  const d = new Date(), m = d.getHours() * 60 + d.getMinutes(); const k = kind === 'sleep' ? 'sleepTimes' : 'readTimes';
  S[k] = (S[k] || []).concat(m).slice(-30); persist(); remApply();
}
function remMedian(list, lo, hi) { const a = (list || []).filter(m => m >= lo && m <= hi).sort((x, y) => x - y); return a.length >= 2 ? a[a.length >> 1] : null; }
const hm = m => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
function remCfg() {
  const on = S.remAuto !== false, rt = S.readTimes, st = S.sleepTimes;
  const mm = remMedian(rt, 300, 660), em = remMedian(rt, 840, 1290), sm = remMedian(st, 1140, 1439);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  return {
    m: { on, t: hm(mm != null ? clamp(mm + 45, 390, 690) : 480), learned: mm != null },
    e: { on, t: hm(em != null ? clamp(em + 45, 990, 1290) : 1140), learned: em != null },
    n: { on: on && (st || []).length > 0, t: hm(sm != null ? clamp(sm - 10, 1200, 1430) : 1335), learned: sm != null }
  };
}
function remApply() { try { if (A && A.setReminders) A.setReminders(JSON.stringify(remCfg())); } catch (e) {} }
function remSummary() { return S.remAuto === false ? L('oprite', 'off') : L('automate', 'automatic'); }
function openReminders() {
  const r = remCfg(), on = S.remAuto !== false;
  const line = (ic, t, x, d) => '<div class="rem-row"><div class="rem-t"><b>' + ic + ' ' + t + '</b><small>' + d + '</small></div><span class="rem-h">' + (x.on ? (/^\d/.test(x.t) ? '~ ' : '') + x.t : '—') + '</span></div>';
  const h = (WEB ? '<p class="warn">' + L('Notificările funcționează doar în aplicația Android. Pe iPhone (versiunea web) nu se pot trimite mementouri.', 'Notifications only work in the Android app. The iPhone (web) version cannot send reminders.') + '</p>' : '') +
    '<div class="row"><span>' + L('Mementouri automate', 'Automatic reminders') + '<br><small class="muted">' + L('Nu trebuie să setezi nimic', 'Nothing to set up') + '</small></span><button class="sw ' + (on ? 'on' : '') + '" id="remSw"></button></div>' +
    '<p class="hint">' + L('Primești un memento doar dacă nu ai citit încă în ziua respectivă. Orele se potrivesc singure după când citești de obicei: dimineața, după trezire, sau spre seară, după lucru. Dacă citești dimineața, nu mai primești mementoul de seară.', 'You only get a reminder if you have not read yet that day. The times adapt to when you usually read: in the morning after you wake up, or towards evening after work. If you read in the morning, you will not get the evening one.') + '</p>' +
    line('☀️', L('Dimineața', 'Morning'), r.m, r.m.learned ? L('după ora la care citești de obicei', 'after your usual reading time') : L('implicit, până învăț obiceiul tău', 'default, until I learn your habit')) +
    line('🏠', L('După lucru', 'After work'), r.e, r.e.learned ? L('după ora la care citești de obicei', 'after your usual reading time') : L('implicit, până învăț obiceiul tău', 'default, until I learn your habit')) +
    (NOGATE ? '' : line('📱', L('Mai mult scroll decât Biblie', 'More scrolling than Bible'), { on: on, t: L('automat', 'auto') }, L('dacă azi ai stat cu cel puțin 10 minute mai mult pe Instagram, TikTok, YouTube sau Facebook decât în Biblie (max. 2 pe zi), chiar dacă ai citit deja', 'if today you spent at least 10 minutes more on Instagram, TikTok, YouTube or Facebook than in the Bible (max. 2 a day), even if you already read'))) +
    line('🌙', L('Noapte bună', 'Good night'), r.n, r.n.on ? L('înainte de ora la care pornești de obicei timerul de somn', 'before you usually start the sleep timer') : L('pornește singur după ce folosești timerul de somn', 'turns on by itself once you use the sleep timer')) +
    '<p class="hint">' + L('Seria (zile la rând) se resetează dacă sari o zi.', 'Your streak resets if you skip a day.') + '</p>';
  openSheet(L('Mementouri de citire', 'Reading reminders'), h, body => {
    body.querySelector('#remSw').onclick = e => { S.remAuto = S.remAuto === false; persist(); e.currentTarget.classList.toggle('on', S.remAuto !== false); hap(0); remApply(); sheetStack.pop(); openReminders(); };
  }, sheetOpen());
}
try { remApply(); if (A && A.streakInfo) A.streakInfo(streak()); if (A && A.readToday && S.days[today()]) A.readToday(today(), streak()); } catch (e) {}

function narrUserMoved(g) { // user swiped manually while narrating
  if (!NARR.on || NARR.auto || !NARR.d) return;
  const r = ref(g);
  if (r.b === NARR.b && r.c === NARR.c) { NARR.idx = r.v; A.narrSeek(narrTime(r.v)); }
  else { narrPrep(r.b, r.c); NARR.seekTo = r.v; A.narrStart(narratorUrl(g, NARR.lang)); }
}

/* ---------- read aloud (TTS) ---------- */
const TTS = { on: false, g: -1, q: [], seq: 0 };
window.onTtsReady = ok => { if (TTS.on && ok) ttsSpeakCur(); };
function ttsStart() {
  if (!A || !A.ttsSpeak) {
    if (!window.speechSynthesis) { toast(T('Citirea cu voce nu e disponibilă aici')); return; }
  }
  TTS.on = true; refresh(); ttsSpeakCur(); toast(T('🔊 Citire cu voce – ') + (S.lang === 'en' ? T('engleză (KJV)') : S.lang === 'both' ? T('română + engleză') : T('română (Cornilescu)')));
}
function ttsStop() { TTS.on = false; TTS.q = []; TTS.g = -1; try { A && A.ttsStop ? A.ttsStop() : window.speechSynthesis && speechSynthesis.cancel(); } catch (e) {} refresh(); }
function ttsSpeakCur() {
  if (!TTS.on) return; const g = curG(); TTS.g = g;
  if (S.lang === 'both' && !WEB) { ttsStop(); return; }
  TTS.q = [[S.lang === 'en' ? 'en' : 'ro', txt(g, S.lang === 'en' ? 'en' : 'ro')]];
  ttsNext();
}
function ttsNext() {
  if (!TTS.on) return;
  const it = TTS.q.shift();
  if (!it) { // verse finished -> next verse
    if (SLEEP.on && SLEEP.chap > 0) { const r0 = ref(curG()), r1 = ref(Math.min(TOTAL - 1, curG() + 1)); if ((r0.c !== r1.c || r0.b !== r1.b) && --SLEEP.left <= 0) { sleepEnd(); return; } }
    setTimeout(() => { if (TTS.on && !sheetOpen()) go(1); else if (TTS.on) ttsSpeakCur(); }, 450); return;
  }
  const id = 'u' + (++TTS.seq); TTS.id = id;
  const text = it[1].replace(/[„”"«»‹›]/g, '');
  if (A && A.ttsSpeak) {
    const vc = (S.voice || {})[it[0]] || {}; const r = A.ttsSpeak(text, it[0], id, S.ttsRate || 0.95, vc.p || 1, vc.n || '');
    if (r === -2) { A.ttsInit && A.ttsInit(); setTimeout(() => { if (TTS.on && TTS.id === id) { TTS.q.unshift(it); ttsNext(); } }, 900); }
    else if (r === -1) { ttsStop(); toast(it[0] === 'en' ? T('Lipsește vocea engleză') : T('Lipsește vocea română')); openTtsHelp(it[0]); }
  } else {
    const u = new SpeechSynthesisUtterance(text); u.lang = it[0] === 'en' ? 'en-US' : 'ro-RO'; u.rate = S.ttsRate || 0.95; u.pitch = ((S.voice || {})[it[0]] || {}).p || 1;
    u.onend = () => window.onTtsDone(id); speechSynthesis.cancel(); speechSynthesis.speak(u);
  }
}
window.onTtsDone = (id, err) => { if (!TTS.on || id !== TTS.id) return; ttsNext(); };
function voiceOptions(l) {
  let vs = null;
  try { if (A && A.ttsVoices) { const r = A.ttsVoices(l); vs = r && r !== 'null' ? JSON.parse(r) : null; } } catch (e) {}
  if (vs === null && A && A.ttsVoices) return null;
  if (!vs && window.speechSynthesis) vs = speechSynthesis.getVoices().filter(v => v.lang.toLowerCase().startsWith(l)).map(v => ({ n: v.name, c: v.lang.slice(3), net: !v.localService, q: 400 }));
  vs = (vs || []).filter(v => !/-language$/.test(v.n));
  const pref = l === 'en' ? ['US', 'GB'] : ['RO'];
  vs.sort((a, b) => (b.net - a.net) || (pref.indexOf(a.c) < 0) - (pref.indexOf(b.c) < 0) || b.q - a.q);
  const seen = new Set(); const out = [];
  for (const v of vs) { const k = v.n.replace(/-(local|network)$/, ''); if (seen.has(k)) continue; seen.add(k); out.push(v); if (out.length >= 3) break; }
  const opts = out.map((v, i) => ({ n: v.n, p: 1, label: T('Vocea ') + (i + 1) + (v.c ? ' · ' + ({ US: T('americană'), GB: T('britanică'), AU: T('australiană'), IN: T('indiană'), RO: T('română') }[v.c] || v.c) : ''), sub: v.net ? T('calitate înaltă · online') : 'offline' }));
  if (opts.length) {
    const best = opts[0];
    if (opts.length < 3) opts.push({ n: best.n, p: 0.82, label: T('Vocea 1 · ton grav'), sub: T('mai jos, sună mai bărbătesc') });
    if (opts.length < 3) opts.push({ n: best.n, p: 0.9, label: T('Vocea 1 · ton mediu'), sub: T('puțin mai jos') });
  }
  return opts;
}
function openVoicePicker(retry) {
  if (A && A.ttsInit) A.ttsInit();
  const ro = voiceOptions('ro'), en = voiceOptions('en');
  if ((ro === null || en === null) && !retry) { toast(T('Se pregătesc vocile…')); setTimeout(() => openVoicePicker(true), 900); return; }
  S.voice = S.voice || {};
  const sec = (l, opts, title) => {
    let h = '<div class="sec">' + title + '</div>';
    if (!opts || !opts.length) return h + T('<div class="hint">Nicio voce instalată pentru această limbă. <a id="tset') + l + T('" style="color:#ffd166;text-decoration:underline">Instalează din setări</a></div>');
    const cur = S.voice[l] || {};
    return h + opts.map((o, i) => { const on = (cur.n || opts[0].n) === o.n && (cur.p || 1) === o.p; return '<div class="vrow ' + (on ? 'on' : '') + '" data-l="' + l + '" data-i="' + i + '"><span class="chk">' + (on ? '✓' : '') + '</span><span class="bt"><b>' + esc(o.label) + '</b><small>' + esc(o.sub) + '</small></span><button class="vplay" data-tl="' + l + '" data-ti="' + i + '">▶</button></div>'; }).join('');
  };
  let h = T('<p class="hint" style="margin-top:0">Ține apăsat pe 🔊 oricând ca să schimbi vocea. Atinge ▶ ca s-o asculți.</p><button class="brow" id="vnarr">') + tile(I.headphones, '#2b4560') + T('<span class="bt"><b>Narator uman (YouVersion)</b><small>Capitolul curent, citit de un om, sincronizat cu versetele · necesită internet</small></span><span class="chev">›</span></button>');
  h += sec('ro', ro, T('🇷🇴 Română · Cornilescu')) + sec('en', en, '🇬🇧 English · KJV');
  h += T('<div class="row"><span>Viteză</span><input type="range" id="vrate" min="0.6" max="1.4" step="0.05" value="') + (S.ttsRate || 0.95) + '"></div>';
  h += T('<p class="hint">Vocile sunt cele instalate pe telefon (Google/Samsung). Pentru voci mai naturale: Setări → Ieșire text în vorbire → Google → Instalați datele vocale → alege varianta de calitate înaltă.</p><button class="btn ghost" id="tsetAll">Setări voce Android</button>');
  const OP = { ro, en };
  openSheet(T('Alege vocea'), h, body => {
    const sample = { ro: 'Domnul este Păstorul meu: nu voi duce lipsă de nimic.', en: 'The Lord is my shepherd; I shall not want.' };
    body.querySelectorAll('.vrow').forEach(r => r.onclick = e => {
      if (e.target.closest('.vplay')) return;
      const o = OP[r.dataset.l][+r.dataset.i]; S.voice[r.dataset.l] = { n: o.n, p: o.p }; persist(); haptic();
      body.querySelectorAll('.vrow[data-l="' + r.dataset.l + '"]').forEach(x => { x.classList.toggle('on', x === r); x.querySelector('.chk').textContent = x === r ? '✓' : ''; });
      if (TTS.on) { TTS.g = -1; ttsSpeakCur(); }
    });
    body.querySelectorAll('.vplay').forEach(b => b.onclick = () => {
      const l = b.dataset.tl, o = OP[l][+b.dataset.ti];
      if (A && A.ttsSpeak) A.ttsSpeak(sample[l], l, 'test', S.ttsRate || 0.95, o.p, o.n);
      else if (window.speechSynthesis) { const u = new SpeechSynthesisUtterance(sample[l]); u.lang = l === 'en' ? 'en-US' : 'ro-RO'; u.pitch = o.p; speechSynthesis.cancel(); speechSynthesis.speak(u); }
    });
    body.querySelector('#vnarr').onclick = () => { closeSheet(); narrStart(curG()); };
    body.querySelector('#vrate').oninput = e => { S.ttsRate = +e.target.value; persist(); };
    ['tsetro', 'tseten', 'tsetAll'].forEach(id => { const x = body.querySelector('#' + id); x && (x.onclick = () => A && A.openTtsSettings && A.openTtsSettings()); });
  }, sheetOpen());
}
function openTtsHelp(l) {
  openSheet(T('Voce pentru citire'), T('<p class="wdef">Telefonul nu are instalată vocea ') + (l === 'en' ? T('engleză') : T('română')) + T('.</p><ol class="steps"><li>Setări → Administrare generală → <b>Ieșire text în vorbire</b></li><li>Alege motorul <b>Google</b> (sau Samsung)</li><li>⚙ → Instalați datele vocale → <b>') + (l === 'en' ? 'English (United States)' : T('Română')) + T('</b></li></ol><button class="btn" id="tset">Deschide setările de voce</button>'), body => { body.querySelector('#tset').onclick = () => A && A.openTtsSettings && A.openTtsSettings(); });
}


/* ---------- topics (Tematic) ---------- */
const TOPICS = [
  ['imb', '💪', T('Îmbărbătare'), 'JOS 1:9, ISA 41:10, DEU 31:6, PHP 4:13, PSA 27:1, PSA 27:14, ISA 40:31, 2TI 1:7, PSA 31:24, 1CO 16:13, 2CH 32:7, PSA 46:1, ROM 8:31, HEB 13:6, ISA 43:2, 1CH 28:20, EPH 6:10, PSA 138:3, 2CO 4:16, 2CO 4:17'],
  ['buc', '😊', T('Bucurie'), 'PHP 4:4, NEH 8:10, PSA 16:11, PSA 118:24, ROM 15:13, JHN 15:11, PSA 30:5, PSA 126:3, JAS 1:2, 1TH 5:16, ISA 61:10, HAB 3:18, PSA 5:11, LUK 2:10, JHN 16:24, PRO 17:22, PSA 32:11, PSA 100:1, PSA 100:2, ZEP 3:17'],
  ['tri', '💧', T('Tristețe și mângâiere'), 'PSA 34:18, MAT 5:4, PSA 147:3, REV 21:4, 2CO 1:3, 2CO 1:4, JHN 14:1, PSA 42:11, ISA 61:3, ISA 53:4, LAM 3:22, LAM 3:23, PSA 23:4, JHN 16:22, ROM 8:18, 1TH 4:13, PSA 56:8, MAT 11:28, PSA 73:26, PSA 30:5'],
  ['fri', '🛡️', T('Frică'), 'ISA 41:10, PSA 56:3, 2TI 1:7, PSA 23:4, JHN 14:27, ISA 43:1, PSA 118:6, 1JN 4:18, PSA 27:1, MAT 10:31, LUK 12:32, PSA 91:5, ISA 35:4, DEU 31:8, ROM 8:15, PSA 46:2'],
  ['gri', '🍃', T('Griji și neliniște'), 'PHP 4:6, PHP 4:7, 1PE 5:7, MAT 6:34, MAT 6:25, MAT 6:26, PSA 55:22, PRO 3:5, PRO 3:6, PSA 94:19, ISA 26:3, MAT 11:28, MAT 11:29, PSA 37:5, LUK 12:25'],
  ['pac', '🕊️', T('Pace'), 'JHN 14:27, ISA 26:3, PHP 4:7, ROM 5:1, NUM 6:24, NUM 6:25, NUM 6:26, COL 3:15, PSA 4:8, 2TH 3:16, PSA 29:11, ISA 9:6, JHN 16:33, MAT 5:9, ROM 12:18'],
  ['dra', '❤️', T('Dragoste'), '1CO 13:4, 1CO 13:7, 1CO 13:13, JHN 3:16, 1JN 4:8, 1JN 4:19, ROM 5:8, ROM 8:39, JHN 15:13, JHN 13:34, 1JN 3:18, EPH 3:19, JER 31:3, 1PE 4:8, COL 3:14'],
  ['cre', '🙏', T('Credință'), 'HEB 11:1, HEB 11:6, ROM 10:17, MRK 11:24, 2CO 5:7, EPH 2:8, MAT 17:20, JAS 1:6, GAL 2:20, ROM 1:17, MRK 9:23, 1PE 1:7, HAB 2:4, PRO 3:5'],
  ['spe', '🌅', T('Speranță'), 'JER 29:11, ROM 15:13, ROM 5:5, ISA 40:31, LAM 3:24, LAM 3:25, HEB 6:19, ROM 8:28, PSA 33:22, PSA 71:5, 1PE 1:3, ROM 12:12, PSA 39:7, PRO 23:18'],
  ['ier', '🤍', T('Iertare'), '1JN 1:9, EPH 4:32, COL 3:13, PSA 103:12, ISA 1:18, MAT 6:14, MIC 7:18, PSA 32:1, ACT 3:19, LUK 6:37, ISA 43:25, PSA 86:5, MRK 11:25'],
  ['mul', '🌾', T('Mulțumire'), '1TH 5:18, PSA 107:1, PSA 100:4, COL 3:17, PSA 118:1, EPH 5:20, PSA 136:1, PSA 9:1, 2CO 9:15, PSA 95:2, COL 2:7'],
  ['put', '⛰️', T('Putere și tărie'), 'PHP 4:13, ISA 40:29, 2CO 12:9, 2CO 12:10, PSA 18:2, PSA 28:7, EPH 6:10, NEH 8:10, PSA 73:26, ISA 12:2, HAB 3:19, EXO 15:2'],
  ['int', '📜', T('Înțelepciune'), 'JAS 1:5, PRO 9:10, PRO 2:6, PSA 111:10, PRO 4:7, COL 3:16, PRO 16:3, PRO 19:20, ECC 12:13, PSA 32:8, PSA 119:105, PRO 3:13'],
  ['sin', '🫂', T('Singurătate'), 'DEU 31:6, HEB 13:5, PSA 68:6, MAT 28:20, PSA 27:10, JHN 14:18, PSA 139:7, PSA 139:8, PSA 25:16, ISA 49:15, ISA 41:10'],
  ['vin', '🩹', T('Boală și vindecare'), 'JER 17:14, JAS 5:15, ISA 53:5, PSA 103:2, PSA 103:3, PSA 41:3, EXO 15:26, 3JN 1:2, PSA 147:3, MAL 4:2, JER 30:17'],
  ['rug', '🕯️', T('Rugăciune'), 'PHP 4:6, MAT 7:7, 1TH 5:17, JER 33:3, JAS 5:16, MAT 6:6, 1JN 5:14, PSA 145:18, ROM 8:26, MAT 21:22, JHN 14:13'],
  ['man', '🔥', T('Mânie și răbdare'), 'EPH 4:26, JAS 1:19, JAS 1:20, PRO 15:1, PRO 14:29, PRO 16:32, COL 3:8, ECC 7:9, PSA 37:8, GAL 5:22, GAL 5:23, ROM 12:21'],
  ['isp', '⚔️', T('Ispită'), '1CO 10:13, JAS 1:12, JAS 4:7, HEB 4:15, HEB 2:18, MAT 26:41, GAL 5:16, 1PE 5:8, 1PE 5:9, PSA 119:11, EPH 6:11'],
  ['cal', '🧭', T('Călăuzire'), 'PSA 32:8, ISA 30:21, PSA 119:105, PRO 16:9, PSA 37:23, JER 29:11, ISA 58:11, PSA 25:4, PSA 25:5, PRO 3:5, PRO 3:6, JAS 1:5'],
  ['fam', '🏠', T('Familie'), 'JOS 24:15, EPH 6:1, EPH 6:4, PRO 22:6, COL 3:18, COL 3:19, COL 3:20, PSA 127:3, EPH 5:25, 1TI 5:8, DEU 6:6, DEU 6:7, GEN 2:24']
];
const TPOOL = {};
function topicPool(id) {
  if (TPOOL[id]) return TPOOL[id];
  const T = TOPICS.find(t => t[0] === id); const seeds = [];
  T[3].split(',').forEach(x => { const m = x.trim().match(/^(\w+) (\d+):(\d+)$/); if (!m) return; const b = USFM.indexOf(m[1]), c = +m[2] - 1, v = +m[3] - 1; if (b >= 0 && VC[b][c] > v) seeds.push(G(b, c, v)); });
  const more = []; const set = new Set(seeds);
  seeds.forEach(g => xrefs(g).slice(0, 4).forEach(x => { if (!x.span && !set.has(x.g)) { const L = txt(x.g, 'ro').length; if (L >= 40 && L <= 300) { set.add(x.g); more.push(x.g); } } }));
  return TPOOL[id] = { seeds, more };
}
let tq = [];
function nextTopic() {
  const P = topicPool(S.topic);
  if (!tq.length) {
    const sh = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(v => v[1]);
    const a = sh(P.seeds), b = sh(P.more); tq = [];
    while (a.length || b.length) { if (a.length) tq.push(a.shift()); if (a.length) tq.push(a.shift()); if (b.length) tq.push(b.shift()); }
    const recent = FY.items.slice(-8).map(i => i.g); tq = tq.filter(g => !recent.includes(g)).concat(tq.filter(g => recent.includes(g)));
  }
  return { g: tq.shift(), topic: S.topic };
}
function setTopic(id) {
  S.topic = id || ''; persist(); tq = [];
  FY.items = []; FY.i = 0; fyCount = 0;
  if (mode !== 'foryou') setMode('foryou'); else { refresh(); onShown(); }
  updateTopicTab(); haptic();
  const T = TOPICS.find(t => t[0] === id); toast(T ? T[1] + ' ' + T[2] : T('✨ Toate temele, amestecat'));
}
function updateTopicTab() { const b = document.querySelector('.tabs [data-mode=foryou]'); if (!b) return; const T = TOPICS.find(t => t[0] === S.topic); b.innerHTML = T('Tematic') + (T ? ' <i class="tdot">' + T[1] + '</i>' : ''); }
function openTopics() {
  let h = T('<p class="hint" style="margin-top:0">Alege ce vrei să citești. Butonul „Tematic” din dreapta te aduce aici oricând.</p><div class="tgrid">');
  h += '<button class="tcard ' + (!S.topic ? 'on' : '') + T('" data-t=""><span>✨</span><b>Toate</b><small>amestecat, pentru tine</small></button>');
  h += TOPICS.map(t => '<button class="tcard ' + (S.topic === t[0] ? 'on' : '') + '" data-t="' + t[0] + '"><span>' + t[1] + '</span><b>' + t[2] + '</b><small>' + (topicPool(t[0]).seeds.length + topicPool(t[0]).more.length) + T(' versete</small></button>')).join('');
  h += '</div>';
  openSheet(T('Ce dorești să citești?'), h, body => body.querySelectorAll('[data-t]').forEach(x => x.onclick = () => { closeSheet(); setTopic(x.dataset.t); }), sheetOpen());
}


/* ---------- engraved line motifs (paper / night themes) ---------- */
const MOTIFS = [
  // sun over hills
  '<svg viewBox="0 0 200 200"><circle cx="100" cy="78" r="24"/><path d="M100 36v-14M100 134v0M58 78H42M158 78h-16M70 48 60 38M130 48l10-10M70 108l-10 10M130 108l10 10"/><path d="M8 172c30-34 52-52 78-46 20 5 30 22 46 20 22-3 34-28 60-26"/><path d="M8 186c40-22 80-26 110-16s50 8 74-4"/></svg>',
  // olive branch
  '<svg viewBox="0 0 200 200"><path d="M30 178C70 140 112 98 172 30"/><path d="M58 150c-20-4-30-18-32-30 18 2 30 14 32 30zM62 148c4-20 18-30 30-32-2 18-14 30-30 32zM96 112c-20-4-30-18-32-30 18 2 30 14 32 30zM100 110c4-20 18-30 30-32-2 18-14 30-30 32zM132 74c-20-4-30-18-32-30 18 2 30 14 32 30zM136 72c4-20 18-30 30-32-2 18-14 30-30 32z"/><circle cx="84" cy="140" r="7"/><circle cx="120" cy="104" r="7"/></svg>',
  // wheat
  '<svg viewBox="0 0 200 200"><path d="M100 190V40"/><path d="M100 58c-14-6-20-18-18-30 12 6 18 16 18 30zM100 58c14-6 20-18 18-30-12 6-18 16-18 30zM100 84c-14-6-20-18-18-30 12 6 18 16 18 30zM100 84c14-6 20-18 18-30-12 6-18 16-18 30zM100 110c-14-6-20-18-18-30 12 6 18 16 18 30zM100 110c14-6 20-18 18-30-12 6-18 16-18 30zM100 136c-14-6-20-18-18-30 12 6 18 16 18 30zM100 136c14-6 20-18 18-30-12 6-18 16-18 30z"/><path d="M100 40V18M88 30l-4-16M112 30l4-16"/><path d="M100 160c-20 0-34 10-40 24M100 160c20 0 34 10 40 24"/></svg>',
  // dove with leaf
  '<svg viewBox="0 0 200 200"><path d="M30 118c26-30 70-36 104-22 10-14 24-18 36-12-8 4-12 10-14 18-12 30-50 46-92 38-14-3-26-10-34-22z"/><path d="M84 100c4-34 22-60 52-74-2 30-14 54-36 72"/><path d="M164 90l14 2-12 6"/><circle cx="154" cy="88" r="2.4"/><path d="M60 128c-16 8-30 10-44 6 10-6 18-12 24-20"/><path d="M178 92c8 6 12 14 12 22-8-4-14-10-16-18"/></svg>'
];

/* ---------- pager ---------- */
const feed = $('#feed');
let mode = 'foryou';
const FY = { items: [], i: 0 };
let PL = { base: 0, i: 0 };
let RD = { base: S.readPos || 0, i: 0 };
function cur() { return mode === 'foryou' ? FY.i : mode === T('plan') ? PL.i : RD.i; }
function itemAt(k) {
  if (mode === 'foryou') {
    if (k < 0) return null;
    while (FY.items.length <= k) FY.items.push(nextForYou());
    return FY.items[k];
  }
  if (mode === T('plan')) {
    if (!S.plan) return null; const pd = planData(S.plan); const ix = PL.base + k;
    return ix >= 0 && ix < pd.verses.length ? { g: pd.verses[ix], pday: pd.dayOf[ix], pix: ix } : null;
  }
  const g = RD.base + k; return g >= 0 && g < TOTAL ? { g } : null;
}

const PAL = [
  ['#1d2b64', '#0d1328', '#5b6cff', '#c86dd7'], ['#3a1c71', '#120a24', '#d76d77', '#ffaf7b'], ['#0f3443', '#06141a', '#34e89e', '#2b86c5'],
  ['#41295a', '#160d20', '#2f0743', '#ff6a88'], ['#232526', '#0e0f10', '#5a5f66', '#9a8478'], ['#16222a', '#080d10', '#3a6073', '#93b5a4'],
  ['#4b134f', '#170518', '#c94b4b', '#f7b733'], ['#1f1c2c', '#0a0910', '#928dab', '#5d4e8c'], ['#0b486b', '#04131c', '#f56217', '#3a7bd5'],
  ['#2c3e50', '#0d1218', '#4ca1af', '#c4e0e5'], ['#42275a', '#140b1c', '#734b6d', '#e0a96d'], ['#134e5e', '#061a1f', '#71b280', '#1e9e8f'],
  ['#3e1f1f', '#140909', '#b24592', '#f15f79'], ['#1a2a6c', '#0a0f26', '#b21f1f', '#fdbb2d']
];

const slots = [-1, 0, 1].map(() => { const el = document.createElement('div'); el.className = 'card'; el.innerHTML = '<div class="blob a"></div><div class="blob b"></div><div class="motif"></div><div class="content"></div><div class="actions"></div>'; feed.appendChild(el); el._key = null; return el; });

const TABF = () => Math.min(innerWidth, innerHeight) >= 600 ? 1.4 : 1;
function fontFor(len) { const base = len < 70 ? 25 : len < 130 ? 22 : len < 200 ? 19.5 : len < 280 ? 18 : 16.5; return Math.round(base * S.fs * TABF()) + 'px'; }
function fillCard(el, it) {
  const key = it ? (S.topic || '') + (NARR.on ? 'N' : '') + (TTS.on ? 'T' : '') + mode + (it.pix != null ? 'p' + it.pix : '') + it.g + S.lang + curVer('ro') + curVer('en') + S.fs + TABF() + (it.votd ? 'v' : '') + (S.liked[it.g] ? 'L' : '') + (S.saved[it.g] ? 'S' : '') : 'none';
  if (el._key === key) return; el._key = key;
  if (!it) { el.querySelector('.content').innerHTML = ''; el.querySelector('.actions').innerHTML = ''; el.style.visibility = 'hidden'; return; }
  el.style.visibility = '';
  const g = it.g; const p = PAL[(g * 37 + 11) % PAL.length];
  const mi = (g * 13 + 5) % MOTIFS.length; if (el._m !== mi) { el._m = mi; el.querySelector('.motif').innerHTML = MOTIFS[mi]; }
  el.style.setProperty('--c1', p[0]); el.style.setProperty('--c2', p[1]); el.style.setProperty('--c3', p[2]); el.style.setProperty('--c4', p[3]);
  const main = S.lang === 'both' ? PRI : S.lang === 'en' ? 'en' : 'ro';
  const t1 = txt(g, main);
  let h = '';
  if (it.votd) h += T('<div class="badge">✦ Versetul zilei</div>');
  else if (it.topic) { const T = TOPICS.find(t => t[0] === it.topic); if (T) h += '<div class="badge topic">' + T[1] + ' ' + T[2] + '</div>'; }
  if (it.pday != null) { const pd = planData(S.plan); const start = pd.dayStart[it.pday] === it.pix; h += '<div class="badge plan st-' + dayStatus(S.plan, it.pday) + '">' + (start ? T('▶ Începe ') : '') + T('Ziua ') + (it.pday + 1) + T(' din ') + pd.days.length + '</div>'; }
  h += '<p class="verse" style="font-size:' + fontFor(t1.length + (S.lang === 'both' ? 60 : 0)) + '">' + rich(g, main) + '</p>';
  if (S.lang === 'both') h += '<p class="verse2" style="font-size:' + Math.round(16 * S.fs * TABF()) + 'px">' + rich(g, SEC) + '</p>';
  h += '<div class="ref">' + esc(label(g, main)) + ' <small class="vab">' + verAbbr(main, g) + '</small>' + (S.lang === 'both' ? ' · ' + esc(label(g, SEC)) + ' <small class="vab">' + verAbbr(SEC, g) + '</small>' : '') + '</div>';
  if (mode === 'read' || mode === T('plan')) { const r = ref(g); h += T('<div class="pos">Versetul ') + (r.v + 1) + T(' din ') + VC[r.b][r.c] + '</div>'; }
  const xs = xrefs(g);
  if (xs.length) h += '<div class="chips">' + xs.slice(0, 3).map(x => '<button class="chip" data-x="' + x.g + '">' + esc(xlabel(x, main)) + '</button>').join('') + (xs.length > 3 ? '<button class="chip more" data-v="' + g + '">+' + (xs.length - 3) + T(' trimiteri</button>') : '') + '</div>';
  el.querySelector('.content').innerHTML = h;
  const langLbl = S.lang === 'ro' ? 'RO' : S.lang === 'en' ? 'EN' : 'RO+EN';
  const TT = TOPICS.find(t => t[0] === S.topic);
  el.querySelector('.actions').innerHTML =
    '<button data-act="topic" class="' + (mode === 'foryou' ? 'on topicon' : '') + '">' + (mode === 'foryou' && TT ? '<span class="temoji">' + TT[1] + '</span>' : I.tags) + T('<span>Tematic</span></button>') +
    '<button data-act="like" class="' + (S.liked[g] ? 'on' : '') + '">' + I.heart + T('<span>Îmi place</span></button>') +
    '<button data-act="save" class="' + (S.saved[g] ? 'on' : '') + '">' + I.save + '<span>' + (S.saved[g] ? L('Salvat', 'Saved') : L('Salvează', 'Save')) + '</span></button>' +
    '<button data-act="narr" class="' + (NARR.on || TTS.on ? 'on playing' : '') + '">' + (NARR.on || TTS.on ? I.stop : I.headphones) + '<span>' + (NARR.on || TTS.on ? T('Stop') : T('Audio')) + '</span></button>' +
    '<button data-act="share">' + I.share + T('<span>Distribuie</span></button>') +
    '<button data-act="lang"><div class="lang">' + (S.lang === 'both' ? '⇄' : langLbl) + '</div><span>' + langLbl + '</span></button>';
  el._g = g;
}

let H = window.innerHeight;
function layout(drag, anim) {
  const k = cur();
  slots.forEach((el, idx) => {
    const d = idx - 1;
    const it = itemAt(k + d);
    fillCard(el, it);
    el.classList.toggle('anim', !!anim);
    el.style.transform = 'translate3d(0,' + (d * H + (drag || 0)) + 'px,0)';
  });
}
// Keep slot order stable relative to index: rotate slots on navigation
function go(delta) {
  const k = cur() + delta;
  if (!itemAt(k)) { layout(0, true); if (TTS.on && delta > 0) ttsStop(); return; }
  if (delta > 0) slots.push(slots.shift()); else if (delta < 0) slots.unshift(slots.pop());
  if (mode === 'foryou') FY.i = k; else if (mode === T('plan')) PL.i = k; else RD.i = k;
  // the slot that wrapped around jumps across the screen: place it without animation first
  const wrapped = delta > 0 ? slots[2] : slots[0];
  wrapped.classList.remove('anim'); fillCard(wrapped, itemAt(k + (delta > 0 ? 1 : -1)));
  wrapped.style.transform = 'translate3d(0,' + ((delta > 0 ? 1 : -1) * H) + 'px,0)';
  requestAnimationFrame(() => { layout(0, true); slots.forEach(s => { if (s === wrapped) s.classList.remove('anim'); }); });
  hap(0); onShown();
}
/* ---------- progress: unique verses ever (bitset) + unique per day ---------- */
const BITS = new Uint8Array(Math.ceil(TOTAL / 8));
try { if (S.bits) { const bin = atob(S.bits); for (let i = 0; i < bin.length && i < BITS.length; i++) BITS[i] = bin.charCodeAt(i); } } catch (e) {}
let readCount = 0; for (let i = 0; i < BITS.length; i++) { let x = BITS[i]; while (x) { readCount += x & 1; x >>= 1; } }
const hasRead = g => (BITS[g >> 3] >> (g & 7)) & 1;
function saveBits() { let bin = ''; for (let i = 0; i < BITS.length; i += 4096) bin += String.fromCharCode.apply(null, BITS.subarray(i, i + 4096)); S.bits = btoa(bin); }
let todaySet = new Set(S.todayKey === today() ? (S.todaySeen || []) : []);
// un verset se socotește citit doar după ce a stat minimum 3 secunde pe ecran
const READ_MS = 3000; let readTimer = 0;
function countRead(g) {
  const t = today();
  if (S.todayKey !== t) { S.todayKey = t; S.todaySeen = []; todaySet = new Set(); }
  if (!todaySet.has(g)) { todaySet.add(g); S.todaySeen.push(g); S.days[t] = (S.days[t] || 0) + 1; S.total = (S.total || 0) + 1; if (S.days[t] === 1) { try { A && A.readToday && A.readToday(t, streak()); } catch (e) {} remLearn('read'); } }
  if (!hasRead(g)) { BITS[g >> 3] |= 1 << (g & 7); readCount++; saveBits(); }
  if (S.plan) { const d = planMark(S.plan, g); const pd = planData(S.plan), st = planState(S.plan); if (d >= 0 && !st.done[d] && dayStat(pd, st, d).done) { st.done[d] = 1; toast(T('✓ Ziua ') + (d + 1) + T(' din plan terminată!')); haptic(); } }
  persist(); updateStats();
}
function onShown() {
  const it = itemAt(cur()); if (!it) return;
  const g = it.g, k = cur(), m = mode;
  clearTimeout(readTimer);
  readTimer = setTimeout(() => { if (cur() === k && mode === m && !document.hidden) countRead(g); }, READ_MS);
  if (mode === 'foryou') markRecent(g); else if (mode === T('plan')) { planState(S.plan).pos = it.pix; } else S.readPos = g;
  persist(); if (GT) gateTick();
  if (TTS.on && TTS.g !== g) ttsSpeakCur();
  if (NARR.on && mode === 'read') narrUserMoved(g);
}
const pct = (a, b) => b ? a / b * 100 : 0;
const fmtPct = x => (x > 0 && x < 0.1 ? '<0,1' : x.toFixed(x < 10 ? 1 : 0).replace('.', ',')) + '%';
function updateStats() {
  const s = streak(); const n = S.days[today()] || 0;
  let lbl, p, lblCls = '';
  if (mode === 'read') {
    const r = ref(curG()); const l = S.lang === 'en' ? 'en' : 'ro';
    p = pct(r.v + 1, VC[r.b][r.c]); lbl = BK[l][r.b] + ' ' + (r.c + 1) + ' · ' + (r.v + 1) + '/' + VC[r.b][r.c];
  } else if (S.plan) {
    const pp = planProgress(S.plan); const P = planData(S.plan).P; p = pp.p;
    const bh = planBehind(S.plan); lblCls = bh ? 'late' : 'ok'; lbl = P.t + T(' · ziua ') + (pp.next + 1) + '/' + pp.total + ' · ' + fmtPct(p) + (bh ? L(' · în urmă ', ' · behind ') + bh : '');
  } else { p = pct(readCount, TOTAL); lbl = T('Biblia parcursă ') + fmtPct(p); }
  $('#pfill').style.width = Math.max(p, .6) + '%';
  $('#plabel').textContent = lbl; $('#plabel').className = lblCls;
  $('#stats').textContent = '🔥 ' + s + (s === 1 ? T(' zi') : T(' zile')) + '  ·  ' + n + (n === 1 ? T(' verset azi') : T(' versete azi'));
  pushWidget();
}
let wLast = '', wT = 0;
function pushWidget() {
  clearTimeout(wT); wT = setTimeout(() => {
    try {
      if (!A || !A.widgetData) return;
      const s = streak(); let txt, pr;
      if (S.plan) { const pp = planProgress(S.plan); txt = '🔥 ' + s + (s === 1 ? T(' zi') : T(' zile')) + ' · ' + planData(S.plan).P.t + T(' · ziua ') + (pp.next + 1) + '/' + pp.total; pr = pp.p; }
      else { pr = pct(readCount, TOTAL); txt = '🔥 ' + s + (s === 1 ? T(' zi la rând') : T(' zile la rând')) + T(' · Biblia ') + fmtPct(pr) + ' · ' + (S.days[today()] || 0) + T(' azi'); }
      const key = S.lang + txt + Math.round(pr * 10);
      if (key === wLast) return; wLast = key;
      A.widgetData(S.lang === 'en' ? 'en' : 'ro', txt, Math.round(pr * 10));
    } catch (e) {}
  }, 1500);
}
window.openFromWidget = g => { closeSheet(); try { closePlans(); } catch (e) {} setMode('read', g); };

/* ---------- statistics with charts ---------- */
function bookProgress() {
  const out = []; let g = 0;
  for (let b = 0; b < NB; b++) { let n = 0, t = 0; for (const c of VC[b]) for (let v = 0; v < c; v++, g++, t++) n += hasRead(g); out.push([n, t]); }
  return out;
}
function bestStreak() {
  const ks = Object.keys(S.days).filter(k => S.days[k]).sort(); let best = 0, run = 0, prev = null;
  for (const k of ks) { const d = new Date(k + 'T12:00:00'); run = prev && (d - prev) / 864e5 < 1.5 ? run + 1 : 1; best = Math.max(best, run); prev = d; }
  return best;
}
function donut(p, size, label) {
  const r = 52, C = 2 * Math.PI * r, f = C * Math.min(p, 100) / 100;
  return '<svg class="donut" viewBox="0 0 130 130" style="width:' + size + 'px;height:' + size + 'px"><circle cx="65" cy="65" r="' + r + '" stroke="#2a2836" stroke-width="13" fill="none"/>' +
    '<circle cx="65" cy="65" r="' + r + '" stroke="url(#dg)" stroke-width="13" fill="none" stroke-linecap="round" stroke-dasharray="' + f.toFixed(1) + ' ' + C.toFixed(1) + '" transform="rotate(-90 65 65)"/>' +
    '<defs><linearGradient id="dg" x1="0" x2="1"><stop offset="0" stop-color="#ffd166"/><stop offset="1" stop-color="#ff8a5c"/></linearGradient></defs>' +
    '<text x="65" y="66" text-anchor="middle" class="dn1">' + fmtPct(p) + '</text><text x="65" y="86" text-anchor="middle" class="dn2">' + label + '</text></svg>';
}
function openStats(range) {
  range = range || 14;
  const bp = bookProgress(); const l = S.lang === 'en' ? 'en' : 'ro';
  const sum = (a, b) => bp.slice(a, b).reduce((x, y) => [x[0] + y[0], x[1] + y[1]], [0, 0]);
  const ot = sum(0, 39), nt = sum(39, 66);
  // daily bars
  const days = []; const d = new Date(); d.setDate(d.getDate() - range + 1);
  for (let i = 0; i < range; i++) { days.push([dayKey(d), d.getDate(), d.getDay()]); d.setDate(d.getDate() + 1); }
  const vals = days.map(x => S.days[x[0]] || 0); const mx = Math.max(10, ...vals); const avg = vals.reduce((a, b) => a + b, 0) / range;
  const W = 340, Hh = 150, bw = W / range;
  let bars = '';
  const step = Math.ceil(mx / 4 / 5) * 5 || 5;
  for (let y = step; y <= mx; y += step) { const yy = Hh - y / mx * Hh; bars += '<line x1="0" x2="' + W + '" y1="' + yy + '" y2="' + yy + '" class="gl"/><text x="' + (W - 2) + '" y="' + (yy - 3) + '" class="gt" text-anchor="end">' + y + '</text>'; }
  vals.forEach((v, i) => {
    const h = v / mx * Hh; const x = i * bw + bw * .18; const isT = i === range - 1;
    bars += '<rect x="' + x.toFixed(1) + '" y="' + (Hh - h).toFixed(1) + '" width="' + (bw * .64).toFixed(1) + '" height="' + Math.max(h, v ? 2 : 0).toFixed(1) + '" rx="3" class="' + (isT ? 'bt' : 'bb') + '"/>';
    if (v && range <= 14) bars += '<text x="' + (x + bw * .32).toFixed(1) + '" y="' + (Hh - h - 4).toFixed(1) + '" class="bv" text-anchor="middle">' + v + '</text>';
    if (range <= 14 || (range - 1 - i) % 5 === 0) bars += '<text x="' + (x + bw * .32).toFixed(1) + '" y="' + (Hh + 15) + '" class="bl" text-anchor="middle">' + (range <= 14 ? (UI_EN ? 'SMTWTFS' : 'DLMMJVS')[days[i][2]] : days[i][1]) + '</text>';
  });
  bars += '<line x1="0" x2="' + W + '" y1="' + (Hh - avg / mx * Hh).toFixed(1) + '" y2="' + (Hh - avg / mx * Hh).toFixed(1) + '" class="avg"/>';
  const ws = [0, 0, 0, 0, 0, 0, 0];
  for (const k in S.days) ws[new Date(k + 'T12:00:00').getDay()] += S.days[k];
  const wmx = Math.max(1, ...ws);
  let h = '<div class="menu-stats"><div class="stat"><b>' + streak() + T('</b><span>zile la rând</span></div><div class="stat"><b>') + bestStreak() + T('</b><span>record zile</span></div><div class="stat"><b>') + (S.days[today()] || 0) + T('</b><span>versete azi</span></div></div>');
  h += '<div class="pcard">' + donut(pct(readCount, TOTAL), 132, T('din Biblie')) + '<div class="pside"><div class="big">' + readCount.toLocaleString('ro-RO') + '<small> / ' + TOTAL.toLocaleString('ro-RO') + T('</small></div><div class="hint" style="margin:0 0 10px">versete diferite parcurse</div>').replace('</div>', '<br><small>' + L('Un verset se numără după ce stai minimum 3 secunde pe el.', 'A verse counts after you stay on it for at least 3 seconds.') + '</small></div>') +
    T('<div class="tlab"><span>Vechiul Testament</span><span>') + fmtPct(pct(ot[0], ot[1])) + '</span></div><div class="tbar"><i style="width:' + pct(ot[0], ot[1]) + '%"></i></div>' +
    T('<div class="tlab"><span>Noul Testament</span><span>') + fmtPct(pct(nt[0], nt[1])) + '</span></div><div class="tbar"><i style="width:' + pct(nt[0], nt[1]) + '%"></i></div></div></div>';
  h += T('<div class="sec" style="display:flex;justify-content:space-between;align-items:center">Versete pe zi<span class="seg mini"><button data-r="7" class="') + (range === 7 ? 'on' : '') + '">7z</button><button data-r="14" class="' + (range === 14 ? 'on' : '') + '">14z</button><button data-r="30" class="' + (range === 30 ? 'on' : '') + '">30z</button></span></div>';
  h += '<div class="chart"><svg viewBox="0 -14 ' + W + ' ' + (Hh + 34) + '" class="bars">' + bars + T('</svg><div class="hint">Medie: ') + avg.toFixed(1).replace('.', ',') + T(' versete/zi · total în perioadă: ') + vals.reduce((a, b) => a + b, 0) + '</div></div>';
  h += T('<div class="sec">Pe zilele săptămânii</div><div class="wk">') + [1, 2, 3, 4, 5, 6, 0].map(i => '<div><div class="wcol"><i style="height:' + pct(ws[i], wmx) + '%"></i></div><span>' + (UI_EN ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] : ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ'])[i] + '</span></div>').join('') + '</div>';
  h += T('<div class="sec">Progres pe cărți</div>');
  for (let b = 0; b < NB; b++) {
    if (b === 39) h += T('<div class="sec" style="opacity:.35">Noul Testament</div>');
    const p = pct(bp[b][0], bp[b][1]);
    h += '<button class="bk" data-b="' + b + '"><span class="bn">' + esc(BK[l][b]) + '</span><span class="bbar"><i style="width:' + p + '%"></i></span><span class="bp">' + (p >= 100 ? '✓' : fmtPct(p)) + '</span></button>';
  }
  openSheet(T('Statistici'), h, body => {
    body.querySelectorAll('[data-r]').forEach(x => x.onclick = () => { sheetStack.pop(); openStats(+x.dataset.r); });
    body.querySelectorAll('.bk').forEach(x => x.onclick = () => openChapters(+x.dataset.b));
  }, sheetOpen());
}

/* touch / gestures */
let ty = 0, tx = 0, tt = 0, dy = 0, dx = 0, axis = '', dragging = false, moved = false, lastTap = 0, tapT = 0;
const TABS = [T('plan'), 'read'];
function swipeTab(dir) {
  const i = mode === 'foryou' ? (dir > 0 ? 1 : 0) : TABS.indexOf(mode) + dir; if (i < 0 || i >= TABS.length) { feed.animate([{ transform: 'translateX(' + (-dir * 40) + 'px)' }, { transform: 'none' }], { duration: 240 }); haptic(); if (i < 0) openMenu(); else openSearch(); return; }
  haptic(); setMode(TABS[i]);
  feed.animate([{ transform: 'translateX(' + (dir * 60) + 'px)', opacity: .35 }, { transform: 'none', opacity: 1 }], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' });
}
function tapTarget(t) {
  const ov = t.closest('[data-onv]'); if (ov) { openOnv(ov.dataset.onv, +ov.dataset.g); return true; }
  const c = t.closest('[data-x]'); if (c) { openVerse(+c.dataset.x); return true; }
  const m = t.closest('[data-v]'); if (m) { openVerse(+m.dataset.v, false, 'xr'); return true; }
  return false;
}
function wordTap(t) {
  const w = t.closest && t.closest('.w'); if (!w) return;
  w.classList.add('tap'); setTimeout(() => w.classList.remove('tap'), 400);
  const g = curG();
  const code = w.dataset.s ? (w.dataset.s.split(' ').filter(x => x !== 'H853')[0] || w.dataset.s.split(' ')[0]) : null;
  loadDict(err => loadNave(() => loadLex(() => loadAlign(() => {
    const oc = code || (/^[A-Za-z’'\-]+$/.test(w.textContent) && S.lang !== 'ro' && curVer('en') !== 'kjv' ? enAlign(g, w.textContent) : null) || alignRo(g, w.textContent, w);
    const go = () => oc ? openWord(oc, false, g) : openVerse(g, false, 'words', w.textContent);
    const x = !err && dMatch(g, w.textContent); if (x && (DICT_E[x.hw] || DICT_H[x.hw])) dictPop(w, x, go, oc); else go(); }))));
}
let lpT = 0, lpFired = false;
feed.addEventListener('touchstart', e => { lpFired = false; clearTimeout(lpT); if (e.target.closest('[data-act=narr]')) lpT = setTimeout(() => { lpFired = true; haptic(); WEB ? openVoicePicker() : openNarrVoices(); }, 550);
  else if (e.target.closest('[data-act=like]')) lpT = setTimeout(() => { lpFired = true; haptic(); openSaveTo(curG()); }, 550);
  else if (e.target.closest('[data-act=lang]')) lpT = setTimeout(() => { lpFired = true; haptic(); openVersions(); }, 550); }, { passive: true });
feed.addEventListener('touchmove', e => { const t = e.touches[0]; if (Math.abs(t.clientY - ty) > 10 || Math.abs(t.clientX - tx) > 10) clearTimeout(lpT); }, { passive: true });
feed.addEventListener('touchstart', e => { if (e.touches.length > 1) return; ty = e.touches[0].clientY; tx = e.touches[0].clientX; tt = Date.now(); dy = 0; dx = 0; axis = ''; dragging = true; moved = false; }, { passive: true });
feed.addEventListener('touchmove', e => {
  if (!dragging) return; dy = e.touches[0].clientY - ty; dx = e.touches[0].clientX - tx;
  if (!axis && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) axis = Math.abs(dx) > Math.abs(dy) * 1.2 ? 'x' : 'y';
  if (Math.abs(dy) > 8 || Math.abs(dx) > 8) moved = true;
  if (axis === 'x') { feed.style.transform = 'translateX(' + dx * .25 + 'px)'; return; }
  let d = dy; const k = cur();
  if ((d > 0 && !itemAt(k - 1)) || (d < 0 && !itemAt(k + 1))) d = d * .25;
  layout(d, false);
}, { passive: true });
feed.addEventListener('touchend', e => {
  if (!dragging) return; dragging = false;
  const dt = Date.now() - tt; const v = dy / Math.max(dt, 1);
  if (moved && axis === 'x') {
    feed.style.transform = '';
    if (Math.abs(dx) > 70 || Math.abs(dx) / Math.max(dt, 1) > .5) swipeTab(dx < 0 ? 1 : -1);
    return;
  }
  if (moved) {
    if (dy < -H * .18 || v < -.45) go(1); else if (dy > H * .18 || v > .45) go(-1); else layout(0, true);
    return;
  }
  clearTimeout(lpT);
  const tgt = e.target.closest('[data-act]');
  if (lpFired) { lpFired = false; e.preventDefault(); return; }
  if (tgt) { act(tgt.dataset.act, tgt); e.preventDefault(); return; }
  if (tapTarget(e.target)) { e.preventDefault(); return; }
  const now = Date.now();
  if (now - lastTap < 300) { lastTap = 0; clearTimeout(tapT); const c = e.changedTouches[0]; doubleLike(c.clientX, c.clientY); }
  else { lastTap = now; const t = e.target; clearTimeout(tapT); tapT = setTimeout(() => wordTap(t), 300); }
});
// desktop testing: wheel, keys, clicks
let wheelLock = 0;
feed.addEventListener('wheel', e => { const n = Date.now(); if (n < wheelLock) return; if (Math.abs(e.deltaY) > 20) { wheelLock = n + 450; go(e.deltaY > 0 ? 1 : -1); } }, { passive: true });
feed.addEventListener('click', e => { if ('ontouchstart' in window) return; const t = e.target.closest('[data-act]'); if (t) { act(t.dataset.act, t); return; } if (tapTarget(e.target)) return; clearTimeout(tapT); const tg = e.target; tapT = setTimeout(() => wordTap(tg), 300); });
feed.addEventListener('contextmenu', e => { if (e.target.closest('[data-act=narr]')) { e.preventDefault(); WEB ? openVoicePicker() : openNarrVoices(); } else if (e.target.closest('[data-act=like]')) { e.preventDefault(); openSaveTo(curG()); } else if (e.target.closest('[data-act=lang]')) { e.preventDefault(); openVersions(); } });
feed.addEventListener('dblclick', e => { if (!('ontouchstart' in window)) { clearTimeout(tapT); doubleLike(e.clientX, e.clientY); } });
document.addEventListener('keydown', e => { if (!$('#sheet').classList.contains('hidden')) return; if (e.key === 'ArrowDown' || e.key === ' ') go(1); if (e.key === 'ArrowUp') go(-1); });
window.addEventListener('resize', () => { H = window.innerHeight; try { applyTheme(); } catch (e) {} layout(0, false); });
// iOS Safari: toolbars and the home-indicator area change the visible height without a normal resize
try { if (window.visualViewport) visualViewport.addEventListener('resize', () => { const h = Math.round(visualViewport.height); if (Math.abs(h - H) > 2) { H = window.innerHeight; layout(0, false); } }); } catch (e) {}
window.addEventListener('orientationchange', () => setTimeout(() => { H = window.innerHeight; layout(0, false); }, 300));

function haptic() { hap(2); }
function hap(k) { if (!S.haptics) return; try { if (A && A.hapticKind) A.hapticKind(k); else if (A && A.haptic) A.haptic(); else if (navigator.vibrate) navigator.vibrate(k === 1 ? 18 : 6); } catch (e) {} }
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 1600); }
function curG() { const it = itemAt(cur()); return it ? it.g : 0; }
function refresh() { slots.forEach(s => s._key = null); layout(0, false); }

function doubleLike(x, y) {
  const g = curG(); if (!S.liked[g]) { S.liked[g] = Date.now(); persist(); }
  haptic();
  const b = document.createElement('div'); b.className = 'burst'; b.innerHTML = I.heartFill; b.style.left = x + 'px'; b.style.top = y + 'px';
  document.body.appendChild(b); setTimeout(() => b.remove(), 850); refresh();
}
function act(a) {
  const g = curG();
  if (a === 'save') { openSaveTo(g); hap(1); return; }
  if (a === 'like') { if (S.liked[g]) { delete S.liked[g]; hap(0); } else { S.liked[g] = Date.now(); hap(1); } persist(); refresh(); }
  else if (a === 'save') { if (S.saved[g]) { delete S.saved[g]; toast(T('Scos din salvate')); } else { S.saved[g] = Date.now(); haptic(); toast(T('Salvat')); } persist(); refresh(); }
  else if (a === 'ctx') openChapter(g);
  else if (a === 'share') share(g);
  else if (a === 'topic') openTopics();
  else if (a === 'more') openMore(g);
  else if (a === 'narr') { if (NARR.on) narrStop(); else if (TTS.on) ttsStop(); else if (WEB) ttsStart(); else narrStart(g); }
  else if (a === 'tts') { if (TTS.on) ttsStop(); else ttsStart(); }
  else if (a === 'lang') { S.lang = S.lang === PRI ? SEC : S.lang === SEC ? 'both' : PRI; if (S.lang === 'both' && TTS.on) ttsStop(); else if (TTS.on) { TTS.g = -1; setTimeout(ttsSpeakCur, 50); } persist(); refresh(); toast(S.lang === 'ro' ? T('Română') + ' · ' + verAbbr('ro') : S.lang === 'en' ? 'English · ' + verAbbr('en') : T('Română + English')); if (!S.verHint) { S.verHint = 1; persist(); setTimeout(() => toast(L('Ține apăsat pe butonul de limbă ca să alegi traducerea', 'Long-press the language button to choose the translation')), 1800); } }
}
function openMore(g) {
  const TT = TOPICS.find(t => t[0] === S.topic);
  const h = '<div class="ios">' +
    '<div class="grp">' +
    '<button class="mitem" data-mo="topic">' + I.tags + '<span>' + T('Tematic') + '</span><small>' + (TT ? TT[1] + ' ' + TT[2] : T('toate')) + '</small></button>' +
    '<button class="mitem" data-mo="save">' + I.save + '<span>' + T('Salvează') + '</span><small>›</small></button>' +
    '<button class="mitem" data-mo="ctx">' + I.book + '<span>' + T('Citește tot capitolul') + '</span><small>›</small></button>' +
    '<button class="mitem" data-mo="copy">' + '<svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8"/></svg>' + '<span>' + L('Copiază textul', 'Copy text') + '</span></button>' +
    '</div><div class="sec">' + (UI_EN ? 'Bible text' : 'Textul Bibliei') + '</div>' +
    '<div class="seg wide">' + [['ro', T('Română')], ['en', 'English'], ['both', T('Ambele')]].map(([v, t]) => '<button data-ml="' + v + '" class="' + (S.lang === v ? 'on' : '') + '">' + t + '</button>').join('') + '</div></div>';
  openSheet(label(g, S.lang === 'en' ? 'en' : 'ro'), h, body => {
    body.querySelectorAll('[data-mo]').forEach(b => b.onclick = () => {
      const k = b.dataset.mo; hap(0);
      if (k === 'topic') openTopics();
      else if (k === 'save') openSaveTo(g);
      else if (k === 'ctx') { closeSheet(); openChapter(g); }
      else if (k === 'copy') { const l = S.lang === 'en' ? 'en' : 'ro'; const t = '„' + txt(g, l) + '”\n— ' + label(g, l); try { A && A.copyText ? A.copyText(t) : clipCopy(t); } catch (e) {} closeSheet(); toast(T('Copiat')); }
    });
    body.querySelectorAll('[data-ml]').forEach(b => b.onclick = () => { S.lang = b.dataset.ml; persist(); hap(0); body.querySelectorAll('[data-ml]').forEach(x => x.classList.toggle('on', x === b)); refresh(); });
  });
}
function share(g) {
  const l = S.lang === 'en' ? 'en' : 'ro';
  let s = '„' + txt(g, l) + '”\n— ' + label(g, l) + ' (' + VER[l] + ')';
  if (S.lang === 'both') s += '\n\n"' + txt(g, 'en') + '"\n— ' + label(g, 'en') + ' (KJV)';
  if (A && A.share) A.share(s);
  else if (navigator.share) navigator.share({ text: s }).catch(() => {});
  else { try { clipCopy(s); toast(T('Copiat')); } catch (e) {} }
}

/* ---------- modes ---------- */
function setMode(m, g) {
  if (NARR.on && m !== 'read' && !NARR.auto) narrStop();
  const prevMode = mode; mode = m;
  document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('on', b.dataset.mode === m));
  if (m === 'read') { RD = { base: g != null ? g : (S.readPos || 0), i: 0 }; }
  if (m === T('plan')) {
    if (!S.plan) { mode = prevMode === T('plan') ? 'read' : prevMode; document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('on', b.dataset.mode === mode)); openPlans(); toast(T('Alege un plan de citire')); return; }
    const pd = planData(S.plan), pp = planProgress(S.plan);
    PL = { base: g != null ? g : (() => { const a = pd.dayStart[pp.next], e = pp.next + 1 < pd.days.length ? pd.dayStart[pp.next + 1] : pd.verses.length; for (let i = a; i < e; i++) if (!hasRead(pd.verses[i])) return i; return a; })(), i: 0 };
  }
  refresh(); onShown(); updateStats();
}
document.querySelectorAll('.tabs button').forEach(b => b.addEventListener('click', () => { if (b.dataset.mode !== mode) setMode(b.dataset.mode); }));

/* ---------- sheet ---------- */
let sheetStack = [];
function openSheet(title, html, mount, push) {
  if (!push) sheetStack = [];
  sheetStack.push({ title, html, mount });
  renderSheet();
}
function renderSheet() {
  const top = sheetStack[sheetStack.length - 1];
  $('#sheetTitle').textContent = top.title; $('#sheetBody').innerHTML = top.html; $('#sheetBody').scrollTop = 0; $('#sheet').scrollTop = 0; document.documentElement.scrollTop = document.body.scrollTop = 0;
  $('#sheetBack').classList.toggle('hidden', sheetStack.length < 2);
  $('#sheet').classList.remove('hidden'); $('#scrim').classList.remove('hidden'); document.documentElement.classList.add('sheeted');
  $('#sheetBody').classList.toggle('ios', top.title === T('Setări') || top.title === 'Settings');
  $('#sheetBody').scrollTop = 0;
  $('#sheet').style.setProperty('--fs', S.fs);
  top.mount && top.mount($('#sheetBody'));
}
function scrollTo(body, el, center, smooth) {
  const top = el.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop - (center ? (body.clientHeight - el.offsetHeight) / 2 : 8);
  body.scrollTo({ top: Math.max(0, top), behavior: smooth ? 'smooth' : 'auto' });
}
function closeSheet() { document.documentElement.classList.remove('sheeted'); $('#sheet').classList.add('hidden'); $('#scrim').classList.add('hidden'); sheetStack = []; }
function sheetBack() { if (sheetStack.length > 1) { sheetStack.pop(); renderSheet(); } else closeSheet(); }
$('#sheetClose').innerHTML = I.close; $('#sheetBack').innerHTML = I.back;
$('#sheetClose').onclick = closeSheet; $('#scrim').onclick = closeSheet; $('#sheetBack').onclick = sheetBack;
window.onAndroidBack = function () { if (STUDY.open && $('#sheet').classList.contains('hidden')) { if (stClosePv()) return true; { const fb = $('#stFindBox'); if (fb && !fb.classList.contains('hidden')) { stToggleFind(false); return true; } } if (stGoBack()) return true; const pp = $('#stPop'); if (pp && !pp.classList.contains('hidden')) { pp.classList.add('hidden'); return true; } closeStudy(); return true; } if (GT && !GT.done && !GT.hidden && $('#sheet').classList.contains('hidden')) { GT.hidden = true; renderGate(); return true; } if (!$('#sheet').classList.contains('hidden')) { sheetBack(); return true; } if (!$('#drawer').classList.contains('hidden')) { closePlans(); return true; } if (mode !== 'read') { setMode('read'); return true; } return false; };

function openChapter(g, push) {
  const r = ref(g); const l = S.lang === 'en' ? 'en' : 'ro';
  const vs = BIB[l][r.b][r.c].map((t, i) => txt(G(r.b, r.c, i), l));
  let h = '<button class="btn" data-go="' + g + '">' + I.book + T(' Citește de aici</button><button class="btn ghost" id="narr">') + I.headphones + T(' Ascultă cu narator</button>');
  if (r.c > 0) h += '<button class="btn ghost" data-ch="' + G(r.b, r.c - 1, 0) + T('">‹ Cap. ') + r.c + '</button>';
  if (r.c < VC[r.b].length - 1) h += '<button class="btn ghost" data-ch="' + G(r.b, r.c + 1, 0) + T('">Cap. ') + (r.c + 2) + ' ›</button>';
  h += T('<div class="hint" style="margin:0 0 8px">Atinge un verset pentru trimiteri și cuvintele originale.</div><div class="chapter">') + vs.map((t, i) => '<p data-g="' + G(r.b, r.c, i) + '" class="' + (i === r.v ? 'hl' : '') + '"><sup>' + (i + 1) + '</sup>' + esc(t) + '</p>').join('') + '</div>';
  const mount = body => {
    const hl = body.querySelector('.hl'); if (hl && r.v > 1) setTimeout(() => scrollTo(body, hl, true), 30);
    body.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { closeSheet(); setMode('read', +b.dataset.go); });
    body.querySelector('#narr').onclick = () => { closeSheet(); narrStart(g); };
    body.querySelectorAll('[data-ch]').forEach(b => b.onclick = () => { sheetStack.pop(); openChapter(+b.dataset.ch, true); });
    body.querySelectorAll('.chapter p').forEach(p => p.onclick = () => { body.querySelectorAll('.chapter p').forEach(q => q.classList.remove('hl')); p.classList.add('hl'); body.querySelector('[data-go]').dataset.go = p.dataset.g; openVerse(+p.dataset.g, true); });
  };
  openSheet(BK[l][r.b] + ' ' + (r.c + 1), h, mount, push || sheetStack.length > 0 && !$('#sheet').classList.contains('hidden'));
}

function booksHtml(list) {
  const l = S.lang === 'en' ? 'en' : 'ro'; const cb = ref(S.readPos || 0).b;
  const btn = b => '<button data-b="' + b + '" class="' + (b === cb ? 'cur' : '') + '">' + esc(BK[l][b]) + '</button>';
  if (list) return '<div class="grid">' + list.map(btn).join('') + '</div>';
  let h = T('<div class="sec">Vechiul Testament</div><div class="grid">');
  for (let b = 0; b < 39; b++) h += btn(b);
  h += T('</div><div class="sec">Noul Testament</div><div class="grid">');
  for (let b = 39; b < NB; b++) h += btn(b);
  return h + '</div>';
}
function openBooks() { openSearch(); }
function openChapters(b) {
  const l = S.lang === 'en' ? 'en' : 'ro'; const rp = ref(S.readPos || 0);
  let h = '<div class="grid ch">';
  for (let c = 0; c < VC[b].length; c++) h += '<button data-c="' + c + '" class="' + (rp.b === b && rp.c === c ? 'cur' : '') + '">' + (c + 1) + '</button>';
  h += '</div>';
  openSheet(BK[l][b], h, body => body.querySelectorAll('[data-c]').forEach(x => x.onclick = () => openVersePick(b, +x.dataset.c)), true);
}
function openVersePick(b, c) {
  const l = S.lang === 'en' ? 'en' : 'ro'; const rp = ref(S.readPos || 0);
  let h = '<button class="btn" id="whole">' + I.book + T(' Citește tot capitolul</button><div class="sec">Alege versetul</div><div class="grid ch">');
  for (let v = 0; v < VC[b][c]; v++) h += '<button data-v="' + v + '" class="' + (rp.b === b && rp.c === c && rp.v === v ? 'cur' : '') + '">' + (v + 1) + '</button>';
  h += '</div>';
  openSheet(BK[l][b] + ' ' + (c + 1), h, body => {
    body.querySelector('#whole').onclick = () => { closeSheet(); setMode('read', G(b, c, 0)); };
    body.querySelectorAll('[data-v]').forEach(x => x.onclick = () => { closeSheet(); setMode('read', G(b, c, +x.dataset.v)); });
  }, true);
}

function listItems(gs, empty, withDel) {
  if (!gs.length) return '<div class="empty">' + empty + '</div>';
  const l = S.lang === 'en' ? 'en' : 'ro';
  return gs.map(g => '<div class="item" data-g="' + g + '"><div class="t"><div class="r">' + esc(label(g, l)) + '</div><div class="x">' + esc(txt(g, l)) + '</div></div>' + (withDel ? '<button class="del" data-del="' + g + '">' + I.trash + '</button>' : '') + '</div>').join('');
}
function sysDark() {
  try { if (A && A.sysNight) return !!A.sysNight(); } catch (e) {}
  try { return matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) { return true; }
}
function isDay() { const m = S.mode || 'auto'; return m === 'day' || (m === 'auto' && !sysDark()); }
function applyTheme() {
  const day = isDay(), el = document.documentElement;
  el.classList.add('classic'); el.classList.toggle('day', day); el.classList.toggle('en', !!UI_EN); el.classList.toggle('tab', Math.min(innerWidth, innerHeight) >= 600);
  const mc = document.querySelector('meta[name=theme-color]'); if (mc) mc.content = day ? '#f5f2eb' : '#0b0b10';
  try { A && A.setBars && A.setBars(day ? '#f5f2eb' : '#0b0b10', day); } catch (e) {}
}
window.onSysTheme = () => { applyTheme(); };
try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => applyTheme()); } catch (e) {}
applyTheme();
S.cols = S.cols || [];
function colById(id) { return S.cols.find(c => c.id === id); }
function saveVerse(g) { if (!S.saved[g]) { S.saved[g] = Date.now(); persist(); refresh(); } }
function unsaveVerse(g) { delete S.saved[g]; S.cols.forEach(c => delete c.items[g]); persist(); refresh(); }
function coverStyle(seed) { const p = PAL[(seed * 37 + 11) % PAL.length]; return 'background:linear-gradient(150deg,' + p[2] + ',' + p[0] + ' 55%,' + p[1] + ')'; }
function openSaveTo(g, push) {
  saveVerse(g);
  if (S.lastCol && colById(S.lastCol) && !S.cols.some(c => c.items[g])) { colById(S.lastCol).items[g] = Date.now(); persist(); }
  const l = S.lang === 'en' ? 'en' : 'ro';
  let h = '<div class="svhead"><div class="svcover" style="' + coverStyle(g) + '">' + I.save + '</div><div><b>' + L('Salvat', 'Saved') + ' ✓</b><small>' + esc(label(g, l)) + ' · ' + esc(txt(g, l).slice(0, 60)) + '…</small></div></div>';
  h += '<div class="sec">' + L('Adaugă în colecție', 'Add to collection') + '</div>';
  h += S.cols.map(c => { const on = !!c.items[g]; const n = Object.keys(c.items).length; return '<button class="crow ' + (on ? 'on' : '') + '" data-c="' + c.id + '"><span class="ccov" style="' + coverStyle(n + c.id.length * 7) + '"></span><span class="bt"><b>' + esc(c.name) + '</b><small>' + n + ' ' + L(n === 1 ? 'verset' : 'versete', n === 1 ? 'verse' : 'verses') + '</small></span><span class="chk">' + (on ? '✓' : '') + '</span></button>'; }).join('');
  h += '<div class="newcol"><input id="ncn" class="search" maxlength="40" placeholder="' + L('Colecție nouă (ex. Rugăciune, Familie)', 'New collection (e.g. Prayer, Family)') + '"><button class="btn" id="ncb" style="margin:0">' + L('Creează', 'Create') + '</button></div>';
  h += '<button class="btn ghost" id="unsv" style="margin-top:18px;color:#ff8a8a">' + L('Scoate din salvate', 'Remove from saved') + '</button>';
  openSheet(L('Salvează în colecție', 'Save to collection'), h, body => {
    body.querySelectorAll('.crow').forEach(r => r.onclick = () => { const c = colById(r.dataset.c); if (c.items[g]) delete c.items[g]; else { c.items[g] = Date.now(); S.lastCol = c.id; haptic(); } persist(); r.classList.toggle('on', !!c.items[g]); r.querySelector('.chk').textContent = c.items[g] ? '✓' : ''; const n = Object.keys(c.items).length; r.querySelector('small').textContent = n + ' ' + L(n === 1 ? 'verset' : 'versete', n === 1 ? 'verse' : 'verses'); });
    const mk = () => { const v = body.querySelector('#ncn').value.trim(); if (!v) { body.querySelector('#ncn').focus(); return; } const c = { id: 'c' + Date.now(), name: v, items: {} }; c.items[g] = Date.now(); S.cols.unshift(c); S.lastCol = c.id; persist(); haptic(); toast(L('Colecția „' + v + '” a fost creată', 'Collection “' + v + '” created')); sheetStack.pop(); openSaveTo(g, true); };
    body.querySelector('#ncb').onclick = mk;
    body.querySelector('#ncn').onkeydown = e => { if (e.key === 'Enter') mk(); };
    body.querySelector('#unsv').onclick = () => { unsaveVerse(g); toast(L('Scos din salvate', 'Removed from saved')); sheetBack(); };
  }, push || sheetOpen());
}
function openSaved(which) {
  which = which || 'saved';
  let h = '<div class="seg" style="margin-bottom:12px;display:inline-flex"><button data-w="saved" class="' + (which === 'saved' ? 'on' : '') + '">' + L('Salvate', 'Saved') + ' (' + Object.keys(S.saved).length + ')</button><button data-w="liked" class="' + (which === 'liked' ? 'on' : '') + '">' + L('Apreciate', 'Liked') + ' (' + Object.keys(S.liked).length + ')</button></div>';
  if (which === 'liked') {
    const gs = Object.keys(S.liked).sort((a, b) => S.liked[b] - S.liked[a]).map(Number);
    h += listItems(gs, T('Niciun verset apreciat încă.<br>Atinge de două ori un verset.'), true);
  } else {
    const all = Object.keys(S.saved).sort((a, b) => S.saved[b] - S.saved[a]).map(Number);
    const l = S.lang === 'en' ? 'en' : 'ro';
    const card = (id, name, gs) => '<button class="ccard" data-open="' + id + '"><div class="ccover2" style="' + coverStyle(gs[0] != null ? gs[0] : name.length) + '">' + (gs[0] != null ? '<span>' + esc(txt(gs[0], l).slice(0, 70)) + '…</span>' : '<span class="empty2">' + I.save + '</span>') + '</div><b>' + esc(name) + '</b><small>' + gs.length + ' ' + L(gs.length === 1 ? 'verset' : 'versete', gs.length === 1 ? 'verse' : 'verses') + '</small></button>';
    h += '<div class="cgrid">' + card('all', L('Toate salvatele', 'All saved'), all);
    S.cols.forEach(c => { const gs = Object.keys(c.items).sort((a, b) => c.items[b] - c.items[a]).map(Number); h += card(c.id, c.name, gs); });
    h += '<button class="ccard new" data-new="1"><div class="ccover2 plus">+</div><b>' + L('Colecție nouă', 'New collection') + '</b><small>&nbsp;</small></button></div>';
    if (!all.length) h += '<p class="hint">' + L('Salvează un verset: ține apăsat pe ❤ sau deschide versetul și apasă „Salvează”.', 'Save a verse: long-press ❤ or open the verse and tap “Save”.') + '</p>';
  }
  openSheet(T('Versetele mele'), h, body => {
    body.querySelectorAll('[data-w]').forEach(b => b.onclick = () => { sheetStack.pop(); openSaved(b.dataset.w); });
    body.querySelectorAll('[data-del]').forEach(b => b.onclick = ev => { ev.stopPropagation(); delete S.liked[b.dataset.del]; persist(); refresh(); sheetStack.pop(); openSaved(which); });
    body.querySelectorAll('.item').forEach(it => it.onclick = () => openVerse(+it.dataset.g, true));
    body.querySelectorAll('[data-open]').forEach(b => b.onclick = () => openCollection(b.dataset.open));
    const nb = body.querySelector('[data-new]'); nb && (nb.onclick = () => openNewCollection());
  }, sheetStack.length > 0 && !$('#sheet').classList.contains('hidden'));
}
function openNewCollection() {
  const h = '<input id="ncn" class="search" maxlength="40" placeholder="' + L('Numele colecției', 'Collection name') + '"><div class="grid hb" style="margin-top:12px">' + (UI_EN ? ['Prayer', 'Promises', 'Family', 'Encouragement', 'To memorize', 'Sermon'] : ['Rugăciune', 'Promisiuni', 'Familie', 'Încurajare', 'De memorat', 'Predică']).map(x => '<button data-q="' + x + '">' + x + '</button>').join('') + '</div><button class="btn" id="ok" style="width:100%;justify-content:center;margin-top:16px">' + L('Creează colecția', 'Create collection') + '</button>';
  openSheet(L('Colecție nouă', 'New collection'), h, body => {
    const inp = body.querySelector('#ncn');
    body.querySelectorAll('[data-q]').forEach(b => b.onclick = () => { inp.value = b.dataset.q; });
    const mk = () => { const v = inp.value.trim(); if (!v) { inp.focus(); return; } S.cols.unshift({ id: 'c' + Date.now(), name: v, items: {} }); persist(); haptic(); sheetStack.pop(); sheetStack.pop(); openSaved('saved'); };
    body.querySelector('#ok').onclick = mk; inp.onkeydown = e => { if (e.key === 'Enter') mk(); };
  }, true);
}
function openCollection(id) {
  const isAll = id === 'all'; const c = isAll ? null : colById(id);
  const src = isAll ? S.saved : c.items;
  const gs = Object.keys(src).sort((a, b) => src[b] - src[a]).map(Number);
  let h = '';
  if (!isAll) h += '<div class="colbar"><button class="btn ghost" id="ren" style="margin:0">✎ ' + L('Redenumește', 'Rename') + '</button><button class="btn ghost" id="delc" style="margin:0;color:#ff8a8a">' + L('Șterge colecția', 'Delete collection') + '</button></div><div id="renbox" class="newcol hidden"><input id="rnv" class="search" maxlength="40" value="' + esc(c.name) + '"><button class="btn" id="rnok" style="margin:0">OK</button></div>';
  h += listItems(gs, isAll ? T('Nimic salvat încă.<br>Apasă pe semnul de carte de pe un verset.') : L('Colecția e goală.<br>Când salvezi un verset, bifeaz-o.', 'This collection is empty.<br>Tick it when you save a verse.'), true);
  if (!isAll && gs.length) h += '<p class="hint">' + L('🗑 scoate versetul doar din această colecție.', '🗑 removes the verse from this collection only.') + '</p>';
  openSheet(isAll ? L('Toate salvatele', 'All saved') : c.name, h, body => {
    body.querySelectorAll('.item').forEach(it => it.onclick = () => openVerse(+it.dataset.g, true));
    body.querySelectorAll('[data-del]').forEach(b => b.onclick = ev => { ev.stopPropagation(); const g = +b.dataset.del; if (isAll) unsaveVerse(g); else { delete c.items[g]; persist(); } sheetStack.pop(); openCollection(id); });
    if (!isAll) {
      body.querySelector('#ren').onclick = () => body.querySelector('#renbox').classList.toggle('hidden');
      body.querySelector('#rnok').onclick = () => { const v = body.querySelector('#rnv').value.trim(); if (v) { c.name = v; persist(); } sheetStack.pop(); openCollection(id); };
      body.querySelector('#delc').onclick = () => { if (!confirmTwice('dc' + id)) return; S.cols = S.cols.filter(x => x.id !== id); persist(); toast(L('Colecția a fost ștearsă (versetele rămân salvate)', 'Collection deleted (verses stay saved)')); sheetStack.pop(); sheetStack.pop(); openSaved('saved'); };
    }
  }, true);
}

/* search */
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[șş]/g, 's').replace(/[țţ]/g, 't').toLowerCase();
const NORMC = {};
function normAll(l) { if (NORMC[l]) return NORMC[l]; const a = new Array(TOTAL); let i = 0; for (const b of BIB[l]) for (const c of b) for (const v of c) a[i++] = norm(v); return NORMC[l] = a; }
function parseRef(q) {
  const m = norm(q).trim().match(/^(.+?)\s*(\d+)(?:\s*[:.,\s]\s*(\d+))?$/); if (!m) return null;
  const name = m[1].trim().replace(/\s+/g, ' '); if (!name) return null;
  for (const l of ['ro', 'en']) for (let b = 0; b < NB; b++) {
    const n = norm(BK[l][b]);
    if (n === name || (name.length >= 2 && n.startsWith(name))) {
      const c = +m[2] - 1, v = m[3] ? +m[3] - 1 : 0;
      if (VC[b][c] && v < VC[b][c]) return G(b, c, v);
    }
  }
  return null;
}
let lastQ = '';
function openSearch() {
  lastQ = '';
  const h = T('<div class="sbar"><input class="search" id="q" placeholder="Caută: cuvinte, carte, „Ioan 3:16”, „G25”" autocomplete="off"><button id="qx" class="qx hidden">✕</button></div><div class="hint">Caută în ') + (S.lang === 'en' ? 'KJV' : 'Cornilescu') + T(' · diacriticele nu contează · sau alege cartea de mai jos</div><div id="res"></div><div id="browse">') + booksHtml() + '</div>';
  openSheet(T('Caută și alege'), h, body => {
    const q = body.querySelector('#q'); const res = body.querySelector('#res'); const br = body.querySelector('#browse'); const qx = body.querySelector('#qx'); let t = 0;
    const bindBooks = el => el.querySelectorAll('[data-b]').forEach(x => x.onclick = () => openChapters(+x.dataset.b));
    bindBooks(br);
    const cur = br.querySelector('.cur'); cur && setTimeout(() => scrollTo(body, cur, true), 30);
    qx.onclick = () => { q.value = ''; lastQ = ''; run(); q.focus(); };
    const run = () => {
      const s = q.value.trim(); lastQ = q.value; qx.classList.toggle('hidden', !s);
      if (s.length < 2) { res.innerHTML = ''; br.classList.remove('hidden'); return; }
      br.classList.add('hidden');
      const nq = norm(s); const bm = []; for (let b = 0; b < NB; b++) if (norm(BK.ro[b]).startsWith(nq) || norm(BK.en[b]).startsWith(nq) || (nq.length >= 3 && norm(BK.ro[b]).includes(nq))) bm.push(b);
      const booksPart = bm.length ? T('<div class="sec">Cărți</div>') + booksHtml(bm) : '';
      const l = S.lang === 'en' ? 'en' : 'ro';
      const sm = s.trim().match(/^([HhGg])\s*0*(\d{1,4})$/);
      if (sm) { const code = sm[1].toUpperCase() + (+sm[2]); if (lexEntry(code)) { res.innerHTML = T('<div class="sec">Strong</div><button class="mitem" id="goS">') + I.book + code + ' – ' + esc(lexEntry(code)[0]) + ' (' + esc(lexEntry(code)[1]) + ')</button>'; res.querySelector('#goS').onclick = () => openWord(code, true); } else { loadLex(run); res.innerHTML = T('<div class="empty">Se încarcă dicționarul…</div>'); } return; }
      const rg = parseRef(s); let out = booksPart;
      if (rg != null) out += T('<div class="sec">Referință</div>') + listItems([rg], '', false);
      const ns = norm(s); const arr = normAll(l); const hits = [];
      for (let i = 0; i < TOTAL && hits.length < 200; i++) if (arr[i].includes(ns)) hits.push(i);
      if (hits.length || rg == null) out += '<div class="sec">' + (hits.length >= 200 ? '200+' : hits.length) + T(' rezultate</div>') + listItems(hits, T('Niciun rezultat.'), false);
      res.innerHTML = out;
      if (ns.length >= 3) res.querySelectorAll('.x').forEach(x => { const raw = x.textContent; const nr = norm(raw); const p = nr.indexOf(ns); if (p >= 0) x.innerHTML = esc(raw.slice(0, p)) + '<mark>' + esc(raw.slice(p, p + ns.length)) + '</mark>' + esc(raw.slice(p + ns.length)); });
      res.querySelectorAll('.item').forEach(it => it.onclick = () => openVerse(+it.dataset.g, true));
      bindBooks(res);
    };
    q.oninput = () => { clearTimeout(t); t = setTimeout(run, 280); };
    q.onkeydown = e => { if (e.key === 'Enter') { clearTimeout(t); run(); q.blur(); } };
    if (lastQ) { q.value = lastQ; run(); }
  });
}


/* ---------- study: verse sheet, cross references, original words ---------- */
let lexCbs = null;
function loadLex(cb) {
  if (window.LEX_H) { cb && cb(); return; }
  if (lexCbs) { cb && lexCbs.push(cb); return; }
  lexCbs = cb ? [cb] : [];
  const sc = document.createElement('script'); sc.src = 'strongs.js';
  const done = () => { const c = lexCbs; lexCbs = null; c.forEach(f => f()); };
  sc.onload = () => {
    const r = document.createElement('script'); r.src = 'strongs_ro.js'; r.onload = done; r.onerror = done; document.body.appendChild(r);
  };
  document.body.appendChild(sc);
}
const roDef = code => (!UI_EN && window.LEX_RO && LEX_RO[code]) || null;
const meaning = (code, e) => roDef(code) || e[3] || '';
const SUP = { e: 'ᵉ', a: 'ᵃ', o: 'ᵒ', i: 'ⁱ', u: 'ᵘ' };
function lexClean(t) { // the Strong's source has some markup in the transliteration/pronunciation fields
  if (typeof t !== 'string' || (t.indexOf('<') < 0 && t.indexOf('{') < 0)) return t;
  return t.replace(/<hi rend="super">([^<]*)<\/hi>/g, (m, x) => x.split('').map(ch => SUP[ch] || ch).join(''))
    .replace(/<[^>]+>/g, '').replace(/\s*\}\s*\{\s*/g, ' / ').replace(/[{}]/g, '').replace(/\s+/g, ' ').trim();
}
function lexEntry(code) {
  if (!window.LEX_H) return null; const n = +code.slice(1); const e = (code[0] === 'H' ? LEX_H : LEX_G)[n] || null;
  if (e && !e._c) { for (let i = 0; i < e.length; i++) e[i] = lexClean(e[i]); e[0] = e[0].replace(/\s{2,}/g, ' · '); e[1] = e[1].replace(/\s{2,}/g, ' · '); if (e[2] && e[2].trim()) { e[1] = e[2].trim().replace(/\s{2,}/g, ' · '); e[2] = ''; } try { Object.defineProperty(e, '_c', { value: 1 }); } catch (x) {} }
  return e;
}
const ETYM = /^\s*(?:\((?:caldeeană|aramaică)\)\s*;?\s*)?(?:(?:o |un )?(?:rădăcină primară|particulă primară|cuvânt primar|verb primar)|(?:din|plural de la|feminin de la|masculin de la|formă prelungită a|o variantă pentru|la fel ca|corespunzător lui|compară)\b[^;]*|de (?:origine|înrudire|derivare) [^;]*|probabil din[^;]*|poate din[^;]*|aparent din[^;]*)\s*[;,]\s*/i;
const shortDef = (e, code) => { const ro = code && roDef(code); let d = ro || (e[4] || e[3] || ''); if (ro) { d = d.replace(/^[\s,;:]+/, ''); for (let k = 0; k < 3 && ETYM.test(d); k++) d = d.replace(ETYM, ''); d = d.charAt(0).toUpperCase() + d.slice(1); } d = d.replace(/^[-–\s]+/, ''); return d.length > 80 ? d.slice(0, 78) + '…' : d; };
function sheetOpen() { return !$('#sheet').classList.contains('hidden'); }

function chronItemFor(g) {
  if (!window.CHRON) return null; const e = pEncG(g), ch = Math.floor(e / 1000), keep = CR.mode;
  for (const md of [keep, keep === 'g' ? 'm' : 'g']) { CR.mode = md; const its = crItems();
    let k = its.findIndex(it => (it[7] || []).includes(e)); if (k < 0) k = its.findIndex(it => (it[7] || []).some(r => Math.floor(r / 1000) === ch));
    if (k < 0 && window.PEOPLE) { const ps = peopleInVerse(g); if (ps.length) k = its.findIndex(it => ps.indexOf(crPersonIdx(it)) >= 0); }
    if (k < 0) { let bd = 9; its.forEach((it, j) => (it[7] || []).forEach(r => { const d = ch - Math.floor(r / 1000); if (Math.floor(r / 1e6) === Math.floor(e / 1e6) && d >= 0 && d < bd) { bd = d; k = j; } })); }
    if (k >= 0) { CR.mode = keep; return [md, k, its[k]]; } }
  CR.mode = keep; return null;
}
function openChronAtG(g) {
  const x = chronItemFor(g); if (!x) { openChron(); return; }
  closeSheet(); openChron(); const t0 = Date.now();
  const w = () => { if (!$('#crSc') || !window.CHRON) { if (Date.now() - t0 < 4000) setTimeout(w, 80); return; } const y = chronItemFor(g); if (!y) return; if (CR.mode !== y[0]) { CR.mode = y[0]; const seg = document.querySelector('#crMode [data-m="' + y[0] + '"]'); if (seg) { seg.click(); setTimeout(() => crGoItem(chronItemFor(g)[1]), 120); return; } } crGoItem(y[1]); };
  setTimeout(w, 120);
}
function vLinks(body, g) {
  const box = body.querySelector('#vlinks'); if (!box) return;
  loadChron(() => loadPeople(() => loadGeo(() => {
    if (!box.isConnected) return; const ps = peopleInVerse(g), pl = placesInVerse(g), ci = chronItemFor(g), l = S.lang === 'en' ? 'en' : 'ro';
    box.innerHTML = (ci ? '<button class="chip" data-vl="c">🕰 ' + L('Cronologie', 'Timeline') + ' <small>' + esc(String(ci[2][0]).slice(0, 26)) + '</small></button>' : '') +
      (ps.length ? '<button class="chip" data-vl="p">👤 ' + L('Persoane', 'People') + ' <small>' + ps.length + '</small></button>' : '') +
      (pl.length ? '<button class="chip" data-vl="m">📍 ' + L('Hartă', 'Map') + ' <small>' + pl.length + '</small></button>' : '');
    box.onclick = e => { const b = e.target.closest('[data-vl]'); if (!b) return; const k = b.dataset.vl, r = ref(g);
      if (k === 'c') openChronAtG(g);
      else if (k === 'p') fnPop(b, '<div class="fn-h">' + L('Persoane în acest verset', 'People in this verse') + '</div>' + ps.map(i => pMiniI(i)).join(''), pop => pop.querySelectorAll('[data-p]').forEach(x => x.onclick = () => { pop.remove(); openPerson(+x.dataset.p); }));
      else if (k === 'm') { closeSheet(); openMap(pl, label(g, l), [r.b, r.c, pEncG(g)]); } };
  })));
}
function openVerse(g, push, focus, tapped) {
  if (!window.LEX_H) { loadLex(() => openVerse(g, push, focus, tapped)); return; }
  const l = S.lang === 'en' ? 'en' : 'ro';
  let h = '<div class="vbox"><p class="vt">' + rich(g, l) + '</p>';
  if (S.lang === 'both' || l === 'ro') h += '<p class="vt2">' + rich(g, l === 'ro' ? 'en' : 'ro') + '</p>';
  h += '</div>';
  h += '<button class="btn" data-go="' + g + '">' + I.book + T(' Citește de aici</button><button class="btn ghost" data-chap="') + g + T('">Capitolul</button><button class="btn ghost" data-sv="') + g + '">' + (S.saved[g] ? T('Salvat ✓') : T('Salvează')) + '</button><button class="btn ghost" data-nt="' + g + '">' + I.pen + ' ' + L('În notițe', 'To notes') + '</button>';
  const xs = xrefs(g);
  h += T('<div class="sec" id="xr">Trimiteri (') + xs.length + ')</div>';
  h += xs.length ? '<div class="chips big">' + xs.map(x => '<button class="chip" data-x="' + x.g + '">' + esc(xlabel(x, l)) + '</button>').join('') + '</div>' : T('<div class="hint">Nu există trimiteri pentru acest verset.</div>');
  h += '<div class="chips vlinks" id="vlinks"></div>';
  const ws = origWords(g);
  h += T('<div class="sec" id="words">Cuvinte originale – ') + (isNT(g) ? T('greacă') : T('ebraică')) + '</div>';
  if (tapped) h += T('<div class="hint">Ai atins „') + esc(tapped) + T('”. Alege cuvântul corespunzător din lista de mai jos (textul românesc nu e aliniat cuvânt cu cuvânt cu originalul).</div>');
  h += ws.map(w => { const e = lexEntry(w.s) || ['', '', '', '', '']; return '<button class="orow" data-s="' + w.s + '"><span class="oen">' + esc(w.en) + '</span><span class="oor ' + (w.s[0] === 'H' ? 'heb' : 'grk') + '">' + esc(e[0]) + '</span><span class="otr">' + esc(e[1]) + ' · ' + w.s + '</span><span class="odef">' + esc(shortDef(e, w.s)) + '</span></button>'; }).join('');
  openSheet(label(g, l), h, body => {
    vLinks(body, g);
    body.querySelectorAll('[data-onv]').forEach(b => b.onclick = () => openOnv(b.dataset.onv, +b.dataset.g));
    body.querySelectorAll('[data-x]').forEach(b => b.onclick = () => openVerse(+b.dataset.x, true));
    body.querySelectorAll('.orow').forEach(b => b.onclick = () => openWord(b.dataset.s, true, g));
    body.querySelectorAll('.vbox .w').forEach(w => w.onclick = () => { if (w.dataset.s) openWord(w.dataset.s.split(' ')[0], true, g); else loadAlign(() => { const oc = alignRo(g, w.textContent, w); if (oc) openWord(oc, true, g); else { const t = body.querySelector('#words'); t && scrollTo(body, t, false, true); } }); });
    body.querySelector('[data-go]').onclick = () => { closeSheet(); setMode('read', g); };
    body.querySelector('[data-chap]').onclick = () => openChapter(g, true);
    body.querySelector('[data-sv]').onclick = () => openSaveTo(g, true);
    body.querySelector('[data-nt]').onclick = () => stAddFromSheet({ type: 'v', gs: [g] });
    if (focus) { const t = body.querySelector('#' + focus); t && setTimeout(() => scrollTo(body, t), 40); }
  }, push || sheetOpen());
}

const OCC = {};
function occurrences(code) {
  if (OCC[code]) return OCC[code];
  const nt = code[0] === 'G', n = code.slice(1); const re = new RegExp('\\|(?:[\\d.]*\\.)?' + n + '(?:\\.[\\d.]*)?\\}');
  const out = []; let g = 0; const words = {};
  BIB.en.forEach((bk, b) => bk.forEach(ch => ch.forEach(v => {
    if ((b >= 39) === nt && re.test(v)) {
      out.push(g);
      let m; TAGRE.lastIndex = 0; while ((m = TAGRE.exec(v))) if (m[2].split('.').includes(n)) { const k = m[1].toLowerCase(); words[k] = (words[k] || 0) + 1; }
    }
    g++;
  })));
  return OCC[code] = { gs: out, words: Object.entries(words).sort((a, b) => b[1] - a[1]) };
}
let extCbs = null;
function loadExt(cb) {
  if (window.LEX_EXT && (S.lang === 'en' || window.LEX_EXT_RO || window.__extRoFail)) { cb && cb(); return; }
  if (window.LEX_EXT && !UI_EN && !window.LEX_EXT_RO) { const r = document.createElement('script'); r.src = 'lex_ext_ro.js'; r.onload = () => cb && cb(); r.onerror = () => { window.__extRoFail = 1; cb && cb(); }; document.head.appendChild(r); return; }
  if (extCbs) { cb && extCbs.push(cb); return; }
  extCbs = cb ? [cb] : []; const sc = document.createElement('script'); sc.src = 'lex_ext.js';
  sc.onload = () => {
    const done = () => { const c = extCbs; extCbs = null; c.forEach(f => f()); };
    if (S.lang === 'en') return done();
    const r = document.createElement('script'); r.src = 'lex_ext_ro.js'; r.onload = done; r.onerror = () => { window.__extRoFail = 1; done(); }; document.head.appendChild(r);
  };
  sc.onerror = () => { extCbs = null; toast(L('Lexiconul extins nu s-a putut încărca', 'Extended lexicon failed to load')); };
  document.head.appendChild(sc);
}
/* extended lexicon (STEPBible: abridged BDB for Hebrew, Abbott-Smith for Greek; CC BY)
   Verse references become small * footnotes, Strong numbers become tiny superscripts – both open in a popup,
   so long articles (especially biographies) stay easy to read. Original English and sources sit behind buttons. */
function extHtml(code, showEn) {
  const l = S.lang === 'en' ? 'en' : 'ro'; const ro = l === 'ro' && (window.LEX_EXT_RO || {})[code];
  const en = (window.LEX_EXT || {})[code]; const ex = (ro && !showEn) ? ro : en;
  if (!ex || !ex.length) return '<p class="hint">' + L('Nu există explicație extinsă pentru acest cuvânt.', 'No extended entry for this word.') + '</p>';
  const all = [];
  const body = ex.map(([gl, h]) => {
    // valid verse anchors -> g numbers
    h = h.replace(/<a data-r="(\d+)\.(\d+)\.(\d+)">[^<]*<\/a>/g, (m, b, c, v) => { b = +b; c = +c - 1; v = +v - 1; if (b >= NB || c < 0 || c >= VC[b].length || v < 0 || v >= VC[b][c]) return ''; return '\u0001' + G(b, c, v) + '\u0002'; });
    // runs of references ("Gen 1:1; Exo 2:3, …", optionally in parentheses) -> one footnote
    h = h.replace(/\(?\s*(?:\u0001\d+\u0002[\s,;]*(?:și|and|cf\.|vezi|see)?[\s,;]*)+\)?/g, run => {
      const gs = [...run.matchAll(/\u0001(\d+)\u0002/g)].map(x => +x[1]); if (!gs.length) return run;
      all.push(...gs); const lead = /^\s/.test(run) ? '' : ''; return lead + '<sup class="fn" data-gs="' + gs.join(',') + '">*' + (gs.length > 1 ? gs.length : '') + '</sup> ';
    });
    // Strong numbers -> tiny superscripts; "(H175)" loses its brackets
    h = h.replace(/\(\s*([HG])0*(\d{1,4})[A-Z]?\s*\)/g, '<sup class="fs" data-s="$1$2">$1$2</sup>')
         .replace(/\b([HG])0*(\d{1,4})[A-Z]?\b(?![^<]*>)/g, '<sup class="fs" data-s="$1$2">$1$2</sup>')
         .replace(/\s+(<sup)/g, '$1').replace(/\(\s*\)/g, '').replace(/\s+([,;.])/g, '$1')
         .replace(/[,;:]\s*(<sup class="fn"[^>]*>[^<]*<\/sup>)/g, '$1').replace(/(<\/sup>)\s*([,;])\s*(?=[.;,]|<br>|$)/g, '$1');
    return '<div class="xs">' + (ex.length > 1 ? '<b class="xg">' + esc(gl) + '</b>' : '') + '<div class="xh">' + h + '</div></div>';
  }).join('');
  const uniq = [...new Set(all)];
  return body + '<div class="xbar">' +
    (uniq.length ? '<button class="xb" data-x="refs" data-gs="' + uniq.join(',') + '">* ' + L('Trimiteri', 'References') + ' <small>' + uniq.length + '</small></button>' : '') +
    (ro ? '<button class="xb" data-x="lang">' + (showEn ? L('Traducerea în română', 'Romanian') : L('Originalul (engleză)', 'Original (English)')) + '</button>' : '') +
    '<button class="xb" data-x="src">' + L('Surse', 'Sources') + '</button></div>';
}
function extSources(code) {
  const heb = code[0] === 'H', n = +code.slice(1);
  return '<div class="xsrcs">' +
    '<p><b>' + (heb ? 'Brown–Driver–Briggs (BDB), <i>A Hebrew and English Lexicon of the Old Testament</i>, 1906' : 'G. Abbott-Smith, <i>A Manual Greek Lexicon of the New Testament</i>, 1922') + '</b><br><small>' + L('Lexicon academic clasic · ediție prescurtată în setul de date STEPBible (Tyndale House, Cambridge), licență CC BY 4.0', 'Classic academic lexicon · abridged edition in the STEPBible dataset (Tyndale House, Cambridge), CC BY 4.0') + '</small></p>' +
    '<p><b>Strong’s Exhaustive Concordance</b>, 1890 · ' + L('numerotarea cuvintelor', 'word numbering') + '</p>' +
    '<p class="xlinks"><a href="https://github.com/STEPBible/STEPBible-Data" data-url>STEPBible-Data (GitHub)</a>' +
    '<a href="https://biblehub.com/' + (heb ? 'hebrew' : 'greek') + '/' + n + '.htm" data-url>Bible Hub · ' + code + '</a>' +
    '<a href="https://www.blueletterbible.org/lexicon/' + code.toLowerCase() + '/kjv/' + (heb ? 'wlc' : 'tr') + '/0-1/" data-url>Blue Letter Bible · ' + code + '</a></p>' +
    (!UI_EN && (window.LEX_EXT_RO || {})[code] ? '<p><small>' + L('Traducerea în română a articolului e făcută pentru această aplicație; pentru citare folosește originalul.', 'The Romanian translation was made for this app; cite the original.') + '</small></p>' : '') + '</div>';
}
/* one small popover for footnotes and Strong superscripts */
function fnPop(anchor, html, bind) {
  let p = document.getElementById('fnPop'); if (p) p.remove();
  p = document.createElement('div'); p.id = 'fnPop'; p.className = 'fn-pop'; p.innerHTML = html; document.body.appendChild(p);
  const r = anchor.getBoundingClientRect(), w = Math.min(340, innerWidth - 20);
  p.style.width = w + 'px'; p.style.left = Math.max(10, Math.min(innerWidth - w - 10, r.left - w / 2)) + 'px';
  const below = r.bottom + 8, ph = p.offsetHeight; p.style.top = (below + ph < innerHeight - 10 ? below : Math.max(10, r.top - ph - 8)) + 'px';
  const off = e => { if (!p.contains(e.target) && e.target !== anchor) { p.remove(); document.removeEventListener('pointerdown', off, true); } };
  setTimeout(() => document.addEventListener('pointerdown', off, true), 0);
  bind && bind(p); hap(0); return p;
}
function bindExt(box, code, ctx) { // ctx: 'sheet' (word sheet) | 'study'
  const l = S.lang === 'en' ? 'en' : 'ro';
  const openG = g => { const p = document.getElementById('fnPop'); if (p) p.remove(); if (ctx === 'study') stPreview(g, 0); else openVerse(g, true); };
  const openS = c => { const p = document.getElementById('fnPop'); if (p) p.remove(); if (ctx === 'study') stStrongPv(c); else openWord(c, true); };
  const refsHtml = gs => '<div class="fn-h">' + (gs.length === 1 ? L('Trimitere', 'Reference') : gs.length + L(' trimiteri', ' references')) + '</div>' +
    (gs.length === 1 ? '<button class="fn-r one" data-g="' + gs[0] + '"><b>' + esc(slabel(gs[0], l)) + '</b><span>' + esc(txt(gs[0], l)) + '</span></button><button class="fn-more" data-g="' + gs[0] + '">' + L('Deschide versetul', 'Open verse') + ' ›</button>'
      : gs.slice(0, 40).map(g => '<button class="fn-r" data-g="' + g + '"><b>' + esc(slabel(g, l)) + '</b><span>' + esc(txt(g, l).slice(0, 90)) + (txt(g, l).length > 90 ? '…' : '') + '</span></button>').join(''));
  box.onclick = e => {
    const fn = e.target.closest('.fn,[data-x=refs]');
    if (fn) { e.stopPropagation(); const gs = fn.dataset.gs.split(',').map(Number); fnPop(fn, refsHtml(gs), p => p.querySelectorAll('[data-g]').forEach(b => b.onclick = () => openG(+b.dataset.g))); return; }
    const fs = e.target.closest('.fs');
    if (fs) { e.stopPropagation(); const c = fs.dataset.s, en = lexEntry(c);
      fnPop(fs, '<div class="fn-h">' + c + '</div>' + (en ? '<div class="fn-w"><span class="' + (c[0] === 'H' ? 'heb' : 'grk') + '">' + esc(en[0]) + '</span> <i>' + esc(en[1]) + '</i></div><p>' + esc(shortDef(en, c).slice(0, 160)) + '</p>' : '') + '<button class="fn-more" data-s="' + c + '">' + L('Deschide cuvântul', 'Open word') + ' ›</button>',
        p => p.querySelector('[data-s]').onclick = () => openS(c)); return; }
    const x = e.target.closest('[data-x]'); if (!x) return; e.stopPropagation();
    if (x.dataset.x === 'lang') { box.dataset.en = box.dataset.en === '1' ? '' : '1'; box.innerHTML = extHtml(code, box.dataset.en === '1'); hap(0); return; }
    if (x.dataset.x === 'src') fnPop(x, '<div class="fn-h">' + L('Surse', 'Sources') + '</div>' + extSources(code), p => p.querySelectorAll('[data-url]').forEach(a => a.onclick = ev => { ev.preventDefault(); try { A && A.openUrl ? A.openUrl(a.href) : window.open(a.href, '_blank'); } catch (er) {} }));
  };
}
/* Bible dictionary: Easton's Illustrated Bible Dictionary (1897) + Hitchcock's Bible Names (public domain).
   Tapping a word in a verse looks for an entry among the KJV words of that verse; Romanian words are matched
   through the Romanian Strong definitions. Text is the English original for now. */
let dictCbs = null, DIDX = null;
function loadDict(cb) {
  if (window.DICT_E) { cb && cb(); return; }
  if (dictCbs) { cb && dictCbs.push(cb); return; }
  dictCbs = cb ? [cb] : []; const sc = document.createElement('script'); sc.src = 'dict.js';
  const fin = () => { const c = dictCbs; dictCbs = null; c.forEach(f => f()); };
  sc.onload = () => { const r = document.createElement('script'); r.src = 'dict_ro.js'; r.onload = fin; r.onerror = fin; document.head.appendChild(r); };
  sc.onerror = () => { const c = dictCbs; dictCbs = null; toast(L('Dicționarul nu s-a putut încărca', 'Dictionary failed to load')); c.forEach(f => f(1)); };
  document.head.appendChild(sc);
}
const DSTOP = new Set('a an am as at be by do go he i if in is it me my no of on or so to up us we ye o oh lo ah ar er ai ur'.split(' '));
function dIdx() { if (DIDX) return DIDX; DIDX = {}; Object.keys(window.DICT_E || {}).forEach(k => { const l = k.toLowerCase(); if (!DIDX[l]) DIDX[l] = k; }); Object.keys(window.DICT_H || {}).forEach(k => { const l = k.toLowerCase(); if (!DIDX[l]) DIDX[l] = k; }); return DIDX; }
function dLemma(w0, cap) {
  let w = String(w0).replace(/[’']s$/i, '').replace(/[^A-Za-z\- ]/g, '').trim(); if (!w) return null;
  const isCap = /^[A-Z]/.test(w); w = w.toLowerCase(); const I = dIdx(); const c = [w];
  if (/ies$/.test(w)) c.push(w.slice(0, -3) + 'y'); if (/ves$/.test(w)) c.push(w.slice(0, -3) + 'f', w.slice(0, -3) + 'fe'); if (/men$/.test(w)) c.push(w.slice(0, -3) + 'man'); if (/ren$/.test(w)) c.push(w.slice(0, -3));
  if (/es$/.test(w)) c.push(w.slice(0, -2)); if (/s$/.test(w)) c.push(w.slice(0, -1)); else c.push(w + 's');
  for (const x of c) if (I[x] && !DSTOP.has(x) && (x.length > 2 || (isCap && cap))) return I[x];
  return null;
}
function dVerse(g) {
  const raw = rawv(g, 'en'), P = isNT(g) ? 'G' : 'H', out = [], seen = {}; let m; TAGRE.lastIndex = 0;
  while ((m = TAGRE.exec(raw))) {
    const ss = m[2].split('.').filter(n => n !== '853').map(n => P + n), ws = m[1].split(/\s+/);
    for (const w of [m[1]].concat(ws.slice().reverse())) { const hw = dLemma(w, true); if (hw) { if (!seen[hw]) { seen[hw] = 1; out.push({ hw, s: ss, en: m[1] }); } break; } }
  }
  return out;
}
const dNorm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');
const DRO = { chivot: 'Ark', corabi: 'Ark', heruvim: 'Cherub', serafim: 'Seraphim', cort: 'Tabernacle', tabernacol: 'Tabernacle', templ: 'Temple', jertfelnic: 'Altar', altar: 'Altar', tamai: 'Incense', paste: 'Passover', sabat: 'Sabbath', taier: 'Circumcision', circumciz: 'Circumcision', botez: 'Baptism, Christian', legamant: 'Covenant', har: 'Grace', mantuir: 'Salvation', ispasir: 'Atonement', pocainta: 'Repentance', credint: 'Faith', nadejd: 'Hope', dragoste: 'Love', rascumpar: 'Redemption', proroc: 'Prophet', preot: 'Priest', marepreot: 'High priest', levit: 'Levite', fariseu: 'Pharisees', saduche: 'Sadducees', carturar: 'Scribes', vames: 'Publican', samaritean: 'Samaritans', sinagog: 'Synagogue', sinedri: 'Sanhedrim', apostol: 'Apostle', ucenic: 'Disciple', bisericii: 'Church', biseric: 'Church', ingeri: 'Angel', inger: 'Angel', diavol: 'Devil', satan: 'Satan', demon: 'Demon', duhulsfant: 'Holy Ghost', mana: 'Manna', mir: 'Myrrh', smirn: 'Myrrh', tamaia: 'Frankincense', isop: 'Hyssop', smochin: 'Fig', maslin: 'Olive', vita: 'Vine', strugur: 'Grape', cedru: 'Cedar', salcam: 'Shittim', porumb: 'Dove', vultur: 'Eagle', leu: 'Lions', mielu: 'Lamb', miel: 'Lamb', berbec: 'Ram', tap: 'Goat', taur: 'Bullock', capr: 'Goat', camil: 'Camel', magar: 'Ass', sarpe: 'Serpent', sarpel: 'Serpent', balaur: 'Dragon', stea: 'Stars', curcubeu: 'Rainbow', potop: 'Deluge', pustie: 'Wilderness', pustiu: 'Wilderness', cetat: 'City', poart: 'Gate', zid: 'Wall', fantan: 'Well', vistier: 'Treasury', candel: 'Candlestick', sfesnic: 'Candlestick', efod: 'Ephod', urim: 'Urim', tumim: 'Thummim', trambit: 'Trumpets', harf: 'Harp', jug: 'Yoke', secer: 'Harvest', seceris: 'Harvest', aria: 'Threshing', talant: 'Talent', siclu: 'Shekel', dinar: 'Penny', cot: 'Cubit', vamesi: 'Publican', crucea: 'Cross', cruce: 'Cross', rastign: 'Crucifixion', inviere: 'Resurrection of the dead', jertf: 'Sacrifice', ardere: 'Burnt offering', prinos: 'Offering', untdelemn: 'Oil', ungere: 'Anoint', uns: 'Anoint', mesia: 'Messiah', hristos: 'Christ', domnul: 'Lord', dumnezeu: 'God' };
const DROK = Object.keys(DRO).sort((a, b) => b.length - a.length);
function dRo(list, t, only) { for (const k of DROK) if (t.startsWith(k) && (k.length > 4 || t.length <= k.length + 3)) { const hw = DRO[k]; const x = list.find(y => y.hw === hw); if (x) return x; if (!only && DICT_E[hw]) return { hw, s: [], en: hw }; } return null; }
function dMatch(g, word) {
  const list = dVerse(g); if (!list.length) return null; const t = dNorm(word); if (t.length < 3) return null;
  const en = dLemma(word, true); if (en) { const x = list.find(y => y.hw === en); if (x) return x; }
  for (const x of list) if (dNorm(x.hw) === t) return x;
  const ro = dRo(list, t, 1); if (ro) return ro;
  const st = t.length > 5 ? t.slice(0, t.length - 2) : t.length > 3 ? t.slice(0, t.length - 1) : t;
  let best = null, bi = 1e9;
  for (const x of list) for (const s of x.s) {
    const d = (window.LEX_RO || {})[s]; if (!d) continue;
    const words = d.replace(/H\d+|G\d+/g, ' ').split(/[^A-Za-zĂÂÎȘȚăâîșțşţ]+/).map(dNorm).filter(Boolean);
    const i = words.findIndex(z => z.length >= 3 && (z.startsWith(st) || (z.length >= 4 && t.startsWith(z.slice(0, Math.max(4, z.length - 2))))));
    if (i >= 0 && i < bi) { bi = i; best = x; }
  }
  return best || dRo(list, t);
}
const dRO = () => !UI_EN && !!window.DICT_E_RO;
const dParts = (hw, en) => (!en && dRO() && DICT_E_RO[hw]) || DICT_E[hw] || [];
const dIsRo = (hw, en) => !en && dRO() && !!DICT_E_RO[hw];
const dTitle = hw => (dRO() && window.DICT_T_RO && DICT_T_RO[hw]) || hw;
const dMean = hw => (!UI_EN && window.DICT_H_RO && DICT_H_RO[hw]) || (window.DICT_H || {})[hw];
const nvName = k => (!UI_EN && window.NAVE_T_RO && NAVE_T_RO[k]) || (k.charAt(0) + k.slice(1).toLowerCase());
const nvLab = t => (!UI_EN && window.NAVE_L_RO && NAVE_L_RO[t]) || t;
function dPlain(hw) { return dParts(hw).map(p => p.replace(/<a data-r[^>]*>[^<]*<\/a>/g, '').replace(/\(\s*(?:Comp\.|comp\.|See|see)?[\s,;.]*(?:etc\.)?[\s,;.]*\)/g, '').replace(/\s+([,.;:])/g, '$1').replace(/\s{2,}/g, ' ')).join(' '); }
function dictPop(anchor, x, fallback, oc) {
  const hw = x.hw, H = dMean(hw), E = DICT_E[hw]; let t = E ? dPlain(hw) : ''; if (t.length > 420) t = t.slice(0, 400).replace(/\s\S*$/, '') + '…';
  fnPop(anchor, '<div class="fn-h">' + esc(dTitle(hw)) + ' · ' + L('Dicționar biblic', 'Bible dictionary') + '</div>' +
    (oc && lexEntry(oc) ? '<button class="fn-r one dor" data-dorig><b><span class="' + (oc[0] === 'H' ? 'heb' : 'grk') + '">' + esc(lexEntry(oc)[0]) + '</span> · ' + esc(lexEntry(oc)[1]) + ' · ' + oc + '</b><span>' + esc(shortDef(lexEntry(oc), oc)) + '</span></button>' : '') +
    (H ? '<p class="dh"><b>' + L('Sensul numelui', 'Name meaning') + ':</b> ' + esc(H) + '</p>' : '') +
    (t ? '<p class="dtx" lang="' + (dIsRo(hw) ? 'ro' : 'en') + '">' + t + '</p>' : '') +
    (E ? '<button class="fn-more" data-dfull>' + L('Articolul complet', 'Full article') + ' ›</button>' : '') +
    (naveKey(hw) ? '<button class="fn-more" data-dnave>' + L('Versete pe temă (Nave)', 'Verses on this topic (Nave)') + ' ›</button>' : '') +
    (fallback ? '<button class="fn-more" data-dorig>' + (oc ? L('Cuvântul original', 'Original word') : L('Cuvântul original și versetul', 'Original word & verse')) + ' ›</button>' : '') +
    '<small class="dsrc">Easton 1897' + (H ? ' · Hitchcock' : '') + (!UI_EN && !dIsRo(hw) ? ' · ' + L('text original în engleză', 'English original') : '') + '</small>',
    p => { const f = p.querySelector('[data-dfull]'); if (f) f.onclick = () => { p.remove(); openDict(hw); }; p.querySelectorAll('[data-dorig]').forEach(o => o.onclick = () => { p.remove(); fallback(); }); const nv = p.querySelector('[data-dnave]'); if (nv) nv.onclick = () => { p.remove(); openNave(naveKey(hw)); }; });
}
function dictHtml(hw, en) {
  const all = []; const H = dMean(hw), ro = dIsRo(hw, en), canRo = dRO() && !!DICT_E_RO[hw];
  const body = dParts(hw, en).map(h => {
    h = h.replace(/<a data-r="(\d+)\.(\d+)\.(\d+)">[^<]*<\/a>/g, (m, b, c, v) => { b = +b; c = +c - 1; v = +v - 1; if (b >= NB || c < 0 || c >= VC[b].length || v < 0 || v >= VC[b][c]) return ''; return '\u0001' + G(b, c, v) + '\u0002'; });
    h = h.replace(/\(?\s*(?:(?:Comp\.|comp\.|See|see)\s*)?(?:\u0001\d+\u0002[\s,;.]*(?:and|comp\.|Comp\.)?[\s,;]*)+\)?/g, run => {
      const gs = [...run.matchAll(/\u0001(\d+)\u0002/g)].map(x => +x[1]); if (!gs.length) return run;
      all.push(...gs); return '<sup class="fn" data-gs="' + gs.join(',') + '">*' + (gs.length > 1 ? gs.length : '') + '</sup> ';
    }).replace(/\s+(<sup)/g, '$1').replace(/\s+([,;.])/g, '$1');
    return '<div class="xs"><div class="xh" lang="' + (ro ? 'ro' : 'en') + '">' + h + '</div></div>';
  }).join('');
  const uniq = [...new Set(all)];
  return (H ? '<p class="dh"><b>' + L('Sensul numelui', 'Name meaning') + ' (Hitchcock):</b> ' + esc(H) + '</p>' : '') +
    (!UI_EN && !canRo ? '<p class="hint">' + L('Textul e în engleză (originalul din 1897).', 'English original (1897).') + '</p>' : '') + body +
    '<div class="xbar">' + (uniq.length ? '<button class="xb" data-x="refs" data-gs="' + uniq.join(',') + '">* ' + L('Trimiteri', 'References') + ' <small>' + uniq.length + '</small></button>' : '') +
    (naveKey(hw) ? '<button class="xb" data-dnave="' + naveKey(hw) + '">' + L('Versete pe temă (Nave)', 'Topical verses (Nave)') + '</button>' : '') +
    (canRo ? '<button class="xb" data-dlang>' + (ro ? L('Originalul (engleză)', 'Original (English)') : L('Traducerea în română', 'Romanian')) + '</button>' : '') +
    '<button class="xb" data-dsrc>' + L('Surse', 'Sources') + '</button></div>';
}
const DICT_SRC = () => '<div class="xsrcs"><p><b>M. G. Easton, <i>Illustrated Bible Dictionary</i></b>, ' + L('ed. a 3-a', '3rd ed.') + ', Thomas Nelson, 1897<br><small>' + L('domeniu public · dicționar biblic general', 'public domain · general Bible dictionary') + '</small></p>' +
  '<p><b>Roswell D. Hitchcock, <i>Hitchcock’s Bible Names Dictionary</i></b> ' + L('(din „New and Complete Analysis of the Holy Bible”, sec. XIX)', '(from “New and Complete Analysis of the Holy Bible”, 19th c.)') + '<br><small>' + L('domeniu public · sensul numelor proprii; etimologiile lui sunt adesea depășite', 'public domain · meaning of proper names; its etymologies are often dated') + '</small></p>' +
  (window.DICT_E_RO ? '<p><small>' + L('Traducerea în română a articolelor, a sensurilor numelor și a temelor Nave e făcută pentru această aplicație; pentru citare folosește originalul englez.', 'The Romanian translation was made for this app; cite the English original.') + '</small></p>' : '') +
  '<p class="xlinks"><a href="https://github.com/garydavenport73/eastons-bible-dictionary-json" data-url>Easton · ' + L('text digital (GitHub)', 'digital text (GitHub)') + '</a><a href="https://github.com/BradyStephenson/bible-data" data-url>Hitchcock · BibleData (CC BY 4.0)</a><a href="https://www.biblegateway.com/resources/dictionaries/info/" data-url>Bible Gateway · ' + L('despre dicționare', 'about the dictionaries') + '</a></p></div>';
function openDict(hw, push) {
  if (!window.DICT_E || !window.NAVE) { loadDict(e => !e && loadNave(() => openDict(hw, push))); return; }
  openSheet(dTitle(hw) + (dTitle(hw) !== hw ? ' (' + hw + ')' : '') + ' · ' + L('Dicționar biblic', 'Bible dictionary'), '<div class="wext dict">' + dictHtml(hw) + '</div>', body => {
    const box = body.querySelector('.wext'); bindExt(box, null, 'sheet');
    box.addEventListener('click', e => { const dl = e.target.closest('[data-dlang]'); if (dl) { e.stopPropagation(); box.dataset.en = box.dataset.en === '1' ? '' : '1'; box.innerHTML = dictHtml(hw, box.dataset.en === '1'); hap(0); return; } const hl = e.target.closest('[data-hw]'); if (hl) { e.stopPropagation(); openDict(hl.dataset.hw, true); return; } const nv = e.target.closest('[data-dnave]'); if (nv) { e.stopPropagation(); openNave(nv.dataset.dnave, true); return; } const s = e.target.closest('[data-dsrc]'); if (!s) return; e.stopPropagation(); fnPop(s, '<div class="fn-h">' + L('Surse', 'Sources') + '</div>' + DICT_SRC(), p => p.querySelectorAll('[data-url]').forEach(a => a.onclick = ev => { ev.preventDefault(); try { A && A.openUrl ? A.openUrl(a.href) : window.open(a.href, '_blank'); } catch (er) {} })); });
  }, push || sheetOpen());
}
function openDictSearch() {
  loadDict(err => { if (err) return;
    openSheet(L('Dicționar biblic', 'Bible dictionary'), '<input class="search" id="dq" placeholder="' + L('Caută în dicționar (Avraam, altar, cort…)', 'Search the dictionary (Abraham, altar…)') + '" autocomplete="off"><div id="dres"></div><p class="hint">Easton 1897 · Hitchcock · ' + L('atinge un cuvânt dintr-un verset ca să-l deschizi direct', 'tap a word in a verse to open it directly') + '</p>', body => {
      const q = body.querySelector('#dq'), res = body.querySelector('#dres'), keys = Object.keys(DICT_E).concat(Object.keys(DICT_H).filter(k => !DICT_E[k]));
      const run = () => { const v = dNorm(q.value); if (!v) { res.innerHTML = ''; return; } const hit = keys.filter(k => dNorm(k).startsWith(v) || dNorm(dTitle(k)).startsWith(v)).slice(0, 60);
        res.innerHTML = hit.length ? hit.map(k => '<button class="mitem" data-hw="' + esc(k) + '"><b>' + esc(dTitle(k)) + (dTitle(k) !== k ? ' <small>' + esc(k) + '</small>' : '') + '</b><small>' + esc((dMean(k) || '').slice(0, 40)) + '</small></button>').join('') : '<div class="empty">' + T('Niciun rezultat.') + '</div>';
        res.querySelectorAll('[data-hw]').forEach(b => b.onclick = () => DICT_E[b.dataset.hw] ? openDict(b.dataset.hw, true) : dictPop(b, { hw: b.dataset.hw })); };
      q.oninput = run; setTimeout(() => q.focus(), 60);
    }, sheetOpen());
  });
}
/* Nave's Topical Bible (1896, public domain; data: BibleData by Brady Stephenson, CC BY 4.0) */
let naveCbs = null;
function loadNave(cb) {
  if (window.NAVE) { cb && cb(); return; } if (naveCbs) { cb && naveCbs.push(cb); return; }
  naveCbs = cb ? [cb] : []; const sc = document.createElement('script'); sc.src = 'nave.js';
  sc.onload = () => { const c = naveCbs; naveCbs = null; c.forEach(f => f()); }; sc.onerror = () => { const c = naveCbs; naveCbs = null; toast(L('Temele nu s-au putut încărca', 'Topics failed to load')); c.forEach(f => f(1)); };
  document.head.appendChild(sc);
}
const naveKey = hw => { if (!window.NAVE) return null; const k = String(hw).toUpperCase(); return NAVE[k] ? k : NAVE[k + 'S'] ? k + 'S' : null; };
function naveG(r) { const [b, c, v] = r.split('.').map(Number); if (b >= NB || c < 1 || c > VC[b].length || v < 1 || v > VC[b][c - 1]) return -1; return G(b, c - 1, v - 1); }
function openNave(subj, push) {
  if (!window.NAVE || (!UI_EN && !window.DICT_E)) { loadNave(e => !e && loadDict(() => openNave(subj, push))); return; }
  const it = NAVE[subj]; if (!it) return; const l = S.lang === 'en' ? 'en' : 'ro'; let n = 0;
  const h = '<p class="hint">' + L('Orville J. Nave, <i>Nave’s Topical Bible</i>, 1896' + (window.NAVE_L_RO ? ' · traducere pentru această aplicație' : ' · subtitlurile sunt în engleză (originalul)'), 'Orville J. Nave, <i>Nave’s Topical Bible</i>, 1896') + '</p>' +
    it.map(([t, r]) => {
      if (r === '@') { const k = String(t).toUpperCase().split(',')[0].trim(); return NAVE[k] ? '<button class="mitem nv-see" data-nv="' + esc(k) + '">→ ' + esc(nvName(k)) + '</button>' : '<div class="nv-t muted">→ ' + esc(nvLab(t)) + '</div>'; }
      const gs = r ? r.split(' ').map(naveG).filter(g => g >= 0) : []; n += gs.length;
      return '<div class="nv-i">' + (t ? '<div class="nv-t">' + esc(nvLab(t)) + '</div>' : '') + (gs.length ? '<div class="chips">' + gs.slice(0, 40).map(g => '<button class="chip" data-x="' + g + '">' + esc(slabel(g, l)) + '</button>').join('') + (gs.length > 40 ? '<span class="muted"> +' + (gs.length - 40) + '</span>' : '') + '</div>' : '') + '</div>';
    }).join('');
  openSheet(nvName(subj) + ' · ' + L('Biblia pe teme', 'Topical Bible'), h, body => {
    body.querySelectorAll('[data-x]').forEach(b => b.onclick = () => openVerse(+b.dataset.x, true));
    body.querySelectorAll('[data-nv]').forEach(b => b.onclick = () => openNave(b.dataset.nv, true));
  }, push || sheetOpen());
}
function openNaveSearch() {
  loadNave(err => { if (err) return; loadDict(() => {
    openSheet(L('Biblia pe teme (Nave)', 'Topical Bible (Nave)'), '<input class="search" id="nq" placeholder="' + L('Caută o temă (rugăciune, credință, Avraam…)', 'Search a topic (prayer, faith…)') + '" autocomplete="off"><div id="nres"></div><p class="hint">' + L('5.319 teme · ~78.000 de trimiteri · Nave 1896', '5,319 topics · Nave 1896') + '</p>', body => {
      const q = body.querySelector('#nq'), res = body.querySelector('#nres'), keys = Object.keys(NAVE);
      q.oninput = () => { const v = dNorm(q.value); if (!v) { res.innerHTML = ''; return; } const nk = k => dNorm(k), nr = k => dNorm(nvName(k)); const hit = keys.filter(k => nk(k).startsWith(v) || nr(k).startsWith(v)).concat(keys.filter(k => !(nk(k).startsWith(v) || nr(k).startsWith(v)) && (nk(k).includes(v) || nr(k).includes(v)))).slice(0, 60);
        res.innerHTML = hit.length ? hit.map(k => '<button class="mitem" data-nv="' + esc(k) + '"><b>' + esc(nvName(k)) + '</b><small>' + NAVE[k].length + '</small></button>').join('') : '<div class="empty">' + T('Niciun rezultat.') + '</div>';
        res.querySelectorAll('[data-nv]').forEach(b => b.onclick = () => openNave(b.dataset.nv, true)); };
      setTimeout(() => q.focus(), 60);
    }, sheetOpen());
  }); });
}
/* Names of God: Romanian wording from the Cornilescu verse itself; original word and Strong number from the app's lexicon; article from Easton */
const GNAMES = [
  ['Dumnezeu', 'Elohim', 'H430', [0, 0, 0], 'God'], ['Domnul (Iehova)', 'YHWH', 'H3068', [1, 2, 14], 'Jehovah'], ['Eu sunt Cel ce sunt', 'ehyeh asher ehyeh', 'H1961', [1, 2, 13], 'I Am that I Am'],
  ['Domnul (Stăpânul)', 'Adonai', 'H136', [0, 14, 1], 'Lord'], ['Dumnezeul cel Atotputernic', 'El Shaddai', 'H7706', [0, 16, 0], 'Shaddai'], ['Dumnezeul cel Preaînalt', 'El Elyon', 'H5945', [0, 13, 17], 'Most High'],
  ['Dumnezeul cel veșnic', 'El Olam', 'H5769', [0, 20, 32], null], ['Dumnezeu care mă vede', 'El Roi', 'H7210', [0, 15, 12], null], ['Domnul va purta de grijă', 'YHWH Yireh', 'H3070', [0, 21, 13], 'Jehovah-jireh'],
  ['Domnul, steagul meu', 'YHWH Nissi', 'H3071', [1, 16, 14], 'Jehovah-nissi'], ['Domnul care te vindecă', 'YHWH Rophe', 'H7495', [1, 14, 25], null], ['Domnul păcii', 'YHWH Shalom', 'H3073', [6, 5, 23], 'Jehovah-shalom'],
  ['Domnul oștirilor', 'YHWH Tsevaot', 'H6635', [8, 0, 2], 'Sabaoth'], ['Domnul este Păstorul meu', 'YHWH Roi', 'H7462', [18, 22, 0], 'Shepherd'], ['Domnul, Neprihănirea noastră', 'YHWH Tsidkenu', 'H3072', [23, 22, 5], 'Jehovah-tsidkenu'],
  ['Domnul este aici', 'YHWH Shammah', 'H3074', [25, 47, 34], 'Jehovah-shammah'], ['Stânca', 'Tsur', 'H6697', [4, 31, 3], 'Rock'], ['Sfântul lui Israel', 'Qedosh Yisrael', 'H6918', [22, 0, 3], null],
  ['Cel îmbătrânit de zile', 'Attiq yomin', 'H6268', [26, 6, 8], 'Ancient of days'], ['Emanuel', 'Immanu El', 'H6005', [22, 6, 13], 'Immanuel'], ['Minunat, Sfetnic, Dumnezeu tare, Părintele veșniciilor, Domn al păcii', 'Pele Yoets, El Gibbor…', 'H6382', [22, 8, 5], null],
  ['Cel dintâi și Cel de pe urmă', 'rishon ve-acharon', 'H7223', [22, 43, 5], null], ['Ava (Tată)', 'Abba', 'G5', [40, 13, 35], 'Abba'], ['Cuvântul', 'Logos', 'G3056', [42, 0, 0], 'Word'],
  ['Mielul lui Dumnezeu', 'Amnos tou Theou', 'G286', [42, 0, 28], 'Lamb of God'], ['Păstorul cel bun', 'ho Poimen ho kalos', 'G4166', [42, 9, 10], 'Shepherd'], ['Mângâietorul', 'Parakletos', 'G3875', [42, 13, 15], 'Comforter'],
  ['Eu sunt (înainte de Avraam)', 'ego eimi', 'G1510', [42, 7, 57], null], ['Alfa și Omega', 'to Alpha kai to Omega', 'G1', [65, 0, 7], 'A'], ['Cel Atotputernic', 'Pantokrator', 'G3841', [65, 0, 7], 'Almighty']
];
function openGodNames() {
  loadDict(() => loadLex(() => {
    const l = S.lang === 'en' ? 'en' : 'ro';
    const h = '<p class="hint">' + L('Numele și titlurile lui Dumnezeu, cu forma din Cornilescu, cuvântul original și versetul-cheie. Atinge pentru verset; ⓘ pentru articolul din Easton.', 'Names and titles of God with the original word and key verse.') + '</p>' +
      GNAMES.map(([ro, tr, s, r, hw], i) => { const g = G(r[0], r[1], r[2]), e = lexEntry(s); const ok = hw && window.DICT_E && DICT_E[hw];
        return '<div class="gn"><button class="gn-m" data-x="' + g + '"><b>' + esc(l === 'en' ? tr : ro) + '</b><span class="' + (s[0] === 'H' ? 'heb' : 'grk') + '">' + esc(e ? e[0] : '') + '</span><small>' + esc(tr) + ' · ' + s + ' · ' + esc(slabel(g, l)) + '</small><i>' + esc(txt(g, l).slice(0, 110)) + (txt(g, l).length > 110 ? '…' : '') + '</i></button>' + (ok ? '<button class="gn-i" data-hw="' + esc(hw) + '" aria-label="Easton">ⓘ</button>' : '') + '<button class="gn-i" data-s="' + s + '" aria-label="Strong">' + s + '</button></div>'; }).join('') +
      '<p class="hint">' + L('Surse: textul Cornilescu; Strong’s Hebrew & Greek; Easton 1897. Unele forme compuse (ex. „Domnul care te vindecă”) nu au număr Strong propriu; e indicat cuvântul-cheie.', 'Sources: Cornilescu; Strong; Easton 1897.') + '</p>';
    openSheet(L('Numele lui Dumnezeu', 'Names of God'), h, body => {
      body.querySelectorAll('[data-x]').forEach(b => b.onclick = () => openVerse(+b.dataset.x, true));
      body.querySelectorAll('[data-hw]').forEach(b => b.onclick = () => openDict(b.dataset.hw, true));
      body.querySelectorAll('.gn-i[data-s]').forEach(b => b.onclick = () => openWord(b.dataset.s, true));
    }, sheetOpen());
  }));
}
/* Romanian word -> original (Hebrew/Greek) word. The Cornilescu text has no Strong tags, so the app uses an
   association table computed from the whole Bible (Cornilescu verse vs KJV-Strong verse, Dice coefficient),
   restricted at tap time to the original words that actually occur in that verse. */
let alCbs = null;
function loadAlign(cb) {
  if (window.RO_AL) { cb && cb(); return; } if (alCbs) { cb && alCbs.push(cb); return; }
  alCbs = cb ? [cb] : []; const sc = document.createElement('script'); sc.src = 'align.js';
  sc.onload = () => { const c = alCbs; alCbs = null; c.forEach(f => f()); }; sc.onerror = () => { const c = alCbs; alCbs = null; c.forEach(f => f(1)); };
  document.head.appendChild(sc);
}
const AL_SUF = ['urilor', 'ilor', 'ului', 'elor', 'lor', 'ați', 'ul', 'ua', 'ii', 'ei', 'le', 'ea', 'or', 'a', 'e', 'i', 'u'];
function alStem(w) {
  w = String(w).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ş/g, 's').replace(/ţ/g, 't').replace(/[^a-z]/g, '');
  if (w.length < 3) return null; for (const s of AL_SUF) if (w.endsWith(s) && w.length - s.length >= 3) return w.slice(0, -s.length); return w;
}
function alignRo(g, word, el) {
  if (!window.RO_AL) return null;
  const parts = String(word).split(/[-’']/).filter(Boolean).sort((a, b) => b.length - a.length);
  const ws = origWords(g); if (!ws.length) return null; const inV = {}; ws.forEach((w, i) => { (inV[w.s] = inV[w.s] || []).push(i); });
  // relative position of the tapped word in the Romanian verse
  let rel = 0.5; if (el && el.parentNode) { const all = [...el.parentNode.querySelectorAll('.w')]; const k = all.indexOf(el); if (k >= 0 && all.length > 1) rel = k / (all.length - 1); }
  let best = null, bs = 0;
  for (const p of parts) { const st = alStem(p); let row = st && RO_AL[st]; for (let k = st ? st.length - 1 : 0; !row && k >= 5; k--) row = RO_AL[st.slice(0, k)]; if (!row) continue; let nul = 0;
    row.split(';').forEach(t => { const [s, d] = t.split(':'); if (s === 'NULL') { nul = +d; return; } if (!inV[s]) return; const pos = Math.min(...inV[s].map(i => Math.abs(i / Math.max(1, ws.length - 1) - rel)));
      const sc = (+d) * (1.2 - 0.4 * pos); if (sc > bs) { bs = sc; best = s; } });
    if (best && bs < nul) best = null;
    if (best) break; }
  return best;
}
/* Bible versions: the base texts (Cornilescu 1924, KJV with Strong numbers) stay loaded for analysis
   (original words, dictionary, alignment); an alternative version only changes what is displayed. */
const VERS = { ro: [['vdc', 'Cornilescu 1924', 'VDC', 'Dumitru Cornilescu, 1924 · domeniu public'], ['btf', 'Traducerea Fidela', 'BTF', 'Alex Crișan · domeniu public (eBible.org)'], ['lsb', 'Liber Sfânta Biblie', 'LSB', 'doar Noul Testament, ciornă în revizuire · domeniu public (eBible.org)']],
  en: [['kjv', 'King James Version', 'KJV', '1611/1769 · Strong · public domain'], ['web', 'World English Bible', 'WEB', 'modern English · public domain (eBible.org)'], ['bsb', 'Berean Standard Bible', 'BSB', 'modern English · public domain since 2023 (eBible.org)']] };
const VVAR = { btf: 'BIBLE_RO_BTF', lsb: 'BIBLE_RO_LSB', web: 'BIBLE_EN_WEB', bsb: 'BIBLE_EN_BSB' };
function curVer(l) { const v = (S.ver || {})[l]; return v && VVAR[v] && window[VVAR[v]] ? v : (l === 'en' ? 'kjv' : 'vdc'); }
function verAbbr(l, g) { const v = curVer(l); if (g != null && VVAR[v] && altv(g, l) == null) return (VERS[l][0][2]); return VERS[l].find(x => x[0] === v)[2]; }
function altv(g, l) { const v = curVer(l); if (!VVAR[v]) return null; const r = ref(g); const t = window[VVAR[v]][r.b] && window[VVAR[v]][r.b][r.c] && window[VVAR[v]][r.b][r.c][r.v]; return t || null; }
function loadVer(v, cb) { if (!VVAR[v] || window[VVAR[v]]) { cb && cb(); return; } toast(L('Se încarcă traducerea…', 'Loading translation…')); const sc = document.createElement('script'); sc.src = 'v_' + v + '.js'; sc.onload = () => cb && cb(); sc.onerror = () => toast(L('Traducerea nu s-a putut încărca', 'Translation failed to load')); document.head.appendChild(sc); }
const ONV = { ro: [['ntr', 'NTR', 'Noua Traducere Românească', 'Biblica, Inc.', 126], ['edcr', 'EDCR', 'Ediția Dumitru Cornilescu Revizuită', 'BFBS / Societatea Biblică Interconfesională', 2311]],
  en: [['niv', 'NIV', 'New International Version', L('engleză modernă, echilibrată', 'modern, balanced English')], ['nkjv', 'NKJV', 'New King James Version', L('limbaj modernizat, păstrează stilul KJV', 'modernized KJV style')], ['esv', 'ESV', 'English Standard Version', L('cuvânt cu cuvânt, literar', 'essentially literal')], ['nasb', 'NASB', 'New American Standard Bible', L('cea mai apropiată de structura originalului', 'closest to the original structure')]] };
function onvUrl(k, g) { const r = ref(g); for (const l of ['ro', 'en']) { const o = ONV[l].find(x => x[0] === k); if (!o) continue;
  return l === 'ro' ? 'https://www.bible.com/bible/' + o[4] + '/' + USFM[r.b] + '.' + (r.c + 1) + '.' + (r.v + 1) + '.' + o[1] : 'https://www.biblegateway.com/passage/?search=' + encodeURIComponent(BK.en[r.b] + ' ' + (r.c + 1) + ':' + (r.v + 1)) + '&version=' + o[1]; } return null; }
function onvLinks(g) { const o = S.onv || {}; return ['ro', 'en'].filter(l => o[l] && (S.lang === 'both' || S.lang === l)).map(l => { const x = ONV[l].find(y => y[0] === o[l]); return x ? ' <span class="onvl" data-onv="' + x[0] + '" data-g="' + g + '">– ' + x[1] + ' ↗</span>' : ''; }).join(''); }
function onvBtns(g) { const o = S.onv || {}; return ['ro', 'en'].filter(l => o[l] && (S.lang === 'both' || S.lang === l)).map(l => { const x = ONV[l].find(y => y[0] === o[l]); return x ? '<button class="chip onv" data-onv="' + x[0] + '" data-g="' + g + '">' + x[1] + ' ↗</button>' : ''; }).join(''); }
function openOnv(k, g) { const u = onvUrl(k, g); if (!u) return; try { A && A.openUrl ? A.openUrl(u) : window.open(u, '_blank'); } catch (e) {} }
function openVersions() {
  const grp = l => '<div class="sec">' + (l === 'ro' ? '🇷🇴 ' + L('Română', 'Romanian') : '🇬🇧 English') + '</div>' + VERS[l].map(([k, n, a, d]) => '<button class="mitem vchk' + (curVer(l) === k ? ' on' : '') + '" data-vl="' + l + '" data-vk="' + k + '"><b>' + (curVer(l) === k ? '✓ ' : '') + esc(n) + ' <small>' + a + '</small></b><small>' + esc(d) + '</small></button>').join('');
  openSheet(L('Traducerea Bibliei', 'Bible translation'), grp('ro') + grp('en') + '<p class="hint">' + L('Atingerea cuvintelor, dicționarul și cuvintele originale folosesc în continuare Cornilescu și KJV (cu numere Strong) în fundal. Unde o traducere nu are un verset (ex. LSB în Vechiul Testament), se arată Cornilescu sau KJV.', 'Word taps, dictionary and original words still use Cornilescu and KJV (Strong) in the background.') + '</p><p class="hint">' + L('Sunt incluse doar traducerile care pot fi folosite liber, offline. NTR, EDCR, NIV, NKJV, ESV, NASB și Biblia Ortodoxă au drepturi de autor.', 'NTR is copyrighted (Biblica).') + '</p>', body => {
    body.querySelectorAll('[data-vk]').forEach(b => b.onclick = () => { const l = b.dataset.vl, k = b.dataset.vk; loadVer(k, () => { S.ver = Object.assign({}, S.ver || {}, { [l]: k }); if (S.lang !== 'both' && S.lang !== l) S.lang = l; persist(); refresh(); closeSheet(); toast((l === 'ro' ? '🇷🇴 ' : '🇬🇧 ') + VERS[l].find(x => x[0] === k)[1]); }); });
  }, sheetOpen());
}
function enAlign(g, word) {
  const w = String(word).toLowerCase().replace(/[^a-z]/g, ''); if (w.length < 3) return null; const P = isNT(g) ? 'G' : 'H'; const lw = dLemma(w) || w; let m; TAGRE.lastIndex = 0; const raw = rawv(g, 'en');
  while ((m = TAGRE.exec(raw))) { for (const x of m[1].toLowerCase().split(/\s+/)) { const y = x.replace(/[^a-z]/g, ''); if (y === w || (y.length >= 4 && w.length >= 4 && y.slice(0, 5) === w.slice(0, 5)) || (dLemma(y) && dLemma(y) === lw)) { const n = m[2].split('.').filter(z => z !== '853')[0]; if (n) return P + n; } } }
  return null;
}
function openWord(code, push, fromG) {
  if (!window.LEX_H) { loadLex(() => openWord(code, push, fromG)); return; }
  const e = lexEntry(code); const l = S.lang === 'en' ? 'en' : 'ro';
  if (!e) { toast(T('Intrare negăsită: ') + code); return; }
  const heb = code[0] === 'H';
  const linkify = t => esc(t).replace(/\b([HG])(\d{1,4})\b/g, '<a data-s="$1$2">$1$2</a>');
  const oc = occurrences(code);
  let h = '<div class="wcard"><div class="wor ' + (heb ? 'heb' : 'grk') + '">' + esc(e[0]) + '</div><div class="wtr">' + esc(e[1]) + (e[2] ? ' · <i>' + esc(e[2]) + '</i>' : '') + '</div><div class="wmeta">' + (heb ? T('Ebraică (VT)') : T('Greacă (NT)')) + T(' · Strong ') + code + T(' · apare în ') + oc.gs.length + T(' versete</div></div>');
  h += personMini(code, fromG) + placeCard(code);
  h += '<button class="btn ghost" id="wnt">' + I.pen + ' ' + L('Pune explicația în notițe', 'Add explanation to notes') + '</button>';
  h += T('<div class="sec">Semnificație și origine</div><p class="wdef">') + linkify(meaning(code, e) || '—') + '</p>';
  if (e[4]) h += T('<div class="sec">Cum e tradus în KJV</div><p class="wdef">') + linkify(e[4]) + '</p>';
  h += '<div class="sec">' + L('Explicație pe larg (lexicon)', 'In-depth (lexicon)') + '</div><div class="wext" id="wext"><p class="hint">' + L('Se încarcă…', 'Loading…') + '</p></div>';
  if (oc.words.length) h += T('<div class="sec">Cuvinte englezești folosite</div><div class="chips big">') + oc.words.slice(0, 14).map(([w, c]) => '<span class="chip ghost">' + esc(w) + ' <b>' + c + '</b></span>').join('') + '</div>';
  h += T('<div class="sec">Unde mai apare</div>') + listItems(oc.gs.slice(0, 60), T('Nicio apariție.'), false);
  if (oc.gs.length > 60) h += T('<div class="hint">Primele 60 din ') + oc.gs.length + '.</div>';
  openSheet((heb ? T('Ebraică · ') : T('Greacă · ')) + e[1], h, body => {
    body.querySelector('#wnt').onclick = () => stAddFromSheet({ type: 'w', code, g: fromG }); bindUrls(body); fillPersonMini(body); body.addEventListener('click', ev => { const pm = ev.target.closest('.pp-mini[data-p]'); if (pm) openPerson(+pm.dataset.p); });
    body.querySelectorAll('a[data-s]').forEach(a => a.onclick = () => openWord(a.dataset.s, true));
    loadExt(() => { const w = body.querySelector('#wext'); if (!w) return; w.innerHTML = extHtml(code); bindExt(w, code, 'sheet'); });
    body.querySelectorAll('.item').forEach(it => it.onclick = () => openVerse(+it.dataset.g, true));
    if (fromG != null) body.querySelectorAll('.item').forEach(it => { if (+it.dataset.g === fromG) it.classList.add('cur'); });
  }, push || sheetOpen());
}

/* ---------- plans drawer (left) ---------- */
function openPlans() {
  const l = S.lang === 'en' ? 'en' : 'ro';
  let h = T('<div class="dhead"><h2>Planuri de citire</h2><button class="icon" id="dclose">') + I.close + T('</button></div><div class="dbody"><p class="hint" style="margin:0 0 12px">Bifează un plan: bara de jos și tabul <b>Plan</b> îți arată progresul lui. Fără plan bifat, bara arată progresul în toată Biblia.</p>');
  PLANS.forEach(P => {
    const on = S.plan === P.id; const st = S.plans && S.plans[P.id]; const pp = st ? planProgress(P.id) : null;
    h += '<div class="pl ' + (on ? 'on' : '') + '"><button class="chk" data-on="' + P.id + '">' + (on ? '✓' : '') + '</button><div class="pt" data-open="' + P.id + '"><b>' + P.t + '</b><span>' + P.d + '</span>' +
      (pp ? '<div class="tbar"><i style="width:' + pp.p + '%"></i></div><small>' + pp.daysDone + T(' din ') + pp.total + T(' zile · ') + fmtPct(pp.p) + '</small>' : '<small>' + P.days + T(' zile</small>')) + '</div></div>';
  });
  h += '</div>';
  $('#drawer').innerHTML = h; $('#drawer').classList.remove('hidden'); $('#dscrim').classList.remove('hidden');
  $('#dclose').onclick = closePlans; $('#dscrim').onclick = closePlans;
  $('#drawer').querySelectorAll('[data-on]').forEach(b => b.onclick = () => {
    const id = b.dataset.on;
    if (S.plan === id) { S.plan = null; toast(T('Plan debifat – bara arată progresul în Biblie')); if (mode === T('plan')) setMode('foryou'); }
    else { S.plan = id; planState(id); toast(T('Plan activ: ') + PLANS.find(p => p.id === id).t); }
    haptic(); persist(); updateStats(); openPlans();
  });
  $('#drawer').querySelectorAll('[data-open]').forEach(b => b.onclick = () => openPlanDetail(b.dataset.open));
}
function closePlans() { $('#drawer').classList.add('hidden'); $('#dscrim').classList.add('hidden'); }
function openPlanDetail(id) {
  const pd = planData(id), st = planState(id), l = S.lang === 'en' ? 'en' : 'ro'; const pp = planProgress(id);
  const cal = S.plans[id] ? planCalendarDay(id) : 1;
  let h = '<div class="pcard">' + donut(pp.p, 112, T('din plan')) + '<div class="pside"><div class="big">' + pp.daysDone + '<small> / ' + pp.total + T(' zile</small></div><div class="hint" style="margin:0 0 8px">') + pd.P.d + '</div>' +
    (S.plan === id ? T('<span class="tag on">✓ Plan activ</span>') : T('<button class="btn" id="act" style="margin:0">Bifează planul</button>')) + '</div></div>';
  if (S.plans[id]) { const bh = planBehind(id); h += '<div class="pstat ' + (bh ? 'late' : 'ok') + '">' + (bh ? L('În urmă cu ', 'Behind by ') + bh + (bh === 1 ? L(' zi', ' day') : L(' zile', ' days')) : L('Ești la zi', 'You’re on track')) + '</div>'; }
  h += T('<div class="hint">Început: ') + st.start.split('-').reverse().join('.') + T(' · azi ar fi ziua ') + Math.min(cal, pp.total) + (pp.next + 1 < cal ? ' · ai ' + (cal - pp.next - 1) + T(' zile de recuperat') : '') + '</div>';
  h += '<button class="btn" id="cont">' + I.book + T(' Continuă cu ziua ') + (pp.next + 1) + '</button>';
  h += pd.days.map((day, d) => { const x = dayStat(pd, st, d); const ds = S.plans[id] ? dayStatus(id, d) : (x.done ? 'done' : 'ahead'); return '<div class="pday ' + (x.done ? 'done' : '') + ' st-' + ds + (d === pp.next ? ' next' : '') + '"><button class="chk" data-d="' + d + '">' + (x.done ? '✓' : '') + '</button><button class="pdl" data-go="' + d + T('"><b>Ziua ') + (d + 1) + '</b><span>' + esc(dayLabel(day, l)) + '</span>' + (!x.done && x.read ? '<div class="tbar"><i style="width:' + pct(x.read, x.tot) + '%"></i></div>' : '') + '</button></div>'; }).join('');
  h += T('<button class="btn ghost" id="restart" style="margin-top:16px">Reia planul de la zero</button>');
  openSheet(pd.P.t, h, body => {
    const goDay = d => { closeSheet(); closePlans(); if (S.plan !== id) { S.plan = id; persist(); } setMode(T('plan'), pd.dayStart[d]); };
    const a = body.querySelector('#act'); a && (a.onclick = () => { S.plan = id; persist(); updateStats(); openPlans(); openPlanDetail(id); toast(T('Plan activ')); });
    body.querySelector('#cont').onclick = () => { closeSheet(); closePlans(); S.plan = id; persist(); setMode(T('plan')); };
    body.querySelectorAll('[data-go]').forEach(b => b.onclick = () => goDay(+b.dataset.go));
    body.querySelectorAll('[data-d]').forEach(b => b.onclick = () => {
      const d = +b.dataset.d; if (st.done[d]) delete st.done[d]; else { st.done[d] = 1; hap(1); }
      persist(); updateStats(); const y = body.scrollTop; sheetStack.pop(); openPlanDetail(id); $('#sheetBody').scrollTop = y; if (!$('#drawer').classList.contains('hidden')) openPlans();
    });
    body.querySelector('#restart').onclick = () => { if (!confirmTwice('rp' + id)) return; S.plans[id] = { start: today(), done: {}, pos: 0 }; delete PBITS[id]; persist(); updateStats(); sheetStack.pop(); openPlanDetail(id); };
    const n = body.querySelector('.pday.next'); n && setTimeout(() => scrollTo(body, n, true), 30);
  }, sheetOpen());
}

/* ---------- scroll gate: read N verses before short-video apps ---------- */
S.gate = Object.assign({ on: false, n: 5, min: 10, apps: ['tt', 'yt', 'igr'], free: 5, freeReset: 60 }, S.gate || {});
if (!S.gate.v2) { const m = { tt: 'ttf', ig: 'igf', igr: 'igf', fb: 'fbf' }; S.gate.apps = [...new Set(S.gate.apps.map(k => m[k] || k))]; S.gate.v2 = 1; }
const GATE_GROUPS = [
  ['tt', 'TikTok', [['', T('Oprit')], ['ttf', T('Feed')], ['tt', T('Toată')]]],
  ['ig', 'Instagram', [['', T('Oprit')], ['igr', T('Reels')], ['igf', T('Feed')], ['ig', T('Toată')]]],
  ['yt', 'YouTube', [['', T('Oprit')], ['yt', T('Shorts')]]],
  ['fb', 'Facebook', [['', T('Oprit')], ['fbf', T('Feed')], ['fb', T('Toată')]]]
];
const MODE_DESC = { '': T('Neverificat'), ttf: T('Scroll blocat · mesajele libere'), tt: T('Toată aplicația blocată'), igr: T('Doar Reels blocat'), igf: T('Feed, Reels, Explore blocate · mesajele libere'), ig: T('Toată aplicația blocată'), yt: T('Doar Shorts blocat'), fbf: T('Scroll în feed blocat'), fb: T('Toată aplicația blocată') };
const groupMode = gr => (GATE_GROUPS.find(x => x[0] === gr)[2].map(o => o[0]).find(k => k && S.gate.apps.includes(k))) || '';
function setGroupMode(gr, k) { const ks = GATE_GROUPS.find(x => x[0] === gr)[2].map(o => o[0]); S.gate.apps = S.gate.apps.filter(a => !ks.includes(a)); if (k) S.gate.apps.push(k); persist(); syncGate(); }
const GATE_APPS = [['tt', 'TikTok'], ['yt', T('YouTube – doar Shorts')], ['igr', T('Instagram – doar Reels')], ['ig', T('Instagram – toată aplicația')], ['fb', 'Facebook']];
function syncGate() { try { A && A.setGate && A.setGate(!!S.gate.on, S.gate.apps.join(','), S.gate.n, S.gate.min); A && A.setFree && A.setFree(S.gate.free, S.gate.freeReset); } catch (e) {} }
let GT = null, gateTimer = 0;
window.startGate = function (pkg, name) {
  closeSheet(); closePlans();
  GT = { pkg, name, need: S.gate.n, count: 0, seen: new Set(), done: false };
  renderGate(); gateTick();
};
function renderGate() {
  const el = $('#gate');
  if (!GT || (GT.hidden && !GT.done)) { el.className = 'hidden'; return; }
  if (GT.done) {
    el.className = 'done';
    el.innerHTML = '<span class="gt1">✓ ' + esc(GT.name) + T(' deblocat ') + S.gate.min + T(' min</span><button class="gbtn" id="gOpen">Deschide</button><button class="gx" id="gStay">✕</button>');
    $('#gOpen').onclick = () => { const p = GT.pkg; GT = null; renderGate(); A && A.openApp(p); };
    $('#gStay').onclick = () => { GT = null; renderGate(); };
    return;
  }
  el.className = '';
  el.innerHTML = '<span class="gt1">🔒 ' + esc(GT.name) + '</span><span class="gbar"><i style="width:' + (GT.count / GT.need * 100) + '%"></i></span><span class="gt2">' + GT.count + '/' + GT.need + '</span><button class="gx" id="gHome" aria-label="Ascunde">✕</button>';
  $('#gHome').onclick = () => { GT.hidden = true; renderGate(); toast(T('Bara e ascunsă – versetele se numără în continuare')); };
}
function gateTick() {
  clearTimeout(gateTimer);
  if (!GT || GT.done) return;
  const k = cur(), m = mode;
  gateTimer = setTimeout(() => {
    if (!GT || GT.done || cur() !== k || mode !== m || sheetOpen()) return;
    const g = curG(); if (GT.seen.has(g)) return;
    GT.seen.add(g); GT.count++; haptic();
    if (GT.count >= GT.need) { GT.done = true; S.gate.unl = S.gate.unl || {}; S.gate.unl[today()] = (S.gate.unl[today()] || 0) + 1; persist(); try { A && A.unlock(S.gate.min); } catch (e) {} }
    renderGate();
  }, 3000);
}
function gateSettingsHtml() {
  const on = !!S.gate.on; const svc = A && A.gateServiceOn ? A.gateServiceOn() : false;
  let h = T('<div class="sec">Pauză de la scroll</div>');
  h += T('<div class="row"><span>Citește înainte de scurtmetraje<br><small class="muted">Te oprește la TikTok, Shorts, Reels</small></span><button class="sw ') + (on ? 'on' : '') + '" id="gon"></button></div>';
  if (on && !svc) h += T('<div class="warn"><b>Mai e un pas:</b> pornește serviciul „Scroll Biblia – pauză de la scroll” din Accesibilitate.<br><br>Dacă butonul e gri („Setare restricționată”): Info aplicație → meniul ⋮ (sus-dreapta) → „Permite setările restricționate”, apoi revino aici.<div style="margin-top:10px"><button class="btn" id="ga11y" style="margin:0 8px 0 0">Accesibilitate</button><button class="btn ghost" id="ginfo" style="margin:0">Info aplicație</button></div></div>');
  if (on && svc) h += T('<div class="ok">✓ Serviciul este activ</div>');
  h += T('<div class="row"><span>Versete de citit</span><div class="stepper"><button id="gm">−</button><b>') + S.gate.n + '</b><button id="gp">+</button></div></div>';
  h += T('<div class="row"><span>Deblochează pentru</span><div class="seg">') + [5, 10, 15, 30].map(m => '<button data-gmin="' + m + '" class="' + (S.gate.min === m ? 'on' : '') + '">' + m + 'm</button>').join('') + '</div></div>';
  h += T('<div class="hint" style="margin-top:12px">Aplicații verificate:</div>') + GATE_APPS.map(([k, t]) => '<button class="arow" data-gapp="' + k + '"><span class="chk ' + (S.gate.apps.includes(k) ? 'onc' : '') + '">' + (S.gate.apps.includes(k) ? '✓' : '') + '</span>' + t + '</button>').join('');
  h += T('<p class="hint">Contează doar versetele la care stai minimum 3 secunde. Detectarea „doar Shorts / doar Reels” depinde de versiunea aplicației YouTube/Instagram; dacă nu prinde, alege varianta „toată aplicația”.</p>');
  return h;
}
function mountGateSettings(body) {
  const re = () => { const y = body.scrollTop; sheetStack.pop(); openSettings(); $('#sheetBody').scrollTop = y; };
  body.querySelector('#gon').onclick = () => { S.gate.on = !S.gate.on; persist(); syncGate(); updateBlockBtn(); re(); if (S.gate.on && !(A && A.gateServiceOn && A.gateServiceOn())) toast(T('Pornește serviciul din Accesibilitate')); };
  const a = body.querySelector('#ga11y'); a && (a.onclick = () => requestA11y());
  const b = body.querySelector('#ginfo'); b && (b.onclick = () => A && A.openAppInfo());
  body.querySelector('#gm').onclick = () => { S.gate.n = Math.max(1, S.gate.n - 1); persist(); syncGate(); re(); };
  body.querySelector('#gp').onclick = () => { S.gate.n = Math.min(50, S.gate.n + 1); persist(); syncGate(); re(); };
  body.querySelectorAll('[data-gmin]').forEach(x => x.onclick = () => { S.gate.min = +x.dataset.gmin; persist(); syncGate(); re(); });
  body.querySelectorAll('[data-gapp]').forEach(x => x.onclick = () => { const k = x.dataset.gapp; const i = S.gate.apps.indexOf(k); if (i >= 0) S.gate.apps.splice(i, 1); else S.gate.apps.push(k); persist(); syncGate(); re(); });
}
document.addEventListener('visibilitychange', () => { if (!document.hidden) { updateBlockBtn(); if (sheetStack.length && sheetStack[sheetStack.length - 1].title === T('Blocare') && sheetOpen()) { sheetStack.pop(); openBlock(); } } if (!document.hidden && !$('#sheet').classList.contains('hidden') && sheetStack.length && sheetStack[sheetStack.length - 1].title === T('Setări')) { sheetStack.pop(); openSettings(); } });

/* ---------- quick block button ---------- */
function hardUntil() { try { return A && A.hardUntil ? +A.hardUntil() : (S.gate.hard || 0); } catch (e) { return S.gate.hard || 0; } }
function setHard(t) { S.gate.hard = t; persist(); try { A && A.setHardBlock && A.setHardBlock(t); } catch (e) {} updateBlockBtn(); }
const hhmm = t => { const d = new Date(t); return pad(d.getHours()) + ':' + pad(d.getMinutes()); };
function updateBlockBtn() {
  const b = $('#btnBlock'); if (!b) return;
  const hard = hardUntil() > Date.now();
  b.classList.toggle('on', !!S.gate.on || hard); b.classList.toggle('hard', hard);
  b.querySelector('span').textContent = hard ? T('până ') + hhmm(hardUntil()) : S.gate.on ? T('Activă') : T('Blocare');
}
function openNumber(title, unit, val, min, max, cb) {
  const h = '<div class="numbox"><button class="nb" id="nm">−</button><input id="nv" type="number" inputmode="numeric" min="' + min + '" max="' + max + '" value="' + val + '"><button class="nb" id="np">+</button></div><div class="hint" style="text-align:center">' + unit + T(' · între ') + min + T(' și ') + max + '</div><div class="grid hb" style="margin-top:14px">' + [5, 15, 20, 45, 90, 120].filter(x => x >= min && x <= max).map(x => '<button data-q="' + x + '">' + x + '</button>').join('') + T('</div><button class="btn" id="nok" style="width:100%;justify-content:center;margin-top:18px">Salvează</button>');
  openSheet(title, h, body => {
    const inp = body.querySelector('#nv'); const clamp = v => Math.max(min, Math.min(max, Math.round(+v || min)));
    const step = Math.max(1, Math.round((max - min) / 60));
    body.querySelector('#nm').onclick = () => { inp.value = clamp(+inp.value - step); };
    body.querySelector('#np').onclick = () => { inp.value = clamp(+inp.value + step); };
    body.querySelectorAll('[data-q]').forEach(b => b.onclick = () => { inp.value = b.dataset.q; });
    body.querySelector('#nok').onclick = () => { const v = clamp(inp.value); sheetStack.pop(); cb(v); };
  }, true);
}
function openTimePick(cb) {
  const d = new Date(Date.now() + 2 * 3600e3);
  const h = T('<p class="hint" style="margin-top:0">Aplicațiile alese rămân blocate până la ora asta, fără deblocare prin citit.</p><input id="tv" class="search" type="time" value="') + pad(d.getHours()) + ':' + pad(d.getMinutes()) + T('" style="font-size:28px;text-align:center"><button class="btn" id="tok" style="width:100%;justify-content:center;margin-top:18px">Blochează până atunci</button>');
  openSheet(T('Blochează până la ora…'), h, body => {
    body.querySelector('#tok').onclick = () => { const [H, M] = (body.querySelector('#tv').value || '23:59').split(':').map(Number); const t = new Date(); t.setHours(H, M, 0, 0); if (t.getTime() <= Date.now()) t.setDate(t.getDate() + 1); sheetStack.pop(); cb(t.getTime()); };
  }, true);
}
function blockStats() { try { return A && A.blockStats ? JSON.parse(A.blockStats()) : { today: 0, total: 0 }; } catch (e) { return { today: 0, total: 0 }; } }
const APPICON = { fb2: 0, tt: ['♪', '#111', '#25f4ee'], yt: ['▶', '#ff0033', '#fff'], igr: ['◎', 'linear-gradient(45deg,#f9a31f,#e1306c,#833ab4)', '#fff'], ig: ['◎', 'linear-gradient(45deg,#f9a31f,#e1306c,#833ab4)', '#fff'], fb: ['f', '#1877f2', '#fff'] };
const customBtn = (k, v, presets, u) => '<button data-cust="' + k + '" class="' + (presets.includes(v) ? '' : 'on') + '">' + (presets.includes(v) ? T('✎ Altă') : '✎ ' + v + u) + '</button>';
const tile = (svg, bg) => '<span class="tile" style="background:' + bg + '">' + svg + '</span>';
function openBlock() {
  const svc = A && A.gateServiceOn ? A.gateServiceOn() : !A ? true : false; const hu = hardUntil(); const hard = hu > Date.now();
  const st = blockStats(); S.gate.unl = S.gate.unl || {}; const unlT = S.gate.unl[today()] || 0;
  let h = '';
  // status header
  h += '<div class="bhead ' + (hard ? 'hard' : S.gate.on ? 'on' : '') + '"><div class="bh-ic">' + (hard ? I.lock : I.shield) + '</div><div><b>' + (hard ? T('Blocare totală până la ') + hhmm(hu) : S.gate.on ? T('Protecție activă') : T('Protecție oprită')) + '</b><small>' + (svc ? (hard || S.gate.on ? T('Aplicațiile alese sunt verificate') : T('Pornește pauza ca să te ajute')) : T('⚠ Serviciul de accesibilitate nu e pornit')) + '</small></div></div>';
  h += '<div class="menu-stats"><div class="stat"><b>' + st.today + T('</b><span>opriri azi</span></div><div class="stat"><b>') + unlT + T('</b><span>deblocări azi</span></div><div class="stat"><b>') + st.total + T('</b><span>opriri total</span></div></div>');
  // main toggle
  h += T('<div class="sec">Protecție</div>');
  h += '<button class="brow" id="bt1">' + tile(I.shield, '#3b3560') + T('<span class="bt"><b>Pauză de la scroll</b><small>Citești versete ca să deblochezi</small></span><span class="sw ') + (S.gate.on ? 'on' : '') + '"></span></button>';
  h += '<button class="brow" id="bhard">' + tile(I.lock, '#5a2b2b') + T('<span class="bt"><b>Blocare totală</b><small>') + (hard ? T('Activă până la ') + hhmm(hu) : T('Fără deblocare, pe o perioadă')) + '</small></span><span class="chev">›</span></button>';
  h += '<div id="hardopts" class="' + (hard ? '' : 'hidden') + '">' + (hard ? T('<div class="hardbox">🔒 Blocat până la <b>') + hhmm(hu) + T('</b><br><button class="btn ghost" id="hoff" style="margin:10px 0 0">Oprește blocarea (apasă de 2 ori)</button></div>') :
    '<div class="grid hb">' + [[30, T('⏱ 30 min')], [60, T('⏱ 1 oră')], [180, T('⏱ 3 ore')], ['n', T('🌙 Până la 22:00')], ['m', T('🌅 Până la 7:00')], ['d', T('📅 Toată ziua')], ['c', T('🕐 Până la ora…')], ['x', T('✎ Alt număr de minute')]].map(([v, t]) => '<button data-h="' + v + '">' + t + '</button>').join('') + '</div>') + '</div>';
  // apps
  h += T('<div class="sec">Aplicații verificate</div>');
  h += GATE_GROUPS.map(([gr, name, opts]) => { const ic = APPICON[gr]; const md = groupMode(gr); return '<div class="brow"><span class="tile app" style="background:' + ic[1] + ';color:' + ic[2] + '">' + ic[0] + '</span><span class="bt"><b>' + name + '</b><small>' + MODE_DESC[md] + '</small></span></div><div class="seg wide">' + opts.map(([k, t]) => '<button data-gmode="' + gr + ':' + k + '" class="' + (md === k ? 'on' : '') + '">' + t + '</button>').join('') + '</div>'; }).join('');
  h += T('<p class="hint">💬 <b>Feed</b> = nu poți da scroll prin postări, Reels sau Explore, dar intri liber la mesaje. Pe ecranul de pauză ai și butonul „Mergi la mesaje”.</p>');
  // rules
  const fu = (() => { try { return A && A.freeUntil ? +A.freeUntil() : 0; } catch (e) { return 0; } })();
  h += T('<div class="sec">Timp liber înainte de blocare</div>');
  h += '<div class="brow">' + tile(I.timer, '#4a3a20') + T('<span class="bt"><b>Minute libere</b><small>') + (S.gate.free ? T('Primești ') + S.gate.free + T(' min, apoi se blochează') : T('Fără timp liber – se blochează imediat')) + (fu > Date.now() ? T(' · acum mai ai până la ') + hhmm(fu) : '') + '</small></span></div><div class="seg wide">' + [0, 5, 10, 15, 30].map(m => '<button data-free="' + m + '" class="' + (S.gate.free === m ? 'on' : '') + '">' + (m ? m + T(' min') : T('Deloc')) + '</button>').join('') + customBtn('free', S.gate.free, [0, 5, 10, 15, 30], T(' min')) + '</div>';
  h += '<div class="brow">' + tile(I.shuffle, '#3a3560') + T('<span class="bt"><b>Timpul liber revine după</b><small>Cât trebuie să treacă până primești iar minutele libere</small></span></div><div class="seg wide">') + [[30, '30 min'], [60, T('1 oră')], [180, T('3 ore')], [1440, T('O dată/zi')]].map(([m, t]) => '<button data-fr="' + m + '" class="' + (S.gate.freeReset === m ? 'on' : '') + '">' + t + '</button>').join('') + customBtn('fr', S.gate.freeReset, [30, 60, 180, 1440], T(' min')) + '</div>';
  h += T('<div class="sec">Reguli de deblocare</div>');
  h += '<div class="brow">' + tile(I.book, '#2f4a3a') + T('<span class="bt"><b>Versete de citit</b><small>Minim 3 secunde pe fiecare</small></span><div class="stepper"><button id="gm">−</button><b>') + S.gate.n + '</b><button id="gp">+</button></div></div>';
  h += '<div class="brow">' + tile(I.unlock, '#2b4560') + T('<span class="bt"><b>Deblocare pentru</b><small>După ce ai citit</small></span></div><div class="seg wide">') + [5, 10, 15, 30, 60].map(m => '<button data-gmin="' + m + '" class="' + (S.gate.min === m ? 'on' : '') + '">' + m + T(' min</button>')).join('') + customBtn('gmin', S.gate.min, [5, 10, 15, 30, 60], T(' min')) + '</div>';
  // service
  h += T('<div class="sec">Permisiuni</div>');
  h += '<button class="brow" id="ga11y">' + tile(I.access, svc ? '#2f4a3a' : '#5a3a20') + T('<span class="bt"><b>Serviciu de accesibilitate</b><small>') + (svc ? T('✓ Pornit') : T('Oprit – atinge ca să-l pornești')) + '</small></span><span class="chev">›</span></button>';
  h += '<button class="brow" id="ginfo">' + tile(I.alert, '#4a4458') + T('<span class="bt"><b>Setări restricționate</b><small>Info aplicație → ⋮ → Permite setările restricționate</small></span><span class="chev">›</span></button>');
  h += '<button class="brow" id="bpriv">' + tile(I.shield, '#2f4a3a') + T('<span class="bt"><b>Ce vede blocarea și ce nu</b><small>Confidențialitate și pași de instalare sigură</small></span><span class="chev">›</span></button>');
  h += T('<p class="hint">„Doar Shorts / doar Reels” depinde de versiunea YouTube/Instagram. Dacă nu prinde, alege Instagram – toată aplicația.</p>');
  openSheet(T('Blocare'), h, body => {
    const re = () => { const y = body.scrollTop; sheetStack.pop(); openBlock(); $('#sheetBody').scrollTop = y; };
    body.querySelector('#bt1').onclick = () => { S.gate.on = !S.gate.on; persist(); syncGate(); updateBlockBtn(); haptic(); toast(S.gate.on ? T('Pauza de la scroll e activă') : T('Pauza de la scroll e oprită')); re(); if (S.gate.on && A && A.gateServiceOn && !A.gateServiceOn()) requestA11y(); };
    body.querySelector('#bhard').onclick = () => body.querySelector('#hardopts').classList.toggle('hidden');
    body.querySelectorAll('[data-h]').forEach(x => x.onclick = () => {
      const v = x.dataset.h; let t;
      const apply = t => { setHard(t); syncGate(); haptic(); toast(T('Blocat până la ') + hhmm(t)); sheetStack.pop(); openBlock(); };
      if (v === 'c') { openTimePick(apply); return; }
      if (v === 'x') { openNumber(T('Blocare totală'), T('minute'), 90, 5, 720, m => apply(Date.now() + m * 60000)); return; }
      if (v === 'd') { const d = new Date(); d.setHours(23, 59, 0, 0); t = d.getTime(); }
      else if (v === 'm' || v === 'n') { const d = new Date(); const H = v === 'm' ? 7 : 22; if (d.getHours() >= H) d.setDate(d.getDate() + 1); d.setHours(H, 0, 0, 0); t = d.getTime(); }
      else t = Date.now() + (+v) * 60000;
      setHard(t); syncGate(); haptic(); toast(T('Blocat până la ') + hhmm(t)); re();
    });
    const off = body.querySelector('#hoff'); off && (off.onclick = () => { if (!confirmTwice('hoff')) return; setHard(0); toast(T('Blocarea totală e oprită')); re(); });
    body.querySelectorAll('[data-cust]').forEach(x => x.onclick = () => {
      const k = x.dataset.cust; const back = () => { sheetStack.pop(); openBlock(); };
      if (k === 'free') openNumber(T('Minute libere'), T('minute libere înainte de blocare'), S.gate.free || 5, 1, 120, v => { S.gate.free = v; persist(); syncGate(); back(); });
      if (k === 'fr') openNumber(T('Timpul liber revine după'), T('minute'), S.gate.freeReset, 5, 1440, v => { S.gate.freeReset = v; persist(); syncGate(); back(); });
      if (k === 'gmin') openNumber(T('Deblocare pentru'), T('minute după ce ai citit'), S.gate.min, 1, 240, v => { S.gate.min = v; persist(); syncGate(); back(); });
    });
    body.querySelectorAll('[data-free]').forEach(x => x.onclick = () => { S.gate.free = +x.dataset.free; persist(); syncGate(); haptic(); re(); });
    body.querySelectorAll('[data-fr]').forEach(x => x.onclick = () => { S.gate.freeReset = +x.dataset.fr; persist(); syncGate(); haptic(); re(); });
    body.querySelectorAll('[data-gmode]').forEach(x => x.onclick = () => { const [gr, k] = x.dataset.gmode.split(':'); setGroupMode(gr, k); haptic(); re(); });
    body.querySelector('#gm').onclick = () => { S.gate.n = Math.max(1, S.gate.n - 1); persist(); syncGate(); re(); };
    body.querySelector('#gp').onclick = () => { S.gate.n = Math.min(50, S.gate.n + 1); persist(); syncGate(); re(); };
    body.querySelectorAll('[data-gmin]').forEach(x => x.onclick = () => { S.gate.min = +x.dataset.gmin; persist(); syncGate(); re(); });
    body.querySelector('#ga11y').onclick = () => requestA11y();
    body.querySelector('#ginfo').onclick = () => A && A.openAppInfo();
    body.querySelector('#bpriv').onclick = () => openPrivacy();
  }, sheetOpen());
}


/* ---------- privacy & safety ---------- */
const PRIVACY_DATE = '18 noiembrie 2026';
const PRIVACY_TEXT = `Politica de confidențialitate – Scroll Biblia
Ultima actualizare: ${PRIVACY_DATE}

1. Pe scurt
Scroll Biblia nu colectează, nu trimite și nu vinde date personale. Nu are cont de utilizator, reclame, analiză (analytics) sau urmărire. Tot ce faci în aplicație rămâne pe telefonul tău.

2. Ce se salvează pe telefon (doar local)
• versetele apreciate și salvate;
• progresul de citire, planurile de citire și statisticile zilnice;
• setările (limbă, mărime text, voce, reguli de blocare).
Aceste date nu părăsesc dispozitivul și pot fi șterse oricând din aplicație: Confidențialitate și siguranță → Șterge toate datele.

3. Internet
Aplicația funcționează fără internet. Internetul este folosit doar când pornești naratorul audio, pentru a încărca înregistrarea capitolului. Nu se trimit date despre tine.

4. Serviciul de accesibilitate (opțional)
Este folosit numai dacă pornești „Blocare aplicații de scrolling”. Serviciul:
• vede ce aplicație este deschisă și, doar în aplicațiile alese de tine (TikTok, Instagram, YouTube, Facebook), elementele de pe ecran necesare pentru a recunoaște Reels, Shorts, feed-ul sau zona de mesaje;
• afișează ecranul de pauză și, doar când apeși tu, poate apăsa „Înapoi” sau iconița de mesaje;
• nu citește conținutul mesajelor, nu salvează ce vezi pe ecran și nu trimite nimic nicăieri.
Poți opri serviciul oricând din Setări → Accesibilitate.

5. Sunet
Când apare ecranul de pauză, aplicația oprește temporar sunetul media și îl repornește când închizi pauza.

6. Widget-uri
Widget-urile afișează versetul zilei și progresul tău, folosind doar datele salvate local.

7. Copii
Aplicația nu colectează date de la nimeni, inclusiv de la copii.

8. Surse
Textul KJV, dicționarul Strong (Hebrew/Greek) și trimiterile OpenBible.info sunt folosite cu mențiunea sursei. Textul românesc: Dumitru Cornilescu.

9. Contact
Dezvoltator: Mircea Olar.`;

const PRIVACY_EN = `Privacy Policy – Scroll Biblia
Last updated: November 18, 2026

1. In short
Scroll Biblia does not collect, send or sell personal data. There is no user account, no ads, no analytics and no tracking. Everything you do in the app stays on your phone.

2. What is stored on the phone (locally only)
• liked and saved verses;
• reading progress, reading plans and daily stats;
• settings (language, text size, voice, blocking rules).
This data never leaves the device and can be deleted anytime in the app: Privacy & safety → Delete all data.

3. Internet
The app works offline. The internet is only used when you start the audio narrator, to load the chapter recording. No data about you is sent.

4. Accessibility service (optional)
It is used only if you turn on “Block scrolling apps”. The service:
• sees which app is open and, only in the apps you choose (TikTok, Instagram, YouTube, Facebook), the on-screen elements needed to recognise Reels, Shorts, the feed or the messages area;
• shows the pause screen and, only when you tap, can press “Back” or the messages icon;
• does not read message content, does not save what is on screen and sends nothing anywhere.
You can turn the service off anytime in Settings → Accessibility.

5. Sound
When the pause screen appears, the app briefly mutes media sound and restores it when you close the pause.

6. Widgets
Widgets show the verse of the day and your progress, using only locally stored data.

7. Children
The app collects no data from anyone, including children.

8. Sources
The KJV text, Strong's Hebrew/Greek dictionary and OpenBible.info cross-references are used with attribution. Romanian text: Dumitru Cornilescu.

9. Contact
Developer: Mircea Olar.`;
function appInfo() { try { return A && A.appInfo ? JSON.parse(A.appInfo()) : {}; } catch (e) { return {}; } }
function requestA11y() {
  if (S.a11yConsent) { A && A.openA11y && A.openA11y(); return; }
  const h = '<div class="discl"><div class="dic">' + I.shield + T('</div><p class="wdef"><b>Scroll Biblia folosește serviciul de accesibilitate</b> doar ca să te ajute să nu mai dai scroll fără sens.</p>') +
    T('<ul class="plist"><li>✓ Vede doar <b>ce aplicație e deschisă</b> și, în TikTok / Instagram / YouTube / Facebook, dacă ești pe Reels, Shorts, feed sau mesaje.</li><li>✓ Afișează <b>ecranul de pauză</b> și apasă „Înapoi” sau „Mesaje” <b>doar când alegi tu</b>.</li><li>✗ <b>Nu citește</b> mesajele, nu salvează ce e pe ecran și <b>nu trimite nimic</b> pe internet.</li><li>↺ Îl poți opri oricând din Setări → Accesibilitate.</li></ul></div>') +
    T('<button class="btn" id="agree" style="width:100%;justify-content:center">Sunt de acord – deschide Accesibilitate</button><button class="btn ghost" id="nagree" style="width:100%;justify-content:center">Nu acum</button>');
  openSheet(T('Înainte să pornești blocarea'), h, body => {
    body.querySelector('#agree').onclick = () => { S.a11yConsent = Date.now(); persist(); closeSheet(); A && A.openA11y && A.openA11y(); toast(T('Caută „Scroll Biblia – pauză de la scroll” → Pornit')); };
    body.querySelector('#nagree').onclick = () => sheetBack();
  }, sheetOpen());
}

function openInstall() {
  const en = UI_EN;
  const h = '<div class="bhead on"><div class="bh-ic">' + I.book + '</div><div><b>' + (en ? 'Install on iPhone' : 'Instalează pe iPhone') + '</b><small>' + (en ? 'It opens full-screen like an app and works offline.' : 'Se deschide pe tot ecranul, ca o aplicație, și merge și fără internet.') + '</small></div></div><ol class="steps2">' +
    (en ? '<li>Open this page in <b>Safari</b>.</li><li>Tap the <b>Share</b> button (square with an arrow ↑) at the bottom.</li><li>Scroll and tap <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b>. Open <b>Scroll Biblia</b> from the home screen.</li>'
        : '<li>Deschide pagina în <b>Safari</b>.</li><li>Apasă butonul <b>Partajează</b> (pătratul cu săgeată ↑) de jos.</li><li>Derulează și apasă <b>Adaugă pe ecranul principal</b>.</li><li>Apasă <b>Adaugă</b>. Deschide <b>Scroll Biblia</b> de pe ecranul principal.</li>') + '</ol>' +
    '<p class="hint">' + (en ? 'Your saved verses and progress stay in this browser on this phone. Blocking apps and widgets are only in the Android version.' : 'Versetele salvate și progresul rămân în acest browser, pe telefon. Blocarea aplicațiilor și widget-urile există doar în versiunea de Android.') + '</p>';
  openSheet(en ? 'Install on iPhone' : 'Instalează pe iPhone', h, null, sheetOpen());
}
function openPrivacy() {
  const ai = appInfo(); const svc = A && A.gateServiceOn ? A.gateServiceOn() : false;
  const fromStore = /vending|samsung/.test(ai.inst || '');
  const row = (ic, bg, t, d) => '<div class="brow">' + tile(ic, bg) + '<span class="bt"><b>' + t + '</b><small>' + d + '</small></span></div>';
  let h = '<div class="bhead on"><div class="bh-ic">' + I.shield + T('</div><div><b>Datele tale rămân pe telefon</b><small>Fără cont, fără reclame, fără urmărire. Nimic nu e trimis nicăieri.</small></div></div>');
  h += T('<div class="sec">Ce folosește aplicația și de ce</div>');
  h += row(I.book, '#2f4a3a', T('Date salvate local'), T('Versete salvate, progres, planuri, setări – doar pe acest telefon'));
  h += row(I.headphones, '#2b4560', T('Internet – doar pentru narator'), T('Restul aplicației merge offline'));
  if (!NOGATE) h += row(I.access, svc ? '#2f4a3a' : '#4a4458', T('Accesibilitate – opțional') + (svc ? T(' · pornit') : T(' · oprit')), T('Doar pentru blocarea Reels/Shorts/feed. Nu citește mesaje, nu trimite nimic.'));
  if (!NOGATE) h += row(I.speaker, '#3a3560', T('Sunet'), T('Oprește temporar sunetul când apare ecranul de pauză'));
  if (!NOGATE) {
  h += T('<div class="sec">Pași de instalare sigură</div><ol class="steps2">') +
    T('<li><b>„Instalare din surse necunoscute”</b> – Android întreabă dacă aplicația din care deschizi fișierul (ex. Fișierele mele) poate instala. Apasă <i>Setări → Permite</i>. După instalare poți retrage permisiunea.</li>') +
    T('<li><b>Play Protect: „Aplicație nescanată”</b> – apare la orice aplicație din afara magazinului. Alege <i>Trimite pentru scanare</i> (ajută ca alerta să nu mai apară) sau <i>Mai multe detalii → Instalează oricum</i>.</li>') +
    T('<li><b>„Setare restricționată” la Accesibilitate</b> – Setări → Aplicații → Scroll Biblia → ⋮ → <i>Permite setările restricționate</i>.</li>') +
    T('<li><b>Samsung Auto Blocker</b> – dacă blochează instalarea: Setări → Securitate și confidențialitate → Auto Blocker → oprește temporar.</li>') +
    T('<li><b>Actualizări</b> – instalează versiunea nouă peste cea veche. Amprenta de mai jos rămâne aceeași, deci datele tale se păstrează.</li></ol>');
  h += T('<div class="sec">Verifică originalul</div><div class="fp"><small>Versiunea ') + esc(ai.v || '?') + ' · Android ' + (ai.sdk || '?') + T(' · instalată ') + (fromStore ? T('din magazin') : T('din fișier APK')) + T('</small><b>Amprentă SHA-256</b><code>') + esc(ai.sha || T('indisponibilă în browser')) + T('</code><small>Instalează doar fișiere cu această amprentă. Dacă e alta, nu e aplicația ta.</small></div>');
  }
  h += T('<div class="sec">Politica de confidențialitate</div><pre class="policy">') + esc(UI_EN ? PRIVACY_EN : PRIVACY_TEXT) + T('</pre><button class="btn" id="cpy">Copiază politica</button>');
  h += T('<div class="sec">Datele mele</div><button class="btn ghost" id="wipe" style="color:#ff8a8a">Șterge toate datele (apasă de 2 ori)</button><p class="hint">Șterge versetele salvate, progresul, statisticile, planurile și setările de blocare. Textele Bibliei rămân.</p>');
  openSheet(T('Confidențialitate și siguranță'), h, body => {
    body.querySelector('#cpy').onclick = () => { if (A && A.copyText) A.copyText(UI_EN ? PRIVACY_EN : PRIVACY_TEXT); else try { clipCopy(UI_EN ? PRIVACY_EN : PRIVACY_TEXT); } catch (e) {} toast(T('Politica a fost copiată')); };
    body.querySelector('#wipe').onclick = () => { if (!confirmTwice('wipe')) return; try { localStorage.removeItem(KEY); } catch (e) {} try { A && A.wipeNative && A.wipeNative(); } catch (e) {} toast(T('Toate datele au fost șterse')); setTimeout(() => location.reload(), 600); };
  }, sheetOpen());
}

/* menu & settings */
function openLibMenu() {
  const nS = Object.keys(S.saved).length, nL = Object.keys(S.liked).length;
  const h = '<button class="mitem" data-m="plans">' + I.cal + T('Planuri de citire<small>') + (S.plan ? T('1 activ') : '') + '</small></button>' +
    '<button class="mitem" data-m="topics">' + I.tags + T('Versete pe teme<small>') + ((TOPICS.find(t => t[0] === S.topic) || [0, '', T('toate')])[2]) + '</small></button>' +
    '<button class="mitem" data-m="saved">' + I.save + L('Versete salvate și apreciate', 'Saved & liked verses') + '<small>' + nS + ' · ♥ ' + nL + '</small></button>' +
    '<button class="mitem" data-m="nave">' + I.tags + L('Biblia pe teme', 'Topical Bible') + '<small>Nave</small></button>' +
    '<button class="mitem" data-m="gnames">' + I.book + L('Numele lui Dumnezeu', 'Names of God') + '</button>' +
    '<button class="mitem" data-m="votd">' + I.shuffle + T('Versetul zilei</button>') +
    '<button class="mitem" data-m="dict">' + I.book + L('Dicționar biblic', 'Bible dictionary') + '<small>Easton · Hitchcock</small></button>';
  openSheet(L('Citire și studiu', 'Reading & study'), h, body => body.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { const m = b.dataset.m;
    if (m === 'plans') { closeSheet(); openPlans(); } else if (m === 'topics') openTopics(); else if (m === 'saved') openSaved('saved'); else if (m === 'nave') openNaveSearch(); else if (m === 'gnames') openGodNames(); else if (m === 'votd') { closeSheet(); showVotd(); } else if (m === 'dict') openDictSearch(); }), true);
}
function openMenu() {
  const nS = Object.keys(S.saved).length, nL = Object.keys(S.liked).length;
  const h = '<div class="menu-stats"><div class="stat"><b>' + streak() + T('</b><span>zile la rând</span></div><div class="stat"><b>') + (S.days[today()] || 0) + T('</b><span>versete azi</span></div><div class="stat"><b>') + (S.total || 0) + T('</b><span>versete total</span></div></div>') +
    '<button class="mitem" data-m="study">' + I.pen + L('Mod studiu · notițe', 'Study mode · notes') + '<small>' + ((S.notes || []).length || '') + '</small></button>' +
    '<button class="mitem" data-m="chron">' + I.cal + L('Cronologie biblică', 'Biblical chronology') + '<small>' + L('de la Geneza la Apocalipsa', 'Genesis to Revelation') + '</small></button>' +
    '<button class="mitem" data-m="lib">' + I.book + L('Citire și studiu', 'Reading & study') + '<small>' + L('planuri, salvate, dicționar ›', 'plans, saved, dictionary ›') + '</small></button>' +
    '<button class="mitem" data-m="stats">' + I.chart + T('Statistici și progres</button>') +
    (NOGATE ? '' : '<button class="mitem" data-m="block">' + I.shield + T('Blocare aplicații de scrolling<small>') + (hardUntil() > Date.now() ? T('🔒 până ') + hhmm(hardUntil()) : S.gate.on ? T('activă') : T('oprită')) + '</small></button>') +
    (WEB && !STANDALONE ? '<button class="mitem" data-m="inst">' + I.book + (UI_EN ? 'Install on iPhone' : 'Instalează pe iPhone') + '</button>' : '') +
    '<button class="mitem" data-m="set">' + I.gear + T('Setări</button>') +
    '<button class="mitem" data-m="priv">' + I.shield + T('Confidențialitate și siguranță</button>');
  openSheet('Scroll Biblia', h, body => (body.querySelector('.menu-stats').onclick = () => openStats(), body).querySelectorAll('[data-m]').forEach(b => b.onclick = () => {
    const m = b.dataset.m;
    if (m === 'study') { closeSheet(); openStudy(); return; }
    if (m === 'chron') { closeSheet(); openChron(); return; }
    if (m === 'lib') { openLibMenu(); return; }
    if (m === 'sleep') { openSleep(true); return; }
    if (m === 'dict') { openDictSearch(); return; } if (m === 'nave') { openNaveSearch(); return; } if (m === 'gnames') { openGodNames(); return; }
    if (m === 'books') { openBooks(); } else if (m === 'search') openSearch(); else if (m === 'saved') openSaved('saved'); else if (m === 'liked') openSaved('liked');
    else if (m === 'votd') { closeSheet(); showVotd(); } else if (m === 'set') openSettings(); else if (m === 'stats') openStats(); else if (m === 'priv') openPrivacy(); else if (m === 'inst') openInstall(); else if (m === 'topics') openTopics(); else if (m === 'plans') { closeSheet(); openPlans(); } else if (m === 'block') openBlock();
  }));
}
let confirmK = '', confirmT = 0;
function confirmTwice(k) { const n = Date.now(); if (confirmK === k && n - confirmT < 3000) { confirmK = ''; return true; } confirmK = k; confirmT = n; toast(T('Apasă încă o dată pentru confirmare')); return false; }
function openSettings() {
  const seg = (k, opts) => '<div class="seg">' + opts.map(([v, t]) => '<button data-k="' + k + '" data-v="' + v + '" class="' + (S[k] === v ? 'on' : '') + '">' + t + '</button>').join('') + '</div>';
  const h = '<div class="row"><span>🌐 English interface<br><small class="muted">' + (UI_EN ? 'Menus and buttons in English' : 'Meniuri și butoane în engleză') + '</small></span><button class="sw ' + (UI_EN ? 'on' : '') + '" id="uien"></button></div>' +
    '<div class="row"><span>' + L('Aspect', 'Appearance') + '</span><div class="seg">' + [['auto', L('Automat', 'Auto')], ['day', L('Zi', 'Day')], ['night', L('Noapte', 'Night')]].map(([v, t]) => '<button data-md="' + v + '" class="' + ((S.mode || 'auto') === v ? 'on' : '') + '">' + t + '</button>').join('') + '</div></div>' +
    '<div class="row"><span>' + (UI_EN ? 'Bible text' : 'Textul Bibliei') + '</span>' + seg('lang', [['ro', T('Română')], ['en', 'English'], ['both', T('Ambele')]]) + '</div>' +
    '<div class="row"><span>' + L('Mod studiu la pornire', 'Study mode on start') + '</span>' + stAutoSeg() + '</div>' +
    '<button class="mitem" id="toRem">' + I.bell + L('Mementouri de citire', 'Reading reminders') + '<small>' + remSummary() + ' ›</small></button>' +
    T('<div class="row"><span>Mărime text</span><input type="range" id="fs" min="0.8" max="1.4" step="0.05" value="') + S.fs + '"></div>' +
    '<button class="mitem" id="toPriv">' + I.shield + T('Confidențialitate și siguranță<small>›</small></button>') +
    '<button class="mitem" id="toVoice">' + I.speaker + T('Voce pentru citire<small>›</small></button>') +
    T('<div class="row"><span>Vibrație la atingere</span><button class="sw ') + (S.haptics ? 'on' : '') + '" id="hap"></button></div>' +
    T('<div class="row"><span>Statistici zilnice</span><button class="btn ghost" id="reset" style="margin:0">Resetează</button></div>') +
    T('<div class="row"><span>Progresul în Biblie</span><button class="btn ghost" id="resetP" style="margin:0">Resetează</button></div>') +
    (NOGATE ? '' : '<button class="mitem" id="toBlock">' + I.shield + T('Blocare aplicații de scrolling<small>') + (S.gate.on ? T('activă') : T('oprită')) + ' ›</small></button>') +
    T('<p class="about">Texte: Biblia Dumitru Cornilescu (română) și King James Version cu numere Strong (engleză). Dicționar: Strong’s Hebrew & Greek. Trimiteri: OpenBible.info (Treasury of Scripture Knowledge și voturi).<br>Totul se păstrează doar pe telefon; aplicația funcționează fără internet.</p>');
  openSheet(T('Setări'), h, body => {
    body.querySelectorAll('[data-k]').forEach(b => b.onclick = () => { S[b.dataset.k] = b.dataset.v; persist(); refresh(); openSettings(); });
    stBindAutoSeg(body);
    body.querySelector('#toRem').onclick = () => openReminders();
    body.querySelector('#fs').oninput = e => { S.fs = +e.target.value; persist(); refresh(); };
    const tb = body.querySelector('#toBlock'); tb && (tb.onclick = () => openBlock());
    body.querySelector('#toVoice').onclick = () => openVoicePicker();
    body.querySelector('#toPriv').onclick = () => openPrivacy();
    body.querySelectorAll('[data-md]').forEach(b => b.onclick = () => { S.mode = b.dataset.md; persist(); applyTheme(); haptic(); body.querySelectorAll('[data-md]').forEach(x => x.classList.toggle('on', x === b)); });
    body.querySelector('#uien').onclick = e => { S.uiLang = UI_EN ? 'ro' : 'en'; e.target.classList.toggle('on', S.uiLang === 'en'); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (x) {} try { A && A.setUiLang && A.setUiLang(S.uiLang); } catch (x) {} toast(S.uiLang === 'en' ? 'Switching to English…' : 'Se trece pe română…'); setTimeout(() => location.reload(), 350); };
    body.querySelector('#hap').onclick = e => { S.haptics = !S.haptics; e.target.classList.toggle('on', S.haptics); persist(); };
    body.querySelector('#reset').onclick = () => { if (!confirmTwice('reset')) return; S.days = {}; S.total = 0; S.todaySeen = []; todaySet = new Set(); persist(); updateStats(); toast(T('Statistici resetate')); };
    body.querySelector('#resetP').onclick = () => { if (!confirmTwice('resetP')) return; BITS.fill(0); readCount = 0; saveBits(); persist(); updateStats(); toast(T('Progres resetat')); };
  }, true);
}
function showVotd() {
  if (mode !== 'foryou') setMode('foryou');
  const it = { g: verseOfDay(), votd: true };
  FY.items.splice(FY.i + 1, 0, it); go(1);
}
$('#btnMenu').innerHTML = I.menu; $('#btnSearch').innerHTML = I.search;
$('#btnUiLang').textContent = UI_EN ? 'EN' : 'RO';
$('#btnUiLang').onclick = () => { const to = UI_EN ? 'ro' : 'en'; S.uiLang = to; if (S.lang !== 'both') S.lang = to; S.ver = S.ver || {};
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (x) {} try { A && A.setUiLang && A.setUiLang(to); } catch (x) {}
  toast(to === 'en' ? 'English · Romanian second' : 'Română · engleza secundară'); setTimeout(() => location.reload(), 350); };
$('#btnMenu').onclick = openMenu;
(() => { if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return; const R = document.documentElement; let t = null;
  const hideLater = () => { clearTimeout(t); t = setTimeout(() => { if (!document.querySelector('#top:hover, #chron .cr-top:hover, #chron .cr-bar:hover, #crQ:focus') && !document.querySelector('#crRes:not(.hidden)')) R.classList.add('mhide'); }, 1500); };
  document.addEventListener('mousemove', e => { if (e.clientY < 90) { clearTimeout(t); R.classList.remove('mhide'); } else if (!R.classList.contains('mhide')) hideLater(); }, { passive: true });
  document.addEventListener('mouseleave', hideLater); hideLater();
})();
(() => { let y0 = null; const top = $('#top');
  top.addEventListener('touchstart', e => { y0 = e.touches[0].clientY; }, { passive: true });
  top.addEventListener('touchmove', e => { if (y0 != null && e.touches[0].clientY - y0 > 45) { y0 = null; haptic(); openMenu(); } }, { passive: true });
  top.addEventListener('touchend', () => { y0 = null; });
  const sh = $('#sheet'); let sy = null, sd = 0, fromBody = false;
  sh.addEventListener('touchstart', e => { const t = e.target; fromBody = !t.closest('.grab,.sheet-head'); if (fromBody && $('#sheetBody').scrollTop > 0) { sy = null; return; } if (t.closest('input,.seg,input[type=range]')) { sy = null; return; } sy = e.touches[0].clientY; sd = 0; sh.style.transition = 'none'; }, { passive: true });
  sh.addEventListener('touchmove', e => { if (sy == null) return; sd = e.touches[0].clientY - sy; if (fromBody && (sd < 0 || $('#sheetBody').scrollTop > 0)) { sy = null; sh.style.transform = ''; return; } if (sd > 0) sh.style.transform = 'translateY(' + sd + 'px)'; }, { passive: true });
  sh.addEventListener('touchend', () => { if (sy == null) return; sy = null; sh.style.transition = 'transform .22s'; if (sd > 110) { sh.style.transform = 'translateY(100%)'; setTimeout(() => { closeSheet(); sh.style.transform = ''; sh.style.transition = ''; }, 200); } else { sh.style.transform = ''; } });
})(); $('#btnPlans').innerHTML = I.cal + T('<span>Planuri</span>'); $('#btnPlans').onclick = openPlans; $('#btnSleep').onclick = () => openSleep(); sleepBtn(); if (NOGATE) $('#btnBlock').style.display = 'none'; $('#btnBlock').innerHTML = I.shield + T('<span>Blocare</span>'); $('#btnBlock').onclick = openBlock; updateBlockBtn(); setInterval(updateBlockBtn, 30000); $('#bottom').onclick = () => openStats(); $('#btnSearch').onclick = openSearch;

/* ---------- start ---------- */
if (S.votd !== today()) { FY.items.push({ g: verseOfDay(), votd: true }); S.votd = today(); }
const sp = $('#splash'); sp.style.opacity = 0; setTimeout(() => sp.remove(), 500);
if (UI_EN) { document.documentElement.lang = 'en'; const tr = document.querySelector('[data-mode=read]'); tr && (tr.textContent = 'Read'); const tp = document.querySelector('[data-mode=plan]'); tp && (tp.textContent = 'Plan'); }
try { A && A.setUiLang && A.setUiLang(UI_EN ? 'en' : 'ro'); } catch (e) {}
/* ================= STUDY MODE (notes + drag & drop) ================= */
const ST_SUN = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></svg>';
const ST_MOON = '<svg viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>';
const ST_FEED = '<svg viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="2.5"/><path d="M9.5 8.5h5M9.5 11.5h5M9.5 14.5h3"/><path d="M3 9v6M21 9v6"/></svg>';
const STUDY = { open: false, pane: 'notes', g: null, sel: [], range: null, saveT: 0 };
const ST_HL = [['#ffd84d', L('Galben', 'Yellow')], ['#7be08a', L('Verde', 'Green')], ['#7cc4ff', L('Albastru', 'Blue')], ['#ff9cc4', L('Roz', 'Pink')], ['#ffb45c', L('Portocaliu', 'Orange')]];
const ST_FG = [['', L('Implicit', 'Default')], ['#e0524f', L('Roșu', 'Red')], ['#3d86e8', L('Albastru', 'Blue')], ['#2f9e5b', L('Verde', 'Green')], ['#c08a12', L('Auriu', 'Gold')], ['#9a5de0', L('Mov', 'Purple')]];
const ST_TPL = [
  ['blank', L('Foaie goală', 'Blank sheet'), '📄', () => '<h1 class="ph">' + L('Titlu', 'Title') + '</h1><p class="ph">' + L('Scrie aici…', 'Write here…') + '</p>'],
  ['sermon', L('Pregătire predică', 'Sermon prep'), '🎤', () => sec([
    ['h1', L('Titlul predicii', 'Sermon title')], ['Text de bază', 'Main text', 'Trage aici versetul principal…', 'Drag the main verse here…'],
    ['Context', 'Context', 'Cine scrie, cui, când și de ce?', 'Who writes, to whom, when and why?'],
    ['Ideea centrală', 'Big idea', 'Mesajul într-o singură propoziție.', 'The message in one sentence.'],
    ['I. Primul punct', 'I. First point', 'Explicație + verset de sprijin.', 'Explanation + supporting verse.'],
    ['II. Al doilea punct', 'II. Second point', 'Explicație + verset de sprijin.', 'Explanation + supporting verse.'],
    ['III. Al treilea punct', 'III. Third point', 'Explicație + verset de sprijin.', 'Explanation + supporting verse.'],
    ['Ilustrații', 'Illustrations', 'Povestiri, exemple din viață.', 'Stories, real-life examples.'],
    ['Aplicație', 'Application', 'Ce trebuie să facem concret?', 'What should we do?'],
    ['Încheiere și rugăciune', 'Conclusion & prayer', '…', '…']])],
  ['oia', L('Studiu inductiv (O·I·A)', 'Inductive study (O·I·A)'), '🔍', () => sec([
    ['h1', L('Pasajul studiat', 'Passage')], ['Textul', 'The text', 'Trage aici versetele pasajului…', 'Drag the passage verses here…'],
    ['Observație', 'Observation', 'Cine? Ce? Unde? Când? Cuvinte care se repetă.', 'Who? What? Where? When? Repeated words.'],
    ['Cuvinte cheie (original)', 'Key words (original)', 'Trage aici explicațiile din ebraică/greacă…', 'Drag Hebrew/Greek explanations here…'],
    ['Interpretare', 'Interpretation', 'Ce a însemnat pentru primii cititori?', 'What did it mean to the first readers?'],
    ['Trimiteri', 'Cross-references', 'Alte versete care explică pasajul.', 'Other verses that explain it.'],
    ['Aplicare', 'Application', 'Ce schimb în viața mea?', 'What do I change in my life?']])],
  ['soap', L('Devoțional S.O.A.P.', 'S.O.A.P. devotional'), '🙏', () => sec([
    ['h1', L('Devoționalul zilei', 'Today’s devotional')], ['S – Scriptura', 'S – Scripture', 'Trage aici versetul zilei…', 'Drag today’s verse here…'],
    ['O – Observație', 'O – Observation', 'Ce îmi atrage atenția?', 'What stands out?'],
    ['A – Aplicație', 'A – Application', 'Cum aplic azi?', 'How do I apply it today?'],
    ['P – Rugăciune', 'P – Prayer', 'Rugăciunea mea…', 'My prayer…']])],
  ['word', L('Studiu de cuvânt', 'Word study'), '🔤', () => sec([
    ['h1', L('Cuvântul studiat', 'Word studied')], ['Originalul', 'Original', 'Trage aici explicația din ebraică/greacă…', 'Drag the Hebrew/Greek explanation here…'],
    ['Unde apare', 'Where it appears', 'Trage aici versetele…', 'Drag verses here…'],
    ['Ce am înțeles', 'What I learned', '…', '…']])]
];
function sec(list) {
  return list.map(x => x[0] === 'h1' ? '<h1 class="ph">' + esc(x[1]) + '</h1>' : '<h2' + (/^(I{1,3}\.|S –|O –|A –|P –)/.test(x[0]) ? ' class="ph"' : '') + '>' + esc(L(x[0], x[1])) + '</h2><p class="ph">' + esc(L(x[2], x[3])) + '</p>').join('');
}
function stNotes() { if (!S.notes) S.notes = []; return S.notes; }
function stCur() {
  const ns = stNotes(); let n = ns.find(x => x.id === S.noteCur);
  if (!n) { n = ns[0]; if (!n) { n = { id: 'n' + Date.now(), h: ST_TPL[0][3](), u: Date.now() }; ns.unshift(n); } S.noteCur = n.id; persist(); }
  return n;
}
function stTitle(n) { const d = document.createElement('div'); d.innerHTML = n.h || ''; const h = d.querySelector('h1,h2,p'); const t = (h ? h.textContent : d.textContent).trim(); return t.slice(0, 60) || L('Notiță fără titlu', 'Untitled note'); }
function stLang() { return S.lang === 'en' ? 'en' : 'ro'; }
function stView() { return STUDY.view || S.stView || (stIsWide() ? 'split' : 'notes'); }
function stCls() { return 'v-' + stView() + (stIsWide() ? ' wide' : ''); }
function stIsWide() { return innerWidth >= 760 || (innerWidth >= 600 && innerWidth > innerHeight); }

function openStudy(g) {
  let el = $('#study');
  if (!el) { el = document.createElement('section'); el.id = 'study'; document.body.appendChild(el); }
  STUDY.open = true; STUDY.g = g != null ? g : (STUDY.g != null ? STUDY.g : (S.studyG != null ? S.studyG : (S.readPos || 0)));
  try { narrStop && NARR.on && narrStop(); } catch (e) {}
  const n = stCur();
  el.className = stCls();
  el.innerHTML =
    '<div class="st-top">' +
      '<button class="st-ib" id="stExit" aria-label="' + L('Închide', 'Close') + '">' + I.back + '</button>' +
      '<button class="st-title" id="stList"><span>' + esc(stTitle(n)) + '</span><i>▾</i></button>' +
      '<div class="st-seg"><button data-pane="bible" title="' + L('Doar Biblia', 'Bible only') + '">' + I.book + '<span>' + L('Biblia', 'Bible') + '</span></button><button data-pane="split" title="' + L('Ecran împărțit', 'Split view') + '"><svg viewBox="0 0 24 24"><rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><path d="M12 4.5v15"/></svg><span>' + L('Ambele', 'Both') + '</span></button><button data-pane="notes" title="' + L('Doar notițele', 'Notes only') + '">' + I.pen + '<span>' + L('Notițe', 'Notes') + '</span></button></div>' +
      '<button class="st-ib" id="stAddBib" title="' + L('Adaugă o Biblie (fereastră)', 'Add a Bible window') + '">' + I.bookplus + '</button>' +
      '<button class="st-ib" id="stTheme" title="' + L('Zi / Noapte', 'Day / Night') + '">' + (isDay() ? I.moon : I.sun) + '</button>' +
      '<button class="st-ib" id="stFeed" title="' + L('Biblia scroll', 'Scroll Bible') + '">' + I.scroll + '</button>' +
      '<button class="st-ib" id="stNew" aria-label="' + L('Foaie nouă', 'New sheet') + '">' + I.plus + '</button>' +
      '<button class="st-ib" id="stMore" aria-label="' + L('Mai mult', 'More') + '">' + I.dots + '</button>' +
    '</div>' +
    '<div class="st-main">' +
      '<div class="st-bible"><div class="st-nav"><button class="st-ib" id="stPrev">‹</button><button class="st-book" id="stBook"></button><button class="st-ib" id="stNext">›</button><button class="st-ib" id="stFind" title="' + L('Caută', 'Search') + '">' + I.search + '</button></div>' +
        '<div class="st-find hidden" id="stFindBox"><div class="st-fbar">' + I.search + '<input id="stQ" placeholder="' + L('Cuvânt, „Ioan 3:16” sau „G26”', 'Word, “John 3:16” or “G26”') + '" autocomplete="off" enterkeyhint="search"><button class="st-ib" id="stQx">' + I.close + '</button></div><div class="st-fres" id="stFres"></div></div>' +
        '<div class="st-verses" id="stVerses"></div>' +
        '<div class="st-selbar hidden" id="stSelBar"><span id="stSelN"></span><button id="stSelClear">' + L('Anulează', 'Clear') + '</button><button class="pri" id="stSelAdd">' + I.plus + L('Adaugă în foaie', 'Add to sheet') + '</button></div>' +
      '</div>' +
      '<div class="st-div" id="stDiv" title="' + L('Trage ca să redimensionezi', 'Drag to resize') + '"><i></i><i></i><i></i></div>' +
      '<div class="st-notes">' +
        '<div class="st-tools" id="stTools">' +
          tb('undo', '↶', L('Anulează', 'Undo')) + tb('redo', '↷', L('Refă', 'Redo')) + '<i class="st-sep"></i>' +
          tb('bold', '<b>B</b>', L('Îngroșat', 'Bold')) + tb('italic', '<i>I</i>', L('Cursiv', 'Italic')) + tb('underline', '<u>U</u>', L('Subliniat', 'Underline')) + '<i class="st-sep"></i>' +
          tb('hl', '<span class="st-hlic">🖍</span>', L('Evidențiază', 'Highlight')) + tb('fg', '<span class="st-fgic">A</span>', L('Culoare text', 'Text color')) + '<i class="st-sep"></i>' +
          tb('smaller', 'A<small>−</small>', L('Mai mic', 'Smaller')) + tb('bigger', 'A<small>+</small>', L('Mai mare', 'Bigger')) + tb('h2', 'H', L('Subtitlu', 'Heading')) + tb('list', '•≡', L('Listă', 'List')) + tb('clear', '⌫', L('Șterge formatarea', 'Clear formatting')) +
        '</div>' +
        '<div class="st-pop hidden" id="stPop"></div>' +
        '<div class="st-paper" id="stPaper"><div class="st-doc" id="stDoc" contenteditable="true" spellcheck="false"></div><div class="st-drop hidden" id="stDrop"></div></div>' +
      '</div>' +
    '</div>' +
    '<div class="st-ghost hidden" id="stGhost"></div>';
  function tb(k, h, t) { return '<button data-tb="' + k + '" title="' + esc(t) + '" aria-label="' + esc(t) + '">' + h + '</button>'; }
  $('#stDoc').innerHTML = n.h || '';
  { const TT = new Set(['Titlul predicii', 'Sermon title', 'Pasajul studiat', 'Passage', 'Devoționalul zilei', 'Today’s devotional', 'Cuvântul studiat', 'Word studied', 'Titlu', 'Title', 'I. Primul punct', 'II. Al doilea punct', 'III. Al treilea punct', 'I. First point', 'II. Second point', 'III. Third point']);
    $('#stDoc').querySelectorAll('h1,h2').forEach(h => { if (TT.has(h.textContent.trim()) && !h.querySelector('span')) h.classList.add('ph'); });
    // older explanation blocks: make Strong numbers clickable
    $('#stDoc').querySelectorAll('.nx').forEach(nx => { const w = document.createTreeWalker(nx, NodeFilter.SHOW_TEXT); const ns = []; while (w.nextNode()) { const n = w.currentNode; if (!n.parentNode.closest('.nr,.sref') && /\b[HG]\d{1,4}\b/.test(n.nodeValue)) ns.push(n); }
      ns.forEach(n => { const sp = document.createElement('span'); sp.innerHTML = sLink(n.nodeValue, true); n.replaceWith(...sp.childNodes); }); }); }
  $('#stDoc').style.fontSize = Math.round(17 * S.fs * (S.noteZoom || 1)) + 'px';
  stBindTop(); stRenderBible(); stBindDoc(); stBindDrag(); stSetPane(stView());
  stBindSwipe(); stBindDivider();
  document.documentElement.classList.add('studying');
  try { A && A.allowRotate && A.allowRotate(true); } catch (e) {}
}
function closeStudy() {
  stSave(true); STUDY.open = false; const el = $('#study'); if (el) el.remove();
  document.documentElement.classList.remove('studying');
  try { A && A.allowRotate && A.allowRotate(false); } catch (e) {}
}
function stSetPane(p, temp) {
  STUDY.pane = p; STUDY.view = p; if (!temp) { S.stView = p; persist(); } const el = $('#study'); if (!el) return;
  el.className = stCls(); stApplySplit();
  el.querySelectorAll('[data-pane]').forEach(b => b.classList.toggle('on', b.dataset.pane === p));
}
function stBindTop() {
  $('#stExit').onclick = () => { hap(0); closeStudy(); };
  $('#stFeed').onclick = () => { hap(0); closeStudy(); };
  $('#stTheme').onclick = () => { S.mode = isDay() ? 'night' : 'day'; persist(); applyTheme(); hap(0); $('#stTheme').innerHTML = isDay() ? I.moon : I.sun; };
  $('#stAddBib').onclick = () => stAddFloat();
  $('#stList').onclick = stOpenList;
  $('#stNew').onclick = () => stNewSheet();
  $('#stMore').onclick = stMore;
  $('#study').querySelectorAll('[data-pane]').forEach(b => b.onclick = () => { hap(0); stSetPane(b.dataset.pane); });
  $('#stPrev').onclick = () => stChapter(-1);
  $('#stNext').onclick = () => stChapter(1);
  $('#stBook').onclick = () => stPickBook();
  $('#stFind').onclick = () => stToggleFind();
  $('#stQx').onclick = () => stToggleFind(false);
  { let t = 0; const q = $('#stQ'); q.oninput = () => { clearTimeout(t); t = setTimeout(stRunFind, 250); }; q.onkeydown = e => { if (e.key === 'Enter') { clearTimeout(t); stRunFind(); q.blur(); } }; }
  $('#stFres').onclick = e => {
    if (STUDY.dragJustEnded) return;
    const sr = e.target.closest('.sref'); if (sr) { stStrongPv(sr.dataset.s); return; }
    const x = e.target.closest('.sxr'); if (x) { stPreview(+x.dataset.g, +x.dataset.sp || 0, true); return; }
    const bk = e.target.closest('[data-fb]'); if (bk) { STUDY.g = G(+bk.dataset.fb, 0, 0); STUDY.sel = []; stToggleFind(false); stRenderBible(); }
  };
  $('#stSelClear').onclick = () => { STUDY.sel = []; stMarkSel(); };
  $('#stSelAdd').onclick = () => { stInsert({ type: 'v', gs: STUDY.sel.slice() }); STUDY.sel = []; stMarkSel(); };
}

/* ---------- Bible pane ---------- */

/* ===== Context istoric + surse academice (offline; vezi context.js, places.js) ===== */
const CTX_CAT = { A: ['Confirmat de dovezi istorice', 'Confirmed by historical evidence'], B: ['Ce spune textul biblic', 'What the biblical text says'], C: ['Interpretări academice', 'Scholarly interpretations'], D: ['Ipoteze și reconstituiri', 'Hypotheses and reconstructions'], E: ['Disputat sau necunoscut', 'Disputed or unknown'] };
function ctxFor(b, c) { const k = b + '.' + (c + 1); return (window.CTX || []).filter(n => n.ch.includes(k)); }
function ctxRef(r) { const [b, c, v] = r.split('.').map(Number); const bb = b - 1, cc = c - 1, vv = v - 1; if (bb < 0 || bb >= NB || cc < 0 || cc >= VC[bb].length || vv < 0 || vv >= VC[bb][cc]) return null; return G(bb, cc, vv); }
function openUrl(u) { try { A && A.openUrl ? A.openUrl(u) : window.open(u, '_blank'); } catch (e) {} }
function srcCard(id) {
  const s = (window.CTX_SRC || {})[id]; if (!s) return '';
  return '<div class="cs-card"><b>' + esc(s[0]) + '</b>' + (s[1] ? '<span>' + esc(s[1]) + '</span>' : '') + '<small>' + esc([s[2], s[3]].filter(Boolean).join(' · ')) + '</small>' +
    '<a href="' + esc(s[4]) + '" data-url>' + L('Deschide sursa (online)', 'Open source (online)') + ' ↗</a></div>';
}
function ctxSearchLinks(b, c) {
  const q0 = '"' + BK.en[b] + ' ' + (c + 1) + '"', e = encodeURIComponent;
  const arch = ' (source:"Near Eastern Archaeology" OR source:"Bulletin of the American Schools of Oriental Research" OR source:"Tel Aviv" OR source:"Israel Exploration Journal")';
  const L2 = [
    ['Bible Odyssey', 'Society of Biblical Literature', 'https://www.google.com/search?q=' + e('site:bibleodyssey.org ' + q0)],
    ['Oxford Bibliographies', L('bibliografii academice (parțial cu abonament)', 'scholarly bibliographies (partly paywalled)'), 'https://www.google.com/search?q=' + e('site:oxfordbibliographies.com ' + q0)],
    ['Journal of Biblical Literature (SBL)', L('articole de specialitate', 'peer-reviewed articles'), 'https://scholar.google.com/scholar?q=' + e(q0 + ' source:"Journal of Biblical Literature"')],
    [L('Reviste de arheologie', 'Archaeology journals'), 'NEA · BASOR · Tel Aviv · IEJ', 'https://scholar.google.com/scholar?q=' + e(q0 + arch)],
    [L('Publicații universitare', 'University publications'), L('acces liber (CORE)', 'open access (CORE)'), 'https://core.ac.uk/search?q=' + e(q0)],
    ['JSTOR', L('reviste academice', 'academic journals'), 'https://www.jstor.org/action/doBasicSearch?Query=' + e(q0)]
  ];
  return '<div class="cs-links">' + L2.map(x => '<a href="' + esc(x[2]) + '" data-url><b>' + esc(x[0]) + '</b><small>' + esc(x[1]) + '</small></a>').join('') + '</div>' +
    '<p class="cs-note">' + L('Linkurile caută automat pasajul și se deschid online. Rezultatele nu sunt verificate de aplicație: verifică autorul, data și dacă sursa e academică.', 'These links search for the passage online. Results are not checked by the app: check author, date and whether the source is scholarly.') + '</p>';
}
function ctxOverlay(title, html, bind) {
  let ov = document.getElementById('ctxOv'); if (ov) ov.remove();
  ov = document.createElement('div'); ov.id = 'ctxOv'; ov.className = 'ctx-ov';
  ov.innerHTML = '<div class="ctx-card"><div class="ctx-hd"><b>' + esc(title) + '</b><button class="ctx-x" aria-label="' + L('Închide', 'Close') + '">' + I.close + '</button></div><div class="ctx-bd">' + html + '</div></div>';
  document.body.appendChild(ov); hap(0);
  ov.addEventListener('click', e => {
    if (e.target === ov || e.target.closest('.ctx-x')) { ov.remove(); return; }
    const a = e.target.closest('a[data-url]'); if (a) { e.preventDefault(); openUrl(a.href); }
  });
  bind && bind(ov); return ov;
}
function openCtx(id) {
  const n = (window.CTX || []).find(x => x.id === id); if (!n) return;
  const l = S.lang === 'en' ? 'en' : 'ro'; const used = [];
  const sup = ids => ids.length ? '<sup class="cs" data-cs="' + ids.join(',') + '">*' + ids.map(i => { let k = used.indexOf(i); if (k < 0) { used.push(i); k = used.length - 1; } return k + 1; }).join(',') + '</sup>' : '';
  const refs = rs => (rs || []).map(ctxRef).filter(g => g != null).map(g => '<button class="cs-v" data-g="' + g + '">' + esc(slabel(g, l)) + '</button>').join('');
  let h = UI_EN ? '<p class="cs-note">' + 'These notes are written in Romanian.' + '</p>' : '';
  ['A', 'B', 'C', 'D', 'E'].forEach(k => {
    if (!n[k] || !n[k].length) return;
    h += '<div class="cs-sec cs-' + k + '"><div class="cs-cat"><i>' + k + '</i>' + L(CTX_CAT[k][0], CTX_CAT[k][1]) + '</div>' +
      n[k].map(([t, ids, rs]) => '<p>' + esc(t) + sup(ids || []) + (rs && rs.length ? '<span class="cs-vs">' + refs(rs) + '</span>' : '') + '</p>').join('') + '</div>';
  });
  h += '<div class="xbar"><button class="xb" data-cx="src">* ' + L('Surse', 'Sources') + ' <small>' + used.length + '</small></button><button class="xb" data-cx="more">' + L('Caută mai mult', 'Search more') + '</button></div>';
  h += '<p class="cs-note">' + L('Notă scrisă pentru aplicație pe baza surselor indicate; nu reproduce textul lor. Citește sursa originală înainte de a cita.', 'Note written for the app from the listed sources; it does not reproduce them.') + '</p>';
  ctxOverlay(n.t, h, ov => {
    ov.querySelector('.ctx-bd').addEventListener('click', e => {
      const c = e.target.closest('.cs'); if (c) { e.stopPropagation(); fnPop(c, '<div class="fn-h">' + L('Sursa', 'Source') + '</div>' + c.dataset.cs.split(',').map(srcCard).join(''), p => p.querySelectorAll('[data-url]').forEach(a => a.onclick = ev => { ev.preventDefault(); openUrl(a.href); })); return; }
      const v = e.target.closest('.cs-v'); if (v) { e.stopPropagation(); const g = +v.dataset.g; ov.remove(); if (document.getElementById('study')) stPreview(g, 0); else openVerse(g, true); return; }
      const x = e.target.closest('[data-cx]'); if (!x) return; e.stopPropagation();
      if (x.dataset.cx === 'src') fnPop(x, '<div class="fn-h">' + L('Surse', 'Sources') + '</div>' + used.map((id, i) => '<div class="cs-n">' + (i + 1) + '</div>' + srcCard(id)).join(''), p => p.querySelectorAll('[data-url]').forEach(a => a.onclick = ev => { ev.preventDefault(); openUrl(a.href); }));
      else { const r = ref(STUDY.g != null ? STUDY.g : 0); fnPop(x, '<div class="fn-h">' + L('Caută în surse academice', 'Search scholarly sources') + '</div>' + ctxSearchLinks(r.b, r.c), p => p.querySelectorAll('[data-url]').forEach(a => a.onclick = ev => { ev.preventDefault(); openUrl(a.href); })); }
    });
  });
}
function openCtxSearch(b, c) {
  const l = S.lang === 'en' ? 'en' : 'ro';
  ctxOverlay(L('Surse academice · ', 'Scholarly sources · ') + BK[l][b] + ' ' + (c + 1), ctxSearchLinks(b, c));
}
function ctxRow(b, c) {
  const ns = ctxFor(b, c);
  return '<div class="st-ctx">' + ns.map(n => '<button class="ctx-chip" data-ctx="' + n.id + '"><i>i</i>' + esc(n.t) + '</button>').join('') +
    '<button class="ctx-chip ghost" data-ctxs="1">' + I.search + L('Surse academice', 'Scholarly sources') + '</button></div>';
}
function placeCard(code) {
  const p = (window.PLACES || {})[code]; if (!p) return '';
  const [ro, ti, la, lo, ty, pid, km] = p;
  const refs = [['Ierusalim', 31.777, 35.235], ['Damasc', 33.51, 36.29], ['Babilon', 32.54, 44.42], ['Ninive', 36.36, 43.15], ['Memfis', 29.85, 31.25], ['Antiohia', 36.2, 36.16], ['Efes', 37.94, 27.34], ['Atena', 37.97, 23.72], ['Roma', 41.89, 12.49], ['Tir', 33.27, 35.2], ['Gaza', 31.5, 34.46], ['Corint', 37.91, 22.88]];
  const pts = refs.filter(r => r[0] !== ro);
  const near = pts.map(r => [r, Math.hypot(r[1] - la, (r[2] - lo) * Math.cos(la * Math.PI / 180))]).sort((a, b) => a[1] - b[1]).slice(0, 4).map(x => x[0]);
  const all = near.concat([[ro, la, lo, 1]]);
  let x0 = Math.min(...all.map(r => r[2])), x1 = Math.max(...all.map(r => r[2])), y0 = Math.min(...all.map(r => r[1])), y1 = Math.max(...all.map(r => r[1]));
  const pad = Math.max(.4, (x1 - x0) * .15, (y1 - y0) * .15); x0 -= pad; x1 += pad; y0 -= pad; y1 += pad;
  const W = 300, H = 130, sx = W / (x1 - x0), sy = H / (y1 - y0), s = Math.min(sx, sy), ox = (W - (x1 - x0) * s) / 2, oy = (H - (y1 - y0) * s) / 2;
  const P = r => [ox + (r[2] - x0) * s, oy + (y1 - r[1]) * s];
  const svg = '<svg class="pl-map" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(ro) + '">' +
    near.filter(r => { const [x, y] = P(r), [mx, my] = P([ro, la, lo]); return Math.hypot(x - mx, y - my) > 14; }).map(r => { const [x, y] = P(r), mx = P([ro, la, lo])[0], lf = x < mx; return '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="3" class="pl-ref"/><text x="' + (lf ? x - 6 : x + 6).toFixed(1) + '" y="' + (y + 4).toFixed(1) + '"' + (lf ? ' text-anchor="end"' : '') + '>' + r[0] + '</text>'; }).join('') +
    (() => { const [x, y] = P([ro, la, lo]); return '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="6" class="pl-me"/><text class="pl-mt" x="' + (x + 9).toFixed(1) + '" y="' + (y + 4).toFixed(1) + '">' + esc(ro) + '</text>'; })() + '</svg>';
  const tyRo = { settlement: 'așezare', urban: 'oraș', 'archaeological-site': 'sit arheologic', river: 'râu', port: 'port', 'cultural-landscape': 'peisaj cultural', 'settlement-modern': 'localitate actuală', 'city-center': 'centru de oraș', basilica: 'bazilică' };
  return '<div class="pl-card"><div class="pl-h"><b>' + L('Loc antic', 'Ancient place') + ' · ' + esc(ro) + '</b><small>' + esc(ty.split(',').map(t => UI_EN ? t : (tyRo[t] || t)).join(', ')) + '</small></div>' + svg +
    '<div class="pl-m">' + la.toFixed(3) + '° N, ' + lo.toFixed(3) + '° E' + (km ? ' · ' + L('cca. ', 'c. ') + km + L(' km de Ierusalim (în linie dreaptă)', ' km from Jerusalem (straight line)') : '') + '</div>' +
    '<div class="pl-m"><small>' + L('Identificare după Pleiades: ', 'Identification per Pleiades: ') + esc(ti) + L('. Pentru sensul principal al cuvântului; harta e schematică (fără relief/coastă).', '. For the main sense; schematic map.') + '</small></div>' +
    '<div class="pl-l"><a href="https://pleiades.stoa.org/places/' + pid + '" data-url>Pleiades ↗</a><a href="https://www.openstreetmap.org/?mlat=' + la + '&mlon=' + lo + '#map=11/' + la + '/' + lo + '" data-url>' + L('Hartă online', 'Online map') + ' ↗</a></div></div>';
}
function bindUrls(box) { box.querySelectorAll('a[data-url]').forEach(a => a.onclick = ev => { ev.preventDefault(); ev.stopPropagation(); openUrl(a.href); }); }

/* ===== Carduri de personaj (offline; people.js din STEPBible TIPNR, CC BY 4.0) ===== */
let pplCbs = null;
function loadPeople(cb) {
  if (window.PEOPLE) { cb && cb(); return; }
  if (pplCbs) { cb && pplCbs.push(cb); return; }
  pplCbs = cb ? [cb] : []; const sc = document.createElement('script'); sc.src = 'people.js';
  sc.onload = () => { const c = pplCbs; pplCbs = null; c.forEach(f => f()); };
  sc.onerror = () => { pplCbs = null; };
  document.head.appendChild(sc);
}
function pRefs(p) {
  if (p._v) return p._v; const o = []; let prev = 0;
  (p.v || '').split(',').forEach(x => { if (!x) return; prev += parseInt(x, 36); o.push(prev); });
  return (p._v = o);
}
function pEncG(g) { const r = ref(g); return (r.b + 1) * 1000000 + (r.c + 1) * 1000 + (r.v + 1); }
function pDecG(n) { const b = Math.floor(n / 1000000) - 1, c = Math.floor(n / 1000) % 1000 - 1, v = n % 1000 - 1; if (b < 0 || b >= NB || c < 0 || c >= VC[b].length || v < 0 || v >= VC[b][c]) return null; return G(b, c, v); }
function personFor(code, g) {
  if (!window.PEOPLE_CODE) return -1; const ids = PEOPLE_CODE[code]; if (!ids || !ids.length) return -1;
  if (g != null && ids.length > 1) { const e = pEncG(g); const hit = ids.find(i => pRefs(PEOPLE[i]).indexOf(e) >= 0); if (hit != null) return hit; }
  return ids.slice().sort((a, b) => PEOPLE[b].c - PEOPLE[a].c)[0];
}
const pShort = n => String(n || '').replace(/\s*\(.*\)\s*$/, '');
function pChips(ids) { return (ids || []).map(i => '<button class="pp-chip" data-p="' + i + '">' + esc(pShort(PEOPLE[i].n)) + '</button>').join(''); }
function pRefBtn(n, l) { const g = pDecG(n); return g == null ? '' : '<button class="cs-v" data-g="' + g + '">' + esc(slabel(g, l)) + '</button>'; }
function pTemplate(p) {
  const rel = (ids, m, f) => ids && ids.length ? (p.s === 2 ? f : m) + ' ' + ids.slice(0, 3).map(i => pShort(PEOPLE[i].n)).join(', ') : '';
  const bits = [];
  const fa = (p.fa || []).filter(i => PEOPLE[i].s !== 2), mo = (p.fa || []).filter(i => PEOPLE[i].s === 2);
  if (fa.length) bits.push((p.s === 2 ? 'Fiica lui ' : 'Fiul lui ') + fa.map(i => pShort(PEOPLE[i].n)).join(' sau '));
  if (mo.length) bits.push('mama: ' + mo.map(i => pShort(PEOPLE[i].n)).join(', '));
  if (p.sp && p.sp.length) bits.push((p.s === 2 ? 'soția lui ' : 'soțul ') + p.sp.slice(0, 2).map(i => pShort(PEOPLE[i].n)).join(', '));
  const k = rel(p.ch, 'tatăl lui', 'mama lui'); if (k) bits.push(k + (p.ch.length > 3 ? ' ș.a.' : ''));
  return bits.length ? bits.join('; ') + '.' : '';
}
function personMini(code, g) {
  if (!window.PEOPLE) return '<div class="pp-mini" data-pcode="' + code + '" data-pg="' + (g == null ? '' : g) + '"></div>';
  const i = personFor(code, g); if (i < 0) return '';
  const p = PEOPLE[i];
  return '<button class="pp-mini on" data-p="' + i + '"><span class="pp-av">' + esc(pShort(p.n).slice(0, 1)) + '</span><span class="pp-mt"><b>' + esc(pShort(p.n)) + '</b><small>' + esc([p.r, p.p].filter(Boolean).join(' · ')) + ' · ' + p.c + L(' mențiuni', ' mentions') + '</small></span><span class="pp-go">' + L('Card', 'Card') + ' ›</span></button>';
}
function fillPersonMini(box) {
  const m = box.querySelector('.pp-mini[data-pcode]'); if (!m) return;
  loadPeople(() => { const h = personMini(m.dataset.pcode, m.dataset.pg === '' ? null : +m.dataset.pg); if (m.isConnected) m.outerHTML = h || ''; });
}
function pMiniI(i, pre) {
  const p = PEOPLE[i];
  return '<button class="pp-mini on" data-p="' + i + '"><span class="pp-av">' + esc(pShort(p.n).slice(0, 1)) + '</span><span class="pp-mt"><b>' + esc(pShort(p.n)) + '</b><small>' + (pre ? esc(pre) + ' · ' : '') + esc([p.r, p.p].filter(Boolean).join(' · ')) + ' · ' + p.c + L(' mențiuni', ' mentions') + '</small></span><span class="pp-go">' + L('Card', 'Card') + ' ›</span></button>';
}
let PIDX = null;
function pIdx() {
  if (PIDX || !window.PEOPLE) return PIDX; PIDX = {};
  PEOPLE.forEach((p, i) => { if (!p.c) return; pRefs(p).forEach(e => { (PIDX[e] || (PIDX[e] = [])).push(i); }); });
  return PIDX;
}
const pSort = ids => ids.slice().sort((a, b) => PEOPLE[b].c - PEOPLE[a].c);
function peopleInVerse(g) { const x = pIdx(); return x ? pSort(x[pEncG(g)] || []) : []; }
function peopleInChapter(b, c) {
  const x = pIdx(); if (!x) return []; const cnt = {}; const n = VC[b][c];
  for (let v = 0; v < n; v++) (x[(b + 1) * 1000000 + (c + 1) * 1000 + v + 1] || []).forEach(i => cnt[i] = (cnt[i] || 0) + 1);
  return Object.keys(cnt).map(Number).sort((a, b2) => cnt[b2] - cnt[a] || PEOPLE[b2].c - PEOPLE[a].c).map(i => [i, cnt[i]]);
}
/* ===== Hărți și locuri (offline; OpenBible.info Geocoding CC BY 4.0 + Natural Earth) ===== */
let geoCbs = null, GIDX = null;
function loadGeo(cb) {
  if (window.GEO) { cb && cb(); return; }
  if (geoCbs) { cb && geoCbs.push(cb); return; }
  geoCbs = cb ? [cb] : []; const sc = document.createElement('script'); sc.src = 'geo.js';
  sc.onload = () => { const c = geoCbs; geoCbs = null; c.forEach(f => f()); };
  sc.onerror = () => { geoCbs = null; };
  document.head.appendChild(sc);
}
function gIdx() {
  if (GIDX || !window.GEO) return GIDX; GIDX = { v: {}, c: {} };
  GEO.forEach((p, i) => { let prev = 0; (p[8] || '').split(',').forEach(x => { if (!x) return; prev += parseInt(x, 36); (GIDX.v[prev] || (GIDX.v[prev] = [])).push(i); const ck = Math.floor(prev / 1000); const m = GIDX.c[ck] || (GIDX.c[ck] = {}); (m[i] || (m[i] = [])).push(prev); }); });
  return GIDX;
}
function placesInChapter(b, c) { const x = gIdx(); if (!x) return []; const m = x.c[(b + 1) * 1000 + c + 1] || {}; return Object.keys(m).map(Number).map(i => [i, m[i]]).sort((a, b2) => b2[1].length - a[1].length || a[1][0] - b2[1][0]); }
function placesInVerse(g) { const x = gIdx(); return x ? (x.v[pEncG(g)] || []).map(i => [i, [pEncG(g)]]) : []; }
const gXY = (lo, la) => [(lo - 8) * 100 * GEOBASE.k, (46 - la) * 100];
function gConf(n) { return n >= 900 ? [L('sigur', 'certain'), 'c4'] : n >= 500 ? [L('probabil', 'likely'), 'c3'] : n >= 200 ? [L('posibil', 'possible'), 'c2'] : [L('incert', 'uncertain'), 'c1']; }
function geoView(list, mode, extra) {
  const B = GEOBASE, pts = list.map(([i]) => { const p = GEO[i]; return gXY(p[2], p[3]); }).concat(extra || []);
  let x0 = 0, y0 = 0, x1 = B.w, y1 = B.h;
  if (mode !== 'w' && pts.length) {
    x0 = Math.min(...pts.map(p => p[0])); x1 = Math.max(...pts.map(p => p[0])); y0 = Math.min(...pts.map(p => p[1])); y1 = Math.max(...pts.map(p => p[1]));
    const minS = mode === 'r' ? 900 : 110, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2; let w = Math.max(x1 - x0, minS) * (mode === 'r' ? 1.6 : 1.3), h = Math.max(y1 - y0, minS * .75) * (mode === 'r' ? 1.6 : 1.3);
    if (w / h < 1.25) w = h * 1.25; else h = w / 1.25;
    x0 = cx - w / 2; x1 = cx + w / 2; y0 = cy - h / 2; y1 = cy + h / 2;
  }
  return [x0, y0, x1 - x0, y1 - y0];
}
const GM_MODE = { w: ['🚶', 'pe jos', 'on foot'], s: ['⛵', 'cu corabia', 'by ship'], c: ['🐫', 'caravană cu animale', 'caravan with animals'], d: ['🫏', 'cu măgarul', 'by donkey'], v: ['🛞', 'cu carul / carele', 'by cart / wagons'], h: ['🐎', 'călare', 'on horseback'] };
const GM_TERR = { d: ['Deșert', 'Desert'], m: ['Munți', 'Mountains'], p: ['Podiș', 'Plateau'], f: ['Câmpie / deltă fertilă', 'Fertile plain / delta'] };
const GM_SPEED = { w: [20, 30], c: [10, 20], d: [25, 30], v: [15, 25], s: [90, 200], h: [30, 50] };
const GM_SRC = { orbis: ['„Orbis: The Stanford Geospatial Network Model of the Roman World”, Princeton/Stanford Working Papers in Classics', 'Walter Scheidel (model: W. Scheidel, E. Meeks)', '2015', 'academic · model al vitezelor de călătorie în antichitate', 'https://papers.ssrn.com/abstract=2609654'], casson: ['„Speed under Sail of Ancient Ships”, Transactions of the American Philological Association 82, pp. 136–148', 'Lionel Casson', '1951', 'academic · articol de referință', 'https://penelope.uchicago.edu/Thayer/E/Journals/TAPA/82/Speed_under_Sail_of_Ancient_Ships*.html'] };
function gKm(a, b) { const R0 = 6371, t = Math.PI / 180, dLa = (b[2] - a[2]) * t, dLo = (b[1] - a[1]) * t; const h = Math.sin(dLa / 2) ** 2 + Math.cos(a[2] * t) * Math.cos(b[2] * t) * Math.sin(dLo / 2) ** 2; return 2 * R0 * Math.asin(Math.sqrt(h)); }
function routeInfoHtml(id, part) {
  const R = GROUTES.find(r => r[0] === id); if (!R) return ''; Object.assign(window.CTX_SRC = window.CTX_SRC || {}, GM_SRC);
  const by = {}; let tot = 0;
  R[6].forEach((s2, k) => { if (!k || (part && part.indexOf(k) < 0)) return; const d = gKm(R[6][k - 1], s2); tot += d; by[s2[3]] = (by[s2[3]] || 0) + d; });
  let dmin = 0, dmax = 0; Object.keys(by).forEach(m => { dmin += by[m] / GM_SPEED[m][1]; dmax += by[m] / GM_SPEED[m][0]; });
  const km = x => x >= 100 ? (Math.round(x / 10) * 10).toLocaleString('ro-RO') : Math.round(x);
  const days = (a, b) => { a = Math.max(1, Math.round(a)); b = Math.max(a, Math.round(b)); return a === b ? a + L(' zile', ' days') : a + '–' + b + L(' zile', ' days'); };
  return '<div class="fn-h">📏 ' + esc(R[1]) + (part ? L(' · porțiunea de aici', ' · this part') : '') + '</div><div class="gm-ri"><div class="gm-ri-big"><b>≈ ' + km(tot) + ' km</b><span>' + L('în linie dreaptă între etape', 'straight line between stages') + '</span></div><div class="gm-ri-big"><b>' + days(dmin, dmax) + '</b><span>' + L('timp de mers estimat, fără opriri', 'estimated travel time, no stops') + '</span></div></div>' +
    Object.keys(by).map(m => '<div class="gm-ri-row"><span>' + GM_MODE[m][0] + ' ' + L(GM_MODE[m][1], GM_MODE[m][2]) + '</span><b>≈ ' + km(by[m]) + ' km</b><small>' + GM_SPEED[m][0] + '–' + GM_SPEED[m][1] + L(' km/zi → ', ' km/day → ') + days(by[m] / GM_SPEED[m][1], by[m] / GM_SPEED[m][0]) + '</small></div>').join('') +
    (R[8] && R[8].length ? '<div class="fn-h">' + L('Ce spune textul', 'What the text says') + '</div>' + R[8].map(([t, e]) => '<button class="fn-r" data-g="' + pDecG(e) + '"><b>📖 ' + esc(slabel(pDecG(e), stLang())) + '</b><span>' + esc(t) + '</span></button>').join('') : '') +
    '<p class="cs-note">' + L('Distanțele sunt în linie dreaptă, deci drumul real a fost mai lung. Timpul e o estimare (categoria D): pentru mers pe jos și animale după vitezele medii din modelul ORBIS, iar pentru corăbii după Casson (vânt favorabil sau potrivnic). Turmele și familiile mergeau mai încet. Opririle (popasuri, iernat, așteptarea vântului) nu sunt incluse.', 'Straight-line distances; real roads were longer. Times are estimates (category D) based on ORBIS speeds and Casson for ships; stops are not included.') + ' <sup class="cs" data-cs="orbis,casson">*</sup></p>';
}
// traseele apar singure doar unde capitolul (sau versetul) descrie o etapă; se desenează doar porțiunea respectivă
function routesFor(b, c, enc) {
  const ck = (b + 1) * 1000 + c + 1, part = {};
  (window.GROUTES || []).forEach(R => { const ks = []; R[6].forEach((s2, k) => { if (k && [s2[4]].concat(s2[6] || []).some(r => r && (enc ? r === enc : Math.floor(r / 1000) === ck))) ks.push(k); }); if (ks.length) part[R[0]] = ks; });
  return part;
}
const rKs = (R, opt) => (opt.part && opt.part[R[0]]) || R[6].map((_, k) => k).slice(1);
const rInv = ks => { const o = new Set(); ks.forEach(k => { o.add(k - 1); o.add(k); }); return o; };
function geoSvg(list, v, opt) {
  opt = opt || {};
  const B = GEOBASE, pts = list.map(([i]) => { const p = GEO[i]; return gXY(p[2], p[3]); });
  const [x0, y0] = v, x1 = v[0] + v[2], y1 = v[1] + v[3];
  const W = x1 - x0, fs = W / 30, inV = ([x, y]) => x > x0 && x < x1 && y > y0 && y < y1, nv = pts.filter(inV).length, many = nv > 30, r = W / (many ? 130 : 62), sw = (fs * .2).toFixed(2);
  const refs = [['Ierusalim', 35.23, 31.78], ['Damasc', 36.29, 33.51], ['Babilon', 44.42, 32.54], ['Ninive', 43.15, 36.36], ['Memfis', 31.25, 29.85], ['Susa', 48.26, 32.19], ['Antiohia', 36.16, 36.2], ['Efes', 27.34, 37.94], ['Atena', 23.72, 37.97], ['Roma', 12.49, 41.89], ['Tir', 35.2, 33.27], ['Gaza', 34.46, 31.5], ['Corint', 22.88, 37.91], ['Ur', 46.1, 30.96], ['Haran', 39.03, 36.86]];
  const used = [];
  const free = (x, y) => !used.some(u => Math.abs(u[0] - x) < fs * 4 && Math.abs(u[1] - y) < fs * 1.1);
  let lab = '', mk = '';
  list.forEach(([i], k) => { const [x, y] = pts[k]; mk += '<g class="gm-m" data-gi="' + i + '"><circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + r.toFixed(2) + '"/><text class="gm-n" x="' + x.toFixed(1) + '" y="' + (y + r * .42).toFixed(1) + '" font-size="' + (r * 1.15).toFixed(2) + '">' + (k + 1) + '</text></g>'; });
  let nl = 0;
  list.forEach(([i], k) => { const [x, y] = pts[k]; if (inV(pts[k]) && nl < 25 && free(x + r * 1.4, y)) { nl++; used.push([x + r * 1.4 + fs * 2, y]); lab += '<text class="gm-l" stroke-width="' + sw + '" x="' + (x + r * 1.4).toFixed(1) + '" y="' + (y + fs * .35).toFixed(1) + '" font-size="' + fs.toFixed(2) + '">' + esc(pShort(GEO[i][0])) + '</text>'; } });
  const names = list.map(([i]) => pShort(GEO[i][0]));
  const rl = refs.map(q => [q, gXY(q[1], q[2])]).filter(([q, [x, y]]) => x > x0 && x < x1 && y > y0 && y < y1 && names.indexOf(q[0]) < 0 && free(x, y)).map(([q, [x, y]]) => { used.push([x, y]); return '<circle class="gm-rd" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (r * .45).toFixed(2) + '"/><text class="gm-rl" x="' + (x + r * .8).toFixed(1) + '" y="' + (y + fs * .3).toFixed(1) + '" font-size="' + (fs * .8).toFixed(2) + '">' + q[0] + '</text>'; }).join('');
  // teren
  let ter = '', tl = '';
  if (opt.terr && window.GTERR) {
    const ps = W / 70;
    ter = '<defs><pattern id="gpD" patternUnits="userSpaceOnUse" width="' + ps + '" height="' + ps + '"><circle cx="' + ps / 2 + '" cy="' + ps / 2 + '" r="' + ps / 7 + '" class="gpd"/></pattern><pattern id="gpM" patternUnits="userSpaceOnUse" width="' + ps * 1.6 + '" height="' + ps * 1.3 + '"><path d="M0 ' + ps + 'l' + ps * .5 + ' -' + ps * .7 + 'l' + ps * .5 + ' ' + ps * .7 + '" class="gpm" stroke-width="' + ps / 9 + '"/></pattern><pattern id="gpP" patternUnits="userSpaceOnUse" width="' + ps + '" height="' + ps + '"><path d="M0 ' + ps + 'L' + ps + ' 0" class="gpp" stroke-width="' + ps / 10 + '"/></pattern></defs>';
    GTERR.forEach(([c, n, d, lx, ly]) => { ter += '<path class="gt gt-' + c + '" d="' + d + '"' + (c === 'd' ? ' fill="url(#gpD)"' : c === 'm' ? ' fill="url(#gpM)"' : c === 'p' ? ' fill="url(#gpP)"' : '') + '/>'; if (lx > x0 && lx < x1 && ly > y0 && ly < y1 && free(lx, ly)) { used.push([lx, ly]); tl += '<text class="gm-tl" stroke-width="' + sw + '" x="' + lx + '" y="' + ly + '" font-size="' + (fs * .72).toFixed(2) + '">' + esc(n) + '</text>'; } });
  }
  // trasee
  let rt = '';
  (opt.routes || []).forEach(id => { const R = (window.GROUTES || []).find(r => r[0] === id); if (!R) return;
    const P = R[6].map(s2 => gXY(s2[1], s2[2])), ks = rKs(R, opt), inv = rInv(ks);
    const dd = ks.map((k, j) => (j && ks[j - 1] === k - 1 ? '' : 'M' + P[k - 1][0].toFixed(1) + ' ' + P[k - 1][1].toFixed(1)) + 'L' + P[k][0].toFixed(1) + ' ' + P[k][1].toFixed(1)).join('');
    rt += '<path class="gm-rh" data-rinfo="' + id + '" d="' + dd + '" stroke-width="' + (W / 40).toFixed(2) + '"/>';
    rt += '<path class="gm-rt" d="' + dd + '" stroke="' + R[2] + '" stroke-dasharray="' + (W / 90).toFixed(2) + ' ' + (W / 130).toFixed(2) + '" stroke-width="' + (W / 380).toFixed(2) + '"/>';
    R[6].forEach((s2, k) => { if (!inv.has(k)) return; const [x, y] = P[k]; rt += '<circle class="gm-rs" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (W / 240).toFixed(2) + '" fill="' + R[2] + '"/>';
      if (inV(P[k]) && free(x + fs * .3, y)) { used.push([x + fs * .3 + fs * 2, y]); lab += '<text class="gm-l gm-rl2" stroke-width="' + sw + '" x="' + (x + fs * .35).toFixed(1) + '" y="' + (y - fs * .25).toFixed(1) + '" font-size="' + (fs * .75).toFixed(2) + '">' + esc(pShort(s2[0])) + '</text>'; }
      if (k && s2[3] && ks.indexOf(k) >= 0) { const [ax, ay] = P[k - 1]; const mx = (ax + x) / 2, my = (ay + y) / 2; if (inV([mx, my]) && Math.hypot(x - ax, y - ay) > fs * 1.2) rt += '<text class="gm-mo' + (s2[5] ? '' : ' pr') + '" x="' + mx.toFixed(1) + '" y="' + (my + fs * .3).toFixed(1) + '" font-size="' + (fs * .9).toFixed(2) + '">' + GM_MODE[s2[3]][0] + '</text>'; } });
  });
  return '<svg class="gm" viewBox="' + [x0, y0, W, y1 - y0].map(v => v.toFixed(1)).join(' ') + '" preserveAspectRatio="xMidYMid slice"><rect x="-9999" y="-9999" width="29999" height="29999" class="gm-sea"/><path class="gm-land" d="' + B.land + '"/>' + ter + '<path class="gm-lake" d="' + B.lake + '"/><path class="gm-riv" d="' + B.riv + '"/>' + tl + rt + rl + mk + lab + '</svg>';
}
function openMap(list, title, chap) {
  const l = stLang();
  const row = ([i, vs], k) => { const p = GEO[i]; const [cf, cc] = gConf(p[5]);
    return '<div class="gm-it" data-gi="' + i + '"><div class="gm-ih"><span class="gm-no">' + (k + 1) + '</span><b>' + esc(p[0]) + '</b>' + (p[0] !== p[1] ? '<small> · ' + esc(p[1]) + '</small>' : '') + '<span class="gm-cf ' + cc + '">' + cf + '</span></div>' +
      '<div class="gm-md">' + esc(p[4]) + (p[6] && p[6] !== p[1] && !/^another name/.test(p[6]) ? ' · ' + L('azi: ', 'today: ') + esc(p[6]) : '') + (p[7] ? ' · ' + L('există și alte identificări', 'other identifications exist') : '') + '</div>' +
      '<div class="cs-vs">' + vs.slice(0, 12).map(n => pRefBtn(n, l)).join('') + (p[9] ? '<a href="https://www.openbible.info/geo/ancient/' + p[9] + '" data-url>OpenBible ↗</a>' : '') + '</div></div>'; };
  const auto = chap ? routesFor(chap[0], chap[1], chap[2]) : {};
  const opt = { terr: !!S.mapTerr, routes: Object.keys(auto), part: Object.assign({}, auto) };
  const rPts = () => opt.routes.flatMap(id => { const R = GROUTES.find(r => r[0] === id); if (!R) return []; const inv = rInv(rKs(R, opt)); return R[6].filter((_, k) => inv.has(k)).map(s2 => gXY(s2[1], s2[2])); });
  let view = geoView(list, 'c', rPts());
  const legend = () => (opt.terr ? '<div class="gm-lg">' + Object.keys(GM_TERR).map(k => '<span><i class="gt-' + k + '"></i>' + L(GM_TERR[k][0], GM_TERR[k][1]) + '</span>').join('') + '</div>' : '') +
    (opt.routes.length ? '<div class="gm-lg">' + Object.keys(GM_MODE).map(k => '<span>' + GM_MODE[k][0] + ' ' + L(GM_MODE[k][1], GM_MODE[k][2]) + '</span>').join('') + '<span class="pr">' + L('estompat = presupus, nu scris în text', 'faded = presumed, not stated') + '</span></div>' : '');
  const rCards = () => opt.routes.map(id => { const R = GROUTES.find(r => r[0] === id); if (!R) return ''; const [cf] = [R[3]];
    return '<div class="gm-rc" style="border-color:' + R[2] + '"><div class="gm-ih"><b>' + esc(R[1]) + '</b><span class="cr-cat c' + R[3] + '"><i>' + R[3] + '</i>' + ({ B: L('etape din textul biblic', 'stages from the text'), D: L('drum presupus', 'presumed route'), E: L('traseu disputat', 'disputed route') }[R[3]] || '') + '</span></div><p class="cs-note">' + esc(R[4]) + (R[7].length ? ' <sup class="cs" data-cs="' + R[7].join(',') + '">*</sup>' : '') + '</p><div class="gm-steps">' +
      (opt.part[R[0]] ? '<p class="gm-part">' + L('Pe hartă e doar porțiunea din acest ' + (chap && chap[2] ? 'verset' : 'capitol') + '.', 'Only the part from this ' + (chap && chap[2] ? 'verse' : 'chapter') + ' is drawn.') + '</p>' : '') +
      R[6].map((s2, k) => (k ? '<span class="gm-st-m' + (s2[5] ? '' : ' pr') + '" title="' + esc(L(GM_MODE[s2[3]][1], GM_MODE[s2[3]][2]) + (s2[5] ? L(' (scris în text)', ' (stated)') : L(' (presupus)', ' (presumed)'))) + '">' + GM_MODE[s2[3]][0] + '</span>' : '') + (s2[4] ? '<button class="cs-v gm-st' + (opt.part[R[0]] && rInv(opt.part[R[0]]).has(k) ? ' cur' : '') + '" data-g="' + pDecG(s2[4]) + '">' + esc(pShort(s2[0])) + '</button>' : '<span class="gm-st">' + esc(pShort(s2[0])) + '</span>')).join('') + '</div><button class="gm-rinfo" data-rinfo="' + R[0] + '">📏 ' + L('Distanță și timp', 'Distance & time') + '</button>' + (auto[R[0]] ? '<button class="gm-rinfo gm-rfull" data-rfull="' + R[0] + '">' + (opt.part[R[0]] ? '〰 ' + L('Arată tot traseul', 'Show the whole route') : '〰 ' + L('Doar porțiunea de aici', 'Only this part')) + '</button>' : '') + '</div>'; }).join('');
  const html = '<div class="gm-z"><button data-gz="c" class="on">' + L('Aproape', 'Close') + '</button><button data-gz="r">' + L('Regiune', 'Region') + '</button><button data-gz="w">' + L('Toată harta', 'Whole map') + '</button></div>' +
    '<div class="gm-z gm-z2"><button data-gt="1" class="' + (opt.terr ? 'on' : '') + '">⛰ ' + L('Teren', 'Terrain') + '</button><button data-grs="1" class="' + (opt.routes.length ? 'on' : '') + '">〰 ' + L('Trasee', 'Routes') + (opt.routes.length ? ' · ' + opt.routes.length : '') + '</button></div>' +
    '<div class="gm-wrap"><div class="gm-box">' + geoSvg(list, view, opt) + '</div><div class="gm-zb"><button data-gzi="1" aria-label="Zoom +">+</button><button data-gzi="-1" aria-label="Zoom −">−</button></div></div><div class="gm-leg">' + legend() + '</div><div class="gm-rcs">' + rCards() + '</div>' +
    '<div class="gm-list">' + list.map(row).join('') + '</div>' +
    '<p class="cs-note">* ' + L('Coordonate: OpenBible.info, Bible Geocoding Data (CC BY 4.0), cu gradul de încredere al identificării; hartă de bază: Natural Earth (domeniu public; coastele și râurile de azi). Localizarea multor locuri antice e o identificare academică, nu o certitudine. Numele românești sunt potrivite automat după Cornilescu.', 'Coordinates: OpenBible.info Bible Geocoding Data (CC BY 4.0) with identification confidence; base map: Natural Earth (public domain; modern coasts and rivers). Many ancient sites are scholarly identifications, not certainties.') + '</p>';
  ctxOverlay(title, html, ov => {
    const box = ov.querySelector('.gm-box');
    const redraw = () => { const on = ov.querySelector('.gm-m.on'); box.innerHTML = geoSvg(list, view, opt); if (on) hl(on.dataset.gi); };
    const refreshUI = () => { ov.querySelector('.gm-leg').innerHTML = legend(); ov.querySelector('.gm-rcs').innerHTML = rCards(); const tb = ov.querySelector('[data-gt]'), rb = ov.querySelector('[data-grs]'); tb.classList.toggle('on', opt.terr); rb.classList.toggle('on', !!opt.routes.length); rb.innerHTML = '〰 ' + L('Trasee', 'Routes') + (opt.routes.length ? ' · ' + opt.routes.length : ''); };
    const B = GEOBASE;
    const zoom = (f, fx, fy) => { const nw = Math.max(25, Math.min(B.w * 1.2, view[2] * f)), nf = nw / view[2]; const cx = view[0] + view[2] * fx, cy = view[1] + view[3] * fy; view = [cx - (cx - view[0]) * nf, cy - (cy - view[1]) * nf, view[2] * nf, view[3] * nf]; ov.querySelectorAll('[data-gz]').forEach(b => b.classList.remove('on')); };
    const setVB = () => { const sv = box.querySelector('svg'); if (sv) sv.setAttribute('viewBox', view.map(v => v.toFixed(1)).join(' ')); };
    let pts = new Map(), g0 = null, moved = false, rt = 0;
    const later = () => { clearTimeout(rt); rt = setTimeout(redraw, 180); };
    box.style.touchAction = 'none';
    box.addEventListener('pointerdown', e => { pts.set(e.pointerId, [e.clientX, e.clientY]); g0 = null; moved = false; });
    box.addEventListener('pointermove', e => {
      if (!pts.has(e.pointerId)) return; const prev = pts.get(e.pointerId); pts.set(e.pointerId, [e.clientX, e.clientY]);
      const r = box.getBoundingClientRect(), k = view[2] / r.width;
      if (pts.size === 1) { const dx = e.clientX - prev[0], dy = e.clientY - prev[1]; if (Math.abs(dx) + Math.abs(dy) > 0) { if (Math.abs(dx) + Math.abs(dy) > 2) moved = true; view = [view[0] - dx * k, view[1] - dy * k, view[2], view[3]]; setVB(); later(); } }
      else if (pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]), mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2; if (g0) { zoom(g0 / d, (mx - r.left) / r.width, (my - r.top) / r.height); setVB(); later(); } g0 = d; moved = true; }
    });
    const up = e => { pts.delete(e.pointerId); g0 = null; };
    box.addEventListener('pointerup', up); box.addEventListener('pointercancel', up);
    box.addEventListener('wheel', e => { e.preventDefault(); const r = box.getBoundingClientRect(); zoom(e.deltaY < 0 ? 1 / 1.2 : 1.2, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height); setVB(); later(); }, { passive: false });
    const hl = gi => { ov.querySelectorAll('.gm-it.on,.gm-m.on').forEach(x => x.classList.remove('on')); ov.querySelectorAll('[data-gi="' + gi + '"]').forEach(x => x.classList.add('on')); };
    ov.querySelector('.ctx-bd').addEventListener('click', e => {
      const z = e.target.closest('[data-gz]'); if (z) { ov.querySelectorAll('[data-gz]').forEach(b => b.classList.toggle('on', b === z)); view = geoView(list, z.dataset.gz, rPts()); redraw(); hap(0); return; }
      if (e.target.closest('[data-gt]')) { opt.terr = !opt.terr; S.mapTerr = opt.terr; persist(); redraw(); refreshUI(); hap(0); return; }
      const rsb = e.target.closest('[data-grs]'); if (rsb) {
        const here = Object.keys(auto), item = R => '<button class="fn-r gm-rch' + (opt.routes.indexOf(R[0]) >= 0 ? ' on' : '') + '" data-rid="' + R[0] + '"><b><i style="background:' + R[2] + '"></i>' + esc(R[1]) + '</b><span>' + (opt.routes.indexOf(R[0]) >= 0 ? '✓ ' + L('afișat', 'shown') : L('atinge ca să afișezi', 'tap to show')) + '</span></button>';
        const others = GROUTES.filter(R => here.indexOf(R[0]) < 0);
        const html = '<div class="fn-h">' + L('Trasee în acest pasaj', 'Routes in this passage') + '</div>' + (here.length ? GROUTES.filter(R => here.indexOf(R[0]) >= 0).map(item).join('') : '<p class="cs-note">' + L('Niciun traseu nu trece prin acest pasaj.', 'No route passes through this passage.') + '</p>') +
          '<button class="fn-r gm-more" data-gmore="1"><b>▸ ' + L('Toate traseele din Biblie', 'All biblical routes') + ' (' + others.length + ')</b></button><div class="gm-others hidden">' + others.map(item).join('') + '</div>';
        fnPop(rsb, html, pop => { pop.querySelector('[data-gmore]').onclick = () => { pop.querySelector('.gm-others').classList.toggle('hidden'); pop.querySelector('[data-gmore] b').textContent = (pop.querySelector('.gm-others').classList.contains('hidden') ? '▸ ' : '▾ ') + L('Toate traseele din Biblie', 'All biblical routes') + ' (' + others.length + ')'; }; pop.querySelectorAll('[data-rid]').forEach(b => b.onclick = () => { const id = b.dataset.rid, k = opt.routes.indexOf(id); if (k >= 0) { opt.routes.splice(k, 1); delete opt.part[id]; } else { opt.routes.push(id); delete opt.part[id]; view = geoView(list, 'c', rPts()); } pop.remove(); redraw(); refreshUI(); hap(0); }); }); return; }
      const csx = e.target.closest('.cs'); if (csx && csx.closest('.gm-rc')) { e.stopPropagation(); loadChron(() => fnPop(csx, '<div class="fn-h">' + L('Surse', 'Sources') + '</div>' + csx.dataset.cs.split(',').map(srcCard).join(''), bindUrls)); return; }
      const zi = e.target.closest('[data-gzi]'); if (zi) { zoom(+zi.dataset.gzi > 0 ? 1 / 1.6 : 1.6, .5, .5); redraw(); hap(0); return; }
      if (moved && box.contains(e.target)) { moved = false; return; } moved = false;
      const rf = e.target.closest('[data-rfull]'); if (rf) { const id = rf.dataset.rfull; if (opt.part[id]) delete opt.part[id]; else opt.part[id] = auto[id]; view = geoView(list, 'c', rPts()); redraw(); refreshUI(); hap(0); return; }
      const ri = e.target.closest('[data-rinfo]'); if (ri) { e.stopPropagation(); fnPop(ri, routeInfoHtml(ri.dataset.rinfo, opt.part[ri.dataset.rinfo]), pop => { bindUrls(pop); pop.addEventListener('click', ev => { const c = ev.target.closest('.cs'); if (c) { ev.stopPropagation(); fnPop(c, '<div class="fn-h">' + L('Surse', 'Sources') + '</div>' + c.dataset.cs.split(',').map(srcCard).join(''), bindUrls); return; } const r2 = ev.target.closest('.fn-r[data-g]'); if (r2) { pop.remove(); ov.remove(); crVerse(+r2.dataset.g); } }); }); return; }
      const v = e.target.closest('.cs-v'); if (v) { e.stopPropagation(); const g = +v.dataset.g; ov.remove(); if (document.getElementById('study')) stPreview(g, 0); else openVerse(g, true); return; }
      const m = e.target.closest('.gm-m'); if (m) { const gi = m.dataset.gi; hl(gi); const it = ov.querySelector('.gm-it[data-gi="' + gi + '"]'); if (it) it.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); return; }
      const it = e.target.closest('.gm-it'); if (it && !e.target.closest('a')) { hl(it.dataset.gi); box.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
    });
  });
}
/* ===== Cronologie biblică (grafic cu zoom și căutare) ===== */
let chronCbs = null;
function loadChron(cb) {
  if (window.CHRON) { cb && cb(); return; }
  if (chronCbs) { cb && chronCbs.push(cb); return; }
  chronCbs = cb ? [cb] : []; const sc = document.createElement('script'); sc.src = 'chron.js';
  const fin = () => { Object.assign(window.CTX_SRC = window.CTX_SRC || {}, CHRON.src); crLang(); const c = chronCbs; chronCbs = null; c.forEach(f => f()); };
  sc.onload = () => { const e = document.createElement('script'); e.src = 'chron_en.js'; e.onload = fin; e.onerror = fin; document.head.appendChild(e); };
  sc.onerror = () => { chronCbs = null; };
  document.head.appendChild(sc);
}
const CR = { mode: 'm', late: false, sc: 1.2, sel: null };
/* Chronology language: the data is Romanian; CHRON_EN maps "RO name|start year" -> [English name, English note]. */
function crLang() {
  if (!window.CHRON) return; const en = UI_EN && window.CHRON_EN, E = window.CHRON_EN || {};
  ['it', 'gi'].forEach(k => CHRON[k].forEach(it => { if (it._ro == null) it._ro = [it[0], it[9]]; const t = en && E.it[it._ro[0] + '|' + it[2]]; it[0] = t ? t[0] : it._ro[0]; it[9] = t ? (t[1] || '') : it._ro[1]; }));
  ['eras', 'geras'].forEach(k => CHRON[k].forEach(e => { if (e._ro == null) e._ro = e[0]; e[0] = en && E.eras[e._ro] ? E.eras[e._ro] : e._ro; }));
}
const BOOKY = [-2000, -1446, -1445, -1430, -1406, -1400, -1200, -1100, -1050, -1000, -950, -800, -1000, -850, -458, -445, -479, -1900, -1000, -950, -950, -950, -720, -600, -586, -590, -560, -750, -800, -760, -586, -780, -720, -650, -605, -630, -520, -520, -430, 28, 28, 28, 28, 45, 57, 55, 56, 49, 61, 61, 61, 51, 51, 63, 66, 63, 61, 66, 48, 64, 66, 90, 90, 90, 70, 95];
function crAdj(y) { if (!CR.late || CR.mode !== 'm') return y; if (y < -1446) return y + 186; if (y < -1050) return -1260 + (y + 1446) * (210 / 396); return y; }
function crA(it, y) { return it[5] === 'W' ? y : crAdj(y); }
function crYear(y) { if (CR.mode === 'g') return L('anul ', 'year ') + Math.round(y) + L(' al lumii', ' AM'); y = Math.round(y); return y < 0 ? -y + L(' î.Hr.', ' BC') : y + L(' d.Hr.', ' AD'); }
function crItems() { return CR.mode === 'g' ? CHRON.gi : CHRON.it; }
const CR_G = { E: ['Evenimente biblice', 'Biblical events'], W: ['Istoria lumii · în același timp', 'World history · at the same time'], P: ['Patriarhi, conducători, judecători', 'Patriarchs, leaders, judges'], U: ['Regatul unit', 'United kingdom'], J: ['Împărații lui Iuda', 'Kings of Judah'], I: ['Împărații lui Israel', 'Kings of Israel'], R: ['Prooroci', 'Prophets'], X: ['Imperii și conducători străini', 'Empires and foreign rulers'], N: ['Noul Testament', 'New Testament'] };
const CR_CAT = { A: ['confirmat de surse externe', 'confirmed by outside sources'], B: ['calculat din textul biblic', 'calculated from the biblical text'], C: ['reconstrucție academică', 'scholarly reconstruction'], D: ['aproximare / ipoteză', 'approximation / hypothesis'], E: ['disputat / necunoscut', 'disputed / unknown'] };
function crRange() { return CR.mode === 'g' ? [-60, 2230] : [-2250, 120]; }
function crX(y) { return 120 + (y - crRange()[0]) * CR.sc; }
function crRender() {
  const box = $('#crIn'), ax = $('#crAxIn'); if (!box) return;
  const [Y0, Y1] = crRange(), W = crX(Y1) + Math.max(40, (($('#crSc') || {}).clientWidth || 400) / 2), l = stLang();
  // axis
  const st = CR.sc > 6 ? 10 : CR.sc > 2.5 ? 25 : CR.sc > 1 ? 50 : CR.sc > .45 ? 100 : 200;
  let a = '';
  const eras = CR.mode === 'g' ? CHRON.geras : CHRON.eras;
  eras.forEach(([n, p, s, e], k) => { const x0 = crX(crAdj(s)), x1 = crX(crAdj(e)); a += '<button class="cr-era e' + (k % 4) + '" data-era="' + k + '" style="left:' + x0.toFixed(1) + 'px;width:' + Math.max(2, x1 - x0).toFixed(1) + 'px"><span>' + esc(n) + '</span></button>'; });
  for (let y = Math.ceil(Y0 / st) * st; y <= Y1; y += st) a += '<i class="cr-t" style="left:' + crX(y).toFixed(1) + 'px"><b>' + (CR.mode === 'g' ? y : y < 0 ? -y : y === 0 ? '0' : y) + '</b></i>';
  if (CR.mode === 'm') a += '<i class="cr-bcad" style="left:' + crX(0).toFixed(1) + 'px">' + L('î.Hr. | d.Hr.', 'BC | AD') + '</i>';
  ax.style.width = W + 'px'; ax.innerHTML = a;
  // groups
  const its = crItems(), order = CR.mode === 'g' ? ['E', 'P'] : ['E', 'W', 'P', 'U', 'J', 'I', 'R', 'X', 'N'];
  let h = '';
  order.forEach(gk => {
    const lanes = [], els = [];
    its.map((it, i) => i).filter(i => its[i][5] === gk).sort((a, b) => crA(its[a], its[a][2]) - crA(its[b], its[b][2])).forEach(i => { const it = its[i];
      const s = crA(it, it[2]), e = crA(it, it[3]), x0 = crX(s), x1 = Math.max(crX(e), x0 + (it[4] === 'e' ? 0 : 5));
      const lw = Math.min(176, it[0].length * 6.6 + 14), ev = it[4] === 'e';
      const inside = !ev && x1 - x0 > lw;
      const end = (inside ? x1 : x1 + lw) + 6;
      let ln = lanes.findIndex(v => v < x0 - 2); if (ln < 0) { ln = lanes.length; lanes.push(0); } lanes[ln] = end;
      els.push([i, x0, x1, ln, inside, ev]);
    });
    if (!els.length) return;
    h += '<div class="cr-g" style="height:' + (lanes.length * 26 + 26) + 'px;width:' + W + 'px"><div class="cr-gh">' + L(CR_G[gk][0], CR_G[gk][1]) + '</div>' +
      els.map(([i, x0, x1, ln, inside, ev]) => { const it = its[i];
        const cls = 'cr-i t' + it[4] + ' c' + it[6] + (it[5] === 'J' ? ' kJ' : it[5] === 'I' ? ' kI' : it[5] === 'W' ? ' kW' : '') + (it[10] ? ' ca' : '') + (CR.sel === i ? ' on' : '');
        return '<button class="' + cls + '" data-ci="' + i + '" style="top:' + (22 + ln * 26) + 'px;left:' + (ev ? x0 - 6 : x0).toFixed(1) + 'px;' + (ev ? '' : 'width:' + (x1 - x0).toFixed(1) + 'px') + '">' + (ev ? '<i class="cr-dot"></i>' : '') + '<span class="' + (inside ? 'in' : 'out') + '" title="' + esc(it[0]) + '">' + esc(it[0]) + '</span></button>'; }).join('') + '</div>';
  });
  let gl = '';
  for (let y = Math.ceil(Y0 / st) * st; y <= Y1; y += st) gl += '<i class="' + (CR.mode === 'm' && y === 0 ? 'z' : (y / st) % 2 ? 'm' : '') + '" style="left:' + crX(y).toFixed(1) + 'px"></i>';
  box.style.width = W + 'px'; box.innerHTML = '<div class="cr-grid">' + gl + '</div>' + h;
  const legend = $('#crLeg'); if (legend) legend.innerHTML = Object.keys(CR_CAT).map(k => '<span class="cr-lg c' + k + '"><i></i>' + k + ' ' + L(CR_CAT[k][0], CR_CAT[k][1]) + '</span>').join('');
}
function crZoomTo(ns, cx) {
  const sc = $('#crSc'); if (!sc) return;
  ns = Math.max(.15, Math.min(14, ns)); cx = cx == null ? sc.clientWidth / 2 : cx;
  const yr = (sc.scrollLeft + cx - 120) / CR.sc + crRange()[0];
  CR.sc = ns; crRender(); sc.scrollLeft = crX(yr) - cx; crSync();
}
function crSync() {
  const sc = $('#crSc'), ax = $('#crAxIn'); if (!sc || !ax) return;
  const L0 = sc.scrollLeft; ax.style.transform = 'translateX(' + (-L0) + 'px)';
  ax.querySelectorAll('.cr-era').forEach(e => { const sp = e.firstChild; if (!sp) return; const x = e.offsetLeft, w = e.offsetWidth, sw = sp.offsetWidth + 12; const d = Math.max(0, Math.min(L0 - x, w - sw)); sp.style.transform = d ? 'translateX(' + d + 'px)' : ''; });
}
function crGoYear(y, flash) { const sc = $('#crSc'); if (!sc) return; sc.scrollTo({ left: crX(crAdj(y)) - sc.clientWidth / 2, behavior: 'smooth' }); }
function crGoItem(i) {
  CR.sel = i; const it = crItems()[i]; const span = Math.abs(crA(it, it[3]) - crA(it, it[2]));
  if (span * CR.sc > $('#crSc').clientWidth * .8) CR.sc = Math.max(.15, $('#crSc').clientWidth * .6 / Math.max(span, 1));
  crRender(); const sc = $('#crSc'); const el = sc.querySelector('[data-ci="' + i + '"]');
  sc.scrollLeft = crX((crA(it, it[2]) + crA(it, it[3])) / 2) - sc.clientWidth / 2; crSync();
  if (el) { sc.scrollTop = Math.max(0, el.offsetTop + el.parentNode.offsetTop - sc.clientHeight / 2); el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1600); }
}
function crPersonIdx(it) {
  if (!it[1] || !window.PEOPLE) return -1;
  if (it._p != null) return it._p;
  let best = -1, bs = 0;
  PEOPLE.forEach((p, i) => { if (p.e !== it[1]) return; const pr = pRefs(p); let sc = 0;
    it[7].forEach(r => { if (pr.indexOf(r) >= 0) sc = Math.max(sc, 3); else if (pr.some(x => Math.floor(x / 1000) === Math.floor(r / 1000))) sc = Math.max(sc, 2); else if (pr.some(x => Math.floor(x / 1e6) === Math.floor(r / 1e6) && Math.abs((x % 1e6) - (r % 1e6)) < 3000)) sc = Math.max(sc, 1); });
    if (sc > bs || (sc === bs && sc > 0 && p.c > PEOPLE[best].c)) { bs = sc; best = i; } });
  return (it._p = best);
}
function crClose() { const c = $('#chron'); if (c) c.remove(); }
function crVerse(g) { crClose(); if (document.getElementById('study')) stPreview(g, 0); else openVerse(g, true); }
function crCard(i) {
  const it = crItems()[i], l = stLang(), s = crA(it, it[2]), e = crA(it, it[3]);
  const span = it[4] === 'e' ? crYear(s) : crYear(s) + ' – ' + crYear(e);
  const len = it[4] !== 'e' && e > s ? ' · ' + Math.round(e - s) + L(' ani', ' years') : '';
  const pi = crPersonIdx(it);
  let h = '<div class="cr-cd"><div class="cr-when">' + (it[10] ? 'c. ' : '') + span + len + '</div>' +
    '<div class="cr-cat c' + it[6] + '"><i>' + it[6] + '</i>' + L(CR_CAT[it[6]][0], CR_CAT[it[6]][1]) + '</div>' +
    (it[9] ? '<p>' + esc(it[9]) + (it[8].length ? '<sup class="cs" data-cs="' + it[8].join(',') + '">*</sup>' : '') + '</p>' : it[8].length ? '<p><sup class="cs" data-cs="' + it[8].join(',') + '">* ' + L('surse', 'sources') + '</sup></p>' : '') +
    (CR.late && CR.mode === 'm' && it[2] < -1050 && it[5] !== 'W' ? '<p class="cs-note">' + L('Afișat în varianta „Exod târziu” (c. 1260 î.Hr.): datele de dinainte de Saul sunt deplasate/comprimate proporțional — orientativ.', 'Shown with the late Exodus (c. 1260 BC): dates before Saul are shifted proportionally — indicative only.') + '</p>' : '') +
    (it[5] === 'W' ? '<p class="cs-note">' + L('Eveniment din istoria lumii, pus aici ca reper: ce se întâmpla în altă parte în aceeași perioadă. Nu e pomenit în Biblie.', 'World-history reference point; not mentioned in the Bible.') + '</p>' : '') + '<div class="cs-vs">' + it[7].map(n => pRefBtn(n, l)).join('') + '</div>' +
    (pi >= 0 ? '<button class="pp-mini on" data-p="' + pi + '"><span class="pp-av">' + esc(pShort(PEOPLE[pi].n).slice(0, 1)) + '</span><span class="pp-mt"><b>' + esc(pShort(PEOPLE[pi].n)) + '</b><small>' + L('Cardul persoanei', 'Person card') + '</small></span><span class="pp-go">›</span></button>' : '') + '</div>';
  ctxOverlay(it[0], h, ov => ov.querySelector('.ctx-bd').addEventListener('click', ev => {
    const c = ev.target.closest('.cs'); if (c) { ev.stopPropagation(); fnPop(c, '<div class="fn-h">' + L('Surse', 'Sources') + '</div>' + c.dataset.cs.split(',').map(srcCard).join(''), bindUrls); return; }
    const v = ev.target.closest('.cs-v'); if (v) { ev.stopPropagation(); ov.remove(); crVerse(+v.dataset.g); return; }
    const p = ev.target.closest('[data-p]'); if (p) { ev.stopPropagation(); ov.remove(); openPerson(+p.dataset.p); }
  }));
}
function crEra(k) {
  const eras = CR.mode === 'g' ? CHRON.geras : CHRON.eras, [n, per, s, e] = eras[k];
  loadPeople(() => {
    const ps = per ? PEOPLE.map((p, i) => [p, i]).filter(([p]) => p.p === per && p.c).sort((a, b) => b[0].c - a[0].c) : [];
    const h = '<div class="cr-when">' + (CR.mode === 'g' ? crYear(s) + ' – ' + crYear(e) : 'c. ' + crYear(crAdj(s)) + ' – ' + crYear(crAdj(e))) + '</div>' +
      (ps.length ? '<p class="cs-note">' + L('Toate persoanele din această epocă (după STEPBible TIPNR), ordonate după numărul de mențiuni. Cei fără dată proprie apar aici, nu pe axă. Perioada TIPNR poate acoperi mai multe benzi.', 'All people of this era (STEPBible TIPNR), by number of mentions. Those without their own date are listed here, not on the axis.') + ' · ' + ps.length + '</p>' + ps.slice(0, 400).map(([p, i]) => pMiniI(i)).join('') + (ps.length > 400 ? '<p class="cs-note">' + L('… și încă ', '… and ') + (ps.length - 400) + L(' (folosește căutarea).', ' more (use search).') + '</p>' : '') : '<p class="cs-note">' + L('Perioadă fără personaje biblice proprii (între Testamente).', 'Intertestamental period.') + '</p>');
    ctxOverlay(n, h, ov => ov.querySelector('.ctx-bd').addEventListener('click', ev => { const p = ev.target.closest('[data-p]'); if (p) { ev.stopPropagation(); ov.remove(); openPerson(+p.dataset.p); } }));
  });
}
function crSearch(q) {
  const out = $('#crRes'); q = q.trim().toLowerCase(); if (!q) { out.innerHTML = ''; out.classList.add('hidden'); return; }
  const nq = s => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const qq = nq(q), res = [];
  ['m', 'g'].forEach(md => (md === 'g' ? CHRON.gi : CHRON.it).forEach((it, i) => { if (nq(it[0]).includes(qq) || nq(it[1]).includes(qq)) res.push(['c', md, i, it]); }));
  let ps = [];
  if (window.PEOPLE) ps = PEOPLE.map((p, i) => [p, i]).filter(([p]) => p.c && (nq(p.n).includes(qq) || nq(p.e).includes(qq))).sort((a, b) => b[0].c - a[0].c).slice(0, 30);
  out.innerHTML = (res.length ? '<div class="cr-rh">' + L('Pe axa timpului', 'On the timeline') + '</div>' + res.slice(0, 30).map(([, md, i, it]) => '<button data-rc="' + md + ':' + i + '"><b>' + esc(it[0]) + '</b><small>' + (md === 'g' ? L('Geneza 1–11 · ', 'Gen 1–11 · ') : '') + (it[10] ? 'c. ' : '') + (md === 'g' ? it[2] + ' AM' : (it[2] < 0 ? -it[2] + L(' î.Hr.', ' BC') : it[2] + L(' d.Hr.', ' AD'))) + '</small></button>').join('') : '') +
    (ps.length ? '<div class="cr-rh">' + L('Persoane (după epocă)', 'People (by era)') + '</div>' + ps.map(([p, i]) => '<button data-rp="' + i + '"><b>' + esc(pShort(p.n)) + '</b><small>' + esc([p.p, p.r].filter(Boolean).join(' · ')) + '</small></button>').join('') : '') +
    (!res.length && !ps.length ? '<div class="cr-rh">' + L('Nimic găsit', 'Nothing found') + '</div>' : '');
  out.classList.remove('hidden');
}
function openChron(atYear) {
  crClose();
  loadChron(() => loadPeople(() => {
    crLang();
    const el = document.createElement('div'); el.id = 'chron';
    el.innerHTML = '<div class="cr-top"><button class="cr-ib" id="crX" aria-label="' + L('Închide', 'Close') + '">‹</button><b>' + L('Cronologie biblică', 'Biblical chronology') + '</b>' +
      '<div class="cr-q"><input id="crQ" placeholder="' + L('Caută om sau eveniment…', 'Search person or event…') + '" autocomplete="off" enterkeyhint="search"><div class="cr-res hidden" id="crRes"></div></div></div>' +
      '<div class="cr-bar"><div class="seg" id="crMode"><button data-m="m">' + L('Avraam → Apocalipsa', 'Abraham → Revelation') + '</button><button data-m="g">' + L('Geneza 1–11', 'Genesis 1–11') + '</button></div>' +
      '<div class="seg" id="crEx" title="' + L('Data Exodului', 'Exodus date') + '"><button data-x="0">' + L('Exod 1446', 'Exodus 1446') + '</button><button data-x="1">' + L('Exod c.1260', 'Exodus c.1260') + '</button></div>' +
      '</div>' +
      '<div class="cr-ax"><div class="cr-axin" id="crAxIn"></div></div>' +
      '<div class="cr-sc" id="crSc"><div class="cr-in" id="crIn"></div></div><div class="cr-zm"><button id="crZi" aria-label="Zoom +">+</button><button id="crZo" aria-label="Zoom −">−</button></div>' +
      '<div class="cr-ft"><div class="cr-leg" id="crLeg"></div><span>' + L('Ciupește sau +/− pentru zoom · atinge un nume pentru detalii · atinge o epocă pentru toți oamenii ei', 'Pinch or +/− to zoom · tap a name for details · tap an era for all its people') + ' · <button class="cs" id="crSrc">* ' + L('surse și metodă', 'sources & method') + '</button></span></div>';
    document.body.appendChild(el);
    const sc = $('#crSc');
    const segs = () => { el.querySelectorAll('[data-m]').forEach(b => b.classList.toggle('on', b.dataset.m === CR.mode)); el.querySelectorAll('[data-x]').forEach(b => b.classList.toggle('on', (b.dataset.x === '1') === CR.late)); $('#crEx').style.display = CR.mode === 'm' ? '' : 'none'; };
    if (atYear != null && atYear !== 'g') CR.mode = 'm'; if (atYear === 'g') CR.mode = 'g';
    segs(); CR.sel = null; crRender();
    sc.scrollLeft = crX(crAdj(atYear != null && atYear !== 'g' ? atYear : CR.mode === 'g' ? 1000 : -1000)) - sc.clientWidth / 2; crSync();
    sc.addEventListener('scroll', crSync, { passive: true });
    $('#crX').onclick = e => { e.stopPropagation(); crClose(); };
    $('#crZi').onclick = () => crZoomTo(CR.sc * 1.6); $('#crZo').onclick = () => crZoomTo(CR.sc / 1.6);
    el.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { CR.mode = b.dataset.m; CR.sel = null; segs(); crRender(); sc.scrollLeft = crX(CR.mode === 'g' ? 1000 : -1000) - sc.clientWidth / 2; crSync(); hap(0); });
    el.querySelectorAll('[data-x]').forEach(b => b.onclick = () => { const mid = (sc.scrollLeft + sc.clientWidth / 2 - 120) / CR.sc + crRange()[0]; CR.late = b.dataset.x === '1'; segs(); crRender(); sc.scrollLeft = crX(mid) - sc.clientWidth / 2; crSync(); hap(0); });
    $('#crSrc').onclick = e => fnPop(e.currentTarget, '<div class="fn-h">' + L('Metodă', 'Method') + '</div><p class="cs-note">' + L('Datele vin din trei feluri de surse, marcate pe fiecare element: A — confirmate de documente externe (cronici asiriene și babiloniene, inscripții); B — calculate din cifrele textului biblic (vârste, ani de domnie); C — reconstrucții academice (de ex. cronologia împăraților după Thiele); D — aproximări; E — disputate. Înainte de Avraam axa e în „anii lumii”, nu în ani î.Hr. Cronologia judecătorilor și data Exodului sunt nesigure; poți compara cele două variante ale Exodului.', 'A outside evidence; B biblical numbers; C scholarly reconstruction; D approximation; E disputed.') + '</p>' + ['thiele', 'finegan', 'wood', 'hoff', 'bar_ex', 'brit_paul', 'shaw', 'brit_ham', 'brit_rom'].map(srcCard).join('') + '<div class="cs-card"><b>STEPBible — TIPNR</b><span>Tyndale House, Cambridge</span><small>CC BY 4.0 · ' + L('persoanele pe epoci', 'people by era') + '</small><a href="https://github.com/STEPBible/STEPBible-Data" data-url>' + L('Deschide sursa (online)', 'Open source (online)') + ' ↗</a></div>', bindUrls);
    el.addEventListener('click', e => {
      const ci = e.target.closest('[data-ci]'); if (ci) { CR.sel = +ci.dataset.ci; el.querySelectorAll('.cr-i.on').forEach(x => x.classList.remove('on')); ci.classList.add('on'); crCard(+ci.dataset.ci); return; }
      const er = e.target.closest('[data-era]'); if (er) { crEra(+er.dataset.era); return; }
      const rc = e.target.closest('[data-rc]'); if (rc) { const [md, i] = rc.dataset.rc.split(':'); if (CR.mode !== md) { CR.mode = md; segs(); } $('#crRes').classList.add('hidden'); $('#crQ').blur(); crGoItem(+i); return; }
      const rp = e.target.closest('[data-rp]'); if (rp) { const i = +rp.dataset.rp, p = PEOPLE[i]; $('#crRes').classList.add('hidden'); $('#crQ').blur();
        const its = CHRON.it, k = its.findIndex(it => it[1] === p.e && crPersonIdx(it) === i), kg = CHRON.gi.findIndex(it => it[1] === p.e && crPersonIdx(it) === i);
        if (kg >= 0) { CR.mode = 'g'; segs(); crGoItem(kg); } else if (k >= 0) { CR.mode = 'm'; segs(); crGoItem(k); }
        else { const er2 = CHRON.eras.findIndex(x => x[1] === p.p); if (p.p === 'Înainte de potop') { CR.mode = 'g'; segs(); crRender(); } else if (er2 >= 0) { CR.mode = 'm'; segs(); crRender(); crGoYear((CHRON.eras[er2][2] + CHRON.eras[er2][3]) / 2); } openPerson(i); }
        return; }
      if (!e.target.closest('.cr-q')) $('#crRes').classList.add('hidden');
    });
    const q = $('#crQ'); q.addEventListener('input', () => crSearch(q.value)); q.addEventListener('focus', () => q.value && crSearch(q.value));
    // pinch & ctrl+wheel zoom
    let pz = null;
    sc.addEventListener('touchstart', e => { if (e.touches.length === 2) { const [a, b] = e.touches; const r = sc.getBoundingClientRect(); pz = { d: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY), s: CR.sc, cx: (a.clientX + b.clientX) / 2 - r.left }; } }, { passive: true });
    sc.addEventListener('touchmove', e => { if (pz && e.touches.length === 2) { e.preventDefault(); const [a, b] = e.touches; const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); const ns = pz.s * d / pz.d; if (Math.abs(ns - CR.sc) / CR.sc > .04) crZoomTo(ns, pz.cx); } }, { passive: false });
    sc.addEventListener('touchend', e => { if (e.touches.length < 2) pz = null; });
    sc.addEventListener('wheel', e => { if (e.ctrlKey || e.metaKey) { e.preventDefault(); const r = sc.getBoundingClientRect(); crZoomTo(CR.sc * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX - r.left); } }, { passive: false });
    hap(0);
  }));
}
function openPerson(i) {
  if (!window.PEOPLE) { loadPeople(() => openPerson(i)); return; }
  const p = PEOPLE[i]; if (!p) return; const l = S.lang === 'en' ? 'en' : 'ro';
  const x = p.x || {}; const used = [];
  const sup = ids => '<sup class="cs" data-cs="' + ids.join(',') + '">*' + ids.map(id => { let k = used.indexOf(id); if (k < 0) { used.push(id); k = used.length - 1; } return k + 1; }).join(',') + '</sup>';
  let h = '<div class="pp-sub">' + esc([p.r, p.p, p.t].filter(Boolean).join(' · ')) + (p.e && pShort(p.n) !== p.e ? '<small> · ' + esc(p.e) + '</small>' : '') + '</div>';
  h += '<div class="pp-stats">' +
    '<div><b>' + p.c + '</b><small>' + L('mențiuni', 'mentions') + '</small></div>' +
    '<div><b>' + p.b + '</b><small>' + L(p.b === 1 ? 'carte' : 'cărți', p.b === 1 ? 'book' : 'books') + '</small></div>' +
    '<div><b>' + (x.age ? esc(x.age.split(/[:(]/)[0].replace(/^cca\. /, '~').trim()) : '—') + '</b><small>' + L('vârstă / domnie', 'age / reign') + '</small></div>' +
    '<div>' + pRefBtn(p.f, l) + '<small>' + L('prima mențiune', 'first mention') + '</small></div></div>';
  const bio = p.d || pTemplate(p);
  if (bio) h += '<div class="cs-sec cs-B"><div class="cs-cat"><i>B</i>' + L('Pe scurt, după textul biblic', 'In brief, from the biblical text') + '</div><p>' + esc(bio) + '</p></div>';
  if (x.age || x.loc) h += '<div class="pp-facts">' + (x.age ? '<div><span>' + L('Vârstă / domnie', 'Age / reign') + '</span>' + esc(x.age) + '</div>' : '') + (x.loc ? '<div><span>' + L('Unde', 'Where') + '</span>' + esc(x.loc) + '</div>' : '') + '</div>';
  else if (p.pl && p.pl.length) h += '<div class="pp-facts"><div><span>' + L('Locuri', 'Places') + '</span>' + esc(p.pl.join(', ')) + '<small> — ' + L('pomenite des împreună cu el/ea', 'often mentioned together') + '</small></div></div>';
  if (x.r && x.r.length) h += '<div class="pp-sec"><div class="cs-cat">' + L('Repere', 'Milestones') + '</div>' + x.r.map(([t, rs]) => '<div class="pp-ev"><span>' + esc(t) + '</span><span class="cs-vs">' + rs.split(';').map(ctxRef).filter(g => g != null).map(g => '<button class="cs-v" data-g="' + g + '">' + esc(slabel(g, l)) + '</button>').join('') + '</span></div>').join('') + '</div>';
  const fam = [[L('Părinți', 'Parents'), p.fa], [L('Frați / surori', 'Siblings'), p.si], [L('Soț / soție', 'Spouse'), p.sp], [L('Copii', 'Children'), p.ch]].filter(f => f[1] && f[1].length);
  if (fam.length) h += '<div class="pp-sec"><div class="cs-cat">' + L('Familie', 'Family') + '</div>' + fam.map(f => '<div class="pp-fam"><span>' + f[0] + '</span><div>' + pChips(f[1]) + '</div></div>').join('') + '</div>';
  if (p.a && p.a.length) h += '<div class="cs-sec cs-A"><div class="cs-cat"><i>A</i>' + L('Atestat în afara Bibliei', 'Attested outside the Bible') + '</div>' + p.a.map(([t, ids]) => '<p>' + esc(t) + sup(ids) + '</p>').join('') + '</div>';
  h += '<div class="xbar"><button class="xb" data-cx="all">' + L('Toate mențiunile', 'All mentions') + ' <small>' + p.c + '</small></button>' + (used.length ? '<button class="xb" data-cx="src">* ' + L('Surse', 'Sources') + '</button>' : '') + '</div>';
  h += '<p class="cs-note"><sup class="cs" data-cs="__tipnr">*</sup> ' + L('Date despre familie și mențiuni: STEPBible TIPNR (CC BY 4.0). Textul în română e scris pentru aplicație și rezumă relatarea biblică.', 'Family and mention data: STEPBible TIPNR (CC BY 4.0).') + '</p>';
  ctxOverlay(pShort(p.n), h, ov => {
    ov.querySelector('.ctx-card').classList.add('pp-card');
    loadChron(() => { let md = 'm', k = CHRON.it.findIndex(it => it[1] === p.e && crPersonIdx(it) === i); if (k < 0) { md = 'g'; k = CHRON.gi.findIndex(it => it[1] === p.e && crPersonIdx(it) === i); }
      if (k < 0 || !ov.isConnected) return; const b = document.createElement('button'); b.className = 'cr-go'; b.textContent = '🕰 ' + L('Vezi în cronologie', 'Show on timeline'); b.onclick = ev => { ev.stopPropagation(); ov.remove(); CR.mode = md; openChron(md === 'g' ? 'g' : CHRON.it[k][2]); setTimeout(() => crGoItem(k), 60); }; const bd = ov.querySelector('.ctx-bd'); bd.insertBefore(b, bd.firstChild); });
    ov.querySelector('.ctx-bd').addEventListener('click', e => {
      const pc = e.target.closest('[data-p]'); if (pc) { e.stopPropagation(); openPerson(+pc.dataset.p); return; }
      const c = e.target.closest('.cs');
      if (c) { e.stopPropagation(); const html = c.dataset.cs === '__tipnr' ? '<div class="fn-h">' + L('Sursa datelor', 'Data source') + '</div><div class="cs-card"><b>STEPBible — TIPNR (Translators Individualised Proper Names with all References)</b><span>STEPBible.org / Tyndale House, Cambridge</span><small>CC BY 4.0 · ' + L('date structurate', 'structured data') + '</small><a href="https://github.com/STEPBible/STEPBible-Data" data-url>' + L('Deschide sursa (online)', 'Open source (online)') + ' ↗</a></div>' : '<div class="fn-h">' + L('Sursa', 'Source') + '</div>' + c.dataset.cs.split(',').map(srcCard).join(''); fnPop(c, html, bindUrls); return; }
      const v = e.target.closest('.cs-v'); if (v) { e.stopPropagation(); const g = +v.dataset.g; ov.remove(); crVerse(g); return; }
      const xb = e.target.closest('[data-cx]'); if (!xb) return; e.stopPropagation();
      if (xb.dataset.cx === 'src') fnPop(xb, '<div class="fn-h">' + L('Surse', 'Sources') + '</div>' + used.map((id, k) => '<div class="cs-n">' + (k + 1) + '</div>' + srcCard(id)).join(''), bindUrls);
      else { const gs = pRefs(p).map(pDecG).filter(g => g != null); fnPop(xb, '<div class="fn-h">' + L('Mențiuni', 'Mentions') + ' · ' + gs.length + '</div>' + gs.slice(0, 120).map(g => '<button class="fn-r" data-g="' + g + '"><b>' + esc(slabel(g, l)) + '</b><span>' + esc(txt(g, l).slice(0, 80)) + '…</span></button>').join(''), pop => pop.querySelectorAll('.fn-r').forEach(b => b.onclick = () => { const g = +b.dataset.g; ov.remove(); pop.remove(); crVerse(g); })); }
    });
  });
}
function stRenderBible() {
  const r = ref(STUDY.g), l = stLang(), vs = BIB[l][r.b][r.c];
  $('#stBook').textContent = BK[l][r.b] + ' ' + (r.c + 1);
  $('#stVerses').innerHTML = ctxRow(r.b, r.c) + vs.map((t, i) => {
    const g = G(r.b, r.c, i);
    return '<div class="sv" data-g="' + g + '"><sup>' + (i + 1) + '</sup><span class="t">' + esc(txt(g, l)) + (S.lang === 'both' ? '<em>' + esc(txt(g, 'en')) + '</em>' : '') + '</span></div>';
  }).join('') + '<p class="st-hint">' + L('Atinge un verset pentru opțiuni · ține apăsat și trage în foaie', 'Tap a verse for options · long-press and drag onto the sheet') + '</p>';
  if (STUDY.hist && STUDY.hist.length) { const bg = STUDY.hist[STUDY.hist.length - 1]; $('#stVerses').insertAdjacentHTML('afterbegin', '<button class="st-backbar" data-back="1">' + I.back + '<span>' + L('Înapoi la ', 'Back to ') + esc(label(bg, l)) + '</span></button>'); }
  const box = $('#stVerses'); box.scrollTop = 0;
  const g0 = STUDY.g; loadPeople(() => { if (STUDY.g !== g0) return; const row = box.querySelector('.st-ctx'); const ps = peopleInChapter(r.b, r.c); if (row && ps.length && !row.querySelector('[data-ppl]')) row.insertAdjacentHTML('beforeend', '<button class="ctx-chip ghost" data-ppl="1">👤 ' + L('Persoane', 'People') + ' <small>' + ps.length + '</small></button>'); });
  loadChron(() => { if (STUDY.g !== g0) return; const row = box.querySelector('.st-ctx'); if (row && !row.querySelector('[data-chron]')) row.insertAdjacentHTML('beforeend', '<button class="ctx-chip ghost" data-chron="1">🕰 ' + L('Cronologie', 'Timeline') + '</button>'); });
  loadGeo(() => { if (STUDY.g !== g0) return; const row = box.querySelector('.st-ctx'); const ps = placesInChapter(r.b, r.c); if (row && ps.length && !row.querySelector('[data-pmap]')) row.insertAdjacentHTML('beforeend', '<button class="ctx-chip ghost" data-pmap="1">📍 ' + L('Locuri și hartă', 'Places & map') + ' <small>' + ps.length + '</small></button>'); });
  if (r.v > 0) { const t = box.querySelector('[data-g="' + STUDY.g + '"]'); if (t) setTimeout(() => { box.scrollTop = t.offsetTop - (STUDY.hist && STUDY.hist.length ? 120 : 60); t.classList.add('flash'); }, 30); }
  box.onclick = e => {
    if (STUDY.dragJustEnded) return;
    if (e.target.closest('[data-back]')) { stGoBack(); return; }
    const cx = e.target.closest('[data-ctx]'); if (cx) { openCtx(cx.dataset.ctx); return; }
    if (e.target.closest('[data-ctxs]')) { const rr = ref(STUDY.g); openCtxSearch(rr.b, rr.c); return; }
    const pc = e.target.closest('[data-ppl]'); if (pc) { const rr = ref(STUDY.g); const ps = peopleInChapter(rr.b, rr.c); fnPop(pc, '<div class="fn-h">' + L('Persoane în ', 'People in ') + esc(BK[l][rr.b] + ' ' + (rr.c + 1)) + ' · ' + ps.length + '</div>' + ps.map(([i, n]) => pMiniI(i, n + L(' aici', ' here'))).join(''), pop => pop.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { pop.remove(); openPerson(+b.dataset.p); })); return; }
    if (e.target.closest('[data-chron]')) { const rr = ref(STUDY.g); openChron(rr.b === 0 && rr.c < 11 ? 'g' : BOOKY[rr.b]); return; }
    if (e.target.closest('[data-pmap]')) { const rr = ref(STUDY.g); openMap(placesInChapter(rr.b, rr.c), L('Locuri · ', 'Places · ') + BK[l][rr.b] + ' ' + (rr.c + 1), [rr.b, rr.c]); return; }
    const pm = e.target.closest('.pp-mini[data-p]'); if (pm) { e.stopPropagation(); openPerson(+pm.dataset.p); return; }
    const ac = e.target.closest('[data-va]'); if (ac) {
      e.stopPropagation(); const g = +ac.dataset.g, k = ac.dataset.va, bar = ac.closest('.sva'); hap(0);
      if (k === 'w') stWords(g, bar); else if (k === 'x') stXrefs(g, bar); else if (k === 'p') stPeople(g, bar); else if (k === 'm') { const rv = ref(g); openMap(placesInVerse(g), L('Locuri · ', 'Places · ') + label(g, l), [rv.b, rv.c, pEncG(g)]); }
      else { stInsert({ type: 'v', gs: STUDY.sel.includes(g) && STUDY.sel.length > 1 ? STUDY.sel.slice() : [g] }); STUDY.sel = []; stMarkSel(); stShowBar(null); }
      return;
    }
    const xi = e.target.closest('.sxr'); if (xi) { stPreview(+xi.dataset.g, +xi.dataset.sp); return; }
    const sr = e.target.closest('.sref'); if (sr) { e.stopPropagation(); stStrongPv(sr.dataset.s); return; }
    const wr = e.target.closest('.swr'); if (wr) { stStrongPv(wr.dataset.s, +wr.dataset.g); return; }
    const v = e.target.closest('.sv'); if (v) { const g = +v.dataset.g; const i = STUDY.sel.indexOf(g); if (i >= 0) STUDY.sel.splice(i, 1); else STUDY.sel.push(g); STUDY.sel.sort((a, b) => a - b); hap(0); stMarkSel(); stShowBar(i >= 0 ? null : v); }
  };
  S.studyG = STUDY.g; persist(); stMarkSel();
}
function stShowBar(row) {
  const box = $('#stVerses'); box.querySelectorAll('.sva,.sws,.sxs').forEach(x => x.remove());
  if (!row) return; const g = +row.dataset.g, nx = xrefs(g).length;
  const bar = document.createElement('div'); bar.className = 'sva';
  bar.innerHTML = '<button data-va="w" data-g="' + g + '"><b>' + (isNT(g) ? 'Αα' : 'אב') + '</b>' + L('Original', 'Original') + '</button>' +
    (nx ? '<button data-va="x" data-g="' + g + '">' + I.link + L('Trimiteri', 'Cross-refs') + ' <small>' + nx + '</small></button>' : '') +
    (window.GEO && placesInVerse(g).length ? '<button data-va="m" data-g="' + g + '"><b>📍</b>' + L('Hartă', 'Map') + ' <small>' + placesInVerse(g).length + '</small></button>' : '') +
    (window.PEOPLE && peopleInVerse(g).length ? '<button data-va="p" data-g="' + g + '"><b>👤</b>' + L('Persoane', 'People') + ' <small>' + peopleInVerse(g).length + '</small></button>' : '') +
    '<button data-va="a" data-g="' + g + '" class="pri">' + I.plus + L('În foaie', 'To sheet') + '</button>';
  row.after(bar);
  if (!window.PEOPLE) loadPeople(() => { if (bar.isConnected) stShowBar(row); });
  else if (!window.GEO) loadGeo(() => { if (bar.isConnected) stShowBar(row); });
}
function stNavTo(g, from) {
  STUDY.hist = STUDY.hist || []; STUDY.hist.push(from != null ? from : STUDY.g);
  STUDY.g = g; STUDY.sel = []; hap(1); stRenderBible(); stMarkSel();
}
function stGoBack() {
  if (!STUDY.hist || !STUDY.hist.length) return false;
  const g = STUDY.hist.pop(); STUDY.g = g; STUDY.sel = []; hap(0); stRenderBible(); return true;
}
function sLink(t, ce) { return esc(t).replace(/\b([HG])0*(\d{1,4})[A-Z]?\b/g, '<span class="sref" data-s="$1$2"' + (ce ? ' contenteditable="false"' : '') + '>$1$2</span>'); }
function stPreview(g0, sp, fromFind, gsIn) {
  stClosePv(); const l = stLang(); const gs = gsIn || []; if (!gsIn) for (let k = 0; k <= (sp || 0); k++) gs.push(g0 + k);
  const pv = document.createElement('div'); pv.id = 'stPv'; pv.className = 'st-pv';
  pv.innerHTML = '<div class="st-pvc"><div class="st-pvh"><b>' + esc(stRangeLabel(gs, l)) + '</b><button class="st-ib" data-pv="x">' + I.close + '</button></div><div class="st-pvt">' +
    gs.map(g => (gs.length > 1 ? '<sup>' + (ref(g).v + 1) + '</sup>' : '') + esc(txt(g, l)) + (S.lang === 'both' ? '<em>' + esc(txt(g, 'en')) + '</em>' : '')).join(' ') +
    '</div><div class="st-pvw hidden"></div><div class="st-pvb"><button data-pv="copy">' + I.copy + L('Copiază', 'Copy') + '</button><button data-pv="orig"><b>Αα</b>' + L('Original', 'Original') + '</button><button data-pv="open">' + I.book + L('Deschide', 'Open') + '</button>' + (gsIn ? '' : '<button data-pv="add" class="pri">' + I.plus + L('În foaie', 'To sheet') + '</button>') + '</div></div>';
  $('#study').appendChild(pv); hap(0);
  const from = (document.querySelector('#stVerses .sv.sel:last-of-type') || {}).dataset;
  pv.onclick = e => {
    const sr = e.target.closest('.sref'); if (sr) { stStrongPv(sr.dataset.s, +sr.dataset.g); return; }
    const b = e.target.closest('[data-pv]');
    if (!b) { if (!e.target.closest('.st-pvc')) stClosePv(); return; }
    const k = b.dataset.pv;
    if (k === 'orig') {
      if (!window.LEX_H) { loadLex(() => b.click()); return; }
      const box = pv.querySelector('.st-pvw'); const seen = {};
      box.innerHTML = gs.map(g => origWords(g).filter(w => !seen[w.s] && (seen[w.s] = 1)).map(w => { const en = lexEntry(w.s) || ['', '']; return '<span class="sref wchip" data-s="' + w.s + '" data-g="' + g + '"><b class="' + (w.s[0] === 'H' ? 'heb' : 'grk') + '">' + esc(en[0]) + '</b> ' + esc(w.en) + '</span>'; }).join('')).join('') || '<p class="st-hint">' + L('Fără cuvinte originale pentru acest verset.', 'No original words for this verse.') + '</p>';
      box.classList.toggle('hidden'); hap(0); return;
    }
    stClosePv();
    if (k === 'add') stInsert({ type: 'v', gs });
    else if (k === 'copy') stCopy('„' + gs.map(g => txt(g, l)).join(' ') + '”\n— ' + stRangeLabel(gs, l));
    else if (k === 'open') { if (fromFind) stToggleFind(false); if (stView() === 'notes') stSetPane('bible', true); stNavTo(gs[0], gsIn ? STUDY.g : STUDY.xFrom); }
  };
}
function clipCopy(t) { // clipboard with a fallback when the browser refuses (permissions, http, old WebView)
  const legacy = () => { try { const ta = document.createElement('textarea'); ta.value = t; ta.style.cssText = 'position:fixed;opacity:0;top:0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); } catch (e) {} };
  try { const pr = navigator.clipboard && navigator.clipboard.writeText(t); if (pr && pr.catch) pr.catch(legacy); else if (!pr) legacy(); } catch (e) { legacy(); }
  return { catch() {}, then(f) { f && f(); return this; } };
}
function stCopy(t) { try { if (A && A.copyText) A.copyText(t); else clipCopy(t); } catch (e) {} hap(0); toast(T('Copiat')); }
function stStrongPv(code, g) {
  if (!window.LEX_H) { loadLex(() => stStrongPv(code, g)); return; }
  const e = lexEntry(code); if (!e) return; stClosePv();
  const heb = code[0] === 'H', def = (meaning(code, e) || '').trim();
  const pv = document.createElement('div'); pv.id = 'stPv'; pv.className = 'st-pv';
  pv.innerHTML = '<div class="st-pvc"><div class="st-pvh"><b>' + (heb ? L('Ebraică', 'Hebrew') : L('Greacă', 'Greek')) + ' · ' + code + '</b><button class="st-ib" data-pv="x">' + I.close + '</button></div>' +
    '<div class="st-lex"><span class="' + (heb ? 'heb' : 'grk') + '">' + esc(e[0]) + '</span><i>' + esc(e[1]) + (e[2] ? ' · ' + esc(e[2]) : '') + '</i></div>' +
    '<div class="st-pvd">' + sLink(def || '—') + (e[4] ? '<div class="st-kjv"><small>KJV</small> ' + sLink(e[4]) + '</div>' : '') + '</div>' +
    placeCard(code) + personMini(code, g) + '<div class="st-ext hidden"></div><div class="st-pvb"><button data-pv="copy">' + I.copy + L('Copiază', 'Copy') + '</button><button data-pv="ext">' + I.book + L('Pe larg', 'In depth') + '</button><button data-pv="more">' + I.search + L('Apariții', 'Occurrences') + '</button><button data-pv="add" class="pri">' + I.plus + L('În foaie', 'To sheet') + '</button></div></div>';
  $('#study').appendChild(pv); hap(0); fillPersonMini(pv);
  pv.onclick = ev => {
    const pm = ev.target.closest('.pp-mini[data-p]'); if (pm) { openPerson(+pm.dataset.p); return; }
    const au = ev.target.closest('a[data-url]'); if (au) { ev.preventDefault(); openUrl(au.href); return; }
    const sr = ev.target.closest('.sref'); if (sr) { stStrongPv(sr.dataset.s); return; }
    const vr = ev.target.closest('.vref'); if (vr) { stPreview(+vr.dataset.g, 0); return; }
    const b = ev.target.closest('[data-pv]');
    if (b && b.dataset.pv === 'ext') {
      const box = pv.querySelector('.st-ext');
      if (!box.classList.contains('hidden')) { box.classList.add('hidden'); b.classList.remove('on'); return; }
      box.innerHTML = '<p class="st-hint">' + L('Se încarcă…', 'Loading…') + '</p>'; box.classList.remove('hidden'); b.classList.add('on'); hap(0);
      loadExt(() => { const oc = occurrences(code); box.innerHTML = '<div class="xocc">' + L('Apare în ', 'Appears in ') + oc.gs.length + L(' versete (KJV)', ' verses (KJV)') + '</div><div class="xbody"></div>'; const xb = box.querySelector('.xbody'); xb.innerHTML = extHtml(code); bindExt(xb, code, 'study'); box.scrollIntoView({ block: 'nearest' }); });
      return;
    }
    if (!b) { if (!ev.target.closest('.st-pvc')) stClosePv(); return; }
    const k = b.dataset.pv; stClosePv();
    if (k === 'add') stInsert({ type: 'w', code, g });
    else if (k === 'more') openWord(code, false, g);
    else if (k === 'copy') stCopy(e[0] + ' (' + e[1] + ', ' + code + ') — ' + def + (e[4] ? '\nKJV: ' + e[4] : ''));
  };
}
function stAddFloat(g0) {
  const st = $('#study'); const n = st.querySelectorAll('.st-float').length;
  const W = { g: g0 != null ? g0 : STUDY.g, lang: stLang() === 'ro' ? 'en' : 'ro' };
  const f = document.createElement('div'); f.className = 'st-float';
  const sw = st.clientWidth, sh = st.clientHeight, w = Math.min(420, sw - 24), h = Math.min(480, sh * .6);
  f.style.width = w + 'px'; f.style.height = h + 'px';
  f.style.left = Math.max(8, Math.min(sw - w - 8, sw / 2 - w / 2 + n * 26)) + 'px'; f.style.top = Math.max(60, Math.min(sh - h - 8, 90 + n * 26)) + 'px';
  f.innerHTML = '<div class="stf-h"><span class="stf-grip">⠿</span><button class="stf-b" data-f="prev">‹</button><button class="stf-t" data-f="book"></button><button class="stf-b" data-f="next">›</button><button class="stf-l" data-f="lang"></button><button class="stf-b" data-f="x">' + I.close + '</button></div><div class="stf-v"></div><div class="stf-rz"></div>';
  st.appendChild(f); hap(1);
  const render = () => {
    const r = ref(W.g), vs = BIB[W.lang][r.b][r.c];
    f.querySelector('.stf-t').textContent = BK[W.lang][r.b] + ' ' + (r.c + 1);
    f.querySelector('.stf-l').textContent = W.lang === 'ro' ? 'RO' : 'EN';
    const box = f.querySelector('.stf-v');
    box.innerHTML = vs.map((t, i) => { const g = G(r.b, r.c, i); return '<div class="sv" data-g="' + g + '"><sup>' + (i + 1) + '</sup><span class="t">' + esc(txt(g, W.lang)) + '</span></div>'; }).join('');
    box.scrollTop = 0; if (r.v > 0) { const t = box.querySelector('[data-g="' + W.g + '"]'); if (t) setTimeout(() => { box.scrollTop = t.offsetTop - 40; t.classList.add('flash'); }, 30); }
  };
  const front = () => { st.querySelectorAll('.st-float').forEach(x => x.style.zIndex = 8); f.style.zIndex = 9; };
  f.addEventListener('mousedown', front); f.addEventListener('touchstart', front, { passive: true });
  f.onclick = e => {
    if (STUDY.dragJustEnded) return;
    const b = e.target.closest('[data-f]');
    if (b) {
      const k = b.dataset.f, r = ref(W.g);
      if (k === 'x') { f.remove(); hap(0); return; }
      if (k === 'lang') { W.lang = W.lang === 'ro' ? 'en' : 'ro'; render(); return; }
      if (k === 'book') { stPickBook(g => { W.g = g; render(); }, W.g); return; }
      let bb = r.b, c = r.c + (k === 'next' ? 1 : -1);
      if (c < 0) { if (!bb) return; bb--; c = VC[bb].length - 1; } else if (c >= VC[bb].length) { if (bb === NB - 1) return; bb++; c = 0; }
      W.g = G(bb, c, 0); hap(0); render(); return;
    }
    const v = e.target.closest('.sv'); if (v) stPreview(+v.dataset.g, 0);
  };
  // move window by its header, resize from the corner (touch + mouse)
  const drag = (el, onMove) => {
    let sx, sy, ox, oy, on = false;
    const start = (x, y) => { on = true; sx = x; sy = y; ox = f.offsetLeft; oy = f.offsetTop; ow = f.offsetWidth; oh = f.offsetHeight; front(); };
    let ow, oh;
    const mv = (x, y) => { if (!on) return; onMove(x - sx, y - sy, ox, oy, ow, oh); };
    el.addEventListener('touchstart', e => { if (e.target.closest('button')) return; const t = e.touches[0]; start(t.clientX, t.clientY); }, { passive: true });
    el.addEventListener('touchmove', e => { if (!on) return; e.preventDefault(); const t = e.touches[0]; mv(t.clientX, t.clientY); }, { passive: false });
    el.addEventListener('touchend', () => on = false);
    el.addEventListener('mousedown', e => { if (e.target.closest('button')) return; e.preventDefault(); start(e.clientX, e.clientY); const mm = ev => mv(ev.clientX, ev.clientY), mu = () => { on = false; document.removeEventListener('mousemove', mm); document.removeEventListener('mouseup', mu); }; document.addEventListener('mousemove', mm); document.addEventListener('mouseup', mu); });
  };
  drag(f.querySelector('.stf-h'), (dx, dy, ox, oy) => { f.style.left = Math.max(-f.offsetWidth + 80, Math.min(st.clientWidth - 80, ox + dx)) + 'px'; f.style.top = Math.max(0, Math.min(st.clientHeight - 44, oy + dy)) + 'px'; });
  drag(f.querySelector('.stf-rz'), (dx, dy, ox, oy, ow, oh) => { f.style.width = Math.max(240, ow + dx) + 'px'; f.style.height = Math.max(180, oh + dy) + 'px'; });
  render();
}
function stToggleFind(on) {
  const box = $('#stFindBox'); if (!box) return; const show = on == null ? box.classList.contains('hidden') : on;
  box.classList.toggle('hidden', !show); $('#stVerses').classList.toggle('hidden', show);
  if (show) { if (stView() === 'notes') stSetPane('bible', true); setTimeout(() => $('#stQ').focus(), 50); } else $('#stQ').blur();
}
function stRunFind() {
  const s = $('#stQ').value.trim(), res = $('#stFres'), l = stLang();
  if (s.length < 2) { res.innerHTML = ''; return; }
  let out = '';
  const sm = s.match(/^([HhGg])\s*0*(\d{1,4})$/);
  if (sm) { const code = sm[1].toUpperCase() + (+sm[2]); if (!window.LEX_H) { loadLex(stRunFind); return; } const e = lexEntry(code); if (e) out += '<div class="sec">Strong</div><div class="sxl"><span class="sref big" data-s="' + code + '">' + code + ' · ' + esc(e[0]) + ' · ' + esc(e[1]) + '</span></div>'; }
  const nq = norm(s); const bm = []; for (let b = 0; b < NB; b++) if (norm(BK.ro[b]).startsWith(nq) || norm(BK.en[b]).startsWith(nq)) bm.push(b);
  if (bm.length) out += '<div class="sec">' + L('Cărți', 'Books') + '</div><div class="sxl">' + bm.slice(0, 12).map(b => '<button class="sxr" data-fb="' + b + '">' + esc(BK[l][b]) + '</button>').join('') + '</div>';
  const rg = parseRef(s); if (rg != null) out += '<div class="sec">' + L('Referință', 'Reference') + '</div>' + stFRow(rg, l, '');
  const arr = normAll(l), hits = []; if (nq.length >= 2) for (let i = 0; i < TOTAL && hits.length < 150; i++) if (arr[i].includes(nq)) hits.push(i);
  if (!sm) out += '<div class="sec">' + (hits.length >= 150 ? '150+' : hits.length) + L(' rezultate', ' results') + '</div>' + (hits.length ? hits.map(g => stFRow(g, l, nq)).join('') : '<p class="st-hint">' + L('Niciun rezultat.', 'No results.') + '</p>');
  out += '<p class="st-hint">' + L('Atinge = vezi versetul · ține apăsat = mergi la el · trage = în foaie', 'Tap = preview · hold = go there · drag = to sheet') + '</p>';
  res.innerHTML = out; res.scrollTop = 0;
}
function stFRow(g, l, nq) {
  const raw = txt(g, l); let t = esc(raw.length > 160 ? raw.slice(0, 160) + '…' : raw);
  if (nq && nq.length >= 2) { const n = norm(raw), p = n.indexOf(nq); if (p >= 0 && p < 160) t = esc(raw.slice(0, p)) + '<mark>' + esc(raw.slice(p, p + nq.length)) + '</mark>' + esc(raw.slice(p + nq.length, 160)) + (raw.length > 160 ? '…' : ''); }
  return '<div class="sxr srow" data-g="' + g + '" data-sp="0"><b>' + esc(slabel(g, l)) + '</b><p>' + t + '</p></div>';
}
function stClosePv() { const p = $('#stPv'); if (p) { p.remove(); return true; } return false; }
function stMarkSel() {
  const box = $('#stVerses'); if (!box) return;
  box.querySelectorAll('.sv').forEach(v => v.classList.toggle('sel', STUDY.sel.includes(+v.dataset.g)));
  const n = STUDY.sel.length; $('#stSelBar').classList.toggle('hidden', n < 2);
  $('#stSelN').textContent = n === 1 ? L('1 verset', '1 verse') : n + L(' versete', ' verses');
}
function stChapter(d) {
  const r = ref(STUDY.g); let b = r.b, c = r.c + d;
  if (c < 0) { if (b === 0) return; b--; c = VC[b].length - 1; } else if (c >= VC[b].length) { if (b === NB - 1) return; b++; c = 0; }
  STUDY.g = G(b, c, 0); STUDY.sel = []; hap(0); stRenderBible();
}
function stPickBook(onPick, cur) {
  const l = stLang(), cb = ref(cur != null ? cur : STUDY.g).b; let h = '<div class="sec">' + L('Vechiul Testament', 'Old Testament') + '</div><div class="grid">';
  for (let b = 0; b < NB; b++) { if (b === 39) h += '</div><div class="sec">' + L('Noul Testament', 'New Testament') + '</div><div class="grid">'; h += '<button data-b="' + b + '" class="' + (b === cb ? 'cur' : '') + '">' + esc(BK[l][b]) + '</button>'; }
  h += '</div>';
  openSheet(L('Alege cartea', 'Choose book'), h, body => body.querySelectorAll('[data-b]').forEach(x => x.onclick = () => {
    const b = +x.dataset.b; let hh = '<div class="grid ch">'; for (let c = 0; c < VC[b].length; c++) hh += '<button data-c="' + c + '">' + (c + 1) + '</button>'; hh += '</div>';
    openSheet(BK[l][b], hh, bd => bd.querySelectorAll('[data-c]').forEach(y => y.onclick = () => { closeSheet(); if (typeof onPick === 'function') { onPick(G(b, +y.dataset.c, 0)); return; } STUDY.g = G(b, +y.dataset.c, 0); STUDY.sel = []; stRenderBible(); }), true);
  }));
}
function stXrefs(g, row) {
  const open = row.nextElementSibling && row.nextElementSibling.classList.contains('sxs');
  $('#stVerses').querySelectorAll('.sws,.sxs').forEach(x => x.remove());
  if (open) return;
  const l = stLang(), xs = xrefs(g).slice(0, 40);
  const box = document.createElement('div'); box.className = 'sws sxs';
  STUDY.xFrom = g;
  box.innerHTML = '<div class="sws-h">' + L('Atinge = vezi versetul · ține apăsat = mergi la el · trage = în foaie', 'Tap = preview · hold = go there · drag = to sheet') + '</div><div class="sxl">' + xs.map(x => '<button class="sxr" data-g="' + x.g + '" data-sp="' + (x.span || 0) + '">' + esc(xlabel(x, l)) + '</button>').join('') + '</div>';
  row.after(box);
}
function stPeople(g, row) {
  const open = row.nextElementSibling && row.nextElementSibling.classList.contains('spp');
  $('#stVerses').querySelectorAll('.sws,.sxs').forEach(x => x.remove());
  if (open) return;
  const box = document.createElement('div'); box.className = 'sws spp';
  box.innerHTML = '<div class="sws-h">' + L('Persoane numite în acest verset · atinge pentru card', 'People named in this verse · tap for the card') + '</div>' + peopleInVerse(g).map(i => pMiniI(i)).join('');
  row.after(box);
}
function stWords(g, row) {
  if (!window.LEX_H) { loadLex(() => stWords(g, row)); return; }
  const open = row.nextElementSibling && row.nextElementSibling.classList.contains('sws');
  $('#stVerses').querySelectorAll('.sws,.sxs').forEach(x => x.remove());
  if (open) return;
  const seen = {}; const ws = origWords(g).filter(w => !seen[w.s] && (seen[w.s] = 1));
  const box = document.createElement('div'); box.className = 'sws';
  box.innerHTML = '<div class="sws-h">' + L('Atinge = explicația completă · trage = în foaie', 'Tap = full entry · drag = to sheet') + '</div>' + ws.map(w => {
    const e = lexEntry(w.s) || ['', '', '', '', '']; const def = (meaning(w.s, e) || '').replace(/\s+/g, ' ');
    return '<div class="swr" data-s="' + w.s + '" data-g="' + g + '"><b class="' + (w.s[0] === 'H' ? 'heb' : 'grk') + '">' + esc(e[0]) + '</b> <i>' + esc(e[1]) + '</i> <span class="swe">' + esc(w.en) + '</span><p>' + sLink(def.slice(0, 150)) + (def.length > 150 ? '…' : '') + '</p></div>';
  }).join('');
  row.after(box);
}

/* ---------- blocks ---------- */
function stRangeLabel(gs, l) {
  const a = ref(gs[0]), z = ref(gs[gs.length - 1]);
  let s = BK[l][a.b] + ' ' + (a.c + 1) + ':' + (a.v + 1);
  if (gs.length > 1) { const cont = gs.every((g, i) => i === 0 || g === gs[i - 1] + 1); s += cont ? (z.b === a.b && z.c === a.c ? '-' + (z.v + 1) : '–' + (z.c + 1) + ':' + (z.v + 1)) : gs.slice(1).map(g => { const r = ref(g); return r.c === a.c ? ',' + (r.v + 1) : '; ' + (r.c + 1) + ':' + (r.v + 1); }).join(''); }
  return s;
}
function stBlockHtml(p) {
  const l = stLang();
  if (p.type === 'v') {
    const many = p.gs.length > 1;
    const body = p.gs.map(g => (many ? '<sup>' + (ref(g).v + 1) + '</sup>' : '') + esc(txt(g, l))).join(' ');
    return '<blockquote class="nv" data-g="' + p.gs.join(',') + '"><span class="h" contenteditable="false">⠿</span><span class="nr" contenteditable="false">' + esc(stRangeLabel(p.gs, l)) + '</span> ' + body + '</blockquote>';
  }
  if (p.type === 'w') {
    const e = lexEntry(p.code) || ['', p.code, '', '', '']; const def = (meaning(p.code, e) || '').replace(/\s+/g, ' ');
    return '<div class="nx" data-s="' + p.code + '"><span class="h" contenteditable="false">⠿</span><span class="nr" contenteditable="false">' + (p.code[0] === 'H' ? L('Ebraică', 'Hebrew') : L('Greacă', 'Greek')) + ' · ' + p.code + (p.g != null ? ' · ' + esc(label(p.g, l)) : '') + '</span><b class="' + (p.code[0] === 'H' ? 'heb' : 'grk') + '">' + esc(e[0]) + '</b> <i>' + esc(e[1]) + (e[2] ? ' (' + esc(e[2]) + ')' : '') + '</i> — ' + sLink(def, true) + '</div>';
  }
  return '';
}
function stTopBlock(node) {
  const doc = $('#stDoc'); if (!node) return null;
  while (node && node.parentNode !== doc) node = node.parentNode;
  return node && node.parentNode === doc ? node : null;
}
function stInsert(p, beforeEl) {
  const doc = $('#stDoc'); if (!doc) return;
  if (p.type === 'w' && !window.LEX_H) { loadLex(() => stInsert(p, beforeEl)); return; }
  const tmp = document.createElement('div'); tmp.innerHTML = stBlockHtml(p); const blk = tmp.firstChild;
  if (beforeEl !== undefined) {
    if (beforeEl) doc.insertBefore(blk, beforeEl); else doc.appendChild(blk);
  } else {
    // replace a template placeholder right after the caret / first empty placeholder, else insert after caret block, else at end
    let at = STUDY.range && doc.contains(STUDY.range.startContainer) ? stTopBlock(STUDY.range.startContainer) : null;
    if (at && at.classList && at.classList.contains('ph')) { doc.replaceChild(blk, at); }
    else if (at) { at.after(blk); }
    else { const ph = doc.querySelector('p.ph'); if (ph && !STUDY.range) doc.replaceChild(blk, ph); else doc.appendChild(blk); }
  }
  if (!blk.nextElementSibling) { const pp = document.createElement('p'); pp.innerHTML = '<br>'; blk.after(pp); }
  blk.classList.add('flash'); setTimeout(() => blk.classList.remove('flash'), 900);
  hap(1); stSave();
  if (stView() === 'bible') toast(L('Adăugat în foaie ✓', 'Added to sheet ✓'));
  else { const pr = $('#stPaper'); const y = blk.offsetTop - 80; if (y < pr.scrollTop || y > pr.scrollTop + pr.clientHeight - 120) pr.scrollTo({ top: y, behavior: 'smooth' }); }
  const sel = getSelection(); try { const rg = document.createRange(); rg.selectNodeContents(blk.nextElementSibling); rg.collapse(true); STUDY.range = rg; } catch (e) {}
}

/* ---------- document / toolbar ---------- */
function stBindDoc() {
  const doc = $('#stDoc');
  try { document.execCommand('styleWithCSS', false, true); } catch (e) {}
  doc.addEventListener('input', () => stSave());
  document.addEventListener('selectionchange', stTrackSel);
  doc.addEventListener('focusin', e => {
    const ph = e.target.closest && e.target.closest('.ph');
    if (ph) stClearPh(ph);
  });
  doc.addEventListener('click', e => {
    const sr = e.target.closest('.sref'); if (sr) { e.preventDefault(); stStrongPv(sr.dataset.s); return; }
    const nr = e.target.closest('.nr, .nx > b'); if (nr) {
      const blk = nr.parentNode;
      if (blk.classList.contains('nx')) { stStrongPv(blk.dataset.s); return; }
      if (blk.classList.contains('nv')) { const gs = blk.dataset.g.split(',').map(Number); stPreview(gs[0], 0, false, gs); return; }
    }
    const ph = e.target.closest('.ph'); if (ph) stClearPh(ph);
  });
  const tools = $('#stTools');
  tools.addEventListener('mousedown', e => e.preventDefault());
  tools.addEventListener('touchstart', e => { if (e.target.closest('[data-tb]')) e.preventDefault(); }, { passive: false });
  tools.querySelectorAll('[data-tb]').forEach(b => {
    const run = () => stTool(b.dataset.tb, b);
    b.addEventListener('touchend', e => { e.preventDefault(); run(); });
    b.addEventListener('click', e => { if (!('ontouchstart' in window)) run(); });
  });
}
function stClearPh(ph) {
  ph.classList.remove('ph'); ph.innerHTML = '<br>';
  try { const r = document.createRange(); r.setStart(ph, 0); r.collapse(true); const s = getSelection(); s.removeAllRanges(); s.addRange(r); } catch (e) {}
}
function stTrackSel() {
  const doc = $('#stDoc'); if (!doc) return; const s = getSelection();
  if (s.rangeCount && doc.contains(s.getRangeAt(0).startContainer)) STUDY.range = s.getRangeAt(0).cloneRange();
}
function stRestoreSel() {
  const doc = $('#stDoc'); if (!STUDY.range || !doc.contains(STUDY.range.startContainer)) return false;
  const s = getSelection(); s.removeAllRanges(); s.addRange(STUDY.range); return true;
}
function stTool(k, btn) {
  const pop = $('#stPop');
  if (k === 'hl' || k === 'fg') {
    if (!pop.classList.contains('hidden') && pop.dataset.k === k) { pop.classList.add('hidden'); return; }
    const list = k === 'hl' ? [['', L('Fără', 'None')]].concat(ST_HL) : ST_FG;
    pop.dataset.k = k;
    pop.innerHTML = list.map(([c, n]) => '<button data-c="' + c + '" title="' + esc(n) + '" class="' + (c ? '' : 'none') + '" style="' + (c ? (k === 'hl' ? 'background:' + c + '99' : 'color:' + c) : '') + '">' + (k === 'fg' ? 'A' : c ? '' : '∅') + '</button>').join('') +
      (k === 'hl' ? '<button data-ul="1" class="ulb" title="' + L('Subliniere colorată', 'Colored underline') + '"><u>U</u></button>' : '');
    const r = btn.getBoundingClientRect(), pr = $('#study').getBoundingClientRect();
    pop.style.left = Math.max(8, Math.min(r.left - pr.left - 10, pr.width - 290)) + 'px'; pop.style.top = (r.bottom - pr.top + 6) + 'px';
    pop.classList.remove('hidden');
    pop.onmousedown = e => e.preventDefault();
    pop.ontouchstart = e => e.preventDefault();
    pop.querySelectorAll('button').forEach(b => {
      const go = () => {
        stRestoreSel();
        if (b.dataset.ul) { stWrapUnderline(); }
        else if (k === 'hl') document.execCommand('hiliteColor', false, b.dataset.c ? b.dataset.c + '88' : 'transparent');
        else document.execCommand('foreColor', false, b.dataset.c || getComputedStyle($('#stDoc')).color);
        pop.classList.add('hidden'); hap(0); stSave();
      };
      b.ontouchend = e => { e.preventDefault(); go(); }; b.onclick = () => { if (!('ontouchstart' in window)) go(); };
    });
    return;
  }
  pop.classList.add('hidden');
  stRestoreSel(); hap(0);
  if (k === 'undo' || k === 'redo' || k === 'bold' || k === 'italic' || k === 'underline') document.execCommand(k);
  else if (k === 'smaller' || k === 'bigger') { const cur = +document.queryCommandValue('fontSize') || 3; document.execCommand('fontSize', false, Math.max(1, Math.min(7, cur + (k === 'bigger' ? 1 : -1)))); }
  else if (k === 'h2') { const b = (document.queryCommandValue('formatBlock') || '').toLowerCase(); document.execCommand('formatBlock', false, b === 'h2' ? 'p' : 'h2'); }
  else if (k === 'list') document.execCommand('insertUnorderedList');
  else if (k === 'clear') { document.execCommand('removeFormat'); document.execCommand('hiliteColor', false, 'transparent'); }
  stSave();
}
function stWrapUnderline() {
  const s = getSelection(); if (!s.rangeCount || s.isCollapsed) return;
  const r = s.getRangeAt(0); const span = document.createElement('span'); span.className = 'nul';
  try { span.appendChild(r.extractContents()); r.insertNode(span); } catch (e) {}
}
function stSave(now) {
  clearTimeout(STUDY.saveT);
  const f = () => { const doc = $('#stDoc'); if (!doc) return; const n = stCur(); n.h = doc.innerHTML; n.u = Date.now(); persist(); const t = $('#stList span'); if (t) t.textContent = stTitle(n); };
  if (now) f(); else STUDY.saveT = setTimeout(f, 400);
}

/* ---------- notes list / templates / more ---------- */
function stOpenList() {
  stSave(true);
  const ns = stNotes().slice().sort((a, b) => b.u - a.u);
  const h = '<button class="btn" id="stNew2">' + I.plus + ' ' + L('Foaie nouă', 'New sheet') + '</button>' +
    ns.map(n => '<div class="st-li ' + (n.id === S.noteCur ? 'cur' : '') + '" data-id="' + n.id + '"><div><b>' + esc(stTitle(n)) + '</b><small>' + new Date(n.u).toLocaleDateString(UI_EN ? 'en-GB' : 'ro-RO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) + ' · ' + ((n.h.match(/class="nv"/g) || []).length) + L(' versete', ' verses') + '</small></div><button class="st-del" data-del="' + n.id + '">' + I.trash + '</button></div>').join('');
  openSheet(L('Foile mele', 'My sheets'), h, body => {
    body.querySelector('#stNew2').onclick = () => stNewSheet();
    body.querySelectorAll('.st-li').forEach(x => x.onclick = e => {
      if (e.target.closest('[data-del]')) return;
      S.noteCur = x.dataset.id; persist(); closeSheet(); openStudy();
    });
    body.querySelectorAll('[data-del]').forEach(b => b.onclick = () => {
      if (!confirmTwice('del' + b.dataset.del)) return;
      S.notes = stNotes().filter(n => n.id !== b.dataset.del); if (S.noteCur === b.dataset.del) S.noteCur = null; persist(); closeSheet(); openStudy(); stOpenList();
    });
  });
}
function stNewSheet() {
  const h = '<p class="hint" style="margin:0 0 12px">' + L('Alege un model. Secțiunile gri se înlocuiesc când scrii sau tragi un verset în ele.', 'Pick a template. Grey sections are replaced when you type or drop a verse into them.') + '</p><div class="st-tpls">' +
    ST_TPL.map(t => '<button data-t="' + t[0] + '"><span>' + t[2] + '</span><b>' + esc(t[1]) + '</b></button>').join('') + '</div>';
  openSheet(L('Foaie nouă', 'New sheet'), h, body => body.querySelectorAll('[data-t]').forEach(b => b.onclick = () => {
    stSave(true);
    const t = ST_TPL.find(x => x[0] === b.dataset.t); const n = { id: 'n' + Date.now(), h: t[3](), u: Date.now() };
    stNotes().unshift(n); S.noteCur = n.id; persist(); closeSheet(); STUDY.range = null; if (stView() === 'bible') STUDY.view = 'notes'; openStudy(); hap(1);
  }), sheetOpen());
}
function stMore() {
  const z = S.noteZoom || 1;
  const h = '<div class="row"><span>' + L('Mărimea foii', 'Sheet text size') + '</span><div class="seg">' + [[0.85, 'S'], [1, 'M'], [1.2, 'L'], [1.45, 'XL']].map(([v, t]) => '<button data-z="' + v + '" class="' + (Math.abs(z - v) < .01 ? 'on' : '') + '">' + t + '</button>').join('') + '</div></div>' +
    '<button class="mitem" id="stChron">🕰 ' + L('Cronologie biblică', 'Biblical chronology') + '<small>›</small></button>' +
    '<button class="mitem" id="stTpl">' + I.plus + L('Foaie nouă din model', 'New sheet from template') + '<small>›</small></button>' +
    '<button class="mitem" id="stShare">' + I.share + L('Distribuie foaia', 'Share sheet') + '</button>' +
    '<button class="mitem" id="stCopy">' + I.book + L('Copiază textul foii', 'Copy sheet text') + '</button>' +
    '<button class="mitem" id="stDup">' + I.save + L('Duplică foaia', 'Duplicate sheet') + '</button>' +
    '<div class="row"><span>' + L('Deschide Modul studiu la pornire', 'Open Study mode on start') + '</span>' + stAutoSeg() + '</div>';
  openSheet(L('Foaia de studiu', 'Study sheet'), h, body => {
    body.querySelectorAll('[data-z]').forEach(b => b.onclick = () => { S.noteZoom = +b.dataset.z; persist(); $('#stDoc').style.fontSize = Math.round(17 * S.fs * S.noteZoom) + 'px'; body.querySelectorAll('[data-z]').forEach(x => x.classList.toggle('on', x === b)); });
    body.querySelector('#stTpl').onclick = () => stNewSheet();
    body.querySelector('#stChron').onclick = () => { closeSheet(); const rr = ref(STUDY.g); openChron(rr.b === 0 && rr.c < 11 ? 'g' : BOOKY[rr.b]); };
    const text = () => { stSave(true); const d = $('#stDoc'); return d.innerText.replace(/⠿/g, '').replace(/\n{3,}/g, '\n\n').trim(); };
    body.querySelector('#stShare').onclick = () => { const t = text(); if (A && A.share) A.share(t); else if (navigator.share) navigator.share({ text: t }).catch(() => {}); else { try { clipCopy(t); toast(T('Copiat')); } catch (e) {} } };
    body.querySelector('#stCopy').onclick = () => { const t = text(); try { A && A.copyText ? A.copyText(t) : clipCopy(t); } catch (e) {} toast(T('Copiat')); };
    body.querySelector('#stDup').onclick = () => { stSave(true); const c = stCur(); const n = { id: 'n' + Date.now(), h: c.h, u: Date.now() }; stNotes().unshift(n); S.noteCur = n.id; persist(); closeSheet(); openStudy(); toast(L('Foaie duplicată', 'Sheet duplicated')); };
    stBindAutoSeg(body);
  });
}
function stAutoSeg() { const v = S.studyAuto || 'tab'; return '<div class="seg">' + [['tab', L('Pe tabletă', 'Tablet')], ['always', L('Mereu', 'Always')], ['off', L('Nu', 'Off')]].map(([k, t]) => '<button data-sa="' + k + '" class="' + (v === k ? 'on' : '') + '">' + t + '</button>').join('') + '</div>'; }
function stBindAutoSeg(body) { body.querySelectorAll('[data-sa]').forEach(b => b.onclick = () => { S.studyAuto = b.dataset.sa; persist(); hap(0); body.querySelectorAll('[data-sa]').forEach(x => x.classList.toggle('on', x === b)); }); }
function stAddFromSheet(p) {
  if (!STUDY.open) { stCur(); const n = stCur(); const d = document.createElement('div'); d.innerHTML = n.h; d.insertAdjacentHTML('beforeend', stBlockHtml(p) + '<p><br></p>'); n.h = d.innerHTML; n.u = Date.now(); persist(); toast(L('Adăugat în foaia „', 'Added to “') + stTitle(n) + L('”', '”')); hap(1); return; }
  stInsert(p);
}

/* ---------- drag & drop (touch + mouse) ---------- */
function stBindDrag() {
  const study = $('#study'); let D = null, lpT = 0;
  const srcOf = t => t.closest('[data-va],[data-back],.st-pv,.sref,[data-fb],.stf-h,.stf-rz') ? null : (t.closest('.st-doc .h') || t.closest('.swr') || t.closest('.sxr') || t.closest('.sv'));
  const payloadOf = el => {
    if (el.classList.contains('h')) return { type: 'move', el: el.parentNode, label: (el.parentNode.querySelector('.nr') || el.parentNode).textContent };
    if (el.classList.contains('sxr')) { const g0 = +el.dataset.g, sp = +el.dataset.sp; const gs = []; for (let k = 0; k <= sp; k++) gs.push(g0 + k); return { type: 'v', gs, label: stRangeLabel(gs, stLang()) }; }
    if (el.classList.contains('swr')) return { type: 'w', code: el.dataset.s, g: +el.dataset.g, label: el.querySelector('b').textContent + ' · ' + el.dataset.s };
    const g = +el.dataset.g; const gs = STUDY.sel.includes(g) && STUDY.sel.length > 1 ? STUDY.sel.slice() : [g];
    return { type: 'v', gs, label: stRangeLabel(gs, stLang()) };
  };
  const start = (el, x, y) => {
    D = { p: payloadOf(el), src: el, x0: x, y0: y, moved: false, nav: el.classList.contains('sxr') }; hap(1);
    const gh = $('#stGhost'); gh.textContent = (D.p.type === 'move' ? '⠿ ' : '＋ ') + D.p.label; if (!D.nav) gh.classList.remove('hidden');
    el.classList.add('dragging');
    if (D.p.type === 'move') { let tr = $('#stTrash'); if (!tr) { tr = document.createElement('div'); tr.id = 'stTrash'; tr.innerHTML = I.trash + '<span>' + L('Trage aici ca să ștergi', 'Drop here to delete') + '</span>'; study.appendChild(tr); } tr.classList.remove('hot'); tr.classList.add('show'); }
    move(x, y);
  };
  const dropTarget = (x, y) => {
    const doc = $('#stDoc'), paper = $('#stPaper'); const pr = paper.getBoundingClientRect();
    if (x < pr.left || x > pr.right || y < pr.top - 20 || y > pr.bottom + 20) return null;
    const kids = [...doc.children].filter(k => !(D.p.type === 'move' && k === D.p.el));
    for (const k of kids) { const r = k.getBoundingClientRect(); if (y < r.top + r.height / 2) return { before: k, y: r.top }; }
    const last = kids[kids.length - 1]; return { before: null, y: last ? last.getBoundingClientRect().bottom + 4 : pr.top + 20 };
  };
  const move = (x, y) => {
    if (!D) return;
    if (!D.moved && (Math.abs(x - D.x0) > 16 || Math.abs(y - D.y0) > 16)) { D.moved = true; if (stView() === 'bible' && D.p.type !== 'move') stSetPane('notes', true); }
    if (D.nav && !D.moved) return;
    const gh = $('#stGhost'); gh.style.transform = 'translate(' + (x - 20) + 'px,' + (y - 34) + 'px)';
    let t = dropTarget(x, y); const ind = $('#stDrop'), paper = $('#stPaper');
    const tr = D.p.type === 'move' && $('#stTrash');
    if (tr) { const r = tr.getBoundingClientRect(); const hot = x > r.left - 20 && x < r.right + 20 && y > r.top - 20 && y < r.bottom + 20; if (hot !== !!D.trash) { D.trash = hot; tr.classList.toggle('hot', hot); if (hot) hap(1); } if (hot) t = null; }
    D.t = t;
    if (t) { const pr = paper.getBoundingClientRect(); ind.style.top = (t.y - pr.top + paper.scrollTop - 3) + 'px'; ind.classList.remove('hidden'); } else ind.classList.add('hidden');
    // auto-scroll near edges
    clearInterval(D.as); const pr = paper.getBoundingClientRect();
    if (t && (y < pr.top + 50 || y > pr.bottom - 50)) { const d = y < pr.top + 50 ? -12 : 12; D.as = setInterval(() => { paper.scrollTop += d; }, 16); }
  };
  const end = () => {
    if (!D) return; clearInterval(D.as);
    $('#stGhost').classList.add('hidden'); $('#stDrop').classList.add('hidden'); D.src.classList.remove('dragging');
    { const tr = $('#stTrash'); if (tr) tr.classList.remove('show', 'hot'); }
    if (D.trash) { const el = D.p.el; el.style.transition = 'transform .25s, opacity .25s'; el.style.transform = 'scale(.6)'; el.style.opacity = '0'; setTimeout(() => { el.remove(); stSave(); }, 230); hap(1); toast(L('Șters din foaie', 'Removed from sheet')); STUDY.dragJustEnded = true; setTimeout(() => STUDY.dragJustEnded = false, 350); D = null; return; }
    if (D.nav && !D.moved) { const g = +D.src.dataset.g; D = null; STUDY.dragJustEnded = true; setTimeout(() => STUDY.dragJustEnded = false, 350); stNavTo(g, STUDY.xFrom); return; }
    const t = D.t;
    if (t) {
      if (D.p.type === 'move') { const doc = $('#stDoc'); if (t.before) doc.insertBefore(D.p.el, t.before); else doc.appendChild(D.p.el); D.p.el.classList.add('flash'); setTimeout(() => D.p.el.classList.remove('flash'), 800); hap(1); stSave(); }
      else { if (t.before && t.before.classList.contains('ph')) { const nx = t.before.nextElementSibling; t.before.remove(); stInsert(D.p, nx); } else stInsert(D.p, t.before); if (D.p.type === 'v') { STUDY.sel = []; stMarkSel(); } }
    }
    STUDY.dragJustEnded = true; setTimeout(() => STUDY.dragJustEnded = false, 350);
    D = null;
  };
  // touch: long-press to pick up, then drag
  let sx = 0, sy = 0, pending = null;
  study.addEventListener('touchstart', e => {
    const el = srcOf(e.target); if (!el || e.touches.length > 1) return;
    const t = e.touches[0]; sx = t.clientX; sy = t.clientY; pending = el;
    clearTimeout(lpT); lpT = setTimeout(() => { if (pending) start(pending, sx, sy); pending = null; }, el.classList.contains('h') ? 120 : 380);
  }, { passive: true });
  study.addEventListener('touchmove', e => {
    const t = e.touches[0];
    if (D) { e.preventDefault(); move(t.clientX, t.clientY); return; }
    if (pending && (Math.abs(t.clientX - sx) > 10 || Math.abs(t.clientY - sy) > 10)) { pending = null; clearTimeout(lpT); }
  }, { passive: false });
  study.addEventListener('touchend', e => { clearTimeout(lpT); pending = null; if (D) { e.preventDefault(); end(); } }, { passive: false });
  study.addEventListener('touchcancel', () => { clearTimeout(lpT); pending = null; if (D) { D.t = null; end(); } });
  // mouse
  let md = null;
  study.addEventListener('mousedown', e => { if ('ontouchstart' in window) return; const el = srcOf(e.target); if (!el || e.button) return; md = { el, x: e.clientX, y: e.clientY }; if (el.classList.contains('h')) e.preventDefault();
    if (el.classList.contains('sxr')) { const m0 = md; md.lt = setTimeout(() => { if (md === m0 && !D) { md = null; STUDY.dragJustEnded = true; setTimeout(() => STUDY.dragJustEnded = false, 400); stNavTo(+el.dataset.g, STUDY.xFrom); } }, 500); } });
  document.addEventListener('mousemove', e => {
    if (md && !D && (Math.abs(e.clientX - md.x) > 6 || Math.abs(e.clientY - md.y) > 6)) { start(md.el, e.clientX, e.clientY); getSelection().removeAllRanges(); }
    if (D) { e.preventDefault(); move(e.clientX, e.clientY); }
    if (md && md.lt && (Math.abs(e.clientX - md.x) > 6 || Math.abs(e.clientY - md.y) > 6)) { clearTimeout(md.lt); md.lt = 0; }
  });
  document.addEventListener('mouseup', () => { if (md && md.lt) clearTimeout(md.lt); md = null; if (D) end(); });
}
function stApplySplit() {
  const el = $('#study'); if (!el) return; const b = el.querySelector('.st-bible');
  if (stView() !== 'split') { b.style.width = b.style.height = b.style.maxWidth = ''; return; }
  if (stIsWide()) { b.style.height = ''; b.style.width = (S.stSplitW || 40) + '%'; b.style.maxWidth = 'none'; }
  else { b.style.width = ''; b.style.maxWidth = ''; b.style.height = (S.stSplitH || 44) + '%'; }
}
function stBindDivider() {
  const dv = $('#stDiv'), m = $('#study .st-main'); let on = false;
  const set = (x, y) => {
    const r = m.getBoundingClientRect();
    if (stIsWide()) S.stSplitW = Math.max(22, Math.min(75, (x - r.left) / r.width * 100));
    else S.stSplitH = Math.max(18, Math.min(78, (y - r.top) / r.height * 100));
    stApplySplit();
  };
  const start = e => { on = true; dv.classList.add('on'); document.documentElement.classList.add('st-resizing'); hap(0); e.preventDefault(); };
  const stop = () => { if (!on) return; on = false; dv.classList.remove('on'); document.documentElement.classList.remove('st-resizing'); persist(); };
  dv.addEventListener('touchstart', start, { passive: false });
  dv.addEventListener('touchmove', e => { if (!on) return; e.preventDefault(); const t = e.touches[0]; set(t.clientX, t.clientY); }, { passive: false });
  dv.addEventListener('touchend', stop); dv.addEventListener('touchcancel', stop);
  dv.addEventListener('mousedown', start);
  document.addEventListener('mousemove', e => { if (on) set(e.clientX, e.clientY); });
  document.addEventListener('mouseup', stop);
  dv.addEventListener('dblclick', () => { S.stSplitW = 40; S.stSplitH = 44; stApplySplit(); persist(); });
  stApplySplit();
}
function stBindSwipe() {
  const m = $('#study .st-main'); let x0 = 0, y0 = 0, t0 = 0, ok = false;
  m.addEventListener('touchstart', e => { if (e.touches.length > 1 || stView() === 'split') { ok = false; return; } const t = e.touches[0]; x0 = t.clientX; y0 = t.clientY; t0 = Date.now(); ok = !e.target.closest('.st-tools,.st-pop,.st-selbar'); }, { passive: true });
  m.addEventListener('touchmove', e => {
    if (!ok || $('#stGhost').classList.contains('hidden') === false) return;
    const t = e.touches[0], dx = t.clientX - x0, dy = t.clientY - y0;
    if (Math.abs(dy) > 30 && Math.abs(dy) > Math.abs(dx)) { ok = false; return; }
    const pane = STUDY.pane === 'bible' ? m.querySelector('.st-bible') : m.querySelector('.st-notes');
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.5) pane.style.transform = 'translateX(' + dx * .35 + 'px)';
  }, { passive: true });
  m.addEventListener('touchend', e => {
    m.querySelectorAll('.st-bible,.st-notes').forEach(x => x.style.transform = '');
    if (!ok) return; ok = false;
    const t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0, v = Math.abs(dx) / Math.max(1, Date.now() - t0);
    const sel = getSelection(); if (sel && !sel.isCollapsed) return;
    if (Math.abs(dx) < Math.abs(dy) * 1.6 || (Math.abs(dx) < 80 && v < .5)) return;
    const to = dx < 0 ? 'notes' : 'bible'; if (to === stView()) return;
    hap(0); stSetPane(to);
    const pn = m.querySelector(to === 'bible' ? '.st-bible' : '.st-notes'); pn.classList.remove('slide-l', 'slide-r'); void pn.offsetWidth; pn.classList.add(dx < 0 ? 'slide-l' : 'slide-r');
  }, { passive: true });
}
function stAutoStart() {
  const v = S.studyAuto || 'tab';
  if (v === 'always' || (v === 'tab' && Math.min(innerWidth, innerHeight) >= 600)) openStudy();
}
window.addEventListener('resize', () => { if (STUDY.open) { $('#study').className = stCls(); stApplySplit(); } });

updateTopicTab(); setMode('read'); window.__ready = true; try { stAutoStart(); } catch (e) {}
if (WEB && 'serviceWorker' in navigator && location.protocol === 'https:') { try { navigator.serviceWorker.register('sw.js').catch(() => {}); } catch (e) {} }
if (WEB && IOS && !STANDALONE && !S.instHint) { S.instHint = 1; persist(); setTimeout(() => toast(UI_EN ? 'Tip: ☰ → Install on iPhone' : 'Sfat: ☰ → Instalează pe iPhone'), 2500); }
try { const wm = document.createElement('div'); wm.id = 'verWm'; wm.textContent = 'V' + APP_VER; document.body.appendChild(wm); } catch (e) {}
if (S.onv) { delete S.onv; persist(); }
['ro', 'en'].forEach(l => { const v = (S.ver || {})[l]; if (v && VVAR[v]) loadVer(v, () => refresh()); });
window.__t = { rc: () => readCount, openVersions, curVer, alignRo, loadAlign, openNave, openGodNames, loadNave, openDict, openDictSearch, dMatch, dVerse, loadDict, openChron, crZoomTo, openPerson, openMap, loadGeo, placesInChapter, loadPeople, openCtx, placeCard, stNavGo: g => { STUDY.g = g; STUDY.sel = []; stRenderBible(); }, G, stStrongPv, openWord, openStudy, closeStudy, stInsert, closeSheet, closePlans, openPlanDetail, openVerse, openWord, requestA11y }; window.__dbg = () => ({ mode, fy: FY.i, n: FY.items.length, pl: PL.i, wl: wheelLock - Date.now() }); syncGate(); try { A && A.ready && A.ready(); } catch (e) {}
setTimeout(() => loadLex(), 2500);
})();

/* ---------- immersive: fade chrome while reading ---------- */
(function () {
  let t = 0;
  const wake = () => { document.documentElement.classList.remove('calm'); clearTimeout(t); t = setTimeout(() => { if (!document.documentElement.classList.contains('sheeted') && document.querySelector('#drawer').classList.contains('hidden')) document.documentElement.classList.add('calm'); }, 4000); };
  ['touchstart', 'mousemove', 'wheel', 'keydown'].forEach(ev => document.addEventListener(ev, wake, { passive: true, capture: true }));
  wake();
})();
