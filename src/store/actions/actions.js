export const ADD_TASK = 'ADD_TASK';
export const REMOVE_SEL_TASK = 'REMOVE_SEL_TASK';

export const addTaskInput = (taskInput) => {
    return {
        type: ADD_TASK,
        payload: {
            id: taskInput.id,
            name: taskInput.name,
            description: taskInput.description,
            level: taskInput.level
        }
    };
};

export const removeSelTask = (task) => {
    return {
        type: REMOVE_SEL_TASK,
        payload: {
            id: task.id
        }
    };
};