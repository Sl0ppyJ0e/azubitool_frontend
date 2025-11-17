# Azubitool Frontend

Dieses Verzeichnis enthält das Frontend der Ausbildungsverwaltung.
Es ist eine Vue 3 + Vite Anwendung mit Tailwind CSS und Pinia für State Management.

Inhalt & Struktur

- `index.html` – Einstiegspunkt für Vite
- `src/main.js` – App-Initialisierung, Router und Store-Attach
- `src/App.vue` – Root-Komponente
- `src/style.css` – Tailwind + globale Styles
- `src/api/` – Axios HTTP-Client (`http.js`) und `mock.js` für lokale Mock-Daten
- `src/store/` – Pinia Stores (z. B. `auth.js`, `globalStore.js`)
- `src/components/` – wiederverwendbare UI-Komponenten (NavBar, SideBar, TaskCard)
- `src/views/` – Seiten (CalendarView, DashboardView, DocumentsView, LoginView ...)
- `public/` – statische Assets

Technische Komponenten

- Vue 3 (Composition API / `<script setup>`) via Vite
- Tailwind CSS für Styling
- Pinia für State Management
- Axios als HTTP-Client (`src/api/http.js`) – Base-URL aus `import.meta.env.VITE_API_URL`

Wichtige Umgebungsvariablen

- `VITE_API_URL` – Basis-URL des Backends (z. B. `http://127.0.0.1:8000`).
  Lege diese in einer Datei `.env` im Projektwurzel an:

```text
VITE_API_URL=http://127.0.0.1:8000
```

Lokal starten (Entwicklung)

1. Frontend-Abhängigkeiten installieren:

```powershell
Set-Location -Path "C:\Users\christopherki\azubitool_frontend"
npm install
```

2. Dev-Server starten:

```powershell
npm run dev
```

3. Öffne im Browser: `http://127.0.0.1:5173`

API-Integration

- Der HTTP-Client ist in `src/api/http.js` definiert. Er verwendet `VITE_API_URL` oder `http://127.0.0.1:8000` als Fallback.
- Auth-Token (Mock oder echt) wird automatisch an Requests angehängt, falls vorhanden:
  `Authorization: Bearer <token>`

Wichtige Frontend-Workflows

- Login: `src/views/LoginView.vue` verwendet `src/store/auth.js`. Standardmäßig läuft der Mock-Login (setze `useMock=false` um echten Login zu verwenden).
- Kalender: `src/views/CalendarView.vue` ruft `GET /calendar?user_id=...` und `POST /calendar` auf. Stelle sicher, dass `globalStore.userId` nach Login gesetzt ist.
- Dokumente: `DocumentsView.vue` ist vorbereitet für späteren Call `/documents`.

Fehlerbehebung

- CORS-Fehler im Browser → Backend muss `http://127.0.0.1:5173` in `allow_origins` haben.
- `useGlobalStore is not defined` → sicherstellen, dass `useGlobalStore` importiert ist (ich habe die Views aktualisiert).
- Backend nicht erreichbar → prüfe `VITE_API_URL` und ob uvicorn läuft.

Nächste Schritte / Tipps

- Für Produktion: Build erstellen `npm run build` und die resultierenden Assets auf einem Webserver ausliefern.
- Für echte Auth: Backend-Endpoint `POST /auth/login` implementieren und `auth.js` auf `useMock=false` setzen.

Wenn du möchtest, kann ich die README noch weiter anpassen (z. B. Kontrib-Anleitung, Designentscheidungen, Komponenten-API).
# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
