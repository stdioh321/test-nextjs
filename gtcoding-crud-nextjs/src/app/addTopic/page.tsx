'use client'
import { useRouter as userRouterNavition } from 'next/navigation'
import React, { FormEvent, useState } from 'react'


export default function page() {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })
  const routerNavigation = userRouterNavition()

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault()
    if (!(formData.title && formData.description)) {
      alert('Fields "title" and "description" are required')
      return
    }
    try {
      const res = await fetch('/api/topics', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw Error('Something went wrong ')
      routerNavigation.push('/')
    } catch (error) {

      console.log({ error });
    }
  }
  return (
    <div>
      <div>
        <h1 className="text-2xl">Add Topic</h1>
      </div>

      <form onSubmit={handleFormSubmit} className='flex flex-col gap-3'>
        <input type="text" name='title' placeholder='Topic title' className='border border-slate-500 px-8 py-2'
          onInput={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
        />
        <input type="text" name='description' placeholder='Topic description' className='border border-slate-500 px-8 py-2'
          onInput={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        />
        <div className="flex justify-end">
          <button type='submit' className='bg-green-600 font-bold text-white py-3 px-6 w-fit'>Add Topic</button>
        </div>
      </form>
    </div>
  )
}
