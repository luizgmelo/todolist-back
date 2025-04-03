import db from './db.js';

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            isCompleted INTEGER CHECK(isCompleted IN (0,1)) DEFAULT 0 NOT NULL
        );
    `);
    console.log('Tasks table checked/created.');
});

