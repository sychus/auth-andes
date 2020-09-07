import * as mongoose from 'mongoose';

const { Schema } = mongoose;

export const AuthUsers = new Schema({
  nombre: String,
  apellido: String,
  usuario: Number,
  password: String
})

