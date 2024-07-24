const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    coverage: {
      type: Number,
      required: true
    },
    premium: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

const Policy = mongoose.model('Policy', PolicySchema);

module.exports = Policy;
