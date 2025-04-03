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
            return callback({ message: "Descrição é obrigatória" }, null);
        }
        return TaskRepository.create(title, callback)
    },

    updateTask: (id, title, isCompleted, callback) => {
        return TaskRepository.update(id, title, isCompleted, callback);
    },

    deleteTask: (id, callback) => {
        return TaskRepository.delete(id, callback);
    }
}

export default taskService;
