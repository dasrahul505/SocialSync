import express from 'express';
import passport from 'passport';
import User from '../models/user.model.js';
import { refreshSocialTokens } from '../services/social.service.js';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/accounts', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.connectedPlatforms);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/disconnect/:platform', async (req, res) => {
  try {
    const { platform } = req.params;
    const user = await User.findById(req.user._id);
    
    user.socialTokens[platform] = undefined;
    user.connectedPlatforms = user.connectedPlatforms.filter(
      p => p.platform !== platform
    );
    
    await user.save();
    res.json({ message: 'Platform disconnected successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/refresh-tokens', async (req, res) => {
  try {
    await refreshSocialTokens(req.user);
    res.json({ message: 'Tokens refreshed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to refresh tokens' });
  }
});

export default router;