﻿// Game State
const gameState = {
    language: 'fr',
    theme: 'dark', // 'dark' or 'light'
    unlockedParticles: [], // Will be filled on init
    reactorSlots: [null, null, null],
    labInitialized: false,
    colliderInitialized: false,
    terminalCleared: false,
    colliderZoom: 1.0,
    comparisonChart: null,
    quiz: { currentQuestion: 0, score: 0, questions: [] },
    quizInitialized: false,
    memoryInitialized: false,
    memory: { isPlaying: false, moves: 0, timer: 0, timerInterval: null, flippedCards: [], matchedPairs: 0, lockBoard: false },
    currentParticle: null, // Track particle currently shown in modal
    ripples: [],
    histogramChart: null,
    canvasAnimId: null, // To track the collider canvas animation frame
    globalObserver: null, // Persistent observer instance
    typingIntervals: [] // Track terminal typing for cleanup
};

// UI Translations
const uiTranslations = {
    ro: {
        app_title: "QEDit",
        nav_catalog: "CATALOG",
        nav_lab: "LABORATOR",
        nav_collider: "COLLIDER",
        nav_info: "INFO",
        nav_other: "ALTE FUNCȚII",
        catalog_title: "Catalogul Modelului Standard",
        lab_title: "Reactor de Hadroni",
        lab_synthesis: "Sinteză Particule",
        lab_available: "Quarcuri Disponibile pentru Sinteză:",
        lab_btn_synthesize: "SINTETIZEAZĂ",
        lab_recipes: "Rețete Cunoscute",
        collider_title: "LHC - Unități de Control",
        collider_controls: "Parametri de Rulare",
        collider_mode: "Mod Simulare",
        collider_experiments: "Experimente Istorice",
        collider_beam: "Configurare Fascicul",
        collider_beam1: "Fascicul 1",
        collider_beam2: "Fascicul 2",
        collider_energy: "Energie Centru de Masă (TeV)",
        collider_mag: "Câmp Magnetic:",
        collider_temp: "Temperatură:",
        collider_lumi: "Luminozitate:",
        collider_rate: "Rată Coliziuni:",
        collider_events: "Evenimente:",
        collider_cross: "Secțiune Eficace:",
        collider_eff: "Eficiență:",
        collider_btn_init: "LANSEAZĂ COLIZIUNEA",
        collider_btn_simulate: "SIMULEAZĂ",
        collider_terminal: "IEȘIRE CONSOLĂ",
        collider_data: "Data Stream",
        collider_particle_id: "Identificare Automată a Particulelor",
        info_title: "Centru de Expertiză și Documentare Fizică Subatomică",
        info_search_placeholder: "Căutare în indexul academic...",
        info_tab_model: "Modelul Standard",
        info_tab_dynamics: "Forțe & Materie",
        info_tab_ref: "Glosar & Unități",
        info_tab_history: "Cronologie",
        info_model: "Modelul Standard",
        other_title: "Funcționalități Suplimentare",
        compare_title: "Comparare Particule",
        compare_select_1: "Selectează Particula 1",
        compare_select_2: "Selectează Particula 2",
        compare_btn: "COMPARĂ",
        compare_export_pdf: "Export PDF",
        compare_property: "Proprietate",
        name_label: "Nume",
        symbol_label: "Simbol",
        chart_mass: "Masă (Log eV)",
        chart_charge: "Sarcină",
        chart_spin: "Spin",
        chart_generation: "Generație",
        type_label: "Tip",
        info_model_desc: "Modelul Standard al fizicii particulelor constituie fundamentul riguros al înțelegerii noastre asupra microcosmosului, fiind o teorie cuantică a câmpurilor ce integrează interacțiunile fundamentale non-gravitaționale. Acesta sistematizează materia în generații fermionice și forțele în bosoni vectoriali, oferind o descriere matematică coerentă a mecanismului de rupere a simetriei prin câmpul Higgs.",
        info_lab: "Ghid Laborator",
        info_lab_desc: "În reactorul de hadroni, sinteza barionilor este guvernată de legile cromodinamicii cuantice. Hadronii rezultați trebuie să constituie stări singlet de culoare (neutre) pentru a fi viabili din punct de vedere fizic.",
        info_lab_hint: "Click pe o rețetă din dreapta pentru a vedea detalii despre particula compusă rezultată.",
        info_forces: "Interacțiuni Fundamentale",
        info_forces_desc: "Dinamica structurală a Universului este determinată de patru interacțiuni fundamentale, mediate de bosoni de calibru specifici:",
        info_collider: "Collider & Detectoare",
        info_collider_desc: "Acceleratorul LHC simulează condiții extreme de densitate energetică. Coliziunile frontale la energii de ordinul tera-electronvolților permit explorarea mecanismului Higgs și detecția particulelor exotice prin procese de reconstrucție cinematică.",
        info_collider_hint: "Datele afișate (Luminozitate, Rată, etc.) sunt indicatori de performanță ai acceleratorului, simulând complexitatea unui experiment real.",
        info_units: "Unități de Măsură în Fizica Particulelor",
        info_detectors: "Detectoarele Principale LHC",
        info_detectors_desc: "Arhitectura LHC integrează patru complexe de detecție masive, optimizate pentru achiziția de date în regim real la rate de evenimente de ordinul megahertzi-lor:",
        det_atlas: "ATLAS:", desc_atlas: "Detector generalist masiv, caută bosonul Higgs, dimensiuni suplimentare și particule de materie întunecată.",
        det_cms: "CMS:", desc_cms: "Compact Muon Solenoid. Are aceleași scopuri ca ATLAS dar folosește soluții tehnice diferite (magneți diferiți).",
        det_alice: "ALICE:", desc_alice: "Specializat în coliziuni de ioni grei (Plumb-Plumb) pentru a studia plasma quark-gluon.",
        det_lhcb: "LHCb:", desc_lhcb: "Studiază asimetria dintre materie și antimaterie analizând particulele care conțin quarcul 'beauty' (bottom).",
        info_glossary: "Glosar Termeni",
        info_timeline: "Cronologie Descoperiri",
        info_bigbang: "Big Bang & Universul Timpuriu",
        info_bigbang_desc: "Faza timpurie a evoluției cosmice a fost caracterizată de o stare de densitate și temperatură extreme, dominată de plasmă quark-gluon. Expansiunea adiabatică a condus la răcirea Universului și la nucleosinteza primordială.",
        term_planck: "Era Planck:", desc_planck: "Primele momente (până la 10⁻⁴³ s). Fizica actuală nu poate descrie această perioadă.",
        term_inflation: "Inflația:", desc_inflation: "O expansiune exponențială rapidă a spațiului.",
        term_nucleosynthesis: "Nucleosinteza:", desc_nucleosynthesis: "Formarea primelor nuclee atomice (hidrogen, heliu) în primele minute.",
        info_dark: "Materie & Energie Întunecată",
        info_dark_desc: "Analiza rotației galactice și a radiației cosmice de fond confirmă faptul că materia vizibilă este minoritară. Componentele dominante, materia întunecată (27%) și energia întunecată (68%), dictează expansiunea accelerată a spațiu-timpului.",
        term_dark_matter: "Materia Întunecată:", desc_dark_matter: "O formă de materie care nu emite, nu absoarbe și nu reflectă lumina, fiind detectabilă doar prin efectele sale gravitaționale asupra stelelor și galaxiilor.",
        term_dark_energy: "Energia Întunecată:", desc_dark_energy: "O forță misterioasă care pătrunde în tot spațiul și acționează ca o presiune negativă, provocând expansiunea accelerată a întregului Univers.",
        info_antimatter_susy: "Antimaterie & Supersimetrie",
        memory_title: "Joc de Memorie: Particule", memory_btn_start: "Start Joc", memory_moves: "Mutări:", memory_time: "Timp:", memory_win: "Felicitări! Ai găsit toate perechile!",
        info_antimatter: "Antimaterie",
        info_antimatter_desc: "Antimateria este 'imaginea în oglindă' a materiei obișnuite. Fiecare particulă elementară are un corespondent cu aceeași masă, dar sarcină electrică inversă (ex: pozitronul pentru electron). Când materia și antimateria se întâlnesc, ele se anihilează reciproc instantaneu, transformându-și întreaga masă în energie pură sub formă de fotoni gamma.",
        info_supersymmetry: "Supersimetrie (SUSY)",
        info_supersymmetry_desc: "Supersimetria este o extensie ipotetică a Modelului Standard care sugerează că fiecare particulă cunoscută are un 'super-partener' cu spin diferit (ex: selectronul pentru electron). Această teorie ar putea rezolva problema ierarhiei în fizică și oferă cel mai plauzibil candidat pentru materia întunecată: neutralino.",
        memory_start_prompt: "Apasă Start pentru a începe",
        collider_live_feed: "LIVE FEED // DETECTORUL ATLAS",
        mass: "Masă",
        charge: "Sarcină",
        spin: "Spin",
        generation: "Generație",
        composition: "Compoziție",
        share_success: "Detalii copiate în clipboard!",
        share_title: "Partajează",
        quiz_title: "Quiz Particule",
        quiz_intro: "Testează-ți cunoștințele despre Modelul Standard!",
        quiz_btn_start: "ÎNCEPE QUIZ",
        quiz_completed: "Quiz Finalizat!",
        quiz_btn_restart: "Încearcă din nou",
        quiz_score: "Scor: ",
        quiz_leaderboard: "Clasament Local",
        quiz_no_scores: "Niciun scor înregistrat.",
        quiz_clear_scores: "Șterge Istoricul",
        quiz_export_csv: "Exportă CSV",
        quiz_export_csv_success: "Clasamentul a fost exportat în CSV!",
        quiz_btn_quit: "RENUNȚĂ",
        quiz_btn_home: "Înapoi la Meniu",
        quiz_date: "Dată",
        quiz_q_symbol: "Care particulă are simbolul {0}?",
        view_core_data: "VEZI DATE NUCLEU",
        analysis_lore: "Analiză Lore",
        field_classification: "Clasificare Câmp",
        confirmed: "Confirmat",
        candidate_photon: "Candidat Foton",
        candidate_muon: "Candidat Muon",
        candidate_jet: "Jet de Hadroni",
        candidate_higgs: "Boson Higgs",
        candidate_top: "Candidat Quarc Top",
        candidate_photon: "Candidat Foton",
        candidate_muon: "Candidat Muon",
        candidate_jet: "Jet de Hadroni",
        quiz_q_type: "Ce tip de particulă este {0}?",
        quiz_q_charge: "Care este sarcina electrică a {0}?",
        quiz_q_symbol: "Care particulă are simbolul {0}?",
        quiz_score_label: "Scor",
        awaiting_data: "Se așteaptă date de coliziune...",
        // Dynamic Logs & Terms
        term_sys_init: "> Sistem inițializat...",
        search_placeholder: "Caută particulă...",
        lab_btn_clear: "Resetează",
        lab_trash_title: "Trageți un quarc aici pentru a-l șterge",
        lab_synthesis_error_shake: "Eroare de sinteză!",
        collider_download_csv: "Exportă Date (CSV)",
        lab_synthesis_success: "SINTEZĂ REUȘITĂ!",
        lab_synthesis_created: "Ai creat:",
        lab_synthesis_fail: "Eșec. Combinație instabilă.",
        term_wait_input: "> Se așteaptă comenzi...",
        term_error_beam: "Eroare: Fasciculele nu sunt configurate corect.",
        term_exp_running: "RULARE EXPERIMENT...",
        term_init_collision: "Inițializare coliziune:",
        term_sim_exp: "Simulare experiment celebru:",
        term_target_energy: "Energie Țintă:",
        term_signal_detected: "Detectat semnal la",
        term_historic_result: "!!! REZULTAT ISTORIC SIMULAT !!!",
        term_rare_higgs: "!!! EVENIMENT RAR: BOSONUL HIGGS A FOST DETECTAT !!!",
        term_analysis_5sigma: "Analiză date: Semnificație 5-sigma.",
        term_storage_tier0: "Stocare date în Tier-0.",
        term_significant_event: "Eveniment semnificativ. Date colectate.",
        term_standard_collision: "Coliziune standard. Zgomot de fond.",
        term_exp_finished: "Experiment finalizat. Ciclu de răcire inițiat.",
        analyzing_debris: "Analiză resturi...",
        
        beam_injection: "INJECȚIE FASCICUL...",
        collision_detected: "COLIZIUNE DETECTATĂ",
        data_acquisition_complete: "ACHIZIȚIE DE DATE COMPLETĂ",
        system_ready: "SISTEM PREGĂTIT / READY",
        mass_suffix: "/c²",
        // Info Lists
        term_quarks: "Quarcuri:", desc_quarks: "Fermioni fundamentali purtători de sarcină de culoare, supuși legii confinării cromatice și constituenți primari ai hadronilor.",
        term_leptons: "Leptoni:", desc_leptons: "Clasă de particule elementare de spin 1/2 care nu participă la interacțiunea tare (ex: electronul și neutrinii).",
        term_bosons: "Bosoni:", desc_bosons: "Cuante ale câmpurilor de calibru care mediază interacțiunile fundamentale între particulele de materie.",
        term_strong_force: "Interacțiunea Tare:", desc_strong_force_1: "Forța care asigură coeziunea quark-urilor în nucleoni. Este guvernată de simetria SU(3) și este mediată de", term_gluons: "gluoni",
        term_em_force: "Interacțiunea Electromagnetică:", desc_em_force_1: "Forța ce cuplează particulele cu sarcină electrică, responsabilă pentru structura atomică și procesele chimice. Mediată de", term_photons: "fotoni",
        term_weak_force: "Interacțiunea Slabă:", desc_weak_force_1: "Interacțiune responsabilă pentru procesele de schimbare a aromei fermionice și radioactivitatea beta. Este mediată de", term_w_z_bosons: "bosonii vectoriali masivi W și Z",
        term_gravity: "Gravitația:", desc_gravity: "Cea mai slabă forță. Particula sa ipotetică, gravitonul, nu a fost încă descoperită.",
        unit_ev: "eV (Electronvolt)", desc_ev: "Unitatea standard de energie în fizica particulelor, echivalentă cu energia cinetică a unui electron accelerat printr-o diferență de potențial de 1 volt.",
        unit_multiples: "Multipli: MeV (10⁶), GeV (10⁹), TeV (10¹²)",
        unit_c: "c (Viteza luminii)", desc_c: "În unități naturale, c=1, permițând exprimarea masei direct în unități de energie (eV) conform echivalenței E=mc².",
        unit_b: "b (Barn)", desc_b: "Unitate de arie (10⁻²⁸ m²) care definește probabilitatea de interacțiune între particule (secțiunea eficace).",
        unit_l: "L (Luminositate)", desc_l: "Capacitatea acceleratorului de a produce coliziuni. Se măsoară prin rata de evenimente pe unitatea de suprafață și timp.",
        term_hadron: "Hadron:", desc_hadron: "Particulă compusă din quarci (ex: proton, neutron, pion).",
        term_fermion: "Fermion:", desc_fermion: "Particulă cu spin semi-întreg (materie).",
        term_boson_glossary: "Boson:", desc_boson_glossary: "Particulă cu spin întreg (purtător de forță).",
        term_antimatter: "Antimaterie:", desc_antimatter: "Materie compusă din antiparticule (masă identică, sarcină opusă).",
        term_spin: "Spin:", desc_spin: "Moment cinetic intrinsec, o formă fundamentală de impuls unghiular cuantic, independentă de mișcarea orbitală.",
        info_generations: "Generațiile de Materie",
        desc_generations_1: "Materia este organizată ierarhic în trei familii sau 'generații'. Deși proprietățile lor cuantice sunt aproape identice, masa lor crește dramatic de la o generație la alta:",
        term_gen1: "Generația 1:",
        desc_gen1: "Lumea stabilă. Conține quarcurile Up și Down, electronul și neutrino-ul electronic. Această generație formează 99% din materia vizibilă a Universului.",
        term_gen2: "Generația 2:",
        desc_gen2: "Materia efemeră. Include quarcurile Charm și Strange, muonul și neutrino-ul muonic. Aceste particule pot fi create doar în medii cu energie înaltă.",
        term_gen3: "Generația 3:",
        desc_gen3: "Greii Universului. Conține quarcurile Top și Bottom, particula Tau și neutrino-ul tauonic. Sunt extrem de masive și se dezintegrează aproape instantaneu.",
    },
    en: {
        app_title: "QEDit",
        nav_catalog: "CATALOG",
        nav_lab: "LAB",
        nav_collider: "COLLIDER",
        nav_info: "INFO",
        nav_other: "OTHER FUNCTIONS",
        catalog_title: "Standard Model Catalog",
        lab_title: "Hadron Reactor",
        lab_synthesis: "Particle Synthesis",
        lab_available: "Available Quarks for Synthesis:",
        lab_btn_synthesize: "SYNTHESIZE",
        lab_recipes: "Known Recipes",
        collider_title: "LHC - Control Unit",
        collider_controls: "Operational Parameters",
        collider_mode: "Simulation Mode",
        collider_experiments: "Historical Experiments",
        collider_beam: "Beam Configuration",
        collider_beam1: "Beam 1",
        collider_beam2: "Beam 2",
        collider_energy: "Center of Mass Energy (TeV)",
        collider_mag: "Magnetic Field:",
        collider_temp: "Temperature:",
        collider_lumi: "Luminosity:",
        collider_rate: "Collision Rate:",
        collider_events: "Events:",
        collider_cross: "Cross Section:",
        collider_eff: "Efficiency:",
        collider_btn_init: "ENGAGE COLLISION",
        collider_btn_simulate: "LOAD PARAMETERS",
        collider_terminal: "CONSOLE OUTPUT",
        collider_data: "Data Stream",
        collider_particle_id: "Automated Particle ID",
        info_title: "Scientific Documentation Center",
        info_search_placeholder: "Search documentation...",
        info_tab_model: "Standard Model",
        info_tab_dynamics: "Forces & Matter",
        info_tab_ref: "Glossary & Units",
        info_tab_history: "Timeline",
        info_model: "Standard Model",
        other_title: "Additional Functions",
        compare_title: "Compare Particles",
        compare_select_1: "Select Particle 1",
        compare_select_2: "Select Particle 2",
        compare_btn: "COMPARE",
        compare_export_pdf: "Export PDF",
        compare_property: "Property",
        name_label: "Name",
        symbol_label: "Symbol",
        chart_mass: "Mass (Log eV)",
        chart_charge: "Charge",
        chart_spin: "Spin",
        chart_generation: "Generation",
        type_label: "Type",
        info_model_desc: "The Standard Model is the crown jewel of modern physics, a quantum field theory that explains with incredible precision how subatomic particles interact. It classifies matter into fermions (quarks and leptons) and forces into gauge bosons. Although the most successful scientific theory in history, it remains incomplete as it does not yet integrate gravity or account for dark matter.",
        info_lab: "Lab Guide",
        info_lab_desc: "In the lab area you can synthesize hadrons (baryons) by combining quarks. Use the available slots to test recipes. Baryons are made of 3 quarks and must have a neutral (white) color charge to exist in nature.",
        info_lab_hint: "Click on a recipe on the right to see details about the resulting composite particle.",
        info_forces: "Fundamental Interactions",
        info_forces_desc: "The universe is not just a collection of particles, but a complex web of interactions. These four fundamental forces dictate everything from the structure of atoms to the formation of galaxies:",
        info_collider: "Collider & Detectors",
        info_collider_desc: "The simulator accelerates particles to speeds close to that of light (99.9999991% c) and collides them. The collision energy transforms into mass (E=mc²), creating new, often unstable particles detected before they decay.",
        info_collider_hint: "The displayed data (Luminosity, Rate, etc.) are performance indicators of the accelerator, simulating the complexity of a real experiment.",
        info_units: "Units of Measurement in Particle Physics",
        info_detectors: "Main LHC Detectors",
        info_detectors_desc: "Four giant detectors are located at the intersection points of the LHC ring. They act like ultra-fast 3D cameras:",
        det_atlas: "ATLAS:", desc_atlas: "Massive general-purpose detector, searching for the Higgs boson, extra dimensions, and dark matter particles.",
        det_cms: "CMS:", desc_cms: "Compact Muon Solenoid. Has the same goals as ATLAS but uses different technical solutions.",
        det_alice: "ALICE:", desc_alice: "Specialized in heavy-ion collisions (Lead-Lead) to study quark-gluon plasma.",
        det_lhcb: "LHCb:", desc_lhcb: "Studies the matter-antimatter asymmetry by analyzing particles containing the 'beauty' (bottom) quark.",
        info_glossary: "Glossary of Terms",
        info_timeline: "Discovery Timeline",
        info_bigbang: "Big Bang & Early Universe",
        info_bigbang_desc: "Immediately after the Big Bang, the universe was a hot soup of fundamental particles. As it cooled, complex structures formed.",
        term_planck: "Planck Era:", desc_planck: "The first moments (up to 10⁻⁴³ s). Current physics cannot describe this period.",
        term_inflation: "Inflation:", desc_inflation: "A rapid exponential expansion of space.",
        term_nucleosynthesis: "Nucleosynthesis:", desc_nucleosynthesis: "Formation of the first atomic nuclei (hydrogen, helium) in the first minutes.",
        info_dark: "Dark Matter & Dark Energy",
        info_dark_desc: "Visible universe (ordinary matter) is only 5%. The rest is dark matter (27%), which holds galaxies together gravitationally, and dark energy (68%), which accelerates the Universe's expansion.",
        term_dark_matter: "Dark Matter:", desc_dark_matter: "An invisible form of matter that does not interact with light but exerts a massive gravitational pull, holding galaxies and clusters together.",
        term_dark_energy: "Dark Energy:", desc_dark_energy: "A mysterious energy field that permeates all of space, acting as a form of anti-gravity that drives the accelerated expansion of the Universe.",
        info_antimatter_susy: "Antimatter & Supersymmetry",
        memory_title: "Particle Memory Game", memory_btn_start: "Start Game", memory_moves: "Moves:", memory_time: "Time:", memory_win: "Congratulations! You found all pairs!",
        info_antimatter: "Antimatter Dynamics",
        info_antimatter_desc: "Antimatter represents states with identical mass to corresponding particles but with inverted internal quantum numbers. Matter-antimatter interaction results in mutual annihilation, converting invariant mass into high-energy gamma photons.",
        info_supersymmetry: "Supersymmetry Framework (SUSY)",
        info_supersymmetry_desc: "Supersymmetry is a theoretical extension suggesting a symmetry between fermions and bosons. SUSY aims to resolve the hierarchy problem and provides the neutralino as a viable dark matter candidate.",
        memory_start_prompt: "Press Start to begin",
        collider_live_feed: "LIVE FEED // ATLAS DETECTOR",
        mass: "Mass",
        charge: "Charge",
        spin: "Spin",
        generation: "Generation",
        composition: "Composition",
        share_success: "Details copied to clipboard!",
        share_title: "Share",
        quiz_title: "Particle Quiz",
        quiz_intro: "Test your knowledge of the Standard Model!",
        quiz_btn_start: "START QUIZ",
        quiz_completed: "Quiz Finished!",
        quiz_btn_restart: "Try Again",
        quiz_score: "Score:",
        quiz_leaderboard: "Local Leaderboard",
        quiz_no_scores: "No scores recorded.",
        quiz_clear_scores: "Clear History",
        quiz_export_csv: "Export CSV",
        quiz_export_csv_success: "Leaderboard exported to CSV!",
        quiz_btn_quit: "QUIT",
        quiz_btn_home: "Back to Menu",
        quiz_date: "Date",
        quiz_q_symbol: "Which particle has the symbol {0}?",
        view_core_data: "VIEW CORE DATA",
        analysis_lore: "Lore Analysis",
        field_classification: "Field Classification",
        confirmed: "Confirmed",
        candidate_photon: "Photon Candidate",
        candidate_muon: "Muon Candidate",
        candidate_jet: "Hadron Jet",
        candidate_higgs: "Higgs Boson",
        candidate_top: "Top Quark",
        quiz_score_label: "Score",
        awaiting_data: "Awaiting collision data...",
        // Dynamic Logs & Terms
        term_sys_init: "> System initialized...",
        search_placeholder: "Search particle...",
        lab_btn_clear: "Clear",
        lab_trash_title: "Drag a quark here to delete it",
        lab_synthesis_error_shake: "Synthesis Error!",
        collider_download_csv: "Download Data",
        lab_synthesis_success: "SYNTHESIS SUCCESSFUL!",
        lab_synthesis_created: "You created:",
        lab_synthesis_fail: "Failure. Unstable combination.",
        term_wait_input: "> Waiting for input...",
        term_error_beam: "Error: Beams are not configured correctly.",
        term_exp_running: "EXPERIMENT IN PROGRESS...",
        term_init_collision: "Initializing collision:",
        term_sim_exp: "Simulating famous experiment:",
        term_target_energy: "Target Energy:",
        term_signal_detected: "Signal detected at",
        term_historic_result: "!!! HISTORIC RESULT SIMULATED !!!",
        term_rare_higgs: "!!! RARE EVENT: HIGGS BOSON DETECTED !!!",
        term_analysis_5sigma: "Data analysis: 5-sigma significance.",
        term_storage_tier0: "Storing data in Tier-0.",
        term_significant_event: "Significant event. Data collected.",
        term_standard_collision: "Standard collision. Background data.",
        term_exp_finished: "Experiment finished. Cooling cycle initiated.",
        analyzing_debris: "Analyzing Debris...",
        beam_injection: "BEAM INJECTION...",
        collision_detected: "COLLISION DETECTED",
        data_acquisition_complete: "DATA ACQUISITION COMPLETE",
        system_ready: "SYSTEM READY",
        mass_suffix: "",
        // Info Lists
        term_quarks: "Quarks:", desc_quarks: "Fundamental fermions carrying color charge, subject to chromatic confinement and primary constituents of hadrons.",
        term_leptons: "Leptons:", desc_leptons: "A class of spin-1/2 elementary particles that do not participate in the strong interaction (e.g., electrons and neutrinos).",
        term_bosons: "Bosons:", desc_bosons: "Gauge field quanta mediating fundamental interactions between matter particles.",
        term_strong_force: "Strong Interaction:", desc_strong_force_1: "The force ensuring quark cohesion within nucleons. It is governed by SU(3) symmetry and mediated by", term_gluons: "gluons",
        term_em_force: "Electromagnetic Interaction:", desc_em_force_1: "The force coupling particles with electric charge, responsible for atomic structure and chemical processes. Mediated by", term_photons: "photons",
        term_weak_force: "Weak Interaction:", desc_weak_force_1: "Interaction responsible for fermionic flavor-changing processes and beta radioactivity. It is mediated by", term_w_z_bosons: "massive vector W and Z bosons",
        term_gravity: "Gravity:", desc_gravity: "The weakest force. Its hypothetical particle, the graviton, has not yet been discovered.",
        unit_ev: "eV (Electronvolt)", desc_ev: "The standard energy unit in particle physics, equivalent to the kinetic energy of an electron accelerated through a 1-volt potential difference.",
        unit_multiples: "Multiples: MeV (10⁶), GeV (10⁹), TeV (10¹²)",
        unit_c: "c (Speed of Light)", desc_c: "Particle mass is often expressed in eV/c² (per E=mc²). In natural units, c=1, so mass is expressed directly in eV.",
        unit_b: "b (Barn)", desc_b: "Unit of area used for cross-section (probability of collision). 1 b = 10⁻²⁸ m².",
        unit_l: "L (Luminosity)", desc_l: "The ability of the accelerator to produce collisions. Measured by event rate per unit area and time.",
        term_hadron: "Hadron:", desc_hadron: "Particle composed of quarks (e.g., proton, neutron, pion).",
        term_fermion: "Fermion:", desc_fermion: "Particle with half-integer spin (matter).",
        term_boson_glossary: "Boson:", desc_boson_glossary: "Particle with integer spin (force carrier).",
        term_antimatter: "Antimatter:", desc_antimatter: "Matter composed of antiparticles (identical mass, opposite charge).",
        term_spin: "Spin:", desc_spin: "Intrinsic angular momentum, a fundamental quantum property independent of orbital motion.",
        info_generations: "Generations of Matter",
        desc_generations_1: "Matter is hierarchically organized into three generations. While their quantum numbers are nearly identical, their mass scales increase dramatically between families:",
        term_gen1: "Generation 1:",
        desc_gen1: "The stable world. Contains Up/Down quarks and the electron. This generation makes up nearly all the visible matter in the Universe.",
        term_gen2: "Generation 2:",
        desc_gen2: "Ephemeral matter. Includes Charm/Strange quarks and the muon. These particles are typically only produced in high-energy environments.",
        term_gen3: "Generation 3:",
        desc_gen3: "The heavyweights. Contains the Top/Bottom quarks and the Tau. These are extremely massive and decay almost instantly.",
    },
    fr: {
        app_title: "QEDit",
        nav_catalog: "CATALOGUE",
        nav_lab: "LABO",
        nav_collider: "COLLISIONNEUR",
        nav_info: "INFO",
        nav_other: "EXTRAS",
        catalog_title: "Catalogue du Modèle Standard",
        lab_title: "Réacteur de Hadrons",
        lab_synthesis: "Synthèse de Particules",
        lab_available: "Quarks Disponibles :",
        lab_btn_synthesize: "SYNTHÉTISER",
        lab_recipes: "Recettes Connues",
        collider_title: "LHC - Unité de Contrôle",
        collider_controls: "Paramètres Opérationnels",
        collider_mode: "Mode de Simulation",
        collider_experiments: "Expériences Historiques",
        collider_beam: "Configuration du Faisceau",
        collider_beam1: "Faisceau 1",
        collider_beam2: "Faisceau 2",
        collider_energy: "Énergie dans le centre de masse (TeV)",
        collider_mag: "Champ magnétique :",
        collider_temp: "Température :",
        collider_lumi: "Luminosité :",
        collider_rate: "Taux de collision :",
        collider_events: "Événements :",
        collider_cross: "Section Efficace:",
        collider_eff: "Efficacité:",
        collider_btn_init: "LANCER LA COLLISION",
        collider_btn_simulate: "CHARGER PARAMÈTRES",
        collider_terminal: "SORTIE CONSOLE",
        collider_data: "Flux de Données",
        collider_particle_id: "Identification Automatisée des Particules",
        info_title: "Centre de Documentation Scientifique",
        info_search_placeholder: "Rechercher dans la documentation...",
        info_tab_model: "Modèle Standard",
        info_tab_dynamics: "Forces & Materie",
        info_tab_ref: "Glossaire & Unités",
        info_tab_history: "Chronologie",
        info_model: "Modèle Standard",
        other_title: "Fonctions Supplémentaires",
        compare_title: "Comparer Particules",
        compare_select_1: "Sélectionner Particule 1",
        compare_select_2: "Sélectionner Particule 2",
        compare_btn: "COMPARER",
        compare_export_pdf: "Exporter PDF",
        compare_property: "Propriété",
        name_label: "Nom",
        symbol_label: "Symbole",
        chart_mass: "Masse (Log eV)",
        chart_charge: "Charge",
        chart_spin: "Spin",
        chart_generation: "Génération",
        type_label: "Type",
        info_model_desc: "Le Modèle Standard constitue le fondement théorique de la physique des particules, intégrant les symétries de jauge SU(3)xSU(2)xU(1). Il systématise la matière en générations fermioniques et les vecteurs de force en bosons vectoriels, décrivant précisément le mécanisme de Brout-Englert-Higgs.",
        info_lab: "Protocoles de Laboratoire",
        info_lab_desc: "La synthèse des hadrons dans cet environnement contrôlé respecte les principes de la chromodynamique quantique. Les états liés baryoniques ne sont stables que s'ils satisfont à la condition de neutralité chromatique (singulet de couleur).",
        info_lab_hint: "Cliquez sur une recette à droite pour voir les détails sur la particule composite résultante.",
        info_forces: "Interactions Fondamentales",
        info_forces_desc: "Les interactions entre les constituants de la matière sont médiatisées par des bosons de jauge vectoriels, définissant la structure de l'Univers à l'échelle subatomique :",
        info_collider: "Systèmes d'Accélération et de Détection",
        info_collider_desc: "Le Large Hadron Collider (LHC) accélère des faisceaux hadroniques à des énergies ultra-relativistes. Au vertex de collision, la densité d'énergie permet la production de paires de particules lourdes détectées par ATLAS ou CMS.",
        info_collider_hint: "Les indicateurs de performance (Luminosité, Section Efficace) reflètent les paramètres réels d'une exploitation à l'échelle du TeV.",
        info_units: "Système d'Unités en Physique des Hautes Énergies",
        info_detectors: "Détecteurs Principaux du LHC",
        info_detectors_desc: "L'architecture du LHC intègre quatre complexes de détection majeurs, chacun optimisé pour des objectifs physiques spécifiques :",
        det_atlas: "ATLAS :", desc_atlas: "Détecteur hermétique polyvalent, optimisé pour la découverte de nouveaux processus physiques, incluant l'étude du boson de Higgs et la recherche de particules supersymétriques.",
        det_cms: "CMS :", desc_cms: "Solénoïde Compact à Muons ; utilise un aimant solénoïde de grande puissance pour des mesures précises de l'impulsion des muons.",
        det_alice: "ALICE :", desc_alice: "Système spécialisé dans l'étude des interactions d'ions lourds, visant à caractériser le plasma quark-gluon et les transitions de phase nucléaire.",
        det_lhcb: "LHCb :", desc_lhcb: "Détecteur dédié à la physique des quarks 'B', investiguant la violation de la symétrie CP et l'asymétrie matière-antimatière.",
        info_glossary: "Index Terminologique",
        info_timeline: "Chronologie des Découvertes",
        info_bigbang: "Big Bang & Univers Primitif",
        info_bigbang_desc: "L'évolution primordiale du cosmos a été dominée par des processus de densité et température extrêmes, où les interactions fondamentales étaient unifiées.",
        term_planck: "Ère de Planck :", desc_planck: "Intervalle temporel t < 10⁻⁴³ s, où les effets de la gravité quantique deviennent dominants, dépassant les limites du Modèle Standard actuel.",
        term_inflation: "Inflation :", desc_inflation: "Une expansion exponentielle rapide de l'espace.",
        term_nucleosynthesis: "Nucléosynthèse :", desc_nucleosynthesis: "Formation des premiers noyaux atomiques (hydrogène, hélium) dans les premières minutes.",
        info_dark: "Cosmologie : Matière et Énergie Noire",
        info_dark_desc: "L'analyse gravitationnelle des structures à grande échelle indique que la matière baryonique ne représente qu'une fraction mineure de la densité d'énergie de l'Univers.",
        term_dark_matter: "Matière Noire :", desc_dark_matter: "Matière non-baryonique identifiée par les anomalies des courbes de rotation galactique ; elle ne participe pas aux interactions électromagnétiques.",
        term_dark_energy: "Énergie Noire :", desc_dark_energy: "Composante uniforme de l'espace exerçant une pression négative, responsable de l'expansion accélérée de l'Univers.",
        info_antimatter_susy: "Antimatière & Supersymétrie",
        memory_title: "Jeu de Mémoire : Particules", memory_btn_start: "Commencer", memory_moves: "Coups :", memory_time: "Temps :", memory_win: "Félicitations ! Vous avez trouvé toutes les paires !",
        info_antimatter: "Dynamique de l'Antimatière",
        info_antimatter_desc: "L'antimatière représente des états de masse identique mais de parité de charge inversée. L'interaction matière-antimatière résulte en une annihilation mutuelle, convertissant la masse invariante en photons gamma de haute énergie.",
        info_supersymmetry: "Cadre de la Supersymétrie (SUSY)",
        info_supersymmetry_desc: "La supersymétrie est une extension théorique suggérant une symétrie entre fermions et bosons. SUSY vise à résoudre le problème de hiérarchie et propose le neutralino comme candidat viable pour la matière noire.",
        memory_start_prompt: "Appuyez sur Commencer pour débuter",
        collider_live_feed: "FLUX EN DIRECT // DÉTECTEUR ATLAS",
        mass: "Masse",
        charge: "Charge",
        spin: "Spin",
        generation: "Génération",
        composition: "Composition",
        share_success: "Détails copiés dans le presse-papier !",
        share_title: "Partager",
        quiz_title: "Quiz Particules",
        quiz_intro: "Testez vos connaissances sur le Modèle Standard !",
        quiz_btn_start: "COMMENCER LE QUIZ",
        quiz_completed: "Quiz Terminé !",
        quiz_btn_restart: "Réessayer",
        quiz_score: "Score :",
        quiz_q_type: "Quel type de particule est {0} ?",
        quiz_q_charge: "Quelle est la charge électrique de {0} ?",
        quiz_q_symbol: "Quelle particule a le symbole {0} ?",
        quiz_leaderboard: "Classement Local",
        quiz_no_scores: "Aucun score enregistré.",
        quiz_clear_scores: "Effacer l'historique",
        quiz_export_csv: "Exporter CSV",
        quiz_export_csv_success: "Classement exporté en CSV !",
        quiz_btn_quit: "QUITTER",
        quiz_btn_home: "Retour au menu",
        quiz_date: "Date",
        view_core_data: "VOIR DONNÉES CORPUS",
        analysis_lore: "Analyse du Savoir",
        field_classification: "Classification du Champ",
        confirmed: "Confirmé",
        candidate_photon: "Candidat Photon",
        candidate_muon: "Candidat Muon",
        candidate_jet: "Jet de Hadrons",
        candidate_higgs: "Boson de Higgs",
        candidate_top: "Quark Top",
        candidate_photon: "Candidat Photon",
        candidate_muon: "Candidat Muon",
        candidate_jet: "Jet de Hadrons",
        quiz_q_type: "Quel type de particule est {0} ?",
        quiz_q_charge: "Quelle est la charge électrique de {0} ?",
        quiz_q_symbol: "Quelle particule a le symbole {0} ?",
        quiz_score_label: "Score",
        awaiting_data: "En attente des données de collision...",
        // Dynamic Logs & Terms
        term_sys_init: "> Système initialisé...",
        search_placeholder: "Chercher une particule...",
        lab_btn_clear: "Effacer",
        lab_trash_title: "Faites glisser un quark ici pour le supprimer",
        lab_synthesis_error_shake: "Erreur de synthèse !",
        collider_download_csv: "Télécharger Données",
        lab_synthesis_success: "SYNTHÈSE RÉUSSIE !",
        lab_synthesis_created: "Vous avez créé :",
        lab_synthesis_fail: "Échec. Combinaison instable.",
        term_wait_input: "> En attente de commandes...",
        term_error_beam: "Erreur : Les faisceaux ne sont pas configurés correctement.",
        term_exp_running: "EXPÉRIENCE EN COURS...",
        term_init_collision: "Initialisation de la collision :",
        term_sim_exp: "Simulation d'une expérience célèbre :",
        term_target_energy: "Énergie cible :",
        term_signal_detected: "Signal détecté à",
        term_historic_result: "!!! RÉSULTAT HISTORIQUE SIMULÉ !!!",
        term_rare_higgs: "!!! ÉVÉNEMENT RARE : BOSON DE HIGGS DÉTECTÉ !!!",
        term_analysis_5sigma: "Analyse des données : signification 5 sigma.",
        term_storage_tier0: "Stockage des données dans le Tier-0.",
        term_significant_event: "Événement significatif. Données collectées.",
        term_standard_collision: "Collision standard. Données de fond.",
        term_exp_finished: "Expérience terminée. Cycle de refroidissement initié.",
        analyzing_debris: "Analyse des débris...",
        
        beam_injection: "INJECTION DU FAISCEAU...",
        collision_detected: "COLLISION DÉTECTÉE",
        data_acquisition_complete: "ACQUISITION DE DONNÉES TERMINÉE",
        system_ready: "SYSTÈME PRÊT",
        mass_suffix: "/c²",
        // Info Lists
        term_quarks: "Quarks :", desc_quarks: "Fermions fondamentaux porteurs de charge de couleur, soumis au confinement chromatique et constituants primaires des hadrons.",
        term_leptons: "Leptons :", desc_leptons: "Classe de particules élémentaires de spin 1/2 ne participant pas à l'interaction forte (ex : électrons, neutrinos).",
        term_bosons: "Bosons :", desc_bosons: "Quanta des champs de jauge médiatisant les interactions fondamentales entre particules de matière.",
        term_strong_force: "Interaction Forte :", desc_strong_force_1: "La force assurant la cohésion des quarks dans les nucléons. Elle est gouvernée par la symétrie SU(3) et médiatisée par les", term_gluons: "gluons",
        term_em_force: "Interaction Électromagnétique :", desc_em_force_1: "Force couplant les particules chargées, responsable de la structure atomique et des processus chimiques. Médiatisée par les", term_photons: "photons",
        term_weak_force: "Interaction Faible :", desc_weak_force_1: "Interaction responsable des processus de changement de saveur fermionique et de la radioactivité bêta. Médiatisée par les", term_w_z_bosons: "bosons vectoriels massifs W et Z",
        term_gravity: "Gravité :", desc_gravity: "La force la plus faible. Sa particule hypothétique, le graviton, n'a pas encore été découverte.",
        unit_ev: "eV (Électron-volt)", desc_ev: "L'unité standard d'énergie à l'échelle atomique, équivalente à l'énergie cinétique d'un électron accéléré par une différence de potentiel de 1 volt.",
        unit_multiples: "Multiples : MeV (10⁶), GeV (10⁹), TeV (10¹²)",
        unit_c: "c (Vitesse de la lumière)", desc_c: "La masse des particules est souvent exprimée en eV/c² (selon E=mc²). En unités naturelles, c=1, donc la masse est exprimée directement en eV.",
        unit_b: "b (Barn)", desc_b: "Unité de surface (10⁻²⁸ m²) définissant la probabilité d'interaction entre les particules (section efficace).",
        unit_l: "L (Luminosité)", desc_l: "Capacité de l'accélérateur à produire des collisions. Mesurée par le taux d'événements par unité de surface et de temps.",
        term_hadron: "Hadron :", desc_hadron: "Particule composée de quarks (ex: proton, neutron, pion).",
        term_fermion: "Fermion :", desc_fermion: "Particule de spin demi-entier (matière).",
        term_boson_glossary: "Boson :", desc_boson_glossary: "Particule de spin entier (porteur de force).",
        term_antimatter: "Antimatière :", desc_antimatter: "Matière composée d'antiparticules (masse identique, charge opposée).",
        term_spin: "Spin :", desc_spin: "Moment cinétique intrinsèque, une propriété quantique fondamentale indépendante du mouvement orbital.",
        info_generations: "Générations de Matière",
        desc_generations_1: "La matière est organisée hiérarchiquement en trois générations. Bien que leurs nombres quantiques soient identiques, leurs échelles de masse augmentent drastiquement :",
        term_gen1: "Génération 1 :",
        desc_gen1: "La matière stable. Elle compose la quasi-totalité de l'Univers visible (atomes).",
        term_gen2: "Génération 2 :",
        desc_gen2: "La matière éphémère. Créée dans des environnements à haute énergie, elle se désintègre rapidement.",
        term_gen3: "Génération 3 :",
        desc_gen3: "Les poids lourds. Particules extrêmement massives et hautement instables.",
    }
};

// Data: Standard Model
let particles = [];

// NEW: Category Information
const categoryInfo = {
    Quark: {
        name: { ro: "Quarcuri", en: "Quarks", fr: "Quarks" },
        desc: {
            ro: "Quarcurile sunt fermioni elementari cu sarcină fracționară și culoare. Aceștia se asociază sub acțiunea grupului de simetrie SU(3) pentru a forma stări legate numite hadroni. Confinarea cromatică interzice existența lor în stare liberă la scări de energie joasă.",
            en: "Quarks are elementary fermions carrying fractional electric charge and color charge. They associate under the SU(3) symmetry group to form hadronic bound states. Chromatic confinement prohibits their existence as free particles at low energy scales.",
            fr: "Les quarks sont des fermions élémentaires possédant une charge électrique fractionnaire et une charge de couleur. Ils s'associent sous le groupe de symétrie SU(3) pour former des hadrons. Le confinement chromatique interdit leur existence à l'état libre à basse énergie."
        },
        icon: "fa-cube",
        color: "text-purple-400"
    },
    Lepton: {
        name: { ro: "Leptoni", en: "Leptons", fr: "Leptons" },
        desc: {
            ro: "Leptonii sunt o clasă de fermioni elementari care nu sunt supuși interacțiunii tari. Familia include electronul, muonul, tauonul și neutrinii corespondenți, ultimii interacționând exclusiv prin curentul slab și gravitație.",
            en: "Leptons are a class of elementary fermions decoupled from the strong interaction. The family includes the electron, muon, tau, and their respective neutrinos, the latter interacting exclusively via weak currents and gravity.",
            fr: "Les leptons sont une classe de fermions élémentaires non soumis à l'interaction forte. La famille inclut l'électron, le muon, le tau et leurs neutrinos respectifs, ces derniers n'interagissant que par courant faible et gravitation."
        },
        icon: "fa-wave-square",
        color: "text-green-400"
    },
    Boson: {
        name: { ro: "Bosoni", en: "Bosons", fr: "Bosons" },
        desc: {
            ro: "Bosonii vectoriali sunt purtătorii de forță ai Modelului Standard. Fotonul mediază câmpul electromagnetic, gluonul forța tare, iar bosonii W/Z forța slabă. Bosonul Higgs este responsabil de generarea masei fundamentale prin mecanismul de rupere a simetriei.",
            en: "Vector bosons are the force carriers of the Standard Model. The photon mediates the EM field, the gluon the strong force, and the W/Z bosons the weak force. The Higgs boson generates fundamental mass through the symmetry-breaking mechanism.",
            fr: "Les bosons vectoriels sont les porteurs de force du Modèle Standard. Le photon médiatise le champ EM, le gluon l'interaction forte, et les bosons W/Z l'interaction faible. Le boson de Higgs génère la masse via le mécanisme de brisure de symétrie."
        },
        icon: "fa-bezier-curve",
        color: "text-red-400"
    },
    Baryon: {
        name: { ro: "Barioni", en: "Baryons", fr: "Baryons" },
        desc: {
            ro: "Barionii sunt hadroni compuși dintr-un număr impar de quarcuri (de regulă trei). Aceștia sunt fermioni și includ protonii și neutronii.",
            en: "Baryons are composite hadrons consisting of an odd number of quarks (usually three). They are fermions and include protons and neutrons.",
            fr: "Les baryons sont des hadrons composites constitués d'un nombre impair de quarks (généralement trois). Ce sont des fermions et incluent les protons et les neutrons."
        },
        icon: "fa-circle-nodes",
        color: "text-amber-400"
    },
    Meson: {
        name: { ro: "Mezoni", en: "Mesons", fr: "Mesons" },
        desc: {
            ro: "Mezonii sunt hadroni compuși dintr-o pereche quarc-antiquarc. Fiind particule cu spin întreg, aceștia sunt clasificați ca bosoni.",
            en: "Mesons are composite hadrons made of a quark-antiquark pair. Having integer spin, they are classified as bosons.",
            fr: "Les mésons sont des hadrons composites formés d'une paire quark-antiquark. Ayant un spin entier, ils sont classés comme des bosons."
        },
        icon: "fa-binary",
        color: "text-pink-400"
    }
};

particles = particles.concat([
    // Quarks
    { id: 'u', symbol: 'u', name: 'Up Quark', type: 'Quark', generation: 1, mass: '2.2 MeV', charge: '+2/3', spin: '1/2', desc: { ro: 'Cel mai ușor quarc din prima generație. Împreună cu quarcul Down, formează protonii (uud) și neutronii (udd), elementele constitutive ale materiei stabile din Univers.', en: 'The lightest first-generation quark. Combined with the Down quark, it forms protons (uud) and neutrons (udd), the building blocks of stable matter in the Universe.', fr: 'Le quark le plus léger de la première génération. Combiné au quark Down, il forme les protons (uud) et les neutrons (udd), les briques de la matière stable de l\'Univers.' } },
    { id: 'd', symbol: 'd', name: 'Down Quark', type: 'Quark', generation: 1, mass: '4.7 MeV', charge: '-1/3', spin: '1/2', desc: { ro: 'Partenerul quarcului Up. Este puțin mai masiv decât acesta. Dezintegrarea beta a neutronului implică transformarea unui quarc Down într-unul Up.', en: 'Partner of the Up quark. Slightly more massive. Neutron beta decay involves the transformation of a Down quark into an Up quark.', fr: 'Partenaire du quark Up. Légèrement plus massif. La désintégration bêta du neutron implique la transformation d\'un quark Down en un quark Up.' } },
    { id: 'c', symbol: 'c', name: 'Charm Quark', type: 'Quark', generation: 2, mass: '1.27 GeV', charge: '+2/3', spin: '1/2', desc: { ro: 'Descoperit în 1974 ("Revoluția din Noiembrie"). Este mult mai greu decât quarcii din prima generație și se găsește în particule precum mezonul J/Psi.', en: 'Discovered in 1974 ("November Revolution"). Much heavier than first-generation quarks, found in particles like the J/Psi meson.', fr: 'Découvert en 1974 ("Révolution de Novembre"). Beaucoup plus lourd que les quarks de première génération, trouvé dans des particules comme le méson J/Psi.' } },
    { id: 's', symbol: 's', name: 'Strange Quark', type: 'Quark', generation: 2, mass: '96 MeV', charge: '-1/3', spin: '1/2', desc: { ro: 'Numit "straniu" deoarece particulele care îl conțin (kaoni) au o viață neașteptat de lungă. Este produs copios în coliziuni de energie înaltă.', en: 'Named "strange" because particles containing it (kaons) have an unexpectedly long lifetime. Produced copiously in high-energy collisions.', fr: 'Nommé "étrange" car les particules le contenant (kaons) ont une durée de vie étonnamment longue. Produit copieusement dans les collisions à haute énergie.' } },
    { id: 't', symbol: 't', name: 'Top Quark', type: 'Quark', generation: 3, mass: '173 GeV', charge: '+2/3', spin: '1/2', desc: { ro: 'Cel mai masiv quarc, cântărind cât un atom de aur. Se dezintegrează atât de repede (10^-25 s) încât nu apucă să formeze hadroni.', en: 'The most massive quark, weighing as much as a gold atom. Decays so fast (10^-25 s) that it never forms hadrons.', fr: 'Le quark le plus massif, pesant autant qu\'un atome d\'or. Se désintègre si vite (10^-25 s) qu\'il ne forme jamais de hadrons.' } },
    { id: 'b', symbol: 'b', name: 'Bottom Quark', type: 'Quark', generation: 3, mass: '4.18 GeV', charge: '-1/3', spin: '1/2', desc: { ro: 'Esențial pentru studiul violării CP (diferența subtilă dintre materie și antimaterie). Hadronii cu "bottom" sunt studiați intens la detectorul LHCb.', en: 'Essential for studying CP violation (the subtle difference between matter and antimatter). "Bottom" hadrons are studied intensely at the LHCb detector.', fr: 'Essentiel pour étudier la violation CP (la différence subtile entre matière et antimatière). Les hadrons "Bottom" sont étudiés intensément au détecteur LHCb.' } },
     // Leptons
    { id: 'e', symbol: 'e<sup>-</sup>', name: 'Electron', type: 'Lepton', generation: 1, mass: '0.511 MeV', charge: '-1', spin: '1/2', desc: { ro: 'Lepton stabil care orbitează nucleul atomic. Responsabil pentru chimie și electricitate. Este un fermion fundamental.', en: 'Stable lepton orbiting the atomic nucleus. Responsible for chemistry and electricity. It is a fundamental fermion.', fr: 'Lepton stable orbitant autour du noyau atomique. Responsable de la chimie et de l\'électricité. C\'est un fermion fondamental.' } },
    { id: 've', symbol: '&nu;<sub>e</sub>', name: 'Electron Neutrino', type: 'Lepton', generation: 1, mass: '< 2.2 eV', charge: '0', spin: '1/2', desc: { ro: 'Partenerul neutru al electronului. Are o masă extrem de mică și interacționează foarte slab cu materia, putând traversa pământul fără a fi oprit.', en: 'The neutral partner of the electron. It has an extremely small mass and interacts very weakly with matter, being able to pass through the Earth without being stopped.', fr: 'Le partenaire neutre de l\'électron. Il a une masse extrêmement faible et interagit très faiblement avec la matière, pouvant traverser la Terre sans être arrêté.' } },
    { id: 'mu', symbol: '&mu;<sup>-</sup>', name: 'Muon', type: 'Lepton', generation: 2, mass: '105.7 MeV', charge: '-1', spin: '1/2', desc: { ro: 'Similar cu electronul, dar de 200 de ori mai greu. Instabil (durată 2.2 µs). Produs natural în atmosfera superioară de raze cosmice.', en: 'Similar to the electron but 200 times heavier. Unstable (lifetime 2.2 µs). Naturally produced in the upper atmosphere by cosmic rays.', fr: 'Similaire à l\'électron mais 200 fois plus lourd. Instable (durée de vie 2,2 µs). Produit naturellement dans la haute atmosphère par les rayons cosmiques.' } },
    { id: 'vmu', symbol: '&nu;<sub>&mu;</sub>', name: 'Muon Neutrino', type: 'Lepton', generation: 2, mass: '< 0.17 MeV', charge: '0', spin: '1/2', desc: { ro: 'Neutrino asociat muonului. Descoperirea sa în 1962 a demonstrat că există mai multe "arome" de neutrini.', en: 'Neutrino associated with the muon. Its discovery in 1962 demonstrated that there are multiple "flavors" of neutrinos.', fr: 'Neutrino associé au muon. Sa découverte en 1962 a démontré qu\'il existe plusieurs "saveurs" de neutrinos.' } },
    { id: 'tau', symbol: '&tau;<sup>-</sup>', name: 'Tau', type: 'Lepton', generation: 3, mass: '1.777 GeV', charge: '-1', spin: '1/2', desc: { ro: 'Cel mai greu lepton (1.77 GeV). Este singurul lepton suficient de masiv pentru a se dezintegra în hadroni.', en: 'The heaviest lepton (1.77 GeV). It is the only lepton massive enough to decay into hadrons.', fr: 'Le lepton le plus lourd (1,77 GeV). C\'est le seul lepton assez massif pour se désintégrer en hadrons.' } },
    { id: 'vtau', symbol: '&nu;<sub>&tau;</sub>', name: 'Tau Neutrino', type: 'Lepton', generation: 3, mass: '< 18.2 MeV', charge: '0', spin: '1/2', desc: { ro: 'Ultimul neutrino descoperit (anul 2000). Asociat particulei Tau. Observarea sa directă este extrem de dificilă.', en: 'The last neutrino discovered (year 2000). Associated with the Tau particle. Its direct observation is extremely difficult.', fr: 'Le dernier neutrino découvert (an 2000). Associé à la particule Tau. Son observation directe est extrêmement difficile.' } },
    // Bosons
    { id: 'g', symbol: 'g', name: 'Gluon', type: 'Boson', mass: '0', charge: '0', spin: '1', desc: { ro: 'Boson de calibru pentru forța tare. Are "sarcină de culoare" și interacționează cu sine însuși, ducând la confinarea quarcilor.', en: 'Gauge boson for the strong force. Has "color charge" and interacts with itself, leading to quark confinement.', fr: 'Boson de jauge pour la force forte. Possède une "charge de couleur" et interagit avec lui-même, conduisant au confinement des quarks.' } },
    { id: 'gamma', symbol: '&gamma;', name: 'Photon', type: 'Boson', mass: '0', charge: '0', spin: '1', desc: { ro: 'Cuanta de lumină și radiație electromagnetică. Fără masă, se deplasează cu viteza luminii. Rază de acțiune infinită.', en: 'Quantum of light and electromagnetic radiation. Massless, travels at the speed of light. Infinite range.', fr: 'Quantum de lumière et de rayonnement électromagnétique. Sans masse, voyage à la vitesse de la lumière. Portée infinie.' } },
    { id: 'w', symbol: 'W<sup>&plusmn;</sup>', name: 'W Boson', type: 'Boson', mass: '80.4 GeV', charge: '±1', spin: '1', desc: { ro: 'Boson masiv încărcat. Mediază interacțiunea slabă, permițând schimbarea "aromei" quarcilor (ex: dezintegrarea beta).', en: 'Massive charged boson. Mediates the weak interaction, allowing quark "flavor" change (e.g., beta decay).', fr: 'Boson chargé massif. Médiatise l\'interaction faible, permettant le changement de "saveur" des quarks (ex : désintégration bêta).' } },
    { id: 'z', symbol: 'Z<sup>0</sup>', name: 'Z Boson', type: 'Boson', mass: '91.2 GeV', charge: '0', spin: '1', desc: { ro: 'Partenerul neutru al bosonului W. Mediază curenții neutri slabi. Masa sa mare limitează raza de acțiune a forței slabe.', en: 'Neutral partner of the W boson. Mediates weak neutral currents. Its large mass limits the range of the weak force.', fr: 'Partenaire neutre du boson W. Médiatise les courants neutres faibles. Sa grande masse limite la portée de la force faible.' } },
    { id: 'h', symbol: 'H<sup>0</sup>', name: 'Higgs Boson', type: 'Boson', mass: '125 GeV', charge: '0', spin: '0', desc: { ro: 'Excitație a câmpului Higgs. Interacțiunea cu acest câmp conferă masă particulelor elementare. Descoperit la CERN în 2012.', en: 'Excitation of the Higgs field. Interaction with this field gives mass to elementary particles. Discovered at CERN in 2012.', fr: 'Excitation du champ de Higgs. L\'interaction avec ce champ confère la masse aux particules élémentaires. Découvert au CERN en 2012.' } },
    // Composite (for Lab validation)
    { id: 'p', symbol: 'p', name: 'Proton', type: 'Baryon', mass: '938.27 MeV', charge: '+1', spin: '1/2', composition: ['u', 'u', 'd'], desc: { ro: 'Hadron de tip barion format din doi quarci Up și un quarc Down. Este o componentă fundamentală a nucleelor atomice, fiind extrem de stabil cu o durată de viață mai mare de 10^34 ani.', en: 'A baryon-type hadron consisting of two Up quarks and one Down quark. It is a fundamental component of atomic nuclei, being extremely stable with a predicted half-life exceeding 10^34 years.', fr: 'Un hadron de type baryon composé de deux quarks Up et d\'un quark Down. C\'est un composant fondamental des noyaux atomiques, étant extrêmement stable avec une demi-vie prévue dépassant 10^34 ans.' } },
     { id: 'n', symbol: 'n', name: 'Neutron', type: 'Baryon', mass: '939.5 MeV', charge: '0', spin: '1/2', composition: ['u', 'd', 'd'], desc: { ro: 'Nucleon neutru, stabil în interiorul nucleelor atomice, dar instabil în stare liberă.', en: 'Neutral nucleon, stable inside atomic nuclei, but unstable in free state.', fr: 'Nucléon neutre, stable à l\'intérieur des noyaux atomiques, mais instable à l\'état libre.' } },
    { id: 'delta_pp', symbol: '&Delta;<sup>++</sup>', name: 'Delta++', type: 'Baryon', mass: '1232 MeV', charge: '+2', spin: '3/2', composition: ['u', 'u', 'u'], desc: { ro: 'Rezonanță barionică cu viață foarte scurtă și sarcină +2.', en: 'Very short-lived baryon resonance with +2 charge.', fr: 'Résonance baryonique à très courte durée de vie et charge +2.' } },
    { id: 'delta_m', symbol: '&Delta;<sup>-</sup>', name: 'Delta-', type: 'Baryon', mass: '1232 MeV', charge: '-1', spin: '3/2', composition: ['d', 'd', 'd'], desc: { ro: 'Rezonanță barionică formată din trei quarci down.', en: 'Baryon resonance formed of three down quarks.', fr: 'Résonance baryonique formée de trois quarks down.' } },
    { id: 'lambda', symbol: '&Lambda;<sup>0</sup>', name: 'Lambda', type: 'Baryon', mass: '1115 MeV', charge: '0', spin: '1/2', composition: ['u', 'd', 's'], desc: { ro: 'Cel mai ușor barion care conține un quarc strange. Este neutru și instabil.', en: 'The lightest baryon containing a strange quark. It is neutral and unstable.', fr: 'Le baryon le plus léger contenant un quark strange. Il est neutre et instable.' } },
    { id: 'sigma_p', symbol: '&Sigma;<sup>+</sup>', name: 'Sigma+', type: 'Baryon', mass: '1189 MeV', charge: '+1', spin: '1/2', composition: ['u', 'u', 's'], desc: { ro: 'Barion cu strangeness -1, parte dintr-un triplet de particule Sigma.', en: 'Baryon with strangeness -1, part of a Sigma particle triplet.', fr: 'Baryon avec étrangeté -1, faisant partie d\'un triplet de particules Sigma.' } },
    { id: 'xi_0', symbol: '&Xi;<sup>0</sup>', name: 'Xi0', type: 'Baryon', mass: '1314 MeV', charge: '0', spin: '1/2', composition: ['u', 's', 's'], desc: { ro: 'Barion neutru cu doi quarci strange, cunoscut și ca particula "cascadă".', en: 'Neutral baryon with two strange quarks, also known as the "cascade" particle.', fr: 'Baryon neutre avec deux quarks strange, également connu sous le nom de particule "cascade".' } },
    { id: 'omega_m', symbol: '&Omega;<sup>-</sup>', name: 'Omega-', type: 'Baryon', mass: '1672 MeV', charge: '-1', spin: '3/2', composition: ['s', 's', 's'], desc: { ro: 'Barion cu strangeness -3, a cărui existență, masă și dezintegrare au fost prezise cu succes de Murray Gell-Mann.', en: 'Baryon with strangeness -3, whose existence, mass, and decay were successfully predicted by Murray Gell-Mann.', fr: 'Baryon avec étrangeté -3, dont l\'existence, la masse et la désintégration ont été prédites avec succès par Murray Gell-Mann.' } }
]);

const discoveryTimeline = [
    { year: "1897", title: { ro: "Descoperirea Electronului", en: "Discovery of the Electron", fr: "Découverte de l'électron" }, desc: { ro: "J.J. Thomson descoperă prima particulă subatomică.", en: "J.J. Thomson discovers the first subatomic particle.", fr: "J.J. Thomson découvre la première particule subatomique." } },
    { year: "1911", title: { ro: "Nucleul Atomic", en: "Atomic Nucleus", fr: "Noyau atomique" }, desc: { ro: "Ernest Rutherford descoperă nucleul dens al atomului.", en: "Ernest Rutherford discovers the dense nucleus of the atom.", fr: "Ernest Rutherford découvre le noyau dense de l'atome." } },
    { year: "1932", title: { ro: "Descoperirea Neutronului", en: "Discovery of the Neutron", fr: "Découverte du neutron" }, desc: { ro: "James Chadwick confirmă existența neutronului.", en: "James Chadwick confirms the existence of the neutron.", fr: "James Chadwick confirme l'existence du neutron." } },
    { year: "1964", title: { ro: "Modelul Quarcilor", en: "Quark Model", fr: "Modèle des quarks" }, desc: { ro: "Gell-Mann și Zweig propun independent modelul quarcilor.", en: "Gell-Mann and Zweig independently propose the quark model.", fr: "Gell-Mann et Zweig proposent indépendamment le modèle des quarks." } },
    { year: "1974", title: { ro: "Revoluția din Noiembrie", en: "November Revolution", fr: "Révolution de novembre" }, desc: { ro: "Descoperirea mezonului J/psi confirmă existența quarcului charm.", en: "Discovery of the J/psi meson confirms the existence of the charm quark.", fr: "La découverte du méson J/psi confirme l'existence du quark charme." } },
    { year: "1983", title: { ro: "Bosonii W și Z", en: "W and Z Bosons", fr: "Bosons W et Z" }, desc: { ro: "CERN confirmă purtătorii forței slabe.", en: "CERN confirms the carriers of the weak force.", fr: "Le CERN confirme les porteurs de la force faible." } },
    { year: "1995", title: { ro: "Quarcul Top", en: "Top Quark", fr: "Quark Top" }, desc: { ro: "Fermilab descoperă cel mai masiv quarc.", en: "Fermilab discovers the most massive quark.", fr: "Fermilab découvre le quark le plus massif." } },
    { year: "2012", title: { ro: "Bosonul Higgs", en: "Higgs Boson", fr: "Boson de Higgs" }, desc: { ro: "CERN anunță descoperirea bosonului Higgs.", en: "CERN announces the discovery of the Higgs boson.", fr: "Le CERN annonce la découverte du boson de Higgs." } },
    { year: "2015", title: { ro: "Pentaquarci", en: "Pentaquarks", fr: "Pentaquarks" }, desc: { ro: "LHCb confirmă existența particulelor exotice formate din 5 quarci.", en: "LHCb confirms the existence of exotic particles made of 5 quarks.", fr: "LHCb confirme l'existence de particules exotiques composées de 5 quarks." } },
    { year: "2021", title: { ro: "Odderon", en: "Odderon", fr: "Odderon" }, desc: { ro: "CERN și Fermilab confirmă existența Odderonului, o stare legată de gluoni.", en: "CERN and Fermilab confirm the existence of the Odderon, a bound state of gluons.", fr: "Le CERN et le Fermilab confirment l'existence de l'Odderon, un état lié de gluons." } }
];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // 1. Populate initial state data first
    gameState.unlockedParticles = particles.map(p => p.id);
    gameState.antimatterMode = false;

    // Load saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        gameState.language = savedLanguage;
    }
    changeLanguage(gameState.language);
    
    // Wrap initializations in try-catch to prevent one error from stopping the whole app
    try { initTheme(); } catch (e) { console.error("Theme init failed:", e); }
    try { initNavigation(); } catch (e) { console.error("Navigation init failed:", e); }
    try { renderCatalog(); } catch (e) { console.error("Catalog init failed:", e); }
    try { initLab(); } catch (e) { console.error("Lab init failed:", e); }
    try { initCollider(); } catch (e) { console.error("Collider init failed:", e); }
    try { initModal(); } catch (e) { console.error("Modal init failed:", e); }
    try { initOtherFunctions(); } catch (e) { console.error("Other functions init failed:", e); }
    try { initQuiz(); } catch (e) { console.error("Quiz init failed:", e); }
    try { initMemoryGame(); } catch (e) { console.error("Memory Game init failed:", e); }
    try { renderTimeline(); } catch (e) { console.error("Timeline init failed:", e); }
    try { initInfoTabs(); } catch (e) { console.error("Info tabs init failed:", e); }
    initGlobalObservers();
    // Add search functionality
    initAdvancedUIEffects();
    initSearch();
    initBackground();

    // Hide loading overlay after everything is initialized
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        // Start fade out
        loadingOverlay.style.opacity = '0';
        // Remove from DOM after transition
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500); // Must match transition duration in index.html
    }
});

function renderInfoModal(title, detail, visual, iconClass) {
    const modal = document.getElementById('particle-modal');
    const panel = document.getElementById('modal-panel');
    const content = document.getElementById('modal-content');
    if (!modal || !panel || !content) return;

    gameState.currentParticle = null;
    document.body.style.overflow = 'hidden';
    document.getElementById('share-modal-btn').classList.add('hidden');

    content.innerHTML = `
        <div class="flex flex-col gap-8 relative z-10 fade-in-content">
            <div class="text-center p-8 rounded-3xl bg-teal-500/5 border border-teal-500/20 modal-item">
                ${visual ? `<div class="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6 drop-shadow-[0_0_15px_rgba(20,184,166,0.3)]">${visual}</div>` : `<i class="fa-solid ${iconClass} text-6xl text-teal-500 mb-6"></i>`}
                <h2 class="text-3xl font-black text-teal-600 dark:text-teal-500 uppercase tracking-tighter mb-2">${title}</h2>
                <div class="h-1 w-20 bg-teal-500/30 mx-auto rounded-full"></div>
            </div>
            <div class="bg-gray-50 dark:bg-black/20 p-8 rounded-3xl border border-gray-200 dark:border-white/5 modal-item">
                <h4 class="text-xs font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-book-open"></i> ${t('analysis_lore')}
                </h4>
                <p id="modal-typewriter-desc" class="text-gray-700 dark:text-gray-300 leading-relaxed text-lg font-medium italic min-h-[100px]"></p>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    const isCyber = document.documentElement.classList.contains('cyberpunk');
    panel.animate([
        { transform: 'scale(0.9) translateY(40px)', opacity: 0 },
        { transform: `scale(1) translateY(0) ${isCyber ? 'skewX(2deg)' : ''}`, opacity: 1 }
    ], { duration: 400, easing: 'ease-out', fill: 'forwards' });

    modal.classList.add('open');
    setTimeout(() => typeWriter(document.getElementById('modal-typewriter-desc'), detail), 400);
}

// Background Animation
let bgCanvas, bgCtx, bgParticles = [];
let bgAnimId;
let mouseX = -1000, mouseY = -1000;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener('mousedown', (e) => {
    gameState.ripples.push({ x: e.clientX, y: e.clientY, radius: 0, life: 1.0 });
});

function initBackground() {
    bgCanvas = document.getElementById('bg-canvas');
    if (!bgCanvas) return;
    
    // Oprim animația anterioară dacă există pentru a preveni dublarea loop-urilor
    if (bgAnimId) {
        cancelAnimationFrame(bgAnimId);
    }

    bgCtx = bgCanvas.getContext('2d');
    
    if (!window.bgResizeAttached) {
        resizeBackground();
        window.addEventListener('resize', resizeBackground);
        window.bgResizeAttached = true;
    }
    
    // Create particles
    bgParticles = [];
    gameState.ripples = [];
    const isLight = document.documentElement.classList.contains('light');
    const isCyber = document.documentElement.classList.contains('cyberpunk');
    
    const count = Math.floor(window.innerWidth * window.innerHeight / 15000);
    for(let i=0; i<count; i++) {
        let pColor;
        if (isLight) pColor = Math.random() > 0.5 ? '#ec4899' : '#0d9488'; // Pink or Turquoise
        else if (isCyber) pColor = '#00f3ff';
        else pColor = 'rgba(255, 255, 255, ';

        bgParticles.push({
            x: Math.random() * bgCanvas.width,
            y: Math.random() * bgCanvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            baseVx: (Math.random() - 0.5) * 0.5,
            baseVy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 0.5,
            color: pColor
        });
    }
    
    animateBackground();
}

function resizeBackground() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
}

function animateBackground() {
    if (document.hidden) return; // Pause if tab is hidden

    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    const isDark = document.documentElement.classList.contains('dark');
    const isCyber = document.documentElement.classList.contains('cyberpunk');
    const isLight = document.documentElement.classList.contains('light');
    
    const baseColor = isCyber ? '0, 243, 255' : (isLight ? '100, 116, 139' : '255, 255, 255');
    const connectionBase = isCyber ? '0, 243, 255' : (isLight ? '244, 114, 182' : '255, 255, 255');
    let color = isDark ? 'rgba(255, 255, 255, ' : 'rgba(30, 41, 59, ';
    if (isCyber) color = 'rgba(0, 243, 255, ';
    if (isLight) color = 'rgba(100, 116, 139, ';
    
    // Interaction Strength based on theme
    const interactionRadius = isCyber ? 400 : (isLight ? 200 : 300);
    
    // Mouse Glow (Liquid Glass Effect)
    if (mouseX > 0 && mouseY > 0) {
        const gradient = bgCtx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 300);
        gradient.addColorStop(0, color + '0.12)');
        gradient.addColorStop(1, 'transparent');
        bgCtx.fillStyle = gradient;
        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    }

    // Shockwave Ripples (Liquid Effect)
    gameState.ripples = gameState.ripples.filter(r => r.life > 0);
    gameState.ripples.forEach(r => {
        r.radius += 4;
        r.life -= 0.015;
        bgCtx.beginPath();
        bgCtx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        bgCtx.strokeStyle = `rgba(${baseColor}, ${r.life * 0.3})`;
        bgCtx.lineWidth = 2;
        bgCtx.stroke();
    });

    bgParticles.forEach((p, i) => {
        const dx_m = p.x - mouseX;
        const dy_m = p.y - mouseY;
        const dist_m = Math.sqrt(dx_m*dx_m + dy_m*dy_m);

        // Interaction with Shockwave Ripples
        gameState.ripples.forEach(r => {
            const dx_r = p.x - r.x;
            const dy_r = p.y - r.y;
            const dist_r = Math.sqrt(dx_r * dx_r + dy_r * dy_r);
            const rippleThickness = 30; // Zone of influence around the wavefront

            // If particle is near the ripple wavefront, push it
            if (Math.abs(dist_r - r.radius) < rippleThickness) {
                const pushPower = (1 - Math.abs(dist_r - r.radius) / rippleThickness) * r.life * 2.5;
                p.vx += (dx_r / dist_r) * pushPower;
                p.vy += (dy_r / dist_r) * pushPower;
            }
        });

        // Interactive following logic
        if(dist_m < 250) {
            const attraction = (1 - dist_m / 250) * 0.03;
            p.vx -= dx_m * attraction;
            p.vy -= dy_m * attraction;
            
            // Draw subtle connection to cursor
            bgCtx.strokeStyle = `rgba(${baseColor}, ${0.15 * (1 - dist_m/250)})`;
            bgCtx.lineWidth = 0.5;
            bgCtx.beginPath();
            bgCtx.moveTo(p.x, p.y);
            bgCtx.lineTo(mouseX, mouseY);
            bgCtx.stroke();
        } else {
            // Gradually return to autonomous movement
            p.vx += (p.baseVx - p.vx) * 0.02;
            p.vy += (p.baseVy - p.vy) * 0.02;
        }

        p.x += p.vx;
        p.y += p.vy;
        
        if(p.x < 0) p.x = bgCanvas.width;
        if(p.x > bgCanvas.width) p.x = 0;
        if(p.y < 0) p.y = bgCanvas.height;
        if(p.y > bgCanvas.height) p.y = 0;
        
        bgCtx.fillStyle = isLight || isCyber ? `${p.color}${dist_m < 200 ? '99' : '44'}` : `rgba(255,255,255, ${dist_m < 200 ? 0.5 : 0.15})`;
        bgCtx.beginPath();
        bgCtx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        bgCtx.fill();
        
        // Connections
        for(let j=i+1; j<bgParticles.length; j++) {
            const p2 = bgParticles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if(dist < 120) {
                bgCtx.strokeStyle = `rgba(${connectionBase}, ${0.08 * (1 - dist/120)})`;
                bgCtx.lineWidth = 1;
                bgCtx.beginPath();
                bgCtx.moveTo(p.x, p.y);
                bgCtx.lineTo(p2.x, p2.y);
                bgCtx.stroke();
            }
        }
    });
    
    bgAnimId = requestAnimationFrame(animateBackground);
}

// Resume background animation when tab becomes visible
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        animateBackground();
    }
});

// Theme Switching
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.getElementById('theme-toggle').addEventListener('click', cycleTheme);
    
    // Set initial terminal logs
    logTerminal(t('term_sys_init'), true);
    logTerminal(t('term_wait_input'), true);
    gameState.terminalCleared = false;
}

function setTheme(theme) {
    gameState.theme = theme;
    localStorage.setItem('theme', theme);
    
    const html = document.documentElement;
    const sun = document.getElementById('theme-icon-sun');
    const moon = document.getElementById('theme-icon-moon');
    const cyber = document.getElementById('theme-icon-cyber');
    const logoImg = document.querySelector('nav .flex.items-center img'); // Select the logo image

    // Reset
    html.classList.remove('dark', 'cyberpunk', 'light');
    sun.classList.add('hidden');
    moon.classList.add('hidden');
    if(cyber) cyber.classList.add('hidden');

    let logoSrc = 'images/logo-dark.png'; // Default logo for dark theme

    if (theme === 'dark') {
        html.classList.add('dark');
        sun.classList.remove('hidden');
        logoSrc = 'images/logo-dark.png';
    } else if (theme === 'cyberpunk') {
        html.classList.add('dark', 'cyberpunk');
        if(cyber) cyber.classList.remove('hidden');
        logoSrc = 'images/logo-cyberpunk.png';
    } else {
        // Light
        html.classList.add('light');
        moon.classList.remove('hidden');
        logoSrc = 'images/logo-light.png';
    }

    // Update the logo image source
    if (logoImg) {
        logoImg.src = logoSrc;
    }
    // Refresh canvas to match theme
    initColliderCanvas();
}

function cycleTheme() {
    const themes = ['light', 'dark', 'cyberpunk'];
    const currentIdx = themes.indexOf(gameState.theme);
    const nextIdx = (currentIdx + 1) % themes.length;
    setTheme(themes[nextIdx]);
}

// Language Switching
function changeLanguage(lang) {
    gameState.language = lang;
    localStorage.setItem('language', lang);

    // Update document title
    document.title = t('app_title');
    
    // Update Static UI elements with a more intelligent loop
    document.querySelectorAll('[data-i18n], [data-i18n-placeholder], [data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) {
            el.textContent = t(key);
            if (el.hasAttribute('data-text')) el.setAttribute('data-text', t(key));
        }
        
        const placeholderKey = el.getAttribute('data-i18n-placeholder');
        if (placeholderKey) el.setAttribute('placeholder', t(placeholderKey));

        const titleKey = el.getAttribute('data-i18n-title');
        if (titleKey) el.setAttribute('title', t(titleKey));
    });

    // Update Buttons State
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('text-green-400');
        btn.classList.add('text-gray-500');
    });
    const activeBtn = document.querySelector(`.lang-btn[onclick="changeLanguage('${lang}')"]`);
    if(activeBtn) {
        activeBtn.classList.remove('text-gray-500');
        activeBtn.classList.add('text-green-400');
    }

    // Re-render Dynamic Content
    renderCatalog();
    initLab(); // Re-renders recipes
    initCollider(); // Re-populates dropdowns
    renderTimeline(); 
    renderLeaderboard(); // Re-renders leaderboard
    updateMemoryGameUI();
    
    // FIX: Re-observe new items so they don't stay invisible (opacity 0)
    initGlobalObservers();

    // Cleanup terminal intervals on language change
    gameState.typingIntervals.forEach(clearInterval);
    gameState.typingIntervals = [];

    // Re-translate initial terminal logs if they haven't been cleared
    if (!gameState.terminalCleared) {
        document.getElementById('terminal-logs').innerHTML = '';
        logTerminal(t('term_sys_init'), true);
        logTerminal(t('term_wait_input'), true);
    }

    // Refresh Modal if open to update its content immediately
    const modal = document.getElementById('particle-modal');
    if (modal && modal.classList.contains('open') && gameState.currentParticle) {
        openModal(gameState.currentParticle);
    }
}

// Helper inteligent pentru traduceri
// Helper inteligent pentru traduceri cu suport pentru parametri {0}, {1}...
function t(input, args = []) {
    if (!input) return "";
    let translation = "";

    if (typeof input === 'string') {
        const langData = uiTranslations[gameState.language];
        const enData = uiTranslations["en"];
        
        if (langData && langData[input] !== undefined) {
            translation = langData[input];
        } else if (enData && enData[input] !== undefined) {
            translation = enData[input];
        } else {
            translation = input;
        }
    } else if (typeof input === 'object') {
        translation = input[gameState.language] !== undefined ? input[gameState.language] : (input["en"] !== undefined ? input["en"] : "");
    }

    if (args && args.length > 0) {
        args.forEach((arg, i) => {
            translation = translation.replace(`{${i}}`, arg);
        });
    }
    return translation;
}

// Helper pentru efect de Typewriter în UI
function typeWriter(element, text, speed = 15) {
    if (!element) return;
    
    // Curățăm intervalul anterior stocat direct pe element pentru a evita conflictele
    if (element.dataset.typingInterval) {
        clearInterval(parseInt(element.dataset.typingInterval));
    }
    
    element.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) { element.textContent += text.charAt(i); i++; }
        else {
            clearInterval(interval);
            delete element.dataset.typingInterval;
        }
    }, speed);
    element.dataset.typingInterval = interval;
}

// Helper pentru formatarea automată a unităților de măsură
function formatUnit(val, type) {
    if (!val || val === '0' || val === 'N/A' || val === 'Unknown' || val === '-') return val;
    
    if (type === 'mass') {
        const suffix = t('mass_suffix');
        // Verificăm dacă valoarea se termină într-o unitate de energie (eV, MeV, etc.)
        if (/[kMGT]?eV$/.test(val) && !val.includes('/c²')) {
            return val + suffix;
        }
    }
    return val;
}

// NEW: Advanced UI Effects
function initAdvancedUIEffects() {
    // Animated panel background effect
    document.querySelectorAll('.animated-panel').forEach(panel => {
        panel.addEventListener('mousemove', e => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            panel.style.setProperty('--x', `${x}px`);
            panel.style.setProperty('--y', `${y}px`);
        });
    });

    // Button particle explosion effect
    document.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('click', e => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            for (let i = 0; i < 20; i++) {
                createParticle(button, x, y);
            }
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

function createParticle(container, x, y) {
    const particle = document.createElement('div');
    container.appendChild(particle);

    const isLight = document.documentElement.classList.contains('light');
    const size = Math.floor(Math.random() * 5 + 2);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    // Restricted palette for Light theme: Pink and Turquoise
    const colors = isLight ? ['#f472b6', '#2dd4bf', '#fae8ff', '#ccfbf1'] : [`hsl(${Math.random() * 360}, 90%, 70%)`];
    particle.style.background = isLight ? colors[Math.floor(Math.random() * colors.length)] : colors[0];
    particle.style.borderRadius = '50%';
    particle.style.position = 'absolute';
    particle.style.left = `${x - size / 2}px`;
    particle.style.top = `${y - size / 2}px`;

    const destinationX = (Math.random() - 0.5) * 300;
    const destinationY = (Math.random() - 0.5) * 300;

    const animation = particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${destinationX}px, ${destinationY}px) scale(0)`, opacity: 0 }
    ], {
        duration: Math.random() * 1000 + 500,
        easing: 'cubic-bezier(0.17, 0.84, 0.44, 1)'
    });

    animation.onfinish = () => {
        particle.remove();
    };
}

// Helper for 3D card tilt effect
function addCard3DEffect(card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set CSS variables for dynamic shine effect
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const { width, height } = rect;
        const rotateX = (y / height - 0.5) * -12; 
        const rotateY = (x / width - 0.5) * 12;

        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
        
        // Parallax depth effect pentru simbol
        const symbol = card.querySelector('.symbol-glow');
        if (symbol) {
            const moveX = (x / width - 0.5) * 20;
            const moveY = (y / height - 0.5) * 20;
            symbol.style.transform = `translate3d(${moveX}px, ${moveY}px, 50px) scale(1.1)`;
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        const symbol = card.querySelector('.symbol-glow');
        if (symbol) symbol.style.transform = 'translate3d(0, 0, 0) scale(1)';
    });
}

// Helper for debouncing search and other frequent events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => { clearTimeout(timeout); func(...args); };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search box interaction & Autocomplete
function initSearch() {
    const searchContainer = document.getElementById('search-container');
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('catalog-search');
    const autocompleteList = document.getElementById('autocomplete-list');
    const clearBtn = document.getElementById('search-clear-btn');

    searchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        searchContainer.classList.add('active');
        searchInput.focus();
    });

    const handleSearchInput = () => {
        const searchTerm = searchInput.value.toLowerCase();
        
        // Filter catalog first
        filterCatalog();

        // Then handle autocomplete & clear button
        autocompleteList.innerHTML = '';
        clearBtn.classList.toggle('hidden', searchTerm.length === 0);

        if (searchTerm.length > 0) {
            // FIX: Use t() for suggestion search
            const suggestions = particles
                .filter(p => !['Baryon', 'Meson'].includes(p.type) && !p.isAntimatter)
                .filter(p => t(p.name).toLowerCase().startsWith(searchTerm)).slice(0, 5);
            
            if (suggestions.length > 0) {
                suggestions.forEach(p => {
                    const div = document.createElement('div');
                    div.className = 'p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer';
                    div.textContent = t(p.name);
                    div.addEventListener('click', () => {
                        searchInput.value = t(p.name);
                        searchInput.dispatchEvent(new Event('input')); // Trigger filter and clear button update
                        autocompleteList.classList.add('hidden');
                    });
                    autocompleteList.appendChild(div);
                });
                autocompleteList.classList.remove('hidden');
            } else {
                autocompleteList.classList.add('hidden');
            }
        } else {
            autocompleteList.classList.add('hidden');
        }
    };

    searchInput.addEventListener('input', debounce(handleSearchInput, 150));

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
    });

    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            if (searchInput.value === '') {
                searchContainer.classList.remove('active');
            }
            autocompleteList.classList.add('hidden');
        }
    });
}

// Catalog Search
function filterCatalog() {
    const searchInput = document.getElementById('catalog-search');
    const searchTerm = searchInput.value;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const allCards = document.querySelectorAll('.particle-card');

    const hasSearchTerm = lowerCaseSearchTerm.length > 0;

    allCards.forEach(card => {
        const particleId = card.dataset.id;
        if (!particleId) return;

        const particle = particles.find(p => p.id === particleId);
        if (!particle) return;

        // FIX: Use t() for filtering
        const particleName = t(particle.name).toLowerCase();
        const particleType = (card.dataset.type || '').toLowerCase();
        const particleGen = card.dataset.generation || '';

        const matches = !hasSearchTerm ||
                        particleName.includes(lowerCaseSearchTerm) ||
                        particleType.includes(lowerCaseSearchTerm) ||
                        (particleGen && `gen ${particleGen}`.includes(lowerCaseSearchTerm));
        
        card.style.display = matches ? '' : 'none';
        card.classList.toggle('search-match', matches && hasSearchTerm);

        const h3 = card.querySelector('h3');
        if (h3) {
            if (matches && hasSearchTerm) {
                // Escape special regex characters from the search term
                const escapedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                const regex = new RegExp(escapedSearchTerm, 'gi');
                h3.innerHTML = t(particle.name).replace(regex, `<mark class="bg-yellow-300 dark:bg-yellow-500 text-black rounded px-1 py-0">$&</mark>`);
            } else {
                h3.textContent = t(particle.name);
            }
        }
    });

    // Hide empty sections/generations
    document.querySelectorAll('#catalog-container .generation-column, #catalog-container .category-section').forEach(section => {
        const visibleCards = section.querySelectorAll('.particle-card:not([style*="display: none"])');
        section.style.display = visibleCards.length > 0 ? '' : 'none';
    });
    document.querySelectorAll('#catalog-container > h3').forEach(header => {
        const nextSection = header.nextElementSibling;
        if (nextSection) { header.style.display = nextSection.style.display; }
    });
}

// 1. Navigation
function initNavigation() {
    const tabs = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.module-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-tab');
            const currentSection = Array.from(sections).find(s => !s.classList.contains('hidden'));

            // Prevenim reîncărcarea aceleiași secțiuni
            if (currentSection && currentSection.id === targetId) return;

            const performTransition = () => {
                // Remove active class from all tabs
                
                // Reset body state to ensure scrolling is enabled and position is top
                document.body.style.overflow = '';
                window.scrollTo({ top: 0, behavior: 'instant' });
                if (document.activeElement) document.activeElement.blur();

                tabs.forEach(t => t.classList.remove('active'));
                // Hide all sections
                sections.forEach(s => s.classList.add('hidden'));

                // Add active class to selected tab
                tab.classList.add('active');
                const targetSection = document.getElementById(targetId);
                targetSection.classList.remove('hidden');
                
                // Trigger enter animation
                targetSection.classList.remove('section-enter');
                void targetSection.offsetWidth; // Force reflow
                targetSection.classList.add('section-enter');

                // Fix: Resize canvas when switching to collider tab
                if (targetId === 'collider') {
                    setTimeout(() => initColliderCanvas(), 50);
                }
            };

            if (currentSection) {
                // Aplicăm clasa de exit
                currentSection.classList.add('section-exit');
                
                // Așteptăm terminarea animației (0.3s conform CSS)
                setTimeout(() => {
                    currentSection.classList.remove('section-exit');
                    performTransition();
                }, 300);
            } else {
                performTransition();
            }
        });
    });
}

// NEW: Info Section Sub-tab logic
function initInfoTabs() {
    const tabButtons = document.querySelectorAll('.info-tab-btn');
    const contentSections = document.querySelectorAll('[data-info-content]');
    const quickSearch = document.getElementById('info-quick-search');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-info-tab');

            // Update buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (quickSearch) quickSearch.value = ''; // Reset search on tab change

            // Update content visibility
            contentSections.forEach(section => {
                const isTarget = section.getAttribute('data-info-content') === targetTab;
                
                if (isTarget) {
                    section.classList.remove('hidden');
                    // Trigger re-calculation of reveal items
                    const items = section.querySelectorAll('.reveal-item');
                    items.forEach(item => {
                        item.style.display = ''; 
                        item.classList.remove('visible');
                        if (gameState.globalObserver) gameState.globalObserver.observe(item);
                    });
                } else {
                    section.classList.add('hidden');
                }
            });
            
            // Scroll info section back to top
            document.getElementById('info').scrollIntoView({ behavior: 'smooth' });
        });
    });

    if (quickSearch) {
        quickSearch.addEventListener('input', debounce(() => {
            const query = quickSearch.value.toLowerCase();
            const activeSection = document.querySelector('[data-info-content]:not(.hidden)');
            if (!activeSection) return;

            const items = activeSection.querySelectorAll('.reveal-item');
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = '';
                    item.classList.add('visible');
                } else {
                    item.style.display = 'none';
                }
            });
        }, 200));
    }
}

// 2. Catalog
function renderCatalog() {
    const container = document.getElementById('catalog-container');
    if (!container) return;
    
    const fragment = document.createDocumentFragment();

    const categories = ['Quark', 'Lepton', 'Boson'];

    categories.forEach(category => {
        const categoryParticles = particles.filter(p => p.type === category && !p.isAntimatter);
        if (categoryParticles.length === 0) return;

        // Header
        const header = document.createElement('h3');
        header.className = 'category-header text-2xl font-bold text-blue-500 border-b-2 border-blue-500/20 pb-3 mb-8 uppercase tracking-widest';
        header.textContent = t(categoryInfo[category].name);
        fragment.appendChild(header);

        if (category === 'Quark' || category === 'Lepton') {
            const generationsContainer = document.createElement('div');
            generationsContainer.className = 'category-section grid grid-cols-1 md:grid-cols-3 gap-8 mb-8';

            // Group by generation
            for (let gen = 1; gen <= 3; gen++) {
                const generationParticles = categoryParticles.filter(p => p.generation === gen);
                if (generationParticles.length === 0) continue;

                const genColumn = document.createElement('div');
                genColumn.className = 'generation-column';

                // Generation Sub-header
                const genHeader = document.createElement('h4');
                genHeader.className = 'text-xs font-semibold text-gray-400 dark:text-gray-600 mb-3 text-center uppercase tracking-wider';
                genHeader.textContent = `${t('generation')} ${gen}`;
                genColumn.appendChild(genHeader);

                // List for this generation
                const list = document.createElement('div');
                list.className = 'space-y-4';

                generationParticles.forEach((p, index) => {
                    const isLocked = !gameState.unlockedParticles.includes(p.id);
                    const card = document.createElement('div');
                    card.className = `particle-card liquid-glass shimmer-wrapper p-6 rounded-[2rem] relative ${isLocked ? 'locked' : ''} reveal-item cursor-pointer group overflow-hidden`;
                    card.style.animationDelay = `${index * 50}ms`;
                    card.dataset.id = p.id;
                    card.dataset.generation = p.generation;
                    card.dataset.type = p.type;
                    addCard3DEffect(card);
                    
                    const typeColor = categoryInfo[p.type].color.replace('text-', 'border-');
                    const textColor = categoryInfo[p.type].color;

                    card.innerHTML = `
                        <div class="absolute -top-10 -right-10 w-32 h-32 bg-current opacity-5 group-hover:opacity-10 transition-opacity rounded-full blur-3xl pointer-events-none ${textColor}"></div>
                        <div class="relative z-10">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h3 class="text-lg font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tighter transition-colors group-hover:text-green-400">${t(p.name)}</h3>
                                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-white/10 ${textColor} uppercase tracking-widest">${t(categoryInfo[p.type].name)}</span>
                                </div>
                                <div class="w-12 h-12 rounded-2xl bg-white/10 dark:bg-black/20 border border-white/20 flex items-center justify-center font-serif font-bold text-2xl text-gray-800 dark:text-white shadow-inner transform transition-transform group-hover:scale-110 group-hover:rotate-3 symbol-glow symbol-glow-${p.type}">${p.symbol}</div>
                            </div>
                            <div class="grid grid-cols-3 gap-1.5 text-[9px] uppercase font-bold tracking-tighter text-gray-500 dark:text-gray-400">
                                <div class="bg-black/5 dark:bg-white/5 p-2 rounded-xl border border-white/5 flex flex-col justify-between"><span class="text-gray-400 dark:text-gray-600 mb-1">${t('mass')}</span> <span class="truncate">${formatUnit(p.mass, 'mass') || 'N/A'}</span></div>
                                <div class="bg-black/5 dark:bg-white/5 p-2 rounded-xl border border-white/5 flex flex-col justify-between"><span class="text-gray-400 dark:text-gray-600 mb-1">${t('charge')}</span> <span>${p.charge || '0'}</span></div>
                                <div class="bg-black/5 dark:bg-white/5 p-2 rounded-xl border border-white/5 flex flex-col justify-between"><span class="text-gray-400 dark:text-gray-600 mb-1">${t('spin')}</span> <span>${p.spin || '?'}</span></div>
                            </div>
                            <div class="mt-4 pt-4 border-t border-white/10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                <span class="text-[9px] text-blue-500 font-mono tracking-tighter uppercase">${t('view_core_data')}</span>
                                <i class="fa-solid ${categoryInfo[p.type].icon} ${textColor} opacity-30 group-hover:opacity-100 transition-opacity"></i>
                            </div>
                        </div>
                    `;
                    list.appendChild(card);
                });
                genColumn.appendChild(list);
                generationsContainer.appendChild(genColumn);
            }
            fragment.appendChild(generationsContainer);
        } else { // For Bosons (and any other non-generational categories)
            const grid = document.createElement('div');
            grid.className = 'category-section grid grid-cols-1 md:grid-cols-3 gap-6 mb-8';

            categoryParticles.forEach((p, index) => {
                const isLocked = !gameState.unlockedParticles.includes(p.id);
                const card = document.createElement('div');
                card.className = `particle-card liquid-glass shimmer-wrapper p-6 rounded-[2rem] relative ${isLocked ? 'locked' : ''} reveal-item cursor-pointer group overflow-hidden`;
                card.style.animationDelay = `${index * 50}ms`;
                card.dataset.type = p.type;
                card.dataset.id = p.id;
                addCard3DEffect(card);

                const typeColor = categoryInfo[p.type].color.replace('text-', 'border-');
                const textColor = categoryInfo[p.type].color;

                card.innerHTML = `
                    <div class="absolute -top-10 -right-10 w-32 h-32 bg-current opacity-5 group-hover:opacity-10 transition-opacity rounded-full blur-3xl pointer-events-none ${textColor}"></div>
                    <div class="relative z-10">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tighter transition-colors group-hover:text-green-400">${t(p.name)}</h3>
                                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-white/10 ${textColor} uppercase tracking-widest">${t(categoryInfo[p.type].name)}</span>
                            </div>
                            <div class="w-12 h-12 rounded-2xl bg-white/10 dark:bg-black/20 border border-white/20 flex items-center justify-center font-serif font-bold text-2xl text-gray-800 dark:text-white shadow-inner transform transition-transform group-hover:scale-110 group-hover:rotate-3 symbol-glow symbol-glow-${p.type}">${p.symbol}</div>
                        </div>
                        <div class="grid grid-cols-3 gap-1.5 text-[9px] uppercase font-bold tracking-tighter text-gray-500 dark:text-gray-400">
                            <div class="bg-black/5 dark:bg-white/5 p-2 rounded-xl border border-white/5 flex flex-col justify-between"><span class="text-gray-400 dark:text-gray-600 mb-1">${t('mass')}</span> <span class="truncate">${formatUnit(p.mass, 'mass') || 'N/A'}</span></div>
                            <div class="bg-black/5 dark:bg-white/5 p-2 rounded-xl border border-white/5 flex flex-col justify-between"><span class="text-gray-400 dark:text-gray-600 mb-1">${t('charge')}</span> <span>${p.charge || '0'}</span></div>
                            <div class="bg-black/5 dark:bg-white/5 p-2 rounded-xl border border-white/5 flex flex-col justify-between"><span class="text-gray-400 dark:text-gray-600 mb-1">${t('spin')}</span> <span>${p.spin || '?'}</span></div>
                        </div>
                        <div class="mt-4 pt-4 border-t border-white/10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                            <span class="text-[9px] text-blue-500 font-mono tracking-tighter uppercase">${t('view_core_data')}</span>
                            <i class="fa-solid ${categoryInfo[p.type].icon} ${textColor} opacity-30 group-hover:opacity-100 transition-opacity"></i>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
            fragment.appendChild(grid);
        }
    });
    
    container.innerHTML = '';
    container.appendChild(fragment);

    // Re-inițializează observer-ul pentru a face cardurile vizibile
    initGlobalObservers();

    // Use event delegation for particle clicks
    container.onclick = (e) => {
        const card = e.target.closest('.particle-card');
        if (card && card.dataset.id) {
            const p = particles.find(p => p.id === card.dataset.id);
            if (p) openModal(p);
        }
    };
}

function initGlobalObservers() {
    // Deconectăm observatorul anterior dacă există pentru a elibera memoria
    if (gameState.globalObserver) {
        gameState.globalObserver.disconnect();
    }

    gameState.globalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Nu mai avem nevoie să observăm elementul odată ce e vizibil
                gameState.globalObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-item').forEach(item => {
        gameState.globalObserver.observe(item);
    });
}

function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;
    container.innerHTML = '';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    discoveryTimeline.forEach(item => {
        const div = document.createElement('div');
        div.className = 'relative pl-10 reveal-item';
        div.innerHTML = `
            <div class="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-teal-500 border-4 border-white dark:border-gray-900 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
            <div class="text-sm text-teal-600 dark:text-teal-400 font-bold mb-1">${item.year}</div>
            <h4 class="text-lg font-black text-gray-800 dark:text-white mb-2 uppercase tracking-tight">${t(item.title)}</h4>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">${t(item.desc)}</p>
        `;
        container.appendChild(div);
        observer.observe(div);
    });
}

// 3. Lab (Synthesis)
function initLab() {
    const quarkSelection = document.getElementById('quark-selection');
    const slots = document.querySelectorAll('.slot');
    const recipesList = document.getElementById('recipes-list');
    
    // Clear previous content to prevent duplication
    quarkSelection.innerHTML = '';
    recipesList.innerHTML = '';
    
    // Render available quarks
    particles.filter(p => p.type === 'Quark' && !p.isAntimatter && gameState.unlockedParticles.includes(p.id)).forEach(q => {
        const btn = document.createElement('button');
        btn.className = 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 px-4 py-2 rounded border border-gray-400 dark:border-gray-600 text-purple-700 dark:text-purple-300 font-bold transform hover:scale-110 transition';
        btn.draggable = true;
        btn.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', q.id);
            // Use a custom type for better checking
            e.dataTransfer.setData('source-selection', 'true');
            e.dataTransfer.effectAllowed = 'copy';
        });
        btn.innerHTML = `${q.id} <span class="text-xs text-gray-500 ml-1">${q.charge}</span>`;
        btn.onclick = () => addToSlot(q.id);
        quarkSelection.appendChild(btn);
    });

    // Event Listeners (Guard to run only once)
    if (!gameState.labInitialized) {
        const clearBtn = document.getElementById('clear-slots-btn');
        const trashZone = document.getElementById('trash-zone');

        slots.forEach(slot => {
            slot.addEventListener('click', () => {
                const idx = slot.getAttribute('data-index');
                gameState.reactorSlots[idx] = null;
                updateSlots();
            });
            addCard3DEffect(slot); // Add 3D effect to lab slots

            // Make slots draggable to remove quarks
            slot.draggable = true;
            slot.addEventListener('dragstart', (e) => {
                if (gameState.reactorSlots[slot.dataset.index]) {
                    e.dataTransfer.setData('source-slot', 'true');
                    e.dataTransfer.setData('slot-index', slot.dataset.index);
                    e.dataTransfer.effectAllowed = 'move';
                } else {
                    e.preventDefault();
                }
            });

            // Add Drag and Drop listeners
            slot.addEventListener('dragover', (e) => {
                e.preventDefault(); // This is necessary to allow dropping
                slot.classList.add('drag-over');
            });

            slot.addEventListener('dragleave', () => {
                slot.classList.remove('drag-over');
            });

            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                slot.classList.remove('drag-over');
                const quarkId = e.dataTransfer.getData('text/plain');
                const slotIndex = parseInt(slot.dataset.index, 10);

                // Check if the dropped data is a valid quark
                const isFromSelection = e.dataTransfer.types.includes('source-selection');
                if (isFromSelection && particles.some(p => p.id === quarkId && p.type === 'Quark')) {
                    gameState.reactorSlots[slotIndex] = quarkId;
                    updateAndAnimateSlot(slotIndex);
                }
            });
        });

        document.getElementById('synthesize-btn').addEventListener('click', synthesize);
        
        clearBtn.addEventListener('click', () => {
            gameState.reactorSlots.fill(null);
            updateSlots();
        });

        // Add listeners for trash zone
        trashZone.addEventListener('dragover', e => {
            const isFromSlot = e.dataTransfer.types.includes('source-slot');
            if (isFromSlot) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                trashZone.classList.add('drag-over');
            }
        });

        trashZone.addEventListener('dragleave', () => {
            trashZone.classList.remove('drag-over');
        });

        trashZone.addEventListener('drop', e => {
            e.preventDefault();
            trashZone.classList.remove('drag-over');
            const isFromSlot = e.dataTransfer.types.includes('source-slot');
            if (isFromSlot) {
                const slotIndex = parseInt(e.dataTransfer.getData('slot-index'), 10);
                if (!isNaN(slotIndex)) {
                    gameState.reactorSlots[slotIndex] = null;
                    updateSlots();
                    trashZone.classList.add('shake-anim');
                    // Play sound
                    const audio = new Audio('sounds/trash.mp3'); // Adjust path if needed
                    audio.volume = 0.5;
                    audio.play();
                    setTimeout(() => trashZone.classList.remove('shake-anim'), 400);
                }
            }
        });

        // Recipe Panel Toggle
        const toggleRecipesBtn = document.getElementById('toggle-recipes-btn');
        const closeRecipesBtn = document.getElementById('close-recipes-btn');
        const recipesPanel = document.getElementById('recipes-panel');

        if (toggleRecipesBtn && recipesPanel && closeRecipesBtn) {
            toggleRecipesBtn.addEventListener('click', () => {
                recipesPanel.classList.remove('hidden');
                setTimeout(() => recipesPanel.classList.remove('translate-x-full'), 10);
            });
            closeRecipesBtn.addEventListener('click', () => {
                recipesPanel.classList.add('translate-x-full');
                setTimeout(() => recipesPanel.classList.add('hidden'), 300);
            });
        }

        // Initialize ambient particles
        initLabParticles();
        
        // Add 3D effect to synthesis button
        addCard3DEffect(document.getElementById('synthesize-btn'));
        // Add 3D effect to clear button
        addCard3DEffect(document.getElementById('clear-slots-btn'));

        gameState.labInitialized = true;
    }
    particles.filter(p => p.composition && !p.isAntimatter).forEach(p => {
        const div = document.createElement('div');
        div.className = 'liquid-glass p-4 rounded-xl flex justify-between items-center cursor-pointer hover:border-amber-500 transition-all mb-3';
        div.onclick = () => openModal(p);
        
        const ingredients = p.composition.map(c => 
            `<span class="inline-block w-7 h-7 text-center leading-7 bg-purple-500/20 rounded-full text-xs border border-purple-500/40 font-bold">${c}</span>`
        ).join(' + ');

        div.innerHTML = `
            <div class="font-bold text-gray-800 dark:text-gray-200">${t(p.name)}</div>
            <div class="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">${ingredients}</div>
        `;
        recipesList.appendChild(div);
    });
}

function initLabParticles() {
    const container = document.getElementById('lab-particles');
    if (!container) return;

    setInterval(() => {
        const p = document.createElement('div');
        p.className = 'lab-particle';
        const size = Math.random() * 10 + 5;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.bottom = '-20px';
        p.style.animationDuration = `${Math.random() * 3 + 2}s`;
        container.appendChild(p);
        setTimeout(() => p.remove(), 5000);
    }, 500);
}

function addToSlot(quarkId) {
    const emptyIndex = gameState.reactorSlots.indexOf(null);
    if (emptyIndex !== -1) {
        gameState.reactorSlots[emptyIndex] = quarkId;
        updateAndAnimateSlot(emptyIndex);
    }
}

function updateAndAnimateSlot(index) {
    updateSlots();
    const filledSlot = document.querySelector(`.slot[data-index='${index}']`);
    if (filledSlot) {
        filledSlot.classList.add('slot-added');
        setTimeout(() => {
            filledSlot.classList.remove('slot-added');
        }, 400); // Animation duration
    }
}

function updateSlots() {
    const slots = document.querySelectorAll('.slot');
    slots.forEach((slot, i) => {
        const val = gameState.reactorSlots[i];
        slot.textContent = val ? val : '?';
        slot.className = `slot liquid-glass border-2 border-dashed w-24 h-24 flex items-center justify-center rounded-2xl cursor-pointer transition-all duration-500 ${val ? 'border-purple-500 bg-purple-500/10 scale-105 rotate-3 text-white font-bold text-3xl' : 'border-gray-500/50 text-gray-500 hover:scale-105'}`;
    });
}

function synthesize() {
    const current = [...gameState.reactorSlots].sort().join('');
    const resultDiv = document.getElementById('synthesis-result');
    const slots = document.querySelectorAll('.slot');
    
    // Check all recipes
    const match = particles.find(p => p.composition && [...p.composition].sort().join('') === current);

    if (match) {
        // Animate merging
        slots[0].style.setProperty('--tx', '100px');
        slots[1].style.setProperty('--tx', '0px');
        slots[2].style.setProperty('--tx', '-100px');
        
        slots.forEach(s => s.classList.add('merging'));

        setTimeout(() => {
            slots.forEach(s => s.classList.remove('merging'));
            
            resultDiv.innerHTML = `<div class="synthesis-anim p-4 bg-green-200/50 dark:bg-green-900/20 border border-green-400/50 dark:border-green-500/50 rounded text-center">
                <div class="text-green-600 dark:text-green-400 text-xl font-bold mb-1">${t('lab_synthesis_success')}</div>
                <div class="text-gray-800 dark:text-white">${t('lab_synthesis_created')} <span class="font-bold text-amber-600 dark:text-amber-400">${t(match.name)}</span></div>
            </div>`;
            
            // Open modal with the new particle
            setTimeout(() => {
                openModal(match);
            }, 500);
            
            // Clear slots
            gameState.reactorSlots = [null, null, null];
            updateSlots();
            showToast(t('lab_synthesis_success'), 'success');
        }, 500);

    } else {
        resultDiv.innerHTML = `<span class="text-red-600 dark:text-red-400">${t('lab_synthesis_fail')}</span>`;
        
        // Shake animation on slots container
        const slotsContainer = document.getElementById('reactor-slots');
        slotsContainer.classList.add('shake-anim');
        setTimeout(() => slotsContainer.classList.remove('shake-anim'), 400);
        showToast(t('lab_synthesis_error_shake'), 'error');
    }
}

// 4. Collider
const famousExperiments = {
    higgs: { name: { ro: "Descoperirea Bosonului Higgs (p-p @ 13 TeV)", en: "Higgs Boson Discovery (p-p @ 13 TeV)", fr: "Découverte du Boson de Higgs (p-p @ 13 TeV)" }, beam1: 'p', beam2: 'p', energy: 13, outcome: { ro: "Coliziunea proton-proton la energie înaltă a produs un exces de evenimente în jurul a 125 GeV, confirmând existența bosonului Higgs. Aceasta este o descoperire monumentală care validează Mecanismul Higgs.", en: "High-energy proton-proton collision produced an excess of events around 125 GeV, confirming the existence of the Higgs boson. This is a monumental discovery validating the Higgs Mechanism.", fr: "La collision proton-proton à haute énergie a produit un excès d'événements autour de 125 GeV, confirmant l'existence du boson de Higgs. C'est une découverte monumentale validant le Mécanisme de Higgs." } },
    top: { name: { ro: "Descoperirea Quarcului Top (p-pbar @ 1.96 TeV)", en: "Top Quark Discovery (p-pbar @ 1.96 TeV)", fr: "Découverte du Quark Top (p-pbar @ 1.96 TeV)" }, beam1: 'p', beam2: 'p_bar', energy: 1.96, outcome: { ro: "La Tevatron, coliziunile proton-antiproton au relevat cel mai masiv quarc, Top-ul, completând a treia generație de quarci.", en: "At Tevatron, proton-antiproton collisions revealed the most massive quark, the Top, completing the third generation of quarks.", fr: "Au Tevatron, les collisions proton-antiproton ont révélé le quark le plus massif, le Top, complétant la troisième génération de quarks." } },
    wz: { name: { ro: "Descoperirea Bosonilor W/Z (p-pbar @ 540 GeV)", en: "W/Z Bosons Discovery (p-pbar @ 540 GeV)", fr: "Découverte des Bosons W/Z (p-pbar @ 540 GeV)" }, beam1: 'p', beam2: 'p_bar', energy: 0.54, outcome: { ro: "Super Proton Synchrotron (SPS) a confirmat unificarea forței electromagnetice cu cea slabă prin descoperirea purtătorilor de forță W și Z.", en: "Super Proton Synchrotron (SPS) confirmed the unification of the electromagnetic and weak forces by discovering the W and Z force carriers.", fr: "Le Super Proton Synchrotron (SPS) a confirmé l'unification de la force électromagnétique avec la force faible en découvrant les porteurs de force W et Z." } },
    jpsi: { name: { ro: "Descoperirea J/Psi (e-e+)", en: "J/Psi Discovery (e-e+)", fr: "Découverte du J/Psi (e-e+)" }, beam1: 'e', beam2: 'e', energy: 0.0031, outcome: { ro: "Coliziunea electron-pozitron a relevat o rezonanță ascuțită la 3.1 GeV, indicând o nouă particulă (mezonul J/Psi) formată dintr-un quarc charm și un anti-charm. Această 'Revoluție din Noiembrie' a confirmat existența celui de-al patrulea quarc.", en: "Electron-positron collision revealed a sharp resonance at 3.1 GeV, indicating a new particle (J/Psi meson) made of a charm and anti-charm quark. This 'November Revolution' confirmed the existence of the fourth quark.", fr: "La collision électron-positron a révélé une résonance nette à 3,1 GeV, indiquant une nouvelle particule (méson J/Psi) formée d'un quark charm et d'un anti-charm. Cette 'Révolution de Novembre' a confirmé l'existence du quatrième quark." } },
    deepInelastic: { name: { ro: "Deep Inelastic Scattering (e-p)", en: "Deep Inelastic Scattering (e-p)", fr: "Diffusion Inélastique Profonde (e-p)" }, beam1: 'e', beam2: 'p', energy: 0.9, outcome: { ro: "Împrăștierea electronilor de pe protoni la energii mari a arătat că sarcina electrică din proton nu este distribuită uniform, ci concentrată în puncte. Acesta a fost un experiment crucial care a demonstrat că protonii sunt compuși din quarci.", en: "Scattering of electrons off protons at high energies showed that electric charge in the proton is not uniformly distributed but concentrated in points. This was a crucial experiment demonstrating that protons are composed of quarks.", fr: "La diffusion des électrons sur les protons à haute énergie a montré que la charge électrique dans le proton n'est pas uniformément répartie mais concentrée en points. Ce fut une expérience cruciale démontrant que les protons sont composés de quarks." } },
    qgp: { name: { ro: "Plasma Quark-Gluon (Pb-Pb @ 2.76 TeV)", en: "Quark-Gluon Plasma (Pb-Pb @ 2.76 TeV)", fr: "Plasma Quark-Gluon (Pb-Pb @ 2.76 TeV)" }, beam1: 'p', beam2: 'p', energy: 2.76, outcome: { ro: "Coliziunea ionilor grei a recreat condițiile de la începutul Universului, formând o 'supă' fierbinte unde quarcii și gluonii nu mai sunt confinați.", en: "Heavy ion collision recreated conditions from the early Universe, forming a hot 'soup' where quarks and gluons are no longer confined.", fr: "La collision d'ions lourds a recréé les conditions du début de l'Univers, formant une 'soupe' chaude où les quarks et les gluons ne sont plus confinés." } },
    z_pole: { name: { ro: "Studiul Bosonului Z (LEP e-e+ @ 91 GeV)", en: "Z Boson Study (LEP e-e+ @ 91 GeV)", fr: "Étude du Boson Z (LEP e-e+ @ 91 GeV)" }, beam1: 'e', beam2: 'e', energy: 0.09, outcome: { ro: "Large Electron-Positron Collider a măsurat cu precizie lățimea de dezintegrare a bosonului Z, stabilind că există doar 3 familii de neutrini ușori.", en: "Large Electron-Positron Collider precisely measured the Z boson decay width, establishing that there are only 3 families of light neutrinos.", fr: "Le Grand Collisionneur Électron-Positron a mesuré avec précision la largeur de désintégration du boson Z, établissant qu'il n'existe que 3 familles de neutrinos légers." } },
    bottom: { name: { ro: "Descoperirea Quarcului Bottom (p-N @ 400 GeV)", en: "Bottom Quark Discovery (p-N @ 400 GeV)", fr: "Découverte du Quark Bottom (p-N @ 400 GeV)" }, beam1: 'p', beam2: 'p', energy: 0.4, outcome: { ro: "Experimentul E288 de la Fermilab a descoperit rezonanța Upsilon, formată dintr-o pereche bottom-antibottom, confirmând a treia generație de quarci.", en: "Fermilab experiment E288 discovered the Upsilon resonance, formed of a bottom-antibottom pair, confirming the third generation of quarks.", fr: "L'expérience E288 du Fermilab a découvert la résonance Upsilon, formée d'une paire bottom-antibottom, confirmant la troisième génération de quarks." } }
    ,cp_violation: { name: { ro: "Violarea CP în Mezonii B (LHCb)", en: "CP Violation in B Mesons (LHCb)", fr: "Violation CP dans les Mésons B (LHCb)" }, beam1: 'p', beam2: 'p', energy: 7, outcome: { ro: "LHCb a observat o diferență semnificativă în modul în care mezonii B și anti-B se dezintegrează, oferind indicii despre de ce Universul este dominat de materie.", en: "LHCb observed a significant difference in how B and anti-B mesons decay, offering clues as to why the Universe is matter-dominated.", fr: "LHCb a observé une différence significative dans la façon dont les mésons B et anti-B se désintègrent, offrant des indices sur la raison pour laquelle l'Univers est dominé par la matière." } }
};

function initCollider() {
    // Elements
    const slider = document.getElementById('energy-slider');
    const energyVal = document.getElementById('energy-val');
    const magField = document.getElementById('mag-field');
    const tempVal = document.getElementById('temp-val');
    const runBtn = document.getElementById('run-collider-btn'); // This is the manual run button
    const lumiVal = document.getElementById('lumi-val');
    const rateVal = document.getElementById('rate-val');
    const eventsVal = document.getElementById('events-val');
    const effVal = document.getElementById('efficiency-val');
    const crossSectionVal = document.getElementById('cross-section-val');
    const beam1 = document.getElementById('beam-1');
    const beam2 = document.getElementById('beam-2');
    const famousSelect = document.getElementById('famous-experiment-select');
    const runFamousBtn = document.getElementById('run-famous-experiment-btn');
    const downloadBtn = document.getElementById('download-data-btn');
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomOutBtn = document.getElementById('zoom-out-btn');

    // Save current selections to restore after repopulating dropdowns
    const currentBeam1 = beam1 ? beam1.value : null;
    const currentBeam2 = beam2 ? beam2.value : null;
    const currentFamous = famousSelect ? famousSelect.value : null;

    // Listeners Guard
    if (!gameState.colliderInitialized) {
        // Allow lower energies for historical experiments
        slider.min = "0.001";
        slider.step = "0.001";

        // Slider Event Listener
        slider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);

            // FIX: Unified energy unit display
            if (val < 1.0) {
                energyVal.innerHTML = `${(val * 1000).toFixed(0)} <span class="text-sm">GeV</span>`;
            } else {
                energyVal.innerHTML = `${val.toFixed(2)} <span class="text-sm">TeV</span>`;
            }

            // REPAIR: Update industrial bars with smoother colors and more steps
            for(let i=1; i<=4; i++) { // Assuming 4 bars now
                const bar = document.getElementById(`en-bar-${i}`) || document.getElementById(`energy-bar-${i}`); // Fallback for old ID
                if(bar) bar.style.backgroundColor = (val >= (i*3.5)) ? '#ef4444' : 'rgba(239, 68, 68, 0.1)';
                if(bar && val >= (i*3.5)) bar.style.boxShadow = '0 0 12px #ef4444';
                else if(bar) bar.style.boxShadow = 'none';
            }
            
            // Update stats based on energy
            const mag = (val * 0.8).toFixed(1);
            const temp = (4 + (val * 0.5)).toFixed(1);
            
            magField.textContent = `${mag} T`;
            tempVal.textContent = `${Math.max(4, temp)} K`; // Min 4K
            
            // REPAIR: Reset stats display when energy changes
            if(lumiVal) lumiVal.textContent = "0";
            if(rateVal) rateVal.textContent = "0";
            if(effVal) effVal.textContent = "0%";
            if(crossSectionVal) crossSectionVal.textContent = "0";
        });
    }

    // Populate Beams
    const beamParticles = particles.filter(p => ['p', 'e', 'n', 'u', 'd', 'p_bar'].includes(p.id));
    
    // Clear and populate beam selects
    [beam1, beam2].forEach(select => {
        select.innerHTML = '';
        beamParticles.forEach(p => {
            select.add(new Option(t(p.name), p.id));
        });
    });
    if (currentBeam1) beam1.value = currentBeam1;
    if (currentBeam2) beam2.value = currentBeam2;

    // Populate Famous Experiments
    famousSelect.innerHTML = '';
    Object.keys(famousExperiments).forEach(key => {
        const exp = famousExperiments[key];
        famousSelect.add(new Option(t(exp.name), key));
    });
    if (currentFamous) famousSelect.value = currentFamous;

    if (!gameState.colliderInitialized) {
        // Run Famous Experiment Button
        runFamousBtn.addEventListener('click', () => {
            const selectedKey = famousSelect.value;
            const exp = famousExperiments[selectedKey];
            if (!exp) return;

            beam1.value = exp.beam1;
            beam2.value = exp.beam2;
            slider.value = exp.energy;
            
            // Dispatch input event to update UI
            slider.dispatchEvent(new Event('input'));

            runColliderSimulation(exp);
        });

        // Run Manual Experiment Button
        runBtn.addEventListener('click', () => runColliderSimulation(null)); // REPAIR: Ensure this is only added once
        
        gameState.colliderInitialized = true;
    }

    if (zoomInBtn && zoomOutBtn) {
        zoomInBtn.onclick = () => {
            gameState.colliderZoom = Math.min(gameState.colliderZoom + 0.2, 3.0);
            if (!gameState.canvasAnimId) initColliderCanvas(true); // REPAIR: Use gameState.canvasAnimId
        };
        zoomOutBtn.onclick = () => {
            gameState.colliderZoom = Math.max(gameState.colliderZoom - 0.2, 0.5);
            if (!gameState.canvasAnimId) initColliderCanvas(true); // REPAIR: Use gameState.canvasAnimId
        };
    }
    
    // Add 3D effect to collider buttons
    addCard3DEffect(runBtn);
    addCard3DEffect(runFamousBtn);
    // Add 3D effect to compare/export buttons
    addCard3DEffect(document.getElementById('compare-btn'));
    addCard3DEffect(document.getElementById('export-pdf-btn'));

    // Download Data Functionality
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const energy = energyVal.textContent;
            const events = eventsVal.textContent;
            const csvContent = "data:text/csv;charset=utf-8," 
                + "Parameter,Value\n"
                + `Energy,${energy} TeV\n`
                + `Events,${events}\n`
                + `Luminosity,${lumiVal.textContent}\n`
                + `Timestamp,${new Date().toISOString()}`;
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "qedit_experiment_data.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    
    // Internal Simulation Function
    function runColliderSimulation(experiment) {
        if (runBtn.disabled) return;

        // REPAIR: Reset all relevant state variables for a new experiment
        if (gameState.canvasAnimId) stopCanvasAnimation();
        initHistogram(); // Reset histogram
        
        // Clear previous histogram data (redundant with initHistogram but good for clarity)
        if (gameState.histogramChart) {
            gameState.histogramChart.data.datasets[0].data = new Array(20).fill(0);
            gameState.histogramChart.update('none');
        }
        
        // REPAIR: Reset UI elements
        if(eventsVal) eventsVal.textContent = '0';
        if(lumiVal) lumiVal.textContent = '0';
        if(rateVal) rateVal.textContent = '0';
        if(effVal) effVal.textContent = '0%';
        if(crossSectionVal) crossSectionVal.textContent = '0';

        const p1Id = beam1.value;
        const p2Id = beam2.value;
        const p1 = particles.find(p => p.id === p1Id);
        const p2 = particles.find(p => p.id === p2Id);

        if (!p1 || !p2) {
            logTerminal(t("term_error_beam"), true);
            return;
        }
        if(downloadBtn) downloadBtn.disabled = true; // REPAIR: Disable download button during simulation

        // Disable both simulation triggers
        runBtn.disabled = true;
        runFamousBtn.disabled = true;
        runBtn.textContent = t("term_exp_running"); // REPAIR: Update button text
        
        // Clear Analysis Panel
        const analysisList = document.getElementById('particle-analysis-list');
        if(analysisList) analysisList.innerHTML = `<div class="text-blue-400 animate-pulse text-center mt-10 uppercase tracking-widest text-[9px]">${t('analyzing_debris')}</div>`;
        const statusSpinner = document.getElementById('status-spinner');
        if(statusSpinner) statusSpinner.classList.remove('hidden');

        document.getElementById('led-beam').className = 'w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_#eab308]';
        document.getElementById('system-status-text').textContent = t('beam_injection');
        document.getElementById('system-status-text').className = 'text-yellow-500';
        
        startCanvasAnimation(p1, p2); // REPAIR: Start canvas animation
        
        // Ensure terminal is ready
        if(!gameState.terminalCleared) { document.getElementById('terminal-logs').innerHTML = ''; gameState.terminalCleared = true; }
        
        if (experiment) {
            logTerminal(`${t("term_sim_exp")} ${t(experiment.name)}`, true);
        } else {
            logTerminal(`${t("term_init_collision")} ${t(p1.name)} vs ${t(p2.name)}`, true); 
        }
        logTerminal(`${t("term_target_energy")} ${slider.value} TeV`, true);
        
        let progress = 0; // Simulation progress (0-100)
        let currentEventsCount = parseInt(eventsVal.textContent.replace(/,/g, '')) || 0; // REPAIR: Use consistent variable name
        
        // REPAIR: Use slider value directly for logic, avoiding parsing issues
        const energyForLogic = parseFloat(slider.value); 
        
        const simulationInterval = setInterval(() => { // REPAIR: Renamed for clarity
            progress += 5;
            updateHistogramLive(energyForLogic); // REPAIR: Pass correct energy
            
            // REPAIR: Update live stats with normalized energy
            if(lumiVal) lumiVal.textContent = (Math.random() * 10 * energyForLogic).toFixed(2) + "e34";
            if(rateVal) {
                const rate = (Math.random() * 40 * energyForLogic).toFixed(0);
                rateVal.textContent = rate + " kHz";
            }
            if(effVal) effVal.textContent = (85 + Math.random() * 15).toFixed(1) + "%";
            if(crossSectionVal) crossSectionVal.textContent = (Math.random() * 100 * energyForLogic).toFixed(2) + " mb";

            if (progress === 50) { // Mid-point of simulation, collision detected
                document.getElementById('led-collision').className = 'w-2 h-2 rounded-full bg-red-500 shadow-[0_0_15px_#ef4444] animate-pulse';
                document.getElementById('system-status-text').textContent = t('collision_detected');
                document.getElementById('system-status-text').className = 'text-red-500 font-black';
            }
            
            if (Math.random() > 0.7) {
                logTerminal(`${t("term_signal_detected")} ${Math.floor(Math.random() * 1000)} GeV...`);
            }

            if (progress >= 100) {
                clearInterval(simulationInterval); // REPAIR: Clear the correct interval
                setTimeout(() => stopCanvasAnimation(), 1000); // REPAIR: Give explosion more time
                
                document.getElementById('led-beam').className = 'w-2 h-2 rounded-full bg-gray-500';
                document.getElementById('led-collision').className = 'w-2 h-2 rounded-full bg-gray-500';
                document.getElementById('system-status-text').textContent = t('data_acquisition_complete');
                document.getElementById('system-status-text').className = 'text-blue-500';
                if(statusSpinner) statusSpinner.classList.add('hidden');

                currentEventsCount += Math.floor(energyForLogic * 1250); // REPAIR: Use correct energy variable
                runDataAnalysis(energyForLogic); // REPAIR: Pass correct energy
                if(eventsVal) eventsVal.textContent = currentEventsCount.toLocaleString(); // REPAIR: Use consistent variable name
                
                finishExperiment(experiment);
                
                runBtn.disabled = false;
                runFamousBtn.disabled = false;
                runBtn.textContent = t("collider_btn_init");
                if(downloadBtn) downloadBtn.disabled = false;
                
                setTimeout(() => { document.getElementById('system-status-text').textContent = t('system_ready'); document.getElementById('system-status-text').className = 'text-green-500'; }, 2000);
            }
        }, 100);
    }
}

function initHistogram() {
    const ctx = document.getElementById('histogram-canvas');
    if (!ctx) return;
    if (gameState.histogramChart) gameState.histogramChart.destroy();

    gameState.histogramChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length: 20}, (_, i) => i),
            datasets: [{
                data: new Array(20).fill(0),
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
                barPercentage: 1,
                categoryPercentage: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { display: false } },
                x: { grid: { display: false }, ticks: { display: false } }
            }
        }
    });
}

function updateHistogramLive(targetEnergy) {
    if (!gameState.histogramChart) return;
    const data = gameState.histogramChart.data.datasets[0].data;
    const centerIdx = Math.floor((targetEnergy / 14) * 19);

    for(let i=0; i<data.length; i++) {
        const dist = Math.abs(i - centerIdx);
        const probability = Math.exp(-(dist * dist) / 8); // REPAIR: Smoother distribution
        data[i] += Math.random() * 40 * probability + Math.random() * 5;
    }
    gameState.histogramChart.update('none');
}

// Canvas Animation Logic
function initColliderCanvas(drawStatic = true) { // REPAIR: Renamed parameter for clarity
    const canvas = document.getElementById('collider-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Resize canvas
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width || 800;
    canvas.height = rect.height || 300;
    
    if (drawStatic && !gameState.canvasAnimId) { // REPAIR: Only draw static if not animating
        const zoom = gameState.colliderZoom;
        // Static draw (idle state)
        if (gameState.theme === 'cyberpunk') {
            ctx.fillStyle = '#050505';
            ctx.strokeStyle = '#00f3ff';
        } else {
            ctx.fillStyle = gameState.theme === 'dark' ? '#000' : '#f3f4f6';
            ctx.strokeStyle = gameState.theme === 'dark' ? '#1a1a1a' : '#d1d5db';
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw tunnel perspective
        
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, 50, 0, Math.PI*2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, 0); ctx.lineTo(canvas.width/2 - 35, canvas.height/2 - 35);
        ctx.moveTo(canvas.width, 0); ctx.lineTo(canvas.width/2 + 35, canvas.height/2 - 35);
        ctx.moveTo(0, canvas.height); ctx.lineTo(canvas.width/2 - 35, canvas.height/2 + 35);
        ctx.moveTo(canvas.width, canvas.height); ctx.lineTo(canvas.width/2 + 35, canvas.height/2 + 35);
        
        // Apply zoom to static rings
        for(let r=1; r<=3; r++) {
             ctx.moveTo(canvas.width/2 + 50*r*zoom, canvas.height/2);
             ctx.arc(canvas.width/2, canvas.height/2, 50*r*zoom, 0, Math.PI*2);
        }
        ctx.stroke();
    }
}

function startCanvasAnimation(p1, p2) {
    if (gameState.canvasAnimId) { // REPAIR: Use gameState.canvasAnimId
        cancelAnimationFrame(gameState.canvasAnimId);
    }

    // REPAIR: Reset animation state for a new run
    const canvas = document.getElementById('collider-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let frame = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let beamZ = 1000; // Z-position of beams, starts far away
    let exploded = false;
    let explosionParticles = [];
    
    // 3D Particle System
    let particles3D = [];
    const numParticles = 100;

    // Initialize tunnel particles
    for(let i=0; i<numParticles; i++) {
        particles3D.push({
            x: (Math.random() - 0.5) * canvas.width,
            y: (Math.random() - 0.5) * canvas.height,
            z: Math.random() * 1000,
            color: gameState.theme === 'cyberpunk' 
                ? (Math.random() > 0.5 ? '#00f3ff' : '#ff00ff')
                : (gameState.theme === 'dark' 
                    ? (Math.random() > 0.5 ? '#1a1a1a' : '#333') 
                    : (Math.random() > 0.5 ? '#e5e7eb' : '#d1d5db'))
        });
    }

    function animate() {
        if (gameState.theme === 'cyberpunk') {
            ctx.fillStyle = 'rgba(5, 5, 5, 0.3)';
        } else {
            ctx.fillStyle = gameState.theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(243, 244, 246, 0.3)'; // Trail effect
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Tunnel
        particles3D.forEach((p, i) => {
            p.z -= 10; // Move towards viewer
            if (p.z <= 0) p.z = 1000;

            const scale = (500 / (500 + p.z)) * gameState.colliderZoom; // Perspective projection with zoom
            const x2d = centerX + p.x * scale; // REPAIR: Use p.x and p.y for particle position
            const y2d = centerY + p.y * scale; // REPAIR: Use p.x and p.y for particle position
            // REPAIR: Index 'i' is now correctly passed to forEach
            const size = Math.max(0.5, (i % 5 === 0 ? 4 : 2) * scale);

            ctx.fillStyle = p.color;
            ctx.beginPath(); ctx.arc(x2d, y2d, size, 0, Math.PI*2); ctx.fill();
        });

        if (!exploded) { // REPAIR: Only animate beams if not exploded
            beamZ -= 18; // Increased speed for high-energy feel
            
            // REPAIR: Logic - Beams should converge with perspective
            const zProgress = beamZ / 1000;
            const beamSpread = canvas.width * 0.35; // How far apart beams start
            const x1 = centerX - (beamSpread * zProgress); // Beam 1 starts left, moves right
            const x2 = centerX + (beamSpread * zProgress); // Beam 2 starts right, moves left
            const y = centerY;

            // Visual dot size grows as it approaches center
            const dotSize = (4 + (1 - zProgress) * 8) * gameState.colliderZoom;
            
            // Draw Laser Trails
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.1)';
            ctx.setLineDash([5, 15]);
            ctx.beginPath(); 
            ctx.moveTo(0, centerY); 
            ctx.lineTo(x1, y); 
            ctx.stroke();

            ctx.strokeStyle = 'rgba(255, 0, 85, 0.1)';
            ctx.beginPath(); 
            ctx.moveTo(canvas.width, centerY); 
            ctx.lineTo(x2, y); 
            ctx.stroke();
            ctx.setLineDash([]);

            // Draw Beams
            ctx.fillStyle = '#00f3ff';
            ctx.shadowBlur = 25; ctx.shadowColor = '#00f3ff';
            ctx.beginPath(); ctx.arc(x1, y, dotSize, 0, Math.PI*2); ctx.fill();

            ctx.fillStyle = '#ff0055';
            ctx.shadowBlur = 25; ctx.shadowColor = '#ff0055';
            ctx.beginPath(); ctx.arc(x2, y, dotSize, 0, Math.PI*2); ctx.fill();

            // Chromatic Aberration Effect (subtle split)
            if (beamZ < 100) { // Closer to collision
                ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = 'rgba(0, 255, 255, 0.2)'; // Cyan
                ctx.beginPath(); ctx.arc(x1 + 2, y, dotSize * 1.2, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = 'rgba(255, 0, 255, 0.2)'; // Magenta
                ctx.beginPath(); ctx.arc(x2 - 2, y, dotSize * 1.2, 0, Math.PI * 2); ctx.fill();
                ctx.globalCompositeOperation = 'source-over';
            }

            // Collision at center (approx Z=0 relative to center logic, but here visually when they meet)
            if (beamZ <= 0) {
                exploded = true;
                // Console Shake Effect
                const consoleGrid = document.getElementById('console-grid');
                if(consoleGrid) {
                    consoleGrid.classList.add('shake-anim');
                    setTimeout(() => consoleGrid.classList.remove('shake-anim'), 500);
                }
                // Generate explosion debris
                for(let i=0; i<50; i++) {
                    explosionParticles.push({
                        x: centerX, y: centerY,
                        vx: (Math.random() - 0.5) * 15,
                        vy: (Math.random() - 0.5) * 15,
                        color: Math.random() > 0.5 ? '#ffcc00' : '#00f3ff', // Yellow/Cyan debris
                        life: 1.0
                    });
                }
            }
        } else {
            // Explosion Animation
            explosionParticles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;
                
                if (p.life > 0) {
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.life;
                    ctx.shadowBlur = 0;
                    ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI*2); ctx.fill();
                    ctx.globalAlpha = 1.0;
                }
            });
            
            // Flash effect
            if (frame < 20) {
                ctx.fillStyle = `rgba(255, 255, 255, ${1 - frame/20})`;
                ctx.fillRect(0,0,canvas.width, canvas.height);
            }
        }

        frame++;
        gameState.canvasAnimId = requestAnimationFrame(animate); // REPAIR: Use gameState.canvasAnimId
    }
    animate();
}

function stopCanvasAnimation() {
    cancelAnimationFrame(gameState.canvasAnimId); // REPAIR: Cancel the correct animation frame
    gameState.canvasAnimId = null;
    initColliderCanvas(true); // REPAIR: Reset to idle state, drawing static elements
}

function updateChart() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        const h = Math.floor(Math.random() * 100);
        bar.style.height = `${h}%`;
    });
}

function logTerminal(msg, isInstant = false) { // REPAIR: Added isInstant parameter
    const term = document.getElementById('terminal-logs');
    if (!gameState.terminalCleared) {
        term.innerHTML = '';
        gameState.terminalCleared = true;
    }
    const line = document.createElement('div');
    // Add the prompt arrow, but don't add the message yet
    line.textContent = `> `;
    term.appendChild(line);

    // If instant, just set the text and scroll
    if (isInstant) {
        line.textContent += msg;
        term.scrollTop = term.scrollHeight;
        return;
    }

    // Otherwise, type it out
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < msg.length) {
            line.textContent += msg.charAt(i);
            i++;
            // Auto-scroll doar dacă utilizatorul nu a scrollat manual în sus pentru a citi
            if (term.scrollHeight - term.scrollTop - term.clientHeight < 50) {
                term.scrollTop = term.scrollHeight;
            }
        } else {
            clearInterval(typingInterval);
            gameState.typingIntervals = gameState.typingIntervals.filter(id => id !== typingInterval);
        }
    }, 15); // Typing speed in ms
    gameState.typingIntervals.push(typingInterval);

    term.scrollTop = term.scrollHeight;
}

function finishExperiment(experiment = null) {
    const energyInput = document.getElementById('energy-slider');
    if(!energyInput) return;
    
    const energy = parseFloat(energyInput.value);
    
    if (experiment) {
        logTerminal(t("term_historic_result"));
        logTerminal(t(experiment.outcome));
    } else {
        // Discovery logic
        const chance = (energy / 14);
        const roll = Math.random();
        
        if (roll < chance * 0.1) {
            logTerminal(t("term_rare_higgs"));
            logTerminal(t("term_analysis_5sigma"));
            logTerminal(t("term_storage_tier0"));
        } else if (roll < chance) {
            logTerminal(t("term_significant_event"));
        } else {
            logTerminal(t("term_standard_collision"));
        }
    }
    
    logTerminal(t("term_exp_finished"));
    showToast(t("term_exp_finished"), 'info');
}

// Modal Logic
function initModal() {
    const modal = document.getElementById('particle-modal');
    const closeBtn = document.getElementById('close-modal');

    // REPAIR: Safety check
    if (!modal || !closeBtn) return;

    // Use addEventListener for better reliability
    closeBtn.addEventListener('click', () => {
        document.body.style.overflow = ''; // Re-enable background scroll
        
        const typewriterPara = document.getElementById('modal-typewriter-desc');
        if (typewriterPara && typewriterPara.dataset.typingInterval) {
            clearInterval(parseInt(typewriterPara.dataset.typingInterval));
        }
        if (typewriterPara) typewriterPara.textContent = '';

        // Adăugăm un listener pentru 'transitionend' pentru a ascunde complet modalul după tranziția CSS
        // Acest lucru asigură că 'display: none' este aplicat doar după ce animația vizuală de închidere este completă.
        modal.addEventListener('transitionend', function handler() {
            // Adăugăm clasa 'hidden' doar dacă modalul este de fapt închis (nu are clasa 'open')
            if (!modal.classList.contains('open')) {
                modal.classList.add('hidden');
            }
            // Eliminăm listener-ul de eveniment pentru a preveni declanșarea multiplă la tranzițiile ulterioare
            modal.removeEventListener('transitionend', handler);
        }, { once: true }); // Folosim { once: true } pentru browserele moderne pentru a elimina automat listener-ul

        modal.classList.remove('open'); // Aceasta declanșează tranziția CSS pentru opacitate și vizibilitate
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeBtn.click();
    });
}

function openModal(p) {
    gameState.currentParticle = p;
    const modal = document.getElementById('particle-modal');
    const content = document.getElementById('modal-content');
    const shareBtn = document.getElementById('share-modal-btn');
    if (shareBtn) shareBtn.classList.remove('hidden');

    document.body.style.overflow = 'hidden'; // Lock background scroll
    if (shareBtn) {
        shareBtn.onclick = () => {
            const shareText = `${t('app_title')}\n` +
                `${t(p.name)}\n` +
                `----------------\n` +
                `${t('mass')}: ${formatUnit(p.mass, 'mass')}\n` +
                `${t('charge')}: ${p.charge}\n` +
                `${t('spin')}: ${p.spin}\n` +
                `\n${t(p.desc)}`;

            navigator.clipboard.writeText(shareText).then(() => {
                showToast(t('share_success'), 'success');
                
                // Visual feedback
                const originalIcon = shareBtn.innerHTML;
                shareBtn.innerHTML = '<i class="fa-solid fa-check fa-xl text-green-500"></i>';
                setTimeout(() => {
                    shareBtn.innerHTML = originalIcon;
                }, 2000);
            }).catch(err => console.error('Copy failed', err));
        };
    }
    
    const catInfo = categoryInfo[p.type];
    const fullDesc = t(p.desc);
    let compositionHtml = '';
    if (p.composition) {
        const ingredients = p.composition.map(c => 
            `<span class="inline-block w-10 h-10 text-center leading-10 bg-white dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600 font-bold shadow-sm">${c}</span>`
        ).join('<span class="mx-2 text-gray-500">+</span>');
        compositionHtml = `
            <div class="mt-6 bg-gray-50 dark:bg-gray-800/30 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 class="text-xs text-gray-500 uppercase tracking-widest mb-3">${t('composition')}</h4>
                <div class="flex items-center justify-center gap-2">${ingredients}</div>
            </div>
        `;
    }

    let generationHtml = '';
    if (p.generation) {
        generationHtml = `
            <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-500 transition-colors group">
                <div class="text-xs text-gray-500 uppercase tracking-wider mb-1 group-hover:text-amber-500 transition-colors flex items-center gap-2">
                    <i class="fa-solid fa-layer-group"></i> ${t('generation')}
                </div>
                <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-100">${p.generation}</div>
            </div>
        `;
    }

    // Add fade-in animation to content wrapper
    content.classList.remove('fade-in-content');
    void content.offsetWidth; // Trigger reflow
    content.classList.add('fade-in-content');

    content.innerHTML = `
        <div class="flex flex-col md:flex-row gap-8 relative z-10">
            <!-- Left Column: Visual Profile & Quick Stats -->
            <div class="md:w-2/5 flex flex-col gap-6">
                <div class="flex flex-col items-center text-center p-6 rounded-3xl bg-white/5 dark:bg-black/20 border border-white/10 modal-item" style="animation-delay: 0.1s">
                    <div class="w-32 h-32 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center border-4 ${catInfo.color.replace('text-', 'border-')} shadow-2xl relative overflow-hidden group mb-4 transform rotate-3">
                        <span class="font-serif font-bold text-6xl text-gray-800 dark:text-white">${p.symbol}</span>
                    </div>
                    <h2 class="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-1 modal-gradient-text">${t(p.name)}</h2>
                    <span class="text-xs font-bold px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 ${catInfo.color} uppercase tracking-widest border border-gray-300 dark:border-gray-700">${t(catInfo.name)}</span>
                </div>

                <div class="grid grid-cols-2 gap-3 modal-item" style="animation-delay: 0.2s">
                    <div class="bg-white/5 dark:bg-black/20 p-3 rounded-2xl border border-white/5">
                        <div class="text-[10px] text-gray-500 uppercase font-bold mb-1">${t('mass')}</div>
                        <div class="text-sm font-mono font-bold dark:text-white">${formatUnit(p.mass, 'mass') || 'N/A'}</div>
                    </div>
                    <div class="bg-white/5 dark:bg-black/20 p-3 rounded-2xl border border-white/5">
                        <div class="text-[10px] text-gray-500 uppercase font-bold mb-1">${t('charge')}</div>
                        <div class="text-sm font-mono font-bold dark:text-white">${p.charge || '0'}</div>
                    </div>
                    <div class="bg-white/5 dark:bg-black/20 p-3 rounded-2xl border border-white/5">
                        <div class="text-[10px] text-gray-500 uppercase font-bold mb-1">${t('spin')}</div>
                        <div class="text-sm font-mono font-bold dark:text-white">${p.spin || '?'}</div>
                    </div>
                    <div class="bg-white/5 dark:bg-black/20 p-3 rounded-2xl border border-white/5">
                        <div class="text-[10px] text-gray-500 uppercase font-bold mb-1">${t('generation')}</div>
                        <div class="text-sm font-mono font-bold dark:text-white">${p.generation || '-'}</div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Deep Insights & Composition -->
            <div class="md:w-3/5 flex flex-col gap-6">
                <div class="bg-blue-50/30 dark:bg-blue-900/5 p-6 rounded-3xl border border-blue-100/20 modal-item h-full" style="animation-delay: 0.3s">
                    <h4 class="text-xs font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2 modal-gradient-text">
                        <i class="fa-solid fa-microscope"></i> ${t('analysis_lore')}
                    </h4>
                    <p id="modal-typewriter-desc" class="text-gray-700 dark:text-gray-300 leading-relaxed text-lg font-medium italic min-h-[80px]"></p> 
                    
                    ${compositionHtml ? `<div class="mt-6">${compositionHtml}</div>` : ''}
                </div>

                <div class="bg-white/5 dark:bg-black/10 p-6 rounded-3xl border border-white/5 modal-item" style="animation-delay: 0.4s">
                    <h4 class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">${t('field_classification')}</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">${t(catInfo.desc)}</p>
                </div>
            </div>
        </div>
        
        <!-- Decorative Background Element -->
        <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr ${catInfo.color.replace('text-', 'from-').replace('400', '600')} to-transparent opacity-10 rounded-full blur-3xl pointer-events-none"></div>
    `;

    modal.classList.remove('hidden');
    
    // Resetăm animațiile anterioare pentru a preveni blocarea stării
    modal.getAnimations().forEach(anim => anim.cancel());
    const panel = document.getElementById('modal-panel');
    panel.getAnimations().forEach(anim => anim.cancel());

    const isCyber = document.documentElement.classList.contains('cyberpunk');

    panel.animate([
        { transform: 'scale(0.9) translateY(40px)', opacity: 0, filter: 'blur(10px)' },
        { transform: `scale(1) translateY(0) ${isCyber ? 'skewX(2deg)' : ''}`, opacity: 1, filter: 'blur(0)' }
    ], { duration: 500, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards' });

    modal.classList.add('open');

    // Pornim typewriter-ul după ce animația de scalare este aproape gata
    setTimeout(() => {
        typeWriter(document.getElementById('modal-typewriter-desc'), `"${fullDesc}"`);
    }, 400);
}

// Toast Notification System
function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const colors = {
        success: 'bg-green-600 text-white',
        error: 'bg-red-600 text-white',
        info: 'bg-blue-600 text-white'
    };
    
    toast.className = `${colors[type]} px-6 py-3 rounded shadow-lg toast-enter flex items-center gap-3 min-w-[300px] backdrop-blur-md bg-opacity-90`;
    
    let icon = 'fa-info-circle';
    if(type === 'success') icon = 'fa-check-circle';
    if(type === 'error') icon = 'fa-exclamation-circle';
    
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span class="font-medium">${msg}</span>`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('toast-enter');
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Other Functions (Compare)
function initOtherFunctions() {
    const p1Select = document.getElementById('compare-p1');
    const p2Select = document.getElementById('compare-p2');
    const compareBtn = document.getElementById('compare-btn');
    const exportBtn = document.getElementById('export-pdf-btn');
    
    if (!p1Select || !p2Select || !compareBtn || !exportBtn) return;

    // Populate dropdowns
    const sortedParticles = particles
        .filter(p => !['Baryon', 'Meson'].includes(p.type) && !p.isAntimatter)
        .sort((a, b) => t(a.name).localeCompare(t(b.name)));
    
    [p1Select, p2Select].forEach(select => {
        select.innerHTML = '';
        sortedParticles.forEach(p => {
            select.add(new Option(t(p.name), p.id));
        });
    });
    
    // Set default different values if possible
    if (sortedParticles.length > 1) {
        p2Select.selectedIndex = 1;
    }

    compareBtn.addEventListener('click', () => {
        const id1 = p1Select.value;
        const id2 = p2Select.value;
        
        const p1 = particles.find(p => p.id === id1);
        const p2 = particles.find(p => p.id === id2);
        
        renderComparisonTable(p1, p2);
    });

    exportBtn.addEventListener('click', () => {
        const element = document.getElementById('compare-result');
        if (!element || element.classList.contains('hidden')) return;

        // Use html2canvas to capture the element
        html2canvas(element, {
            backgroundColor: getComputedStyle(document.body).backgroundColor // Capture current theme bg
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('qedit_comparison_report.pdf');
        });
    });
}

function renderComparisonTable(p1, p2) {
    const container = document.getElementById('compare-result');
    container.classList.remove('hidden');
    document.getElementById('export-pdf-btn').classList.remove('hidden');
    
    const properties = [
        { key: 'name', label: t('name_label') },
        { key: 'symbol', label: t('symbol_label'), isHtml: true },
        { key: 'type', label: t('type_label') },
        { key: 'mass', label: t('mass') },
        { key: 'charge', label: t('charge') },
        { key: 'spin', label: t('spin') },
        { key: 'generation', label: t('generation') }
    ];

    let rows = properties.map(prop => {
        let val1 = t(p1[prop.key]) || '-';
        let val2 = t(p2[prop.key]) || '-';
        
        if (prop.key === 'type') {
             val1 = t(categoryInfo[p1.type].name);
             val2 = t(categoryInfo[p2.type].name);
        }
        
        if (prop.key === 'mass') {
            val1 = formatUnit(val1, 'mass');
            val2 = formatUnit(val2, 'mass');
        }

        if (prop.key === 'generation' && !p1.generation) val1 = '-';
        if (prop.key === 'generation' && !p2.generation) val2 = '-';

        const content1 = prop.isHtml ? val1 : document.createTextNode(val1).textContent;
        const content2 = prop.isHtml ? val2 : document.createTextNode(val2).textContent;
        
        const isDiff = val1 !== val2;
        const rowClass = isDiff ? 'bg-yellow-100/50 dark:bg-yellow-900/20' : '';

        return `
            <tr class="border-b border-gray-300 dark:border-gray-700 ${rowClass} hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                <td class="p-4 font-semibold text-gray-600 dark:text-gray-400 w-1/3">${prop.label}</td>
                <td class="p-4 text-gray-800 dark:text-gray-200 font-mono w-1/3 text-center border-l border-gray-300 dark:border-gray-700">${content1}</td>
                <td class="p-4 text-gray-800 dark:text-gray-200 font-mono w-1/3 text-center border-l border-gray-300 dark:border-gray-700">${content2}</td>
            </tr>
        `;
    }).join('');

    // Update container with Grid layout for Table and Chart
    container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="overflow-hidden rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
                <table class="w-full text-left border-collapse bg-white dark:bg-gray-900">
                    <tbody>${rows}</tbody>
                </table>
            </div>
            <div class="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 flex items-center justify-center">
                <div class="w-full h-64 relative">
                    <canvas id="compare-chart"></canvas>
                </div>
            </div>
        </div>
    `;

    // Render Chart
    if (gameState.comparisonChart) {
        gameState.comparisonChart.destroy();
    }

    const ctx = document.getElementById('compare-chart').getContext('2d');
    const p1Data = getParticleStats(p1);
    const p2Data = getParticleStats(p2);

    const isLight = document.documentElement.classList.contains('light');
    const chartColors = {
        p1: {
            fill: isLight ? 'rgba(236, 72, 153, 0.4)' : 'rgba(234, 179, 8, 0.2)',
            border: isLight ? '#db2777' : 'rgba(234, 179, 8, 1)'
        },
        p2: {
            fill: isLight ? 'rgba(13, 148, 136, 0.4)' : 'rgba(59, 130, 246, 0.2)',
            border: isLight ? '#0d9488' : 'rgba(59, 130, 246, 1)'
        }
    };

    gameState.comparisonChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [t('chart_mass'), t('chart_charge'), t('chart_spin'), t('chart_generation')],
            datasets: [
                {
                    label: t(p1.name),
                    data: p1Data,
                    backgroundColor: chartColors.p1.fill,
                    borderColor: chartColors.p1.border,
                    pointBackgroundColor: chartColors.p1.border,
                    borderWidth: 2
                },
                {
                    label: t(p2.name),
                    data: p2Data,
                    backgroundColor: chartColors.p2.fill,
                    borderColor: chartColors.p2.border,
                    pointBackgroundColor: chartColors.p2.border,
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(128, 128, 128, 0.2)' },
                    grid: { color: 'rgba(128, 128, 128, 0.2)' },
                    pointLabels: { 
                        color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                        font: { size: 12 }
                    },
                    suggestedMin: 0
                }
            },
            plugins: {
                legend: {
                    labels: { color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }
                }
            }
        }
    });
}

function getParticleStats(p) {
    // Normalize Mass (Log scale eV)
    let massVal = 0;
    if (p.mass && p.mass !== '0') {
        const val = parseFloat(p.mass.replace(/[^\d.-]/g, ''));
        if (p.mass.includes('TeV')) massVal = Math.log10(val * 1e12);
        else if (p.mass.includes('GeV')) massVal = Math.log10(val * 1e9);
        else if (p.mass.includes('MeV')) massVal = Math.log10(val * 1e6);
        else if (p.mass.includes('keV')) massVal = Math.log10(val * 1e3);
        else if (p.mass.includes('eV')) massVal = Math.log10(val);
    }
    
    // Normalize Charge
    let chargeVal = 0;
    if (p.charge) {
        if (p.charge.includes('/')) {
            const parts = p.charge.split('/');
            chargeVal = parseFloat(parts[0]) / parseFloat(parts[1]);
        } else {
            chargeVal = parseFloat(p.charge.replace('±', ''));
        }
    }
    
    // Normalize Spin
    let spinVal = 0;
    if (p.spin) {
        if (p.spin.includes('/')) {
            const parts = p.spin.split('/');
            spinVal = parseFloat(parts[0]) / parseFloat(parts[1]);
        } else {
            spinVal = parseFloat(p.spin);
        }
    }
    
    // Generation
    let genVal = p.generation || 0;
    
    return [Math.max(0, massVal), chargeVal, spinVal, genVal];
}

// Quiz System
function initQuiz() {
    const startBtn = document.getElementById('quiz-start-btn');
    const restartBtn = document.getElementById('quiz-restart-btn');
    const quitBtn = document.getElementById('quiz-quit-btn');
    const homeBtn = document.getElementById('quiz-home-btn');
    const clearLeaderboardBtn = document.getElementById('clear-leaderboard-btn');
    const exportCsvBtn = document.getElementById('export-leaderboard-csv-btn');
    
    if (!gameState.quizInitialized) {
        if (startBtn) startBtn.addEventListener('click', startQuiz);
        if (restartBtn) restartBtn.addEventListener('click', startQuiz);
        if (quitBtn) quitBtn.addEventListener('click', quitQuiz);
        if (homeBtn) homeBtn.addEventListener('click', showQuizHome);
        if (clearLeaderboardBtn) clearLeaderboardBtn.addEventListener('click', clearLeaderboard);
        if (exportCsvBtn) exportCsvBtn.addEventListener('click', exportLeaderboardToCsv);
        gameState.quizInitialized = true;
    }

    renderLeaderboard();
}

function startQuiz() {
    gameState.quiz.score = 0;
    gameState.quiz.currentQuestion = 0;
    gameState.quiz.questions = generateQuizQuestions();
    
    document.getElementById('quiz-start-screen').classList.add('hidden');
    document.getElementById('quiz-result-screen').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    
    renderQuizQuestion();
}

function quitQuiz() {
    showQuizHome();
}

function showQuizHome() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('quiz-result-screen').classList.add('hidden');
    document.getElementById('quiz-start-screen').classList.remove('hidden');
    renderLeaderboard();
}

function generateQuizQuestions() {
    const questions = [];
    const questionTypes = ['type', 'charge', 'symbol'];
    
    for (let i = 0; i < 5; i++) {
        const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        const particle = particles[Math.floor(Math.random() * particles.length)];
        let qText = '', options = [], correctAnswer = '';

        if (type === 'type') {
            qText = t('quiz_q_type', [t(particle.name)]);
            correctAnswer = t(categoryInfo[particle.type].name);
            const allTypes = [...new Set(particles.map(p => t(categoryInfo[p.type].name)))];
            options = [correctAnswer, ...allTypes.filter(t => t !== correctAnswer)].slice(0, 4);
        } else if (type === 'charge') {
            qText = t('quiz_q_charge', [t(particle.name)]);
            correctAnswer = particle.charge;
            const allCharges = [...new Set(particles.map(p => p.charge))];
            options = [correctAnswer, ...allCharges.filter(c => c !== correctAnswer)].sort(() => 0.5 - Math.random()).slice(0, 4);
        } else if (type === 'symbol') {
            qText = t('quiz_q_symbol', [particle.symbol]);
            correctAnswer = t(particle.name);
            const allNames = particles.map(p => t(p.name));
            options = [correctAnswer, ...allNames.filter(n => n !== correctAnswer)].sort(() => 0.5 - Math.random()).slice(0, 4);
        }

        // Shuffle options
        options.sort(() => 0.5 - Math.random());

        questions.push({
            text: qText,
            options: options,
            correct: correctAnswer,
            isHtml: type === 'symbol' // Symbol question has HTML in text
        });
    }
    return questions;
}

function renderQuizQuestion() {
    const qData = gameState.quiz.questions[gameState.quiz.currentQuestion];
    const qEl = document.getElementById('quiz-question');
    const optsEl = document.getElementById('quiz-options');
    const progressEl = document.getElementById('quiz-progress');
    const scoreEl = document.getElementById('quiz-score-display');

    if (qData.isHtml) qEl.innerHTML = qData.text;
    else qEl.textContent = qData.text;

    progressEl.textContent = `${gameState.quiz.currentQuestion + 1} / ${gameState.quiz.questions.length}`;
    scoreEl.textContent = `${t('quiz_score')} ${gameState.quiz.score}`;

    optsEl.innerHTML = '';
    qData.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-4 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-400 transition-all text-gray-800 dark:text-white font-medium shadow-sm';
        btn.textContent = opt;
        btn.onclick = () => handleQuizAnswer(btn, opt, qData.correct);
        optsEl.appendChild(btn);
    });
}

function handleQuizAnswer(btn, selected, correct) {
    const optsEl = document.getElementById('quiz-options');
    const buttons = optsEl.querySelectorAll('button');
    
    // Disable all buttons
    buttons.forEach(b => b.disabled = true);

    if (selected === correct) {
        btn.classList.remove('bg-white', 'dark:bg-gray-700');
        btn.classList.add('bg-green-500', 'text-white', 'border-green-600');
        gameState.quiz.score += 100;
        // Play success sound if available or visual feedback
    } else {
        btn.classList.remove('bg-white', 'dark:bg-gray-700');
        btn.classList.add('bg-red-500', 'text-white', 'border-red-600');
        
        // Highlight correct answer
        buttons.forEach(b => {
            if (b.textContent === correct) {
                b.classList.remove('bg-white', 'dark:bg-gray-700');
                b.classList.add('bg-green-500', 'text-white', 'border-green-600');
            }
        });
    }

    document.getElementById('quiz-score-display').textContent = `${t('quiz_score')} ${gameState.quiz.score}`;

    setTimeout(() => {
        gameState.quiz.currentQuestion++;
        if (gameState.quiz.currentQuestion < gameState.quiz.questions.length) {
            renderQuizQuestion();
        } else {
            // Quiz Finished
            saveScore(gameState.quiz.score, gameState.quiz.questions.length * 100);
            renderLeaderboard();
            
            document.getElementById('quiz-container').classList.add('hidden');
            const resultScreen = document.getElementById('quiz-result-screen');
            resultScreen.classList.remove('hidden');
            const finalMsg = document.getElementById('quiz-final-msg');
            finalMsg.textContent = `${t('quiz_score')} ${gameState.quiz.score} / ${gameState.quiz.questions.length * 100}`;
        }
    }, 1500);
}

function saveScore(score, maxScore) {
    let scores = JSON.parse(localStorage.getItem('qedit_quiz_scores') || '[]');
    scores.push({
        score: score,
        max: maxScore,
        date: new Date().toISOString()
    });
    // Sort descending by score
    scores.sort((a, b) => b.score - a.score);
    // Keep top 5
    scores = scores.slice(0, 5);
    localStorage.setItem('qedit_quiz_scores', JSON.stringify(scores));
}

function renderLeaderboard() {
    const container = document.getElementById('quiz-leaderboard');
    if (!container) return;
    
    const scores = JSON.parse(localStorage.getItem('qedit_quiz_scores') || '[]');
    
    if (scores.length === 0) {
        container.innerHTML = `<div class="text-center text-gray-500 italic py-4">${t('quiz_no_scores')}</div>`;
        return;
    }
    
    let html = '<table class="w-full text-left"><thead><tr class="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"><th class="pb-2 font-normal">#</th><th class="pb-2 font-normal">' + t('quiz_date') + '</th><th class="pb-2 text-right font-normal">' + t('quiz_score_label') + '</th></tr></thead><tbody>';
    
    scores.forEach((s, i) => {
        const date = new Date(s.date).toLocaleDateString(gameState.language === 'ro' ? 'ro-RO' : (gameState.language === 'fr' ? 'fr-FR' : 'en-US'));
        html += `<tr class="border-b border-gray-100 dark:border-gray-800 last:border-0">
            <td class="py-2 font-bold text-gray-500 w-8">${i + 1}</td>
            <td class="py-2 text-gray-600 dark:text-gray-400 text-xs">${date}</td>
            <td class="py-2 text-right font-mono font-bold text-purple-600 dark:text-purple-400">${s.score}/${s.max}</td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

function clearLeaderboard() {
    localStorage.removeItem('qedit_quiz_scores');
    renderLeaderboard();
}

function exportLeaderboardToCsv() {
    const scores = JSON.parse(localStorage.getItem('qedit_quiz_scores') || '[]');
    if (scores.length === 0) {
        showToast(t('quiz_no_scores'), 'info');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += `${t('quiz_date')},${t('quiz_score_label')}\n`; // Header row

    scores.forEach(s => {
        const date = new Date(s.date).toLocaleString(gameState.language === 'ro' ? 'ro-RO' : (gameState.language === 'fr' ? 'fr-FR' : 'en-US'));
        csvContent += `"${date}","${s.score}/${s.max}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "qedit_quiz_leaderboard.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(t('quiz_export_csv_success'), 'success');
}

function updateMemoryGameUI() {
    const grid = document.getElementById('memory-grid');
    // If the grid contains the placeholder text (no cards), update it
    if (grid && grid.children.length === 1 && grid.firstElementChild.classList.contains('text-gray-500')) {
        grid.firstElementChild.textContent = t('memory_start_prompt');
    }
}

// Memory Game
function initMemoryGame() {
    const startBtn = document.getElementById('memory-start-btn');
    if (startBtn && !gameState.memoryInitialized) {
        startBtn.addEventListener('click', startMemoryGame);
        gameState.memoryInitialized = true;
    }
    // Initialize placeholder text
    updateMemoryGameUI();
}

function startMemoryGame() {
    const grid = document.getElementById('memory-grid');
    const movesDisplay = document.getElementById('memory-moves');
    const timerDisplay = document.getElementById('memory-timer');
    
    // Reset State
    gameState.memory = {
        isPlaying: true,
        moves: 0,
        timer: 0,
        timerInterval: null,
        flippedCards: [],
        matchedPairs: 0,
        lockBoard: false
    };
    
    movesDisplay.textContent = '0';
    timerDisplay.textContent = '00:00';
    if (gameState.memory.timerInterval) clearInterval(gameState.memory.timerInterval);
    
    // Start Timer
    gameState.memory.timerInterval = setInterval(() => {
        gameState.memory.timer++;
        const mins = Math.floor(gameState.memory.timer / 60).toString().padStart(2, '0');
        const secs = (gameState.memory.timer % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${mins}:${secs}`;
    }, 1000);

    // Prepare Cards (8 pairs = 16 cards)
    const gameParticles = particles
        .filter(p => !['Baryon', 'Meson'].includes(p.type) && !p.isAntimatter)
        .sort(() => 0.5 - Math.random()).slice(0, 8);
    const cards = [...gameParticles, ...gameParticles].sort(() => 0.5 - Math.random());
    
    grid.innerHTML = '';
    cards.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.id = p.id;
        card.dataset.index = index;
        
        const typeColor = categoryInfo[p.type].color.replace('text-', 'border-');
        
        card.innerHTML = `
            <div class="memory-card-inner">
                <div class="memory-card-front bg-gray-300 dark:bg-gray-700 border-2 border-gray-400 dark:border-gray-600 flex items-center justify-center rounded-lg">
                    <i class="fa-solid fa-atom text-gray-500 text-2xl"></i>
                </div>
                <div class="memory-card-back bg-white dark:bg-gray-800 border-2 ${typeColor} flex flex-col items-center justify-center rounded-lg p-2">
                    <div class="font-serif font-bold text-2xl text-gray-800 dark:text-white mb-1">${p.symbol}</div>
                    <div class="text-xs text-center text-gray-600 dark:text-gray-400 leading-tight">${t(p.name)}</div>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => flipCard(card));
        grid.appendChild(card);
    });
}

function flipCard(card) {
    if (gameState.memory.lockBoard) return;
    if (card === gameState.memory.flippedCards[0]) return; // Don't flip same card twice
    if (card.classList.contains('flipped')) return; // Already matched

    card.classList.add('flipped');
    gameState.memory.flippedCards.push(card);

    if (gameState.memory.flippedCards.length === 2) {
        gameState.memory.moves++;
        document.getElementById('memory-moves').textContent = gameState.memory.moves;
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = gameState.memory.flippedCards;
    const isMatch = card1.dataset.id === card2.dataset.id;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    gameState.memory.matchedPairs++;
    gameState.memory.flippedCards = [];
    
    if (gameState.memory.matchedPairs === 8) {
        clearInterval(gameState.memory.timerInterval);
        showToast(t('memory_win'), 'success');
    }
}

function unflipCards() {
    gameState.memory.lockBoard = true;
    setTimeout(() => {
        gameState.memory.flippedCards.forEach(card => card.classList.remove('flipped'));
        gameState.memory.flippedCards = [];
        gameState.memory.lockBoard = false;
    }, 1000);
}

function runDataAnalysis(energy) {
    const list = document.getElementById('particle-analysis-list');
    if(!list) return;
    list.innerHTML = '';

    // Logic to "discover" particles based on energy
    let candidates = [
        { name: t('candidate_photon'), mass: '0 eV', sigma: 5.2, color: 'text-green-400' },
        { name: t('candidate_muon'), mass: '105 MeV', sigma: 4.8, color: 'text-blue-400' },
        { name: t('candidate_jet'), mass: 'Variable', sigma: 3.1, color: 'text-gray-400' }
    ];

    if (energy > 12) candidates.push({ name: t('candidate_higgs'), mass: '125.1 GeV', sigma: 5.0, color: 'text-red-500' });
    if (energy > 1.5) candidates.push({ name: t('candidate_top'), mass: '173 GeV', sigma: 4.9, color: 'text-purple-500' });

    candidates.forEach((c, i) => {
        setTimeout(() => {
            const item = document.createElement('div');
            item.className = 'flex justify-between items-center p-2 bg-white/5 rounded border-l-2 border-l-transparent hover:border-l-blue-500 transition-all reveal-item visible';
            item.innerHTML = `
                <div>
                    <span class="font-bold ${c.color}">${c.name}</span>
                    <div class="text-[9px] text-gray-500">${t('mass').toUpperCase()}: ${formatUnit(c.mass, 'mass')}</div>
                </div>
                <div class="text-right">
                    <span class="text-white">${c.sigma}&sigma;</span>
                    <div class="text-[9px] text-green-500">${t('confirmed')}</div>
                </div>
            `;
            list.appendChild(item);
        }, i * 300);
    });
}