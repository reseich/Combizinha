import {IUsersRepository} from "../../IUsersRepository";
import {User} from "../../../entities/User";
import UserSchema from "./schemas/user"

export class MongoUsersRepository implements IUsersRepository {

    async findByEmail(email: string): Promise<User | null> {
        return UserSchema.findOne({email: email});
    }

    async save(user: User): Promise<void> {
        await UserSchema.create(user)
    }


}