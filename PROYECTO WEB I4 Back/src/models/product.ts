import { Document, Schema, Types, model } from 'mongoose';

export interface Product extends Document {
    id: Types.ObjectId;
    name: string;
    price: number;
    qty: number;
    status: boolean;
    desc: string;
    CreateDate: Date;
    deleteDate: Date | null;
}

const productSchema = new Schema<Product>({
    name: {
    type:String,
    required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
        minlength: 8,
    },
    status: {
        type: Boolean,
        default: true
    },
    desc: {
        type: String,
        required: true,
    },
    CreateDate: {
        type: Date,
        default: Date.now
    },
    deleteDate: {
        type: Date,
        default: null
    },
})

export const Product = model<Product>('Product', productSchema, 'product');