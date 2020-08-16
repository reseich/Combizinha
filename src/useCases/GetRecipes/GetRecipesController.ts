import {GetRecipesUseCase} from "./GetRecipesUseCase";
import {Response, Request} from "express";

export class GetRecipesController {
    constructor(private getRecipesUseCase: GetRecipesUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        const {category} = request.body
        try {
            let recipes = await this.getRecipesUseCase.execute({category})
            return response.status(200).json({recipes: recipes})
        } catch (err) {
            return response.status(500).json({
                message: err.message || 'Unexpected Error'
            })
        }

    }

}