import {IGetRecipesDTO} from "./GetRecipesByItemDTO";
import {IRecipesRepository} from "../../repositories/IRecipesRepository";
import {DocumentQuery} from "mongoose";

export class GetRecipesByItemUseCase {
    constructor(private recipesRepository: IRecipesRepository) {
    }

    async execute(data: any, page: number): Promise<DocumentQuery<any, any>> {
        return this.recipesRepository.findByItemRecipes(data.items, page);
    }
}