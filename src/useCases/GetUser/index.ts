import {MongoUsersRepository} from "../../repositories/implementations/Mongo/MongoUsersRepository";
import {GetUserController} from "./GetUserController";
import {GetUserUseCase} from "./GetUserUseCase";

const mongoUsersRepository = new MongoUsersRepository()

const getUserUseCase = new GetUserUseCase(mongoUsersRepository)
const getUserController = new GetUserController(getUserUseCase)

export {getUserUseCase, getUserController}
