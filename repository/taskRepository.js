import db from '../config/db.js';

const taskRepository = {
    listAll: (callback) => {
        db.all('SELECT * FROM tasks', [], callback);
    },
    create: (title, callback) => {
        db.run('INSERT INTO tasks (title) VALUES (?)', [title],
            function(err) {
                if (err) {
                    return callback(err, null);
                }
                db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (err, row) => {
                    if (err) {
                        return callback(err, null);
                    }
                    return callback(null, row);
                });
            }
        );
    },
    update: (taskData, callback) => {


        db.get(
            'SELECT isCompleted FROM tasks WHERE id = ?', [taskData.id], (err, task) => {
                if (err) {
                    callback(err, null);
                }
                else if (!task) {
                    console.log('Task not found!')
                    callback(null, null)
                } else {

                    let newStatus;

                    if (taskData.isCompleted === undefined || taskData.isCompleted === null) {
                        newStatus = task.isCompleted;
                    }

                    newStatus = taskData.isCompleted ? 1 : 0;

                    db.run('UPDATE FROM tasks SET title=?, "isCompleted"=? WHERE id=?', [taskData.title, newStatus, taskData.id], (err, _) => {

                        if (err) {
                            callback(err, null)
                        }

                        db.get('SELECT * FROM tasks WHERE id = ?', [taskData.id], callback)
                    })


                }
            }


        )




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
