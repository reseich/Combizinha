import {GetUserUseCase} from "./GetUserUseCase";
import {Response, Request} from "express";

export class GetUserController {
    constructor(private getUserUseCase: GetUserUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        const {email} = request.body
        try {
            let user = await this.getUserUseCase.execute({email})

            return response.status(200).json({user})
        } catch (err) {
            return response.status(500).json({
                message: err.message || 'Unexpected Error'
            })
        }

    }

}