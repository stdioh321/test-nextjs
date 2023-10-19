import mongoose, { Document, Model, Schema } from 'mongoose';
import z from 'zod';

export interface ITopic {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ITopicDocument extends ITopic, Document { }

const schema = new Schema<ITopicDocument>({
  title: { type: String, required: true, minlength: 3},
  description: { type: String, minlength: 3 },
  deletedAt: { type: Date, default: null },
}, {
  timestamps: true
});

const TopicModel: Model<ITopicDocument> = mongoose.models.Topic || mongoose.model('Topic', schema);

export default TopicModel;
