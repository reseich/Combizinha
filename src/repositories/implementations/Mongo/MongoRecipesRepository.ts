import {IRecipesRepository} from "../../IRecipesRepository";
import {Recipe} from "../../../entities/Recipe";
import RecipeSchema from "./schemas/recipe";
import {Aggregate} from "mongoose";

export class MongoRecipesRepository implements IRecipesRepository {
    findAllRecipes(category: string | null, page: number): Aggregate<any[]> {
        let nPerPage = 12
        if (!category) {
            return RecipeSchema.aggregate([
                {'$sort': {'order_number': -1}},
                {'$unset': ["__v"]},
                {
                    '$facet': {
                        metadata: [{$count: "total"}, {$addFields: {page: (page || 1)}}],
                        data: [{$skip: page > 0 ? ((page - 1) * nPerPage) : 0}, {$limit: nPerPage}]
                    }
                }
            ])

        } else {
            return RecipeSchema.aggregate([
                {'$match': {category: category}},
                {'$sort': {'order_number': -1}},
                {'$unset': ["__v"]},
                {
                    '$facet': {
                        metadata: [{$count: "total"}, {$addFields: {page: (page || 1)}}],
                        recipes: [{$skip: page > 0 ? ((page - 1) * nPerPage) : 0}, {$limit: nPerPage}]
                    }
                }
            ])
        }

    }

    findRecipe(_id: string): Promise<Recipe | null> {
        return Promise.resolve(null);
    }

    async save(recipe: Recipe): Promise<void> {
        await RecipeSchema.create(recipe)
    }

    findByItemRecipes(items: [string], page: number): Aggregate<any[]> {
        let nPerPage = 12
        let regexs: any = []

        items.forEach((item) => {
            if (item) {
                let regex = new RegExp(`(?<![\\w\\d(à-ú)(À-Ú)])${item.toString()}(?![\\w\\d(à-ú)(À-Ú)])`, "gi");
                regexs.push({ingredients: regex})
            }
        })


        if (!regexs.length) {
            throw new Error("Send a ingredient to search")
        }
        return RecipeSchema.aggregate([
            {'$match': {$and: regexs}},
            {'$sort': {'order_number': -1}},
            {'$unset': ["__v"]},
            {
                '$facet': {
                    metadata: [{$count: "total"}, {$addFields: {page: (page || 1)}}],
                    data: [{$skip: page > 0 ? ((page - 1) * nPerPage) : 0}, {$limit: nPerPage}]
                }
            }
        ])
    }

}