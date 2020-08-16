import mongoose from 'mongoose'

export interface IRecipe extends mongoose.Document {
    name: string;
    prepareTime: string;
    portions: string
    category: string;
    ingredients: [string];
    steps: [string];
};

export const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    prepareTime: {
        type: String,
        required: true
    },
    portions: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    steps: {
        type: Array,
        required: true
    }
});

const Recipe = mongoose.model<IRecipe>('Recipe', RecipeSchema);
export default Recipe;
