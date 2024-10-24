import express from 'express';
import passport from 'passport';
import { validateVideoUpload } from '../validators/video.validator.js';
import Video from '../models/video.model.js';
import { uploadToSocialPlatforms } from '../services/social.service.js';

const router = express.Router();

// Protect all routes
router.use(passport.authenticate('jwt', { session: false }));

router.post('/', validateVideoUpload, async (req, res) => {
  try {
    const { title, description, platforms } = req.body;
    
    // Create video record
    const video = await Video.create({
      user: req.user._id,
      title,
      description,
      fileName: req.file.filename,
      platforms: platforms.map(platform => ({
        platform,
        status: 'pending'
      }))
    });

    // Start upload process to selected platforms
    uploadToSocialPlatforms(video, req.user);

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const videos = await Video.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;