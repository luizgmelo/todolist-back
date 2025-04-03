import TaskService from '../services/taskService.js';

const listTasks = (_, res) => {
    return TaskService.listTasks((err, rows) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        const tasks = rows.map(task => ({
            ...task,
            isCompleted: Boolean(task.isCompleted)
        }));

        return res.json(tasks);
    });
};

const createTask = (req, res) => {
    const { title } = req.body;
    TaskService.createTask(title, (err, id) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(201).json({ id, title, status: 0 });
    });
};

const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;

    TaskService.updateTask(id, title, status, (err, updatedTask) => {

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
