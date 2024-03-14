const express = require('express');
const { Client } = require('pg');

// Express configuration
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
    next();
});

app.use(express.json());
app.use(express.static("src"));

// Client creation
function createNewClient() {
    return new Client({
        user: 'postgres',
        host: 'localhost',
        database: '3005A3',
        password: '127127',
        port: 5432,
    });
}

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

// GET
app.get("/students", getAllStudents);

async function getAllStudents(req, res) {
    Logger.getRequestReceived();

    const queryText = 'SELECT * FROM students;';

    const client = createNewClient();
    try {
        await client.connect();
        const results = await client.query(queryText);

        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' })
    } finally {
        client.end();
    }
}

// CREATE
app.post("/students", addStudent);

async function addStudent(req, res, next) {
    Logger.postRequestReceived();

    const queryText = 'INSERT INTO students(first_name, last_name, email, enrollment_date) VALUES ($1, $2, $3, $4);';
    const values = req.body;

    console.log(values);

    let results;

    const client = createNewClient();
    try {
        await client.connect();
        results = await client.query(queryText, values)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' })
    } finally {
        res.status(200).json(results);
        client.end();
    }
}

// PATCH
app.patch("/students/:id", updateStudentEmail);

async function updateStudentEmail(req, res) {
    Logger.postRequestReceived();

    const queryText = 'UPDATE students SET email = $1 WHERE student_id = $2;'
    const values = req.body;

    console.log(values)

    let results;

    const client = createNewClient();
    try {
        await client.connect();
        results = await client.query(queryText, values)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' })
    } finally {
        res.status(200).json(results);
        client.end();
    }
}

// DELETE
app.delete('/students/:id', deleteStudent);

async function deleteStudent(req, res) {
    Logger.deleteRequestReceived();

    const queryText = 'DELETE FROM students WHERE student_id = $1;';
    const values = [req.params.id];

    let results;

    const client = createNewClient();
    try {
        await client.connect();
        results = await client.query(queryText, values)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' })
    } finally {
        res.status(200).json(results);
        client.end();
    }
}

class Logger {
    static getRequestReceived() { console.log('GET request received'); }
    static postRequestReceived() { console.log('POST request received'); }
    static patchRequestReceived() { console.log('PATCH request received'); }
    static deleteRequestReceived() { console.log('DELETE request received'); }
}

function main() {
    app.listen(3000);
}

main();