import React, { useEffect, useReducer, createContext, useContext } from 'react';

/*
 *  Models Imports
 */
import { LEVELS } from '../../models/levels.enum';
import { TaskClass } from '../../models/task.class';

/*
 *  Components Imports
 */
import { TaskTable } from '../pure/taskTable';
import Taskform from '../pure/taskForm';


/*  
 *  CSS / SCSS Imports
 */
import '../../styles/task.css'

/*  
 *  Actions Imports
 */
import { ADD_TASK, REMOVE_SEL_TASK } from '../../store/actions/actions';

/*  
 *  Context creation...
 */
// TODO: could just export TasksContext and TasksDispatchContext?
const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

/*  
 *  Initial State for Reducer
 */
// TODO: automate id generation...
const defaultTask1 = new TaskClass(1, 'Ejemplo 1', 'Descripción defecto 1', LEVELS.NORMAL)
const defaultTask2 = new TaskClass(2, 'Ejemplo 2', 'Descripción defecto 2', LEVELS.URGENT)
const defaultTask3 = new TaskClass(3, 'Ejemplo 3', 'Descripción defecto 3', LEVELS.URGENT)
const defaultTask4 = new TaskClass(4, 'Ejemplo 4', 'Descripción defecto 4', LEVELS.EMERGENCY)
const initialState = [
    defaultTask1,
    defaultTask2,
    defaultTask3,
    defaultTask4
]

/*
 *  Task List - functional component
 */
export const TasksProvider = () => {
    /*     
     *  useReducer to state -> state and dispatch actions
     */
    const [tasksState, tasksDispatch] = useReducer(tasksReducer, initialState)

    /* 
     *  HOOK function for Lifecylcle control 
     */
    useEffect(() => {
        return () => {
            console.log('TaskList: Task State has been mounted/modified.');
            setTimeout(() => {
            }, 2000);
        };
    }, [tasksState]);

    /* 
     *  Condition to show table 
     */
    let taskTableShow;
    if (tasksState.length > 0) {
        taskTableShow = <TaskTable></TaskTable>
    } else {
        taskTableShow = <span>Felicitaciones! No tenes tareas pendientes.</span>
    }

    /* 
    *   Component DOM print 
    */
    return (

        <TasksContext.Provider value={tasksState}>
            <TasksDispatchContext.Provider value={tasksDispatch}>
                <div className='container text-secondary m-5'>

                    <div className='row'>

                        {/* Task Fist & Form Card */}
                        <div className='card text-center p-3 vw-75'>
                            {/* Card header w/ Title */}
                            <div className='card-header p-3'>
                                <h3>Tareas pendientes: {tasksState.length}</h3>
                            </div>

                            {/* Card body w/ Task Table */}
                            <div className='card-body text-nowrap mb-5' data-mbd-perfect-scrollbar='true'>
                                {taskTableShow}
                                {/* TODO: add condition for loading stage print -> loading spinner */}
                                {/* {loading ? <p>Loading tasks...</p> : taskTableShow} */}
                            </div>

                            {/* Card footer w/ Form */}
                            <div className='card-footer p-0 m-0'>
                                <Taskform></Taskform>
                            </div>
                        </div>

                    </div>

                </div>
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>

    );
};

/*
 *  useContext export
 */
export function useTasksContext() {
    return useContext(TasksContext);
}
export function useTaskDispatchContext() {
    return useContext(TasksDispatchContext);
}

/*
 *  Reducer definition -> taskReducer
 */
const tasksReducer = (anyTaskInState, anyAction) => {
    switch (anyAction.type) {
        case ADD_TASK: {
            return [
                ...anyTaskInState,
                {
                    id: anyAction.payload.id,
                    name: anyAction.payload.name,
                    description: anyAction.payload.description,
                    level: anyAction.payload.level,
                }
            ];
        }
        case REMOVE_SEL_TASK: {
            return anyTaskInState.filter((t) => t.id !== anyAction.payload.id);
        }
        default:
            return anyTaskInState;
    }
};
