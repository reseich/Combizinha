import mongoose from "mongoose";


export class User {
    public readonly _id: mongoose.Types.ObjectId
    public name: string
    public email: string
    public password: string
    public createdAt: Number

    constructor(props: Omit<User, '_id'>, _id?: mongoose.Types.ObjectId) {
        this.email = props.email
        this.name = props.name
        this.password = props.password
        this.createdAt = props.createdAt
        if (!_id) {
            this._id = new mongoose.Types.ObjectId()
        } else {
            this._id = _id
        }
    }
}