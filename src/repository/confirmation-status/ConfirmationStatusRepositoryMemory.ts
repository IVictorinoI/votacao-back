import ConfirmationStatus from "../../domain/confirmation-status/ConfirmationStatus";
import IConfirmationStatusRepository from "../../domain/confirmation-status/IConfirmationStatusRepository";

export default class ConfirmationStatusRepositoryMemory implements IConfirmationStatusRepository {
    confirmationsStatus : Array<ConfirmationStatus> = []

    insert(confirmationStatus: ConfirmationStatus): void {
        this.confirmationsStatus.push(confirmationStatus)
    }
    
    update(confirmationStatus: ConfirmationStatus): void {
        const current = this.confirmationsStatus.find(p => p.id == confirmationStatus.id)
        current.expectedValue = confirmationStatus.expectedValue
        current.confirmedValue = confirmationStatus.confirmedValue
        current.confirmedPercentValue = confirmationStatus.confirmedPercentValue
        current.expectedCount = confirmationStatus.expectedCount
        current.confirmedCount = confirmationStatus.confirmedCount
        current.confirmedPercentCount = confirmationStatus.confirmedPercentCount
    }

    getAll(assemblyId: string): Array<ConfirmationStatus> {
        return this.confirmationsStatus.filter(p => p.assemblyId == assemblyId)
    }

}