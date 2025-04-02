import db from './db.js';

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            status INTEGER CHECK(status IN (0,1)) DEFAULT 0 NOT NULL
        );
    `);
    console.log('Tasks table checked/created.');
});

