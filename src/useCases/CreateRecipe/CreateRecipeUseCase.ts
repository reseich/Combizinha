import {ICreateRecipeDTO} from "./CreateRecipeDTO";
import {IRecipesRepository} from "../../repositories/IRecipesRepository";
import {Recipe} from "../../entities/Recipe";
import * as mongoose from "mongoose";

export class CreateRecipeUseCase {
    constructor(private recipeRepository: IRecipesRepository) {

    }

    async execute(data: ICreateRecipeDTO): Promise<mongoose.Types.ObjectId>{
        const recipe = new Recipe(data)
        await this.recipeRepository.save(recipe)
        return recipe._id
    }
}