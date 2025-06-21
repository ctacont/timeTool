# TimeTool – Schnellstart-Anleitung

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



###################################
zusätzliche info:

### Name ändern in: backend/createUser.js
<!-- await User.create({
        username: 'test',
        password: hash, -->
        vorname: 'DEIN VORNAME',
        nachname: 'DEIN NACHNAME'
 <!--}); -->
-----------------------------------------------
### im terminal wechseln in "backend"
commands ausführen:
node createUser.js
node index.js
#######################################
