import db from './db.js';

db.serialize(() => {
    db.run(`
        CREATE TABLE tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT,
            status TEXT
        );
    `);
    console.log('Tabela tarefas verificada/criada.');
});

