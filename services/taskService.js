import TaskRepository from "../repository/taskRepository.js";

const taskService = {
    listTasks: (callback) => {
        return TaskRepository.listAll(callback);
    },

    getById: (id, callback) => {
        return TaskRepository.getById(id, callback);
    },

    createTask: (description, callback) => {
        if (!description) {
            return callback({ message: "Descrição é obrigatória" }, null);
        }
        return TaskRepository.create(description, callback)
    },

    updateTask: (id, description, status, callback) => {
        return TaskRepository.update(id, description, status, callback);
    },

    deleteTask: (id, callback) => {
        return TaskRepository.delete(id, callback);
    }
}

export default taskService;
