import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Student full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    rollNumber: {
      type: String,
      required: [true, 'Roll / Registration Number is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    email: {
      type: String,
      required: [true, 'Student email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid student email',
      ],
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: {
        values: [
          'Computer Science',
          'Information Technology',
          'Electronics & Comm.',
          'Mechanical Eng.',
          'Electrical Eng.',
          'Civil Eng.',
          'Data Science',
          'Business Administration',
        ],
        message: '{VALUE} is not a supported department',
      },
    },
    semester: {
      type: Number,
      required: [true, 'Current semester is required'],
      min: [1, 'Semester must be between 1 and 8'],
      max: [8, 'Semester must be between 1 and 8'],
    },
    cgpa: {
      type: Number,
      required: [true, 'CGPA is required'],
      min: [0.0, 'CGPA cannot be less than 0.0'],
      max: [10.0, 'CGPA cannot exceed 10.0'],
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Graduated', 'Suspended'],
      default: 'Active',
    },
    phone: {
      type: String,
      required: [true, 'Contact phone number is required'],
      trim: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Male',
    },
    dateOfBirth: {
      type: Date,
    },
    guardianName: {
      type: String,
      default: '',
      trim: true,
    },
    guardianPhone: {
      type: String,
      default: '',
      trim: true,
    },
    address: {
      type: String,
      default: '',
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for high performance searching and filtering
studentSchema.index({ fullName: 'text', rollNumber: 'text', email: 'text' });
studentSchema.index({ department: 1, status: 1 });
studentSchema.index({ createdBy: 1 });

export const Student = mongoose.model('Student', studentSchema);

