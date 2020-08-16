import mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    createdAt: Number;
};

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: true
    }
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
