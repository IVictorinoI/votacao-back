import ConfirmationStatus from "../../domain/confirmation-status/ConfirmationStatus";
import IConfirmationStatusRepository from "../../domain/confirmation-status/IConfirmationStatusRepository";

export default class ConfirmationStatusRepositoryMemory implements IConfirmationStatusRepository {
    confirmationsStatus : Array<ConfirmationStatus> = []

    insert(confirmationStatus: ConfirmationStatus): void {
        this.confirmationsStatus.push(confirmationStatus)
    }
    
    update(confirmationStatus: ConfirmationStatus): void {
        const current = this.get(confirmationStatus.assemblyId)
        current.expectedValue = confirmationStatus.expectedValue
        current.confirmedValue = confirmationStatus.confirmedValue
        current.confirmedPercentValue = confirmationStatus.confirmedPercentValue
        current.expectedCount = confirmationStatus.expectedCount
        current.confirmedCount = confirmationStatus.confirmedCount
        current.confirmedPercentCount = confirmationStatus.confirmedPercentCount
    }

    get(assemblyId: string): ConfirmationStatus {
        return this.confirmationsStatus.find(p => p.assemblyId == assemblyId)
    }

}