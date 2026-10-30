import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        'CREATE_STUDENT',
        'UPDATE_STUDENT',
        'DELETE_STUDENT',
        'USER_LOGIN',
        'USER_REGISTER',
        'UPDATE_PROFILE',
        'CHANGE_PASSWORD',
      ],
    },
    entityType: {
      type: String,
      default: 'Student',
    },
    entityId: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

activityLogSchema.index({ createdAt: -1 });
activityLogSchema.index({ user: 1 });

export const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

