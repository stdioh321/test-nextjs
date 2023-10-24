import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <main className="text-center">
      <h2 className="text-3xl">We Hit a Brick Wall.</h2>
      <p>We coud not find the page were looking for.</p>
      <p>Go back to the <Link href='/tickets'>tickets</Link></p>
    </main>
  )
}
