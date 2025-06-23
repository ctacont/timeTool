# TimeTool – Schnellstart-Anleitung
(c) 2025 by Hasan Yüksel

## Prjektstruktur und Dateierklärung:

**Hauptverzeichnis**
- README.md → Anleitung und Hinweise zur Installation, Einrichtung und Nutzung des Projekts.

- index.html → Die Startseite des Frontends. Wird im Browser geöffnet und zeigt die Benutzeroberfläche.

- script.js → JavaScript für das Frontend. Steuert Login, Zeiterfassung und Anzeige im Browser.

- .gitignore → Listet Dateien/Ordner auf, die nicht ins Git-Repository gehören (z.B. node_modules).

- data.json → (Optional, meist für Testzwecke) Beispielhafte Zeiteinträge im JSON-Format. Wird nicht vom eigentlichen System genutzt, sondern dient als Beispiel oder Export.

## 
**backend/**
-index.js → Startpunkt für das Backend.
Startet den GraphQL-Server, verbindet zu MongoDB, enthält das Backend-API.

- createUser.js → Skript, um einen neuen Benutzer in die Datenbank einzufügen (einmalig ausführen, z.B. für Testuser).

- package.json → Enthält die Abhängigkeiten und Startskripte für das Backend (npm install installiert alles Nötige).

**backend/models/**
- user.js → Definiert das User-Schema für MongoDB (Username, Passwort, Vorname, Nachname).

- TimeEntry.js → Definiert das Schema für Zeiteinträge (Username, Startzeit, Endzeit).

## 




## Voraussetzungen

- [Node.js](https://nodejs.org/) installiert
- [MongoDB](https://www.mongodb.com/) installiert und läuft lokal

## Wichtig
- **Die Ordner `node_modules` für den Root Ordner (Hauptverzeichnis) und Backend Ordner sind nicht im Repository!**  
  Installiere sie immer mit `npm install` im jeweiligen Verzeichnis.

---

## 1. Projekt klonen

```sh
git clone https://github.com/DEIN_GITHUB/timetool.git
cd timetool/backend
```

---

## 2. Abhängigkeiten installieren

```sh
npm install
```

---

## 3. Benutzer anlegen

Öffne die Datei `backend/createUser.js` und passe die Felder `vorname` und `nachname` an:

```js
vorname: 'DEIN VORNAME',
nachname: 'DEIN NACHNAME'
```

Speichern und dann im Terminal ausführen:

```sh
node createUser.js
```

---

## 4. Backend starten

```sh
node index.js
```

Das Backend läuft jetzt auf [http://localhost:3000/graphql](http://localhost:3000/graphql).

---

## 5. Frontend starten

Öffne die Datei `index.html` im Hauptverzeichnis im Browser (z.B. per Doppelklick).

---

## 6. Login

Melde dich mit dem Benutzernamen und Passwort an, die du in `createUser.js` gesetzt hast (z.B. `test` / `test`).

---

## Hinweise

- Alle Zeiten und Benutzerdaten werden in MongoDB gespeichert.
- Bei Problemen prüfe die Konsole im Browser und im Backend-Terminal.

---

**Viel Erfolg mit TimeTool!**

![001](https://github.com/user-attachments/assets/cd36ec40-45ef-41cf-be27-522c718aa8dd)

![002](https://github.com/user-attachments/assets/62923b5c-a166-407a-af38-c3d1ffc5bbd5)

![003](https://github.com/user-attachments/assets/1d98ae29-4250-4475-931b-bd6ff6d3256c)

![004](https://github.com/user-attachments/assets/9c40a4a6-3a02-4866-b13b-4da8a59e34a5)

![005](https://github.com/user-attachments/assets/6bdea2b3-c987-4fa0-9c4b-325e40c0037b)

![006](https://github.com/user-attachments/assets/88c10f35-9e36-4661-b11d-d605ddf8b79b)








