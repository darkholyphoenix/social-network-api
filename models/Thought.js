const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionsSchema = new Schema (
    {
        reactionId:{ type: Schema.Types.ObjectId, default: new ObjectId},
        reactionBody: {type: String, required: true, max: 280 },
        username: {type: String, required: true },
        createdAt: {type: Date, default: Date.now, get: createdAtVal => dateFormat(createdAtVal)}
    }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [
      
        ReactionsSchema
      
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments and replies on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.reduce(
    (total, thought) => total + thought.reactions.length + 1,
    0
  );
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
