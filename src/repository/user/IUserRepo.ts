import User from '../../domain/user/User'
import UserDto from '../../domain/user/UserDto'

export default interface IUserRepo {
    getAll(): Promise<Array<User>>
    getByEmail(email: string): Promise<User>
    getById(id: string): Promise<User>
    update(id: string, data: User): Promise<User>
    delete(id: string): Promise<User>
    create(data: UserDto): Promise<User>
}