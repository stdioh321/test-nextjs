"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const formProps = {
  title: '',
  body: '',
  user_email: 'temp@mail.com',
  priority: 'low',
}

const priorities = ['low', 'medium', 'high']
export default function CreateForm() {
  const router = useRouter()
  const [data, setData] = useState(formProps)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmitForm(e) {
    e.preventDefault()
    console.log(data);
    if (isLoading) return
    setIsLoading(true)
    const ticket = { ...data }
    const res = await fetch('http://localhost:4000/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticket)
    })
    if (res.status === 201) {
      router.refresh()
      return router.push('/tickets')
    }
  }
  return (
    <form onSubmit={handleSubmitForm} className="w-1/2">
      <label htmlFor="">
        <span>Title:</span>
        <input type="text" value={data.title} required={true}
          onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
          placeholder='Type the title...'
        />
      </label>
      <label htmlFor="">
        <span>Email:</span>
        <input type="email" value={data.user_email} required={true}
          onChange={(e) => setData((prev) => ({ ...prev, user_email: e.target.value }))}
          placeholder='Type the email'
        />
      </label>
      <label htmlFor="">
        <span>Priority:</span>
        <select value={data.priority}
          onChange={(e) => setData((prev) => ({ ...prev, priority: e.target.value }))}>
          {priorities.map((it, idx) => (
            <option key={idx} value={it}>{it}</option>
          ))}
        </select>

      </label>
      <label htmlFor="">
        <span>Body:</span>
        <textarea required={true} value={data.body}
          onChange={(e) => setData(prev => ({ ...prev, body: e.target.value }))}
          placeholder='Type the body...'
        ></textarea>
      </label>
      <button
        className='btn-primary'
        disabled={isLoading}
        type='submit'
      >
        {isLoading && (<span>Adding...</span>)}
        {!isLoading && (<span>Add Ticket</span>)}
      </button>
    </form>
  )
}
