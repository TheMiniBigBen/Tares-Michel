import { Document, Schema, Types, model } from 'mongoose';

export interface Rol extends Document {
    name: string;
    type: string;
    status: boolean;
}

const rolSchema = new Schema<Rol>({
    name: {
    type:String,
    required: true,
    unique: true
    },
    type: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    }
})

export const Rol = model<Rol>('Rol', rolSchema, 'rol');