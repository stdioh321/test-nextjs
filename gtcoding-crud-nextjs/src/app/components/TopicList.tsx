import Link from 'next/link'
import React from 'react'
import { HiOutlineTrash, HiPencilAlt } from 'react-icons/hi'
import TopicItem from './TopicItem'

async function getTopics() {
  let topics: any[] = []
  try {
    topics = await (await fetch('http://localhost:3000/api/topics')).json()

  } catch (error) {
    console.log(getTopics);
  }
  return topics
}
export default async function TopicList() {
  const topics = await getTopics()

  return (
    <>
      <div><h1 className='text-3xl'>Todo list</h1></div>
      <div>
        {generateListTopics(topics)}
      </div>
    </>
  )

  function generateListTopics(topics: any[]): React.ReactNode {
    return topics.length > 0 ?
      topics.map((it) => (<TopicItem key={it._id} {...it} />))
      : <div className='font-bold text-1xl text-red-300'>Empty</div>
  }
}
