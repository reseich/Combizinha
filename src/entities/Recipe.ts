import {v4} from 'uuid'
import mongoose from "mongoose";

export class Recipe {
    public readonly _id: mongoose.Types.ObjectId
    public name: string
    public prepareTime: string
    public portions: string
    public category: string
    public ingredients: [string]
    public steps: [string]

    constructor(props: Omit<Recipe, '_id'>, _id?: mongoose.Types.ObjectId) {
        this.name = props.name
        this.prepareTime = props.prepareTime
        this.category = props.category
        this.portions = props.portions
        this.ingredients = props.ingredients
        this.steps = props.steps
        if (!_id) {
            this._id = new mongoose.Types.ObjectId()
        } else {
            this._id = _id
        }
    }
}