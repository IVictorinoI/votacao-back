import User from '../../domain/user/User'
import UserDto from '../../domain/user/UserDto'
import IUserRepo from './IUserRepo'
import UserModel from './UserModel'

export default class UserRepoMongo implements IUserRepo {
    private user = UserModel

    public async getAll(): Promise<User[]> {
        return await this.user.find()
    }

    public async getByEmail(email: string): Promise<User> {
        const userMongo = await this.user.findOne({ email })
        if(!userMongo)
            return null
        const user = new User()
        user._id = userMongo._id
        user.name = userMongo.name
        user.email = userMongo.email
        user.password = userMongo.password
        user.active = userMongo.active
        return user
    }     

    public async getById(id: string): Promise<User> {
        const userMongo = await this.user.findById(id)
        const user = new User()
        user._id = userMongo._id
        user.name = userMongo.name
        user.email = userMongo.email
        user.password = userMongo.password
        user.active = userMongo.active
        return user
    }

    public async update(id: string, data: User): Promise<User> {
        return await this.user.findByIdAndUpdate(id, data, { new: true })
    }

    public async delete(id: string): Promise<User> {
        return await this.user.findByIdAndUpdate(id, {active: false}, { new: true })
    }

    public async create(data: UserDto): Promise<User> {
        const created = new this.user({
            ...data,
            active: true
        })
        const saved = await created.save()

        return saved
    }

}