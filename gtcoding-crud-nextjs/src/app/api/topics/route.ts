import TopicModel from "@/models/topic";
import topicRepository from "@/repositories/topicRepository";
import TopicRepository from "@/repositories/topicRepository";
import { NextResponse } from "next/server";

export async function GET() {
  const topics = await TopicRepository.findAll()
  return NextResponse.json([...topics], { status: 200 })
}

export async function POST(request: Request, { }) {
  try {
    const newTopic = new TopicModel(await request.json())
    await newTopic.validate()
    const TopicCreated = await topicRepository.create(newTopic)
    return NextResponse.json(TopicCreated, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}