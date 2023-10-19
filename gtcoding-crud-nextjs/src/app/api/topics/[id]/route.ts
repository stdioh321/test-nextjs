import TopicModel from "@/models/topic";
import TopicRepository from "@/repositories/topicRepository";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }) {
  try {
    const { id } = params
    const topic = await TopicRepository.findById(id)

    if (!topic) return NextResponse.json('', { status: 404 })
    return NextResponse.json({ ...topic }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }) {
  try {
    const { id } = params
    console.log(id);
    
    const topic = await TopicRepository.delete(id)

    if (!topic) return NextResponse.json('', { status: 404 })
    return NextResponse.json({ ...topic }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}

export async function PATCH(request: NextRequest, { params }) {
  try {
    const { id } = params
    const tempTopic = new TopicModel(await request.json())
    const { _id, ...newTopic } = tempTopic.toJSON()

    const topic = await TopicRepository.patch(id, newTopic)

    if (!topic) return NextResponse.json('', { status: 404 })
    return NextResponse.json({ ...topic }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}

export async function PUT(request: NextRequest, { params }) {
  try {
    const { id } = params
    const tempTopic = new TopicModel(await request.json())
    const { _id, ...newTopic } = tempTopic.toJSON()

    const topic = await TopicRepository.patch(id, newTopic)

    if (!topic) return NextResponse.json('', { status: 404 })
    return NextResponse.json({ ...topic }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}