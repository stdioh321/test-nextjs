import { getAllTodos } from '@/api'
import AddTask from '@/app/components/AddTask'
import TodoList from '@/app/components/TodoList'

export default async function Home() {
  const tasks = await getAllTodos()

  return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className="text-center my-5 flex-flex-col-gap4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <AddTask />
      </div>
      <div>
        <TodoList tasks={tasks} />
      </div>
    </main>
  )
}
