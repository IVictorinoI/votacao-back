import Confirmation from "./Confirmation";

export default interface IConfirmationRepository {
    insert(confirmation: Confirmation) : void
    getAll(assemblyId: string) : Array<Confirmation>
    getTotalValue(assemblyId: string): number
    getTotalCount(assemblyId: string): number
}