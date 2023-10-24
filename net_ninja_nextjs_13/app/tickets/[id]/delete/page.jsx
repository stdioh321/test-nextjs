'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


async function deleteTicket(id) {
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const tickets = await res.json()

  return tickets
}
export default function DeleteTicket({ params }) {
  const router = useRouter()
  useEffect(() => {
    deleteTicket(params.id)
      .finally(() => {
        router.refresh()
        return router.push('/tickets')
      })

  }, [])
  return (
    <div>
      DELETE: {params.id}
    </div>
  )
}
