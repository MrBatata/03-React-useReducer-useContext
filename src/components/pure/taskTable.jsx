import React from 'react';

import TaskComponent from './taskComponent';
import { useTasksContext } from '../containers/tasksContext';

export const TaskTable = () => {

    const tasksTableState = useTasksContext();

    return (

        <table className='table table-hover align-middle'>
            {/* Task List Table */}

            <thead className=''>
                <tr>
                    <th scope='col' className='col-1'>#</th>
                    <th scope='col' className='col-1'>Título</th>
                    <th scope='col' className='col-6'>Descripción</th>
                    <th scope='col' className='col-3'>Prioridad</th>
                    <th scope='col' className='col-1'>Acciones</th>
                </tr>
            </thead>

            <tbody className='fs-5'>
                {/* Iteración mediante un map para generar las TAREAS DEFECTO */}
                {
                    tasksTableState.map((t) => (
                        <TaskComponent
                            key={t.id}
                            task={t}
                        >
                        </TaskComponent>
                    ))
                }
            </tbody>

        </table>

    );
};
