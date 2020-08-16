import {User} from "../../../entities/User";
import {IRecipesRepository} from "../../IRecipesRepository";
import {Recipe} from "../../../entities/Recipe";
import RecipeSchema from "./schemas/recipe";
import {DocumentQuery} from "mongoose";
import Utils from "./util/Utils";

export class MongoRecipesRepository implements IRecipesRepository {
    findAllRecipes( category: string | null, pageNumber:number): DocumentQuery<any, any> {
        let nPerPage = 20
        if (!category) {
            return RecipeSchema.find()
                .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                .limit(nPerPage);
        } else {
            return RecipeSchema.find()
                .where({category: category})
                .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                .limit(nPerPage);
        }

    }

    findRecipe(_id: string): Promise<Recipe | null> {
        return Promise.resolve(null);
    }

    async save(recipe: Recipe): Promise<void> {
        await RecipeSchema.create(recipe)
    }

}