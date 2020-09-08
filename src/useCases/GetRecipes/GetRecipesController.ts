import {GetRecipesUseCase} from "./GetRecipesUseCase";
import {Response, Request} from "express";
import {Logger} from "tslog";
const log: Logger = new Logger();

export class GetRecipesController {
    constructor(private getRecipesUseCase: GetRecipesUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        const {category} = request.body
        let page = 0
        if(request.query){
            page = Number(request.query.page) && Number(request.query.page)> 0? Number(request.query.page): page
        }

        try {
            let recipes = await this.getRecipesUseCase.execute({category},page)
            return response.status(200).json({recipes: recipes})
        } catch (err) {
            log.error(err.message)
            return response.status(500).json({
                message: err.message || 'Unexpected Error'
            })
        }

    }

}