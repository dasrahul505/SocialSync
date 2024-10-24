import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    platforms: [{
      platform: {
        type: String,
        enum: ['youtube', 'facebook', 'instagram', 'twitter'],
      },
      postId: String,
      status: {
        type: String,
        enum: ['pending', 'processing', 'published', 'failed'],
        default: 'pending',
      },
      url: String,
    }],
    analytics: {
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      engagement: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Video = mongoose.model('Video', videoSchema);
export default Video;