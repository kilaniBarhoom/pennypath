import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
    date: { type: Date, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["income", "expense", "transfer"], required: true },
    category: { type: String, required: true },
})



transactionSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    },
});

const Transaction = model('Transaction', transactionSchema)
export default Transaction
