import { prisma } from "@/db/prisma/db"
import { TodoItem } from "@/app/components/TodoItem"
import Link from "next/link"

export default async function Page() {
  let todos = await getTodos()

  async function getTodos() {
    return prisma.todo.findMany()
  }

  async function updateTodo(id: string, complete: boolean) {
    "use server"
    return await prisma.todo.update({ where: { id }, data: { complete } })
  }

  return (<>
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">Todos</h1>
      <Link className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none" href='/new'>New</Link>
    </header>
    <ul>
      {todos.map(todo => (<TodoItem key={todo.id} {...todo} toggleTodo={updateTodo} />))}
    </ul>
  </>)
}