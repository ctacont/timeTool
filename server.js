const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Pfad zur JSON-Datei
const dataFilePath = path.join(__dirname, "data.json");

// Lesen der JSON-Daten
function readData() {
    if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, "[]", "utf8");
    }
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
}

// Speichern der JSON-Daten
function writeData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
}

// Route zum Abrufen aller Daten
app.get("/api/data", (req, res) => {
    try {
        const data = readData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Fehler beim Lesen der Daten" });
    }
});

// Route zum Hinzufügen neuer Daten
app.post("/api/data", (req, res) => {
    try {
        const newData = req.body;
        const existingData = readData();
        existingData.push(newData);
        writeData(existingData);
        res.json({ message: "Daten erfolgreich gespeichert" });
    } catch (error) {
        res.status(500).json({ error: "Fehler beim Speichern der Daten" });
    }
});

// Start des Servers
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});