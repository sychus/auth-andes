import { Document } from 'mongoose';

export interface IAuthUsers extends Document {
     nombre: String,
     usuario: Number,
     apellido: String,
     password: String
}