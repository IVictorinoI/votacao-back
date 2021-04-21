import ConfirmationStatus from "./ConfirmationStatus";

export default interface IConfirmationStatusRepository {
    insert(confirmationStatus: ConfirmationStatus) : void
    update(confirmationStatus: ConfirmationStatus) : void
    getAll(assemblyId: string) : Array<ConfirmationStatus>
}