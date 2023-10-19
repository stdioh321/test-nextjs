import { ITopicDocument } from "@/models/topic";

export class TopicGet {
  id: string
  title: string
  description: string
  createdAt: Date
  updatedAt: Date

  constructor(topic: ITopicDocument) {
    this.id = topic._id?.toString()
    this.title = topic.title
    this.description = topic.description
    this.createdAt = topic.createdAt
    this.updatedAt = topic.updatedAt
  }
}
export class TopicPost {
  title: string
  description: string

  constructor(topic: ITopicDocument) {
    this.title = topic.title
    this.description = topic.description
  }
}

export class TopicPatch {
  title?: string
  description?: string

  constructor(topic: ITopicDocument) {
    this.title = topic.title
    this.description = topic.description
  }
}