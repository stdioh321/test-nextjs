import { TopicGet } from '@/dto/topic'
import { ITopic, ITopicDocument } from '@/models/topic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { HiOutlineTrash, HiPencilAlt } from 'react-icons/hi'

export default function TopicItem(topic: TopicGet) {
  const routerNavigation = useRouter()
  async function handleDeleteTopic(id: string) {
    try {
      const res = await fetch(`api/topics/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw Error('Something went wrong')
      routerNavigation.refresh()
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <>
      <div className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start'>
        <div>
          <h2 className="font-bold text-2xl line-clamp-1">{topic.title}</h2>
          <div>{topic.description}</div>
          <small>{topic.id}</small>
        </div>
        <div className="md:flex md:gap-2">
          <button className="text-red-400" onClick={(e) => handleDeleteTopic(topic.id)}>
            <HiOutlineTrash size={24} />
          </button>
          <Link href={`/editTopic/${topic.id}`}>
            <HiPencilAlt size={24} />
          </Link>
        </div>
      </div>
    </>
  )
}
