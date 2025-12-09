import mongoose, { Schema, model, models } from 'mongoose';

// --- User Model ---
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // For email/password auth
    emailVerified: { type: Boolean, default: false },
    image: { type: String },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const User = models.User || model('User', UserSchema, 'user');

// --- Course Model ---
const CourseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    thumbnailUrl: { type: String },
    category: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const Course = models.Course || model('Course', CourseSchema);

// --- Lesson Model ---
const LessonSchema = new Schema({
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String, required: true },
    notes: { type: String }, // Rich text or markdown
    resourceUrl: { type: String }, // Notion URL
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const Lesson = models.Lesson || model('Lesson', LessonSchema);

// --- Enrollment Model ---
const EnrollmentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Prevent duplicate enrollments
EnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export const Enrollment = models.Enrollment || model('Enrollment', EnrollmentSchema);
