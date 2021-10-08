import IUserRepo from "../../../repository/user/IUserRepo";
import User from "../User";
import UserDto from "../UserDto";
import IUserService from "./IUserService";
import { hash } from 'bcrypt'

export default class UserService implements IUserService {
    userRepo: IUserRepo

    constructor(
        userRepo: IUserRepo
    ) {
        this.userRepo = userRepo
    }

    public async update(id: string, data: User): Promise<User> {
        return await this.userRepo.update(id, data)
    }

    public async delete(id: string): Promise<User> {
        return await this.userRepo.delete(id)
    }

    public async create(data: UserDto): Promise<User> {
        const hashedPassword = await hash(data.password, 10);
        return await this.userRepo.create({
            ...data,
            password: hashedPassword
        })
    }

}