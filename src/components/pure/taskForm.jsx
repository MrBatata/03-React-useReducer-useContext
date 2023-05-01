import React, { useRef } from 'react';
import PropTypes from 'prop-types';

/*
*  Imports
*/
import { LEVELS } from '../../models/levels.enum';
import { TaskClass } from '../../models/task.class';
import { addTaskInput } from '../../store/actions/actions';
import { useTaskDispatchContext, useTasksContext } from '../containers/tasksContext';

let nextId = 5;
/*
 *  Task Form to add - functional component
 */
const Taskform = () => {

    const taskFormDispatchState = useTaskDispatchContext();
    const tasksState = useTasksContext();

    /*
     *  useRef para guardar los datos de los input a variables para crear la NUEVA TAREA  
     */
    const nameRef = useRef('');
    const descriptionRef = useRef('');
    const levelRef = useRef(LEVELS.NORMAL);

    /*
     *  onSubmit triggers addTask function
     *  addTask creates taskInput as TaskClass w/ input useRef
     *  
     *  taskInput es procesada taskFormDispatchState del TasksDispatchContext
     *  La acción addTaskInput es procesada por el taskReducer
     */
    function addTask(e) {
        e.preventDefault();
        const taskInput = new TaskClass(
            nextId++,
            nameRef.current.value,
            descriptionRef.current.value,
            levelRef.current.value
        );
        taskFormDispatchState(
            addTaskInput(taskInput)
        )
    }

    return (
        <form
            onSubmit={addTask}
            className='d-flex justify-content-center align-items-center'
        >
            <div className='form-outline flex-fill p-3'>
                <div className='form-control form-control-lg m-2 bg-secondary text-white'>
                    <h2>Agrega una nueva tarea</h2>
                </div>
                <input
                    ref={nameRef}
                    id='inputName'
                    type='text'
                    className='form-control form-control-lg m-2'
                    required
                    autoFocus
                    placeholder='Task Name'
                />

                <input
                    ref={descriptionRef}
                    id='inputDescription'
                    type='text'
                    className='form-control form-control-lg m-2'
                    required
                    placeholder='Task description'
                />
                <label htmlFor='selectLevel' className='sr-only fs-5'>Prioridad</label>
                <select
                    className='form-control form-control-lg m-2'
                    ref={levelRef}
                    defaultValue={LEVELS.NORMAL}
                    id='selectLevel'
                >
                    <option value={LEVELS.NORMAL}>
                        Normal
                    </option>
                    <option value={LEVELS.URGENT}>
                        Urgent
                    </option>
                    <option value={LEVELS.BLOCKING}>
                        Blocking
                    </option>
                </select>

                <button
                    type='submit'
                    className='btn btn-success btn-lg m-3'
                >
                    Agregar
                </button>

            </div>
        </form>
    );
};

Taskform.protoTypes = {
    add: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
    taskInput: PropTypes.instanceOf(TaskClass).isRequired,

};

export default Taskform;
