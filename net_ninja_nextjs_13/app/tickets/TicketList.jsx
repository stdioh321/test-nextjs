import Link from 'next/link'
import React from 'react'

async function getTickets() {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const res = await fetch('http://localhost:4000/tickets', {
    next: {
      revalidate: 0
    }
  })
  const tickets = await res.json()
  return tickets.sort((a, b) => b.id - a.id)
}

export default async function TicketList() {
  const tickets = await getTickets()

  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className='card my-5'>
          <Link href={`/tickets/${ticket.id}`}>
            <div className='flex justify-between'>
              <h3>{ticket.title}</h3>
              <Link href={`/tickets/${ticket.id}/delete`} className="p-2 btn bg-red-500 text-white rounded">X</Link>
            </div>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {tickets.length < 1 && (<p className='text-center'>Tehere are no tickets, yay!</p>)}
    </>
  )
}
