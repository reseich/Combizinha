import {MailTrapMailProvider} from "../../providers/implementations/MailTrapMailProvider";
import {MongoUsersRepository} from "../../repositories/implementations/Mongo/MongoUsersRepository";
import {CreateUserUseCase} from "./CreateUserUseCase";
import {CreateUserController} from "./CreateUserController";

const mailTrapMailProvider = new MailTrapMailProvider()
const mongoUsersRepository = new MongoUsersRepository()

const createUserUseCase = new CreateUserUseCase(mongoUsersRepository, mailTrapMailProvider)
const createUserController = new CreateUserController(createUserUseCase)

export {createUserUseCase, createUserController}
