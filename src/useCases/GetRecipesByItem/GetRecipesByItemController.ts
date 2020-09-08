import {GetRecipesByItemUseCase} from "./GetRecipesByItemUseCase";
import {Response, Request} from "express";
import {Logger} from "tslog";

const log: Logger = new Logger();

export class GetRecipesByItemController {
    constructor(private getRecipesByItemUseCase: GetRecipesByItemUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        let error = []
        if (!request.body) {
            error.push('send a body in request')
        } else if (request.body && !request.body.items) {
            error.push('send items field')
        } else if (request.body && request.body.items) {
            if (!Array.isArray(request.body.items)) {
                error.push('field items need to be a array of strings')
            } else {
                let valid = false
                for(let item of request.body.items){
                    if(item && typeof item === "string" || item instanceof String){
                        valid = true
                    }
                    if(!(typeof item === "string" || item instanceof String)){
                        error.push("send only strings")
                    }

                }
                if(!valid){
                    error.push('send at least one ingredient')
                }
            }
        }


        if (error.length) {
            return response.status(400).json({
                message: error.toString()
            })
        }


        try {
            let recipes = await this.getRecipesByItemUseCase.execute(request.body)
            return response.status(200).json({recipes: recipes})
        } catch (err) {
            log.error(err.message)
            return response.status(500).json({
                message: err.message || 'Unexpected Error'
            })
        }

    }

}