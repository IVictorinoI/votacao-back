import Confirmation from "./Confirmation";

export default interface IConfirmationRepository {
    insert(confirmation: Confirmation) : void
    getAll(assemblyId: string) : Array<Confirmation>
    getAllByClass(assemblyId: string, creditorClassId: string): Array<Confirmation>
    getTotalValue(assemblyId: string): number
    getTotalValueByClass(assemblyId: string, creditorClassId: string): number
    getTotalCount(assemblyId: string): number    
    getTotalCountByClass(assemblyId: string, creditorClassId: string): number
}