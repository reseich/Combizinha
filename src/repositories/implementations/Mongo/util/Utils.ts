import fs from 'fs'
import RecipeSchema from "../schemas/recipe";
import {Recipe} from "../../../../entities/Recipe";


export default class Utils {
   static seedDatabase() {
        let recipes = JSON.parse(fs.readFileSync(__dirname+'/recipes.txt').toString())
        recipes.forEach((recipe:Recipe)=>{
            recipe.createdAt = Date.now()
            RecipeSchema.create(recipe).then(r => {console.log(r.name)})
        })
    }
}