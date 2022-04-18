const { Schema, model } = require('mongoose');
const userSchema = require('./User');
const moment = require('moment');

// Schema to create Reaction model
const reactionSchema = new Schema(
  {
    reactionId:
        {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: [
        userSchema,
        {
            type: String,
            required: true,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
      },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Initialize our Thought model
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;