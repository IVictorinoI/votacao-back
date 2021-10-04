import AssemblyDto from '../../domain/assembly/AssemblyDto';
import Assembly from '../../domain/assembly/Assembly'

export default interface IAssemblyApplication {
    getAll(): Promise<Array<Assembly>>
    update(id: string, data: Assembly): Promise<Assembly>
    create(data: AssemblyDto): Promise<Assembly>
}