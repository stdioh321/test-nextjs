import { Model } from 'mongoose';
import TopicModel, { ITopic, ITopicDocument } from '@/models/topic';
import connectMongoDB from '@/db/mongodb';
import { TopicGet, TopicPatch } from '@/dto/topic';

connectMongoDB()

class TopicRepository {
  private readonly model: Model<ITopicDocument>;

  constructor(model: Model<ITopicDocument>) {
    this.model = model;
  }

  async create(topic: ITopicDocument): Promise<TopicGet> {
    return new TopicGet(await this.model.create(topic));
  }

  async findById(id: string): Promise<TopicGet | null> {
    const topic = await this.model.findById(id);
    return topic ? new TopicGet(topic) : null;
  }

  async update(id: string, topic: TopicPatch): Promise<TopicGet | null> {
    const topicUpdated = await this.model.findByIdAndUpdate(id, topic, { new: true }).exec()
    return topicUpdated ? new TopicGet(topicUpdated) : null
  }

  async patch(id: string, topic: TopicPatch): Promise<TopicGet | null> {
    const topicUpdated = await this.model.findByIdAndUpdate(id, topic, { new: true }).exec()
    return topicUpdated ? new TopicGet(topicUpdated) : null
  }

  async delete(id: string): Promise<TopicGet | null> {
    const deletedTopic = await this.model.findByIdAndDelete(id).lean();
    return deletedTopic ? new TopicGet(deletedTopic) : null;
  }

  async findAll(): Promise<TopicGet[]> {
    return (await this.model.find().exec()).map(it => new TopicGet(it));
  }
}
const topicRepository = new TopicRepository(TopicModel);
export default new TopicRepository(TopicModel)
