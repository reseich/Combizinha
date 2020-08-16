import {IGetRecipesDTO} from "./GetRecipesDTO";
import {IRecipesRepository} from "../../repositories/IRecipesRepository";
import {Recipe} from "../../entities/Recipe";
import {DocumentQuery} from "mongoose";

export class GetRecipesUseCase {
    constructor(private recipesRepository: IRecipesRepository) {
    }

    async execute(data: IGetRecipesDTO, page:number): Promise<DocumentQuery<any, any>> {
        return this.recipesRepository.findAllRecipes(data.category || null, page);
    }
}