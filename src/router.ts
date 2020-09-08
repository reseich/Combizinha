import {Router} from "express";
import {getUserController} from "./useCases/GetUser";
import {getRecipesController} from "./useCases/GetRecipes";
import {getRecipesByItemController} from "./useCases/GetRecipesByItem";
import {createUserController} from "./useCases/CreateUser";
import {createRecipeController} from "./useCases/CreateRecipe";
import Utils from "./repositories/implementations/Mongo/util/Utils";

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).send()
})

router.post('/users', (req, res) => {
    return createUserController.handle(req, res)
})

router.get('/users', (req, res) => {
    return getUserController.handle(req, res)
})

router.get('/recipes', (req, res) => {
    return getRecipesController.handle(req, res)
})

router.get('/recipesByItem', (req, res) => {
    return getRecipesByItemController.handle(req, res)
})

router.post('/recipes', (req, res) => {
    return createRecipeController.handle(req, res)
})

export {router}