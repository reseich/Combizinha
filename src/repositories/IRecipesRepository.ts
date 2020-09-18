import {Recipe} from "../entities/Recipe";
import {Aggregate} from "mongoose";

export interface IRecipesRepository {
    findAllRecipes(category: string | null, page: number): Aggregate<any[]>

    findRecipe(_id: string): Promise<Recipe | null>

    save(recipe: Recipe): Promise<void>

    findByItemRecipes(items: [string], page: number): Aggregate<any[]>;
}