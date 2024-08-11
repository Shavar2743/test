const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Funktion zum Lesen einer SQL-Datei
async function readSQLFile(filePath) {
    return fs.promises.readFile(filePath, 'utf8');
}

// Funktion zum Ausführen einer SQL-Datei
async function executeSQLFile(connection, filePath) {
    const sql = await readSQLFile(filePath);
    await connection.query(sql);
}

// Funktion, um die Datenbank und Tabellen zu initialisieren
async function initDatabase() {
    const connection = await mysql.createConnection({
        host: 'localhost',  // Ändere dies, falls du eine andere Datenbankadresse verwendest
        user: 'root',       // Ändere dies zu deinem Datenbankbenutzernamen
        password: 'password', // Ändere dies zu deinem Datenbankpasswort
        multipleStatements: true // Erlaubt mehrere SQL-Anweisungen in einer Abfrage
    });

    try {
        await executeSQLFile(connection, path.join(__dirname, 'Pflegeplanung.sql'));
        await executeSQLFile(connection, path.join(__dirname, 'SIS.sql'));
        console.log('Datenbank und Tabellen erfolgreich erstellt.');
    } catch (error) {
        console.error('Fehler beim Erstellen der Datenbank und Tabellen:', error);
    } finally {
        await connection.end();
    }
}

// Führe die Initialisierungsfunktion aus
initDatabase();
