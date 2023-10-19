'use client'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'


export default function page({ params }) {
  console.log({ params });

  const { id } = params

  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })

  useEffect(() => {
    fetch(`/api/topics/${id}`).then(async res => {
      const { title, description } = (await res.json())
      setFormData({ title, description })
    })
  }, [])

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault()
    if (!(formData.title && formData.description)) {
      alert('Fields are required')
      return
    }
    try {
      const res = await fetch(`/api/topics/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw Error('Something went wrong ')
      console.log(await res.json())
      router.push('/')
    } catch (error) {
      console.log({ error });
    }
  }
  return (
    <div>
      <div>
        <h1 className="text-2xl">Edit Topic</h1>
      </div>
      <form onSubmit={handleFormSubmit} className='flex flex-col gap-3'>
        <input type="text" name='title' placeholder='Topic title' className='border border-slate-500 px-8 py-2'
          onInput={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          value={formData.title}
        />
        <input type="text" name='description' placeholder='Topic description' className='border border-slate-500 px-8 py-2'
          onInput={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          value={formData.description}
        />
        <div className="flex justify-end">
          <button type='submit' className='bg-green-600 font-bold text-white py-3 px-6 w-fit'>Update Topic</button>
        </div>
      </form>
    </div>
  )
}
