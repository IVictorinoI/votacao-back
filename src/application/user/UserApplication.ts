import IUserService from '../../domain/user/services/IUserService'
import User from '../../domain/user/User'
import UserDto from '../../domain/user/UserDto'
import IUserRepo from '../../repository/user/IUserRepo'
import IUserApplication from './IUserApplication'

export default class UserApplication implements IUserApplication {
    userRepo: IUserRepo
    userService: IUserService

    constructor(
        userRepo: IUserRepo,
        userService: IUserService
    ) {
        this.userRepo = userRepo
        this.userService = userService
    }

    public async getAll(): Promise<Array<User>> {
        return await this.userRepo.getAll()
    }

    public async getByEmail(email: string): Promise<User> {
        return await this.userRepo.getByEmail(email)
    }    

    public async update(id: string, data: User): Promise<User> {
        return await this.userService.update(id, data)
    }
    public async delete(id: string): Promise<User> {
        return await this.userService.delete(id)
    }
    public async create(data: UserDto): Promise<User> {
        return await this.userService.create(data)
    }

}