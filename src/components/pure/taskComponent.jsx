import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import { TasksDispatchContext } from '../containers/tasksContext';
import { useTaskDispatchContext } from '../containers/tasksContext';

/*
*   Models Imports
*/
import { TaskClass } from '../../models/task.class'; // for PropTypes
import { removeSelTask } from '../../store/actions/actions';

/*
*   CSS / SCSS Imports
*/
import '../../styles/task.css'

/*
*   Task - functional component
*/
const TaskComponent = ({ task }) => {

    const taskDispatchState = useTaskDispatchContext();

    /* 
    *   HOOK function for Lifecylcle control  
    */
    useEffect(() => {
        return () => {
            console.log(`taskComponent: Created Task ${task.name}.`)
        };
    }, [task]);

    /* 
    *   Elemento HTML que imprime el componente funcional al DOM 
    */
    return (
        <tr className=''>

            <th scope="row" className=''>
                <span className=''>{task.id}</span>
            </th>

            <td className=''>
                <span className=''>{task.name}</span>
            </td>

            <td className=''>
                <span className=''>{task.description}</span>
            </td>

            <td className=''>
                <span className=''>{task.level}</span>
            </td>

            <td className=''>
                <i className="bi bi-trash-fill"
                    onClick={() => taskDispatchState(
                        removeSelTask(task)
                    )}
                ></i>
            </td>

        </tr>
    );
};

TaskComponent.propTypes = {

    /* Defino que task debe ser una INSTANCIA de la CLASE Task, y que debe ser obligatoria */
    task: PropTypes.instanceOf(TaskClass).isRequired,

};

export default TaskComponent;


