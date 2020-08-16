import {MongoRecipesRepository} from "../../repositories/implementations/Mongo/MongoRecipesRepository";
import {CreateRecipeUseCase} from "./CreateRecipeUseCase";
import {CreateRecipeController} from "./CreateRecipeController";


const mongoRecipesRepository = new MongoRecipesRepository()

const createRecipeUseCase = new CreateRecipeUseCase(mongoRecipesRepository)
const createRecipeController = new CreateRecipeController(createRecipeUseCase)

export {createRecipeUseCase, createRecipeController}
