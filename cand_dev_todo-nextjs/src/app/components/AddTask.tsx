"use client"

import React, { FormEventHandler, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import { addTodo } from '@/api'
import { useRouter } from 'next/navigation'

export default function AddTask() {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [newTaskValue, setNewTaskValue] = useState<string>("")

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (!newTaskValue) {
      alert('Task should have value')
      return
    }
    const res = await addTodo({ text: newTaskValue })
    toggleModal()
    router.refresh()
  }

  function toggleModal(toggle = false) {
    setModalOpen(false)
    setNewTaskValue("")
  }

  return (
    <div>
      <button className="btn btn-primary w-full"
        onClick={() => {
          setModalOpen(prev => !prev)
        }}>
        Add new Task <AiOutlinePlus className="ml-2" size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={toggleModal}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="foot-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input type="text" placeholder='Type here' className="input input-bordered w-full"
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
            />
            <button className="btn" type='submit'>Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

