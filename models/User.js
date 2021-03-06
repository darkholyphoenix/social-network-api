const { Schema, model } = require('mongoose');
const validateEmail = function(email) {
    var re = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return re.test(email)
};

const UserSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true

      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/]

      },
      thoughts: [
          {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
          }
      ],
      friends: [
        {
      type: Schema.Types.ObjectId,
      ref: 'User'
        }
    ],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );

const User = model('User', UserSchema);

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

module.exports = User;