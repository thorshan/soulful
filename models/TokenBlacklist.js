const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiredAt: {
        type: Date,
        required: true
    }
});

// Auto delete expire tokens
tokenBlacklistSchema.index({ expiredAt: 1}, { expireAfterSeconds: 0 });
module.exports = mongoose.model("TokenBlacklist", tokenBlacklistSchema);