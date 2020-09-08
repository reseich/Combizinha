import {Recipe} from "../entities/Recipe";
import {DocumentQuery} from "mongoose";

export interface IRecipesRepository {
    findAllRecipes(category:string | null, page:number):DocumentQuery<any, any>
    findRecipe(_id: string): Promise<Recipe | null>
    save(recipe:Recipe): Promise<void>

    findByItemRecipes(items: [string]): DocumentQuery<any, any>;
}