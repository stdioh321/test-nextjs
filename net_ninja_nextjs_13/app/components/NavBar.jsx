import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Logo from '@/public/dojo-logo.png'

export default function NavBar() {
  return (
    <nav>
      <Image
        src={Logo}
        alt='Dojo Helpdesk logo'
        width={70}
        placeholder='blur'
        quality={30}
      />
      <h1>Dojo Helpdesk</h1>
      <Link href='/'>Dashboard</Link>
      <Link href='/tickets'>Tickets</Link>
    </nav>
  )
}
