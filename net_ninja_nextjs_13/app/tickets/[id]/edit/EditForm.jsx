"use client"

import Loading from '@/app/loading'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const formProps = {
  title: '',
  body: '',
  user_email: 'temp@mail.com',
  priority: 'low',
}

async function getTicket(id) {
  const res = await fetch(`http://localhost:4000/tickets/${id}`)
  if (res.status != 200) throw Error('Not found')
  return res.json()
}

const priorities = ['low', 'medium', 'high']
export default function EditForm({ id }) {
  const router = useRouter()
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    getTicket(id)
      .then(res => {
        const { id, ...t } = res
        setData(t)
        setIsLoadingData(false)
      }).catch((e) => {
        router.refresh()
        return router.push('/tickets')
      })
  }, [])

  async function handleSubmitForm(e) {
    e.preventDefault()
    if (isLoading) return
    setIsLoading(true)
    const ticket = { ...data }
    const res = await fetch(`http://localhost:4000/tickets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticket)
    })
    if (res.ok) {
      router.refresh()
      return router.push('/tickets')
    }
  }
  return (
    <>
      {isLoadingData ? <Loading />
        : <form onSubmit={handleSubmitForm} className="w-1/2">
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
            {isLoading && (<span>Editing...</span>)}
            {!isLoading && (<span>Edit Ticket</span>)}
          </button>
        </form>}
    </>
  )
}
