import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

export const dynamicParams = true

export async function generateStaticParams(){
  const tickets = await (await fetch(`http://localhost:4000/tickets`)).json()
  return tickets.map(it => {
    return {
      id: `${it.id}`
    }
  })
}

async function getTicket(id) {
  const res = await fetch(`http://localhost:4000/tickets/${id}`)
  if(!res.ok) return notFound()
  return res.json()
}

function handleDisplayEmail(email){
  if(email) return email
  return (<span className='text-red-300 underline'>no email</span>)
}

export default async function TicketDetails({ params }) {
  const ticket = await getTicket(params.id)

  return (
    <main>
      <nav className='flex justify-between'>
        <h2>Ticket Details</h2>
        <Link className='rounded border-primary bg-primary text-white border btn text-center p-2 no-underline' href={`/tickets/${ticket.id}/edit`}>Edit Ticket</Link>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by: {handleDisplayEmail(ticket.user_email)}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  )
}
