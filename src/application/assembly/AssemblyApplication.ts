import AssemblyDto from '../../domain/assembly/AssemblyDto';
import Assembly from '../../domain/assembly/Assembly'
import IAssemblyRepo from '../../repository/assembly/IAssemblyRepo'
import IAssemblyApplication from './IAssemblyApplication';

class AssemblyApplication implements IAssemblyApplication {
    assemblyRepo: IAssemblyRepo

    constructor(assemblyRepo: IAssemblyRepo) {
        this.assemblyRepo = assemblyRepo
    }

    public async getAll(): Promise<Array<Assembly>> {
        return await this.assemblyRepo.getAll()
    }

    public async update(id: string, data: Assembly): Promise<Assembly> {
        return await this.assemblyRepo.update(id, data)
    }

    public async create(data: AssemblyDto): Promise<Assembly> {
        return this.assemblyRepo.create(data)
    }
}

export default AssemblyApplication