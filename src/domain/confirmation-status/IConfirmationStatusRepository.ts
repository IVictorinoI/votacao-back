import ConfirmationStatus from "./ConfirmationStatus";

export default interface IConfirmationStatusRepository {
    insert(confirmationStatus: ConfirmationStatus) : void
    update(confirmationStatus: ConfirmationStatus) : void
    get(assemblyId: string) : ConfirmationStatus
}