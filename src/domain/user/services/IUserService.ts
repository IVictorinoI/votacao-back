import User from "../User";
import UserDto from "../UserDto";

export default interface IUserService {
    update(id: string, data: User): Promise<User>
    delete(id: string): Promise<User>
    create(data: UserDto): Promise<User>
}