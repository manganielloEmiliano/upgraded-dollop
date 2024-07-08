import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true,'el nombre es requerido'] },
    email: { type: String, required: [true,'el email es requerido'], unique: true},
    password: { type: String, required: [true,'el password es requerido'] },
    img: { type: String },
    roles:{type:[String],default:['USER_ROLE'],enum:['USER_ROLE','ADMIN_ROLE']},
    });

export const User = mongoose.model('User', userSchema);