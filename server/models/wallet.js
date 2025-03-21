import { Schema, model } from 'mongoose';

const walletSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    currency: {
        type: String,
        required: true,
        default: "ILS"
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: "Transaction"
    }]
}, {
    timestamps: true,
});

// Create a compound index on userId and walletId to serve as the primary key

walletSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    },
});

const Wallet = model('Wallet', walletSchema);
export default Wallet;