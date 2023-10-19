import React, { useEffect, useState } from 'react'
import TopicItem from './TopicItem'
import { TopicGet } from '@/dto/topic'
import { envs } from '@/configs/env'

async function getTopics() {
  const topics: TopicGet[] = await (await fetch('/api/topics')).json()
  return topics
}

export default function TopicList() {
  const [topics, setTopics] = useState<TopicGet[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getTopics()
      .then(res => setTopics(res))
      .finally(() => setLoading(false))
  }, [])


  return (
    <>
      <div><h1 className='text-3xl'>Todo list</h1></div>
      <div>
        {loading ? <div className='text-2xl text-green-500'>Loading....</div> : generateListTopics(topics)}
      </div>
    </>
  )

  function generateListTopics(topics: TopicGet[]): React.ReactNode {
    return topics.length < 1 ? 
    <div className='text-2xl text-blue-500'>Empty</div>
    : topics.map((it) => (<TopicItem key={it.id} {...it} />))
  }
}
