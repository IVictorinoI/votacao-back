import IConfirmationRepository from "../../confirmation/IConfirmationRepository";
import ICreditorRepository from "../../creditor/ICreditorRepository";
import ConfirmationStatus from "../ConfirmationStatus";
import IConfirmationStatusRepository from "../IConfirmationStatusRepository";

export default class ConfirmationStatusCalculate {

    creditorRepository: ICreditorRepository
    confirmationStatusRepository: IConfirmationStatusRepository
    confirmationRepository: IConfirmationRepository

    constructor(
        creditorRepository: ICreditorRepository, 
        confirmationStatusRepository: IConfirmationStatusRepository,
        confirmationRepository: IConfirmationRepository
    ) {
        this.creditorRepository = creditorRepository
        this.confirmationStatusRepository = confirmationStatusRepository
        this.confirmationRepository = confirmationRepository
    }

    initialize (assemblyId: string) : ConfirmationStatus {
        const total = this.creditorRepository.getTotal(assemblyId)
        const count = this.creditorRepository.getCount(assemblyId)

        const confirmationStatus = new ConfirmationStatus(assemblyId, total, count)

        this.confirmationStatusRepository.insert(confirmationStatus)

        return confirmationStatus
    }

    calculate (assemblyId: string) : ConfirmationStatus {
        const confirmationStatus = this.confirmationStatusRepository.get(assemblyId)
        const confirmedValue = this.confirmationRepository.getTotalValue(assemblyId)
        const confirmedCount = this.confirmationRepository.getTotalCount(assemblyId)
        confirmationStatus.calculate(confirmedValue, confirmedCount)

        this.confirmationStatusRepository.update(confirmationStatus)
        
        return confirmationStatus
    }
}