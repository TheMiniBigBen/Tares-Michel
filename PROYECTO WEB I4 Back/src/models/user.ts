import { Document, Schema, Types, model } from 'mongoose';

export interface IUser extends Document {
    id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    status: boolean;
    CreateDate: Date;
    deleteDate: Date | null;
    roles: Types.ObjectId[]; // Cambio aquí
    firstName: string;
    lastName: string;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    status: {
        type: Boolean,
        default: true
    },
    CreateDate: {
        type: Date,
        default: Date.now
    },
    deleteDate: {
        type: Date,
        default: null
    },
    roles: [{ // Cambio aquí
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: true
    }],
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    }
});

export const User = model<IUser>('User', userSchema, 'user');
