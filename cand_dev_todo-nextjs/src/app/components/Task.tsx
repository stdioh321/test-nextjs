import { ITask } from '@/types/Task';
import React from 'react'

interface TaskProps {
  task: ITask;
}
const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <tr>
      <td>{task.id}</td>
      <td>{task.text}</td>
    </tr>
  )
};

export default Task;
