import { Document, Schema, Types, model } from 'mongoose';

interface OrderProduct {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
}

export interface Order extends Document {
    _id: Types.ObjectId;
    userId: string;
    date: Date;
    status: string;
    total: number;
    subtotal: number;
    products: OrderProduct[];
}

const orderProductSchema = new Schema<OrderProduct>({
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        min: [1, 'Quantity must be at least 1']
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative']
    }
}, { _id: false });

const orderSchema = new Schema<Order>({
    userId: {
        type: String,
        required: [true, 'User ID is required'],
        trim: true
    },
    total: {
        type: Number,
        required: [true, 'Total is required'],
        min: [0, 'Total cannot be negative']
    },
    subtotal: {
        type: Number,
        required: [true, 'Subtotal is required'],
        min: [0, 'Subtotal cannot be negative']
    },
    products: {
        type: [orderProductSchema],
        required: [true, 'At least one product is required'],
        validate: {
            validator: (array: OrderProduct[]) => array.length > 0,
            message: 'Order must contain at least one product'
        }
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: {
            values: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            message: '{VALUE} is not a valid status'
        },
        default: 'pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    collection: 'orders'
});

export const OrderModel = model<Order>('Order', orderSchema);