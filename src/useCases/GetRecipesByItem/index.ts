import {MongoRecipesRepository} from "../../repositories/implementations/Mongo/MongoRecipesRepository";
import {GetRecipesByItemController} from "./GetRecipesByItemController";
import {GetRecipesByItemUseCase} from "./GetRecipesByItemUseCase";

const mongoRecipesRepository = new MongoRecipesRepository()

const getRecipesByItemUseCase = new GetRecipesByItemUseCase(mongoRecipesRepository)
const getRecipesByItemController = new GetRecipesByItemController(getRecipesByItemUseCase)

export {getRecipesByItemUseCase, getRecipesByItemController}
