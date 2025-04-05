import db from "../dbConfig.js";

const taskRepository = {
  listAll: (callback) => {
    db.all("SELECT * FROM tasks", [], callback);
  },

  getTaskById: (id, callback) => {
    db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, task) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, task);
    });
  },

  create: (title, callback) => {
    db.run("INSERT INTO tasks (title) VALUES (?)", [title], function (err) {
      if (err) {
        return callback(err, null);
      }

      taskRepository.getTaskById(this.lastID, callback);
    });
  },

  update: (taskData, callback) => {},

  delete: (id, callback) => {
    db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
      callback(err, this.changes);
    });
  },
};

export default taskRepository;
