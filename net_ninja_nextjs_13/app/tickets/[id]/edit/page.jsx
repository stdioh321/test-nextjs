import React from 'react'
import EditForm from './EditForm'

export default function EditTicket({params}) {
  return (
    <main>
      <h2 className="text-primary text-center">Edit Ticket</h2>
      <EditForm id={params.id} />
    </main>
  )
}
