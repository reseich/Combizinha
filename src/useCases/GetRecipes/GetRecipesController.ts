import {GetRecipesUseCase} from "./GetRecipesUseCase";
import {Response, Request} from "express";

export class GetRecipesController {
    constructor(private getRecipesUseCase: GetRecipesUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        const {category} = request.body
        console.log(request.query)
        let page = 0
        if(request.query){
            page = Number(request.query.page) && Number(request.query.page)> 0? Number(request.query.page): page
        }

        try {
            let recipes = await this.getRecipesUseCase.execute({category},page)
            return response.status(200).json({recipes: recipes})
        } catch (err) {
            return response.status(500).json({
                message: err.message || 'Unexpected Error'
            })
        }

    }

}