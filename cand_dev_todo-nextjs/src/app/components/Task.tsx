'use client'
import React, { FormEventHandler, useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { ITask } from '@/types/Task';
import { removeTodo, updateTodo } from '@/api';
import Modal from './Modal';
import { useRouter } from 'next/navigation';

interface TaskProps {
  task: ITask;
}
const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter()
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [taskEdit, setTaskEdit] = useState<string>(task.text)

  async function handleDeleteTodo(id: string | number) {
    const res = await removeTodo(`${id}`)
    setOpenModalDelete(false)
    router.refresh()
  }

  const handleEditTodo: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    if (!taskEdit) {
      alert("Should have content")
      return
    }
    await updateTodo(`${task.id}`, taskEdit)
    setOpenModalEdit(false)
    router.refresh()
  };

  return (
    <tr>
      <td>{task.id}</td>
      <td className='w-full'>{task.text}</td>
      <td className='flex gap-5'>
        <FiEdit cursor='pointer' className='text-blue-500' size={25}
          onClick={(e => {
            setTaskEdit(task.text)
            setOpenModalEdit(true)
          })}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleEditTodo}>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <div className="modal-action">
              <input type="text" className='input input-bordered w-full'
                placeholder='Type here'
                onChange={e => setTaskEdit(e.target.value)}
                value={taskEdit}
              />
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </Modal>
        <FiTrash2 cursor='pointer' className='text-red-500' size={25}
          onClick={(e) => { setOpenModalDelete(true) }}
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
          <div className="modal-action">
            <button className='btn btn-error' onClick={(e) => { handleDeleteTodo(task.id) }}>Yes</button>
          </div>
        </Modal>
      </td>
    </tr>
  )
};

export default Task;
