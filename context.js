/* Scroll Biblia — note „Context istoric” (offline).
   Textul notelor e scris pentru aplicație, pe baza surselor indicate; nu reproduce articolele.
   Categorii: A confirmat de dovezi · B text biblic · C interpretări academice · D ipoteze · E disputat/necunoscut.
   Chei capitol: "<carte 0-based>.<capitol 1-based>"; trimiteri: "<carte>.<cap>.<vers>" toate 1-based. */
window.CTX_SRC = {
  bo_senn: ['Bible Odyssey — „Sennacherib” (dicționar)', 'Society of Biblical Literature', '', 'academic', 'https://www.bibleodyssey.org/dictionary/sennacherib/'],
  bo_lach: ['Bible Odyssey — „Lachish” (dicționar)', 'Society of Biblical Literature', '', 'academic', 'https://www.bibleodyssey.org/dictionary/lachish/'],
  bo_arch: ['Bible Odyssey — „What Does Archaeology Tell Us about the Hebrew Bible?”', 'Society of Biblical Literature', '', 'academic', 'https://www.bibleodyssey.org/articles/what-does-archaeology-tell-us-about-the-hebrew-bible/'],
  bo_nin: ['Bible Odyssey — „The Art and Archaeology of Nineveh”', 'Society of Biblical Literature', '', 'academic', 'https://www.bibleodyssey.org/articles/the-art-and-archaeology-of-nineveh/'],
  bo_bab: ['Bible Odyssey — „Babylonian Accounts of the Invasion of Judah”', 'Society of Biblical Literature', '', 'academic', 'https://www.bibleodyssey.org/articles/babylonian-accounts-of-the-invasion-of-judah/'],
  bm_taylor: ['British Museum — Prisma lui Senaherib („Prisma Taylor”), nr. 91032', 'British Museum', 'fișă de colecție online', 'instituțional · artefact (sursă primară)', 'https://www.britishmuseum.org/collection/object/W_1855-1003-1'],
  bm_lach: ['British Museum — relieful „Asediul Lachisului”, nr. 124907', 'British Museum', 'fișă de colecție online', 'instituțional · artefact (sursă primară)', 'https://www.britishmuseum.org/collection/object/W_1856-0909-14_3'],
  rinap22: ['RINAP 3/1, Sennacherib 022 — ediția analelor (ORACC)', 'A. Kirk Grayson, Jamie Novotny', '2012', 'academic · ediție de text antic (sursă primară)', 'https://oracc.museum.upenn.edu/rinap/rinap3/Q003496'],
  luck: ['The Annals of Sennacherib (Oriental Institute Publications 2)', 'Daniel David Luckenbill', '1924; online la ISAC, University of Chicago', 'academic (lucrare veche)', 'https://isac.uchicago.edu/sites/default/files/uploads/shared/docs/oip2.pdf'],
  niss: ['„Assyrian and Babylonian Sources”, în The Oxford Handbook of the Historical Books of the Hebrew Bible (ed. B. E. Kelle, B. A. Strawn)', 'Martti Nissinen', '2020, Oxford University Press', 'academic', 'https://doi.org/10.1093/oxfordhb/9780190261160.013.5'],
  cogan: ['„Sennacherib’s Siege of Jerusalem: Once or Twice?”, Biblical Archaeology Review 27:1', 'Mordechai Cogan', '2001', 'revistă de arheologie (acces cu abonament)', 'https://library.biblicalarchaeology.org/article/sennacheribs-siege-of-jerusalem-once-or-twice/'],
  louvre_mesha: ['Musée du Louvre — Stela lui Meșa, AO 5066', 'Musée du Louvre', 'fișă de colecție online', 'instituțional · artefact (sursă primară)', 'https://collections.louvre.fr/en/ark:/53355/cl010120339'],
  fnr: ['„Restoring Line 31 in the Mesha Stele: The ‘House of David’ or Biblical Balak?”, Tel Aviv 46/1, pp. 3–11', 'Israel Finkelstein, Nadav Na’aman, Thomas Römer', '2019', 'academic · revistă de arheologie', 'https://doi.org/10.1080/03344355.2019.1586378'],
  lang: ['„The Kings, the City and the House of David on the Mesha Stele in Light of New Imaging Techniques”, Semitica 61, pp. 23–47', 'Michael Langlois', '2019', 'academic', 'https://michaellanglois.fr/medias/langlois-2019-the-kings-the-city-and-the-house-of-david-on-the-mesha-stele-semitica-61-p--23-47.pdf'],
  bm_abc5: ['British Museum — Cronica babiloniană (ABC 5), nr. 21946', 'British Museum', 'fișă de colecție online', 'instituțional · tăbliță (sursă primară)', 'https://www.britishmuseum.org/collection/object/W_1896-0409-51'],
  wiseman: ['Chronicles of Chaldean Kings (626–556 B.C.) in the British Museum', 'Donald J. Wiseman', '1956', 'academic (prima publicare a cronicii)', 'http://digital.library.stonybrook.edu/cdm/ref/collection/iraqiarcheology/id/85'],
  albright: ['„The Nebuchadnezzar and Neriglissar Chronicles”, BASOR 143, pp. 28–33', 'W. F. Albright', '1956', 'academic · revistă de arheologie', 'https://www.jstor.org/stable/1355927'],
  livius5: ['Livius.org — „ABC 5 (Jerusalem Chronicle)”', 'Jona Lendering', '', 'general (site de istorie antică)', 'https://www.livius.org/sources/content/mesopotamian-chronicles-content/abc-5-jerusalem-chronicle/'],
  bm_cyrus: ['British Museum — Cilindrul lui Cirus, nr. 90920', 'British Museum', 'fișă de colecție online', 'instituțional · artefact (sursă primară)', 'https://www.britishmuseum.org/collection/object/W_1880-0617-1941'],
  liviuscyr: ['Livius.org — „Cyrus Cylinder”', 'Jona Lendering', '', 'general (site de istorie antică)', 'https://www.livius.org/sources/content/cyrus-cylinder/'],
  edh: ['Epigraphic Database Heidelberg — HD004074 (inscripția lui Pilat, Cezareea)', 'Universitatea din Heidelberg', 'actualizat 2018-12-03', 'academic · bază de date epigrafică', 'https://edh-www.adw.uni-heidelberg.de/edh/inschrift/HD004074'],
  heur: ['Judaism and Rome — „Dedication by Pontius Pilate in Judea (CIIP II, 1277)”', 'proiect de cercetare (Heurist / Huma-Num)', '', 'academic · bază de date', 'https://heurist.huma-num.fr/heurist/judaism_and_rome/view/288'],
  imj: ['Israel Museum — inscripția dedicatorie cu numele lui Pilat (pe Google Arts & Culture)', 'Israel Museum · Israel Antiquities Authority', '', 'instituțional · artefact (sursă primară)', 'https://artsandculture.google.com/asset/SgGV0ad7K8m3BQ'],
  jos: ['Iosif Flavius, Antichități iudaice, cartea 18, cap. 1–2 (trad. engleză W. Whiston)', 'Iosif Flavius (sec. I d.Hr.)', 'ediție online: University of Chicago (Penelope)', 'sursă primară antică', 'https://penelope.uchicago.edu/josephus/ant-18.html'],
  tyn: ['Tyndale House — „Was Luke wrong about the census?”', 'Tyndale House, Cambridge', '', 'instituție de cercetare biblică', 'https://tyndale.cam.ac.uk/explore/articles/was-luke-wrong-about-the-census/'],
  brindle: ['„The Census and Quirinius: Luke 2:2”, Journal of the Evangelical Theological Society 27/1', 'Wayne Brindle', '1984', 'academic', 'https://facultyshare.liberty.edu/en/publications/the-census-and-quirinius-luke-22/']
};
window.CTX = [
  {
    id: 'senaherib', t: 'Campania lui Senaherib în Iuda (701 î.Hr.)',
    ch: ['11.18', '11.19', '22.36', '22.37', '13.32'],
    A: [
      ['Analele regelui asirian Senaherib s-au păstrat pe prisme de lut (Prisma Taylor de la British Museum, prisma de la Chicago și cea din Ierusalim). Ele descriu campania din 701 î.Hr. în Levant, inclusiv atacul asupra regatului lui Ezechia.', ['bm_taylor', 'rinap22', 'luck']],
      ['Textul asirian spune că 46 de cetăți întărite ale lui Ezechia au fost cucerite și că regele a fost închis în Ierusalim „ca o pasăre în colivie”. Ierusalimul nu apare ca cucerit, iar Ezechia trimite tribut.', ['rinap22', 'luck', 'bo_senn']],
      ['Asediul Lachisului este sculptat pe reliefurile din palatul lui Senaherib de la Ninive, aflate azi la British Museum. Rampa de asediu se vede încă pe teren.', ['bm_lach', 'bo_nin', 'bo_lach']]
    ],
    B: [
      ['Senaherib ia cetățile întărite ale lui Iuda, iar Ezechia plătește 300 de talanți de argint și 30 de talanți de aur.', [], ['12.18.13', '12.18.14']],
      ['Îngerul Domnului lovește tabăra asiriană; Senaherib se întoarce la Ninive, unde este ucis de fiii săi.', [], ['12.19.35', '12.19.37', '23.37.36']]
    ],
    C: [
      ['Cercetătorii arată că inscripțiile, reliefurile, arheologia și relatarea biblică se potrivesc în linii mari, chiar dacă fiecare parte își laudă propriul rege și propriul zeu.', ['bo_arch', 'niss']],
      ['Cifrele tributului diferă: analele asiriene dau 800 de talanți de argint, Biblia 300; aurul (30 de talanți) coincide.', ['rinap22', 'luck']]
    ],
    D: [
      ['Unii istorici au propus două campanii asiriene (701 î.Hr. și una mai târzie) ca să explice diferențele dintre relatări. Mordechai Cogan respinge ipoteza și preferă o singură campanie, în 701 î.Hr.', ['cogan']]
    ],
    E: [
      ['Motivul exact pentru care asirienii nu au cucerit Ierusalimul nu reiese din sursele extra-biblice: analele asiriene nu pomenesc pierderi și nici retragerea.', ['rinap22', 'cogan']]
    ]
  },
  {
    id: 'mesa', t: 'Stela lui Meșa, regele Moabului (sec. IX î.Hr.)',
    ch: ['11.3'],
    A: [
      ['Stela de bazalt a fost găsită în 1868 la Dhiban (vechiul Dibon, azi în Iordania) și se află la Luvru (AO 5066). Luvrul o datează în a doua jumătate a secolului al IX-lea î.Hr.', ['louvre_mesha', 'fnr']],
      ['Inscripția, în limba moabită, povestește extinderea teritoriului și construcțiile lui Meșa, regele Moabului, personaj pomenit și în Biblie. Textul vorbește despre stăpânirea lui Israel asupra Moabului și despre victoria lui Meșa.', ['louvre_mesha', 'fnr', 'lang']]
    ],
    B: [
      ['Meșa, regele Moabului, plătea tribut lui Israel și s-a răsculat după moartea lui Ahab; regii lui Israel, Iuda și Edom pornesc împotriva lui.', [], ['12.3.4', '12.3.5', '12.3.27']]
    ],
    C: [
      ['Stela și 2 Împărați 3 descriu aceeași răscoală din perspective opuse: inscripția pune biruința pe seama zeului moabit Chemoș.', ['louvre_mesha', 'lang']]
    ],
    E: [
      ['Rândul 31 este disputat. André Lemaire a citit acolo „Casa lui David”. Finkelstein, Na’aman și Römer (2019) resping această lectură și propun, cu prudență, numele Balak. Langlois (2019), pe baza unor imagini noi, consideră „Casa lui David” lectura cea mai probabilă, dar tot ipotetică.', ['fnr', 'lang']]
    ]
  },
  {
    id: 'ierusalim597', t: 'Nebucadnețar cucerește Ierusalimul (597 î.Hr.)',
    ch: ['11.24', '13.36'],
    A: [
      ['Cronica babiloniană BM 21946 (ABC 5) descrie anii 605–594 î.Hr. din domnia lui Nebucadnețar al II-lea, inclusiv prima campanie împotriva Ierusalimului, din 597 î.Hr.', ['bm_abc5', 'livius5']],
      ['Cronica spune că regele Babilonului a asediat „cetatea lui Iuda”, a capturat regele, a pus un rege ales de el și a luat tribut mare. Datele din ea fixează cucerirea în martie 597 î.Hr.', ['wiseman', 'albright', 'livius5']]
    ],
    B: [
      ['Ioiachin se predă și este dus în Babilon; Nebucadnețar îl face rege pe unchiul lui, Matania, căruia îi schimbă numele în Zedechia.', [], ['12.24.12', '12.24.15', '12.24.17']]
    ],
    C: [
      ['Cronica nu dă numele regilor; cercetătorii îi identifică, după relatarea biblică, cu Ioiachin (regele capturat) și Zedechia (regele numit).', ['livius5', 'bo_bab']]
    ],
    E: [
      ['Pentru distrugerea Ierusalimului (587 sau 586 î.Hr.) nu avem o cronică babiloniană: textul păstrat se oprește în 594 î.Hr. De aceea anul exact al distrugerii este discutat.', ['bm_abc5', 'livius5']]
    ]
  },
  {
    id: 'cirus', t: 'Cirus cucerește Babilonul; întoarcerea din exil (539/538 î.Hr.)',
    ch: ['14.1', '13.36', '22.44', '22.45'],
    A: [
      ['Cilindrul lui Cirus (British Museum 90920), descoperit în 1879, este o relatare babiloniană despre cucerirea Babilonului de către Cirus, în 539 î.Hr., și despre readucerea statuilor unor zei în templele lor.', ['bm_cyrus', 'liviuscyr']]
    ],
    B: [
      ['În primul an al domniei, Cirus dă un decret care le permite iudeilor să se întoarcă și să zidească Templul.', [], ['15.1.1', '15.1.3', '14.36.23']],
      ['Isaia îl numește pe Cirus pe nume.', [], ['23.44.28', '23.45.1']]
    ],
    C: [
      ['Cilindrul nu pomenește Iuda sau Ierusalimul. Mulți istorici îl văd ca pe un exemplu al unei politici mai largi de restaurare a cultelor locale, compatibilă cu decretul din Ezra, dar nu ca pe o confirmare directă a lui.', ['liviuscyr', 'niss']]
    ]
  },
  {
    id: 'pilat', t: 'Pilat din Pont, prefectul Iudeii (26–36 d.Hr.)',
    ch: ['39.27', '40.15', '41.23', '42.18', '42.19'],
    A: [
      ['În 1961, la Cezareea Maritima, a fost găsit un bloc de calcar cu o inscripție latină care pomenește numele lui Pilat și titlul de prefect al Iudeii. Blocul fusese refolosit în treptele teatrului roman.', ['edh', 'imj', 'heur']],
      ['Originalul se află la Muzeul Israel din Ierusalim; la Cezareea este expusă o copie.', ['imj', 'heur']]
    ],
    B: [
      ['Evangheliile îl prezintă pe Pilat ca guvernatorul roman care l-a judecat pe Isus.', [], ['40.27.2', '43.19.1']]
    ],
    C: [
      ['Inscripția pare să comemoreze dedicarea unei clădiri numite „Tiberieum”, în cinstea împăratului Tiberiu.', ['heur', 'imj']]
    ],
    D: [
      ['Literele lipsă sunt completate de specialiști. Lectura propusă de Géza Alföldy („a restaurat Tiberieum-ul”) este larg acceptată, dar rămâne o reconstituire.', ['heur']]
    ]
  },
  {
    id: 'quirinius', t: 'Recensământul din vremea lui Quirinius (Luca 2)',
    ch: ['41.2'],
    A: [
      ['Iosif Flavius scrie că, după îndepărtarea lui Arhelau (anul 6 d.Hr.), Quirinius a venit în Iudeea, alipită provinciei Siria, ca să evalueze averile oamenilor; recensământul a stârnit răscoala lui Iuda Galileeanul.', ['jos']]
    ],
    B: [
      ['Un decret al lui August cere înscrierea populației; Luca îl numește „întâiul recensământ”, din vremea când Quirinius era dregător al Siriei.', [], ['42.2.1', '42.2.2']],
      ['Matei pune nașterea lui Isus în zilele regelui Irod cel Mare.', [], ['40.2.1']]
    ],
    C: [
      ['Mulți cercetători consideră că Luca leagă nașterea de recensământul din anul 6 d.Hr., cam la zece ani după moartea lui Irod.', ['tyn']],
      ['Alți cercetători susțin că greaca din Luca 2:2 se poate traduce și „înainte de” recensământul lui Quirinius, deci ar fi vorba de un recensământ mai vechi.', ['brindle', 'tyn']]
    ],
    D: [
      ['Ipoteze propuse: Quirinius ar fi avut o misiune mai veche în Siria sau ar fi existat un recensământ anterior în regatul lui Irod. Niciuna nu are dovezi directe.', ['brindle']]
    ],
    E: [
      ['Problema rămâne deschisă: până acum nu se cunoaște o sursă extra-biblică despre un recensământ roman în Iudeea înainte de anul 6 d.Hr.', ['tyn']]
    ]
  }
];
