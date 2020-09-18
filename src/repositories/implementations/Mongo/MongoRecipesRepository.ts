import {IRecipesRepository} from "../../IRecipesRepository";
import {Recipe} from "../../../entities/Recipe";
import RecipeSchema from "./schemas/recipe";
import {DocumentQuery} from "mongoose";

export class MongoRecipesRepository implements IRecipesRepository {
    findAllRecipes( category: string | null, pageNumber:number): DocumentQuery<any, any> {
        let nPerPage = 12
        if (!category) {
            return RecipeSchema.find()
                .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                .select('-__v')
                .limit(nPerPage);
        } else {
            return RecipeSchema.find()
                .where({category: category})
                .select('-__v')
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

    findByItemRecipes(items: [string],pageNumber:number): DocumentQuery<any, any> {
        let nPerPage = 12
        let regexs:any = []

        items.forEach((item)=>{
            if(item){
                let regex = new RegExp(`(?<![\\w\\d(à-ú)(À-Ú)])${item.toString()}(?![\\w\\d(à-ú)(À-Ú)])`,"gi");
                regexs.push({ingredients:regex})
            }
        })


        if(!regexs.length){
            throw new Error("Send a ingredient to search")
        }
        return RecipeSchema.find({$and:regexs}).select('-__v').skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
            .limit(nPerPage);
    }

}