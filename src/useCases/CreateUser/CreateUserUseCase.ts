import {IUsersRepository} from "../../repositories/IUsersRepository";
import {ICreateUserDTO} from "./CreateUserDTO";
import {User} from "../../entities/User";
import {IMailProvider} from "../../providers/IMailProvider";
import * as mongoose from "mongoose";

export class CreateUserUseCase {
    constructor(private usersRepository: IUsersRepository, private mailProvider: IMailProvider) {

    }

    async execute(data: ICreateUserDTO): Promise<mongoose.Types.ObjectId>{
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)
        if (userAlreadyExists) {
            throw new Error('User already exists.')
        }

        const user = new User(data)
        await this.usersRepository.save(user)

        // await this.mailProvider.sendMail({
        //     to: {
        //         name: data.name,
        //         email: data.email
        //     },
        //     from: {
        //         name: 'Teste 123',
        //         email: 'teste@email.com'
        //     },
        //     subject: 'Welcome my friend',
        //     body: '<p>HEEEEEEEEEEYYYYYYYYYYYY</p>'
        // })
        return user._id
    }
}