// Globale Variablen
let isLoggedIn = false;
let isRunning = false;
let startTime;
let endTime;
let username;
let vorname;
let nachname;

// GraphQL-Request-Helfer
async function gqlRequest(query, variables = {}) {
    const res = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    });
    const json = await res.json();
    return json.data;
}

// Initialisieren des Bootstrap Datepicker
$(document).ready(function () {
    $('#datepicker').datepicker({
        format: "yyyy-mm-dd", // Format des Datums
        autoclose: true,      // Automatisches Schließen nach Auswahl
        todayHighlight: true   // Heutiges Datum hervorheben
    });
});

// Login-Funktion
document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;

    const query = `
      query Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          username
          vorname
          nachname
        }
      }
    `;
    const data = await gqlRequest(query, { username: enteredUsername, password: enteredPassword });
    const user = data.login;
    // Nach erfolgreichem Login:
    if (user) {
        isLoggedIn = true;
        username = user.username;
        vorname = user.vorname;
        nachname = user.nachname;

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        localStorage.setItem("vorname", vorname);
        localStorage.setItem("nachname", nachname);

        document.getElementById("login-container").classList.add("d-none");
        document.getElementById("homeoffice-container").classList.remove("d-none");
        // Namen sofort setzen:
        document.querySelectorAll('.t_username').forEach(el => el.textContent = `${vorname} ${nachname}`);
    } else {
        alert("Falscher Benutzername oder Passwort.");
    }
});

let timerInterval; // Globale Variable für das Timer-Interval

// Start-Button-Funktion
document.getElementById("start-btn").addEventListener("click", function () {
    if (!isLoggedIn) return;

    if (!isRunning) {
        isRunning = true;
        startTime = new Date();
        document.getElementById("start-btn").disabled = true;
        document.getElementById("stop-btn").disabled = false;
        document.getElementById("stop-btn").classList.remove("btn-secondary");
        document.getElementById("stop-btn").classList.add("btn-danger");

        // Timer starten
        const timerSpan = document.getElementById("timer");
        timerSpan.textContent = "00:00:00";
        clearInterval(timerInterval);
        timerInterval = setInterval(function () {
            const now = new Date();
            const diff = new Date(now - startTime);
            const hh = String(diff.getUTCHours()).padStart(2, '0');
            const mm = String(diff.getUTCMinutes()).padStart(2, '0');
            const ss = String(diff.getUTCSeconds()).padStart(2, '0');
            timerSpan.textContent = `${hh}:${mm}:${ss}`;
        }, 1000);

        // Text auf "Stop" setzen
        document.querySelector('.t_startstop').textContent = "Stop";
    }
});

// Stop-Button-Funktion
document.getElementById("stop-btn").addEventListener("click", async function () {
    if (!isLoggedIn) return;

    if (isRunning) {
        isRunning = false;
        endTime = new Date();
        document.getElementById("start-btn").disabled = false;
        document.getElementById("stop-btn").disabled = true;
        document.getElementById("stop-btn").classList.remove("btn-danger");
        document.getElementById("stop-btn").classList.add("btn-secondary");

        // Timer stoppen
        clearInterval(timerInterval);

        // Optional: Timer auf 00:00:00 zurücksetzen
        document.getElementById("timer").textContent = "00:00:00";

        // Text auf "Start" setzen
        document.querySelector('.t_startstop').textContent = "Start";

        // Speichern der Daten auf dem Server
        await saveTimeData(username, startTime, endTime);

        // E-Mail-Versand
        //sendEmail(username, startTime, endTime);

        // alert("Arbeitszeit gestoppt!");
    }
});

// Zeit speichern (Stop-Button)
async function saveTimeData(username, startTime, endTime) {
    const mutation = `
      mutation AddTimeEntry($username: String!, $startTime: String!, $endTime: String!) {
        addTimeEntry(username: $username, startTime: $startTime, endTime: $endTime) {
          id
        }
      }
    `;
    await gqlRequest(mutation, {
        username,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString()
    });
}

// Funktion zum Versenden der E-Mail
function sendEmail(username, startTime, endTime) {
    const emailLink = `mailto:info@h.de?subject=Zeiterfassung&body=Benutzer: ${username}%0D%0AStartzeit: ${startTime.toLocaleString()}%0D%0AEndzeit: ${endTime.toLocaleString()}`;
    window.location.href = emailLink;
}

// Funktion zum Aktualisieren des Datums-Labels
function updateDateLabel() {
    const datePicker = document.getElementById("date-picker");
    const todayBadge = document.getElementById("today-badge");
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    if (datePicker.value === todayStr) {
        todayBadge.style.display = "inline";
    } else {
        todayBadge.style.display = "none";
    }
}

// Übersichts-Button-Funktion
document.getElementById("overview-btn").addEventListener("click", async function () {
    document.querySelectorAll('.t_username').forEach(el => el.textContent = `${vorname} ${nachname}`);
    document.getElementById("homeoffice-container").classList.add("d-none");
    document.getElementById("overview-container").classList.remove("d-none");

    // Aktuelles Datum im Datepicker setzen
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    document.getElementById("date-picker").value = todayStr;
    updateDateLabel();
    // Zeiten für das aktuelle Datum anzeigen
    await showTimesForDate(todayStr);
});

// Zurück-Button in der Übersicht
document.getElementById("back-to-homeoffice-btn").addEventListener("click", function () {
    document.getElementById("overview-container").classList.add("d-none");
    document.getElementById("homeoffice-container").classList.remove("d-none");
});

// Beim Ändern des Datums die Auflistung ausblenden und Label aktualisieren
document.getElementById("date-picker").addEventListener("input", function () {
    document.getElementById("time-list").innerHTML = "";
    updateDateLabel();
});

// Datumswahl-Funktion
document.getElementById("show-times-btn").addEventListener("click", function () {
    const selectedDate = document.getElementById("date-picker").value;
    showTimesForDate(selectedDate);
});

// Zeiten für ein Datum laden
async function showTimesForDate(date) {
    // Stelle sicher, dass das Datum im Format YYYY-MM-DD ist
    let displayDate = date;
    if (date.includes('.')) {
        const [dd, mm, yyyy] = date.split('.');
        date = `${yyyy}-${mm}-${dd}`;
        displayDate = `${dd}.${mm}.${yyyy}`;
    } else if (date.includes('-')) {
        // Format für Anzeige anpassen
        const [yyyy, mm, dd] = date.split('-');
        displayDate = `${dd}.${mm}.${yyyy}`;
    }

    // Datum in .time-list-date anzeigen
    const dateLabel = document.querySelector('.time-list-date');
    if (dateLabel) {
        dateLabel.textContent = displayDate;
    }

    const query = `
      query TimeEntries($username: String!, $date: String!) {
        timeEntries(username: $username, date: $date) {
          startTime
          endTime
        }
      }
    `;
    const data = await gqlRequest(query, { username, date });
    const timesDiv = document.getElementById("time-list");
    timesDiv.innerHTML = "";

    if (data.timeEntries && data.timeEntries.length > 0) {
        data.timeEntries.forEach(entry => {
            let start = "-";
            let end = "-";
            // Prüfe, ob es ein Timestamp ist (nur Zahlen als String)
            if (entry.startTime && !isNaN(entry.startTime)) {
                start = new Date(Number(entry.startTime)).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
            }
            if (entry.endTime && !isNaN(entry.endTime)) {
                end = new Date(Number(entry.endTime)).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
            }
            const li = document.createElement("li");
            li.textContent = `${start} - ${end} Uhr`;
            timesDiv.appendChild(li);
        });
    } else {
        const li = document.createElement("li");
        li.textContent = "Keine Zeiten für diesen Tag.";
        timesDiv.appendChild(li);
    }
}

// Beim Laden prüfen, ob der Benutzer eingeloggt ist
window.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("isLoggedIn") === "true" && localStorage.getItem("username")) {
        isLoggedIn = true;
        username = localStorage.getItem("username");
        vorname = localStorage.getItem("vorname") || "";
        nachname = localStorage.getItem("nachname") || "";
        document.getElementById("login-container").classList.add("d-none");
        document.getElementById("homeoffice-container").classList.remove("d-none");
        // Namen sofort setzen:
        document.querySelectorAll('.t_username').forEach(el => el.textContent = `${vorname} ${nachname}`);
    }
});

