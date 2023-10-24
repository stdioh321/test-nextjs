import React, { Suspense } from 'react'
import TicketList from './TicketList'
import Loading from '../loading'
import Link from 'next/link'

export default function Tickets() {
  return (
    <main>
      <nav>
        <div className='w-full'>
          <h2>Tickets</h2>
          <div className='w-full flex justify-between'>
            <small>Currently open tickets.</small>
            <Link className='rounded border-primary bg-primary text-white border btn text-center p-2 no-underline' href='/tickets/create'>Add Ticket</Link>
          </div>
        </div>
      </nav>
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  )
}
