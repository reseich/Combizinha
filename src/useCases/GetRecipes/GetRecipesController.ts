import {GetRecipesUseCase} from "./GetRecipesUseCase";
import {Response, Request} from "express";
import {Logger} from "tslog";
const log: Logger = new Logger();

export class GetRecipesController {
    constructor(private getRecipesUseCase: GetRecipesUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        let page = 0
        if(request.query){
            page = Number(request.query.page) && Number(request.query.page)> 0? Number(request.query.page): page
        }

        try {
            let recipes = await this.getRecipesUseCase.execute({category:request.query.category? request.query.category.toString(): ''},page)
            return response.status(200).json({recipes: recipes[0]})
        } catch (err) {
            log.error(err.message)
            return response.status(500).json({
                message: err.message || 'Unexpected Error'
            })
        }

    }

}