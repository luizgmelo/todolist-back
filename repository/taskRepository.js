import db from '../config/db.js';

const taskRepository = {
    listAll: (callback) => {
        db.all('SELECT * FROM tasks', [], callback);
    },
    create: (description, callback) => {
        db.run('INSERT INTO tasks (description) VALUES (?)', [description],
            function(err) {
                callback(err, this?.lastID);
            });
    },
    update: (id, description, status, callback) => {
        db.get('SELECT status FROM tasks WHERE id = ?', [id], (err, row) => {
            if (err) return callback(err, null);
            if (!row) return callback(null, null);

            const newStatus = status !== undefined ? status : row.status;

            db.run(
                'UPDATE tasks SET description=?, status=? WHERE id = ?', [description, newStatus, id],
                function(err) {
                    if (err) {
                        return callback(err, null);
                    }

                    db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
                        if (err) {
                            return callback(err, null);
                        }
                        return callback(null, row);
                    });
                });
        })
    },
    delete: (id, callback) => {
        db.run(
            'DELETE FROM tasks WHERE id = ?', [id],
            function(err) {
                callback(err, this.changes);
            });
    }
}

export default taskRepository;
