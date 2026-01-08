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
    price: { type: Number, default: 0 }, // Price in smallest currency unit (e.g., paise for INR) or just standard unit. Razorpay expects paise. Let's store as standard number and convert, or store as is. User said "Price". Let's assume standard currency for display, but we might need to be careful. Let's stick to standard number (e.g. 499).
    duration: { type: String }, // e.g., "15 Days"
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

// --- Purchase Model ---
const PurchaseSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    amount: { type: Number, required: true },
    orderId: { type: String, required: true },
    paymentId: { type: String },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const Purchase = models.Purchase || model('Purchase', PurchaseSchema);
