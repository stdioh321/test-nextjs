import React from 'react'
import { ITask } from '@/types/Task'
import Task from '@/app/components/Task';

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>text</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => {
              return (<Task key={task.id} task={task} />)
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default TodoList;
