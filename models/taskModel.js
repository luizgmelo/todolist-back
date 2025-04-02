import db from '../config/db.js';

const taskRepository = {
    listAll: (callback) => {
        db.all('SELECT * FROM tasks', [], callback);
    },
    getById: (id, callback) => {
        db.get('SELECT id FROM tasks WHERE id = ?', [id], callback);
    },
    create: (description, status, callback) => {
        db.run('INSERT INTO tasks (description, status) VALUES (?, ?)', [description, status],
            function(err) {
                callback(err, this?.lastID);
            });
    },
    update: (id, description, status, callback) => {
        db.run(
            'UPDATE tasks SET description=?, status=? WHERE id = ?', [id, description, status],
            function(err) {
                callback(err, this.changes);
            });
    },
    delete: () => {
        db.run(
            'DELETE FROM tasks WHERE id = ?', [id],
            function(err) {
                callback(err, this.changes);
            });
    }
}

export default TaskRepository;
