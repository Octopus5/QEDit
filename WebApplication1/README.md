# QEDit - Subatomic Physics Exploration Suite

**QEDit** este o aplicație educațională desktop interactivă concepută pentru explorarea universului fascinant al fizicii particulelor elementare și a Modelului Standard.

## 🚀 Descriere Scurtă
O suită educațională completă care permite utilizatorilor să vizualizeze catalogul Modelului Standard, să sintetizeze hadroni într-un reactor virtual și să simuleze coliziuni la energii înalte (LHC), totul într-o interfață modernă și multilingvă.

## 🔬 Descriere Detaliată
**QEDit** (Quantum ElectroDynamics Toolkit) transformă conceptele abstracte ale fizicii subatomice într-o experiență digitală palpabilă. Aplicația este structurată în mai multe module cheie:

*   **Catalogul Modelului Standard:** O bază de date interactivă care prezintă proprietățile fundamentale (masă, sarcină, spin, generație) ale quarcilor, leptonilor și bosonilor.
*   **Reactor de Hadroni:** Un laborator de sinteză unde utilizatorii pot combina quarci pentru a crea particule compuse (barioni și mezoni), respectând rețetele fizice reale.
*   **Simulator de Coliziuni (LHC):** O replică digitală a sistemelor de control de la Large Hadron Collider, permițând setarea parametrilor de fascicul și simularea experimentelor istorice (precum descoperirea Bosonului Higgs sau a Quarcului Top).
*   **Centru de Documentare:** O resursă academică ce include glosare de termeni, cronologii ale descoperirilor și informații despre forțele fundamentale și cosmologie.
*   **Gamification:** Module de Quiz și Joc de Memorie cu clasament local pentru a verifica și consolida cunoștințele dobândite.

Interfața oferă o experiență imersivă prin animații complexe pe canvas, efecte de tip "liquid glass" și suport complet pentru teme (Dark, Light, Cyberpunk) și limbi străine (Română, Engleză, Franceză).

## 🛠️ Tehnologii Folosite

### Backend & Shell
*   **Go (Golang):** Limbajul principal pentru logica de sistem și gestionarea resurselor.
*   **Wails v2:** Framework-ul utilizat pentru a împacheta aplicația într-un executabil desktop nativ, folosind tehnologii web pentru interfață.

### Frontend
*   **JavaScript (ES6+):** Logica interactivă, gestionarea stării jocului și animațiile UI.
*   **HTML5 & CSS3:** Structura aplicației.
*   **Tailwind CSS:** Framework pentru styling modern, responsiv și gestionarea temelor.
*   **Chart.js:** Utilizat pentru redarea histogramelor live în simulatorul de collider și pentru graficele radar de comparare a particulelor.
*   **HTML5 Canvas:** Folosit pentru animațiile de fundal și vizualizarea 3D a tunelului de coliziune.
*   **FontAwesome:** Biblioteca de pictograme pentru interfața utilizatorului.

## 🌍 Suport Lingvistic
Aplicația este complet tradusă în:
*   🇷🇴 **Română**
*   🇺🇸 **Engleză**
*   🇫🇷 **Franceză**

## ⚙️ Instalare și Rulare

1.  Asigură-te că ai [Go](https://golang.org/dl/) și [Wails](https://wails.io/docs/gettingstarted/installation) instalate.
2.  Clonează repository-ul.
3.  Rulează aplicația în mod dezvoltare:
    ```bash
    wails dev
    ```
4.  Pentru a construi executabilul final:
    ```bash
    wails build
    ```

---
*Proiect dezvoltat ca instrument didactic pentru pasionații de știință și tehnologie.*
