import { Model } from 'mongoose';
import TopicModel, { ITopic, ITopicDocument } from '@/models/topic';
import connectMongoDB from '@/db/mongodb';

connectMongoDB()

class TopicRepository {
  private readonly model: Model<ITopicDocument>;

  constructor(model: Model<ITopicDocument>) {
    this.model = model;
  }

  async create(topic: ITopic): Promise<ITopicDocument> {
    return this.model.create(topic);
  }

  async findById(id: string): Promise<ITopic | null | undefined> {
    return (await this.model.findById(id))?.toJSON();
  }

  async update(id: string, topic: Partial<ITopic>): Promise<ITopicDocument | null> {
    return this.model.findByIdAndUpdate(id, topic, { new: true }).exec();
  }

  async patch(id: string, topic: Partial<ITopic>): Promise<ITopicDocument | null> {
    return this.model.findByIdAndUpdate(id, topic, { new: true }).lean()
  }

  async delete(id: string): Promise<ITopicDocument | null> {
    return this.model.findByIdAndDelete(id).lean();
  }

  async findAll(): Promise<ITopicDocument[]> {
    return this.model.find().exec();
  }
}
const topicRepository = new TopicRepository(TopicModel);
export default new TopicRepository(TopicModel)
