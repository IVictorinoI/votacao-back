import AssemblyDto from '../../domain/assembly/AssemblyDto';
import Assembly from '../../domain/assembly/Assembly';

export default interface ILayerRepo {
    getAll(): Promise<Array<Assembly>>
    getById(id: string): Promise<Assembly>
    update(id: string, data: Assembly): Promise<Assembly>
    create(data: AssemblyDto): Promise<Assembly>
}