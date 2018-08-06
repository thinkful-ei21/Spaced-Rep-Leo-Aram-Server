const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    difficulty: { type: String, required: true },
    score: { type: Array, default: [] },
    percentage: { type: Number, default: '' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

statsSchema.set('timestamps', true);

statsSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
    }
});

statsSchema.methods.serialize = function () {
    return {
        difficulty: this.difficulty || '',
        score: this.score || '',
        userId: this.userId || '',
        id: this.id || '',
    };
};

const Stats = mongoose.model('Stats', statsSchema);

module.exports = { Stats };