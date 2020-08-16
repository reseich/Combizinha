import {MongoRecipesRepository} from "../../repositories/implementations/Mongo/MongoRecipesRepository";
import {GetRecipesController} from "./GetRecipesController";
import {GetRecipesUseCase} from "./GetRecipesUseCase";

const mongoRecipesRepository = new MongoRecipesRepository()

const getRecipesUseCase = new GetRecipesUseCase(mongoRecipesRepository)
const getRecipesController = new GetRecipesController(getRecipesUseCase)

export {getRecipesUseCase, getRecipesController}
