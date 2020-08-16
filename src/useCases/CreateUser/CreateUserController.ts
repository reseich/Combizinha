import {CreateUserUseCase} from "./CreateUserUseCase";
import {Response, Request} from "express";

export class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        const {name, email, password} = request.body
        try {
            let _id = await this.createUserUseCase.execute({name, email, password, createdAt: Date.now()})
            return response.status(201).json({_id: _id})
        } catch (err) {
            return response.status(500).json({
                message: err.message || 'Unexpected Error'
            })
        }

    }

}