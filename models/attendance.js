import { Schema, model } from 'mongoose';

const attendanceSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    attendanceTime: {
        type: String,
    },
    status: {
        type: String,
        enum: ['present', 'absent'],
        required: true,
    },
    advancePayment: {
        type: Number,
    },
    leaveTime: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
})


attendanceSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    },
});

const Attendance = model('Attendance', attendanceSchema)
export default Attendance
