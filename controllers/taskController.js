import TaskService from '../services/taskService.js';

const listTasks = (req, res) => {
    return TaskService.listAll((err, rows) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(rows);
    });
};

const createTask = (req, res) => {
    const { description } = req.body;
    TaskService.createTask(description, (err, id) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(201).json({ id, description, status: 'INCOMPLETE' });
    });
};

const updateTask = (req, res) => {
    const { id } = req.params;
    const { description, status } = req.body;

    TaskService.updateTask(id, description, status, (err, changes) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (changes > 1) {
            // TODO -> Retornar a tarefa atualizada
            return res.json({ message: 'Tarefa atualizada com sucesso' });
        } else {
            return res.status(404).json({ message: "Task not found!" });
        }
    });
};

const deleteTask = (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if (index !== -1) {
        tasks.splice(index, 1);
        return res.json({ message: "Task delete successfully" });
    } else {
        return res.status(404).json({ message: "Task not found!" });
    }
};

export default { listTasks, createTask, updateTask, deleteTask };
