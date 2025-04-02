import TaskService from '../services/taskService.js';

const listTasks = (_, res) => {
    return TaskService.listTasks((err, rows) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        return res.json(rows);
    });
};

const createTask = (req, res) => {
    const { description } = req.body;
    TaskService.createTask(description, (err, id) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(201).json({ id, description, status: 0 });
    });
};

const updateTask = (req, res) => {
    const { id } = req.params;
    const { description, status } = req.body;

    TaskService.updateTask(id, description, status, (err, updatedTask) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found!" });
        }

        return res.json(updatedTask);
    });
};

const deleteTask = (req, res) => {
    const { id } = req.params;

    TaskService.deleteTask(id, (err, changes) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (changes === 0) {
            return res.status(404).json({ message: "Task not found!" })
        }

        return res.json({ message: "Task delete successfully" });
    });
};

export default { listTasks, createTask, updateTask, deleteTask };
