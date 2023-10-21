import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

export default function AddTask() {
  return (
    <div>
      <button className="btn btn-primary w-full">
        Add new Task <AiOutlinePlus className="ml-2" size={18} />
      </button>
    </div>
  )
}
