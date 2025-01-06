import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 }
});

const expenseSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Status must have a status'],
        maxlength: [100, 'Status cannot exceed 100 characters']
    },
    description: {
        type: String,
        maxlength: [400, 'Status cannot exceed 100 characters']
    },
    amount: {
        type: Number,
        required: [true, 'Status must have an amount'],
    },
    date: {
        type: Date,
        required: [true, 'Status must have a date'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    categories:
    {
        type: [categorySchema],
        required: true
    },

}, { timestamps: true })

expenseSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    },
});



const Expense = model('Expense', expenseSchema)
export default Expense
