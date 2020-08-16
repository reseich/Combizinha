import {User} from "../../../entities/User";
import {IRecipesRepository} from "../../IRecipesRepository";
import {Recipe} from "../../../entities/Recipe";
import  RecipeSchema from "./schemas/recipe";
import {DocumentQuery} from "mongoose";

export class MongoRecipesRepository implements IRecipesRepository {
    findAllRecipes(category: string | null): DocumentQuery<any, any> {
        return RecipeSchema.find();
    }

    findRecipe(_id: string): Promise<Recipe | null> {
        return Promise.resolve(null);
    }

    async save(recipe: Recipe): Promise<void> {
        await RecipeSchema.create(recipe)
    }

}