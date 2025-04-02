import TaskRepository from "../models/taskModel"

const TarefaService = {
    listTasks: () => {
        return TaskRepository.listAll();
    },

    getById: (id, callback) => {
        return TaskRepository.getById(id, callback);
    },

    createTask: (description, callback) => {
        if (!description) {
            return callback({ message: "Descrição é obrigatória" }, null);
        }
        TaskRepository.create(description, callback)
    },

    updateTask: (id, description, status, callback) => {
        TaskRepository.update(description, status, callback);
    },

    deleteTask: (id) => {
        TaskRepository.delete(id);
    }
}
