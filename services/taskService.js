import TaskRepository from "../repository/taskRepository.js";

const taskService = {
    listTasks: (callback) => {
        return TaskRepository.listAll(callback);
    },

    getById: (id, callback) => {
        return TaskRepository.getById(id, callback);
    },

    createTask: (title, callback) => {
        if (!title) {
            return callback({ message: "Titulo é obrigatório" }, null);
        }
        return TaskRepository.create(title, callback)
    },

    updateTask: (taskData, callback) => {
        return TaskRepository.update(taskData, callback);
    },

    deleteTask: (id, callback) => {
        return TaskRepository.delete(id, callback);
    }
}

export default taskService;
