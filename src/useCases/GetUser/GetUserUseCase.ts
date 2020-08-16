import {IUsersRepository} from "../../repositories/IUsersRepository";
import {User} from "../../entities/User";
import {IGetUserDTO} from "./GetUserDTO";

export class GetUserUseCase {
    constructor(private usersRepository: IUsersRepository) {

    }

    async execute(data: IGetUserDTO): Promise<User | null>{
        let user =  await this.usersRepository.findByEmail(data.email)
        if(!user){
            throw new Error('User not found.')
        }
        return user
    }
}