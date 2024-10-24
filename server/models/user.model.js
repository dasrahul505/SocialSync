import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: function() {
        return !this.googleId && !this.facebookId;
      },
    },
    name: {
      type: String,
      required: true,
    },
    googleId: String,
    facebookId: String,
    socialTokens: {
      google: {
        accessToken: String,
        refreshToken: String,
      },
      facebook: {
        accessToken: String,
        refreshToken: String,
      },
      instagram: {
        accessToken: String,
        refreshToken: String,
      },
      youtube: {
        accessToken: String,
        refreshToken: String,
      },
    },
    connectedPlatforms: [{
      platform: String,
      connected: Boolean,
      username: String,
    }],
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;