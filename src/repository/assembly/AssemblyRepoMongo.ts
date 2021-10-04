import AssemblyModel from './AssemblyModel'
import Assembly from '../../domain/assembly/Assembly'
import AssemblyDto from '../../domain/assembly/AssemblyDto';
import IAssemblyRepo from './IAssemblyRepo';

export default class AssemblyRepoMongo implements IAssemblyRepo {
    private assembly = AssemblyModel;

    public async getAll(): Promise<Array<Assembly>> {
        return await this.assembly.find()
    }

    public async getById(id: string): Promise<Assembly> {
        const assemblyMongo = await this.assembly.findById(id)
        const assembly = new Assembly()
        assembly._id = assemblyMongo._id
        assembly.name = assemblyMongo.name
        assembly.date = assemblyMongo.date
        assembly.code = assemblyMongo.code
        assembly.active = assemblyMongo.active
        return assembly
    }

    public async update(id: string, data: Assembly): Promise<Assembly> {
        return await this.assembly.findByIdAndUpdate(id, data, { new: true })
    }
    
    public async create(data: AssemblyDto): Promise<Assembly> {
        const created = new this.assembly({
            ...data,
            active: true
        })
        const saved = await created.save()

        return saved
    }    
}