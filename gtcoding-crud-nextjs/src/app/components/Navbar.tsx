import Link from "next/link";

export default function NavBar(){
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">
      <Link href={'/'} className="text-white font-bold">GTCoding</Link>
      <Link href={'/addTopic'} className="bg-white font-bold p-2 rounded hover:bg-slate-300">Add Topic</Link>
    </nav>
  )
}