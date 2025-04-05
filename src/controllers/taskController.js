import { type } from "os";
import { openDB } from "../dbConfig.js";

export function testTask(req, res) {
    res.status(200).json("Hello from tasks controller");
}

export async function listTasks(req, res) {
    const tasks = await openDB().then(db => db.all("SELECT * FROM tasks"));

    // NOTE convert is_completed to boolean
    res.json(tasks.map(task => {return {...task, isCompleted: task.isCompleted ? true : false}}));
};

export async function createTask(req, res) {
    const { title } = req.body;

    const { lastID } = await openDB().then(db => db.run("INSERT INTO tasks (title) VALUES (?)", [title]));
    const newTask = await openDB().then(db => db.get('SELECT * FROM tasks WHERE id = ?', [lastID]));

    newTask.isCompleted = false;

    res.status(201).json(newTask);
};


export async function updateTask(req, res) {
    const { id } = req.params;
    const { title, isCompleted } = req.body;

    let fields = []
    let values = [];

    if (title?.length) {
        fields.push('title = ?');
        values.push(title);
    }

    if (typeof isCompleted === "boolean") {
        fields.push('"isCompleted"= ?');
        values.push(isCompleted);
    }

    if (fields.length === 0) {
        return res.status(400).json({"message": "No data for update"});
    }

    const query = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);

    const { changes } = await openDB().then(db => db.run(query, values));

    if (changes === 0) {
        return res.status(404).json({
            "message": "Task not found"
        });
    } 

    const task = await openDB().then(db => db.get('SELECT * FROM tasks WHERE id = ?', [id]));
    task.isCompleted = task.isCompleted ? true : false;
    res.json(task);
}

export async function deleteTask(req, res) {
    const { id } = req.params;
    
    const { changes } = await openDB().then(db => db.run("DELETE FROM tasks WHERE id = ?", [id]));

    if (changes === 0) {
        res.status(404).json({ 
            "message": "Task not found!" 
        })
    } else {
        res.status(204).send();
    }
}

export default {testTask, listTasks, createTask, updateTask, deleteTask};
