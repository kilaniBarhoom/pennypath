// category model
import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String, required: true,
        unique: [true, "Category name must be unique"],
    },
    description: { type: String, required: false },
}, {
    timestamps: true
});

categorySchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    },
});

const Category = model('Category', categorySchema);
export default Category;