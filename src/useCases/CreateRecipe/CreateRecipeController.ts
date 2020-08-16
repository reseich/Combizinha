import {CreateRecipeUseCase} from "./CreateRecipeUseCase";
import {Response, Request} from "express";

export class CreateRecipeController {
    constructor(private createRecipeUseCase: CreateRecipeUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {

        const {
            name,
            prepareTime,
            portions,
            category,
            ingredients,
            steps
        } = request.body
        try {
            let _id = await this.createRecipeUseCase.execute({
                name,
                prepareTime,
                portions,
                category,
                ingredients,
                steps,
                createdAt: Date.now()
            })
            return response.status(201).json({_id: _id})
        } catch (err) {
            return response.status(500).json({
                message: err.message || 'Unexpected Error'
            })
        }

    }

}