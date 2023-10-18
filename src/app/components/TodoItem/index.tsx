"use client"

type TodoItemProps = {
  id: string,
  title: string,
  complete: boolean,
  toggleTodo: (id: string, complete: boolean) => void,
}

export function TodoItem({ id, title, complete, toggleTodo }: TodoItemProps) {

  return <li className="flex justify-between align-middle mb-1">
    <div className="flex items-center gap-2">
      <input id={id} type="checkbox" defaultChecked={complete} className="peer cursor-pointer"
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      <label htmlFor={id}
        className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500">
        {title}
      </label>
    </div>
  </li>
}